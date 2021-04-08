<template>
	<div>
		<div>
		<el-row>
			<el-col :xs="12" :sm="12" :lg="6" class="searchtitle">
				<div>账号编号</div>
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
				label="操作">
				<template slot-scope="scope">
					<el-button type="text"  title="查看账单" @click="checkBill(scope.row)"><i class="el-icon-search iconfont"></i></el-button>
					<el-button type="text"  title="还款" @click="showPay(scope.row)"><i class="el-icon-wallet iconfont"></i></el-button>
				</template>
			</el-table-column>
			
		</el-table>
		</div>
		<div class="parp">
			<el-button type="text" size="mini">返回借据</el-button>
			<el-collapse class="myCollapse" v-model="activeName" accordion>
			  <el-collapse-item  align="center" title="分期" name="1">
					<el-col class="el-collapse-item" v-for="(installment,index) in installments" :key="index" :xs="12" :sm="12" :lg="6">
						<div>第{{index}}期</div>
						<div>应还金额: {{installment.amount}}</div>
						<div>未还金额: {{installment.amountRemained}}</div>
						<div>本期还款: {{installment.deadline}}</div>
						<div>是否到期未完全还款: {{installment.isExpired ? "是":"否"}}</div>
					</el-col>
			  </el-collapse-item>
			  <el-collapse-item  title="分期" name="1">
			  					<el-col class="el-collapse-item" v-for="(installment,index) in installments" :key="index" :xs="12" :sm="12" :lg="6">
			  						<div>第{{index}}期</div>
			  						<div>应还金额: {{installment.amount}}</div>
			  						<div>未还金额: {{installment.amountRemained}}</div>
			  						<div>本期还款: {{installment.deadline}}</div>
			  						<div>是否到期未完全还款: {{installment.isExpired ? "是":"否"}}</div>
			  					</el-col>
			  </el-collapse-item>
			</el-collapse>
		</div>
		<el-dialog
		  title="还款"
		  :visible.sync="dialogVisible"
		  width="30%"
		  >
		  <el-form :model="ruleForm" :rules="rules" label-position="left" ref="ruleForm" label-width="0px">
		  	<span>总金额：{{row.amount}}</span>
		  	<el-form-item prop="amount">
		  		<el-input v-model="ruleForm.amount" placeholder="输入还款金额" size="mini"></el-input>
		  	</el-form-item>
		  	<!--登陆按钮-->
		  	<el-form-item class="subbtn">
		  		<el-button size="mini" @click="dialogVisible = false">取消</el-button>
		  		<el-button type="primary" size="mini" @click="submitForm('ruleForm')">确定</el-button>
		  	</el-form-item>
		  </el-form>
		</el-dialog>
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
				loans:[{loanid:100,amount:100,installments:[{amount:100,amountRemained:100,deadline:123,isExpired:true},
					{amount:100,amountRemained:100,deadline:123,isExpired:true},
					{amount:100,amountRemained:100,deadline:123,isExpired:true}]}],
				activeName:'1',
				installments:[
					{amount:100,amountRemained:100,deadline:123,isExpired:true},
					{amount:100,amountRemained:100,deadline:123,isExpired:true},
					{amount:100,amountRemained:100,deadline:123,isExpired:true},
				],
				dialogVisible: false,
				row:[],
			}
		},
		methods:{
			check(){
				if(!this.input) return;
				this.$axios.get('/account/loan/details', {
					accountId: this.input
				})
				.then(resp => {
					if (resp.code === 200) {
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
				this.installments = row.installments;
			},
			showPay(row){
				this.row = row;
				this.dialogVisible = true;
			},
			submitForm(formName){
				this.$refs[formName].validate((valid) => {
				  if (valid) {
				    //this.$axios.post用来向后台请求数据
				    this.$axios.post('/account/loan/payment/repayment', {
						amount:this.amount
				    })
				      .then(resp => {
				        if (resp.code === 200 && resp.data.hasOwnProperty("token")) {
						let data = {
							token: resp.data.token,
							username: this.ruleForm.username
						}
				          this.$store.commit('login', data);
				          this.$router.push("/welcome").catch(err => err);
				        } else {
				          console.log(resp.data);
				        }
				      })
				      .catch(error => {
				        this.$message({
				          showClose: true,
				          message: "登录失败",
				          type:'error'
				        });
				      })
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
</style>
