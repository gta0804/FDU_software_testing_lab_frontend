<template>
  <div class="layoutbox">
	<div class="myhead">
		<div id="headers">
			<div class="lefthead" style="float: left;">
				<div class="animate">
					<img src="../assets/Smart系列logo-11.png" alt="Smart-T">
				</div>
				<div>
					<i class="el-icon-s-operation iconfont"></i>
				</div>
			</div>
			<div class="head_r" style="overflow: hidden;">
				<div class="opacity-animate">
					<el-dropdown @command="handleCommand">
						<span class="el-dropdown-link">
							<i class="el-icon-user-solid"></i>十九组管理员
						</span>
						<template #dropdown>
						    <el-dropdown-menu>
						      <el-dropdown-item command="info">个人信息</el-dropdown-item>
						      <el-dropdown-item command="password">修改密码</el-dropdown-item>
						      <el-dropdown-item divided command="quit">退出登录</el-dropdown-item>
						    </el-dropdown-menu>
						  </template>
					</el-dropdown>
				</div>
				<div class="opacity-animate">
					<i class="el-icon-full-screen"></i>
				</div>
				<div class="opacity-animate">
					<i class="el-icon-chat-dot-square"></i>
				</div>
			</div>
		</div>
	</div>
	<div class="layleft">
		<aside class="asidediv">
			<div class="menubottom">
				    <el-menu
				      default-active="2"
				      class="el-menu-vertical-demo"
					  id="el-menu-vertical-demo"
					  style="float: left;"
					  >
				      <el-submenu index="1">
				        <template #title>
				          <i class="el-icon-s-order"></i>
				          <span>公共业务</span>
				        </template>
				          <el-menu-item index="1-1">选项1</el-menu-item>
				          <el-menu-item index="1-2">选项2</el-menu-item>
				          <el-menu-item index="1-3">选项3</el-menu-item>
				      </el-submenu>
				      <el-submenu index="2">
				        <template #title>
				          <i class="el-icon-s-order"></i>
				          <span>存款业务</span>
				        </template>
				          <el-menu-item index="1-1">选项1</el-menu-item>
				          <el-menu-item index="1-2">选项2</el-menu-item>
				          <el-menu-item index="1-3">选项3</el-menu-item>
				      </el-submenu>
				      <el-submenu index="3">
				        <template #title>
				          <i class="el-icon-s-order"></i>
				          <span>系统管理</span>
				        </template>
				          <el-menu-item index="1-1">选项1</el-menu-item>
				          <el-menu-item index="1-2">选项2</el-menu-item>
				          <el-menu-item index="1-3">选项3</el-menu-item>
				      </el-submenu>
				      <el-submenu index="4">
				        <template #title>
				          <i class="el-icon-s-order"></i>
				          <span>其他</span>
				        </template>
				          <el-menu-item index="1-1">选项1</el-menu-item>
				          <el-menu-item index="1-2">选项2</el-menu-item>
				          <el-menu-item index="1-3">选项3</el-menu-item>
				      </el-submenu>
				    </el-menu>
			</div>
		</aside>
		<div class="layright">
			<div class="headbox">
				<el-page-header class="pageheader" title="" content="首页">
				</el-page-header>
			</div>
			<div>
				
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
	</div>
	
  </div>

</template>

<script>
  export default {
    name: 'UserPage',
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
		
		var date = new Date();
		console.log(date);
		var dateshow = document.getElementsByClassName("date");
		dateshow[0].children[0].innerHTML = date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
	},
    methods: {
		quit(){
			this.$confirm('真的要注销账户吗？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(() => {
				this.$message({
					showClose: true,
					type: 'success',
					message: '注销成功'
			});
			this.$store.commit('logout');
			this.$router.push("/");
			}).catch(() => {
				this.$message({
					showClose: true,
					type: 'info',
					message: '已取消注销'
		    });
		  });
		},
		handleCommand(command){
			console.log(command=="quit");
			if(command=="quit"){
				this.quit();
			}
		},

    },
  }
</script>

<style>
.layoutbox{
	background: url(../assets/background/back.jpg);
	background-size: cover;
	background-repeat: no-repeat;
	position: relative;
	width: 100%;
	height: 100vh;
}
.myhead{
	width:100%;
}
#headers{
	width: 100%;
	z-index: 30;
	height: 60px;
	padding: 0;
	overflow: hidden;
	background-color: hsla(0,0%,100%,.9);
	color: #2d8061;
}
#headers .lefthead>div{
	float: left;
}
#headers>div>div{
	cursor: pointer;
	padding: 25px 20px 20px;
}
#headers .lefthead>div:first-child{
	padding: 10px 0 0 50px;
	margin-right: 30px;
}
#headers .lefthead>div:first-child img{
	width: 165px;
}
#headers i{
	color: #068e68;
}
#headers span{
	color: #068e68;
}
.iconfont{
	font-size:20px;
}
.head_r>div{
	float:right;
}
.opacity-animate{
	visibility: visible;
	opacity: 1;
	transition:opacity 0.3s cubic-bezier(0.5, 0, 0, 1) 0s;
}

.layleft{
	overflow: hidden;
	width: 100%;
	height: calc(100% - 60px);
}
.asidediv{
	height: 100%;
	overflow: hidden;
	background-color: hsla(0,0%,98%,.1);
}
.layleft>aside:first-child{
	float: left;
	height: 100%;
}
.layleft>div:nth-child(2){
	height: 100%;
	position: relative;
	overflow: hidden;
}
.menubottom{
	height: calc(100% - 63px);
	overflow-y: auto;
	overflow-x: hidden;
}
.menubottom div{
	color:rgb(255, 255, 255);
	text-align: left;
}
.menubottom div i{
	color:rgb(255, 255, 255);
}
#el-menu-vertical-demo:not(.el-menu--collapse){
	width: 16vw;
	min-width: 200px;
}
#el-menu-vertical-demo.el-menu {
    background-color: transparent;
    border: none;
}
#el-menu-vertical-demo.el-menu .el-submenu .el-menu{
    background-color: transparent;
    border: none;
}
#el-menu-vertical-demo.el-menu .el-submenu .el-menu li{
	padding-left:10px;
	text-align: left;
	color:rgb(255, 255, 255);
}

.headbox{
	background-color: hsla(0,0%,98%,.1);
	padding: 10px 10px 10px 15px;
}
.headbox .el-page-header__content{
	color: #fff;
}
.padd{
	width: 100%;
	height: calc(100% - 45px);
	position: absolute;
	background-color: transparent;
}
.padd>div{
	padding: 20px;
	width: 100%;
	height: 100%;
	overflow-x: hidden;
	overflow-y: auto;
	background-color: #fff;
	position: relative;
}
.boxdiv{
	margin-top: 12vh;
	padding-right: 10vw;
	text-align: right;
}
#welcome{
	background-color: transparent!important;
}
.wel-title{
	font-weight: bolder;
	display: inline-block;
	font-size: 50px;
	padding: 20px 0;
	color: #068e68;
	letter-spacing: 7px;
	border-bottom: 5px solid #2d8061;
}
.leftclass{
	visibility: visible;
	opacity: 1;
	transition: opacity 0.35s cubic-bezier(0.5, 0, 0, 1) 0.8s;
}
.fullName{
	margin-top: 65px;
	font-size: 26px;
	letter-spacing: 3px;
	font-weight: bolder;
}
.role{
	margin-top: 30px;
	font-size: 22px;
	letter-spacing: 3px;
	font-weight: bolder;
}
.verticalline{
	display: inline-block;
	width: 2px;
	background-color: #6c6c6c;
	height: 1em;
	margin: 0 8px;
	vertical-align: middle;
	position: relative;
}
.date{
	margin-top: 65px;
	font-size: 18px;
}
</style>

