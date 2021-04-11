<template>
	<div>
		<div class="headbox">
			<el-page-header class="pageheader" title="返回" content="贷款" @back="back">
			</el-page-header>
		</div>
		<div class="padd">
			<div>
			<div class="searchtable">
			<el-row>
			<el-col :xs="12" :sm="12" :lg="6" class="searchtitle">
				<div>客户账号编号</div>
				<el-input v-model="input" placeholder="输入账号编号" size="mini"></el-input>
			</el-col>
			<el-col :xs="12" :sm="12" :lg="6" class="searchtitle">
				<el-button type="primary" size="mini" @click="check">查询</el-button>
			</el-col>
			</el-row>
			<el-table
			:data="loans"
			border
			style="width: 90%">
			<el-table-column
		    prop="loanid"
		    label="贷款编号"
		    width="200">
			</el-table-column>
			<el-table-column
			prop="amount"
			label="总金额"
			width="200">
			</el-table-column>
			<el-table-column
			prop="interestRate"
			label="利率"
			width="200">
			</el-table-column>
			<el-table-column
			prop="startDate"
			label="办理日期">
			</el-table-column>
			<el-table-column
			prop="sizeOfInstallments"
			label="分期数">
			</el-table-column>
			<el-table-column
			prop="fine"
			label="罚金">
			</el-table-column>
			<el-table-column
			label="操作">
				<template slot-scope="scope">
					<el-button type="text"  title="查看账单" @click="checkBill(scope.row)"><i class="el-icon-search iconfont"></i></el-button>
				</template>
			</el-table-column>
			</el-table>
			</div>
			<div class="parp" style="display: none;">
				<el-button type="text" size="mini" @click="hideBill">返回借据</el-button>
				<el-collapse class="myCollapse" v-model="activeName" accordion>
				<el-collapse-item  align="center" title="已逾期账单" name="1">
					<el-col class="el-collapse-item" v-for="(item,index) in installments" :key="index" v-show="item.isExpired" :xs="12" :sm="12" :lg="6">
						<div>第{{index}}期</div>
						<div>应还金额: {{item.amount}}</div>
						<div>未还金额: {{item.amountRemained}}</div>
						<div>本期还款截止日期: {{item.deadline}}</div>
						<el-button type="text"  title="还款" @click="showPay(item,index)"><i class="el-icon-wallet iconfont"></i></el-button>
					</el-col>
				</el-collapse-item>
				<el-collapse-item  align="center" title="未逾期账单" name="1">
					<el-col class="el-collapse-item" v-for="(item,index) in installments" :key="index" v-show="!item.isExpired" :xs="12" :sm="12" :lg="6">
						<div>第{{index}}期</div>
						<div>应还金额: {{item.amount}}</div>
						<div>未还金额: {{item.amountRemained}}</div>
						<div>本期还款截止日期: {{item.deadline}}</div>
						<el-button type="text"  title="还款" @click="showPay(item,index)"><i class="el-icon-wallet iconfont"></i></el-button>
					</el-col>
				</el-collapse-item>
				</el-collapse>
			</div>
			<el-dialog
			title="还款"
			:visible.sync="dialogVisible"
			width="50%"
			min-height="50%"
			:before-close="handleClose"
			>
				<el-form :model="ruleForm" :rules="rules" label-position="left" ref="ruleForm" label-width="0px">
				<div>贷款id: {{row.loanid}}</div>
				<div>本期未还金额：{{installment.amountRemained}}</div>
				<div>罚金：{{row.fine}}</div>
				<p>提示：罚金会在还款金额中扣除</p>
				<el-form-item prop="amount">
					<el-input v-model="ruleForm.amount" placeholder="输入还款金额" size="mini"></el-input>
				</el-form-item>
				
				<el-form-item class="subbtn">
					<el-button size="mini" @click="cancel">取消</el-button>
					<el-button type="primary" size="mini" @click="submitForm('ruleForm')">确定</el-button>
				</el-form-item>
				
				</el-form>
			</el-dialog>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"bill",
		data(){
			return{
				ruleForm:{
					amount:'',
				},
				rules: {
				  amount: [
				    {required: true, message: "请输入还款金额", trigger: 'blur'}
				  ],
				},
				input:'',
				loans:[{loanid:100,amount:100,installments:[{amount:100,amountRemained:100,deadline:123,isExpired:false},
					{amount:100,amountRemained:100,deadline:123,isExpired:true},
					{amount:100,amountRemained:100,deadline:123,isExpired:true}],fine:100},
					{loanid:101,amount:101,installments:[{amount:101,amountRemained:100,deadline:123,isExpired:true},
					{amount:101,amountRemained:100,deadline:123,isExpired:false},
					{amount:101,amountRemained:100,deadline:123,isExpired:true}],fine:100}],
				activeName:'1',
				installments:[],
				index:'',
				installment:{},
				dialogVisible: false,
				row:[],
			}
		},
		mounted(){
			this.input = this.$store.state.accountId;
		},
		methods:{
			check(){
				if(!this.input) return;
				this.$axios.get('/account/loan/details', {
					accountId: this.input
				})
				.then(resp => {
					if (resp.status === 200) {
						if(resp.data.success){
							this.loans = resp.data.loans;
						}
						else{
							this.$message({
								showClose: true,
								type: 'warning',
								message: '未找到该客户'
							});
						}
					} else {
						console.log(resp.data);
					}
				})
				.catch(error => {
					console.log(error);
				});
			},
			checkBill(row){
				this.row = row;
				this.installments = row.installments;
				document.getElementsByClassName("searchtable")[0].style.display = "none";
				document.getElementsByClassName("parp")[0].style.display = "block";
			},
			showPay(item,index){
				this.index = index;
				this.installment = item;
				this.dialogVisible = true;
			},
			hideBill(){
				this.installments = [];
				document.getElementsByClassName("searchtable")[0].style.display = "block";
				document.getElementsByClassName("parp")[0].style.display = "none";
				
			},
			back(){
				history.go(-1);
			},
			cancel(){
				this.dialogVisible = false;
				this.installment = {};
				this.index = '';
				this.ruleForm.amount = '';
			},
			handleClose(done) {
				this.$confirm('确认关闭？')
				.then(_ => {
					this.installment = {};
					this.index = '';
					this.ruleForm.amount = '';
					done();
				})
				.catch(_ => {});
			},
			submitForm(formName){
				if(!this.$store.state.accountId){
					this.$message({
					  showClose: true,
					  message: "尚未选择客户",
					  type:'warning'
					});
					return;
				}
				this.$refs[formName].validate((valid) => {
				  if (valid) {
					  let fine = this.row.fine;
					  let maxPay = this.installment.amountRemained;
					  let amount = this.ruleForm.amount;
					  let rest = amount - fine;
					  if(rest<0){
						  this.$message({
						    showClose: true,
						    message: "还款金额小于罚金",
						    type:'warning'
						  });
						  return;
					  }
					  else if(amount>(fine+maxPay)){
						  this.$message({
						    showClose: true,
						    message: "还款金额不得大于本期剩余还款",
						    type:'warning'
						  });
						  return;
					  }
					  else{
						  //支付罚款
						  this.$axios.post('/account/loan/payment/fine',{
							  accountId: this.$store.state.accountId,
							  loanId: this.row.loanid,
							  fine: fine
						  })
						  .then(resp => {
							  if(resp.status === 200 ){
								  if(resp.data.success){
									 console.log("支付罚款成功");
									 //还款
									 this.$axios.post('/account/loan/payment/repayment', {
									 	accountId: this.$store.state.accountId,
									 	loanId: this.row.loanid,
									 	index: this.index,
									 	amount:rest
									 })
									 .then(resp => {
									     if (resp.status === 200 && resp.data.success) {
									       this.$message({
									         showClose: true,
									         message: "还款成功",
									         type:'success'
									       });
											location.reload();
									     } else {
									       this.$message({
									         showClose: true,
									         message: resp.data.message,
									         type:'error'
									       });
									     }
									 })
									 .catch(error => {
									     console.log(error);
									 }) 
								  }
								  else{
									  this.$message({
									    showClose: true,
									    message: "账户余额不足",
									    type:'error'
									  });
								  }
							  }							  
						  });
					  }
				  }
				});
			}
		}
	}
</script>

<style scoped>
.myCollapse{
	width: 90%;
	color: #2D8061;
}

.el-collapse-item{
    font-size: 13px;
    color: #2d8061;
    line-height: 1.769230769230769;
}
.parp{
	max-height: 500px;
}
.el-dialog{
	position: absolute;
	top : 100px;
}
</style>
