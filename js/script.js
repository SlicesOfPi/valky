var hasDone = false;
function checkPage(){
	var myElement = document.getElementById('ninetyPercent');
	var eleTwo = document.getElementById('eightyPercent');
	var eleX = document.getElementById('seventyPercent');
	var eleThree = document.getElementById('linkslist');
	var elePos = getPosition(myElement);
	var elePosX = getPosition(eleX);
	var elePos2 = getPosition(eleTwo);
	var elePos3 = getPosition(eleThree);
	var pageHeight = window.innerHeight;
	var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
	doAllCheckElements();
	function doAllCheckElements(){
		if(scrollTop+(pageHeight-55)>=elePos){ // Minus 55 because it'll give some slack for you to fully see the bar first.
			document.getElementById('ninetyPercent').style.width = "90%";
		}
		if(scrollTop+(pageHeight-55)>=elePos2){ // Minus 55 because it'll give some slack for you to fully see the bar first.
			document.getElementById('eightyPercent').style.width = "80%";
		}
		if(scrollTop+(pageHeight-55)>=elePosX){ // Minus 55 because it'll give some slack for you to fully see the bar first.
			document.getElementById('seventyPercent').style.width = "70%";
		}
		if(scrollTop+(pageHeight-55)>=elePos3){ // Minus 55 because it'll give some slack for you to fully see the bar first.
			if(hasDone==true){

			}
			else{
				hasDone = true;
				var listElements = document.getElementsByTagName('li')
				for(key in listElements){
					var element = listElements[key];
					element.style.animationPlayState = "running"; 
				}
			}

		}
	}
	//console.log(scrollTop);
}

function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;

    while(element) {
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }

    return yPosition;

}

//
//
