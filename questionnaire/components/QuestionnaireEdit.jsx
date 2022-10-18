//编辑调查问卷界面
import "../index.css";
import React from "react";
import Calendar from "./Calendar.jsx";

//编辑问卷界面的页脚
function QuestionFoot(props){
	function showCalendar(event){
		let target = event.target;
		let cal = target.parentNode.children[1];
		cal.style.display = "block";
	}
	return(
		<div className="question-foot">
			<span>问卷截止日期</span>
			<div>
				<input 
					type="button" 
					onClick = {showCalendar}
					value={props.date[0]+"-"+props.date[1]+"-"+props.date[2]}/>
				<Calendar 
					y={props.date[0]} m={props.date[1]} d={props.date[2]} 
					dateMonthChange={props.dateMonthChange}
					dateDayChange={props.dateDayChange}/>
			</div>
			
			<button onClick={props.saveQta}>保存问卷</button>
			<button onClick={()=>document.querySelector(".publish").style.display="block"}>发布问卷</button>
		</div>
	);
}
//编辑问卷添加问题模块
function QuestonAdd(props){
	function questionAddShowP(){
		let qasp = document.querySelector(".question-add p");
		if (qasp.style.display == "none"){
			qasp.style.display = "flex";
		}else{
			qasp.style.display = "none";
		}
	}
	function QuestonAddRadio(){
		props.qtaQuesAdd("radio");
	}
	function QuestionAddCheckbox(){
		props.qtaQuesAdd("checkbox");
	}
	function QuestionAddTextrea(){
		props.qtaQuesAdd("textarea");
	}
	return(<div className="question-add">
		<p>
			<button onClick={QuestonAddRadio}><i className="bi bi-record"></i>单选</button>
			<button onClick={QuestionAddCheckbox}><i className="bi bi-check-square"></i>多选</button>
			<button onClick={QuestionAddTextrea}><i className="bi bi-file-text"></i>文本题</button>
		</p>
		<div onClick={questionAddShowP}>+添加问题</div>
	</div>);
}

//问题部分
function QuestonList(props){
	//问题选项修改函数
	function answerChange(event){
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
		props.answerChange(locate1,locate2,value);
	}
	//问题题目修改函数
	function questionChange(event){
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
		props.questionChange(locate,value,t);
	}
	//问题操作，上移下移等等
	function questionOperation(event){
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
		props.questionOperate(value,locate);
	}
	//文本编辑区域操作
	function questionTextarea(event){
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
		props.questionTextarea(value,locate);
	}
	//问题中四个按钮小组件
	function QuestonEdit(){
		return(
			<div>
				<button onClick={questionOperation}>上移</button>
				<button onClick={questionOperation}>下移</button>
				<button onClick={questionOperation}>复用</button>
				<button onClick={questionOperation}>删除</button>
			</div>
		);
	}
	const questionType = props.questionType;
	const answerList = props.answer;
	let listItem;
	if(questionType == "textarea"){
		listItem = <textarea rows="10" cols="30" value={answerList[0]}></textarea>;
	}else{
		listItem = answerList.map((ary,index)=>
			<label key={index} value={index}>
				<input type={questionType} />
				<input type="text" value={ary} onChange={answerChange}/>   
			</label>
		);
	}
	return(
		<li className="question-list">
			<p><input type="text" value={props.question} onChange={questionChange}/>
			{(questionType == "textarea")
				? <label><input type="checkbox" onChange={questionTextarea}/>此题是否必填</label>
				:<span></span>}
			</p>
			<form>{listItem}</form>
			{(questionType == "textarea")
				? <span></span>
				:<QuestonEdit />}
		</li>
	);
}

class QuestionnaireEdit extends React.Component{
	constructor(props){
		super(props);
		this.quesAnswerChange = this.quesAnswerChange.bind(this);
		this.quesQuestionChange = this.quesQuestionChange.bind(this);
		this.quesQuestionOperate = this.quesQuestionOperate.bind(this);
		this.quesQuestionTextarea = this.quesQuestionTextarea.bind(this);
		this.qtaTopicChange = this.qtaTopicChange.bind(this);
		this.qtaDateMonthChange = this.qtaDateMonthChange.bind(this);
	}
	//问题选项修改函数，需要回调
	quesAnswerChange(locate1,locate2,value){
		this.props.qtaQuesAnswerChange(locate1,locate2,value);
	}
	//问题题目修改函数，需要回调
	quesQuestionChange(locate,value,target){
		this.props.qtaQueQuestionChange(locate,value,target);
	}
	//上移，下移问题
	quesQuestionOperate(value,locate){
		this.props.qtaQuesQuestionOperation(value,locate);
	}
	//文本编辑题是否必选
	quesQuestionTextarea(value,locate){
		this.props.qtaQuesQuestionTextarea(value,locate);
	}
	qtaTopicChange(event){
		let value = event.target.value;
		this.props.qtaTopic(value);
	}
	qtaDateMonthChange(judge){
		this.props.qtaDateMonthChange(judge);
	}
	render(){
		const questionArray = this.props.questionnaireTarget.questionArray;
		const listItem = questionArray.map((ary)=>
			<QuestonList 
				key={ary.question}
				answer={ary.answer}
				question={ary.question}
				questionType={ary.questionType}
				answerChange={this.quesAnswerChange}
				questionChange={this.quesQuestionChange}
				questionOperate={this.quesQuestionOperate}
				questionTextarea={this.quesQuestionTextarea}/>				
		);
		return(
			<div className="questionnaire-edit">
				<h2>
					<input 
						type="text" 
						value={this.props.questionnaireTarget.topic} 
						onChange={this.qtaTopicChange}/>
					</h2>
				<ul>{listItem}</ul>
				<QuestonAdd qtaQuesAdd={this.props.qtaQuesAdd}/>
				<QuestionFoot 
					date={this.props.questionnaireTarget.date}
					dateMonthChange={this.qtaDateMonthChange}
					dateDayChange={this.props.qtaDateDayChange}
					saveQta={this.props.saveQta}
					publishQta={this.props.publishQta}/>
			</div>
		);
	}
}
export default QuestionnaireEdit;