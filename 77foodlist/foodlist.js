const btn = document.querySelector("button");
const main = document.querySelector("main");
const mainH2 = document.querySelector("main h2");
const mainUl = document.querySelector("main ul");
const mainSection = document.querySelector("main section");
const mainArtcle = document.querySelector("main article");
async function getFood(argument) {
	let url = "https://www.themealdb.com/api/json/v1/1/random.php";
	try{
		let response = await fetch(url);
		return await response.json()
	}catch(error){
		console.log("Request Failed",error);
	}
}
btn.addEventListener("click",function() {
	getFood().then((data)=>{
		let food = data["meals"][0];
		if (document.querySelector("img")) {
			document.querySelector("img").remove();
		}
		let img = document.createElement("img");
		img.src = food["strMealThumb"];
		main.prepend(img);

		mainH2.textContent = food["strMeal"];
		mainH2.style.borderBottom = "1px solid lightgray";

		let li1 = document.createElement("li");
		let li2 = document.createElement("li");
		let li3 = document.createElement("li");
		li1.textContent = "Category:" + food["strCategory"];
		li2.textContent = "Area:" + food["strArea"];
		li3.textContent = "Tags:" + food["strTags"];
		mainUl.append(li1);
		mainUl.append(li2);
		mainUl.append(li3);

		mainSection.textContent = "";
		let h3S = document.createElement("h3");
		h3S.textContent = "Ingredients:";
		h3S.style.borderBottom = "1px solid lightgray";
		mainSection.append(h3S);
		let ul = document.createElement("ul");
		mainSection.append(ul);
		for (var i = 1; i <= 20; i++) {
			if (!food["strIngredient"+i]) {break}
			let li = document.createElement("li");
			li.textContent = food["strIngredient"+i]+"-"+food["strMeasure"+i];
			ul.append(li);
		}

		mainArtcle.textContent = "";
		let h3A = document.createElement("h3");
		h3A.textContent = "Recipes";
		h3A.style.borderBottom = "1px solid lightgray";
		mainArtcle.append(h3A);
		let p = document.createElement("p");
		p.textContent = food["strInstructions"];
		mainArtcle.append(p);
		console.log(food);
	})
})