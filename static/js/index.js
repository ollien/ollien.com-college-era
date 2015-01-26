var canFade = true;
var currentIndex = "0";
function ready(){
	var dots = Array.prototype.slice.call(document.querySelectorAll(".circle"));
	var rawDisplays = Array.prototype.slice.call(document.querySelectorAll(".display"));
	var displays ={}
	rawDisplays.forEach(function(item){
		item.style.minHeight="800px"
		displays[item.getAttribute("num")]=item
	});
	console.log(displays);
	dots.forEach(function(item){
			item.onclick = function(){
				var currentDisplay = displays[currentIndex];
				canFade=false;
				if (currentIndex != item.getAttribute("num")){
					canFade=false;
					dots[currentIndex].classList.remove('selected');
					currentIndex = item.getAttribute("num");
					item.classList.add('selected');
					var newDisplay = displays[currentIndex];
					fade(currentDisplay,newDisplay);			
				}
		} 
		});
		autoFade(6000, dots, displays);
}
function timeStringtoTime(s){
	if (s.indexOf('ms')!=-1){
		var result = s.replace('ms','');
		return parseInt(result);
	}
	else{
		var result = s.replace('s','');
		return parseFloat(result)*1000;
	}
}
function showDots(){
	var element = document.getElementById('dots');
	element.style.display='block';	
}
function autoFade(t,circles,displays,index){
	if (canFade){
		if (index!==undefined && index>=0) {
			circles[index].classList.remove('selected');
			startDisplay = displays[index.toString()];
			if (index!=circles.length-1)
				index+=1;
			else
				index=0;
			endDisplay = displays[index.toString()];
			currentIndex = index.toString();
			fade(startDisplay,endDisplay);
			circles[index].classList.add('selected');
			
		}
		else
			index=0;
		setTimeout(function(){autoFade(t,circles,displays,index);}, t);
	}
}

function fade(start,finish){
	start.classList.add("faded")
	setTimeout(function() {
		start.classList.add("hiddenDisplay");
		finish.classList.remove("hiddenDisplay");
		setTimeout(function() {
			finish.classList.remove("faded");
		}, timeStringtoTime(window.getComputedStyle(start).getPropertyValue("transition-duration")));
	}, timeStringtoTime(window.getComputedStyle(start).getPropertyValue("transition-duration")));
}
