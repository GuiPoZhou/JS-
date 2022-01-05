// 第一个参数 移动的目标
// 第二个参数 移动的距离(目标位置)
function stratConMove(element, iTarget) {// 匀速运动
	// var speed = 10;// 速度 每一次移动的距离
	// var timer = null;
	// clearInterval(element.timer);
	// element.timer = setInterval(function () {
	// 	// 每20毫秒 将left的值在原有基础上 + 10
	// 	var cur = element.offsetLeft;// 左侧偏移量
	// 	if (cur < iTarget) {
	// 		element.style.left = cur + speed + "px";// 设置left偏移量
	// 	} else {
	// 		clearInterval(timer);
	// 	}
	// }, 20)

	var timer = null;
	clearInterval(element.timer);
	element.timer = setInterval(function () {
		// 每20毫秒 将left的值在原有基础上 + 10
		var cur = element.offsetLeft;// 左侧偏移量
		// 800    400 
		var speed = cur > iTarget ? -10 : 10;// 平均速度 当前的偏移量 和目标位置比较 如果偏移量大于了目标位置 往左侧运动
		if (cur == iTarget) {// 如果偏移量等于了目标位置 证明到了终点 清空定时器
			clearInterval(timer);
		} else {
			element.style.left = cur + speed + "px";// 设置left偏移量
		}
	}, 20)
}
function stratVarMove(element, iTarget) {// 匀速运动
	var timer = null;
	clearInterval(element.timer);
	element.timer = setInterval(function () {
		// 每20毫秒 将left的值在原有基础上 + 10
		var cur = element.offsetLeft;// 左侧偏移量
		var speed = (iTarget - cur) / 8;
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);// 速度取值 最小值无论正负 最小只能是1
		if (cur == iTarget) {// 如果偏移量等于了目标位置 证明到了终点 清空定时器
			clearInterval(timer);
		} else {
			element.style.left = cur + speed + "px";// 设置left偏移量
		}
	}, 20)
}