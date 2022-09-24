class Customer{
	//顾客
	constructor(ID){
		// this.ID = ID;//客户等位号
		this.choseList= [];//customer菜单
		this.table = [];//customer桌子
		this.waiting = true;
	}
	order(footlist,resturant){
		let m = parseInt(Math.random()*footlist.length+1);
		let list = [];
		for (var i = 0; i < footlist.length; i++) {
			list[i] = footlist[i];
		}
		let str = "#customer"+this.seatsID;
		let contain = document.querySelector(str);
		let ul = document.createElement("ul");
		contain.append(ul);
		for (var i = 0; i < m; i++) {
			let n = parseInt(Math.random()*list.length);
			this.choseList.push(list[n]);
			this.footList.push(list[n]);
			let li = document.createElement("li");
			li.textContent = list[n]["footname"] + " :  还未上";
			ul.append(li);
			list.splice(n,1);
		}
		return this.choseList;
	}
	showeat(foot){
		//alert(foot);
		let str = "#customer"+this.seatsID;
		let ul = document.querySelector(str + " ul");
		for (var i = 0; i < this.footList.length; i++) {
			if (ul.children[i].classList.contains("eating")) {
					ul.children[i].textContent = this.footList[i]["footname"] + "  已经吃完";	
					ul.children[i].classList.remove("eating")
			}
			if (foot == this.footList[i]["footname"]) {	
				ul.children[i].textContent = this.footList[i]["footname"] + "  正在吃";
				ul.children[i].classList.add("eating");		
			}
		}
	}
	create(ID){
		let div = document.createElement("div");
		div.classList.add("cus");
		div.id = "customer"+ID;
		document.querySelector("#customerstate").append(div);

		let top = document.createElement("p");
		top.textContent = "customer ID : "+ID;
		div.append(top);
	}
}

export{Customer}