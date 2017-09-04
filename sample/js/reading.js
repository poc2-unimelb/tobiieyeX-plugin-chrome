$(document).ready(function(){

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

          $( this ).eyeIn(
            function() {
                var utterance = new SpeechSynthesisUtterance(this.$element.text());
                speechSynthesis.speak(utterance);
            },30
          );

          $( this ).eyeIn(
            function() {

                var border = this.border;
                var text = this.$element.text();

                $.ajax({
                     url:"https://glosbe.com/gapi/translate?from=eng&dest=zh&format=json&phrase="+text+"&pretty=true",
                     dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
                     success:function(json){
                         if(json.result=='ok' && json.tuc && json.tuc[0] && json.tuc[0].phrase && json.tuc[0].meanings){
                            $(".word").text(text);
                            $(".wordmeaning").text(json.tuc[0].meanings[0].text)
                            $(".wordtranslate").text(json.tuc[0].phrase.text);
                            $("div[class='annotag open']").css("left",border[1]+10);
                            $("div[class='annotag open']").css("top",border[3]);
                            $("div[class='annotag open']").show();

                            setInterval(function(){
                              $("div[class='annotag open']").hide();
                            },3000);

                         }
                         else
                          console.log("translate error");
                     },
                     error:function(){
                         console.log("glosbe error");
                     }      
                });
            },30
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
        $.currentGazeElement();
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


    var circleCounter =  get('circleCounter');


    // progressbar.js@1.0.0 version is used
    // Docs: http://progressbarjs.readthedocs.org/en/1.0.0/

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

    bar.animate(1.0, {
        duration: 5000
    }, function() {
        console.log('Animation has finished');
    });
});