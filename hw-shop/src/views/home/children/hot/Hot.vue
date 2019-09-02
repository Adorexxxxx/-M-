<template>
	<div class="hot">
		<div v-if="!isShowLoading">
			<div class="swiper-container" v-if="homecasual.length > 0 ">
          		<div class="swiper-wrapper">
            		<div class="swiper-slide" v-for="(casual,index) in homecasual" :key="index">
            			<img :src="casual.imgurl" alt="">
            		</div>
          		</div>
         	 	<!-- 如果需要分页器 -->
          		<div class="swiper-pagination"></div>
       		</div>
       		<HotNav></HotNav>
        	<!-- 广告位 -->
        	<div class="hot-ad">
        		<img src="./../../images/hot_ad/home_ad.gif" alt="">
       		 </div>
        	<!--  -->
       		<HotShopList></HotShopList>
		</div>
		<van-loading
			v-else 
			size="24px"
			color="#7a342"
			style="position:absolute;left: 50%;top:40%;transform:translateX(-50%);"
			>
		正在努力加载中...</van-loading>
		
	</div>
</template>

<script>
	import Swiper from 'swiper'
	import 'swiper/dist/css/swiper.min.css'
	import HotNav from './HotNav.vue'
	import HotShopList from './HotShopList.vue'
	import {
		mapState

	} from 'vuex'
	export default{
		name: "hot",
		data(){
			return{
				isShowLoading: true,
			}
		},
		components:{
			HotNav,
			HotShopList,
		},
		created(){
			// 请求数据
			this.$store.dispatch("reqHomeCasual").then(()=>{
				this.isShowLoading = false;
			}).catch((e)=>{
				console.log(e);
			});
			// 首页导航数据请求
			this.$store.dispatch("reqHomeNav");
			// 首页商品数据
			this.$store.dispatch("reqShopList");
		},
		computed:{
			...mapState(["homecasual"])
		},	
		mounted(){

		},
		watch: {
			// 轮播图没有生效
			homecasual(){
				this.$nextTick(() => {
          			// 创建swiper的实例
         		 	setTimeout(function(){
         		 			new Swiper('.swiper-container', {
            			autoplay: true,//等同于以下设置
            			loop: true,
            			// 如果需要分页器
            			pagination: {
              				el: '.swiper-pagination',
            			}
          			})
         		 	},2000);
        		});
			}
		}
	}
</script>

<style lang="less" scoped>
	.hot{
		width: 100%;
		height: 100%;
		margin-top: 48px;
		background-color: #fff;
		.swiper-container{
			img{
				width: 100%;
			}
		}
		.hot-ad{
			padding: 5px;
			img{
				width: 100%;
			}

		}
	}
</style>