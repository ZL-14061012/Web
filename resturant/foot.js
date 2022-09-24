class FootList{
	//菜单
	constructor(name){
		this.list = [];
	}
	add(footname,costs,price){
		this.list.push({
			footname:footname,
			costs:costs,
			price:price
		});
	}
}
export{FootList}