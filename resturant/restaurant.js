class Restaurant{
	//餐馆类
	constructor(cash,seats){
		this.cash = cash;
		this.seats = seats;
		this.staff = [];
		this.emptySeats = seats;
		this.waitlist = 0;
		this.instance = null;
		this.notcooklist = [];//还没做好的菜单列表
	}
	showCustomerList(){
		//console.log(document.querySelector("#restaurant").children[1]);
		document.querySelector("#checkstand").children[1].textContent = "Current number of customers waiting：" + this.waitlist;
	}
	showCash(){
		document.querySelector("#checkstand").children[2].textContent = "Current restaurant cash：" + this.cash;
	}
	showNotCookList(){
		let table = document.querySelector("#cookerstate table");
		table.innerHTML = "<tr><th>Foot</th><th>Num</th><th>cusID</th></tr>";
		for (var i = 0; i < this.notcooklist.length; i++) {
			let tr = document.createElement("tr");
			let td1 = document.createElement("td");
			let td2 = document.createElement("td");
			let td3 = document.createElement("td");
			td1.textContent = this.notcooklist[i]["footname"];
			td2.textContent = this.notcooklist[i]["number"];
			td3.textContent = this.notcooklist[i]["seatsID"][0];
			for (var j = 1; j < this.notcooklist[i]["seatsID"].length; j++) {
				td3.textContent +=  "," + this.notcooklist[i]["seatsID"][j];
			}
			tr.append(td1);
			tr.append(td2);
			tr.append(td3);
			table.append(tr);
		}
	}
	hire(worker){
		this.staff.push(worker);
	}
	fire(worker){	
		let array = this.staff;
		let result = [];
		for (var i = 0; i < array.length; i++) {
			if (array[i] != worker) {
				result.push(array[i]);
			} 
		}
		this.staff = result;
	}
	static getinstance(cash,seats){
		if (!this.instance) {
			this.instance = new Restaurant(cash,seats);
		}
		return this.instance;
	}
}

export{Restaurant}