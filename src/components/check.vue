<template>
	<div>
		<el-row>
			<el-col :xs="12" :sm="12" :lg="6" class="searchtitle">
				<div>身份证号</div>
				<el-input v-model="input" placeholder="搜索身份证号" size="mini"></el-input>
			</el-col>
			<el-col :xs="12" :sm="12" :lg="6" class="searchtitle">
				<el-button type="primary" size="mini" @click="check">搜索</el-button>
			</el-col>
		</el-row>
		  <el-table
		    :data="account"
		    border
		    style="width: 50%">
		    <el-table-column
		      prop="accountId"
		      label="账号编号"
		      width="200">
		    </el-table-column>
		    <el-table-column
		      prop="balance"
		      label="余额"
		      width="200">
		    </el-table-column>
		    <el-table-column
		      prop="customerName"
		      label="姓名"
			  width="200">
		    </el-table-column>
			<el-table-column
			  prop="type"
			  label="账户类型">
			</el-table-column>
		  </el-table>
	</div>
</template>

<script>
	export default {
		name:'check',
		data(){
			return{
				input:'',
				account:[
					{
						accountId:123,
						balance:123,
						customerName:'wang',
						type:'高',
					}
				]
			}
		},
		methods:{
			check(){
				if(!this.input) return;
				this.$axios.get('/account/check', {
						idNumber: this.input
				})
				.then(resp => {
					if (resp.code === 200) {
						if(resp.data.success){
							this.account = resp.data.accounts;
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
			}
		}
	}
</script>

<style scoped="check">

</style>
