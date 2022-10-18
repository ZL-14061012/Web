//管理调查问卷界面
import "../index.css";
import Prompt from "./Prompt.jsx";

function ListButton(props){
	return(
		<button className="list-btn" onClick={props.onClick}>
			{props.name}
		</button>
	);
}
function Listli(props){
	return(
		<li>
			<label>
				<input type="checkbox"/>{props.name}	
			</label>	
			<p>{props.date[0]}-{props.date[1]}-{props.date[2]}</p>
			<p>{props.states}</p>
			<ListButton name="编辑" onClick={props.onClickDiv}/>
			<ListButton name="删除" onClick={()=>document.querySelector(".closesingle").style.display="block"}/>
			<ListButton name={props.states=="未发布"?"查看问卷":"查看数据"} onClick={props.onClickRead}/>
			<Prompt 
				classOther = "closesingle"
				content={"确认删除此问卷?"}
				perform={props.onClickDel}/>
		</li>
	);
}

function ListUl(props){
	const qusAry = props.questionnaireArray;
	const listItems = qusAry.map((arr,index)=>
		<Listli 
		    key={index}
		    name={arr.topic}
			date={arr.date} 
			states={arr.states} 
			onClickDiv={()=>props.qtaEdit(index)}
			onClickDel={()=>props.qtaDel(index)}
			onClickRead={()=>console.log("hello")}
		/>
	);
	return(
		<ul>{listItems}</ul>
	);
}

function QuestionList(props){
	let index = 0;
	let quesArray = [];
	for (let i = 0;i < props.array.length;i++){
		if (props.array[i]){
			quesArray.push(props.array[i]);
		}
	}
	// function qtaDeleteAll(event){
	// 	let choseList = [];
	// 	let qtaList = document.querySelector(".show-list ul").children;
	// 	for (let i = 0;i < qtaList.length; i++){
	// 		if(qtaList[i].children[0].children[0].checked){
	// 			choseList.push(i);
	// 		}
	// 	} 
	// 	props.qtaDeleteAllQues(choseList);
	// }
	function choseAll(event){
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
	}
	return(
		<div className="show-list">
			<div>
				<span>标题</span>
				<span>时间</span>
				<span>状态</span>
				<span>操作</span>
				<button onClick={props.qtaAdd}>+新建问卷</button>
			</div>
			<ListUl 
				questionnaireArray={quesArray}
				qtaEdit={props.qtaEdit}
				qtaDel={props.qtaDel}/>
			<div className="show-list-foot">
				<label>
					<input type="checkbox" onChange={choseAll}/>全选	
				</label>	
				<button onClick={()=>document.querySelector(".closeall").style.display="block"}>
					删除</button>
			</div>
		</div>
	);
}
export default QuestionList;