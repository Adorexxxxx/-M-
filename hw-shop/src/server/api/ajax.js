import Axios from 'axios'

export default function ajax(url = "",params = {}, type = "GET"){
	
	// 定义一个Promise对象
	let promise ;
	return new Promise((resolve,reject)=>{
		if("GET" === type){ //GET请求
			let paramsStr = '';
			Object.keys(params).forEach(key=>{
				paramsStr += key+"="+params[key]+"&";
			});
			if(paramsStr !== ''){
				paramsStr = paramsStr.substr(0,paramsStr.lastIndexOf("&"));
				url += "?" + paramsStr;
			}
			console.log(url);
			promise = Axios.get(url);

		}else if("POST" === type){   // POST请求
			console.log(url);
			promise = Axios.post(url,params);
		}
		// 返回请求的结果
		promise.then((response)=>{
			resolve(response.data);
		}).catch((err)=>{
			reject(err);
		})
	});
}

