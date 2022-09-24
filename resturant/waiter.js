import {Worker} from "/worker.js";
const waiter = document.querySelector("#waiter")

class Waiter extends Worker{
	//服务员
	constructor(name,wage){
		super(name,wage);
		this.footlist= [];
		this.catchfoot = "";
		this.free = true;
	}
	getfree(){
		return this.free;
	}
	setfree(str){
		this.free = str;
	}
	stayInCustome(){
		let str = "#waiter"+this.ID;
		let element = document.querySelector(str);
		element.style.top = 120 * this.ID + 400 + "px";
		element.style.left = "550px";
		//element.children[1].textContent = "服务员空闲于顾客区";
	}
	sendList(ID){
		let str = "#waiter"+this.ID;
		let element = document.querySelector(str);
		element.children[1].textContent = "Waiter将顾客："+ID+"的菜单送后厨";
	}
	stayInCook(){
		let str = "#waiter"+this.ID;
		let element = document.querySelector(str);
		element.style.top = 120 * this.ID + 400 + "px";;
		element.style.left = "890px";
		//element.children[1].textContent = "服务员空闲与烹饪区";
	}
	sendFoot(foot,array){
		let str = "#waiter"+this.ID;
		let element = document.querySelector(str);
		element.children[1].textContent = "";
		for (var i = 0; i < array.length; i++) {
			let p = document.createElement("P");
			p.textContent += "Waiter将"+foot+"送给顾客"+ array[i];
			element.children[1].append(p);
		}
	}
	addlist(array){
		this.footlist = array;
	}
	create(ID){
		let div = document.createElement("div");
		div.classList.add("wai");
		div.id = "waiter"+ID;
		document.querySelector("main").append(div);

		let topic = document.createElement("h4");
		topic.textContent = "WaiterID:"+ID;
		div.append(topic);

		let contain = document.createElement("p");
		div.append(contain);
	}
}
export{Waiter}