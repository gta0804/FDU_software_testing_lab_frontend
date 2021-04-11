<template>
	<div>
		<div class="headbox">
			<el-page-header class="pageheader" title="返回" content="日终处理" @back="back">
			</el-page-header>
		</div>
		<div class="padd">
		<el-row>
			<el-col :xs="12" :sm="12" :lg="6" class="searchtitle">
				<el-button type="primary" size="mini" @click="auto">日终处理</el-button>
			</el-col>
		</el-row>
		</div>
	</div>
</template>

<script>
	export default {
		name:'check',
		data(){
			return{
				flows:[]
			}
		},
		methods:{
			auto(){
				this.$axios.post('/account/loan/payLoanAutomatically')
				.then(resp => {
					if (resp.status === 200 && resp.data.success) {
						this.flows = resp.data.flows;
						console.log(this.flows);
						this.$message({
							showClose: true,
							type: 'success',
							message: '处理成功'
						});
					} else {
						this.$message({
							showClose: true,
							type: 'warning',
							message: '处理失败'
						});
					}
				})
				.catch(error => {
					console.log(error);
				});
			},
			back(){
				history.go(-1);
			}
		}
	}
</script>

<style>
</style>
