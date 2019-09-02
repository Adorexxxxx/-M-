<template>
	<div class="bottom-tab">
		<span class="tab-item" @click="switchTo('/dashboard/home')">
			<img :src="$route.path.includes('/dashboard/home') ? icon_home.selected : icon_home.normal" alt="" />
		</span>
		<span class="tab-item" @click="switchTo('/dashboard/recommend')">
			<img :src="$route.path.includes('/dashboard/recommend') ? icon_intro.selected : icon_intro.normal" alt="" />
			<span>推荐</span>
		</span>
		<span class="tab-item" @click="switchTo('/dashboard/category')">
			<img :src="$route.path.includes('/dashboard/category') ? icon_category.selected : icon_category.normal" alt="" />
		</span>
		<span class="tab-item" @click="switchTo('/dashboard/cart')">
			<img src="./../images/icon_cart.png" alt="" />
		</span>
		<span class="tab-item" @click="switchTo('/dashboard/mine')">
			<img :src="$route.path.includes('/dashboard/mine') ? icon_mine.selected : icon_mine.normal" alt="" />
		</span>
	</div>
</template>

<script>
	export default{
		name: "toobar",
		data(){
			return{
				icon_home:{
					normal: require("./../images/icon_home.png"),
					selected: require("./../images/icon_home_selected.png")
				},
				icon_intro:{
					normal: require("./../images/icon_intro.png"),
					selected: require("./../images/icon_intro_selected.png")
				},
				icon_category:{
					normal: require("./../images/icon_category.png"),
					selected: require("./../images/icon_category_selected.png")
				},
				icon_mine:{
					normal: require("./../images/icon_unlogin.png"),
					selected: require("./../images/icon_mine_selected.png")
				}
			}
		},
		methods:{
			switchTo(path){
				if(this.$route.path !== path){
					this.$router.replace(path);
				}
			}
		}
	}
</script>

<style scoped lang="less">
	.bottom-tab{
		display: flex;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50px;
		z-index: 999;
		background-color: #fff;
		.tab-item{
			display: flex;
			justify-content: center;
			align-item: center;
			flex: 1;
			flex-direction: column;
			img{
				width: 80%;

			}
			&:nth-child(2){
				display: flex;
				justify-content: center;
				align-items: center;
				img{
					width: 30%;
				}
				span{
					display: inline-block;
					font-size: 3px;
					font-weight: lighter;
					color: #AEAEAF;
					text-align: center;
				}
			}
		}	

	}
</style>