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
				<div>交易类型</div>
				<el-select v-model="input1" placeholder="输入交易类型" size="mini">
					<el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
			</el-col>
			<el-col :xs="12" :sm="12" :lg="6" class="searchtitle">
				<div>交易账号</div>
				<el-input v-model="input2" placeholder="搜索交易账号" size="mini"></el-input>
			</el-col>
			<el-col :xs="12" :sm="12" :lg="6" class="searchtitle">
				<div>流水金额</div>
				<el-input v-model="input3" placeholder="搜索流水金额" size="mini"></el-input>
			</el-col>
			<el-col :xs="12" :sm="12" :lg="6" class="searchtitle">
				<div>操作日期</div>
				<el-date-picker
				      v-model="input4"
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
				prop="accountId"
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
				types:[{value:"贷款发放",label:"贷款发放"},{value:"贷款还款",label:"贷款还款"},{value:"理财产品流水",label:"理财产品流水"},{value:"罚金缴纳",label:"罚金缴纳"}],
				payment:[],
				filtedpayment:[],
				temppayment:[]
			}
		},
		methods:{
			search(){
				let input1 = this.input1;
				let input2 = this.input2;
				let input3 = this.input3;
				let input4 = this.dateFormat(this.input4);
				this.filtedpayment = [];
				this.payment = Object.assign(this.temppayment);
				if(input1||input2||input3||input4){
					this.payment.forEach(item =>{
						let res = Object.assign(item);
						if(input1 && res.type != input1){
							return;
						}
						if(input2 && res.accountId.search(input2) < 0){
							return;
						}
						if(input3 && res.amount!= input3){
							return;
						}
						if(input4 && res.date != input4){
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

			},
			back(){
				history.go(-1);
			}
		},
		mounted(){
			this.$axios.post('/account/flow',{
				accountId: this.$store.state.accountId ? this.$store.state.accountId : null,
				option: null,
				order: null,
			})
			.then(resp => {
				if (resp.status === 200) {
					this.payment = resp.data.flows;
					this.temppayment = resp.data.flows;
				} else {
					console.log(resp.data);
				}
			})
			.catch(error => {
				console.log(error);
			});
		}
	}
</script>

<style>
</style>
