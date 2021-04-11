<template>
	<div>
		<div class="headbox">
			<el-page-header class="pageheader" title="返回" content="购买产品" @back="back">
			</el-page-header>
		</div>
		<div class="padd">
			<div>
			<div class="searchtable">
			<el-row>
				<el-col :xs="12" :sm="12" :lg="6" class="searchtitle">
					<div>产品名称</div>
					<el-input v-model="productName" placeholder="输入名称" size="mini"></el-input>
				</el-col>
				<el-col :xs="12" :sm="12" :lg="6" class="searchtitle">
					<div>产品类型</div>
					<el-select v-model="productType" placeholder="输入类型" size="mini">
						<el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-col>
				<el-col :xs="12" :sm="12" :lg="6" class="searchtitle">
					<el-button type="primary" size="mini" @click="search">查询</el-button>
					<el-button type="primary" size="mini" @click="cancel">重置</el-button>
				</el-col>
			</el-row>
			</div>
			<div class="parp">
				<el-collapse class="myCollapse" v-model="activeName">
				<el-collapse-item  align="center" title="股票" name="1">
					<el-col class="el-collapse-item" v-for="(item,index) in shares" :key="index" :xs="12" :sm="12" :lg="6">
						<div class="product" @click="info(item)"><i class="el-icon-shopping-bag-1"></i> {{item.name}}</div>
					</el-col>
				</el-collapse-item>
				<el-collapse-item  align="center" title="基金" name="2">
					<el-col class="el-collapse-item" v-for="(item,index) in funds" :key="index" :xs="12" :sm="12" :lg="6">
						<div class="product" @click="info(item)"><i class="el-icon-shopping-bag-1"></i> {{item.name}}</div>
					</el-col>
				</el-collapse-item>
				<el-collapse-item  align="center" title="定期理财产品" name="3">
					<el-col class="el-collapse-item" v-for="(item,index) in products" :key="index" :xs="12" :sm="12" :lg="6">
						<div class="product" @click="info(item)"><i class="el-icon-shopping-bag-1"></i> {{item.name}}</div>
					</el-col>
				</el-collapse-item>
				</el-collapse>
			</div>
			<el-table
			id="table1"
			:data="product"
			border
			style="width: 90%">
			<el-table-column
			prop="name"
			label="名称"
			width="200">
			</el-table-column>
			<el-table-column
			prop="type"
			label="产品类型"
			width="200">
			</el-table-column>
			<el-table-column
			prop="rate"
			label="利率(%)"
			width="200">
			</el-table-column>
			<el-table-column
			prop="duration"
			label="存期(年)">
			</el-table-column>
			<el-table-column
			prop="amount"
			label="起存金额">
			</el-table-column>
			<el-table-column
			label="操作">
				<template slot-scope="scope">
					<el-date-picker v-model="ruleForm.start" type="date" size="mini" placeholder="起始时间"></el-date-picker>
					<el-date-picker v-model="ruleForm.end" type="date" size="mini" placeholder="结束时间" :disabled="scope.row.type==1"></el-date-picker>
					<el-button type="text"  title="买入" @click="buy(scope.row)"><i class="el-icon-plus iconfont"></i></el-button>
				</template>
			</el-table-column>
			</el-table>
			<el-table
			id="table2"
			:data="product"
			border
			style="width: 90%">
			<el-table-column
			prop="name"
			label="名称"
			width="200">
			</el-table-column>
			<el-table-column
			prop="type"
			label="产品类型"
			width="200">
			</el-table-column>
			<el-table-column
			prop="amount"
			label="每股金额">
			</el-table-column>
			<el-table-column
			label="操作">
				<template slot-scope="scope">
					<el-input v-model="ruleForm.count" size="mini"></el-input>
					<el-button type="text"  title="买入" @click="buy(scope.row)"><i class="el-icon-plus iconfont"></i></el-button>
				</template>
			</el-table-column>
			</el-table>
		</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"buyproducts",
		data(){
			return{
				ruleForm:{
					count:1,
					start:null,
					end:null,
					amount:0,

				},
				rules: {

				},
				types:[{value:1,label:"定期理财产品"},{value:2,label:"基金"},{value:3,label:"股票"}],
				shares:[{name:"股票1",type:3,amount:1},{name:"股票2",type:3,amount:5},{name:"股票3",type:3,amount:10}], //股票
				funds:[{name:"基金1",type:2,rate:1,amount:1000},{name:"基金2",type:2,rate:2,amount:5000},{name:"基金3",type:2,rate:3,amount:10000}], //基金
				products:[{name:"定期1",type:1,rate:1,duration:1,amount:100},{name:"定期2",type:1,rate:2,duration:2,amount:500},{name:"定期3",type:1,rate:3,duration:3,amount:1000}], //定期理财产品
				product:[],
				productName:'',
				productType:'',
				tempshares:[{name:"股票1",type:3,amount:1},{name:"股票2",type:3,amount:5},{name:"股票3",type:3,amount:10}],
				tempfunds:[{name:"基金1",type:2,rate:1,amount:1000},{name:"基金2",type:2,rate:2,amount:5000},{name:"基金3",type:2,rate:3,amount:10000}],
				tempproducts:[{name:"定期1",type:1,rate:1,duration:1,amount:100},{name:"定期2",type:1,rate:2,duration:2,amount:500},{name:"定期3",type:1,rate:3,duration:3,amount:1000}],
				filtedshares:[],
				filtedfunds:[],
				filtedproducts:[],
				activeName:[1]
			}
		},
		mounted(){
			let table1 = document.getElementById("table1");
			let table2 = document.getElementById("table2");
			table1.style.display = "none";
			table2.style.display = "none";
			let grade = this.$store.state.grade;
			let collapse = document.getElementsByClassName("myCollapse")[0];
			let stare = collapse.children[0];
			let fund = collapse.children[1];
			if(grade >= 2){
				stare.style.display = "none";
			}
			if(grade >= 3){
				fund.style.display = "none";
			}
		},
		methods:{
			search(){
				this.filtedshares = [];
				this.filtedfunds = [];
				this.filtedproducts = [];
				let productName = this.productName;
				let productType = this.productType;
				this.shares = Object.assign(this.tempshares);
				this.funds = Object.assign(this.tempfunds);
				this.products = Object.assign(this.tempproducts);
				if(productName&&productType){
					this.shares.forEach(item => {
						if(item.name == productName&&item.type == productType){
							this.filtedshares.push(item);
						}
					});
					this.funds.forEach(item => {
						if(item.name == productName&&item.type == productType){
							this.filtedfunds.push(item);
						}
					});
					this.products.forEach(item => {
						if(item.name == productName&&item.type == productType){
							this.filtedproducts.push(item);
						}
					});
					this.shares = Object.assign(this.filtedshares);
					this.funds = Object.assign(this.filtedfunds);
					this.products = Object.assign(this.filtedproducts);
				}
				else if(productName){
					this.shares.forEach(item => {
						if(item.name == productName){
							this.filtedshares.push(item);
						}
					});
					this.funds.forEach(item => {
						if(item.name == productName){
							this.filtedfunds.push(item);
						}
					});
					this.products.forEach(item => {
						if(item.name == productName){
							this.filtedproducts.push(item);
						}
					});
					this.shares = Object.assign(this.filtedshares);
					this.funds = Object.assign(this.filtedfunds);
					this.products = Object.assign(this.filtedproducts);
				}
				else if(productType){
					this.shares.forEach(item => {
						if(item.type == productType){
							this.filtedshares.push(item);
						}
					});
					this.funds.forEach(item => {
						if(item.type == productType){
							this.filtedfunds.push(item);
						}
					});
					this.products.forEach(item => {
						if(item.type == productType){
							this.filtedproducts.push(item);
						}
					});
					this.shares = Object.assign(this.filtedshares);
					this.funds = Object.assign(this.filtedfunds);
					this.products = Object.assign(this.filtedproducts);
				}
			},
			cancel(){
				this.productName = '';
				this.productType = '';
			},
			info(item){
				this.product = [];
				this.product.push(item);
				let table1 = document.getElementById("table1");
				let table2 = document.getElementById("table2");
				if(this.product[0].type == 3){
					table2.style.display = "block";
					table1.style.display = "none";
				}
				else{
					table1.style.display = "block";
					table2.style.display = "none";
				}
				this.ruleForm.count = 1;
				this.ruleForm.start = null;
				this.ruleForm.end = null;
			},
			buy(row){
				if(!this.$store.state.accountId){
					this.$message({
					  showClose: true,
					  message: "尚未选择客户",
					  type:'warning'
					});
					return;
				}
				let amount = 0;
				if(row.type == 3){ //股票
					if(count<=0 || !count) return;
					amount = row.amount * this.ruleForm.count;
				}
				else if(row.type == 2){ //基金
					if(this.ruleForm.start>=this.ruleForm.end){
						return;
					}
				}
				else{ //定期
					this.ruleForm.end = new Date(this.dateFormat(this.ruleForm.start,row.duration));
				}
				this.$axios.post('/wmp/buy', {
					title:row.name,
					accountId:this.$store.state.accountId,
					type: row.type,
					amount: amount,
					startDate: this.dateFormat(this.ruleForm.start,0),
					endDate: this.dateFormat(this.ruleForm.end,0),
					number: row.type == 3 ? this.ruleForm.count : 1
				})
				  .then(resp => {
				    if (resp.status === 200) {
						if(resp.data.success == 0){
							this.$message({
							  showClose: true,
							  message: "买入成功",
							  type:'success'
							});
							location.reload();
						}
						else if(resp.data.success == 1){
							this.$message({
							  showClose: true,
							  message: "账户余额小于罚金",
							  type:'warning'
							});
						}
						else if(resp.data.success == 2){
							this.$message({
							  showClose: true,
							  message: "账户余额小于购买金额",
							  type:'success'
							});
						}
						this.count = 1;
						this.start = null;
						this.end = null;
				    } else {
				      console.log(resp.data);
				    }
				  })
				  .catch(error => {
				    console.log(error);
				  })
			},
			back(){
				history.go(-1);
			},
			dateFormat(date,num){
				//num方便定期理财产品在年上加固定值
				if(date){
					let res = "";
					res += (date.getFullYear()+num)+"-";
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
				return null;
			},
			dateCompare(date1,date2){
				if(date1.getFullYear()!=date2.getFullYear()){
					return date1.getFullYear() - date2.getFullYear();
				}
				else if(date1.getMonth()!=date2.getMonth()){
					return date1.getMonth() - date2.getMonth();
				}
				else{
					return date1.getDate() - date2.getDate();
				}
			},
		}
	}
</script>

<style scoped>
.product{
	line-height: 60px;
	height: 60px;
	border-radius: 4px;
	text-align: center;
	color: #999;
	font-size: 18px;
	font-weight: bolder;
	padding: 0 10px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	-webkit-box-shadow: 1px 1px 3px;
	box-shadow: 1px 1px 3px;
	-webkit-transition: all .3s;
	transition: all .3s;
	margin: 10px
}
.product:hover{
	cursor: pointer;
	background-color: #2d8061;
	line-height: 60px;
	height: 60px;
	border-radius: 4px;
	text-align: center;
	color: #fff;
	font-size: 18px;
	font-weight: bolder;
	padding: 0 10px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	-webkit-box-shadow: 1px 1px 3px;
	box-shadow: 1px 1px 3px;
	-webkit-transition: all .3s;
	transition: all .3s;
	margin: 10px
}
.el-input{
	width: 100px;
}
</style>
