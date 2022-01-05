//获取验证码
function getCode (className) {
	var yanzheng = document.querySelector(className);
		yanzheng.onclick = function () {
			let time = 60;
			let a = setInterval(function() {
				yanzheng.innerText = "稍后重试(" + time + ")";
				time--;
				yanzheng.disabled = true;
				if (time == 0) {
					yanzheng.disabled = false;
					yanzheng.innerText = "重获验证码";
					clearInterval(a);
				}
			},1000);
			
		}
}
/*
	函数封装注意：
		1.是否会被多吃使用 yes
		2.会出现哪些不确定的值
			url			接口地址
			data		传递参数
			method		请求方式
			contentType	请求头信息
			aysn		同步/异步
			success 	成功的回调函数
			error		失败的回调函数
*/
// ES6 解构赋值
function $ajax({method = "get", url, data, contentType, aysn, success, error}) {
	var xhr = new XMLHttpRequest();
	if (data) {// 如果有参数传递
		data = querystring(data);// 处理成查询字符串的结构 重新赋值
	}
	if (method == "get" && data) {// 如果请求方式是get 并且有参数传递 需要进行拼接
		url += "?" + data
	}
	xhr.open(method, url);
	if (method == "get") {// 如果是get请求
		xhr.send();// 直接发送请求
	} else {// 如果是post请求
		// 先判断是否需要修改请求头
		if (contentType) {
			xhr.setRequestHeader("Content-type", contentType);// 重新设置请求头
			xhr.send(data);
		} else {
			xhr.send(data);
		}
	}
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {// 成功 之后干什么 数据已经成功请求出来了 接下来要做什么
				// console.log(xhr.responseText);// json字符串
				if (success) {
					// 由于ajax不能使用return 返回处理结果 所以咱们使用回调函数的功能 
					// 函数有特点 可以传递参数 将ajax请求之后的返回数据当作参数给这个回调函数传过去
					// 传过去之后 会在定义函数的地方接收到参数
					success(xhr.responseText);
				}
			} else {
				if (error) {
					error(xhr.responseText);
				}
			}
		}
	}
}
function querystring(obj) {// 将对象转换成查询字符串
	var str = "";
	for (var attr in obj) {
		// console.log(attr);
		// console.log(obj[attr]);
		str += attr + "=" + obj[attr] + "&"
	}
	return str.substring(0, str.length - 1);
}


// 清空错误信息
function clearErr (element) {
	var ps = document.querySelectorAll(element);
	for(let i = 0; i < ps.length; i++) {
		ps[i].style.display = "none";
		ps[i].innerText = "";
	}
}

function clearSpace (string) {
	string = string.replace(/\s*/g,"");//去除所有空格
	return string;
}