<template>
	<div id="cart">
		<div class="top">
			<span>购物车</span>
			<span>清空购物车</span>
		</div>
		<div class="content-container">
			<ul class="good-list">
				<li class="good" v-for="(shop,index) in shopCart" :key="index">
					<div class="good-left">
						<a href="javascript:;" 
						:checked="shop.isSelected"
						@click.prevent="singelSelect(shop.id)"
						></a>
					</div>
					<div class="good-center">
						<img :src="shop.imgUrl" alt="" />
					</div>
					<div class="good-right">
						<a href="javscript:;">{{shop.name}}</a>
						<div class="right-bottom">
							<p class="shopPrice">{{shop.price/100 | moneyFormate()}}</p>
							<div class="shopDeal">
                                <span @click="decrease(shop.id,shop.buyCount)">-</span>
                                <input disabled type="number" :value="shop.buyCount"  />
                                <span @click="add(shop.id)">+</span>
                            </div>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="bottom">
			<div class="tabBarLeft">
                <a href="javascript:;" 
                class="cartCheckBox" 
                :checked="isSelectedAll"
                @click.prevent ="selectAll(isSelectedAll)"
                ></a>
                <span style="font-size: 16px;"
                >全选</span>
                <div class="selectAll">
                    合计：<span class="totalPrice">{{totalPrice | moneyFormate()}}</span>
                </div>
            </div>
            <div class="tabBarRight">
                <a href="#" class="pay">去结算{{goodsCount}}</a>
            </div>
		</div>
	</div>
</template>

<script>
	import {mapState,mapActions} from "vuex"
	import { Dialog } from 'vant';
	export default{
		name: "cart",
		data(){
			return{
				// isSelectedAll: false,   //全选
			}
		},
		computed:{
			...mapState(["shopCart"]),
			goodsCount(){
				let selectedLength = 0;
				Object.values(this.shopCart).forEach((goods,index)=>{
					if(goods.isSelected){
						selectedLength ++;
					}
				});
				console.log("selectedLength = " + selectedLength);
				console.log(this.shopCart);
				return selectedLength;
			},
			isSelectedAll(){
				let flag = Object.values(this.shopCart).length > 0;
				console.log(this.goodsCount);
				Object.values(this.shopCart).forEach((goods,index)=>{
					if(!goods.isSelected){
						flag = false;
					}
				});
				return flag;
			},
			totalPrice(){
				let total = 0;
				Object.values(this.shopCart).forEach((goods,index)=>{
					if(goods.isSelected){
						total += (goods.buyCount * goods.price);
					}
				});
				return total / 100;
			}
		},
		watch:{
			
		},
		methods:{
			...mapActions(["syncRemoveCartShop","syncAddNumCartShop","syncSingleSelect","syncSelectAll"]),
			selectAll(isSelectedAll){
				console.log(isSelectedAll);
				this.syncSelectAll(isSelectedAll);
			},
			//  单个商品的选中和取消选中
			singelSelect(good_id){
				this.syncSingleSelect(good_id);
			},
			decrease(good_id,buyCount){
				// 删除
				if(buyCount > 1){
					this.syncRemoveCartShop(good_id);
				}else{
					Dialog.confirm({
					  title: '温馨提示',
					  message: '确定要删除商品吗？'
					}).then(() => {
					  this.syncRemoveCartShop(good_id);
					}).catch(() => {
					  // on cancel
					});
				}
			},
			add(good_id){
				// 增加
				this.syncAddNumCartShop(good_id);
			}
		}
	}
</script>

<style lang="less" scoped>
	#cart{
		width: 100%;
		height: 100%;
		background-color: #f5f5f5;
		.top{
			position: fixed;
			display: flex;
			justify-content: space-between;
			width: 100%;
			padding: 20px 0;
			z-index: 999;
			background-color: #fff;
			span{
				&:nth-child(1){
					padding-left: 20px;
					font-size: 20px;
					line-height: 20px;
					font-weight: bolder;
				}
				&:nth-child(2){
					padding-right: 20px;
					color: #f10215;
				}
			}
		}
		.content-container{
			width: 100%;
			height: 100%;
			padding-top: 60px;
			.good-list{
				width: 100%;
				.good{
					width: 100%;
					display: flex;
					justify-content: center;
					margin-bottom: 20px;
					&:last-child{
						padding-bottom: 200px;
					}
					&:first-child{
						padding-top: 10px;
					}
					.good-left{
						flex: 1;
						align-self: center;			
						a{
							display: inline-block;
							width: 16px;
							height: 16px;
							background: url(./images/shop-icon.png) no-repeat 0 0;
							background-size: 40px 80px;
							&[checked]{
								background-position: -20px 0; 
							}
						}
					}
					.good-center{
						flex: 3;
						img{
							width: 100%;
						}
					}
					.good-right{
						flex: 6;
						display: inline-block;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						padding-top: 20px;
						a{
							line-height: 30px;
							color: #000;
						}
						.right-bottom{
							margin-top: 35px; 
							display: flex;
							flex-direction: row;
							justify-content: space-between;
							.shopPrice{
								font-size: 13px;
							}
							.shopDeal{
								span{
									font-size: 14px;
									font-weight: bolder;
									padding: 0 5px;
								}
								input{
									width: 50px;
									text-align: center;
								}
							}
						}
					}
				}
			}
		}
		.bottom{
			display: flex;
			position: fixed;
            justify-content: space-between;
            align-items: center;
			bottom: 50px;
			left: 0;
			width: 100%;
            border-top: 0.01rem solid #e0e0e0;
            background-color: #fff;
            z-index: 999;
			.tabBarLeft{
				display: flex;
				align-items: center;
				font-size: 20px;
				a{
					display: inline-block;
					width: 16px;
					height: 16px;
					background: url(./images/shop-icon.png) no-repeat 0 0;
					background-size: 40px 80px;
					&[checked]{
						background-position: -20px 0; 
					}	
				}
				.selectAll{
					padding-left: 10px;
					.totalPrice{
						color: #f10215;
					}
				}
			}
			.tabBarRight{
				a{
					display: inline-block;
					width: 100px;
					height: 40px;
					line-height: 40px;
					text-align: center;
					color: #fff;
					border-radius: 10px;
					background-color: red;
				}
			}

		}
	}
</style>