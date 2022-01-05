
	var card = document.querySelectorAll('.card-img img');
		for(let i = 0; i < card.length; i++) {
			
			if(i < 9) {
				card[i].src = "img/index/0" + (i+1) + ".jpg";
			}else
			if( i == 9) {
				card [i].src = "img/index/" + (i+1) + ".jpg";
			}
			else {
				card[i].src = "img/index/" + (i+1) + ".jpg";
			}
		}
		
		var local = document.querySelectorAll('.search-all');
		for(var i = 0; i < local.length; i++) {
			local[i].onclick = function () {
				location.href = "04-mujuan.html";
			}
		}

function autoplay() {
	key++;
	square++;
	square = square > olLi.length - 1 ? 0 : square; //走到最后一个，重设为0
	if (key > olLi.length) {
		box.style.left = 0;
		key = 1;
	}
	stratVarMove(box, -key * box.children[0].offsetWidth);
	for (let i = 0; i < olLi.length; i++) {
		olLi[i].className = "";
	}
	olLi[square].className = "active";
}
var box = document.querySelector('.ul');
var ol = document.querySelector('ol');
var all = document.querySelector('.lunbo');
var key = 0; //记录走几张
var square = 0; //走到第几个
var timer = null; //定时器
var boxArr = box.children; //获取图片个数
var newImg = box.children[0].cloneNode(true); //克隆第一图
box.appendChild(newImg);
for (var i = 0; i < boxArr.length - 1; i++) { //补全分页器
	var newLi = document.createElement('li');
	ol.appendChild(newLi);
}
var olLi = ol.children; //获取ol下的所有子节点
olLi[0].className = "active"; //选中第一页
for (let i = 0; i < olLi.length; i++) {
	olLi[i].index = i;
	olLi[i].onclick = function() {
		for (let j = 0; j < olLi.length; j++) {
			olLi[j].className = "";
		}
		this.className = "active";
		stratVarMove(box, -this.index * box.children[0].offsetWidth);
		square = key = this.index; //值统一，防止继续轮播
	}
}
timer = setInterval(autoplay, 2000);
all.onmouseover = function() {
	clearInterval(timer);
}
all.onmouseout = function() {
	timer = setInterval(autoplay, 2000);
}
