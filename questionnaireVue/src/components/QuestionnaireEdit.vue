<script>
	import Calendar from "./Calendar.vue"
	export default{
		components:{
	      Calendar,
	    },
		props:["quesTarget"],
		data(){
			return{
				// topic : this.quesTarget.topic,
				// questionArray : this.quesTarget.questionArray,
				// date : this.quesTarget.date
			}
		},
		methods : {
			topChange(event){
				let value = event.target.value;
				this.$emit("topicChange",value);
			},
			//问卷问题标题修改
			quesTopChange(event){
				let t = event.target;
				let value = event.target.value;
				let target = event.target.parentNode.parentNode;
				let father = target.parentNode;

				let locate = null;
				for (var i = 0; i < father.children.length; i++){
					if ( target == father.children[i]){
						locate = i;
						break;
					}
				}
				this.$emit("quesTopicChange",locate,value,t);
			},
			//问卷问题是否为必填
			quesTearReqed(event){
				let value = event.target.checked;
				let target = event.target.parentNode.parentNode.parentNode;
				let father = target.parentNode;

				let locate = null;
				for (var i = 0; i < father.children.length; i++){
					if ( target == father.children[i]){
						locate = i;
						break;
					}
				}
				this.$emit("quesTextareaRequired",value,locate);
			},
			//问卷问题答案修改函数
			quesAnswChange(event){
				let value = event.target.value
				let target = event.target.parentNode;
				let father = target.parentNode;
				let locate2 = null;
				for (var i = 0; i < father.children.length; i++){
					if ( target == father.children[i]){
						locate2 = i;
						break;
					}
				}
				target = father.parentNode;
				father = target.parentNode;

				let locate1 = null;
				for (var i = 0; i < father.children.length; i++){
					if ( target == father.children[i]){
						locate1 = i;
						break;
					}
				}
				this.$emit("quesAnswerChange",locate1,locate2,value);
			},
			//问卷问题操作函数
			quesOperation(event){
				let value = event.target.textContent;
				let target = event.target.parentNode.parentNode;
				let father = target.parentNode;

				let locate = null;
				for (var i = 0; i < father.children.length; i++){
					if ( target == father.children[i]){
						locate = i;
						break;
					}
				}
				this.$emit("quesQuestionOperate",value,locate);
			},
			//点击添加问题
			quesAddShowP(){
				let qasp = document.querySelector(".question-add p");
				if (qasp.style.display == "none"){
					qasp.style.display = "flex";
				}else{
					qasp.style.display = "none";
				}
			},
			//添加单选问题
			quesAddRadio(){
				this.$emit("quesQuestionAdd","radio");
			},
			quesAddCheckbox(){
				this.$emit("quesQuestionAdd","checkbox");
			},
			quesAddTextarea(){
				this.$emit("quesQuestionAdd","textarea");
			},
			//保存问卷
			saveQta(){
				this.$emit("saveQuestionnaire");
			},
			//发布问卷
			publishQta(){
				this.$emit("publishQuestionnaire");
			},
			//显示日历
			showCalendar(){
				let target = event.target;
				let cal = target.parentNode.children[1];
				cal.style.display = "block";
			},
			//更改日历月份
			dateMonChange(value){
				this.$emit("dateMonthChange",value);
			},
			//更改日历日期
			dateDaChange(value){
				this.$emit("dateDayChange",value);
			}
		},
	}
</script>
<template>
	<div className="questionnaire-edit">
		<h2>
			<input type="text" :value="quesTarget.topic" @input="topChange"/>
		</h2>
		<ul>
			<li v-for="question in quesTarget.questionArray" className="question-list">
				<p>
					<input type="text" :value="question.question" @change="quesTopChange"/>
					<label v-if="(question.questionType == 'textarea')">
						<input type="checkbox" @change="quesTearReqed"/>此题是否必填
					</label>
					<span v-else></span>
				</p>
				<textarea v-if="(question.questionType == 'textarea')" rows="10" cols="30" value="question.answer[0]"></textarea>
				<form v-else>
					<li v-for="answer in question.answer">
						<label>
							<input :type="question.questionType" />
							<input :type="text" :value="answer" @change="quesAnswChange"/>   
						</label>
					</li>
				</form>
				<span v-if="(question.questionType == 'textarea')"></span>
				<div v-else>
					<button @click="quesOperation">上移</button>
					<button @click="quesOperation">下移</button>
					<button @click="quesOperation">复用</button>
					<button @click="quesOperation">删除</button>
				</div>
			</li>
		</ul>
		<div className="question-add">
			<p>
				<button @click="quesAddRadio"><i className="bi bi-record"></i>单选</button>
				<button @click="quesAddCheckbox"><i className="bi bi-check-square"></i>多选</button>
				<button @click="quesAddTextarea"><i className="bi bi-file-text"></i>文本题</button>
			</p>
			<div @click="quesAddShowP">+添加问题</div>
		</div>
		<div className="question-foot">
			<span>问卷截止日期</span>
			<div>
				<input 
					type="button" 
					@click="showCalendar"
					:value="quesTarget.date[0]+'-'+quesTarget.date[1]+'-'+quesTarget.date[2]"/>
				<Calendar 
					:qtaDate="quesTarget.date"
					@date-month-change="dateMonChange"
					@date-day-change="dateDaChange"/>
			</div>
			<button @click="saveQta">保存问卷</button>
			<button @click="publishQta">发布问卷</button>
		</div>
	</div>
</template>