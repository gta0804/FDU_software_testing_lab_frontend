<template>
	<div>
		<div class="headbox">
			<el-page-header class="pageheader" title="返回" content="交易流水" @back="back">
			</el-page-header>
		</div>
		<div class="padd">
			<div class="searchtable">
			<el-row>
			<el-col :xs="12" :sm="12" :lg="6" class="searchtitle">
				<div>流水号</div>
				<el-input v-model="input1" placeholder="搜索流水号" size="mini"></el-input>
			</el-col>
			<el-col :xs="12" :sm="12" :lg="6" class="searchtitle">
				<div>办理机构</div>
				<el-input v-model="input2" placeholder="搜索办理机构" size="mini"></el-input>
			</el-col>
			<el-col :xs="12" :sm="12" :lg="6" class="searchtitle">
				<div>交易账号</div>
				<el-input v-model="input3" placeholder="搜索交易账号" size="mini"></el-input>
			</el-col>
			<el-col :xs="12" :sm="12" :lg="6" class="searchtitle">
				<div>交易类型</div>
				<el-input v-model="input4" placeholder="搜索交易代码" size="mini"></el-input>
			</el-col>
			<el-col :xs="12" :sm="12" :lg="6" class="searchtitle">
				<div>操作日期</div>
				<el-date-picker
				      v-model="input5"
				      type="date"
				      placeholder="搜索操作时间"
					  size="mini">
				</el-date-picker>
			</el-col>
			<el-col :xs="12" :sm="12" :lg="6" class="searchtitle">
				<el-button type="primary" size="mini" @click="search">搜索</el-button>
				<el-button type="primary" size="mini" @click="reset">重置</el-button>
			</el-col>
			</el-row>
			
			<el-table
			:data="payment"
			border
			style="width: 90%">
				<el-table-column
				prop="id"
				label="流水号"
				width="200">
				</el-table-column>
				<el-table-column
				prop="org"
				label="办理机构"
				width="200">
				</el-table-column>
				<el-table-column
				prop="type"
				label="交易类型"
				width="200">
				</el-table-column>
				<el-table-column
				prop="amount"
				label="金额"
				sortable
				>
				</el-table-column>
				<el-table-column
				prop="account"
				label="交易账号">
				</el-table-column>
				<el-table-column
				prop="date"
				label="操作时间"
				sortable
				>
				</el-table-column>
			</el-table>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				input1:'',
				input2:'',
				input3:'',
				input4:'',
				input5:'',
				payment:[{id:1,org:"fudan",type:"ticket",amount:100,account:"RUC110",date:"2021-04-09"},
				{id:2,org:"fudan",type:"ticket",amount:105,account:"RUC110",date:"2021-04-10"},
				{id:3,org:"fudan",type:"ticket",amount:77,account:"RUC110",date:"2021-04-05"}],
				filtedpayment:[],
				temppayment:[{id:1,org:"fudan",type:"ticket",amount:100,account:"RUC110",date:"2021-04-09"},
				{id:2,org:"fudan",type:"ticket",amount:105,account:"RUC110",date:"2021-04-10"},
				{id:3,org:"fudan",type:"ticket",amount:77,account:"RUC110",date:"2021-04-05"}]
			}
		},
		methods:{			
			search(){
				let input1 = this.input1;
				let input2 = this.input2;
				let input3 = this.input3;
				let input4 = this.input4;
				let input5 = this.dateFormat(this.input5);
				this.filtedpayment = [];
				this.payment = Object.assign(this.temppayment);
				if(input1||input2||input3||input4||input5){
					this.payment.forEach(item =>{
						let res = Object.assign(item);
						if(input1 && res.id != input1){
							return;
						}
						if(input2 && res.org != input2){
							return;
						}
						if(input3 && res.account != input3){
							return;
						}
						if(input4 && res.type != input4){
							return;
						}
						if(input5 && res.date != input5){
							return;
						}
						this.filtedpayment.push(res);
					});
					this.payment = Object.assign(this.filtedpayment);
				}
			},
			dateFormat(date){
				if(date){
					let res = "";
					res += date.getFullYear()+"-";
					let month = date.getMonth()+1;
					if(month<10){
						month = "0"+month;
					}
					res += month + "-";
					let day = date.getDate();
					if(day<10){
						day = "0"+day;
					}
					res += day;
					return res;
				}
				return '';
			},
			reset(){
				this.input1 = '';
				this.input2 = '';
				this.input3 = '';
				this.input4 = '';
				this.input5 = '';
				
			},
			back(){
				history.go(-1);
			}
		},
		mounted(){
			// this.$axios.get('', {
					
			// })
			// .then(resp => {
			// 	if (resp.code === 200 && resp.data.success) {
			// 		this.payment = resp.data.payment;
			// 		this.temppayment = resp.data.payment;
			// 	} else {
			// 		console.log(resp.data);
			// 	}
			// })
			// .catch(error => {
			// 	console.log(error);
			// });
		}
	}
</script>

<style>
</style>
