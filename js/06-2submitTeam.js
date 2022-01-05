// var imgs = document.getElementById('file');

	function showImg(input) {
		
		var file = input.files[0];
		console.log(file);
		//新建 FileReader 对象
		var reader = new FileReader();
		//图片读取成功回调函数
		reader.onload = function(e) {
			 // 当 FileReader 读取文件时候，读取的结果会放在 FileReader.result 属性中
			document.getElementById('upload').src = e.target.result;
			return e.target.result; 
		}
        // 设置以什么方式读取文件，以base64方式
		reader.readAsDataURL(file);
		
	}


	function tijiao() {
		var subImg = document.querySelector('#upload');
		console.log(subImg.src);
		
		var errps = document.querySelectorAll('.errp');
		var teamName = document.querySelector('#team-name');
		var teamEmail = document.querySelector('#team-email');
		var teamDesc = document.querySelector('#team-describe');
		// console.log(teamName.value);
		// console.log(teamEmail.value);
		// console.log(teamDesc.value);
		var nameValue = clearSpace(teamName.value);
		var Email = clearSpace(teamEmail.value);
		var teamDescValue = clearSpace(teamDesc.value);
		for(let i = 0; i < errps.length; i++) {
			errps[i].innerText = "";
			errps[i].style.display ="none";
			teamName.style.borderColor = "gray";
			teamEmail.style.borderColor = "gray";
			teamDesc.style.borderColor = "gray";
		}
		if(nameValue.length == 0) {
			teamName.value = "";
			teamName.style.borderColor = "red";
			errps[0].style.display = "block";
			errps[0].innerText = "团队名称不能为空";
			return;
		}
		if(Email.length == 0) {
			teamEmail.value = "";
			teamEmail.style.borderColor = "red";
			errps[1].style.display = "block";
			errps[1].innerText = "邮箱不能为空";
			return;
		}
		if(teamDescValue.length == 0) {
			teamDesc.value = "";
			teamDesc.style.borderColor = "red";
			errps[2].style.display = "block";
			errps[2].innerText = "描述不能为空";
			return;
		}
		$ajax({
			method: 'post',
			url: "http://121.196.8.145:10000/test/inertTeam2",
			data: {
				teamname: nameValue,
				teamdescribe: teamDescValue,
				mailbox: Email
			},
			contentType: "application/x-www-form-urlencoded",
			aysn: true,
			success: function(res) {
				if (res == 200) {
					var dialog = document.querySelector('.dialog');
					var shadow = document.querySelector('.shadow');
					shadow.style.display = "block";
					dialog.style.display = "block";
					var checkstatus = document.querySelector('.checkStatus');
					var continuecreate = document.querySelector('.continueCreating');
					checkstatus.onclick = function() {
						teamName.value = "";
						teamDesc.value = "";
						teamEmail.value = "";
						oMyteam.style.display = 'block';
						oCreateteam.style.display = 'none';
						dialog.style.display = "none";
						shadow.style.display = "none";
						searchTeam();
					}
					continuecreate.onclick = function() {
						teamName.value = "";
						teamDesc.value = "";
						teamEmail.value = "";
						dialog.style.display = "none";
						shadow.style.display = "none";
					}

				} else {
					alert('创建失败，请重试');
				}

				console.log(res);
			},
			error: function(res) { // 失败
				console.log(res);
			}
		})
	}
