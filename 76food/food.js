const article = document.querySelector("article");
const recipeUl = document.querySelector("#recipe ul");
const ingerentsUl = document.querySelector("#ingerents ul");
const search = document.querySelector("input");
//获取随机菜单
async function getFoodRandom() {
	let url = "https://www.themealdb.com/api/json/v1/1/random.php";
	try{
		let response = await fetch(url);
		return await response.json();
	}catch(error){
		console.log("Request Failed",error);
	}
}
async function getFood(url) {
	try{
		let response = await fetch(url);
		return await response.json();
	}catch(error){
		console.log("Request Failed",error);
	}
}
let foodArray = [];
for (var i = 0; i < 8; i++) {
	getFoodRandom().then((data)=>{
		food = data["meals"][0];
		let div = document.createElement("div");
		let img = document.createElement("img");
		let h6 = document.createElement("h6");
		let p = document.createElement("p");
		img.src = food["strMealThumb"];
		h6.textContent = food["strMeal"];
		p.textContent = "Origin of meal:"+food["strArea"];
		div.append(img);
		div.append(h6);
		div.append(p);
		div.classList.add("show-div");
		article.append(div);
		foodArray.push(food);
	})
}
search.addEventListener("blur",function() {
	if (search.value.charCodeAt(0)>47 && search.value.charCodeAt(0)<58) {
		let url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i="+Number(search.value);
		getFood(url).then((data)=>{
			foodArray = [];
			food = data["meals"][0];
			let div = document.createElement("div");
			let img = document.createElement("img");
			let h6 = document.createElement("h6");
			let p = document.createElement("p");
			img.src = food["strMealThumb"];
			h6.textContent = food["strMeal"];
			p.textContent = "Origin of meal:"+food["strArea"];
			div.append(img);
			div.append(h6);
			div.append(p);
			div.classList.add("show-div");
			article.textContent = "";
			article.append(div);
			foodArray.push(food);
		})

	}else if(search.value.charCodeAt(0)>96 && search.value.charCodeAt(0)<122){
		let url = "https://www.themealdb.com/api/json/v1/1/search.php?f="+search.value[0];
		getFood(url).then((data)=>{
			foodArray = [];
			article.textContent = "";
			for (var i = 0; i < data["meals"].length; i++) {
				food = data["meals"][i];
				let div = document.createElement("div");
				let img = document.createElement("img");
				let h6 = document.createElement("h6");
				let p = document.createElement("p");
				img.src = food["strMealThumb"];
				h6.textContent = food["strMeal"];
				p.textContent = "Origin of meal:"+food["strArea"];
				div.append(img);
				div.append(h6);
				div.append(p);
				div.classList.add("show-div");
				article.append(div);
				foodArray.push(food);
			}
			
		})

	}else if(search.value.charCodeAt(0)>64 && search.value.charCodeAt(0)<91){
		let url = "https://www.themealdb.com/api/json/v1/1/search.php?s="+search.value;
		getFood(url).then((data)=>{
			foodArray = [];
			article.textContent = "";
			for (var i = 0; i < data["meals"].length; i++) {
				food = data["meals"][i];
				let div = document.createElement("div");
				let img = document.createElement("img");
				let h6 = document.createElement("h6");
				let p = document.createElement("p");
				img.src = food["strMealThumb"];
				h6.textContent = food["strMeal"];
				p.textContent = "Origin of meal:"+food["strArea"];
				div.append(img);
				div.append(h6);
				div.append(p);
				div.classList.add("show-div");
				article.append(div);
				foodArray.push(food);
			}
			
		})
	}
})

article.addEventListener("click",function(event) {
	let target  = event.target;
	if (target.nodeName.toLowerCase() != "img") {return}
	let index = 999;
	for (var i = 0; i < foodArray.length; i++) {
		if (foodArray[i]["strMealThumb"] == target.src) {
			index = i;
			break;
		}
	}
	recipeUl.textContent = "";
	
	let str = foodArray[index]["strInstructions"].split(".");
	for (var i = 1; i <= str.length; i++) {
		let li = document.createElement("li");
		li.textContent = "#" + i+ "#" +str[i];
		recipeUl.append(li);
	}

	ingerentsUl.textContent = "";
	for (var i = 1; i <= 20; i++) {
		if (!foodArray[index]["strIngredient"+i]) {
			break;
		}
		let li = document.createElement("li");
		li.classList.add("aside-li");
		ingerentsUl.append(li);
		let img = document.createElement("img");
		img.src = "http://www.themealdb.com/images/ingredients/"+foodArray[index]["strIngredient"+i]+".png";
		li.append(img);
		let div = document.createElement("div");
		li.append(div);
		let span1 = document.createElement("span");
		span1.textContent =  foodArray[index]["strIngredient"+i];
		div.append(span1);
		let span2 = document.createElement("span");
		span2.textContent = foodArray[index]["strMeasure"+i];
		div.append(span2);
	}

})