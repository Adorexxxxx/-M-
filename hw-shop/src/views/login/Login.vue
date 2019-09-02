<template>
	<div class="login">
		<van-tabs v-model="active" animated class="list"
		title-active-color="purple" color="purple">
			<van-tab class="item">
			    <div slot="title" class="title">
			      <span style="font-size: 20px;">验证码登录</span>
			    </div>
			    <div class="item-login">
			    	<span 
			    	v-if = "!countDown"
			    	:class="{phoneRight: delWithPhone}"
			    	@click="getCode()"
			    	>获取验证码</span>
			    	<span v-else disabled="disabled">已发送({{countDown}}s)</span>
			    	<input type="text" placeholder="请输入手机号" v-model="phone">
			    	<input type="text" placeholder="请输入验证码" v-model="code">
			    </div>
			</van-tab>
			<van-tab class="item">
			    <div slot="title" class="title">
			      	<span style="font-size: 20px;">密码登录</span>
			    </div>
			     <div class="item-login">
			    	<input type="text" placeholder="请输入姓名" v-model="username">
			    	<input v-if="pwdModel" type="password" placeholder="请输入密码" v-model="pwd">
			    	<input v-else type="text" placeholder="请输入密码" v-model="pwd">
			    	<img 
			    	 	src="./images/show_pwd.png"
			    	 	:class="{on: pwdModel}"
			    	 	@click.prevent="dealWithPwd(false)"
			    	 	alt="" width="30" />
			    	<img 
			    	 	src="./images/hide_pwd.png"
			    	 	:class="{on: !pwdModel}"
			    	 	@click.prevent="dealWithPwd(true)" 
			    	 	alt="" width="30" />
			    </div>
			    <div class="item-code">
			    	<input type="text" placeholder="验证码" v-model="captcha"/>
			    	<img 
			    		ref="svgCaptcha"
			    		src="http://localhost:80/captcha"
			    		@click.prevent="getSvgCode()" 
			    		alt=""/>
			    </div>
			</van-tab>
		</van-tabs>
		<div class="content">
			<p>温馨提示，未注册的手机号，登录时自动注册，且代表同意，<a href="javascript:;">服务协议与隐私政策</a></p>
		</div>
		<div class="bottom">
			<button 
				@click="login()"
			>登录</button>
			<button>返回</button>
		</div>
	</div>
</template>

<script>
	import {getPhoneCode,phoneCodeLogin,phonePwdLogin} from "./../../server/api/index"
	import { Toast } from 'mint-ui';
	import {mapActions} from 'vuex'
	export default{
		name: "Login",
		data: function(){
	    	return {
	    	  	active: 0,  // 0 表示密码登录 1 表示验证码登录
	    	  	phone: "", // 手机号码
	    	  	countDown: 0,  //  倒计时
	    	  	pwdModel: true,  // true 表示密文  fasle表示明文
	    	  	code: "",  //  验证码
	    	  	userinfo: {}, // 保存个人数据
	    	  	username:"",
	    	  	pwd:"",
	    	  	captcha:""
	    	}
  		},
  		computed:{
  			// 验证手机号码	
  			delWithPhone(){
  				return /^[1][3,4,5,6,7,8][0-9]{9}$/.test(this.phone);
  			}
  		},
  		methods:{
  			...mapActions(["syncGetUserInfo"]),
  			async getCode(){
  				//  倒计时开始  等到符合条件
  				if(this.delWithPhone){
  					this.countDown = 60;
	  				this.timer = setInterval(()=>{
	  					this.countDown --;
	  					if(this.countDown <= 0){
	  						clearInterval(this.timer);
	  					}
	  				},1000);
  				}
  				//  获取短信验证码
  				let code = await getPhoneCode(this.phone);
  				console.log(code);
  				if(code.error_code === 0){
  					//  获取验证码失败
  					Toast({
						  message: "获取验证码失败",
						  position: 'center',
						  duration: 3000
					});
  				}
  			},
  			//  处理密码是明文还是密文
  			dealWithPwd(falg){
  				this.pwdModel = falg;
  			},
  			//  得到图形图片
  			getSvgCode(){
  				this.$refs.svgCaptcha.src="http://localhost:80/captcha?time=" + new Date();
  			},
  			// 登录
  			async login(){
  				if(this.active === 0){  //  验证码登录
  					if(!this.phone){
  						console.log("请输入手机号");
  						Toast("请输入手机号");
  						return;
  					}else if(!this.delWithPhone){
  						console.log("请输入正确的手机号");
  						Toast("请输入正确的手机号");
  						return;
  					}
  					if(!this.code){
  						console.log("请输入验证码");
  						Toast("请输入验证码");
  						return;
  					}else if(!(/^[0-9]{6}$/.test(this.code))){
  						console.log("请输入正确的验证码");
  						Toast("请输入正确的验证码");
  						return;
  					}
  					let result = await phoneCodeLogin(this.phone,this.code);

  					if(result.success_code === 200){
  						this.userinfo = result.msg;
  					}else{
  						console.log(result);
  						this.userinfo = {
  							msg: "登录失败"
  						}
  					}
  				}else{ // 密码
  					if(!this.username){
  						console.log("请输入用户名");
  						Toast("请输入用户名");
  						return;
  					}else if(!this.pwd){
  						console.log("请输入密码");
  						Toast("请输入密码");
  						return;
  					}else if(!this.captcha){
						console.log("请输入图形验证码");
  						Toast("请输入图形验证码");
  						return;
  					}
  					let result = await phonePwdLogin(this.username,this.pwd,this.captcha);
  					if(result.success_code === 200){
  						console.log(result);
  						this.userinfo = result.msg;
  					}else{
  						console.log(result);
  						this.userinfo = {
  							msg: "登录失败"
  						}
  					}
  				}

  				//  保存用户数据到vuex
  				if(!this.userinfo.id){

  				}else{
  					this.syncGetUserInfo(this.userinfo);
  					this.$router.back();
  				}
  			}
  		}
	}
</script>

<style lang="less" scoped>
	.login{
		width: 100%;
		height: 100%;
		background-color: #fff;
		.list{
			padding-top: 200px;
			.item{
				
			}
			.item-login{
				position: relative;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;
				flex-direction: column;
				height: 100px;
				padding-top: 20px;
				input{
					border: 1px solid #999;
					text-indent: .8em;
					width: 80%;
					height: 40px;
					line-height: 40px;
					border-radius: 10px;
				}
				span{
					position: absolute;
					top: 21px;
					right: 40px;
					width: 90px;
					height: 40px;
					line-height: 40px;
					padding-right: 5px;
					color: #ddd;
					&.phoneRight{
						color: purple;
					}
				}
				img{
					display: none;
					position: absolute;
					top: 85px;
					right: 45px;
					&.on{
						display: block;
					}
				}
			}
			.item-code{
				position: relative;
				display: flex;
				justify-content: center;
				margin-top: 20px;
				input[type="text"]{
					border: 1px solid #999;
					width: 80%;
					height: 40px;
					line-height: 40px;
					text-indent: .8em;
					border-radius: 10px;
				}
				img{
					position: absolute;
					top: -7px;
					right: 35px;
				}
			}
		}
		.content{
			padding: 15px 25px;
			display: flex;
			flex-wrap: wrap;
			p{
				font-size: 14px;
				color: #ccc;
				a{
					color: #ccc;
				}
			}
		}
		.bottom{
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100%;
			button{
				width: 80%;
				height: 40px;
				margin-top: 10px;
				line-height: 40px;
				border: none;
				border: 1px solid mediumpurple;
				font-size: 25px;
				color: mediumpurple;
				border-radius: 10px;
				&:nth-child(1){
					color: #fff;
					background-color: mediumpurple;
				}
				&:nth-child(2){
					background-color: transparent;
				}
			}
		}
	}
</style>