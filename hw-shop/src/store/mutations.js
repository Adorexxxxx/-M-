import {
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
	SELECT_ALL
}from './mutations-type'

import {setStore,getStore,removeStore} from './../config/gloable'

import vue from "vue"


export default{
	// 轮播图数据
	[HOMECASUAL](state,{homecasual}){
		state.homecasual = homecasual;
	},
	// 导航数据
	[HOMENAV](state,{homenav}){
		state.homenav = homenav;
	},
	// 商品数据
	[SHOPLIST](state,{shoplist}){
		state.shoplist = shoplist;
	},
	// 推荐商品
	[RECOMMEDNLIST](state,{recommendlist}){
		state.recommendlist = state.recommendlist.concat(recommendlist);
	},
	// category数据
	[CATEGORYLIST](state,{categorylist}){
		state.categorylist = categorylist;
	},
	// user_info数据
	[USER_INFO](state,{userInfo}){
		state.userInfo = userInfo;
	},
	//  添加商品到购物车
	[ADD_GOODS](state,{good_id,good_name,good_price,good_thumb_url}){
		//  拿出shopCart
		let shopCart = state.shopCart;
		// 判断商品是否存在
		if(shopCart[good_id]){  //  存在
			shopCart[good_id].buyCount ++;
		}else{
			shopCart[good_id] = {
								"buyCount": 1,
								"id": good_id,
								"name": good_name,
								"imgUrl": good_thumb_url,
								"price": good_price,
								"isSelected": true
							};

		}
		//  产生新对象
		state.shopCart = {...shopCart};
		// 将数据存储在本地
		setStore("shopCart",state.shopCart);
	},
	//  初始化本地购物车数据
	[INIT_CART](state){
		let cart = getStore("shopCart");
		console.log(cart);
		if(cart){
			state.shopCart = JSON.parse(cart);
		}
	},
	//  移除购物车中的商品数量  如果为0 直接删除
	[REMOVE_CART_SHOP](state,{good_id}){
		let shopCart = state.shopCart;
		let goods = shopCart[good_id];
		if(goods){
			if(goods["buyCount"] > 0){
				goods["buyCount"] --;
				if(goods["buyCount"] === 0){
					delete shopCart[good_id];
				}
			}else{
				goods = null;
			}
			// 同步数据
			state.shopCart = shopCart;
			setStore("shopCart",state.shopCart);
		}
	},
	// 添加商品的数量
	[ADD_CART_SHOP](state,{good_id}){
		let shopCart = state.shopCart;
		let goods = shopCart[good_id];
		if(goods){
			goods["buyCount"] ++;
			//  更新数据
			state.shopCart = shopCart;
			setStore("shopCart",state.shopCart);
		}
	},
	// 单个商品被选中
	[SINGLE_SELECTED](state,{good_id}){
		let shopCart = state.shopCart;
		let goods = shopCart[good_id];
		if(goods){
			console.log(goods.isSelected);
			if(goods.isSelected){
				goods.isSelected = !goods.isSelected;
			}else{
				vue.set(goods,"isSelected",true);
			}
			state.shopCart = shopCart;
			setStore("shopCart",state.shopCart);	
		}
	},
	//  全选 和 取消全选
	[SELECT_ALL](state,{isSelectedAll}){
		let shopCart = state.shopCart;
		Object.values(shopCart).forEach((goods,index)=>{
			if(goods.isSelected){
				goods.isSelected = !isSelectedAll;
			}else{
				vue.set(goods,"isSelected",true);
			}
		});
	}	
}