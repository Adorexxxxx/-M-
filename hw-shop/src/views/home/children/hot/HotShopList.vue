<template>
	<div>
		<div class="hot-shop-contain" v-for="(shop,index) in shoplist" :key="index">
			<ul class="shop-list">
				<li class="shop-item">
					<van-image :src="shop.image_url">
  							<template v-slot:loading>
    							<van-loading type="spinner" size="20" />
  							</template>
					</van-image>
					<h4 class="shop-item-title">
						{{shop.goods_name}}
					</h4>
					<div class="shop-item-bottom">
						<span class="item-price">{{shop.normal_price/100 |moneyFormate }}</span>
						<span class="item-counter">{{shop.sales_tip}}</span>
						<span class="item-user">
							<img :src="user.avatar" alt=""  v-for="user in shop.bubble" :key="user.group_order_id"/>
						</span>
						<span class="item-buy">
							<button>去拼单</button>
						</span>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	export default{
		name: "hotShopList",
		computed:{
			...mapState(["shoplist"]),
		}
		
	}
</script>

<style lang="less" scoped>
	.hot-shop-contain{
		width: 100%;
		margin-bottom: 50px;
		background-color: #f5f5f5;
		.shop-list{
			.shop-item{
				display: flex;
				flex-direction: column;
				margin-bottom: 5px;
				background-color: #fff;
				.shop-item-title{
					width: 94%;
					height: 44px;
					line-height: 22px;
					margin-left: 3%;
					overflow: hidden;
				}
				.shop-item-bottom{
					display: flex;
					flex-direction: row;
					justify-content: space-around;
					align-items: center;
					.item-price{
						font-size: 18px;
						font-weight: bolder;
						text-align: center;
						color: red;
						flex: 1;
					}
					.item-counter{
						flex: 2;
						font-size: 12px;
						color: #ccc;
					}
					.item-user{
						display: flex;
						justify-content: center;
						align-items: center;
						flex: 1;
						img{
							width: 30px;
							border-radius: 50%;
							&:last-child{
								margin-left: -6px;
							}
						}
					}
					.item-buy{
						flex: 2;
						button{
							display: flex;
							justify-content: center;
							align-items: center;
							width: 80%;
							height: 34px;
							margin-left: 10px;
							font-size: 15px; 
							color: #fff;
							border: none;
							background-color: red;
							border-radius: 10px;
						}
					}
				}
			}
		}
	}
</style>