$(document).ready(function(){

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
});