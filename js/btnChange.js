	var oZhuye = document.querySelector('#team-zhuye');
	var oBtns = document.querySelectorAll('.left button');
	var oAddTeam = document.querySelector('#jiarutuandui'); //加入团队
	var oMyteam = document.querySelector('#wodetuandui'); //我的团队
	var oCreateteam = document.querySelector('#createteam'); //创建团队
	var oHuodong = document.querySelector('#huodong'); //活动管理
	var ocreatebtn = document.querySelectorAll('.create-btn'); //创建团队按钮
	var obtns = document.querySelectorAll('.left > button');
	var mobans = document.querySelectorAll('.moban');
	for(let i = 0; i < obtns.length; i++) {
		obtns[i].onclick = function () {
			for(let j = 0; j < obtns.length; j++) {
				mobans[j].style.display = "none";
				obtns[j].classList.remove('active');
			}
			mobans[i].style.display = "block";
			this.className = "active";
			oCreateteam.style.display = "none";
			searchTeam();
		}
	}
	

	function clearStyle() {
		for (var i = 0; i < oBtns.length; i++) {
			oBtns[i].className = "";

		}
	}
	for (var i = 0; i < ocreatebtn.length; i++) {
		ocreatebtn[i].onclick = function() {
			let imgChange = document.querySelector('#upload');
			imgChange.src = "img/team.png";
			let submitBtn = document.querySelector('#submit');
			let resetBtn = document.querySelector('#reset');
			resetBtn.style.display = "block";
			submitBtn.style.display = "block";
			let xiugaiBtn = document.querySelector('.xiugai');
			xiugaiBtn.style.display = "none";
			clearStyle();
			oBtns[2].className = 'active';
			oZhuye.style.display = 'none';
			oAddTeam.style.display = 'none';
			oMyteam.style.display = 'none';
			oCreateteam.style.display = 'block';
			oHuodong.style.display = 'none';
			let teamname = document.querySelector('#team-name');
			let teamdec = document.querySelector('#team-describe');
			let teamEmail = document.querySelector('#team-email');
			teamname.value = "";
			teamdec.value = "";
			teamEmail.value = "";

			let gaiBtn = document.querySelector('#submit');
			gaiBtn.value = "提交";
			let create = document.querySelectorAll('.xiugai');
			for (var i in create) {
				create[i].innerText = "创建团队";
			}
		}
	}
