// media query event handler
window.onload = function(){
    if (matchMedia) {
        var mq = window.matchMedia("(min-width: 600px)");
        mq.addListener(WidthChange);
        WidthChange(mq);
    }
}

// media query change
function WidthChange(mq) {

	if (mq.matches) {
	    document.getElementById("scrollPanel").fixed = true;
	    
	    
	}
	else {
	    document.getElementById("scrollPanel").fixed = false;
        //Thought this might work but it doesn't
	    //document.getElementById("headerContainer").style.transform = "translate3d(0px,150px,0px)";
	}

}