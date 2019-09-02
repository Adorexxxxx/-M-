<template>
	<div class="recommend">
		<div class="recommend-container" v-if="recommendlist.length > 0">
			<ul class="recommend-list">
				<li class="recommend-item" v-for="(item,index) in recommendlist" :key="index">
					<img :src="item.thumb_url" alt="" width="100%"  v-if="item.thumb_url">
					<h4 class="item-title">{{item.short_name}}</h4>
					<div class="item-bottom">
						<span class="item-price">￥{{item.price}}</span>	
						<span class="item-counter">{{item.sales_tip}}</span>	
						<span class="item-find">
							<button @click="addGoodToCart(item)">Cart</button>
						</span>	
					</div>
				</li>
			</ul>
		</div>
		<van-loading
			v-if="isShowLoading" 
			size="24px"
			color="#7a342"
			style="position:absolute;left: 50%;top:40%;transform:translateX(-50%);"
			>
		正在努力加载中...</van-loading>
	</div>
</template>

<script>
	import {mapState,mapActions, mapMutations } from 'vuex'
	import vuex from 'vuex'
	import BScoll from 'better-scroll'
	import { Indicator } from 'mint-ui'
	import { Toast } from 'vant';
	export default{
		name: "recommend",
		data: function(){
			return{
				page: 1,
				count: 10,
				isShowLoading: true
			}
		},
		created(){
			//获取推荐数据
			this.$store.dispatch("reqRecommendList",{
				page: this.page,
				count: this.count,
			}).then(()=>{
					this.isShowLoading = false;
			}).catch((error)=>{
					console.log(error);
			});
		},
		computed:{
			...mapState(['recommendlist']),
		},
		watch:{
			recommendlist(){
				this.$nextTick(()=>{
					this.page += 1;
					this._initBScoll();
				})
			}
		},
		methods:{
		 	...mapActions(["syncAddCartInfo"]),
			_initBScoll(){
				//  初始化
				this.scroll = new BScoll(".recommend-container",{
					scrollY: true,
					probeType: 3
				});
				// 监听列表的滚动
				this.scroll.on("touchEnd",(pos)=>{
					if (pos.y >= 50) {
            			console.log('下拉刷新');
          			}

          			if(this.scroll.maxScrollY > pos.y + 30){
   						console.log('上拉加载更多');
   						this.isShowLoading = true;
   						setTimeout(()=>{
   							this.$store.dispatch("reqRecommendList",{
								page: this.page,
								count: this.count
							}).then(()=>{
								this.isShowLoading = false;
							}).catch((error)=>{
								console.log(error);
						});
   						},2000);
          			}
				});
			   // 1.3 列表滚动结束
			    this.scroll.on('scrollEnd', () => {
          			this.scroll.refresh();
       			});
			},
			addGoodToCart(item){
				this.syncAddCartInfo({
					good_id: item.goods_id,
					good_name: item.goods_name,
					good_price: item.price,
					good_thumb_url: item.thumb_url
				});
				// 提示用户
				Toast({
					message: "添加到购物车成功",
					duration: 800
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.recommend{
		width: 100%;
		height: 100%;
		.recommend-container{
		width: 100%;
		height: 100%;
		background-color: #f5f5f5;
		.recommend-list{
			display: flex;
			flex-direction: row;
			flex-wrap: wrap; // 换行
			padding-bottom: 50px;
			.recommend-item{
				width: 49.5%;
				margin-bottom: 15px;
				padding-bottom: 15px;
				&:nth-child(2n-1){
					margin-right: 1%;
				}
				.item-title{
					height: 20px;
					line-height: 20px;
					font-size: 13px;
					font-weight: lighter;
					overflow: hidden;
					margin: 5px 0;
					padding: 0 2px;
				}
				.item-bottom{
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
					padding: 0 6px;
					.item-price{
						flex: 2;
						color: red;
						font-weight: bolder;
						font-size: 12px;
						margin-right: 5px;
					}
					.item-counter{
						flex: 4;
						font-size: 10px;
						color: #666;
					}
					.item-find{
						button{
							flex: 2;
							border: 1px solid orange;
							line-height: 26px;
							border-radius: 5px;
							background-color: transparent;
						}
					}
				}
			}
		}
	}
	}
	
</style>