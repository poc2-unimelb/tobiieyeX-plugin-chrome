$(document).ready(function(){
    $('p').css('font-size','30px');
    $("div[class='annotag open']").hide();
    $("a[class='menu-item arrow']").hide();
    $("nav[class='menu menu-right']").hide();
    $("nav[class='menu menu-left']").hide();

    var gazePosition = localStorage.getItem("gazePositionTime");
    var gazePositionTime = JSON.parse(gazePosition);
    
    $('.playbtn').click(function(){
        $('.playbtn').hide();
        $('canvas').css('z-index','100');
        $('html, body').animate({
            scrollTop: gazePositionTime[0]
        });

        trail();

    });



    async function trail() {
      var interval = 0;
      var initialtime = gazePositionTime[0].time;
       for (var i = 0; i < gazePositionTime.length; i++){
         if(gazePositionTime[i].time){
             interval = gazePositionTime[i].time - initialtime;
             await wait(interval)
             trigger(gazePositionTime[i]);
             initialtime = gazePositionTime[i].time;
           }
          else{
            window.scrollTo(0, gazePositionTime[i]);
          }
       }
       $('canvas').css('z-index','-1');
       $('.playbtn').show();
      }
    function wait(msec) {
      return new Promise(res => {setTimeout(()=>{res()}, msec)})
    }

    function trigger(obj){
      $(document).trigger('eyemove',obj);
    }

});