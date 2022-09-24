import {Restaurant} from "/restaurant.js" ;
import {Waiter} from "/waiter.js";
import {Cooker} from "/cooker.js";
import {Customer} from "/customer.js";
import {FootList} from "/foot.js";

const cookerADD = document.querySelector("#submit");
const waiterADD = document.querySelector("#waiterAdd");

let ifeRestaurant = Restaurant.getinstance(1000,3);
let newFootlist = new FootList();
let readylist = [];//后厨做好的还没有端上桌的菜

let customers = [];//吃饭顾客对象列表
let waiters = [];//服务员列表
let cookers = [];//厨师列表
let customersID = 0;//顾客桌号
let wiaterID = 0;//服务员编号

//生成一个footlist
let footnameList = ["宫保鸡丁","鱼香肉丝","臭鳜鱼","松鼠鱼","红烧狮子头","佛跳墙","白切鸡","西湖醋鱼","毛豆腐"];
for (var i = 0; i < footnameList.length; i++) {
	let costs = parseInt(Math.random()*5+2);
	let price = parseInt(Math.random()*10+1);
	newFootlist.add(footnameList[i],costs,price);
	
}

//实现对象继承
clone(Customer,customer);
clone(Waiter,waiter);
clone(Cooker,cooker);

//添加厨师监控器
cookerADD.addEventListener("click",function(event) {
	let cookername = document.querySelector("#cookname").value;
	let cookerwage = document.querySelector("#cookwage").value;
	event.preventDefault();
	let c = new cooker(cookername,cookerwage);
	c.create(cookername);
	c.cookerWork();
	cookers.push(c);
});
//添加服务员监控器
waiterADD.addEventListener("click",function(event) {
	event.preventDefault();
	let w = new waiter(wiaterID);
	w.create(wiaterID);
	w.waiterCustomer();
	waiters.push(w);
	wiaterID++;
});

createCustomer();
//实例化顾客
function createCustomer() {
	let promise = new Promise((resolve,reject)=>{
		let time = parseInt(Math.random()*3+1);
		setTimeout(()=>{
			ifeRestaurant.showCustomerList();
			ifeRestaurant.showCash();
			ifeRestaurant.showNotCookList()
			if (ifeRestaurant.waitlist < 5 ) {
				if (ifeRestaurant.emptySeats > 0) {
					console.log("欢迎新顾客！！！！！！！！！！！！！！！！！！！");
					let cus = new customer(customersID);
					customers.push(cus);
					cus.customerWait();
					cus.create(customersID);
					customersID++;
					// if (customersID == ifeRestaurant.seats) {
					// 	customersID = 0;
					// }
					ifeRestaurant.emptySeats--;
				}else{
					ifeRestaurant.waitlist++;
				}
				resolve();
			}else{
				resolve();
			}
		},time*1000);
	});
	promise.then(()=>{
		//console.log(ifeRestaurant.emptySeats+"***"+ifeRestaurant.waitlist);
		createCustomer();
	})
}


//waiter对象
function waiter(ID) {
	this.ID = ID;
	this.free = true;
	this.footlist= [];
	this.catchfoot = "";
	this.waiterCustomer = function() {
		//服务员在顾客区
		let cusID = 0;
		let promise = new Promise((resolve,reject)=>{
			setTimeout(()=>{
				if (customers.length > 0) {
					//console.log("服务员在顾客区");
					this.stayInCustome();
					for (var i = 0; i < customers.length; i++) {
						if (customers[i]["waiting"] && customers[i]["ordering"]) {
							customers[i]["waiting"] = false;
							cusID = customers[i]["seatsID"];
							console.log("存在等待点餐的顾客");
							resolve(cusID);
							break;
						}
					}
					reject();
				}else{
					reject();
				}
			},0);
		});
		promise.then((cusID)=>{
			console.log("等待顾客点餐");
			setTimeout(()=>{
				for (var i = 0; i < customers.length; i++) {
					if (customers[i]["seatsID"] == cusID) {
						customers[i].ordering = false;
						this.waiterSendlist(customers[i]);
						break
					} 
				}
			},3000);
		},
		()=>{
			if (readylist.length>0 && this.getfree()) {
				setTimeout(()=>{
					this.waiterCooker();
				},500);
			}else{
				this.waiterCustomer();
			}
		});
	}
	this.waiterSendlist = function(obj) {
		//服务员将菜单送到后厨
		console.log("服务员将菜单送到后厨");
		let promise = new Promise((resolve,reject)=>{
			this.sendList(obj["seatsID"]);
			setTimeout(()=>{
				
				for (var i = 0; i < obj["choseList"].length; i++) {
					let judge = 1;
					let list = {};
					Object.assign(list,obj["choseList"][i]);
					list["number"] = 1;
					list["seatsID"] = [];
					list["seatsID"][0] = obj["seatsID"];
					for (var j = 0; j < ifeRestaurant.notcooklist.length; j++) {
						if (list["footname"] == ifeRestaurant.notcooklist[j]["footname"]) {
							ifeRestaurant.notcooklist[j]["number"]++;
							ifeRestaurant.notcooklist[j]["seatsID"].push(list["seatsID"][0]);
							judge = 0;
							break;
						}
					}
					if (judge) {
						ifeRestaurant.notcooklist.push(list);
					}
				}
				
				resolve();
			},500);
		});
		promise.then(()=>{
			this.waiterCooker();
		});
	}
	this.waiterCooker = function() {
		//服务员在后厨呆着
		let promise = new Promise((resolve,reject)=>{
			//console.log("服务员在后厨");
			this.stayInCook();
			setTimeout(()=>{
				if (readylist.length > 0) {
					resolve();
				}else{
					reject();
				}
			},0);
		});
		promise.then(()=>{
			this.waiterSendFoot(readylist[0]);
		},
		()=>{
			let judge = 0;
			for (var i = 0; i < customers.length; i++) {
				if(customers[i]["waiting"]){
					judge = 1;
					break;
				}
			}
			if (judge) {
				setTimeout(()=>{
					this.waiterCustomer();
				},500);
			}else{
				this.waiterCooker();
			}
		});
	}
	this.waiterSendFoot = function() {
		//将食物从后厨送到餐桌
		this.sendFoot( readylist[0]["footname"],readylist[0]["seatsID"]);
		let promise = new Promise((resolve,reject)=>{
			let judge = 0;
			let footCook = readylist[0];
			readylist = readylist.slice(1);
			setTimeout(()=>{
				for (var i = 0; i < footCook["seatsID"].length; i++) {
					let locate = footCook["seatsID"][i];
					// console.log(locate);
					// console.log(customers);
					//console.log(customers[0]["table"]);
					
					for (var j = 0; j < customers.length; j++) {
						if (customers[j]["seatsID"] == locate) {
							customers[j]["table"].push(footCook["footname"]);
							judge = 1;
							//console.log("GOOD!!!!找到点这道菜的顾客！！！")
						}
					}
					if (judge == 0) {
						console.log(footlist);
						console.log("locate:"+locate);
						console.log(customers);
						console.log("ERROR!!!!没找到点这道菜的顾客！！！");
						alert("Wrong!!");
					}
					
				}
				console.log("服务员将"+footCook["footname"]+"送上桌");
				resolve();
			},500);
		});
		promise.then(()=>{
			this.waiterCustomer();
		});
	}
}


//厨师做菜
function cooker(name,wage) {
	//console.log("厨师入口");
	this.name = name;
	this.wage = wage;
	this.cookFootList = [];
	this.cookerWork = function() {
		let footCook = {};
		let promise = new Promise((resolve, reject)=>{
			let time = 100;
			if (ifeRestaurant.notcooklist.length > 0) {
				this.work(ifeRestaurant.notcooklist[0]);
				time = 1000 * ifeRestaurant.notcooklist[0]["costs"];
				footCook = ifeRestaurant.notcooklist[0];
				ifeRestaurant.notcooklist = ifeRestaurant.notcooklist.slice(1);
				setTimeout(()=>{
					resolve();
				},time);
			}else{
				setTimeout(()=>{
					reject();
				},time);
			}
			
		});
		promise.then(()=>{
			console.log("已经做好了"+footCook["footname"]);
			readylist.push(footCook);
			setTimeout(()=>{
				this.cookerWork();
			},0);

		},()=>{
			setTimeout(()=>{
				this.cookerWork();
			},0);
		})
	}
	
}

//顾客对象
function customer(seatID){
	this.seatsID = seatID;//顾客座位号
	this.wiaterID = 0;//服务此顾客的服务员号
	this.choseList= [];//customer菜单
	this.table = [];//customer桌子
	this.footList = [];//顾客食物列表，用于刷新每个食物的状态
	this.money = 0;//消费金额
	this.waiting = true;
	this.ordering = false;
	this.customerWait = function(){
		//客户入座等待
		//console.log("顾客入口");
		let promise = new Promise((resolve, reject)=>{
			setTimeout(()=>{
				let free = false;
				for (var i = 0; i < waiters.length; i++) {
					if(waiters[i].getfree()){
						waiters[i].setfree(false);
						this.wiaterID = i;
						this.ordering = true;
						free = true;
						break;
					}
				}
				if (free) {
					resolve();
				}else{
					reject();
				}
			},0);
		});
		promise.then(()=>{
			this.customerOrder();
		},
		()=>{
			this.customerWait();
		});
	}
	this.customerOrder = function(){
		// 客户点餐
		let promise = new Promise((resolve, reject)=>{
			//document.querySelector("#customer-show").textContent = "客户正在点餐";
			//let time = 3;
			// let interval = setInterval(()=>{
			// 	time--;
			// 	document.querySelector("#customer-show").textContent = "客户正在点餐,还剩"+time+"秒";
			// },1000);
			setTimeout(()=>{
				this.choseList = this.order(newFootlist.list,ifeRestaurant);
				let str = "";
				for (var i = 0; i < this.choseList.length; i++) {
					str = str + this.choseList[i]["footname"]+" ";
				}
				console.log("顾客点了:"+str);
				waiters[this.wiaterID].setfree(true);
				// console.log(newFootlist.list);
				// console.log(this.choseList);
				//newWaiter.addlist(this.choseList);
				//clearInterval(interval);
				resolve();
			},3000);
		});
		promise.then(()=>{
			// setTimeout(()=>{
			// 	newWaiter.work(newCooker);
			// },500);
			// waiterToCooker();
			for (var i = 0; i < this.choseList.length; i++) {
				this.money = this.money + this.choseList[i]["price"];
			}
			waiters[this.wiaterID]["free"] = true;
			this.eat();
		});
	}
	this.eat = function() {
		// 客户等待吃饭和吃饭
		let promise = new Promise((resolve,reject)=>{
			setTimeout(()=>{
				if (this.table.length>0) {
					for (var i = 0; i < this.choseList.length; i++) {
						if (this.choseList[i]["footname"] == this.table[0]) {
							this.choseList.splice(i,1);
							break;
						}else{
							//console.log("没在顾客菜单里找到那一盘菜");
						} 
					}
					this.showeat(this.table[0]);
					this.table = this.table.slice(1);
					console.log("客户"+this.seatsID+"未做菜肴"+this.choseList.length);
					if (this.choseList.length == 0) {
						resolve();
					}else{
						reject();
					}
				}else{
					reject();
				}
				
			},1000);
		});
		promise.then(()=>{
			setTimeout(()=>{
				let str = "#customer"+this.seatsID;
				let ul = document.querySelector(str + " ul");
				for (var i = 0; i < this.footList.length; i++) {
					if (ul.children[i].classList.contains("eating")) {
							ul.children[i].textContent = this.footList[i]["footname"] + "  已经吃完";	
							ul.children[i].classList.remove("eating")
					}
				}
				this.customerCheckout();
			},1000);
			
		},
		()=>{
			this.eat();
		});
	}
	this.customerCheckout = function() {
		setTimeout(()=>{
			console.log("顾客"+ this.seatsID +"结账：支付"+this.money+"元");
			let str = "#customer"+this.seatsID;
			let contain = document.querySelector(str);
			contain.textContent = "顾客"+ this.seatsID +"结账:"+this.money+"元"
			setTimeout(()=>{
				for (var i = 0; i < customers.length; i++) {
					if (customers[i]["seatsID"] == this.seatsID) {
						customers.splice(i,1);
					} 
				}
				ifeRestaurant.cash += this.money;
				ifeRestaurant.emptySeats++;
				ifeRestaurant.waitlist--;
				contain.remove();
			},2000);
		},1000);
		
	}
}
function clone(parent,child) {
	// 对象继承专用
	child.prototype = Object.create(parent.prototype);
	child.prototype.constructor = child;
}







