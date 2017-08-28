$(document).ready(function(){

  var audio = document.getElementById("BackgroundAudio"); 
  var elephantAudio = document.getElementById("elephantAudio"); 

  $('.swallowing').eyeIn(
      function() {
        $(".img-fluid").attr("src","img/swallowing.jpg");
        $('.caption.text-muted').text("boa swallowing an animal");
      }
  );

  $('.elephant').eyeIn(
    function() {
        $(".img-fluid2").attr("src","img/elephant.jpg");
        $('.caption.text-muted.img2').text("Drawing Number Two");
      }
  );

  $('.img-fluid2').eyeFix(
    function() {
        if($('.img-fluid2').attr('src') == "img/elephant.jpg")
             elephantAudio.play();
      },1000
  );

  $('.img-fluid').eyeFix(
    function() {
        audio.play();
      },
      1500
  );

  $.eyeOutWindow(
      function() {
          audio.pause();
      }
  );
  $.eyehint(5000);

  $('.swallowing').css('border', '2px solid green');
  $('.elephant').css('border', '2px solid green');
  
});