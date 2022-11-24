<script>
	export default{
		props:["qtaDate"],
		methods: {
			calendarChangeMonth(event){
				console.log("hello");
				let target = event.target;
				if (target.classList.contains("bi-caret-left-fill")){
					this.$emit("dateMonthChange","-");
				} else if(target.classList.contains("bi-caret-right-fill")){
					this.$emit("dateMonthChange","+");
				} else{
					Error("wrong");
				}
			},
			calendarChangeDate(event){
				let value = event.target.textContent;
				this.$emit("dateDayChange",value);
				let cal = event.target.parentNode.parentNode.parentNode.parentNode.parentNode;
				let tab = event.target.parentNode.parentNode.parentNode;
				let btns = tab.querySelectorAll("button");
				for (let i = 0;i < btns.length;i++){
					btns[i].style.backgroundColor = "white";
				  	btns[i].style.color = "black";
				}
				event.target.style.backgroundColor = "orange";
				event.target.style.color = "white";
				setTimeout(()=>{
					cal.style.display = "none";
				},100);
			},
		},
		computed: {
			compTrArray(){
				//查找当前月份长度，上个月长度，当前月第一天是星期几
				let y = this.qtaDate[0];
				let m = this.qtaDate[1] - 1;
				let d = this.qtaDate[2];
				let date = new Date();
				date.setFullYear(y,m,1);
				let firstday = date.getDay();
				let time = date.getTime();
				if (m == 0) {
					date.setFullYear(y-1,11,1);
				}else{
					date.setFullYear(y,m-1,1);
				}
				let timeB = date.getTime();
				if (m == 11) {
					date.setFullYear(y+1,0,1);
				}else{
					date.setFullYear(y,m+1,1);
				}
				let timeL = date.getTime();
				let monthLength = parseInt((timeL-time)/86400000);
				let lastMonthLength = parseInt((time-timeB)/86400000);
				//构造月历数组
				let calendarShow = [];
				let locate = 0;
				for (var i = 0; i < firstday; i++) {
					calendarShow.push({
						value:lastMonthLength - firstday + i +1,
						judge:false,
					});
					
					locate++;
				}
				for (var i = 1; i <= monthLength; i++) {
					calendarShow.push({
						value:i,
						judge:true,
					});
					
					if (locate == 6) {
						locate = -1;
					}
					locate++;
				}
				for (var i = 1; i <= (7-locate); i++) {
					calendarShow.push({
						value:i,
						judge:false,
					});	
				}
				//将月历数组按星期分割
				locate = 0;
				let trArray = [];
				let tdArray = [];
				for (let i = 0; i < calendarShow.length; i++){
					if (locate <= 6){
						tdArray.push(calendarShow[i]);
						locate++;
					}
					if (locate ==7){
						locate = 0;
						let newAry = tdArray;
						trArray.push(newAry);
						tdArray = [];
					}
				}
				return trArray;
			},
			data(){
				return{
					trArray:compTrArray(),
				}
			},
		}
	}
	
</script>
<template>
	<div className="calendar">
		<div className="calendar-head" @click="calendarChangeMonth">
			<i className="bi bi-caret-left-fill" ></i>
			<span>
				<span>{{qtaDate[0]}}</span>
				<span>{{qtaDate[1]}}</span>
			</span>
			<i className="bi bi-caret-right-fill"></i>
		</div>
		<table>
			<thead>
				<tr>
					<th>Sun</th>
					<th>Mon</th>
					<th>Tue</th>
					<th>Wed</th>
					<th>Thu</th>
					<th>Fri</th>
					<th>Sat</th>
				</tr>
			</thead>
			<tbody @click="calendarChangeDate">
				<tr v-for="array in compTrArray">
					<td v-for="a in array">
						<button 
							v-if="a.judge"
							className="calendar-button">{{a.value}}
						</button>
						<span v-else>{{a.value}}</span>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>