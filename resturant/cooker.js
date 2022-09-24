import {Worker} from "/worker.js";
class Cooker extends Worker{
	//厨师
	constructor(name,wage){
		super(name,wage);
		this.cookFootList = [];
	}
	work(chosefoot){
		let cookeraddress = "#" + this.name;
		let coo = document.querySelector(cookeraddress);
		let time = parseInt(chosefoot["costs"])-1;
		
		let interval = setInterval(()=>{
			let str = "厨师"+this.name+"正在做"+chosefoot["footname"]+"还需要"+time+"分钟做好";
			coo.children[1].textContent = str;
			time = time - 1;
		},1000);
		setTimeout(()=>{
			clearInterval(interval);
			let str = chosefoot["footname"]+"已经做好！";
			coo.children[1].textContent = str;
		},(parseInt(chosefoot["costs"]))*1000-1);
		
	}
	addlist(list){
		this.cookFootList = this.cookFootList.concat(list);
	}
	create(name){
		let div = document.createElement("div");
		div.classList.add("cooker");
		div.id = name;
		document.querySelector("#cookerstate").append(div);

		let topic = document.createElement("h4");
		topic.textContent = "Cooker Name:"+name;
		div.append(topic);

		let contain = document.createElement("p");
		div.append(contain);
	}
	
}
export{Cooker}