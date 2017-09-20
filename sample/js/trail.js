$(document).ready(function(){
  ;(function(main) {
    main();
  })(function() {

    'use strict';

    var c = document.getElementById('canvas');
    c.width  = $(document).width();
    c.height = $(document).height();
    var ctx = c.getContext('2d');

    var WIDTH = c.width ;
    var HEIGHT = c.height ;
    var eye = {
      x: 0,
      y: 0,
      isMoved: false
    };

    var Particle = function() {
      this.x = 0;
      this.y = 0;
      this.vx = 0;
      this.vy = 0;
      this.r = 255;
      this.g = 255;
      this.b = 255;
      this.a = 0;
      this.life = 0;
      this.radius = Math.random() * 20;
    };

    Particle.prototype = {
      constructor: Particle,
      update: function() {
        if(this.life > 0) {
          this.life -= 2;
          if(this.life < 50) {
            this.vx += Math.random() * 4 - 2;
            this.vy += Math.random() * 4 - 2;
            this.vx *= 0.9;
            this.vy *= 0.9;
            this.x += this.vx;
            this.y += this.vy;
            this.a = this.life / 50;            
          }
        }
      },
      render: function(ctx) {
        ctx.save();
        ctx.fillStyle = 'rgba('+ this.r + ', ' + this.g + ', ' + this.b + ', ' + this.a +')';
        ctx.translate(this.x, this.y);
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      },
      reset: function(tx, ty) {
        this.x = tx;
        this.y = ty;
        this.vx = Math.random() * 4 - 1;
        this.vy = Math.random() * 4 - 1;
        this.life = 150;
        this.a = 1;
        this.g = Math.round(255 * (this.x / WIDTH));
        this.b = Math.round(255 * (this.y / HEIGHT));
        this.radius = Math.random() * 20;
      }
    };

    var particles = [];
    var particle = null;
    var particleCount = 500;
    var tx = 0;
    var ty = HEIGHT / 2;
    var idx = 0;
    var temp = {
      vx: Math.random() * 4 - 2,
      vy: Math.random() * 4 - 2,
      x: WIDTH ,
      y: HEIGHT 
    }

    for(var i = 0; i < particleCount; i++) {
      particle = new Particle();
      particles.push(particle);
    }

    function spawn(target) {

      tx += (target.x - tx) * 0.2;
      ty += (target.y - ty) * 0.2;

      particles[idx].reset(tx, ty);
      if(++idx >= particles.length) idx = 0;

    }
    $(document).bind('eyemove',updateGazePosition);

    function updateGazePosition(evt, e){

      var curTime =  moment().valueOf();
      
      eye.x = e.x ;
      eye.y = e.y ;
      eye.isMoved = true;

      spawn(eye);

    };

    requestAnimationFrame(function loop() {
      requestAnimationFrame(loop);
      ctx.clearRect(0, 0, WIDTH, HEIGHT);


      for(var i = 0; i < particleCount; i++) {
        particle = particles[i];
        particle.update();
        particle.render(ctx);
      }
    });


  });
});