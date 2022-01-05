// 选项卡
var tabs = document.querySelectorAll(".account");
var users = document.querySelectorAll(".box div");
for (let i = 0; i < tabs.length; i++) {
	tabs[i].index = i;
	tabs[i].onclick = function() {
		for (let j = 0; j < tabs.length; j++) {
			tabs[j].className = "";
			users[j].style.display = "none";

		}
		this.className = "active";
		users[this.index].style.display = "block";
	}
}
//登录
function login() {
	let errps = document.querySelectorAll('.errp');
	var user = document.getElementById('user');
	var pwd = document.getElementById('pwd');
	user.style.borderColor = "black";
	pwd.style.borderColor = "black";
	var userValue = clearSpace(user.value);
	var pwdValue = clearSpace(pwd.value);
	for (let i = 0; i < errps.length; i++) {
		errps[i].innerText = "";
		errps[i].style.display = "none";
	}
	if (userValue.length == 0) {
		user.value = "";
		user.style.borderColor = "red";
		errps[0].style.display = "block";
		errps[0].innerText = "手机号不能为空";
	} else if (pwdValue.length == 0) {
		pwd.value = "";
		pwd.style.borderColor = "red";
		errps[1].style.display = "block";
		errps[1].innerText = "密码不能为空";
	} else {
		$ajax({
			method: 'post',
			url: "http://121.196.8.145:10000/test/login",
			data: {
				// telnumber 账号	
				// password 密码
				telnumber: user.value,
				password: pwd.value,
				// data: "telnumber=18746526341&password=123456",
			},
			contentType: "application/x-www-form-urlencoded",
			aysn: true,
			success: function(res) { // 成功
				var obj = JSON.parse(res);
				if (obj.code == 200) {
					window.location = "03-main.html";
				} else {
					var err = obj.message;
					var touming = document.querySelector('.touming');
					var tanchu = document.querySelector('.tanchu');
					var dialog = document.querySelector('.tanchu p');
					var oBtns = document.querySelectorAll('.tanchu .footer button');
					user.value = "";
					pwd.value = "";
					touming.style.display = "block";
					tanchu.style.display = "block";
					dialog.innerText = err;
					for(let i =0; i < oBtns.length; i++) {
						oBtns[i].onclick = function () {
							touming.style.display = "none";
							tanchu.style.display = "none";
							dialog.innerText = "";
						}
					}
				}
			},
			error: function(res) { // 失败
				console.log(res);
			}
		})
	}

}
