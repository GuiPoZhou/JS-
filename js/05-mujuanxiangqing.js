var database = [];
 var localhref = location.search;
 var arr2 = localhref.split('?');
 var arr3 = arr2[1].split('&');
 //console.log(arr3);
 for (var i = 0; i < arr3.length; i++) {
 	var arr4 = arr3[i].split('=');
 	var data1 = decodeURI(arr4);
 	//console.log(data1);
 	var arr5 = data1.split(',');
 	database.push(arr5[1]);
 }
 var id = parseInt(database[0]);
 var title = database[1];
 var status = parseInt(database[2]);
 // console.log(id);
 // console.log(title);
 // console.log(status);
 $ajax({
 	method: 'get',
 	url: 'http://121.196.8.145:10000/test/getFundById',
 	data: {
 		id: id,
 		fundtitle: title
 	},
 	success: function(res) {
 		var obj = JSON.parse(res);
 		var data = obj.list;
 		//console.log(obj);
 		if (obj.code == 200) {
 			let formgroups = document.querySelector('.form-group');
 			formgroups.innerHTML = `
						<div class="form-group-left">
							<div class="form-img">
								<span><img src="img/` + status + `.png" ></span>
								<img src="${data.imgsrc}" >
							</div>
						</div>
						<div class="form-group-right clearfix">
							<p><span>【<span class="mu-type">${data.fundtype}</span>】</span><span class="mu-title">${data.fundtitle}</span></p>
							<p class="font-12">项目时间: <span class="mu-time">${data.fundtime}</span></p>
							<p class="font-12">发起机构: <span class="mu-jigou">小太阳助困志愿者团队</span></p>
							<p class="font-12">活动地点: <span class="mu-place">${data.fundplace}</span></p>
							<p class="font-12">筹款目标: <span class="mu-target orgin-color bold">${data.fundtarget}</span>元</p>
							<p class="font-12">参捐人数: <span class="mu-people green-color">${data.fundpeople}</span>人</p>
							<p class="font-12">活动标签：【残联官方】【募捐活动】【线上活动】</p>
							<a href="05-1pay.html"><button class="pay-btn">我要捐款</button></a>
						</div>
					 `;
 			if (status == 2) {
 				var payBtn = document.querySelector('.pay-btn');
 				payBtn.classList.add('bg-origin');
 				payBtn.innerText = "报名并捐款";
 			}
 		}
 	},
 	error: function(res) {
 		console.log(res);
 	}
 })
