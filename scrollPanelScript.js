// media query event handler
window.onload = function(){
    if (matchMedia) {
        var mq = window.matchMedia("(min-width: 500px)");
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
	}

}