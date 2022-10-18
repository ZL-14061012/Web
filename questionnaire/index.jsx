import React from "react";
import ReactDOM from "react-dom/client";
import Prompt from "./components/Prompt.jsx";
import QuestionList from "./components/QuestionList.jsx";
import QuestionnaireEdit from "./components/QuestionnaireEdit.jsx";
import "./index.css";

let firstQuestionnaire = {
	topic:"LikeFood",
	date:[2022,10,16],
	states:"未发布",
	questionArray:[{
		question:"您最喜爱的主食是什么？",
		answer:["面包","米饭","面条","馒头"],
		questionType:"radio",
		required:true,
	},{
		question:"您喜欢的甜点有哪些？",
		answer:["半熟芝士","蛋糕","半熟","芝士"],
		questionType:"checkbox",
		required:true,
	},{
		question:"请您描述家乡最美味的食物",
		answer:["表单处理程序（form-handler）通常是包含处理输入数据的脚本的服务器页面。"],
		questionType:"textarea",
		required:true,
	}],
}
let questionnaireArray=[firstQuestionnaire,firstQuestionnaire,firstQuestionnaire];



class Questionnaire extends React.Component{
	constructor(props){
		super(props);
		this.questionnaireQuestionAdd = this.questionnaireQuestionAdd.bind(this);
		this.questionnaireQuestionAnswerChange = this.questionnaireQuestionAnswerChange.bind(this);
		this.questionnaireQuestionQuesChange = this.questionnaireQuestionQuesChange.bind(this);
		this.questionnaireQuestionOperate = this.questionnaireQuestionOperate.bind(this);
		this.questionnaireQuestionTextarea = this.questionnaireQuestionTextarea.bind(this);
		this.questionnaireTopicChange = this.questionnaireTopicChange.bind(this);
		this.questionnaireDateMonthChange = this.questionnaireDateMonthChange.bind(this);
		this.questionnaireDateDayChange = this.questionnaireDateDayChange.bind(this);
		this.questionnaireSave = this.questionnaireSave.bind(this);
		this.questionnairePublish = this.questionnairePublish.bind(this);
		this.questionnaireAdd = this.questionnaireAdd.bind(this);
		this.questionnaireEditBtn = this.questionnaireEditBtn.bind(this);
		this.questionnaireDel = this.questionnaireDel.bind(this);
		this.questionnaireDelAll =this.questionnaireDelAll.bind(this);
		this.state = {
			questionnairelist:questionnaireArray,
			currentQta:questionnaireArray[0],
		}
	}
	questionnaireQuestionAdd(type){
		let ques;
		if (type == "textarea"){
			ques = {
				question:"问题",
				answer:["表单内容"],
				questionType:"textarea",
			}
		}else{
			ques = {
				question:"问题",
				answer:["选项一","选项二","选项三","选项四"],
				questionType:type,
			}
		}
		let qta = JSON.parse(JSON.stringify(this.state.currentQta));
		qta["questionArray"].push(ques);
		this.setState({currentQta:qta,});
		setTimeout(()=>{
			this.questonnaireQuestionSort();
		},0);
		
	}
	questionnaireQuestionAnswerChange(locate1,locate2,value){
		let qta = JSON.parse(JSON.stringify(this.state.currentQta));
		qta.questionArray[locate1].answer[locate2] =value;
		this.setState({currentQta:qta,});
	}
	questionnaireQuestionQuesChange(locate,value,target){
		let qta = JSON.parse(JSON.stringify(this.state.currentQta));
		qta.questionArray[locate].question =value;
		this.setState({currentQta:qta,});
		target.focus();
	}
	questionnaireQuestionOperate(value,locate){
		let qta = JSON.parse(JSON.stringify(this.state.currentQta));
		if (value == "上移"){
			if (locate > 0){
				let x = qta.questionArray[locate];
				qta.questionArray[locate] = qta.questionArray[locate-1];
				qta.questionArray[locate-1] = x;
			}
		}else if (value == "下移"){
			if (locate < qta.questionArray.length-1){
				let x = qta.questionArray[locate];
				qta.questionArray[locate] = qta.questionArray[locate+1];
				qta.questionArray[locate+1] = x;
			}
		} else if (value == "复用"){
			let x = qta.questionArray[locate];
			qta.questionArray.splice(locate,0,x);
		} else if (value == "删除"){
			qta.questionArray.splice(locate,1);
		}
		this.setState({currentQta:qta,});
	}
	questionnaireTopicChange(value){
		let qta = JSON.parse(JSON.stringify(this.state.currentQta));
		qta.topic = value;
		this.setState({currentQta:qta,});
	}
	questionnaireQuestionTextarea(value,locate){
		let qta = JSON.parse(JSON.stringify(this.state.currentQta));
		qta.questionArray[locate].required =value;
		this.setState({currentQta:qta,});
	}
	questonnaireQuestionSort(){
		let qta = JSON.parse(JSON.stringify(this.state.currentQta));
		let ary = qta.questionArray;
		for (let i = 0; i < ary.length; i++){
			if (ary[i].questionType == "textarea"){
				let x = ary[i];
				ary.splice(i,1);
				ary.push(x);
				i++;
			}	
		} 
		this.setState({currentQta:qta,});
	}
	questionnaireDateMonthChange(judge){
		let qta = JSON.parse(JSON.stringify(this.state.currentQta));
		let date = qta.date;
		if (judge == "+"){
			if (date[1]<12){
				date[1]++;
			}else{
				date[1] = 1;
				date[0]++;
			}
		}else if(judge == "-"){
			if (date[1] > 1){
				date[1]--;
			}else{
				date[1] = 12;
				date[0]--;
			}
		} else{
			Error("questionnaireDateMonthChange Wrong");
		}
		this.setState({currentQta:qta,});
	}
	questionnaireDateDayChange(value){
		let qta = JSON.parse(JSON.stringify(this.state.currentQta));
		qta.date[2] = Number(value);
		this.setState({currentQta:qta,});
	}
	questionnaireSave(){
		let qta = JSON.parse(JSON.stringify(this.state.currentQta));
		qta.states = "未发布";
		let qtaArray = JSON.parse(JSON.stringify(this.state.questionnairelist));
		let judge = true;
		for (let i = 0;i < qtaArray.length; i++){
			if (qtaArray[i] == null){
				qtaArray[i] = qta;
				judge = false;
				break;
			} 
		}
		if (judge){
			qtaArray.push(qta);
		}
		this.setState({questionnairelist:qtaArray,});
		document.querySelector(".questionnaire-edit").style.display = "none";
	}
	questionnairePublish(){
		document.querySelector(".publish").style.display="none";
		let qta = JSON.parse(JSON.stringify(this.state.currentQta));
		qta.states = "发布中";
		let qtaArray = JSON.parse(JSON.stringify(this.state.questionnairelist));
		let judge = true;
		for (let i = 0;i < qtaArray.length; i++){
			if (qtaArray[i] == null){
				qtaArray[i] = qta;
				judge = false;
				break;
			} 
		}
		if (judge){
			qtaArray.push(qta);
		}
		this.setState({questionnairelist:qtaArray,});
		document.querySelector(".questionnaire-edit").style.display = "none";
	}
	questionnaireAdd(){
		let qta = {
			topic:"问卷名",
			date:[2022,10,16],
			states:"未发布",
			questionArray:[],
		}
		this.setState({currentQta:qta,});
		document.querySelector(".questionnaire-edit").style.display = "block";
	}
	questionnaireEditBtn(index){
		let qtaArray = JSON.parse(JSON.stringify(this.state.questionnairelist));
		let qta = qtaArray[index];
		qtaArray[index] = null;
		this.setState({
			currentQta:qta,
			questionnairelist:qtaArray,
		});
		document.querySelector(".questionnaire-edit").style.display = "block";
	}
	questionnaireDel(index){
		document.querySelector(".closesingle").style.display="none";
		let qtaArray = JSON.parse(JSON.stringify(this.state.questionnairelist));
		qtaArray.splice(index,1);
		this.setState({
			questionnairelist:qtaArray,
		});
	}
	questionnaireDelAll(list){
		document.querySelector(".closeall").style.display="none";
		let choseList = [];
		let qtaList = document.querySelector(".show-list ul").children;
		for (let i = 0;i < qtaList.length; i++){
			if(qtaList[i].children[0].children[0].checked){
				choseList.push(i);
			}
		} 
		let qtaArray = JSON.parse(JSON.stringify(this.state.questionnairelist));
		let qtaNewArray=[];
		for (let i = 0;i < qtaArray.length;i++){
			if (!choseList.includes(i)){
				qtaNewArray.push(qtaArray[i]);
			}
		}
		this.setState({
			questionnairelist:qtaNewArray,
		});
	}
	render(){
		return(
			<div className="questionnaire">
				<nav>
					<span>
						<i className="bi bi-question-circle"></i>问卷管理
					</span>
					<span>我的问卷</span>	
				</nav>
				<QuestionList 
					array={this.state.questionnairelist}
					qtaAdd={this.questionnaireAdd}
					qtaEdit={this.questionnaireEditBtn}
					qtaDel={this.questionnaireDel}
					qtaDeleteAllQues={this.questionnaireDelAll}/>
				<QuestionnaireEdit 
					questionnaireTarget={this.state.currentQta} 
					qtaQuesAdd={this.questionnaireQuestionAdd} 
					qtaTopic={this.questionnaireTopicChange}
					qtaQuesAnswerChange={this.questionnaireQuestionAnswerChange}
					qtaQueQuestionChange={this.questionnaireQuestionQuesChange}
					qtaQuesQuestionOperation={this.questionnaireQuestionOperate}
					qtaQuesQuestionTextarea={this.questionnaireQuestionTextarea}
					qtaDateMonthChange={this.questionnaireDateMonthChange}
					qtaDateDayChange={this.questionnaireDateDayChange}
					saveQta={this.questionnaireSave}
					publishQta={this.questionnairePublish}
				/>
				<Prompt 
					classOther = "closeall"
					content="确认删除所有问卷"
					perform={this.questionnaireDelAll}/>
				<Prompt 
					classOther = "publish"
					content={"确认发布此问卷?"+this.state.currentQta["date"]}
					perform={this.questionnairePublish}/>
			</div>
		);
	}
}

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<Questionnaire />);