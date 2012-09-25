module particle {
  module log from 'log';
  class Particle {
    constructor(properties={emitter:null,age:0,windVelocity:0.01}) {
      private x, y, age, xVector, yVector, scale, alpha, canRegen, timeDie, emitter, windVelocity;
      @age = properties.age;
      @emitter = properties.emitter;
      @windVelocity = properties.windVelocity;
      @canRegen = true;
      @startRand();
    }
    isAlive() {
      return @age < @timeDie;
    }
    startRand() {
      @xVector = Math.random()*0.5 - 0.25;
      @yVector = -1.5 - Math.random();
      @timeDie = 20000 + Math.floor(Math.random()*12000);
      var invDist = 1.0/Math.sqrt(@xVector*@xVector + @yVector*@yVector);
      @xVector = @xVector*invDist*@emitter.speed;
      @yVector = @yVector*invDist*@emitter.speed;
      @x = (@emitter.x + Math.floor(Math.random()*20)-10);
      @y = (@emitter.y + Math.floor(Math.random()*20)-10);
      @x += (@xVector+@windVelocity)*@age;
      @y += @yVector*@age;
      @scale = 0.01;  
      @alpha = 0.0;
    }
    update(timeElapsed,windVelocity) {
      @age += timeElapsed;
      if (!@isAlive()) {
        if (Math.random() > @emitter.dieRate) {
          @canRegen = false;
        }
        if (!@canRegen) {
          return;
        }
        @age = 0;
        @startRand();
        return;
      }
      var fadeIn = @timeDie * 0.05;
      var startScale;
      var maxStartScale = 0.3;
      if (@age < fadeIn) {
        @alpha = @age/fadeIn;
        startScale = @alpha*maxStartScale; 
        @y += @yVector*2.0*timeElapsed;
      } else {
        @alpha = 1.0 - (@age-fadeIn)/(@timeDie-fadeIn);
        startScale = maxStartScale;
        @y += @yVector*timeElapsed;
      }
      @x += (@xVector+windVelocity)*timeElapsed;
      @alpha *= @emitter.alpha;
      @scale = 0.001 + startScale + @age/4000.0;
    }
    render(ctx) {
      if (!@isAlive()) {
        return;
      }
      ctx.globalAlpha = @alpha;
      var height = @emitter.image.height*@scale;
      var width = @emitter.image.width*@scale;
      var x = Math.round(@x-width/2);
      var y = Math.round(@y+height/2);
      ctx.drawImage(@emitter.image, x, y, width, height);  
      if (x < @dirtyLeft) {
        @dirtyLeft = x;
      }
      if (x+width > @dirtyRight) {
        @dirtyRight = x+width;
      }
      if (y < @dirtyTop) {
        @dirtyTop = y;
      }
      if (y+height > @dirtyBottom) {
        @dirtyBottom = y+height;
      }
    }
  }
  class ParticleEmitter {
    constructor(properties={xScale:1.0,yScale:1.0,particles:1,image:null,alpha:1.0,windVelocity:0.01}) {
      private x, y, dieRate, image, speed, alpha, listParticle;
      @speed = 0.02;
      @alpha = properties.alpha || 1.0;
      @windVelocity = properties.windVelocity;
      @listParticle = [];
      // the effect is positioned relative to the width and height of the canvas
      @x = Particles.CANVAS_WIDTH*properties.xScale;
      @y = Particles.CANVAS_HEIGHT*properties.yScale;
      @image = properties.image;
      @dieRate = 0.95;
      for (var n = 0; n < properties.particles; n++) {
        @listParticle.push(Particle({emitter:this,age:n*50000*@speed,windVelocity:@windVelocity}));
      }
    }
    update(timeElapsed,windVelocity) {
      for (var n = 0; n < @listParticle.length; n++) {
        @listParticle[n].update(timeElapsed,windVelocity);
      }
    }
    render(context) {
      for (var n = 0; n < @listParticle.length; n++) {
        @listParticle[n].render(context);
      }
    }
  }
  export class Particles {
    constructor(properties={canvas:canvas,background:background,image:image}) {
      private background, canvas, context, count, image, lastRender, smokeRight, smokeLeft, dirtyLeft, dirtyRight, dirtyBottom, dirtyTop, windVelocity;
      @canvas = properties.canvas;
      @lastRender = new Date().getTime();
      @dirtyLeft = 0;
      @dirtyTop = 0;
      @dirtyRight = Particles.CANVAS_WIDTH;
      @dirtyBottom = Particles.CANVAS_HEIGHT;
      @windVelocity = 0.01;
      @count = 0;
      @render = @render.bind(this);
      @onload = @onload.bind(this);
      @onbackgroundload = @onbackgroundload.bind(this);
      @image = new Image();  
      @image.onload = @onload;
      @image.src = properties.image || 'img/puffBlack.png';
      if (@canvas.getContext) {
        @context = @canvas.getContext('2d');
      }
      if(properties.background) {
        @background = new Image();  
        @background.onload = @onbackgroundload;
        @background.src = properties.background;
        document.body.appendChild(@background);
      }
    }
    onbackgroundload() {
        Particles.CANVAS_WIDTH = @background.width;
        Particles.CANVAS_HEIGHT = @background.height;
        @canvas.width = @background.width;
        @canvas.height = @background.height;
        // get absolute position of background image
        var xImage = @background.offsetLeft;
        var yImage = @background.offsetTop;
        var elem = @background.offsetParent;
        while (elem) {
          xImage += elem.offsetLeft;
          yImage += elem.offsetTop;
          elem = elem.offsetParent;
        }
        // position canvas on top of background
        @canvas.style.position = 'absolute';
        @canvas.style.left = xImage + "px";
        @canvas.style.top = yImage + "px";
        @smokeRight = ParticleEmitter({xScale:0.9,yScale:0.531,particles:20,image:@image,alpha:1.0,windVelocity:@windVelocity});
        @smokeLeft = ParticleEmitter({xScale:0.322,yScale:0.453,particles:30,image:@image,alpha:0.3,windVelocity:@windVelocity});
        requestAnimationFrame(@render);
    }
    onload() {
    }
    render() {  
      // time in milliseconds
      var timeElapsed = new Date().getTime() - @lastRender;
      @lastRender = new Date().getTime();
      @context.clearRect(@dirtyLeft, @dirtyTop, @dirtyRight-@dirtyLeft, @dirtyBottom-@dirtyTop);
      @dirtyLeft = 1000;
      @dirtyTop = 1000;
      @dirtyRight = 0;
      @dirtyBottom = 0;
      @smokeRight.update(timeElapsed,@windVelocity);
      @smokeRight.render(@context);
      @smokeLeft.update(timeElapsed,@windVelocity);
      @smokeLeft.render(@context);
      @windVelocity += (Math.random()-0.5)*0.002;
      if (@windVelocity > 0.015) {
        @windVelocity = 0.015;
      }
      if (@windVelocity < 0.0) {
        @windVelocity = 0.0;
      }
      requestAnimationFrame(@render);  
    }
    static CANVAS_WIDTH = 960;
    static CANVAS_HEIGHT = 640;
  };
}
