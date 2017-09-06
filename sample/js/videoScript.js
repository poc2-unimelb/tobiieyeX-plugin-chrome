$(document).ready(function(){

  $('#video').eyeIn(
    function() {
        $('#video')[0].play();
      },5
  );
  $('#video').eyeOut(
    function() {
        $('#video')[0].pause();
      }
  );
});