<template>
	<div class="category-search">
		<div class="category-top">
			<div class="category-in">
				<a href="" @click.prevent="showSearchPanel(true)">
					<img src="../images/search.png" alt="" width="8%">
					<span>搜索商品</span>
				</a>
			</div>
		</div>
	</div>
</template>		

<script>
	export default{
		name: "category-search",
		props:{
			showSearchPanel: Function
		}
	}
</script>

<style lang="less" scoped>
	
	.category-search{
		.category-top{
			position: fixed;
			top: 0;
			left: 50%;
			width: 80%;
			transform: translateX(-50%);
			background-color: #EDEDED;
			z-index: 999;
			border-radius: 5px;
			.category-in{
				img{
					position: absolute;
					top: 9px;
					left: 85px;
				}
				span{
					display: inline-block;
					width: 100%;
					height: 40px;
					line-height: 40px;
					text-align: center;
					color: #9F9F9F;
					font-size: 16px;
				}
			}
		}
	}
</style>