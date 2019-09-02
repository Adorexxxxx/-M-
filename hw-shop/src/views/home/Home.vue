<template>
	<div id="home">
		<ly-tab
			v-model="selectedId"
			:items="items"
			:options="options"
			@change="handelChange"
			class="fix"
		>
		</ly-tab>	
		<router-view></router-view>
	</div>
</template>

<script>
	export default{
		name: "home",
		data(){
			return{
				selectedId: 0,
				items:[
					{label: '热门'},
        			{label: '服饰'},
       		 		{label: '鞋包'},
        			{label: '母婴'},
        			{label: '百货'},
        			{label: '食品'},
        			{label: '内衣'},
        			{label: '男装'},
        			{label: '电器'}
				],
				options: {
        			activeColor: '#e9232c'  // 设置选中的颜色
      			},
      			headerRoute: '/dashboard/home',
      			subRouter:['/hot','/dress','/box','/mbaby','/general','/food','/shirt','/man','/ele'],
      			isShowLoading: true,
			}
		},
		methods:{
			handelChange(item,index){
				this.$router.replace(this.headerRoute+this.subRouter[index]);
			}
		},
		updated(){
			
		}
	}
</script>

<style lang="less" scoped>
	#home{
		width: 100%;
		height: 100%;
		background-color: #fff;
		.fix{
			position: fixed;
			top: 0;
			left: 0;
			z-index: 998;
		}
	}
</style>