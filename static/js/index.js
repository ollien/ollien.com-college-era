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
		    console.log(currentDisplay);
		    if (currentIndex != item.getAttribute("num")){
				currentIndex = item.getAttribute("num");
				console.log(currentIndex);
				var newDisplay = displays[currentIndex];
				console.log(newDisplay);	
				console.log(window.getComputedStyle(currentDisplay).getPropertyValue("transition-duration"));
				currentDisplay.classList.add("faded")
				setTimeout(function() {
					currentDisplay.classList.add("hiddenDisplay");
					newDisplay.classList.remove("hiddenDisplay");
					setTimeout(function() {
						newDisplay.classList.remove("faded");
					}, timeStringtoTime(window.getComputedStyle(currentDisplay).getPropertyValue("transition-duration")));
				}, timeStringtoTime(window.getComputedStyle(currentDisplay).getPropertyValue("transition-duration")));
						
			}
		} 
    });
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
