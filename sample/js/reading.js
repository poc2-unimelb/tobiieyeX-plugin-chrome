$(document).ready(function(){

    var circleCounter =  get('circleCounter');
    var bar = new ProgressBar.Circle(circleCounter, {
      strokeWidth: 6,
      easing: 'easeInOut',
      duration: 5000,
      color: '#FFEA82',
      trailColor: '#eee',
      trailWidth: 1,
      svgStyle: null,
      from: { color: '#FFEA82' ,a:0},
      to: { color: '#f44242' ,a:1},
      step: function(state, circle) {
        circle.path.setAttribute('stroke', state.color);
      }
    });
    circleCounter.style.display = 'none';
    var wordkey = '6403c2110633afe550102066b7d03b83d35feb1b3c26c2dae';

    $('p').css('font-size','30px');
    $("div[class='annotag open']").hide();

    $('p').each(function(){
            var text = $(this).html().split(' '),
                len = text.length,
                result = []; 

            for( var i = 0; i < len; i++ ) 
            	result[i] = '<span class="overlay">' + text[i] + '</span>';   

            $(this).html(result.join(' '));
    });

   $( '.overlay' ).each( function( index, element ){   
          $( this ).eyeIn(
            function() {
              this.$element.css('background', '#ffff99');          
            },2
          );

          $( this ).eyeOut(
            function() {
              this.$element.css('background', 'transparent');     
            },10
          );
    });

  	$.eyeSuspend(
	    function() {
        	$( '.overlay' ).css('background', 'transparent');
    	}
  	);
    
    var topGazeElements;
    $( "a[class='menu-item red']" ).click(function() {
        topGazeElements = $.topGazeElement(5);
        for (var i = 0; i < topGazeElements.length; i++){
          topGazeElements[i].css('color','red');    
        }
    });
    $( "a[class='menu-item green']" ).click(function() {
      if(topGazeElements)
        for (var i = 0; i < topGazeElements.length; i++){
          topGazeElements[i].css('color','black');    
        }
    });

    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                               window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

    var ctx = get('canvas');
    var autoUpdata = true;

    ctx.width  = $(document).width();
    ctx.height = $(document).height();

    function get(id) {
        return document.getElementById(id);
    }

    var gazeData = [];
    var heat = simpleheat('canvas').data(gazeData).max(18),
    frame;

    function draw() {
        heat.draw();
        frame = null;
    }
    
    $(document).bind('gazePointMove',updateGazeDate);

    $( "a[class='menu-item blue']" ).click(function() {
        $('canvas').css('z-index','100');  
        heat.data(gazeData);
        draw();
    });
    $( "a[class='menu-item purple']" ).click(function() {
        $('canvas').css('z-index','100');  

        if(autoUpdata){
          autoUpdata = false;
          $(document).bind('gazePointMove',updateHeatdata);
        }
        else{
          autoUpdata = true;
          $(document).unbind('gazePointMove',updateHeatdata);
        }
    });

    $( "a[class='menu-item orange']" ).click(function() {
        autoUpdata = true;
        $(document).unbind('gazePointMove',updateHeatdata);
        heat.clear();
        gazeData=[];
        draw();
        $('canvas').css('z-index','-1');  

    });

    $( "a[class='menu-item lightblue']" ).click(function() {
        var curObj = $.currentGazeElement();
        if(curObj)
          curObj.css('color','red');
    });

    function updateGazeDate(evt, point){
      var gazePoint = [point.x,point.y,1];
      gazeData.push(gazePoint);
    }

    function updateHeatdata(evt, point) {
        var gazePoint = [point.x,point.y,1];
        heat.add(gazePoint);
        frame = frame || window.requestAnimationFrame(draw);
    };
    $( "a[class='menu-item blue']" ).eyeIn(
          function() {

                changeBackgroundColor("a[class='menu-item blue']",'#EEEEEE','#669AE1');
                setCircleBartoPosition("a[class='menu-item blue']");

                var curObj = $.currentGazeElement('.overlay');

                bar.animate(1.0, {
                    duration: 1000
                }, function() {

                    changeBackgroundColor("a[class='menu-item blue']",'#ffffff','#EEEEEE');             
                    setCircleBartoDefault();
                    if(curObj){
                      console.log(curObj);                  
                      curObj.css('color','#669AE1');

                      $.ajax({
                         url:"http://api.wordnik.com:80/v4/word.json/"+curObj.text()+"/definitions?limit=2&includeRelated=false&useCanonical=false&includeTags=false&api_key="+wordkey,
                         dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
                         success:function(json){
                                console.log(json);
                                $(".word").text(curObj.text());
                                initialAnnotation();
                                
                                if(json.length>0){
                                  $(".wordmeaning").text(json[0].text)
                                  $(".wordsource").text(json[0].attributionText)

                                  if(json.length>1){
                                    $(".wordmeaning2").text(json[1].text)
                                    $(".wordsource2").text(json[1].attributionText)
                                  }
                                }  
                                $("div[class='annotag open']").show();
                             
                         },
                         error:function(){
                             console.log("wordnik error");
                         }

                    });
                    }
                });
            },2
    );

    $( "a[class='menu-item blue']" ).eyeOut(
        function(){
            changeBackgroundColor("a[class='menu-item blue']",'#669AE1','#EEEEEE');
            setCircleBartoDefault();
        },5);

    $( "a[class='menu-item green']" ).eyeIn(
          function() {

                changeBackgroundColor("a[class='menu-item green']",'#EEEEEE','#70CC72');
                setCircleBartoPosition("a[class='menu-item green']");

                var curObj = $.currentGazeElement('.overlay');

                bar.animate(1.0, {
                    duration: 1000
                }, function() {    
                    changeBackgroundColor("a[class='menu-item green']",'#ffffff','#EEEEEE');             
                    setCircleBartoDefault();
                    if(curObj){
                      console.log(curObj);                  
                      curObj.css('color','#70CC72');
                      var utterance = new SpeechSynthesisUtterance(curObj.text());
                      speechSynthesis.speak(utterance);
                    }
                });
            },2
    );

    $( "a[class='menu-item green']" ).eyeOut(
        function(){
            changeBackgroundColor("a[class='menu-item green']",'#70CC72','#EEEEEE');
            setCircleBartoDefault();
        },5);

    $( "a[class='menu-item purple']" ).eyeIn(
            function() {

                  changeBackgroundColor("a[class='menu-item purple']",'#EEEEEE','#C49CDE');
                  setCircleBartoPosition("a[class='menu-item purple']");

                  bar.animate(1.0, {
                      duration: 1000
                  }, function() {    
                      changeBackgroundColor("a[class='menu-item purple']",'#ffffff','#EEEEEE');             
                      setCircleBartoDefault();
                      $('canvas').css('z-index','100');
                      $(document).bind('gazePointMove',updateHeatdata);
                  });
            },2
    );

    $( "a[class='menu-item purple']" ).eyeOut(
        function(){
            changeBackgroundColor("a[class='menu-item purple']",'#C49CDE','#EEEEEE');
            setCircleBartoDefault();
        },5);
    $( "a[class='menu-item lightblue']" ).eyeIn(
            function() {

                  changeBackgroundColor("a[class='menu-item lightblue']",'#EEEEEE','#62C2E4');
                  setCircleBartoPosition("a[class='menu-item lightblue']");

                  bar.animate(1.0, {
                      duration: 1000
                  }, function() {    
                      changeBackgroundColor("a[class='menu-item lightblue']",'#ffffff','#EEEEEE');             
                      setCircleBartoDefault();
                      $( '.overlay' ).css('color','');
                      $("div[class='annotag open']").hide();

                      $(document).unbind('gazePointMove',updateHeatdata);
                      heat.clear();
                      gazeData=[];
                      draw();
                      $('canvas').css('z-index','-1'); 
                  });
            },2
    );

    $( "a[class='menu-item lightblue']" ).eyeOut(
        function(){
            changeBackgroundColor("a[class='menu-item lightblue']",'#62C2E4','#EEEEEE');
            setCircleBartoDefault();
        },5);


    function changeBackgroundColor(element,backgroundColor,color){
      $(element).css('background',backgroundColor);
      $(element).css('color',color);
    }

    function setCircleBartoDefault(){
        bar.animate(0,{
          duration: 0
        });            
        circleCounter.style.display = 'none';
    }

    function setCircleBartoPosition(element){
      var rect = $(element)[0].getBoundingClientRect();
      circleCounter.style.top = rect.top-10 +'px';
      circleCounter.style.left = rect.left-10 +'px';
      circleCounter.style.display = 'inline';
    }
    function initialAnnotation(){
        $(".wordmeaning").text('');
        $(".wordmeaning2").text('');
        $(".wordsource").text('');
        $(".wordsource2").text('');
    }

});