;(function($, window, document,undefined) {

    var gazeObjectList= [];
    var GazeObject = function(ele, act) {
        this.$element = ele,
        this.border=[],
        this.eyeInAction = act,
        this.eyeOutAction = function(){},
        this.eyeFixAction = function(){},
        this.fixExecute = true,
        this.state = 'out',
        this.fixation = 0,
        this.time = 0,
        this.outCounter = 0,
        this.outThreshold = 1,
        this.inCounter = 0,
        this.inThreshold = 1
    }
    var suspendActionList = [];
    var suspendObject = function(act) {
        this.suspendAction = act
    }
    var outWindowActionList = [];
    var outWindowObject = function(act) {
        this.outWindowAction = act,
        this.outWindowThreshold = 1
    }

    var windowState = 'in';
    var outWindowCounter = 0;
    var gethint = false;
    var hintTime = 3000;

    $.fn.eyeIn = function(act,threshold) {

        if($.checkFunctionArgument("eyeIn",act)==false)
            return

        var gazeObject = new GazeObject(this, act);        
        var rect = gazeObject.$element[0].getBoundingClientRect();
        var retBorder = [rect.left+ document.body.scrollLeft,rect.right+ document.body.scrollLeft,rect.top+ document.body.scrollTop,rect.bottom+ document.body.scrollTop];
        gazeObject.border = retBorder;
        gazeObject.inThreshold = $.setThresholdValue(threshold);;
        gazeObjectList.push(gazeObject);

    };

    $.fn.eyeFix = function(act,fixation) {

        if($.checkFunctionArgument("eyeFix",act)==false)
            return;

        var gazeObject;
        if(fixation==0)
            gazeObject = new GazeObject(this, act);
        else{
            gazeObject = new GazeObject(this, function(){});
            gazeObject.eyeFixAction = act;
            gazeObject.fixation = fixation;
        }

        var rect = gazeObject.$element[0].getBoundingClientRect();
        var retBorder = [rect.left+ document.body.scrollLeft,rect.right+ document.body.scrollLeft,rect.top+ document.body.scrollTop,rect.bottom+ document.body.scrollTop];
        gazeObject.border = retBorder;
        gazeObjectList.push(gazeObject);

    };

    $.fn.eyeOut = function(act,threshold) {

        if($.checkFunctionArgument("eyeOut",act)==false)
            return;

        for (var i = 0; i < gazeObjectList.length; i++){
            if(gazeObjectList[i].$element.is(this)){
                gazeObjectList[i].eyeOutAction =  act;
                gazeObjectList[i].outThreshold = $.setThresholdValue(threshold);;
                return;     
            }
        }

        var gazeObject = new GazeObject(this, function(){});        
        var rect = gazeObject.$element[0].getBoundingClientRect();
        var retBorder = [rect.left+ document.body.scrollLeft,rect.right+ document.body.scrollLeft,rect.top+ document.body.scrollTop,rect.bottom+ document.body.scrollTop];
        
        gazeObject.border = retBorder;
        gazeObject.eyeOutAction = act;
        gazeObject.outThreshold = $.setThresholdValue(threshold);;
        gazeObjectList.push(gazeObject);
    };

    $.eyeSuspend = function(act) {

        if($.checkFunctionArgument("eyeSuspend",act)==false)
            return;

        var suspendObj = new suspendObject(act);    
        suspendActionList.push(suspendObj);
    };

    $.eyeOutWindow = function(act,threshold) {

        if($.checkFunctionArgument("eyeOutWindow",act)==false)
            return;

        var OutWindowObj = new outWindowObject(act);
        OutWindowObj.outWindowThreshold = $.setThresholdValue(threshold);    
        outWindowActionList.push(OutWindowObj);

    };
    $.eyehint = function(sec) {
        hintTime = sec;
        gethint = true;
    };


    $.extend({
        checkFunctionArgument(func,act){
            if (typeof act != 'function') { // make sure the callback is a function
                console.log(func +  " function's arguments is not a function");
                return false;
            }
            return true;
        },
        setThresholdValue(threshold){
            if(threshold)
                return threshold;
            return 1;
        } 
    })


    $.extend({
        connectTobii: function() {
            console.log("open the listen port ");
              window.addEventListener("message", function(msg) {
                    if(msg.data.secret_key && 
                      (msg.data.secret_key === "S0cialNUI") && 
                       msg.data.source === "content_script"){

                        if(msg.data.location){
                            $.locateGazePoint(msg.data.location);
                            $.checkWithinWindow(msg.data.location);
                        }
                        
                        if(msg.data.suspend)
                            $.suspending();

                        if(msg.data.backWindow && hintTime)
                            $.hint(msg.data.backWindow);
                    }
                }, false);
        },
        locateGazePoint: function(gazepoint) {
            for (var i = 0; i < gazeObjectList.length; i++){
                if(gazeObjectList[i].border.length>0){

                    Objectborder = gazeObjectList[i].border
                    var curState = gazeObjectList[i].state;

                    if(gazepoint.x>=Objectborder[0]  && gazepoint.x <= Objectborder[1]){
                        if(gazepoint.y>=Objectborder[2]  && gazepoint.y <= Objectborder[3]){
                            if(gazeObjectList[i].state == 'out'){
                                gazeObjectList[i].inCounter = 1;
                                gazeObjectList[i].state = 'in';
                                gazeObjectList[i].time = new Date().getTime();                                   
                            }
                            else{
                                var fixTime = new Date().getTime() - gazeObjectList[i].time;
                                if(fixTime > gazeObjectList[i].fixation && gazeObjectList[i].fixExecute){
                                    gazeObjectList[i].eyeFixAction();
                                    gazeObjectList[i].fixExecute = false;
                                }
                                gazeObjectList[i].inCounter+=1;
                            }

                            if(gazeObjectList[i].inCounter==gazeObjectList[i].inThreshold)
                                gazeObjectList[i].eyeInAction();
                        }
                        else
                            gazeObjectList[i].state = 'out'
                    }
                    else
                        gazeObjectList[i].state = 'out'


                    if(curState=='in' && gazeObjectList[i].state == 'out'){
                        
                        gazeObjectList[i].outCounter = 1;
                        gazeObjectList[i].fixExecute = true;
                    }

                    if(curState=='out' && gazeObjectList[i].state == 'out')
                        gazeObjectList[i].outCounter += 1;

                    if (gazeObjectList[i].outCounter == gazeObjectList[i].outThreshold) 
                        gazeObjectList[i].eyeOutAction();

                }
            }
        },
        checkWithinWindow: function(gazepoint) {
            
            var left   = document.body.scrollLeft;
            var right  = document.body.scrollLeft + window.innerWidth;
            var top    = document.body.scrollTop;  
            var bottom = document.body.scrollTop + window.innerHeight;
            
            if(gazepoint.x < left || gazepoint.x > right || gazepoint.y < top || gazepoint.y > bottom){
                if(windowState=='in'){
                    windowState='out';
                    outWindowCounter = 1;
                }
                else
                    outWindowCounter+=1;
            }
            else{
                windowState = 'in';
                outWindowCounter = 0;
            }


            if(windowState=='out'){
                for (var i = 0; i < outWindowActionList.length; i++)
                    if(outWindowCounter == outWindowActionList[i].outWindowThreshold)
                        outWindowActionList[i].outWindowAction();
            }

        },
        suspending: function(){
            for (var i = 0; i < suspendActionList.length; i++)
                suspendActionList[i].suspendAction();
        },
        hint: function(point){
            var chrId = document.getElementById('rightArrow');
            chrId.style.display = 'inline';
            chrId.style.top = point.y + "px";
            chrId.style.left = point.x + "px";
            setTimeout(function() {chrId.style.display = 'none'; }, hintTime);
        }
    })
    $.connectTobii();


})(jQuery, window, document);