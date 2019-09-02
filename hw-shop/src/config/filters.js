import Vue from 'vue'

//  全局过滤器
Vue.filter("moneyFormate",(value)=>{
	return "￥"+ Number(value).toFixed(2);
});
