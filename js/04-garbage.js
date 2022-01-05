
 	window.onload =	function getList() {
			$ajax({
				method: "get",
				url: 'http://121.196.8.145:10000/test/getfundAll',
				aysn: true,
				success: function(res) {
					var obj = JSON.parse(res);
					//console.log(obj);
					let formgroups = document.querySelector('.form-groups'); //获取容器
					let p = 1; //根据p值显示每页数据
					let data = []; //每页要显示的数据
					console.log(obj);
					data = obj.list;
					//console.log(data);
					let render = () => {
						formgroups.innerHTML = ' ';
						//要显示的数据
						data.forEach((item, index) => {
							formgroups.innerHTML += `
							<div class="form-group clearfix"> 
								<div class="form-group-left">
									<div class="form-img">
										<span><img src="img/${item.status}.png" class="mu-status"></span>
										<img src="${item.imgsrc}" class="mu-img" >
									</div>
									<button class="form-group-btn" data-status="${item.status}" data-id="${item.id}" data-title="${item.fundtitle}" data-type="${item.status}">我要捐款</button>
								</div>
								<div class="form-group-right clearfix">
									<p><span class="green-color">【<span class="mu-type">${item.fundtype}</span>】</span><span class="mu-title">${item.fundtitle}</span></p>
									<p class="ellips_2 font-12 mu-describe">${item.funddescribe}
									<span class="green-color xiangxi">查看详细>></span></p>
									<p class="font-12">项目时间：<span class="mu-time">${item.fundtime}</span></p>
									<p class="font-12">活动地点：<span class="mu-place">${item.fundplace}</span></p>
									<p class="font-12">筹款目标：<span class="orgin-color mu-target">${item.fundtarget}</span>元</p>
									<p class="font-12">参捐人数：<span class="green-color mu-people">${item.fundpeople}</span>人</p>
									<p class="font-12">活动标签：【残联官方】【募捐活动】【线上活动】</p>
								</div>
							</div>
							
							`;
						});
						let oBtns = document.querySelectorAll('.form-group-btn');
						//console.log(oBtns);
						for(var i = 0; i < oBtns.length; i++) {
							// 改变按钮状态
							var btnType = document.getElementsByClassName('form-group-btn')[i].getAttribute('data-type');
							if(btnType == 2 ) {
								oBtns[i].classList.add('bg-origin');
								oBtns[i].innerText = "我要报名"
							}else if(btnType == 3){
								oBtns[i].classList.add('bg-gray');
								oBtns[i].innerText = "已结束";
								oBtns[i].style.cursor = "not-allowed";
								oBtns[i].style.pointerEvents = "none";
							}
							oBtns[i].onclick = function () {
								let id = this.getAttribute('data-id');
								let title = this.getAttribute('data-title');
								let status = this.getAttribute('data-status');
								location.href = "05-mujuanxiangqing.html?"+"id=" + id + "&fundtitle=" + title + "&status=" + status;
								
							}
						}
					
					};
					// 初始化
					render();
					
					
					// 分页
					var oUl = document.querySelector('.fenye ul');
					let pageCount = obj.lastPage;//总页数
					for (let i = 1; i <= pageCount; i++) {
						oUl.innerHTML +=`<li>${i}</li>`;
						let liAll = oUl.querySelectorAll('li');
						liAll[p - 1].classList.add('active');
					}
					// 点击页码
					let liAll = oUl.querySelectorAll('li');
					liAll.forEach((item, index) => {
						item.onclick = function () {
							for(let j = 0; j < liAll.length; j++) {
								liAll[j].classList.remove('active');
							}
							this.classList.add('active');
							p = index + 1;//点击页数改变
							nextye(p);
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
							nextye(p);
							//render();
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
						nextye(p);
						//render();
					}
					
				}
			})
		}


		function nextye(page) {
			$ajax({
				method:'get',
				url: 'http://121.196.8.145:10000/test/getfundAll',
				data: {
					pageNum : page
				},
				success: function(res) {
					var obj = JSON.parse(res);
					console.log(obj);
					let formgroups = document.querySelector('.form-groups'); //获取容器
					// let p = 1; //根据p值显示每页数据
					let data = []; //每页要显示的数据
					
					data = obj.list;
					let render = () => {
						formgroups.innerHTML = ' ';
						//要显示的数据
						data.forEach((item, index) => {
							formgroups.innerHTML += `
							<div class="form-group clearfix"> 
								<div class="form-group-left">
									<div class="form-img">
										<span><img src="img/${item.status}.png" class="mu-status"></span>
										<img src="${item.imgsrc}" class="mu-img" >
									</div>
									<button class="form-group-btn" data-id="${item.id}" data-type="${item.status}">我要捐款</button>
								</div>
								<div class="form-group-right clearfix">
									<p><span class="green-color">【<span class="mu-type">${item.fundtype}</span>】</span><span class="mu-title">${item.fundtitle}</span></p>
									<p class="ellips_2 font-12 mu-describe">${item.funddescribe}
									<span class="green-color xiangxi">查看详细>></span></p>
									<p class="font-12">项目时间：<span class="mu-time">${item.fundtime}</span></p>
									<p class="font-12">活动地点：<span class="mu-place">${item.fundplace}</span></p>
									<p class="font-12">筹款目标：<span class="orgin-color mu-target">${item.fundtarget}</span>元</p>
									<p class="font-12">参捐人数：<span class="green-color mu-people">${item.fundpeople}</span>人</p>
									<p class="font-12">活动标签：【残联官方】【募捐活动】【线上活动】</p>
								</div>
							</div>
							
							`;
						});
						let oBtns = document.querySelectorAll('.form-group-btn');
						//console.log(oBtns);
						for(var i = 0; i < oBtns.length; i++) {
							// 改变按钮状态
							var btnType = document.getElementsByClassName('form-group-btn')[i].getAttribute('data-type');
							if(btnType == 2 ) {
								oBtns[i].classList.add('bg-origin');
								oBtns[i].innerText = "我要报名"
							}else if(btnType == 3){
								oBtns[i].classList.add('bg-gray');
								oBtns[i].innerText = "已结束";
								oBtns[i].style.cursor = "not-allowed";
								oBtns[i].style.pointerEvents = "none";
							}
							oBtns[i].onclick = function () {
								let id = this.getAttribute('data-id');
								location.href = "../05-mujuanxiangqing.html?id=" + id;
								console.log(id);
							}
						}
					
					};
					// 初始化
					render();
				}
			})
		}
	