import Vue from 'vue'
import App from './App.vue'
//  引入router
import router from './router/index'

// 4 引入vuex中的store对象
import store from './store/index'

Vue.config.productionTip = false


//  1.引入fastclick
import FastClick from 'fastclick'
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

//  2.引入全局的less文件
import '@/style/common.less'
//  3.引入全局UI组件库 index.js
import '@/plugins/index.js'
import '@/plugins/vant.js'
import '@/plugins/mint-ui.js'
//  引入过滤器
import '@/config/filters'

new Vue({
	router,
	store,
  	render: h => h(App)
}).$mount('#app')
