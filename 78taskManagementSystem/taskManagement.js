const classifyAll = document.querySelector("#classify-all");
const classifyList = document.querySelector("#classify-list");
const classifyFoot = document.querySelector("#classify-foot");
const taskHead = document.querySelector("#task-head");
const taskContent = document.querySelector("#task-content");
const taskFoot = document.querySelector("#task-foot");
const addTask = document.querySelector("#add-task"); 
const submitConfirm = document.querySelector("#submit-confirm");
const submitCancel = document.querySelector("#submit-cancel");
const article = document.querySelector("article");
const articleTopic = document.querySelector("#article-topic");
let taskArray = [];
let currentTask = "";
let taskShowArray = [];
let defaultBranch = {
	name:"默认分类",
	branch:[]
}
Object.defineProperty(defaultBranch, "branch", {writable: false});
let classifyObj = {
	name:"分类列表",
	branch:[defaultBranch]
}
classifyAll.addEventListener("click",function() {
	taskShow(taskArray);
	Object.assign(taskShowArray,taskArray);
	for (var i = 0; i < taskHead.children.length; i++) {
		taskHead.children[i].classList.remove("task-head-show");
	}
	taskHead.children[0].classList.add("task-head-show");
	classifyShow()
})
classifyList.addEventListener("click",function(event) {
	let target = event.target;
	if(target.parentNode.nodeName.toLowerCase() == "li"){
		target = target.parentNode;
	}
	if (target.nodeName.toLowerCase() != "li") {return}
	const lis = document.querySelectorAll("#classify-list li");
	for (var i = 0; i < lis.length; i++) {
		lis[i].classList.remove("classify-list-show");
	}
	let array = [];
	let str = target.children[1].textContent.split("(");
	if (str[0] == "默认分类") {
		for (var i = 0; i < taskArray.length; i++) {
			if(taskArray[i]["taskLabel"] == ""){
				array.push(taskArray[i])
			}
		}
		currentTask = "";
	}else{
		target.classList.add("classify-list-show");
		for (var i = 0; i < taskArray.length; i++) {
			if(taskArray[i]["taskLabel"] == str[0]){
				array.push(taskArray[i])
			}
		}
		currentTask = str[0];
	}
	taskShow(array);
	taskShowArray = array;
	for (var i = 0; i < taskHead.children.length; i++) {
		taskHead.children[i].classList.remove("task-head-show");
	}
	taskHead.children[0].classList.add("task-head-show");
})
classifyList.addEventListener("click",removeBranch);
classifyFoot.addEventListener("click",function() {
	let newClassify = prompt("请输入新分类名称");
	if (!newClassify) {return}
	let element = findClassifyShow(classifyList,findClassName);
	if (element) {
		let str = element.textContent.split("(");
		let branchObj = findBranch(classifyObj,str[0]);
		branchObj["branch"].push(new classifyBranch(newClassify));

	}else{
		classifyObj["branch"].push(new classifyBranch(newClassify));
	}
	classifyShow();
})
taskContent.addEventListener("click",function(event) {
	let target = event.target;
	if (!target.classList.contains("taskShow")) {return}
	let tasks = taskContent.querySelectorAll(".taskShow");
	for (var i = 0; i < tasks.length; i++) {
		tasks[i].classList.remove("current-task-show");
	}
	target.classList.add("current-task-show");
	let targetTask = findTask(target.textContent);
	article.children[0].textContent = "";
	let h3 = document.createElement("h3");
	h3.textContent = targetTask["name"];
	article.children[0].append(h3);
	if (!targetTask["state"]) {
		let i1 = document.createElement("i");
		i1.classList.add("bi");
		i1.classList.add("bi-check2-circle");
		article.children[0].append(i1);
		i1.addEventListener("click",checkState);
	}
	let i2 = document.createElement("i"); 
	i2.classList.add("bi");
	i2.classList.add("bi-pencil-square");
	i2.id = "editor-task";
	article.children[0].append(i2);
	article.children[1].textContent = "任务日期："+targetTask["date"];
	article.children[2].textContent = targetTask["content"];
	articleTopic.children[articleTopic.children.length-1].addEventListener("click",submitEditTask);
})
function checkState() {
	let result = confirm("完成任务？");
	if (result) {
		document.querySelector(".bi-check2-circle").remove();
		let currentTaskElement = document.querySelector(".current-task-show");
		currentTaskElement.classList.add("complete");
		let targetTask = findTask(currentTaskElement.textContent);
		targetTask["state"] = true;
	}		
}
function submitEditTask() {
	addTask.style.display = "block";
	let currentTaskElement = document.querySelector(".current-task-show");
	let targetTask = findTask(currentTaskElement.textContent);	
	document.querySelector("#add-task-topic").value = targetTask["name"];
	document.querySelector("#add-task-date").value = targetTask["date"];
	document.querySelector("#add-task-content").value = targetTask["content"];
	submitConfirm.addEventListener("click",submitConfirmEditTask);
	submitCancel.addEventListener("click",submitCancelTask);
}
function submitConfirmEditTask(event) {
	event.preventDefault();
	addTask.style.display = "none";
	submitConfirm.removeEventListener("click",submitConfirmEditTask);

	let currentTaskElement = document.querySelector(".current-task-show");
	let targetTask = findTask(currentTaskElement.textContent);
	targetTask["name"] = document.querySelector("#add-task-topic").value;
	targetTask["date"] = document.querySelector("#add-task-date").value;
	targetTask["content"] = document.querySelector("#add-task-content").value;

	Object.assign(taskShowArray,taskArray);
	taskShow(taskShowArray);
	article.children[0].textContent = "";
	let h3 = document.createElement("h3");
	h3.textContent = targetTask["name"];
	article.children[0].append(h3);
	if (!targetTask["state"]) {
		let i1 = document.createElement("i");
		i1.classList.add("bi");
		i1.classList.add("bi-check2-circle");
		article.children[0].append(i1);
	}
	let i2 = document.createElement("i"); 
	i2.classList.add("bi");
	i2.classList.add("bi-pencil-square");
	i2.id = "editor-task";
	article.children[0].append(i2);
	article.children[1].textContent = "任务日期："+targetTask["date"];
	article.children[2].textContent = targetTask["content"];
	classifyShow();
	articleTopic.children[articleTopic.children.length-1].addEventListener("click",submitEditTask);
}
taskHead.addEventListener("click",function(event) {
	let target = event.target;
	if (!(target.nodeName.toLowerCase() == "span")) {return;}
	for (var i = 0; i < taskHead.children.length; i++) {
		taskHead.children[i].classList.remove("task-head-show");
	}
	target.classList.add("task-head-show");
	let array = [];
	if (target.textContent == "未完成") {
		for (var i = 0; i < taskShowArray.length; i++) {
			if(!taskShowArray[i]["state"]){
				array.push(taskShowArray[i])
			}
		}
	}else if (target.textContent == "已完成") {
		for (var i = 0; i < taskShowArray.length; i++) {
			if(taskShowArray[i]["state"]){
				array.push(taskShowArray[i])
			}
		}
	}else{
		for (var i = 0; i < taskShowArray.length; i++) {
			array.push(taskShowArray[i])
		}
	}
	taskShow(array);
	classifyShow();
})
taskFoot.addEventListener("click",function() {
	addTask.style.display = "block";
	document.querySelector("#add-task-topic").value = "";
	document.querySelector("#add-task-date").value = "";
	document.querySelector("#add-task-content").value = "";
	submitConfirm.addEventListener("click",submitAddTask);
	submitCancel.addEventListener("click",submitCancelTask);
})
function submitAddTask(event) {
	event.preventDefault();
	let taskName = document.querySelector("#add-task-topic");
	let taskDate = document.querySelector("#add-task-date");
	let taskCont = document.querySelector("#add-task-content");
	let newTask = new taskObj(taskName.value,taskDate.value,taskCont.value);
	taskArray.push(newTask);
	taskShowArray.push(newTask);
	taskShow(taskShowArray);
	addTask.style.display = "none";
	submitConfirm.removeEventListener("click",submitAddTask);
	classifyShow();
}
function submitCancelTask(event) {
	event.preventDefault();
	addTask.style.display = "none";
	submitCancel.removeEventListener("click",submitCancelTask)
}


//分类对象构造器
function classifyBranch(str) {
	this.name = str;
	this.branch = [];
}
//任务对象构造器
function taskObj(na,da,con) {
	this.name = na;
	this.date = da;
	this.content = con;
	this.state = false;
	this.taskLabel = currentTask;
}
//根据任务名获取任务信息
function findTask(name) {
	for (var i = 0; i < taskArray.length; i++) {
		if (name == taskArray[i]["name"]) {
			return taskArray[i];
		}	
	}
	return false;
}
//寻找当前分类对象分支
function findBranch(obj,str) {
	let stack = [obj];
	while(stack.length > 0){
		let father = stack.shift();
		for (var i = 0; i < father["branch"].length; i++) {
			if (father["branch"][i]["name"] == str) {
				return father["branch"][i];
			}else if (father["branch"][i]["branch"].length > 0){
				stack.push(father["branch"][i]);
			}
		}
	}
	return false;
}
//寻找当前分类
function findClassifyShow(root,callback) {
	let stack = [root];
	while(stack.length > 0){
		let father = stack.shift();
		for (var i = 0; i < father.children.length; i++) {
			if (callback(father.children[i])) {
				return father.children[i];
			}else if (father.children[i].children.length > 0){
				stack.push(father.children[i]);
			}
		}
	}
	return false;
}
//判断是否拥有此类
function findClassName(element) {
	if (element.classList.contains("classify-list-show")) {
		return true;
	}else{
		return false;
	}
}
//显示任务
function taskShow(array) {
	taskContent.textContent = "";
	let dateArray = [];
	for (var i = 0; i < array.length; i++) {
		if (! dateArray.includes(array[i]["date"])) {
			dateArray.push(array[i]["date"]);
		}	
	}
	for (var i = dateArray.length - 1; i >= 0; i--) {
		for (var j = 0; j <= i; j++) {
			if (dateArray[j] > dateArray[j+1]) {
				let d = dateArray[j];
				dateArray[j] = dateArray[j+1];
				dateArray[j+1] = d;
			}
		}
	}
	let ul = document.createElement("ul");
	taskContent.append(ul);
	for (var i = 0; i < dateArray.length; i++) {
		let li = document.createElement("li");
		li.textContent = dateArray[i];
		ul.append(li);
		let ul1 = document.createElement("ul");
		ul.append(ul1);
		for (var j = 0; j < array.length; j++) {
			if (array[j]["date"] == dateArray[i]) {
				let li1 = document.createElement("li");
				li1.classList.add("taskShow");
				li1.textContent = array[j]["name"];
				ul1.append(li1);
				if (array[j]["state"]) {
					li1.classList.add("complete");
				}
			}
		}
	}
}
//显示分类
function classifyShow() {
	let classListUl = classifyList.children[1];
	classListUl.textContent = "";
	let marginLeftLength = 20;
	for (var i = 0; i < classifyObj["branch"].length; i++) {
		let li = document.createElement("li");
		let bra = classifyObj["branch"][i];
		classListUl.append(li);
		let newI = document.createElement("i");
		newI.classList.add("bi");
		newI.classList.add("bi-folder2-open");
		newI.style.marginLeft = marginLeftLength+"px";
		li.prepend(newI);
		let p = document.createElement("p");
		li.append(p);
		let secI = document.createElement("i");
		secI.classList.add("bi");
		secI.classList.add("bi-x-lg");
		li.append(secI);
		let number = 0;
		let n = 0;
		for (var j = 0; j < taskArray.length; j++) {
			if (taskArray[j]["taskLabel"] == bra["name"]) {
				number++;
			}
		}
		if (bra["branch"].length > 0) {
			n =  addUL(li,bra,marginLeftLength);
		}
		p.textContent = bra["name"]+"("+(number+n)+")";
	}
	const lis = document.querySelectorAll("#classify-list li");
	for (var i = 0; i < lis.length; i++) {
		let str = lis[i].children[1].textContent.split("(");
		if (str[0] == currentTask) {
			lis[i].classList.add("classify-list-show");
		}
	}
}
//显示分类递归
function addUL(oldLi,obj,margin) {
	let ul = document.createElement("ul");
	oldLi.after(ul);
	let totalNumber = 0;
	let marginLeftLength = margin + 10;
	for (var i = 0; i < obj["branch"].length; i++) {
		let li = document.createElement('li');
		let bra = obj["branch"][i];
		ul.append(li);
		let newI = document.createElement("i");
		newI.classList.add("bi");
		newI.classList.add("bi-files-alt");
		newI.style.marginLeft = marginLeftLength+"px";
		li.prepend(newI);
		let p = document.createElement("p");
		li.append(p);
		let secI = document.createElement("i");
		secI.classList.add("bi");
		secI.classList.add("bi-x-lg");
		li.append(secI);

		let number = 0;
		let n = 0;
		for (var j = 0; j < taskArray.length; j++) {
			if (taskArray[j]["taskLabel"] == bra["name"]) {
				number++;
			}
		}
		if (bra["branch"].length > 0) {
			n =  addUL(li,bra,marginLeftLength);
		}
		p.textContent = bra["name"]+"("+(number+n)+")";
		totalNumber = totalNumber + number + n;
	}
	return totalNumber;
}
//删除分类
function removeBranch(event) {
	let target = event.target;
	if (!target.classList.contains("bi-x-lg")) {return}
	// console.log(classifyObj);
	// console.log(taskArray);
	target = target.parentNode;
	let str = target.children[1].textContent.split("(");
	let branchObj = findBranch(classifyObj,str[0]);
	removeTask(branchObj);
	if (target.parentNode == classifyList.children[1]) {
		let index = classifyObj["branch"].indexOf(branchObj);
		classifyObj["branch"].splice(index,1);
	}else{
		let father = target.parentNode;
		let locate = 0;
		for (var i = 0; i < father.parentNode.children.length; i++) {
			if(father.parentNode.children[i] == father){
				locate = i;
				break;
			}
		}
		locate--;
		father = father.parentNode.children[locate];
		let str1 = father.children[1].textContent.split("(");
		let branchFatherObj = findBranch(classifyObj,str1[0]);
		let index = branchFatherObj["branch"].indexOf(branchObj);
		branchFatherObj["branch"].splice(index,1);
	}
	classifyShow();
	// console.log(classifyObj);
	// console.log(taskArray);
}
//因为删除分类而删除任务
function removeTask(branch) {
	let stack = [];
	stack.push(branch);
	while(stack.length > 0){
		let father = stack.shift();
		let cashArray = [];

		for (var i = 0; i < taskArray.length; i++) {
			if (taskArray[i]["taskLabel"] != father["name"]) {
				cashArray.push(taskArray[i]);
			}
		}
		taskArray = cashArray;
		console.log(taskArray);
		if (father["branch"].length > 0) {
			for (var i = 0; i < father["branch"].length; i++) {
				stack.push(father["branch"][i]);
			}
		}
	}
}
