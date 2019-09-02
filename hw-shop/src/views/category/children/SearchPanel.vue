<template>
	<div class="search-panel">
		<div class="search-wrap">
			<div class="search-in">
				<img src="../images/search.png" alt="">
				<input ref="search" type="search" placeholder="请输入名称" />
			</div>
			<button @click="showSearchPanel(false)">取消</button>
		</div>
		<div class="search-content">
			<div class="content-title">
				<img src="../images/hot.png" alt="" width="20px">
				<span>热门搜索</span>
			</div>
			<ul class="list">
				<li>面巾纸</li>
	            <li>浴巾儿童</li>
	            <li>石榴水果</li>
	            <li>冰箱保鲜盒</li>
	            <li>富豪卷纸</li>
	            <li>毛巾浴袍</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		name: "search-panel",
		props:{
			showSearchPanel: Function
		},
		mounted(){
			//  自动获取焦点
			this.$refs.search.focus();
		},
		
	}
</script>

<style lang="less" scoped>
	@import './../../../style/minx.less';
	.search-panel{
		width: 100%;
		height: 100%;
		background-color: #fff;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;
		.search-wrap{
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			width: 100%;
			height: 12%;
			.border-bottom-1px(#ededed);
			.search-in{
				flex: 8;
				display: flex;
				padding: 10px 10px 10px 20px;
				img{
					position: absolute;
					top: 17px;
					left: 30px;
					width: 7%;
				}
				input[type="search"]{
					border: none;
					width: 100%;
					height: 40px;
					line-height: 40px;
					background-color: #ededed;
					text-indent: 3em;
					border-radius: 10px;
				}
			}
			button{
				flex: 2;
				border: none;
				padding-top: 20px;
				font-size: 16px;
				background-color: transparent;
				color: #aaa;
			}
		}
		.search-content{
			color: #aaa;
			font-size: 18px;
			.content-title{
				display: flex;
				align-items: center;
				padding-left: 15px;
				img{
					padding-right: 10px;
				}
			}
			.list{
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				li{
					margin: 10px 8px;
					padding: 5px;
					border-radius: 10px;
					background-color: #ededed;
					color: #aaa;
					font-weight: lighter;
					font-size: 12px;
				}
			}
		}

	}
</style>