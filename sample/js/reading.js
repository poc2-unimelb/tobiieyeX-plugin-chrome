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
    var autoUpdata = true;

    $('p').css('font-size','30px');
    $("div[class='annotag open']").hide();
    $("a[class='menu-item arrow']").hide();

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
    
    $( "a[class='menu-item red']" ).click(function() {
        var topGazeElements = $.topGazeElement(5,'.overlay');
        for (var i = 0; i < topGazeElements.length; i++){
          topGazeElements[i].css('color','red');    
        }
    });
    $( "a[class='menu-item green']" ).click(function() {
        var curObj = $.currentGazeElement('.overlay');
        if(curObj){
          curObj.css('color','#70CC72');
          var utterance = new SpeechSynthesisUtterance(curObj.text());
          speechSynthesis.speak(utterance);
        }
    });
    $( "a[class='menu-item blue']" ).click(function() {
        var curObj = $.currentGazeElement('.overlay');
        if(curObj){
                                        
          curObj.css('color','#669AE1');

          $.ajax({
            url:"http://api.wordnik.com:80/v4/word.json/"+curObj.text()+"/definitions?limit=2&includeRelated=false&useCanonical=false&includeTags=false&api_key="+wordkey,
            dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
            success:function(json){
                                
              $(".word").text(curObj.text());
                initialAnnotation();
                console.log(json);
                for(var i = 0; i < json.length; i++){
                  $(".wordmeaning"+(i+1)).text(json[i].text)
                  $(".wordsource"+(i+1)).text(json[i].attributionText)
                } 
                $("div[class='annotag open']").show();                         
              },
            error:function(){
              console.log("wordnik error");
            }

            });
        }
    });
    $( "a[class='menu-item purple']" ).click(function() {
        $('canvas').css('z-index','100');
        $(document).bind('gazePointMove',updateHeatdata);
    });

    $( "a[class='menu-item lightblue']" ).click(function() {
        $( '.overlay' ).css('color','');
        $("div[class='annotag open']").hide();

        $(document).unbind('gazePointMove',updateHeatdata);
        heat.clear();
        gazeData=[];
        draw();
        $('canvas').css('z-index','-1'); 
    });
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                               window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

    var ctx = get('canvas');

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
                                        
                      curObj.css('color','#669AE1');

                      $.ajax({
                         url:"http://api.wordnik.com:80/v4/word.json/"+curObj.text()+"/definitions?limit=2&includeRelated=false&useCanonical=false&includeTags=false&api_key="+wordkey,
                         dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
                         success:function(json){
                                
                                $(".word").text(curObj.text());
                                initialAnnotation();
                                console.log(json);
                                for(var i = 0; i < json.length; i++){
                                  $(".wordmeaning"+(i+1)).text(json[i].text)
                                  $(".wordsource"+(i+1)).text(json[i].attributionText)
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

    $( "a[class='menu-item red']" ).eyeIn(
            function() {

                  changeBackgroundColor("a[class='menu-item red']",'#EEEEEE','#FE4365');
                  setCircleBartoPosition("a[class='menu-item red']");

                  bar.animate(1.0, {
                      duration: 1000
                  }, function() {    
                      changeBackgroundColor("a[class='menu-item red']",'#ffffff','#EEEEEE');             
                      setCircleBartoDefault();
                      var topGazeElements = $.topGazeElement(5,'.overlay');
                      for (var i = 0; i < topGazeElements.length; i++){
                        topGazeElements[i].css('color','#FE4365');    
                      }
                  });
            },2
    );

    $( "a[class='menu-item red']" ).eyeOut(
        function(){
            changeBackgroundColor("a[class='menu-item red']",'#FE4365','#EEEEEE');
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

                      if(autoUpdata){
                        $(document).bind('gazePointMove',updateHeatdata);
                        autoUpdata = false;
                        $("i[class='fa fa-eye']").attr('class', 'fa fa-eye-slash');
                      }
                      else{
                        $(document).unbind('gazePointMove',updateHeatdata);
                        autoUpdata = true;
                        $("i[class='fa fa-eye-slash']").attr('class', 'fa fa-eye');
                      }
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
                      autoUpdata = true;
                      $("i[class='fa fa-eye-slash']").attr('class', 'fa fa-eye');
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
        $(".wordmeaning1").text('');
        $(".wordmeaning2").text('');
        $(".wordsource1").text('');
        $(".wordsource2").text('');
    }

    $("#buttomArea").eyeIn(
      function(){
        $("a[class='menu-item arrow']").show();
      },5);

    $("#buttomArea").eyeOut(
      function(){
        $("a[class='menu-item arrow']").hide();
    },5);

    $( "a[class='menu-item arrow']" ).eyeIn(
            function() {

                  changeBackgroundColor("a[class='menu-item arrow']",'#EEEEEE','#353333');
                  setCircleBartoPosition("a[class='menu-item arrow']");

                  bar.animate(1.0, {
                      duration: 1000
                  }, function() {    
                      changeBackgroundColor("a[class='menu-item arrow']",'#ffffff','#EEEEEE');             
                      setCircleBartoDefault();
                      $('html, body').animate({
                          scrollTop: $(window).scrollTop() + 200
                      });
                  });
            },2
    );

    $( "a[class='menu-item arrow']" ).eyeOut(
        function(){
            changeBackgroundColor("a[class='menu-item arrow']",'#353333','#EEEEEE');
            setCircleBartoDefault();
        },5);
});