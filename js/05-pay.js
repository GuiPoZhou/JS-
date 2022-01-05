var money = document.getElementById('money');
		var pay1 = document.querySelector('.pay-1');
		var pay2 = document.querySelector('.pay-2');
		var oBtn = document.querySelector('.pay-submit');
		var jine = document.querySelector('.jine');
		var payMethods = document.querySelectorAll('.wechat');
		var checkbox = document.querySelector('.checkbox');
		var shuming = document.querySelector('#shuming');
		
		var ps = document.querySelectorAll('.errp');
		
		oBtn.onclick = function () {
			clearErr('.errp');
			jine.style.borderColor = "none";
			
			if(money.value.length == 0) {
				ps[0].innerText = "请输入金额";
				money.style.border = "1px solid red";
				ps[0].style.display = "block";
				return;
			}
			if(shuming.value.length == 0 && checkbox.checked == "") {
				ps[1].innerText = "请输入名字";
				shuming.style.border = "1px solid red";
				ps[1].style.display = "block";
				return;
			}
			
			pay1.style.display = "none";
			pay2.style.display = "block";
			jine.innerText = money.value;
		}
		for(let i = 0; i < payMethods.length; i++) {
			payMethods[i].onclick = function () {
				for(let j = 0; j < payMethods.length; j++) {
					payMethods[j].classList.remove('active');
				}
				this.classList.add('active');
			}
			
		}
		
		function isChange() {
			if(checkbox.checked) {
				shuming.readOnly = true;
				shuming.style.disabled = "disabled";
				shuming.style.background = "#cccccc";
				shuming.value = "";
				ps[1].innerText ="";
				shuming.style.border = "";
			}else {
				shuming.backgroundColor = "white";
				shuming.readOnly = false;
				shuming.style.background = "white";
				shuming.style.disabled = "false";
			}
		}
		