console.log("content input v4");


var init = true;
var port = chrome.runtime.connect({ name: "contentChannel" });
var preX = 0;
var preY = 0;
var updateTime = 0;
var suspend = false;
var div = null;

var inWindowTime = 0;
var outWindow = false;

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    console.log(message);
    if(message.msg=='open_trace')
        port.postMessage({ msg: "connect" });
});

port.onMessage.addListener(function(response) {
    //console.log(suspend);
        if(init){
            initDiv();
            init = !init;
        }
        
        if(response.location !=null){
            if(suspend==true){
                suspend = false;
                fadein(div);

            var position = {x : preX,y: preY};
                
                window.postMessage({source: "content_script", 
                    secret_key: "S0cialNUI",backWindow: position}, "*");
            }

            //console.log(response.location);
            updateLocation(response.location);
            updateTime = new Date().getTime();
        }
        if(response.disconnected!=null){
            console.log(response.disconnected);
        }
});



function initDiv(){
    div = document.createElement( 'div' );
	div.id = 'eyexmovingcircle';
	document.body.appendChild( div );
    fadein(div);

    var new_arrow = document.createElement('div');
    var new_rot = document.createElement('div');
    new_rot.id = 'rightArrow';
    new_arrow.className = "arrows";
    new_rot.className = "rotate";
    new_rot.appendChild( new_arrow );
    document.body.appendChild( new_rot );
    new_rot.style.display = 'none';
}

function updateLocation(location){


    
	var chrId = document.getElementById('eyexmovingcircle');

    var barHeight = window.outerHeight - window.innerHeight;
    var eyeY = location.y-10+document.documentElement.scrollTop - window.screenY - barHeight;
    var eyeX = location.x-10+document.documentElement.scrollLeft  - window.screenX;

    if (preX!=0 && preY!=0){
        eyeX = preX + ( eyeX - preX )*0.3;
        eyeY = preY + ( eyeY - preY )*0.3;
    }

    if(checkWithinWindow(eyeX,eyeY)){
        chrId.style.display = 'inline';
        chrId.style.top = eyeY + "px";
        chrId.style.left = eyeX + "px";
    }
    else
        chrId.style.display = 'none';



    location.x = eyeX;
    location.y = eyeY;

    window.postMessage({source: "content_script", 
                secret_key: "S0cialNUI",location: location}, "*");
    preX = eyeX;
    preY = eyeY;

}

function checkWithinWindow(x,y){

        if(x < document.documentElement.scrollLeft || x > window.innerWidth + document.documentElement.scrollLeft)
            return false;   
        if(y < document.documentElement.scrollTop || y > document.documentElement.scrollTop + window.innerHeight)
            return false;   
        
        if(outWindow == true)
            outWindow = false;

        inWindowTime = new Date().getTime();
        return true;        
}

function checkLocationUpdate(){
    if(div ==null)
        return;

    var curTime = new Date().getTime();  

    if(curTime - updateTime > 500 && suspend==false ){
        suspend = true;
        
        window.postMessage({source: "content_script", 
                secret_key: "S0cialNUI",suspend: true}, "*");

        fadeout(div);
    }

    if(curTime - inWindowTime > 500 && outWindow==false ){
        outWindow = true;
              
        window.postMessage({source: "content_script", 
                secret_key: "S0cialNUI",outWindow: true}, "*");
    }

}

setInterval(checkLocationUpdate,500);


function fadein(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
}

function fadeout(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if(suspend==false){
            clearInterval(timer);
        }
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);
}