<template>
	<div id="mine">
		<div v-if="this.userInfo.id">主面板</div>
		<select-login v-else></select-login>
	</div>
</template>

<script>
	import SelectLogin from '../login/SelectLogin.vue'
	import {mapState} from "vuex"
	export default{
		name: "mine",
		computed:{
			...mapState(["userInfo"]),
		},
		components:{
			SelectLogin,
		}
	}
</script>

<style lang="less" scoped>
	#mine{
		width: 100%;
		height: 100%;
		background-color: skyblue;
	}
</style>