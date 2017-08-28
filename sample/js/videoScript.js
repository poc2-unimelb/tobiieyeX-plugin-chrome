$(document).ready(function(){

  $('#video').eyeFix(
    function() {
        $('#video')[0].play();
      },1000
  );
  $('#video').eyeOut(
    function() {
        $('#video')[0].pause();
      }
  );
});