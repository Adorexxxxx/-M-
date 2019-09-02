import {
	getHomeCasual,
	getHomeNav,
	getShopList,
	getRecommendList,
	getCategoryList,

} from '../server/api/index' 

import{
	HOMECASUAL,
	HOMENAV,
	SHOPLIST,
	RECOMMEDNLIST,
	CATEGORYLIST,
	USER_INFO,
	ADD_GOODS,
	INIT_CART,
	REMOVE_CART_SHOP,
	ADD_CART_SHOP,
	SINGLE_SELECTED,
	SELECT_ALL,
}from './mutations-type'

export default{
	//  请求首页轮播数据
	async reqHomeCasual({commit}){
		let res = await getHomeCasual();
		commit(HOMECASUAL,{homecasual: res.msg});
	},
	//	请求首页导航数据
	async reqHomeNav({commit}){
		let res = await getHomeNav();
		commit(HOMENAV,{homenav: res.data})
	},
	//	请求首页商品数据
	async reqShopList({commit}){
		let res = await getShopList();
		commit(SHOPLIST,{shoplist: res.goods_list})
	},
	//	获取推荐数据
	async reqRecommendList({commit},params){
		console.log(params);
		let res = await getRecommendList(params);
		console.log(res);
		commit(RECOMMEDNLIST,{recommendlist: res.msg})
		params.callback && params.callback();
	},
	//	获取category数据
	async reqCategoryList({commit},callback){
		let res = await getCategoryList();
		commit(CATEGORYLIST,{categorylist: res.data})
		callback && callback();
	},
	syncGetUserInfo({commit},userInfo){
		commit(USER_INFO,{userInfo})
	},
	//  往购物车添加数据
	syncAddCartInfo({commit},{good_id,good_name,good_price,good_thumb_url}){
		commit(ADD_GOODS,{good_id,good_name,good_price,good_thumb_url});
	},
	// 从本地localstorage取数据
	syncGetLocalCart({commit}){
		commit(INIT_CART);
	},
	//  移除购物车中的商品数量  如果为0 直接删除
	syncRemoveCartShop({commit},good_id){
		commit(REMOVE_CART_SHOP,{good_id});
	},
	//   添加商品的数量
	syncAddNumCartShop({commit},good_id){
		commit(ADD_CART_SHOP,{good_id});
	},
	// 单个商品的选中
	syncSingleSelect({commit},good_id){
		commit(SINGLE_SELECTED,{good_id});	
	},
	//  全选 和 取消全选
	syncSelectAll({commit},isSelectedAll){
		commit(SELECT_ALL,{isSelectedAll});	
	}
}