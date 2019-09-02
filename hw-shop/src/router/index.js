import Vue from 'vue'
import Router from 'vue-router'

//  引入一级组件
import DashBoard from './../views/dashboard/DashBoard'

//  懒加载  二级组件
const Home = () => import('./../views/home/Home.vue')
const Cart = () => import('./../views/cart/Cart.vue')
const Category = ()=> import('./../views/category/Category.vue') 
const Mine = () => import('./../views/mine/Mine.vue');
const Recommend = ()=> import('./../views/recommend/Recommend.vue');
const Login = ()=> import('./../views/login/Login.vue');

//  三级组件
import Hot from './../views/home/children/hot/Hot.vue'
const Dress = () => import('./../views/home/children/Dress')
const Box = () => import('./../views/home/children/Box')
const Mbaby = () => import('./../views/home/children/Mbaby')
const General = () => import('./../views/home/children/General')
const Food = () => import('./../views/home/children/Food')
const Shirt = () => import('./../views/home/children/Shirt')
const Man = () => import('./../views/home/children/Man')
const Ele = () => import('./../views/home/children/Ele')



//  使用
Vue.use(Router);

export default new Router({
	routes:[
		{
			path: "/",
			redirect: "/dashboard"
		},
		{
			path: "/dashboard",
			component: DashBoard,
			children:[
				{
					path: "/",
					redirect: "home"
				},
				{
					path: "home",
					component: Home,
					children:[
						{
							path:"/",
							redirect: "hot"
						},
						{
							path: "hot",
							name: "hot",
							component: Hot,
							meta:{ keepAlive: true,isShowBottom: true }

						},
						{
							path: "dress",
							name: "dress",
							component: Dress
						},
						{
							path: "box",
							name: "box",
							component: Box
						},
						{
							path: "mbaby",
							name: "mbaby",
							component: Mbaby
						},
						{
							path: "general",
							name: "general",
							component: General
						},
						{
							path: "food",
							name: "food",
							component: Food
						},
						{
							path: "shirt",
							name: "shirt",
							component: Shirt
						},
						{
							path: "man",
							name: "man",
							component: Man
						},
						{
							path: "ele",
							name: "ele",
							component: Ele
						},

					]
				},
				{
					path: "recommend",
					name: "recommend",
					component: Recommend,
					meta:{ keepAlive: true,isShowBottom: true }
				},
				{
					path: "category",
					name: "category",
					component: Category,
					meta:{ keepAlive: true,isShowBottom: true }
				},
				{
					path: "cart",
					name: "cart",
					component: Cart,
					meta:{ keepAlive: true,isShowBottom: true }
				},
				{
					path: "mine",
					name: "Mine",
					component: Mine,
					meta:{ keepAlive: true,isShowBottom: true }
				},
				{
					path: "login",
					name: "Login",
					component: Login
				},
			]
		},
	]
})