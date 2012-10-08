module effects {
  module log from 'log';
  module monads from 'monads';
  export class Particle {
    constructor(properties={}) {
      private active, angle, color, dx, dy, elapsedCounter, life, oldX, oldY, totalLife, turnCounter, turnTime, x, y;
      @active = false;
      @angle = 0;
      @color = 0;
      @dx = 0;
      @dy = 0;
      @elapsedCounter = 0;
      @life = 0;
      @oldX = 0;
      @oldY = 0;
      @totalLife = 0;
      @turnCounter = 0;
      @turnTime = 1;
      @x = 0;
      @y = 0;
    }
  };
  export class Effect extends Particle {
    constructor(properties={}) {
      private attenuationType,attenuationStart,attenuationSpeed,backgroundColor,clearColor,clearFree,clearTouch,colorifyType,fingerSize,globalAlphaFree,globalAlphaTouch,globalCompositeOperationClear,globalCompositeOperationFree,globalCompositeOperationTouch,gravity,gravityEnabled,images,lifeMin,lifeMultiplierFree,lifeRange,lineWidth,palette,particleSize,particleType,radialDistributionType,randomX,randomY,spawnRate,spawnThreshold,speedX,speedY,spriteOffsetX,spriteOffsetY,spriteRotation,spriteRotationSpeed,timedTurns;
      @generateImageHandler = @generateImageHandler.bind(this);
      Particle.call(this);
    }
    parseColor(colorString) {
      var r, g, b, a;
      r = g = b = a = 1;
      var matchRGBA = Effect.reRGBA.exec(colorString);
      if (matchRGBA) {
        r = parseInt(matchRGBA[1]) / 255;
        g = parseInt(matchRGBA[2]) / 255;
        b = parseInt(matchRGBA[3]) / 255;
        a = parseFloat(matchRGBA[4]);
      } else {
        var matchRGB = Effect.reRGB.exec( colorString );
        if (matchRGB) {
          r = parseInt( matchRGB[ 1 ] ) / 255;
          g = parseInt( matchRGB[ 2 ] ) / 255;
          b = parseInt( matchRGB[ 3 ] ) / 255;
        }
      }
      return { "r": r, "g": g, "b": b, "a": a };
    }
    prepareSprites() {
      if(!@constructor.prototype.sprites && @images.length > 0) {
        @constructor.prototype.sprites = [];
        var mask = @colorifyMask;
        for (var j = 0; j < @palette.length; j++) {
          var sprite = new Image();
          sprite.initialized = false;
          @constructor.prototype.sprites[j] = sprite;
        }
        if(@colorifyType === Effect.PATTERN.MASK && mask !== undefined) {
          var maskImage = new Image();
          maskImage.onload = @generateGenerator(maskImage);
          maskImage.src = mask;
        } else {
          @generateSprites();
        }
      }
    }
    xor(a, b) {
      return ( a && !b ) || ( !a && b );
    }
    mix(a, b, r) {
      return a + r * ( b - a );
    }
    colorifyPattern(pattern, x, y, width, height) {
      if (pattern === Effect.PATTERN.RANDOM)  {
        return Math.random() > 0.5;
      } else if (pattern === Effect.PATTERN.HALF) {
        return x > width * 0.5;
      } else if (pattern === Effect.PATTERN.CHECKER) {
        return @xor( x > width * 0.5, y > height * 0.5 );
      } else if (pattern === Effect.PATTERN.GRID) {
        return ( x % 7 > 3 ) || ( y % 7 > 3 );
      } else if (pattern === Effect.PATTERN.ANTIGRID) {
        return ! ( ( x % 7 > 3 ) || ( y % 7 > 3 ) );
      } else if (pattern === Effect.PATTERN.STRIPES) {
        return ( x % 7 > 3 );
      }
      return true;
    }
    colorify(ctx, width, height, colorString, colorPattern, ctxMask) {
      var color = @parseColor(colorString);
      var r = color.r;
      var g = color.g;
      var b = color.b;
      var a = color.a;
      var imageData = ctx.getImageData(0, 0, width, height);
      var data = imageData.data;
      if(colorPattern === Effect.PATTERN.MASK) {
        var maskData = ctxMask.getImageData(0, 0, width, height);
        var mask = maskData.data;
      }
      for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
          var index = ( y * width + x ) * 4;
          if(colorPattern === Effect.PATTERN.MASK ) {
            var ratio = mask[ index ] / 255;
            var rr = data[ index ];
            var gg = data[ index + 1 ];
            var bb = data[ index + 2 ];
            var aa = data[ index + 3 ];
            data[ index ] = @mix( rr, rr * r, ratio );
            data[ index + 1 ] = @mix( gg, gg * g, ratio );
            data[ index + 2 ] = @mix( bb, bb * b, ratio );
            data[ index + 3 ] = @mix( aa, aa * a, ratio );
          } else if(@colorifyPattern(colorPattern, x, y, width, height)) {
            data[ index ] *= r;
            data[ index + 1 ] *= g;
            data[ index + 2 ] *= b;
            data[ index + 3 ] *= a;
          }
        }
      }
      ctx.putImageData(imageData, 0, 0);
    }
    imageToCanvas(image) {
      var width = image.width;
      var height = image.height;
      var canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      var context = canvas.getContext('2d');
      context.drawImage(image, 0, 0, width, height);
      return canvas;
    }
    generateImageHandler(sourceImage, bakedImage, color, pattern, maskImage, dataKey) {
        var canvas = @imageToCanvas(sourceImage);
        var context = canvas.getContext( '2d' );
        var contextMask;
        if(maskImage) {
          var canvasMask = @imageToCanvas(maskImage);
          contextMask = canvasMask.getContext('2d');
        }
        @colorify(context, canvas.width, canvas.height, color, pattern, contextMask);
        var dataUrl = canvas.toDataURL();
        bakedImage.src = dataUrl;
        bakedImage.initialized = true;
    }
    generateSprites(maskImage) {
      for(var j = 0; j < @palette.length; j++) {
        var bakedImage = @constructor.prototype.sprites[j];
        var index = j % @images.length;
        var url = @images[index];
        var color = @palette[j];
        var dataKey = url + "_" + color + "_" + @colorifyType;
        var sourceImage = new Image();
        var pattern = @colorifyType;
        sourceImage.onload = @generateImageHandler.curry(sourceImage,bakedImage,color,pattern,maskImage,dataKey);
        sourceImage.src = url;
      }
    }
    computeGravity() {
      // spherical => cartesian
      var dx = OPT_GRAVITY * Math.sin( GAMMA_RAD ) * Math.sin( BETA_RAD );
      var dy = OPT_GRAVITY * Math.cos( GAMMA_RAD ) * Math.sin( BETA_RAD );
      var dz = OPT_GRAVITY * Math.cos( BETA_RAD );
      if ( BETA_RAD < 0 ) {
        dy *= -1;
      }
      if ( ORIENTATION > 0 ) {
        var tmp = dy;
        dy = dx;
        dx = -tmp;
      }
      if ( ORIENTATION < 0 ) {
        var tmp = dy;
        dy = -dx;
        dx = tmp;
      }
      GRAVITY_X = dx;
      GRAVITY_Y = dy;
    }
    render() {
    }
    update() {
    }
    static ATTENUATION = {NONE:0,GROW:1,SHRINK:2,SIN:3}
    static DISTRIBUTION = {FULL:0,CROSS:1,LINE:2,STAR:3,TRAIL:4,ORBIT:5}
    static EPSILON = 0.01
    static PARTICLE = {CIRCLE:0,DISC:1,LINE:2,SPRITE:3,SPRITE_MULTI:4,SPRITE_TIME:5}
    static PATTERN = {SOLID:0,RANDOM:1,HALF:2,STRIPES:3,GRID:4,ANTIGRID:5,CHECKER:6,MASK:7}
    static PI2 = Math.PI * 2
    static PIHALF = Math.PI * 0.5
    static reRGB = /rgb\( *(\d+), *(\d+), *(\d+) *\)/
    static reRGBA = /rgba\( *(\d+), *(\d+), *(\d+), *(\d?\.?\d+) *\)/
  };
  export class Fir extends Effect {
    constructor(properties={x:0,y:0,color:0}) {
      Effect.call(this);
      @attenuationType = Effect.ATTENUATION.NONE;
      @backgroundColor = "rgb(0,0,0)";
      @clearColor = "rgb(0,0,0)";
      @clearFree = true;
      @clearTouch = false;
      @colorifyType = Effect.PATTERN.SOLID;
      @fingerSize = 2;
      @globalAlphaFree = 1.0;
      @globalAlphaTouch = 0.75;
      @globalCompositeOperationClear = "source-over";
      @globalCompositeOperationFree = "source-over";
      @globalCompositeOperationTouch = "lighter";
      @gravity = 0;
      @gravityEnabled = false;
      @images = [];
      @lifeMin = 0.15;
      @lifeMultiplierFree = 5;
      @lifeRange = 0.1;
      @lineWidth = 2;
      @palette = [
        "rgba( 255, 85, 0, 0.75 )",
        "rgba( 55, 255, 0, 0.35 )",
        "rgba( 255, 150, 0, 0.75 )",
        "rgba( 0, 200, 255, 0.5 )",
        "rgba( 0, 50, 255, 0.5 )",
        "rgba( 255, 0, 255, 0.5 )",
        "rgba( 255, 125, 0, 0.5 )",
        "rgba( 0, 125, 255, 0.5 )",
        "rgba( 255, 0, 125, 0.5 )",
        "rgba( 255, 125, 125, 0.5 )"
      ];
      @particleSize = 4;
      @particleType = Effect.PARTICLE.LINE;
      @radialDistributionType = Effect.DISTRIBUTION.TRAIL;
      @randomX = 50;
      @randomY = 50;
      @spawnRate = 6;
      @spawnThreshold = 0;
      @speedX = 150;
      @speedY = 150;
      @spriteOffsetX = 0;
      @spriteOffsetY = 0;
      @spriteRotation = false;
      @spriteRotationSpeed = 0;
      @timedTurns = false;
      @color = properties.color;
      @angle = Math.PI;
      @x = properties.x + @fingerSize * Math.sin(@angle);
      @y = properties.y + @fingerSize * Math.cos(@angle);
      @oldX = @x;
      @oldY = @y;
      @dx = @speedX * Math.sin(@angle);
      @dy = @speedY * Math.cos(@angle);
    }
    render(ctx) {
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = 1;
      ctx.lineWidth = @lineWidth;
      ctx.strokeStyle = @palette[@color];
      ctx.beginPath();
      ctx.moveTo(@oldX, @oldY);
      ctx.lineTo(@x, @y);
      ctx.stroke();
    }
    update(props) {
      @life = @lifeMin + @lifeRange * Math.random();
      @totalLife = @life;
      if(Math.abs(props.dx) < Effect.EPSILON && Math.abs(props.dy) < Effect.EPSILON) {
        @angle = Math.random() * Effect.PI2;
      } else {
        @angle = Math.atan2(props.dx, props.dy) + (0.5 - Math.random()) * Effect.PIHALF * 2;
      }
      @x = props.x + @fingerSize * Math.sin(@angle);
      @y = props.y + @fingerSize * Math.cos(@angle);
      @oldX = @x;
      @oldY = @y;
      @dx = @speedX * Math.sin(@angle);
      @dy = @speedY * Math.cos(@angle);
      @color = props.color;
      @active = true;
    }
  };
  export class Steam extends Effect {
    constructor(properties={x:0,y:0,color:0}) {
      Effect.call(this);
      @attenuationType = Effect.ATTENUATION.GROW;
      @attenuationStart = 1.5;
      @attenuationSpeed = 1;
      @backgroundColor = "rgb(0,0,0)";
      @clearColor = "rgba(0,0,0,1)";
      @clearFree = true;
      @clearTouch = true;
      @colorifyType = Effect.PATTERN.SOLID;
      @fingerSize = 3;
      @globalAlphaFree = 0.1;
      @globalAlphaTouch = 0.1;
      @globalCompositeOperationClear = "source-over";
      @globalCompositeOperationFree = "source-over";
      @globalCompositeOperationTouch = "lighter";
      @gravity = 0;
      @gravityEnabled = false;
      @images = ["/particle/img/snowflake7_alpha.png"];
      @lifeMin = 1;
      @lifeMultiplierFree = 7;
      @lifeRange = 3;
      @lineWidth = 0;
      @palette = [
        "rgba( 255, 255, 255, 0.15 )",
        "rgba( 80, 155, 255, 0.15 )",
        "rgba( 255, 175, 125, 0.15 )",
        "rgba( 255, 100, 100, 0.15 )",
        "rgba( 180, 180, 255, 0.15 )",
        "rgba( 255, 0, 255, 0.15 )",
        "rgba( 255, 125, 0, 0.15 )",
        "rgba( 0, 125, 255, 0.15 )",
        "rgba( 255, 0, 125, 0.15 )",
        "rgba( 255, 125, 125, 0.15 )"
      ];
      @particleSize = 3;
      @particleType = Effect.PARTICLE.SPRITE;
      @radialDistributionType = Effect.DISTRIBUTION.FULL;
      @randomX = 140;
      @randomY = 140;
      @spawnRate = 1;
      @spawnThreshold = 0;
      @speedX = 80;
      @speedY = 80;
      @spriteOffsetX = 0;
      @spriteOffsetY = 0;
      @spriteRotation = true;
      @spriteRotationSpeed = 0.5;
      @timedTurns = true;
      @color = properties.color;
      @angle = Math.PI;
      @x = properties.x + @fingerSize * Math.sin(@angle);
      @y = properties.y + @fingerSize * Math.cos(@angle);
      @oldX = @x;
      @oldY = @y;
      @dx = @speedX * Math.sin(@angle);
      @dy = @speedY * Math.cos(@angle);
      @prepareSprites();
    }
    render(ctx) {
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = @globalAlphaTouch;
      ctx.lineWidth = @lineWidth;
      var lifeRatio = 1;
      lifeRatio = 1 - @life / @totalLife;
      lifeRatio = @attenuationStart + @attenuationSpeed * lifeRatio;
      var sprite = @sprites[@color];
      if(!sprite.initialized) {
        return;
      }
      var attenuatedWidth = Math.round(lifeRatio * sprite.width);
      var attenuatedHeight = Math.round(lifeRatio * sprite.height);
      if(attenuatedWidth < 1 || attenuatedHeight < 1) {
        @life = 0;
        return;
      }
      var tiny = false;
      if (attenuatedWidth < 3 || attenuatedHeight < 3) {
        tiny = true;
      }
      var x = -0.5 * attenuatedWidth + @spriteOffsetX;
      var y = -0.5 * attenuatedHeight + @spriteOffsetY;
      if (@spriteRotation && !tiny ) {
        var rotation = @spriteRotationSpeed * @elapsedCounter;
        ctx.save();
        ctx.translate(@x, @y);
        ctx.rotate(rotation);
      } else {
        x += @x;
        y += @y;
      }
      if(@attenuationType) {
        ctx.drawImage(sprite, x, y, attenuatedWidth, attenuatedHeight);
      } else {
        ctx.drawImage(sprite, x, y);
      }
      if (@spriteRotation && !tiny) {
        ctx.restore();
      }
    }
    update(props) {
      @life = @lifeMin + @lifeRange * Math.random();
      @totalLife = @life;
      @angle = Math.random() * Effect.PI2;
      var nx = @fingerSize * Math.sin(@angle);
      var ny = @fingerSize * Math.cos(@angle);
      @x = props.x + nx;
      @y = props.y + ny;
      @oldX = @x;
      @oldY = @y;
      @dx = @speedX * nx / @fingerSize;
      @dy = @speedY * ny / @fingerSize;
      @color = props.color;
      @active = true;
    }
  };
  export class Galaxy extends Effect {
    constructor(properties={x:0,y:0,color:0}) {
      Effect.call(this);
      @attenuationType = Effect.ATTENUATION.SHRINK;
      @attenuationStart = 0.05;
      @attenuationSpeed = 1.27;
//      @backgroundColor = "rgb(0,0,0)";
      @backgroundColor = "white";
      @clearColor = "rgba(0,0,0,1)";
      @clearFree = true;
      @clearTouch = true;
      @colorifyType = Effect.PATTERN.SOLID;
      @fingerSize = 5;
      @globalAlphaFree = 1;
      @globalAlphaTouch = 1;
      @globalCompositeOperationClear = "source-over";
      @globalCompositeOperationFree = "source-over";
      @globalCompositeOperationTouch = "lighter";
      @gravity = 0;
      @gravityEnabled = false;
      @images = ["/particle/img/spikey.png"];
      @lifeMin = 1;
      @lifeMultiplierFree = 5;
      @lifeRange = 2;
      @lineWidth = 0;
      @palette = [
        "rgb( 255, 125, 0 )",
        "rgb( 0, 125, 255 )",
        "rgba( 255, 25, 0, 0.75 )",
        "rgba( 0, 50, 255, 0.75 )",
        "rgba( 200, 105, 255, 0.75 )",
        "rgba( 255, 0, 255, 0.75 )",
        "rgba( 255, 125, 0, 0.75 )",
        "rgba( 0, 125, 255, 0.75 )",
        "rgba( 255, 0, 125, 0.75 )",
        "rgba( 255, 125, 125, 0.75 )"
      ];
      @particleSize = 3;
      @particleType = Effect.PARTICLE.SPRITE;
      @radialDistributionType = Effect.DISTRIBUTION.FULL;
      @randomX = 60;
      @randomY = 60;
      @spawnRate = 2;
      @spawnThreshold = 0;
      @speedX = 42;
      @speedY = 42;
      @spriteOffsetX = 0;
      @spriteOffsetY = 0;
      @spriteRotation = true;
      @spriteRotationSpeed = 5;
      @timedTurns = false;
      @color = properties.color;
      @angle = Math.random() * Effect.PI2;
      @x = properties.x + @fingerSize * Math.sin(@angle);
      @y = properties.y + @fingerSize * Math.cos(@angle);
      @oldX = @x;
      @oldY = @y;
      @dx = @speedX * Math.sin(@angle);
      @dy = @speedY * Math.cos(@angle);
      @prepareSprites();
    }
    render(ctx) {
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = 1;
      ctx.lineWidth = @lineWidth;
      var lifeRatio = 1;
      lifeRatio = @life / @totalLife;
      lifeRatio = @attenuationStart + @attenuationSpeed * (lifeRatio*lifeRatio*lifeRatio*lifeRatio);
      var sprite = @sprites[@color];
      if(!sprite.initialized) {
        return;
      }
      var attenuatedWidth = Math.round(lifeRatio * sprite.width);
      var attenuatedHeight = Math.round(lifeRatio * sprite.height);
      if(attenuatedWidth < 1 || attenuatedHeight < 1) {
        @life = 0;
        return;
      }
      var tiny = false;
      if (attenuatedWidth < 3 || attenuatedHeight < 3) {
        tiny = true;
      }
      var x = -0.5 * attenuatedWidth + @spriteOffsetX;
      var y = -0.5 * attenuatedHeight + @spriteOffsetY;
      if (@spriteRotation && !tiny ) {
        var rotation = @spriteRotationSpeed * @elapsedCounter;
        ctx.save();
        ctx.translate(@x, @y);
        ctx.rotate(rotation);
      } else {
        x += @x;
        y += @y;
      }
      if(@attenuationType) {
        ctx.drawImage(sprite, x, y, attenuatedWidth, attenuatedHeight);
      } else {
        ctx.drawImage(sprite, x, y);
      }
      if (@spriteRotation && !tiny) {
        ctx.restore();
      }
    }
    update(props) {
      @life = @lifeMin + @lifeRange * Math.random();
      @totalLife = @life;
      @angle = Math.random() * Effect.PI2;
      var nx = @fingerSize * Math.sin(@angle);
      var ny = @fingerSize * Math.cos(@angle);
      @x = props.x + nx;
      @y = props.y + ny;
      @oldX = @x;
      @oldY = @y;
      @dx = @speedX * nx / @fingerSize;
      @dy = @speedY * ny / @fingerSize;
      @color = props.color;
      @active = true;
    }
  };
  export class Generator {
    constructor(properties={}) {
      private clear, CTX, FREE_INDICES, FREE_INDICES_TOP, LIFE_MULTIPLIER, OLD_TIME, OLD_TOUCHES, PARTICLES, STATE, TOUCHES, UPDATE_STARTED;
      @update = @update.bind(this);
      @reset = @reset.bind(this);
      @onmove = @onmove.bind(this);
      @clear = false;
      @UPDATE_STARTED = false;
      @LIFE_MULTIPLIER = 1;
      @FREE_INDICES = [];
      @FREE_INDICES_TOP = -1;
      @PARTICLES = [];
      @OLD_TOUCHES = [];
      @OLD_TIME = Date.now();
      @CTX = monads.DOMable({tagName:'canvas'}).on('load').attributes({id:'canvas',width:window.innerWidth,height:window.innerHeight}).style({left:"0px",top:"0px",width:window.innerWidth+"px",height:window.innerHeight+'px',position:'absolute','background-color':'transparent'}).insert(document.body).on(['touchmove'],@onmove).on(['touchend'],@reset).element().getContext('2d');
      @reset();
      requestAnimationFrame(@update);
    }
    reset() {
      for (var i = 0; i < Generator.MAX_PARTICLES; i++) {
        @PARTICLES[i] = Galaxy();
        @TOUCHES = [];
        @FREE_INDICES[i] = i;
        @FREE_INDICES_TOP = i;
      }
      @clear = @PARTICLES[0].clearTouch;
    }
    onmove(event) {
      event.preventDefault();
      @TOUCHES = event.touches;
    }
    render() {
      if(@clear) {
        @CTX.globalCompositeOperation = "source-over";
        @CTX.fillStyle = "rgba(0,0,0,1)";
        @CTX.fillRect( 0, 0, window.innerWidth, window.innerHeight);
      }
      for (var i = 0; i < Generator.MAX_PARTICLES; i++) {
        var particle = @PARTICLES[i];
        if(particle.active && particle.life > 0 && particle.x > 0 && particle.y > 0 && particle.x < window.innerWidth && particle.y < window.innerHeight) {
          particle.render(@CTX);
        }
      }
    }
    update() {
      if(@UPDATE_STARTED) {
        return;
      }
      @UPDATE_STARTED = true;
      var time = Date.now();
      var delta = (time - @OLD_TIME) * 0.001;
      @OLD_TIME = time;
      var particle;
      var i, il, index;
      var touch, px, py;
      var oldTouch, oldX, oldY;
      var dx, dy;
      for (i = 0, il = @TOUCHES.length; i < il; i++) {
        touch = @TOUCHES[i];
        index = i;
        px = touch.pageX;
        py = touch.pageY;
        if(@OLD_TOUCHES[i] !== undefined) {
          oldTouch = @OLD_TOUCHES[i];
          oldX = oldTouch.pageX;
          oldY = oldTouch.pageY;
          dx = px - oldX;
          dy = py - oldY;
        } else {
          @OLD_TOUCHES[i] = {pageX:0,pageY:0};
          dx = 0;
          dy = 0;
        }
        @OLD_TOUCHES[i].pageX = px;
        @OLD_TOUCHES[i].pageY = py;
        if (@FREE_INDICES_TOP >= 0) {
          particle = @PARTICLES[@FREE_INDICES[@FREE_INDICES_TOP]];
          for (var j = 0; j < particle.spawnRate; j++) {
            @FREE_INDICES_TOP -= 1;
            particle.update({x:px,y:py,dx:dx,dy:dy,color:index});
          }
        }
      }
      for (i = 0; i < Generator.MAX_PARTICLES; i++) {
        particle = @PARTICLES[i];
        if (particle.active) {
          particle.life -= @LIFE_MULTIPLIER * delta;
          particle.turnCounter += delta;
          particle.elapsedCounter += delta;
          particle.oldX = particle.x;
          particle.oldY = particle.y;
          if(particle.timedTurns) {
            if(particle.turnCounter > particle.turnTime) {
              var rnd = Math.random();
              var angle = particle.angle + Effect.PIHALF * ( rnd > 0.333 ? ( rnd > 0.666 ? -1 : 0 ) : 1 );
              var nx = particle.fingerSize * Math.sin( angle );
              var ny = particle.fingerSize * Math.cos( angle );
              particle.dx = particle.speedX * nx / particle.fingerSize;
              particle.dy = particle.sppedY * ny / particle.fingerSize;
              particle.angle = angle;
              particle.turnCounter = 0;
              particle.turnTime = particle.life * 0.25 + 0.125;
            }
          }
          particle.x += delta * (particle.dx + (0.5 - Math.random()) * particle.randomX);
          particle.y += delta * (particle.dy + (0.5 - Math.random()) * particle.randomY);
          if (particle.life <= 0 ){
            @FREE_INDICES_TOP += 1;
            @FREE_INDICES[@FREE_INDICES_TOP] = i;
            particle.active = false;
          }
        }
      }
      @render();
      @UPDATE_STARTED = false;
      requestAnimationFrame(@update);
    }
    static MAX_PARTICLES = 500
    static T_STATE = {TOUCH:0,FREE:1}
  };
}
