<template>
  <div class="layoutbox">
	<div class="myhead">
		<div id="headers">
			<div class="lefthead" style="float: left;">
				<div class="animate">
					<img src="../assets/Smart系列logo-11.png" alt="Smart-T" @click="$router.push('/welcome')">
				</div>
				<div>
					<i class="el-icon-s-operation iconfont"></i>
				</div>
			</div>
			<div class="customerinfo">
				<div>当前客户号：{{accountId}}</div>
				<div>客户姓名：{{customerName}}</div>
				<div><el-button type="text" @click="cancel" size="mini" v-show="$store.state.accountId != null">取消选择</el-button></div>
			</div>
			<div class="head_r" style="overflow: hidden;">
				<div class="opacity-animate">
					<el-dropdown @command="handleCommand">
						<span class="el-dropdown-link">
							<i class="el-icon-user-solid"></i>{{$store.state.username}}
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
					  router
					  >
				      <el-submenu index="1">
				        <template #title>
				          <i class="el-icon-s-order"></i>
				          <span>公共业务</span>
				        </template>
				          <el-menu-item index="/check">核实客户身份</el-menu-item>
						  <el-menu-item index="/runningtab">交易流水</el-menu-item>
				      </el-submenu>
				      <el-submenu index="2">
				        <template #title>
				          <i class="el-icon-s-order"></i>
				          <span>存款业务</span>
				        </template>
				          <el-menu-item index="/buyproducts">购买产品</el-menu-item>
						  <el-menu-item index="/viewproducts">查看产品</el-menu-item>
				      </el-submenu>
				      <el-submenu index="3">
				        <template #title>
				          <i class="el-icon-s-order"></i>
				          <span>贷款业务</span>
				        </template>
				          <el-menu-item index="/bill">贷款账户管理</el-menu-item>
				          <el-menu-item index="/auto">日终处理</el-menu-item>
				      </el-submenu>
				    </el-menu>
			</div>
		</aside>
		<div class="layright">
				<router-view>
				
				</router-view>
		</div>
	</div>
	
  </div>

</template>

<script>
  export default {
    name: 'welcome',
    data(){
		return{
			accountId:'',
			customerName:''
		}
    },
	mounted(){
		//渲染首页右下角的日期
		var date = new Date();
		var dateshow = document.getElementsByClassName("date");
		if(dateshow[0]){
			dateshow[0].children[0].innerHTML = date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
		}
		let accountId = this.$store.state.accountId;
		let customerName = this.$store.state.customerName;
		this.accountId =  accountId ? accountId : "暂无";
		this.customerName = customerName ? customerName : "暂无";
	},
    methods: {
		quit(){
			this.$store.commit('logout');
			this.$router.push("/");
			this.$axios.post('/logout', {
			  token: this.$store.state.token
			})
			.then(resp => {
				if (resp.code === 200) {
					this.$store.commit('logout');
					this.$router.push("/");
				} else {
				console.log(resp.data);
				}
			})
			.catch(error => {
				console.log(error);
		  });
		},
		handleCommand(command){
			if(command=="quit"){
				this.quit();
			}
		},
		cancel(){
			this.$store.commit('removeCustomer');
			location.reload();
			this.$message({
			  showClose: true,
			  message: "取消成功",
			  type:'success'
			});
		}

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
	font-size:16px;
}
.customerinfo{
	float: left;
	margin-left: 33%;
}
.customerinfo>div{
	float: left;
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
#el-menu-vertical-demo.el-menu .el-submenu .el-submenu__title:hover{
	background-color: hsla(0,0%,100%,.4);
}
#el-menu-vertical-demo.el-menu .el-submenu .el-menu .el-menu-item:hover{
	background-color: hsla(0,0%,100%,.4);
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
.headbox .el-page-header__left{
	color: #fff;
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

/*  子组件style */
	.searchtitle{
		position: relative;
		text-align: center;
		line-height: 28px;
		margin-bottom: 15px;
	}
	.searchtitle>div:first-child {
		font-size: 14px;
	    width: 90px;
	    min-height: 20px;
	}
	.searchtitle>div:last-child {
	    width: calc(100% - 110px);
	}
	.searchtitle>div{
		float: left;
		padding-left: 5px;
		padding-right: 5px;
	}
	.el-button--primary {
	    color: #fff;
	    background-color: #068e68;
	    border-color: #068e68;
	}
	.searchtitle button{
		float:left;
	}
</style>

