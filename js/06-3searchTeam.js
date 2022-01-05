var xiugaispan = document.querySelectorAll('.xiugaispan');
var createspan = document.querySelectorAll('.createspan');
function searchTeam() { //请求我的团队数据
	$ajax({
		method: 'get',
		url: "http://121.196.8.145:10000/test/getTeamAll",
		aysn: true,
		success: function(res) {
			var obj = JSON.parse(res);
			//console.log(obj);
			let teamtable = document.querySelector('.my-team-table tbody');
			//console.log(teamtable);
			let pagination = document.querySelector('.fenye ul');
			let pageCount = Math.ceil(obj.length / 10); //总页数
			let p = 1; //每页要显示的数据 页码
			let DataRender = []; //存储数据
			let render = () => {
				teamtable.innerHTML = `
					<tr>
						<th>团队编号/名称</th>
						<th>创建时间</th>
						<th>团队成员</th>
						<th>活动总数</th>
						<th>进行中的活动</th>
						<th>申请状态</th>
						<th>操作</th>
					</tr>
					`;
				DataRender = obj.slice((p - 1) * 10, 10 * p);
				//console.log(DataRender);
				DataRender.forEach((item, index) => {
					teamtable.innerHTML += `
						<tr>
							<td>
								<p>${item.teamnumber}</p>
								<p class="ellips_1 teamname">${item.teamname}</p>
							</td>
							<td>${item.createdAt}</td>
							<td>${item.teammember}</td>
							<td>${item.activitytotal}</td>
							<td>${item.conductactivity}</td>
							<td class="green-color">已审核(同意)</td>
							<td>
								<button class="bg-green"><img src="img/shouye/cz.png">查看</button>
								<button class="bg-blue" onclick = "bianji('${item.id}' , '${item.teamname}', '${item.teamdescribe}', ' ${item.mailbox}')"><img src="img/shouye/bj.png">编辑</button>
								<button class="bg-zise" onclick="del(${item.id})"><img src="img/shouye/cs.png">删除</button>
							</td>
						</tr>
						`;
				});
			}
			//初始化页面
			render();
			
			// 渲染分页
			pagination.innerHTML = "";
			for (var i = 1; i <= pageCount; i++) {
				pagination.innerHTML += `<li>${i}</li>`;
				let liAll = pagination.querySelectorAll('li');
				liAll[p - 1].classList.add('active');
			}
			// pagination.innerHTML += `<span class="skip">跳转至<input type="text">页</span> `;//获取页数
			let liAll = pagination.querySelectorAll('li');
			// 遍历总页数
			liAll.forEach((item, index) => {
				// 点击页数
				item.onclick = function() {
					for (let j = 0; j < liAll.length; j++) {
						liAll[j].classList.remove('active');
					}
					this.classList.add('active');
					p = index + 1; //点击页数改变
					render();
				}
			})
			// 点击上一页下一页
			let changePageClass = () => {
				for(let j = 0; j < liAll.length; j++) {
					liAll[j].classList.remove('active');
				}
				liAll[p-1].classList.add('active');
			}
			
			// 上一页
			let pre = document.querySelector('.prePage');
			pre.onclick = function() {
				if(p<=1) {
					console.log(p);
					return;
				}else {
					p = p - 1;
					changePageClass();
					render();
				}
			}
			// 下一页
			let next = document.querySelector('.nextPage');
			next.onclick = function () {
				if(p >= liAll.length) {
					return;
				}
				p = p + 1;
				changePageClass();
				render();
			}
			
			// let skipInput = document.querySelector('.skip input');
			// // 回车跳转页面
			// skipInput.onkeydown = function(enter) {
			// 	if(enter.keyCode == 13 && skipInput.value !='') {
					
			// 	}
			// }
		},
		error: function(res) {
			console.log(res);
		}
	})
}

// 修改
	function bianji(id,teamname,teamdescribe,mailbox) {//修改页面
		let createteam = document.querySelector('#createteam');//创建团队
		let myteam = document.querySelector('#wodetuandui');//我的团队
		myteam.style.display = "none";
		createteam.style.display = "block";
		let teamName = document.querySelector('#team-name');
		let teamdec = document.querySelector('.team-describe');
		let teamEmail = document.querySelector('#team-email');
		
		teamName.value = teamname;
		teamdec.value = teamdescribe;
		teamEmail.value = mailbox;
		
		let resetBtn = document.querySelector('#reset');
		resetBtn.style.display = "none";
		let submitBtn = document.querySelector('#submit');
		submitBtn.style.display = "none";
		let xiugaiBtn = document.querySelector('.xiugai');
		xiugaiBtn.style.display = "block";
		for(let i = 0; i < createspan.length; i++) {
			createspan[i].style.display = "none";
			xiugaispan[i].style.display = "block";
		} 
		xiugaiBtn.onclick = function() {
			$ajax({
				method: 'post',
				url:'http://121.196.8.145:10000/test/updateTeam',
				data: {
					id: id,
					teamname: teamName.value,
					teamdescribe: teamdec.value,
					mailbox: teamEmail.value
				},
				contentType: "application/x-www-form-urlencoded",
				aysn: true,
				success: function(res) {
					var obj = JSON.parse(res);
					if(obj.code == 200) {
						alert("修改成功");
						myteam.style.display = "block";
						createteam.style.display = "none";
						searchTeam();
						
					}else {
						alert(obj.message);
					}
				},
				error: function(res){
					console.log(res);
				}
			})

		}
	}
		
// 删除
function del(id) {
	var msg = "确定要删除吗？";
	if(confirm(msg)) {
		$ajax({
			method:'post',
			url:'http://121.196.8.145:10000/test/deleteById',
			data: {
				id: id
			},
			contentType: "application/x-www-form-urlencoded",
			aysn: true,
			success: function(res) {
				var obj = JSON.parse(res);
				if(obj.code == 200) {
					searchTeam();
				}else {
					alert(obj.message);
				}
			},
			error: function(res) {
				console.log(res);
			}
		})
	}else {
		return false;
	}
	
}