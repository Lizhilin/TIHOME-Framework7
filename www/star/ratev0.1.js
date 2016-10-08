var rated = 0; //是否已经打过分,实际使用中这部分应由后台设置
var rateE = document.querySelector(".rate");
var star = document.querySelectorAll(".rate i");

var rateValue = parseInt(rateE.getAttribute("data-value")) - 1; //获取和设置评分值
setRateValue("sure", rateValue);

for (var i = star.length - 1; i >= 0; i--) {
	! function(ii) {
		star[ii].addEventListener("mouseover", function() {
			setRateValue("prev", ii);
		}, false);
		star[ii].addEventListener("mouseout", function() {
			setRateValue("sure", rateValue);
		}, false);
		star[ii].addEventListener("click", function() {
			if (rated == 0) { //只允许打分一次
				rated = 1;
				rateValue = ii;
				rateE.setAttribute("data-value", rateValue);
				setRateValue("sure", rateValue);
				//评分+1,提交后台。代码略
				console.log("评分成功！"); //提示部分的代码
				setRateValue = function() {}; //本来该解绑函数的，但是没能解绑，先设置为空函数
				rateE.className = rateE.className + " cursordef"; //解除手型鼠标指针
			}
		}, false);
	}(i)
}

function setRateValue(type, value) {
	for (var i = star.length - 1; i >= 0; i--) {
		! function(ii) {
			if (ii > value) {
				star[ii].className = "bgNone";
			} else {
				if (type == "sure" && rateValue >= 0) {
					star[ii].className = "bgSure";
				} else {
					star[ii].className = "bgHover";
				}
			}
		}(i)
	}
}