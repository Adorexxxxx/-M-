<template>
	<div class="selectLogin">
		<h4>请选择登录方式</h4>
		<router-link class="btn" to="/dashboard/login">手机登录</router-link>	
	</div>
</template>

<script>
	export default{
		name: "selectLogin",
	}
</script>

<style  lang="less" scoped>
	.selectLogin{
		display: flex;
		justify-content: center;
		align-content: center;
		flex-wrap: wrap;
		width: 100%;
		height: 100%;
		background-color: #fff;
		h4{
			font-size: 30px;
			color: #f10215;
			padding-bottom: 20px;
		}
		.btn{
			border: none;
			width: 300px;
			height: 50px;
			color: #fff;
			text-align: center;
			line-height: 50px;
			font-size: 30px;
			border-radius: 10px;
			background-color: purple;
		}
	}
</style>