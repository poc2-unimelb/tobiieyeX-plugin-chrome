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

});