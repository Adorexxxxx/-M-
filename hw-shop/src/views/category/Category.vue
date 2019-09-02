<template>
	<div class="category-container">
		<CategorySearch :showSearchPanel="showSearchPanel"></CategorySearch>
		<div class="category-wrap" v-show="!isShowLoading">
			<div class="category-left-wrap">
				<ul> 
					<li class="category-item" 
						v-for="(shop,index) in categorylist" 
						:key="index" 
						:class="{current: index === currentIndex}"
						@click="clickLeftItem(index)"
						ref="shops">
						<span>{{shop.name}}</span>
					</li>
				</ul>
			</div>
			<div class="category-right-wrap">
				<ul ref="shopsParent">
					<li class="shop-li" v-for="(shop,index) in categorylist" :key="index">
						<div class="shop-title">
							<h4 class="">{{shop.name}}</h4>
							<a href="">查看更多></a>
						</div>
						<ul class="phone-type" v-if="shop.tag === 'phone'">
							<li class="phone" v-for="(phone,index) in shop.category" :key="index">
								<img :src="phone.icon" alt="" />
							</li>
						</ul>
						<ul class="shop-list">
								<li class="shop-item" v-for="(items,index) in shop.items">
									<img :src="items.icon" alt="">
									<span>{{items.title}}</span>
								</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
		<van-loading
			v-show="isShowLoading"
			size="24px"
			color="#7a342"
			style="position:absolute;left: 50%;top:40%;transform:translateX(-50%);"
			>
		正在努力加载中...</van-loading>
		<SearchPanel v-if="isShowSearchPanel" :showSearchPanel="showSearchPanel"></SearchPanel>
	</div>
</template>

<script>
	import CategorySearch from './children/CategorySearch'
	import SearchPanel from './children/SearchPanel'
	import {mapState} from 'vuex'
	import BScroll from 'better-scroll'
	export default{
		name: "category",
		data(){
			return{
				isShowLoading: true,
				scrollY: 0, //右侧列表滑动的Y轴坐标
				rightLiTop:[],  // 右侧分类的头部距离 
				isShowSearchPanel: false  // 是否显示search页面
			}
		},
		components:{
			CategorySearch,
			SearchPanel
		},
		created(){
			//  可以使用回调函数来处理 或者数据的深度监听
			this.$store.dispatch("reqCategoryList",()=>{
				this._initBScroll();
			});
		},
		computed: {
			...mapState(['categorylist']),
			// 动态决定左边的那个被选中
			currentIndex(){
				// 取出数据
				const {scrollY,rightLiTop} = this;
				//  拿到下标
				return rightLiTop.findIndex((litop,index)=>{
					//  左边联动
					this._leftScroll(index);
					return scrollY >= litop && scrollY < rightLiTop[ index + 1];
				});
			}
		},
		watch:{
			categorylist(){
				this.$nextTick(()=>{
					this.isShowLoading = false;
					//  初始化
					this._initBScroll();
					//  求出右边所有版块的头部位置 
					this.$nextTick(()=>{
						this._initRightLisTop();
					});
				});
			}
		},
		methods:{
			_initBScroll(){
				// 左边
				this.leftScroll = new BScroll('.category-left-wrap',{});
				// 右边
				this.rightScroll = new BScroll('.category-right-wrap',{
					probeType: 3
				});
				//  右侧监听滚动事件
				this.rightScroll.on("scroll",(pos)=>{
					this.scrollY = Math.abs(Math.round(pos.y));
				});
			},
			_initRightLisTop(){
				// 临时数组
				let arr = [];
				// 定义变量记录高度
				let top = 0;
				// 放入第一个
				arr.push(top);
				// 遍历所有的li
				let allLis = this.$refs.shopsParent.getElementsByClassName("shop-li");
				[].slice.call(allLis).forEach((item,index)=>{
					// 判断是否取到了最后的一个item
					if(index === allLis.length -1){
						item.style.paddingBottom = `${window.innerHeight - item.clientHeight}px`
					}
					top += item.clientHeight;
					arr.push(top);
				});
				this.rightLiTop = arr;
			},
			//  点击切换
			clickLeftItem(index){
				// 改变scrollY的值
				this.scrollY = this.rightLiTop[index];
				// 右边切换
				this.rightScroll.scrollTo(0, -this.scrollY, 300);
			},
			//  左侧联动
			_leftScroll(index){
				let lis = this.$refs.shops;
				let el = lis[index];
				this.leftScroll.scrollToElement(el,300,0,0);
			},
			showSearchPanel(flag){
				this.isShowSearchPanel = flag;
			}
		}
	}
</script>

<style lang="less" scoped>
	@import "./../../style/minx" ;
	.category-container{
		width: 100%;
		height: 100%;
		background-color: #f5f5f5;
		overflow: hidden;
		.category-wrap{
			display: flex;
			position: relative;
			top: 60px;
			bottom: 50px;
			width: 100%;
			height: 100%;
			overflow: hidden;
			background-color: #fff;
			.category-left-wrap{
				width: 80px;
				flex: 0 0 80;
				background-color: #e0e0e0;
				.category-item{
					position: relative;
					display: flex;
					justify-content: center;
					align-items: center;
					width: 100%;
					height: 60px;
					background-color: #fafafa;
					color: #666;
				}
				.current{
					color: #e02e24;
					&::before{
						content:"";
						position: absolute;
						left: 0;
						width: 2px;
						height: 30px;
						background-color: #e02e24;
					}
				}
			}
			.category-right-wrap{
				flex: 3;
				background-color: #fff;
				.shop-title{
					display: flex;
					padding: 0px 10px;
					height: 44px;
					align-items: center;
					justify-content: space-between;
					color: #999;
					a{
						color: #999;
					}
				}
				.phone-type{
					display: flex;
					flex-wrap: wrap;
					.border-bottom-1px(#ccc);
					.phone{
						display: flex;
						justify-content: center;
						align-items: center;
						width: 33.3%;
						margin: 5px 0;
						img{
							width: 70%;
						}
					}
				}
				.shop-list{
					display: flex;
					flex-wrap: wrap;
					.shop-item{
						display: flex;
						flex-direction: column;
						width: 33.3%;
						height: 90px;
						justify-content: center;
						align-items: center;
						color: #666;
						font-weight: lighter;
						font-size: 14px;
						img{
							width: 60%;
							margin-bottom: 5px;
						}
					}
				}
			}
		}
	}
</style>