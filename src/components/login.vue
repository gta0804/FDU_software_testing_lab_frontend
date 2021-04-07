<template>
    <div class="back">
		<div class="formbox">
			<div class="logobox animate__flipInX animate__animated">
				<img src="../assets/logo1.png" alt="同济大学浙江学院">
				<h3>银行业务模拟实训系统</h3>
			</div>
			<el-form :model="ruleForm" :rules="rules" label-position="left" ref="ruleForm" label-width="0px" v-loading="loading">
				<!--用户名-->
				<el-form-item prop="username">
					<el-input type="text"
                      v-model="ruleForm.username"
                      auto-complete="off"
                      placeholder="请输入账号"
					  prefix-icon="el-icon-user"
					  clearable
					  >
					</el-input>
				</el-form-item>
				<!--密码-->
				<el-form-item prop="password">
					<el-input type="password"
                      v-model="ruleForm.password"
                      auto-complete="off"
                      placeholder="请输入密码"
					  prefix-icon="el-icon-unlock"
					  show-password
					  clearable
					  >

					</el-input>
				</el-form-item>
				<!--登陆按钮-->
				<el-form-item class="subbtn">
					<el-button type="primary"
						size="medium"
                       @click="submitForm('ruleForm')">登录
					</el-button>
				</el-form-item>
			</el-form>
			<div class="footremark">
				<p></p>
			</div>
		</div>
		<div class="loginback">
			
		</div>
	</div>
</template>

<script>
	export default {
		name: 'HomePage',
		data() {
			return {
				ruleForm: {
				  username: '',
				  password: ''
				},
				rules: {
				  username: [
				    {required: true, message: "请输入账号", trigger: 'blur'}
				  ],
				  password: [
				    {required: true, message: '请输入密码', trigger: 'blur'}
				  ]
				},
				loading: false
			}
		},
		methods:{
			submitForm(formName){
				this.$refs[formName].validate((valid) => {
				  if (valid) {
				    //this.$axios.post用来向后台请求数据
				    this.$axios.post('/login', {
				      username: this.ruleForm.username,
				      password: this.ruleForm.password
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

.back{
	width: 100%;
	height: 100vh;
	background-size: cover;
	position: relative;
}
.formbox{
	position: absolute;
	top:50%;
	left:50%;
	transform: translate(-50%,-50%);
	z-index:1;
	padding:25px;
	background-color:hsla(0,0%,98%,.7);
	border-radius:5px;
}
.logobox{
	text-align: center;
	margin-bottom: 15px;
}
.logobox img{
	max-width: 240px;
	min-width: 120px;
}
.img{
	border: none;
}
.logobox h3{
	font-size: 24px;
	color: #2d8061;
	font-weight: 400!important;
	padding: 15px 0;
	font-family: "\5FAE\8F6F\96C5\9ED1";
	letter-spacing: 4px;
	margin: 0;
}
.loginback{
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 0;
	background: url("../assets/background/back.jpg");
}
.subbtn{
	padding: 0 0 25px;
}
.subbtn button{
	width: 100%;
	background-color: #eee;
	color: #068e68;
}
.footremark{
	width: 22vw;
	text-overflow: ellipsis;
	text-align: center;
	margin: 0 auto;
	color: #eee;
}
.el-button--primary {
    color: #fff;
    background-color: #068e68;
    border-color: #068e68;
}

.animate__animated {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
}
.animate__flipInX {
    -webkit-backface-visibility: visible!important;
    backface-visibility: visible!important;
    -webkit-animation-name: flipInX;
    animation-name: flipInX;
}
@-webkit-keyframes flipInX {
            from {
                    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
                     transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
                     -webkit-animation-timing-function: ease-in;
                    animation-timing-function: ease-in;
                     opacity: 0;
                 }
             
            40% {
                     -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
                     transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
                     -webkit-animation-timing-function: ease-in;
                     animation-timing-function: ease-in;
                 }
            
            60% {
                     -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
                     transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
                     opacity: 1;
                }
             
            80% {
                     -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
                     transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
                }
            
            to {
                    -webkit-transform: perspective(400px);
                    transform: perspective(400px);
             }
}
       
@keyframes flipInX {
            from {
                    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
                     transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
                     -webkit-animation-timing-function: ease-in;
                    animation-timing-function: ease-in;
                     opacity: 0;
                 }
             
            40% {
                     -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
                     transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
                     -webkit-animation-timing-function: ease-in;
                     animation-timing-function: ease-in;
                 }
            
            60% {
                     -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
                     transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
                     opacity: 1;
                }
             
            80% {
                     -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
                     transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
                }
            
            to {
                    -webkit-transform: perspective(400px);
                    transform: perspective(400px);
             }
}
</style>
