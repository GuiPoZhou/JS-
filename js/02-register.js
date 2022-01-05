		
		var oNext = document.querySelector('.next_btn');
		var oImg = document.querySelector('.changeImg');//获取图片更改
		var oFStep = document.querySelector('.first_step');//第二步
		var oSStep = document.querySelector('.second_step');//第一步
		var ps = document.querySelectorAll('.errp');//提示错误信息
		var i = 0;
		oNext.onclick = function() {
			if (i == 0 ) {
				clearErr('.errp');
				var phone = document.querySelector('#phone');
				var code = document.querySelector('#code');
				var oChecked = document.querySelector('.checked');
				phone.style.borderColor = "#ccc";
				code.style.borderColor = "#ccc";
				var phoneValue =clearSpace(phone.value);
				var codeValue = clearSpace(code.value);
				if(phoneValue.length == 0) {
					phone.style.borderColor = "red";
					ps[0].innerText = "手机号不能为空";
					phone.value = "";
					ps[0].style.display = 'block';
					ps[0].style.marginLeft = "92px";
				}else if (codeValue.length == 0 ) {
					code.style.borderColor = "red";
					code.value = "";
					ps[1].innerText = "验证码不能为空";
					ps[1].style.display = 'block';
					ps[1].style.marginLeft = "92px";
				}else if (oChecked.checked == false) {
					ps[2].innerText = "请勾选本平台注册协议";
					ps[2].style.display = "block";
					ps[2].style.marginLeft = "-216px";
				}else {
					oImg.src = "img/a1.png";
					oFStep.style.display = "none";
					oSStep.style.display = "block";
					return i++;
				}
			}
			// 第二步
			if (i == 1) {
				clearErr('.errp');
				var user = document.querySelector('#user');
				var pwd = document.querySelector('#pwd');
				var conpwd = document.querySelector('#confirmPwd');
				user.style.borderColor = "#ccc";
				pwd.style.borderColor = "#ccc";
				conpwd.style.borderColor = "#ccc";
				var userValue = clearSpace(user.value);
				var pwdValue = clearSpace(pwd.value);
				var conpwdValue = clearSpace(conpwd.value);
				if(userValue.length == 0) {
					user.style.borderColor = "red";
					user.value = "";
					ps[3].innerText = "用户名不能为空";
					ps[3].style.display = 'block';
					ps[3].style.marginLeft = "92px";
				}else if (pwdValue.length == 0 ){
					pwd.style.borderColor = "red";
					pwd.value = "";
					ps[4].innerText = "密码不能为空";
					ps[4].style.display = 'block';
					ps[4].style.marginLeft = "92px";
				}else if (conpwdValue.length == 0) {
					conpwd.style.borderColor = "red";
					conpwd.value = "";
					ps[5].innerText = "密码不能为空";
					ps[5].style.display = 'block';
					ps[5].style.marginLeft = "92px";
				}else if(pwd.value != conpwd.value){
					pwd.value = "";
					conpwd.value = "";
					alert("密码与确认密码不一致");
				}else {
					oImg.src = "img/a2.png";
					oNext.style.display = "none";
					oSStep.style.display = "none";
					var oThstep = document.querySelector('.third_step');
					oThstep.style.display = "block";
				}
			}
			
		}