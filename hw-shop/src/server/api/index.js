import ajax from './ajax'

 // 基础路径
const BASE_URL= 'http://localhost:80';

// http://127.0.0.1:80/data/homecasual.json

 // 请求方法
 // 请求首页的轮播图
export const getHomeCasual = () => ajax(BASE_URL + "/homecasual");


// 请求首页的导航
export const getHomeNav = ()=> ajax(BASE_URL + "/homenav");


// 请求首页的商品数据
export const getShopList = ()=> ajax(BASE_URL + "/shopList");


// 请求推荐的数据
export const getRecommendList = (params)=> ajax(BASE_URL + "/recommend",params);

// 请求获取    data/search.json
export const getCategoryList = ()=> ajax(BASE_URL + "/search");

//  请求短信验证码
export const getPhoneCode = (phone)=> ajax(BASE_URL + "/code",{phone});

//  请求短信验证码
export const phoneCodeLogin = (phone,code)=> ajax(BASE_URL + "/login_code",{phone,code},"POST");

//  请求密码
export const phonePwdLogin = (username,pwd,captcha)=> ajax(BASE_URL + "/login_pwd",{username,pwd,captcha},"POST");

