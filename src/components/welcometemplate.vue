<template>
	<div>	
		<div class="headbox">
			<el-page-header class="pageheader" title="" content="首页" >
			</el-page-header>
		</div>
		<div class="padd">
			<div id="welcome" class="welcome">
				<div class="boxdiv">
					<div class="wel-title leftclass">银行业务模拟实训系统</div>
					<div class="fullName leftclass">欢迎十九组管理员</div>
					<div class="role leftclass">
					角色
					<el-divider direction="vertical" class="verticalline"></el-divider>
					银行管理员
					</div>
					<div class="role leftclass info">
					未读消息
					<el-divider direction="vertical" class="verticalline"></el-divider>
					0
					</div>
					<div class="date leftclass">
					<p></p>
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
				
			}
		},
		mounted(){
			var pageheader = document.getElementsByClassName("pageheader");
			//如果Pageheader为首页，隐藏左半部分的title内容
			if(pageheader[0].title==""){
				pageheader[0].children[0].style.display = "none";
			}
		}
	}
</script>

<style>
</style>
