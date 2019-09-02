<template>
	<div id="dashboard">
		<TooBar v-if="$route.meta.isShowBottom"></TooBar>
		<!-- 不让数据重复请求 keep-alive -->
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
	</div>
</template>

<script>
	import TooBar from './../../components/TooBar'
	import {mapState,mapActions} from "vuex"
	export default{
		name: "dashboard",
		data(){
			return{
				
			}
		},
		computed:{
			...mapState(["shopCart"]),
		},
		components:{
			TooBar,
		},
		updated(){
			console.log(this.$route);
		},
		methods:{
			...mapActions(["syncGetLocalCart"]),
		},
		mounted(){
			// 厨师化购物车的数据
			this.syncGetLocalCart();	
		}
	}
</script>

<style lang="less" scoped>
	#dashboard{
		width: 100%;
		height: 100%;
	}
</style>