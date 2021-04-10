<template>
	<div>
		<div class="headbox">
			<el-page-header class="pageheader" title="返回" content="查看产品" @back="back">
			</el-page-header>
		</div>
		<div class="padd">
			<div>
			<div class="searchtable">
			<el-row>
				<el-col :xs="12" :sm="12" :lg="6" class="searchtitle">
					<el-button type="primary" size="mini" @click="showAllWmps">查看持仓情况</el-button>
				</el-col>
			</el-row>
			</div>
			<div class="parp">
				<el-collapse class="myCollapse" v-model="activeName">
				<el-collapse-item  align="center" title="股票" name="1">
					<el-table
					v-show="shares.length>0"
					:data="shares"
					border
					style="width: 90%">
					<el-table-column
					prop="wmpId"
					label="产品Id"
					width="200">
					</el-table-column>
					<el-table-column
					prop="accountId"
					label="所属账户Id"
					width="200">
					</el-table-column>
					<el-table-column
					prop="title"
					label="产品名称"
					width="200">
					</el-table-column>
					<el-table-column
					prop="type"
					label="类型">
					</el-table-column>
					<el-table-column
					prop="amount"
					label="买入金额">
					</el-table-column>
					<el-table-column
					prop="number"
					label="买入股数">
					</el-table-column>
					<el-table-column
					label="操作">
						<template slot-scope="scope">
							<el-button type="text"  title="查看盈亏情况" @click="showbenefits(scope.row.wmpId)"><i class="el-icon-info iconfont"></i></el-button>
						</template>
					</el-table-column>
					</el-table>
				</el-collapse-item>
				<el-collapse-item  align="center" title="基金" name="2">
					<el-table
					v-show="funds.length>0"
					:data="funds"
					border
					style="width: 95%">
					<el-table-column
					prop="wmpId"
					label="产品Id"
					width="200">
					</el-table-column>
					<el-table-column
					prop="accountId"
					label="所属账户Id"
					width="200">
					</el-table-column>
					<el-table-column
					prop="title"
					label="产品名称"
					width="200">
					</el-table-column>
					<el-table-column
					prop="type"
					label="类型">
					</el-table-column>
					<el-table-column
					prop="amount"
					label="买入金额">
					</el-table-column>
					<el-table-column
					prop="startDate"
					label="买入时间">
					</el-table-column>
					<el-table-column
					prop="endDate"
					label="结束时间">
					</el-table-column>
					<el-table-column
					label="操作">
						<template slot-scope="scope">
							<el-button type="text"  title="查看盈亏情况" @click="showbenefits(scope.row.wmpId)"><i class="el-icon-info iconfont"></i></el-button>
						</template>
					</el-table-column>
					</el-table>
				</el-collapse-item>
				<el-collapse-item  align="center" title="定期理财产品" name="3">
					<el-table
					v-show="products.length>0"
					:data="products"
					border
					style="width: 95%">
					<el-table-column
					prop="wmpId"
					label="产品Id"
					width="200">
					</el-table-column>
					<el-table-column
					prop="accountId"
					label="所属账户Id"
					width="200">
					</el-table-column>
					<el-table-column
					prop="title"
					label="产品名称"
					width="200">
					</el-table-column>
					<el-table-column
					prop="type"
					label="类型">
					</el-table-column>
					<el-table-column
					prop="amount"
					label="买入金额">
					</el-table-column>
					<el-table-column
					prop="startDate"
					label="买入时间">
					</el-table-column>
					<el-table-column
					prop="endDate"
					label="结束时间">
					</el-table-column>
					<el-table-column
					label="操作">
						<template slot-scope="scope">
							<el-button type="text"  title="查看盈亏情况" @click="showbenefits(scope.row.wmpId)"><i class="el-icon-info iconfont"></i></el-button>
						</template>
					</el-table-column>
					</el-table>
					</el-collapse-item>
				</el-collapse>
				<div class="concrete" v-show="benefits.length>0">
					<div>盈亏情况</div>
					<el-table
						:data="benefits"
						border
					style="width: 95%">
					<el-table-column
					prop="amount"
					label="盈亏数"
					width="200">
					</el-table-column>
					<el-table-column
					prop="date"
					label="时间">
					</el-table-column>
					</el-table>
				</div>
			</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				shares:[], //股票
				funds:[], //基金
				products:[], //定期理财产品
				benefits:[], // 某个产品的盈亏
				activeName:[1]
			}
		},
		methods:{
			back(){
				history.go(-1);
			},
			showAllWmps(){
				if(!this.$store.state.accountId){
					this.$message({
					  showClose: true,
					  message: "尚未选择客户",
					  type:'warning'
					});
					return;
				}
				// 持仓情况
				this.$axios.post('/wmp/allwmps', {
					accountId:this.$store.state.accountId
				})
				  .then(resp => {
				    if (resp.code === 200) {
						this.shares = resp.data.shares;
						this.funds = resp.data.funds;
						this.products = resp.data.products;
				    } else {
				      console.log(resp.data);
				    }
				  })
				  .catch(error => {
				    console.log(error);
				  })
			},
			showbenefits(id){
				if(!this.$store.state.accountId){
					this.$message({
					  showClose: true,
					  message: "尚未选择客户",
					  type:'warning'
					});
					return;
				}
				// 盈亏情况
				this.$axios.post('/wmp/benefits', {
					wmpId: id
				})
				  .then(resp => {
				    if (resp.code === 200) {
						this.benefits = resp.data.benefits;
				    } else {
				      console.log(resp.data);
				    }
				  })
				  .catch(error => {
				    console.log(error);
				  })
			}
		}
	}
</script>

<style scoped>
.concrete{
	margin-top: 20px;
}
.concrete div{
	text-align: left;
	padding: 0 0 10px 10px;
}
</style>
