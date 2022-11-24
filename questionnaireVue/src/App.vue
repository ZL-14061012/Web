<script>
  import QuestionList from "./components/QuestionList.vue";
  import QuestionnaireEdit from "./components/QuestionnaireEdit.vue"
  export default {
    components:{
      QuestionList,
      QuestionnaireEdit,
    },
    data(){
      return{
        questionnaireArray : [{
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
        },
        {
          topic:"LikeFood",
          date:[2022,10,17],
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
        },
        {
          topic:"LikeFood",
          date:[2022,10,18],
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
        },],
        currentQta : {
          topic:"问卷名",
          date:[2022,10,16],
          states:"未发布",
          questionArray:[{
            question:"您最喜爱的主食是什么？",
            answer:["面包","米饭","面条","馒头"],
            questionType:"radio",
            required:true,
          },],
        },
      }
    },
    methods:{
      //删除问卷
      qtaDel(locate){
        this.questionnaireArray.splice(locate,1);
      },
      //编辑问卷
      qtaEdit(locate){
        let qtaArray = JSON.parse(JSON.stringify(this.questionnaireArray));
        let qta = qtaArray[locate];
        qtaArray[locate] = null;
        this.currentQta = qta;
        this.questionnaireArray = qtaArray;
        document.querySelector(".questionnaire-edit").style.display = "block";
      },
      //新建问卷
      qtaAdd(){
        let qta = {
          topic:"问卷名",
          date:[2022,10,16],
          states:"未发布",
          questionArray:[],
        }
        this.currentQta = qta;
        document.querySelector(".questionnaire-edit").style.display = "block";
      },
      //删除所有问卷
      qtaDelAll(){
        let choseList = [];
        let qtaList = document.querySelector(".show-list ul").children;
        for (let i = 0;i < qtaList.length; i++){
          if(qtaList[i].children[0].children[0].checked){
            choseList.push(i);
          }
        } 
        let qtaArray = JSON.parse(JSON.stringify(this.questionnaireArray));
        let qtaNewArray=[];
        for (let i = 0;i < qtaArray.length;i++){
          if (!choseList.includes(i)){
            qtaNewArray.push(qtaArray[i]);
          }
        }
        this.questionnaireArray = qtaNewArray;
      },
      //修改问卷标题
      topChange(value){
        this.currentQta.topic = value;
      },
      //修改问卷问题标题
      quesTopChange(locate,value,target){
        let qta = JSON.parse(JSON.stringify(this.currentQta));
        qta.questionArray[locate].question =value;
        this.currentQta = qta;
        target.focus();
      },
      //勾选问卷问题是否为必填
      quesTearReqed(value,locate){
        let qta = JSON.parse(JSON.stringify(this.currentQta));
        qta.questionArray[locate].required =value;
        this.currentQta = qta;
      },
      //问卷问题答案修改函数
      quesAnswChange(locate1,locate2,value){
        let qta = JSON.parse(JSON.stringify(this.currentQta));
        qta.questionArray[locate1].answer[locate2] =value;
        this.currentQta = qta;
      },
      //问卷问题操作函数
      quesOperation(value,locate){
        let qta = JSON.parse(JSON.stringify(this.currentQta));
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
        this.currentQta = qta;
      },
      //问卷问题添加
      quesAdd(type){
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
        let qta = JSON.parse(JSON.stringify(this.currentQta));
        qta["questionArray"].push(ques);
        this.currentQta = qta;
        setTimeout(()=>{
          this.questonnaireQuestionSort();
        },0);
      },
      //问卷问题排序
      questonnaireQuestionSort(){
        let qta = JSON.parse(JSON.stringify(this.currentQta));
        let ary = qta.questionArray;
        for (let i = 0; i < ary.length; i++){
          if (ary[i].questionType == "textarea"){
            let x = ary[i];
            ary.splice(i,1);
            ary.push(x);
            i++;
          } 
        } 
        this.currentQta = qta;
      },
      //保存问卷
      saveQta(){
        let qta = JSON.parse(JSON.stringify(this.currentQta));
        qta.states = "未发布";
        let qtaArray = JSON.parse(JSON.stringify(this.questionnaireArray));
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
        this.questionnaireArray = qtaArray;
        document.querySelector(".questionnaire-edit").style.display = "none";
      },
      //发布问卷
      publishQta(){
        let qta = JSON.parse(JSON.stringify(this.currentQta));
        qta.states = "发布中";
        let qtaArray = JSON.parse(JSON.stringify(this.questionnaireArray));
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
        this.questionnaireArray = qtaArray;
        document.querySelector(".questionnaire-edit").style.display = "none";
      },
      //更改日期月份
      calendarChangeMonth(judge){
        let qta = JSON.parse(JSON.stringify(this.currentQta));
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
        this.currentQta = qta;
      },
      //更改日期日子
      calendarChangeDate(value){
        let qta = JSON.parse(JSON.stringify(this.currentQta));
        qta.date[2] = Number(value);
        this.currentQta = qta;
      },
    },
    
  }
  
  
</script>

<template>
  <nav>
    <span>
      <i className="bi bi-question-circle"></i>问卷管理
    </span>

    <span>我的问卷</span> 
    <!-- <span>{{currentQta}}</span> -->
  </nav>

  <QuestionList 
    :qta-list="questionnaireArray" 
    @questionnaireDel="qtaDel"
    @QuestionnaireEdit="qtaEdit"
    @questionnaireAdd="qtaAdd"
    @questionnaireDelAll="qtaDelAll"/>
  <QuestionnaireEdit 
    :ques-target="currentQta" 
    @topic-change="topChange"
    @ques-topic-change="quesTopChange"
    @ques-textarea-required="quesTearReqed"
    @ques-answer-change="quesAnswChange"
    @ques-question-operate="quesOperation"
    @ques-question-add="quesAdd"
    @save-questionnaire="saveQta"
    @publish-questionnaire="publishQta"
    @date-month-change="calendarChangeMonth"
    @date-day-change="calendarChangeDate"/>    

</template>

<style>
  @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css");
  *{
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    box-sizing: border-box;
  }
  button{
    height: 20px;
    width: 50px;
    background-color: #f5f5f5;
    border-style: none;
    border: 1px solid #dcdcdc;
  }
  button:hover{
    background-color: orange;
    color: white;
  }
  nav{
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: orange;
    color: white;
  }
  nav span:first-child{
    font-size: 1.1rem;
    font-weight: bold;
    margin-left: 80px;
  }
  nav span:first-child i{
    margin-right: 10px;
    font-size: 1.4rem;
  }
  nav span+span{
    font-size: .8rem;
    margin-left: 80px;
  }
  .show-list{
    background-color: white;
    height: 400px;
    width: 800px;
    margin: 20px auto;
  }
  .show-list>div:first-child{
    display: grid;
    background-color: #f5f5f5;
    grid-template-columns: 3fr 2fr 2fr 1fr 1fr;
    height: 40px;
    line-height: 40px;
    padding-left: 60px;
    padding-right: 40px;
  }

  .show-list>div:first-child button{
    background-color: orange;
    width: 80px;
    color: white;
    margin-top: 10px;
  }
  .show-list .show-list-foot{
    font-size: .9rem;
    height: 50px;
    line-height: 50px;
  }
  .show-list .show-list-foot input{
    margin-left: 30px;
    margin-right: 10px;
  }
  .show-list .show-list-foot button{
    margin-left: 20px;
  }
  .show-list li{
    display: grid;
    height: 50px;
    align-items: center;
    border-bottom: 1px solid #f5f5f5;
    grid-template-columns: 3.9fr 2.4fr 2fr 1fr 1fr 1fr;
    padding: 0 10px 0 10px;
    font-size: .9rem;
  }
  .show-list li:hover{
    background-color: #FFE4B5;
  }
  .show-list li input{
    margin-left: 20px;
    margin-right: 10px;
  }
  /*编辑调查问卷界面*/
  .questionnaire-edit{
    width: 60vw;
    height: 700px;
    position: absolute;
    left: 20vw;
    top: 70px;
    background-color: white;
    padding: 20px;
    overflow: auto;
    display: none;
  }
  .questionnaire-edit h2{
    width: 100%;
    height: 80px;
    /*line-height: 80px;*/
    border-bottom: 1px solid #d3d3d3;
    /*text-align: center;*/
  }
  .questionnaire-edit h2 input{
    width: 100%;
    height: 80px;
    line-height: 80px;
    text-align: center;
    border-style: none;
    font-size: 1.5rem;
    font-weight: bold;
  }
  .questionnaire-edit>ul{
    width: 100%;
    padding: 20px;
  }
  .questionnaire-edit>ul li:hover{
    background-color: #FFE4B5;
  }
  .questionnaire-edit>ul li:hover input{
    background-color: #FFE4B5;
  }
  .questionnaire-edit .question-list{
    list-style: none;
    padding: 20px 20px 10px 40px;
  }
  .questionnaire-edit .question-list p{
    display: flex;
    margin-bottom: 10px;
    padding-right: 10px;
  }
  .questionnaire-edit .question-list p>input{
    font-size: 1rem;
    border-style: none;
    width: 80%;
    height: 30px;
    line-height: 30px;
  }
  .questionnaire-edit .question-list p label{
    margin-left: auto;
    font-size: .7rem;
  }
  .questionnaire-edit .question-list div{
    display: flex;
    visibility: hidden;
  }
  .questionnaire-edit .question-list:hover div{
    visibility: inherit;
  }
  .questionnaire-edit .question-list div button{
    border-style: none;
    background-color: transparent;
  }
  .questionnaire-edit .question-list div button:first-child{
    margin-left: auto;
  }
  .questionnaire-edit .question-list label{
    display: block;
    margin-bottom: 10px;
    margin-left: 20px;
  }
  .questionnaire-edit .question-list form label{
    display: flex;
    align-items: center;
    height: 30px;
  }
  .questionnaire-edit .question-list form label input+input{
    border-style: none;
    font-size: .8rem;
    margin-left: 12px;
    height: 30px;
    line-height: 30px;
  }
  .questionnaire-edit .question-list textarea{
    width: 400px;
    height: 100px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 20px;
    padding: 10px;
  }
  .questionnaire-edit .question-add{
    margin: 20px;
    border: 1px solid gray;
  }
  .questionnaire-edit .question-add p{
    height: 50px;
    line-height: 50px;
    width: 100%;
    justify-content: center;
    align-items: center;
    display: none;
  }
  .questionnaire-edit .question-add p button{
    text-align: center;
    margin: 0 20px 0 20px;
    height: 25px;
    line-height: 25px;
    width: 60px;
  }
  .questionnaire-edit .question-add div{
    height: 70px;
    width: 100%;
    background-color: #f5f5f5;
    text-align: center;
    line-height: 70px;
  }
  .questionnaire-edit .question-foot{
    width: 100%;
    height: 90px;
    border-top: 1px solid #d3d3d3;
    display: flex;
    align-items: center;
  }
  .questionnaire-edit .question-foot>span:first-child{
    margin-left: 100px;
    height: 30px;
    line-height: 30px;
    font-size: .8rem;
  }
  .questionnaire-edit .question-foot input{
    height: 28px;
    width: 180px;
    background-color: white;
    text-align: center;
    border-style: none;
    border: 1px solid #d3d3d3;
    margin-left: 20px;
    padding-left: 10px;
    position: relative;
  }
  .questionnaire-edit .question-foot button{
    width: 60px;

  }
  .questionnaire-edit .question-foot button:nth-child(3){
    margin: 0 20px 0 250px;
  }
  /*提示窗口*/
  .prompt-back{
    height: 100vh;
    width: 100vw;
    background-color: gray;
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }
  .prompt-back .prompt-window{
    width: 20vw;
    height: 140px;
    position: absolute;
    left: 40vw;
    top: 200px;
    background-color: white;
  }
  .prompt-window .first-p{
    height: 30px;
    display: flex;
    align-items: center;
    padding: 0 20px 0 20px;
    background-color: #f5f5f5;
  }
  .prompt-window .first-p i{
    margin-left: auto;
  }
  .prompt-window .second-p{
    height: 60px;
    padding: 20px;
    font-size: .8rem;
    color: gray;
  }
  .prompt-window .last-p{
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .prompt-window .last-p button{
    margin: 0 10px 0 10px;
  }
  .prompt-window .last-p button:hover{
    color: white;
    background-color: orange;
  }
  /*日历组件*/
  .calendar{
    width: 180px;
    height: 200px;
    position: absolute;
    margin-left: 20px;
    margin-top: 10px;
    display: none;
  }
  .calendar .calendar-head{
    height: 30px;
    background-color: orange;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: .8rem;
    padding: 10px;
  }
  .calendar .calendar-head i{
    height: 30px;
    width: 30px;
    line-height: 30px;
    text-align: center;
  }
  .calendar .calendar-head span span{
    margin: 0 5px 0 5px;
  }
  .calendar table{
    border-collapse: collapse;
    width: 180px;
    height: 160px;
  }
  .calendar table thead tr{
    height: 30px;
    background-color: orange;
    color: white;
    font-size: .6rem;
    font-weight: normal;
  }
  .calendar table thead th{
    width: 26px;
  }
  .calendar tr,
  .calendar table,
  .calendar td{
    border: 1px solid lightgray;
    text-align: center;
    font-size: .7rem;
    color: lightgray;
  }
  .questionnaire-edit .question-foot .calendar .calendar-button{
    width: 24px;
    border-style: none;
    margin: 0;
    padding: 0;
    background-color: white;
  }

</style>
