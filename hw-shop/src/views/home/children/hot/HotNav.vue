<template>
	<div class="hot-nav">
		<div class="hot-nav-content" v-if="homenav.length > 0">
			<div class="hot-content-inner">
				<a href="#" class="inner-item" v-for="(nav,index) in homenav" :key="index">
					<img :src="nav.iconurl" />
					<span>{{nav.icontitle}}</span>
				</a>
			</div>
		</div>
		<div class="hot-nav-bottom">
			<div class="hot-nav-bottom-in" :style="innerBarStyle">
				
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	export default{
		name: "hotNav",
		data(){
			return{
				// 屏幕的宽度
				screenW: Window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
				// 滚动内容的宽度
				scrollContentW: 720,
				// 滚动背景条的宽度
				bgBarWidth: 100,
				// 滚动条的宽度
				barWidth: 0,
				// 起点
				startX: 0,
				// 记录结束点
				endFlag: 0,
				// 滚动条移动的距离
				barMoveWidth: 0
			}
		},
		computed:{
			...mapState(["homenav"]),
			innerBarStyle(){
				return{
					width: `${this.barWidth}px`,
					left: `${this.barMoveWidth}px`
				}
			}
		},
		created(){
			
		},
		mounted(){
			this.barWidth = this.getBottomBarWidth();
			this.bandEvent();
		},
		methods:{
			getBottomBarWidth(){
				return this.bgBarWidth * (this.screenW / this.scrollContentW);
			},
			bandEvent(){
				this.$el.addEventListener("touchstart",this.handelTouchStart,false);
				this.$el.addEventListener("touchmove",this.handelTouchMove,false);
				this.$el.addEventListener("touchend",this.handelTochEnd,false);
			},
			//  开始触摸
			handelTouchStart(event){
				// 第一个触点
				let touch = event.touches[0];
				// 求出起始点
				this.startX =Number(touch.pageX);
			},
			// 开始移动
			handelTouchMove(event){
				// 结束点
				let touch = event.touches[0];
				// 移动的距离
				let moveWidth = Number(touch.pageX) -this.startX;
				//  滚动条走的距离
				this.barMoveWidth = -((this.bgBarWidth / this.scrollContentW ) * moveWidth - this.endFlag)
				// 边界值处理
				if(this.barMoveWidth <= 0){  // 左边
					this.barMoveWidth = 0;
				}else if(this.barMoveWidth >= this.bgBarWidth - this.barWidth){
					this.barMoveWidth = this.bgBarWidth - this.barWidth;
				}
			},
			// 结束触摸
			handelTochEnd(event){
				this.endFlag = this.barMoveWidth;
			},
		}
	}
</script>

<style lang="less" scoped>
	.hot-nav{
		position: relative;
		width: 100%;
		height: 180px;
		background-color: #fff;
		.hot-nav-content{
			width: 100%;
			overflow-x: scroll;
			.hot-content-inner{
				width: 720px;
				height: 180px;
				display: flex;
				flex-wrap: wrap;
				font-size: 14px;
				.inner-item{
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					width: 90px;
					height: 90px;
					color: #666;
					img{
						width: 50%;
						margin-bottom: 5px;
					}
				}
			}
			&::-webkit-scrollbar{
				display: none; //  隐藏滚动条
			}
		}
		.hot-nav-bottom{	
			position: absolute;
			left: 50%;
			transform: translateX(-50px);
			width: 100px;
			height: 2px;
			background-color: #ccc;
			.hot-nav-bottom-in{
				position: absolute;
				top: 0;
				left: 0;
				width: 50px;
				height: 100%;
				background-color: red;
			}
		}
	}
</style>