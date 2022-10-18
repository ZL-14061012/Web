//提示窗口
import React from "react";
import "../index.css";

function Prompt(props){
	return(
		<div className={props.classOther+" prompt-back"}>
			<div className="prompt-window">
				<p className="first-p">提示<i className="bi bi-x-lg" onClick={()=>document.querySelector("."+(props.classOther)).style.display="none"}></i></p>
				<p className="second-p">{props.content}</p>
				<p className="last-p">
					<button onClick={props.perform}>确认</button>
					<button onClick={()=>document.querySelector("."+props.classOther).style.display="none"}>取消</button>
				</p>
			</div>
		</div>
	);
}

export default Prompt;