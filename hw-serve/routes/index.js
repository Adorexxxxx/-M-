const express = require('express');
const router = express.Router();

const svgCaptcha = require('svg-captcha');

const conn = require("./../db/db");

const sms_util = require("./../util/sms_util");

let md5 = require('blueimp-md5');

let user = [];
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get("/homecasual",(req,res)=>{
	// const data = require("../data/homecasual");
	// res.json(data);
	let sqlStr = "select * from homecasual";
	conn.query(sqlStr,(error, results, fields)=>{
		if(error){
			res.json({
				err_code: 0,
				msg: "请求数据失败"
			});
		}else{
			res.json({
				success_code: 200,
				msg: results 
			});
		}
	});
});


router.get("/homenav",(req,res)=>{
	const data = require("../data/homenav");
	res.json(data);
});

router.get("/shopList",(req,res)=>{
	const data = require("../data/shopList");
	res.json(data);
});

// 向recommend表插入数据
router.get("/add/recommend",(req,res)=>{
	const recommendArr = require("../data/recommend.json").data;
	//  一个总的数组
	let temp_arr_arr = [];
	for(let i = 0; i < recommendArr.length; i++){
		let oldItem = recommendArr[i];

		let temp_arr = [];
		temp_arr.push(oldItem.goods_id);
        temp_arr.push(oldItem.goods_name);
        temp_arr.push(oldItem.short_name);
        temp_arr.push(oldItem.thumb_url);
        temp_arr.push(oldItem.hd_thumb_url);
        temp_arr.push(oldItem.image_url);
        temp_arr.push(oldItem.price);
        temp_arr.push(oldItem.normal_price);
        temp_arr.push(oldItem.market_price);
        temp_arr.push(oldItem.sales_tip);
        temp_arr.push(oldItem.hd_url);

        temp_arr_arr.push(temp_arr);
	}

	let sqlStr = "INSERT INTO recommend (`goods_id`,`goods_name`,`short_name`, `thumb_url`, `hd_thumb_url`, `image_url`, `price`, `normal_price`, `market_price`, `sales_tip`, `hd_url`) VALUES ?" 
	conn.query(sqlStr, [temp_arr_arr],(err,reslut,fields)=>{
		if(err){
			console.log("插入失败");
		}else{
			console.log("插入成功");
		}
	});
});

router.get("/recommend",(req,res)=>{
	let pageSize = req.query.page;
	let pageCount = req.query.count;
	let sqlStr = "select * from recommend limit " + (pageSize - 1) * pageCount+','+pageCount
	conn.query(sqlStr,(error,result,fields)=>{
		if(error){
			res.json({error_code:0, msg: "請求失敗"});
		}else{
			res.json({success_code:200,msg: result});
		}
	});
});



// router.get("/recommend",(req,res)=>{
// 	const data = require("../data/recommend");
// 	res.json(data);
// });

router.get("/search",(req,res)=>{
	const data = require("../data/search");
	res.json(data);
});

//  获取图形验证码
router.get('/captcha', function (req, res) {
	// 生成随机验证码
	let captcha = svgCaptcha.create({
		color: true,
		ignoreChars: '0o1i',
		noise: 1,
		size: 4
	});
	//  保存数据到session中
	req.session.captcha = captcha.text.toLowerCase();
	console.log(req.session); 
	res.type('svg');
	res.status(200).send(captcha.data);
});
//  获取短信验证码
router.get('/code', function (req, res) {
	let phone = req.query.phone;
	let code = sms_util.randomCode(6);
	// sms_util.sendCode('18827513207', sms_util.randomCode(6), function (success) {
 //    	if(success){
 //    		user[phone] = code;
 //    		res.json({success_code:200,msg: "验证码获取成功"});
 //    	}else{
 //    		res.json({error_code:0,msg: "验证码获取失败"});
 //    	}
	// })
	 // 成功
	setTimeout(()=>{
		user[phone] = code;
		res.json({success_code:200,msg: code});
	},2000);
	//  失败
	// res.json({error_code:0,msg: "验证码获取失败"});

});


//  手机验证码登录
router.post('/login_code', function (req, res, next) {
	// phone
	let phone = req.body.phone;
	//  验证码
	let code = req.body.code;
	console.log(phone);
	//  验证验证码
	if(user[phone] !== code){
		res.json({error_code: 0,msg: "验证码不正确"});
	}
	// 查询表
	delete user[phone];
	let sqlStr = 'SELECT * FROM user where phone = ' + phone + ' limit 1';
	console.log(sqlStr);
	conn.query(sqlStr,(error,result,fields)=>{
		if(error){
			res.json({error_code:0, msg: "請求失敗"});
		}else{
			if(result[0]){  //  已经存在的用户
				result = JSON.parse(JSON.stringify(result))
				req.session.userid = result[0].id;
				res.json({success_code:200,msg:{id:result[0].id,username:result[0].username,phone:result[0].phone}});
			}else{  //  新增的用户
				let addSql = 'INSERT INTO user ( username , phone ) VALUES(?,?)';
				let params = [phone,phone];
				conn.query(addSql, params, (err,reslut,fields)=>{
					// console.log("result: "+result.insertId);
					reslut = JSON.parse(JSON.stringify(reslut));
					// console.log(reslut);
					if(!err){
						let sqlStr = 'SELECT * FROM user where id = ' + reslut.insertId + ' limit 1';
						console.log(sqlStr);
						conn.query(sqlStr,(error,result,fields)=>{
							if(error){
								res.json({error_code:0, msg: "請求失敗"});
							}else{
								result = JSON.parse(JSON.stringify(result))
								req.session.userid = result[0].id;
								res.json({success_code:200,msg:{id:result[0].id,username:result[0].username,phone:result[0].phone}});
							}
						})
					}	
				});
			}
		}
	});

});

//  用户名和密码登录
router.post('/login_pwd', function (req, res, next) {
	// usernam
	let username = req.body.username;
	//  pwd
	let pwd = md5(req.body.pwd);
	//  图形验证码
	let captcha = req.body.captcha.toLowerCase();
	console.log(username,pwd,captcha,req.session.captcha,req.session);
	// if(req.session.captcha !== captcha){
	// 	res.json({error_code:0,msg:"图形验证码不正确"});
	//  return;
	// }
	delete req.session.captcha;
	let sqlStr = 'SELECT * FROM user where username = ' + username;
	console.log(sqlStr);
	conn.query(sqlStr,(error,result,fields)=>{
		if(error){
			res.json({error_code:0, msg: "请求失败"});
			return;
		}else{
			if(result[0]){  //  已经存在的用户
				if(result[0].pwd !== pwd){
					res.json({error_code:0, msg: "密码错误"});
					return;
				}else{
					result = JSON.parse(JSON.stringify(result));
					console.log(result);
					req.session.userid = result[0].id;
					res.json({success_code:200,msg:{id:result[0].id,username:result[0].username,phone:result[0].phone}});
				}		
			}else{  //  新增的用户
				let addSql = 'INSERT INTO user ( username , pwd ) VALUES(?,?)';
				let params = [username,pwd];
				conn.query(addSql, params, (err,reslut,fields)=>{
					// console.log("result: "+result.insertId);
					reslut = JSON.parse(JSON.stringify(reslut));
					// console.log(reslut);
					if(!err){
						let sqlStr = 'SELECT * FROM user where id = ' + reslut.insertId + ' limit 1';
						console.log(sqlStr);
						conn.query(sqlStr,(error,result,fields)=>{
							if(error){
								res.json({error_code:0, msg: "請求失敗"});
								return;
							}else{
								result = JSON.parse(JSON.stringify(result))
								req.session.userid = result[0].id;
								res.json({success_code:200,msg:{id:result[0].id,username:result[0].username,phone:result[0].phone}});
							}
						})
					}	
				});
			}
		}
	});
})



module.exports = router;
