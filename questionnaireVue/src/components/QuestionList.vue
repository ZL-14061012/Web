<script>
	export default{
		props: ["qtaList"],
		methods: {
			qtaDel(event){
				let target = event.target;
				let li = target.parentNode;
				let ul = li.parentNode;
				let x = 999;
				for (var i = 0; i < ul.children.length; i++) {
					if (li == ul.children[i]) {
						x = i;
						break;
					}
				}
				this.$emit("questionnaireDel",x);
			},
			qtaEdit(event){
				let target = event.target;
				let li = target.parentNode;
				let ul = li.parentNode;
				let x = 999;
				for (var i = 0; i < ul.children.length; i++) {
					if (li == ul.children[i]) {
						x = i;
						break;
					}
				}
				this.$emit("questionnaireEdit",x);
			},
			qtaAdd(){
				this.$emit("questionnaireAdd");
			},
			qtaDelAll(){
				this.$emit("questionnaireDelAll");
			},
			choseAll(){
				let qtaList = document.querySelector(".show-list ul").children;
				if (event.target.checked){
					for (let i = 0;i < qtaList.length; i++){
						qtaList[i].children[0].children[0].checked = true;
					} 
				}else{
					for (let i = 0;i < qtaList.length; i++){
						qtaList[i].children[0].children[0].checked = false;
					} 
				}
			},
		},
		computed: {
			realQtaList(){
				let quesArray = [];
				for (let i = 0;i < this.qtaList.length;i++){
					if (this.qtaList[i]){
						quesArray.push(this.qtaList[i]);
					}
				}
				return quesArray;
			}
			
		}
	}
	
</script>
<template>
	<div className="show-list">
		<div>
			<span>标题</span>
			<span>时间</span>
			<span>状态</span>
			<span>操作</span>
			<button @click = "qtaAdd">+新建问卷</button>
		</div>
		
		<ul>
			<li v-for="qta in realQtaList">
				<label>
				<input type="checkbox"/>{{qta.topic}}	
				</label>	
				<p>{{qta.date[0]}}-{{qta.date[1]}}-{{qta.date[2]}}</p>
				<p>{{qta.states}}</p>
				<button @click = "qtaEdit" >编辑</button>
				<button @click = "qtaDel">删除</button>
				<button>查看问卷</button>
			</li>
		</ul>
		<div className="show-list-foot">
			<label>
				<input type="checkbox" @change="choseAll"/>全选	
			</label>	
			<button @click="qtaDelAll">删除</button>
		</div>
	</div>
</template>