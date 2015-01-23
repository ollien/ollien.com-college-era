var canFade = true;
function ready(){
	var dots = Array.prototype.slice.call(document.querySelectorAll(".circle"));
	var rawDisplays = Array.prototype.slice.call(document.querySelectorAll(".display"));
	var displays ={}
	var currentIndex = "0";
	rawDisplays.forEach(function(item){
		displays[item.getAttribute("num")]=item
	});
	console.log(displays);
	dots.forEach(function(item){
			item.onclick = function(){
				var currentDisplay = displays[currentIndex];
				canFade=false;
				if (currentIndex != item.getAttribute("num")){
				currentIndex = item.getAttribute("num");
				var newDisplay = displays[currentIndex];
				console.log(newDisplay);	
				console.log(window.getComputedStyle(currentDisplay).getPropertyValue("transition-duration"));
				fade(currentDisplay,newDisplay);			
			}
		} 
		});
		autoFade(5000, dots, displays);
}
function timeStringtoTime(s){
	if (s.indexOf('ms')!=-1){
		var result = s.replace('ms','');
		console.log(result);
		return parseInt(result);
	}
	else{
		var result = s.replace('s','');
		return parseFloat(result)*1000;
	}
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
