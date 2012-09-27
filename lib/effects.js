(function() {
  var nm = module.Module('effects');
  (function(require, exports, moduleId) {
    var log = require('log');
    var monads = require('monads');
    var Particle = (function() {
      function Particle() {
        function privateData() {
          this.active = null;
          this.angle = null;
          this.color = null;
          this.dx = null;
          this.dy = null;
          this.elapsedCounter = null;
          this.life = null;
          this.oldX = null;
          this.oldY = null;
          this.totalLife = null;
          this.turnCounter = null;
          this.turnTime = null;
          this.x = null;
          this.y = null;
        }
        var p_vars = new privateData();
        var active = p_vars.active;
        Object.getOwnPropertyDescriptor(this,'active') || Object.defineProperty(this,'active', {get: function(){return active;},set: function(e){active=e;}});
        var angle = p_vars.angle;
        Object.getOwnPropertyDescriptor(this,'angle') || Object.defineProperty(this,'angle', {get: function(){return angle;},set: function(e){angle=e;}});
        var color = p_vars.color;
        Object.getOwnPropertyDescriptor(this,'color') || Object.defineProperty(this,'color', {get: function(){return color;},set: function(e){color=e;}});
        var dx = p_vars.dx;
        Object.getOwnPropertyDescriptor(this,'dx') || Object.defineProperty(this,'dx', {get: function(){return dx;},set: function(e){dx=e;}});
        var dy = p_vars.dy;
        Object.getOwnPropertyDescriptor(this,'dy') || Object.defineProperty(this,'dy', {get: function(){return dy;},set: function(e){dy=e;}});
        var elapsedCounter = p_vars.elapsedCounter;
        Object.getOwnPropertyDescriptor(this,'elapsedCounter') || Object.defineProperty(this,'elapsedCounter', {get: function(){return elapsedCounter;},set: function(e){elapsedCounter=e;}});
        var life = p_vars.life;
        Object.getOwnPropertyDescriptor(this,'life') || Object.defineProperty(this,'life', {get: function(){return life;},set: function(e){life=e;}});
        var oldX = p_vars.oldX;
        Object.getOwnPropertyDescriptor(this,'oldX') || Object.defineProperty(this,'oldX', {get: function(){return oldX;},set: function(e){oldX=e;}});
        var oldY = p_vars.oldY;
        Object.getOwnPropertyDescriptor(this,'oldY') || Object.defineProperty(this,'oldY', {get: function(){return oldY;},set: function(e){oldY=e;}});
        var totalLife = p_vars.totalLife;
        Object.getOwnPropertyDescriptor(this,'totalLife') || Object.defineProperty(this,'totalLife', {get: function(){return totalLife;},set: function(e){totalLife=e;}});
        var turnCounter = p_vars.turnCounter;
        Object.getOwnPropertyDescriptor(this,'turnCounter') || Object.defineProperty(this,'turnCounter', {get: function(){return turnCounter;},set: function(e){turnCounter=e;}});
        var turnTime = p_vars.turnTime;
        Object.getOwnPropertyDescriptor(this,'turnTime') || Object.defineProperty(this,'turnTime', {get: function(){return turnTime;},set: function(e){turnTime=e;}});
        var x = p_vars.x;
        Object.getOwnPropertyDescriptor(this,'x') || Object.defineProperty(this,'x', {get: function(){return x;},set: function(e){x=e;}});
        var y = p_vars.y;
        Object.getOwnPropertyDescriptor(this,'y') || Object.defineProperty(this,'y', {get: function(){return y;},set: function(e){y=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function (_properties) {
          var properties = _properties || {};
          this.active=false;
          this.angle=0;
          this.color=0;
          this.dx=0;
          this.dy=0;
          this.elapsedCounter=0;
          this.life=0;
          this.oldX=0;
          this.oldY=0;
          this.totalLife=0;
          this.turnCounter=0;
          this.turnTime=1;
          this.x=0;
          this.y=0;
        }
        return ctor.apply(this,args) || this;
      }
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.constructor = Particle;
        return new Particle(args && args.length && args[0]);
      };
    })();
    exports.Particle = Particle;
    var Effect = (function() {
      Effect.prototype = exports.Particle();
      Effect.prototype.constructor = Effect;
      var Particle = exports.Particle.constructor;
      function Effect() {
        function privateData() {
          this.attenuationType = null;
          this.attenuationStart = null;
          this.attenuationSpeed = null;
          this.backgroundColor = null;
          this.clearColor = null;
          this.clearFree = null;
          this.clearTouch = null;
          this.colorifyType = null;
          this.fingerSize = null;
          this.globalAlphaFree = null;
          this.globalAlphaTouch = null;
          this.globalCompositeOperationClear = null;
          this.globalCompositeOperationFree = null;
          this.globalCompositeOperationTouch = null;
          this.gravity = null;
          this.gravityEnabled = null;
          this.images = null;
          this.lifeMin = null;
          this.lifeMultiplierFree = null;
          this.lifeRange = null;
          this.lineWidth = null;
          this.palette = null;
          this.particleSize = null;
          this.particleType = null;
          this.radialDistributionType = null;
          this.randomX = null;
          this.randomY = null;
          this.spawnRate = null;
          this.spawnThreshold = null;
          this.speedX = null;
          this.speedY = null;
          this.spriteOffsetX = null;
          this.spriteOffsetY = null;
          this.spriteRotation = null;
          this.spriteRotationSpeed = null;
          this.timedTurns = null;
        }
        var p_vars = new privateData();
        var attenuationType = p_vars.attenuationType;
        Object.getOwnPropertyDescriptor(this,'attenuationType') || Object.defineProperty(this,'attenuationType', {get: function(){return attenuationType;},set: function(e){attenuationType=e;}});
        var attenuationStart = p_vars.attenuationStart;
        Object.getOwnPropertyDescriptor(this,'attenuationStart') || Object.defineProperty(this,'attenuationStart', {get: function(){return attenuationStart;},set: function(e){attenuationStart=e;}});
        var attenuationSpeed = p_vars.attenuationSpeed;
        Object.getOwnPropertyDescriptor(this,'attenuationSpeed') || Object.defineProperty(this,'attenuationSpeed', {get: function(){return attenuationSpeed;},set: function(e){attenuationSpeed=e;}});
        var backgroundColor = p_vars.backgroundColor;
        Object.getOwnPropertyDescriptor(this,'backgroundColor') || Object.defineProperty(this,'backgroundColor', {get: function(){return backgroundColor;},set: function(e){backgroundColor=e;}});
        var clearColor = p_vars.clearColor;
        Object.getOwnPropertyDescriptor(this,'clearColor') || Object.defineProperty(this,'clearColor', {get: function(){return clearColor;},set: function(e){clearColor=e;}});
        var clearFree = p_vars.clearFree;
        Object.getOwnPropertyDescriptor(this,'clearFree') || Object.defineProperty(this,'clearFree', {get: function(){return clearFree;},set: function(e){clearFree=e;}});
        var clearTouch = p_vars.clearTouch;
        Object.getOwnPropertyDescriptor(this,'clearTouch') || Object.defineProperty(this,'clearTouch', {get: function(){return clearTouch;},set: function(e){clearTouch=e;}});
        var colorifyType = p_vars.colorifyType;
        Object.getOwnPropertyDescriptor(this,'colorifyType') || Object.defineProperty(this,'colorifyType', {get: function(){return colorifyType;},set: function(e){colorifyType=e;}});
        var fingerSize = p_vars.fingerSize;
        Object.getOwnPropertyDescriptor(this,'fingerSize') || Object.defineProperty(this,'fingerSize', {get: function(){return fingerSize;},set: function(e){fingerSize=e;}});
        var globalAlphaFree = p_vars.globalAlphaFree;
        Object.getOwnPropertyDescriptor(this,'globalAlphaFree') || Object.defineProperty(this,'globalAlphaFree', {get: function(){return globalAlphaFree;},set: function(e){globalAlphaFree=e;}});
        var globalAlphaTouch = p_vars.globalAlphaTouch;
        Object.getOwnPropertyDescriptor(this,'globalAlphaTouch') || Object.defineProperty(this,'globalAlphaTouch', {get: function(){return globalAlphaTouch;},set: function(e){globalAlphaTouch=e;}});
        var globalCompositeOperationClear = p_vars.globalCompositeOperationClear;
        Object.getOwnPropertyDescriptor(this,'globalCompositeOperationClear') || Object.defineProperty(this,'globalCompositeOperationClear', {get: function(){return globalCompositeOperationClear;},set: function(e){globalCompositeOperationClear=e;}});
        var globalCompositeOperationFree = p_vars.globalCompositeOperationFree;
        Object.getOwnPropertyDescriptor(this,'globalCompositeOperationFree') || Object.defineProperty(this,'globalCompositeOperationFree', {get: function(){return globalCompositeOperationFree;},set: function(e){globalCompositeOperationFree=e;}});
        var globalCompositeOperationTouch = p_vars.globalCompositeOperationTouch;
        Object.getOwnPropertyDescriptor(this,'globalCompositeOperationTouch') || Object.defineProperty(this,'globalCompositeOperationTouch', {get: function(){return globalCompositeOperationTouch;},set: function(e){globalCompositeOperationTouch=e;}});
        var gravity = p_vars.gravity;
        Object.getOwnPropertyDescriptor(this,'gravity') || Object.defineProperty(this,'gravity', {get: function(){return gravity;},set: function(e){gravity=e;}});
        var gravityEnabled = p_vars.gravityEnabled;
        Object.getOwnPropertyDescriptor(this,'gravityEnabled') || Object.defineProperty(this,'gravityEnabled', {get: function(){return gravityEnabled;},set: function(e){gravityEnabled=e;}});
        var images = p_vars.images;
        Object.getOwnPropertyDescriptor(this,'images') || Object.defineProperty(this,'images', {get: function(){return images;},set: function(e){images=e;}});
        var lifeMin = p_vars.lifeMin;
        Object.getOwnPropertyDescriptor(this,'lifeMin') || Object.defineProperty(this,'lifeMin', {get: function(){return lifeMin;},set: function(e){lifeMin=e;}});
        var lifeMultiplierFree = p_vars.lifeMultiplierFree;
        Object.getOwnPropertyDescriptor(this,'lifeMultiplierFree') || Object.defineProperty(this,'lifeMultiplierFree', {get: function(){return lifeMultiplierFree;},set: function(e){lifeMultiplierFree=e;}});
        var lifeRange = p_vars.lifeRange;
        Object.getOwnPropertyDescriptor(this,'lifeRange') || Object.defineProperty(this,'lifeRange', {get: function(){return lifeRange;},set: function(e){lifeRange=e;}});
        var lineWidth = p_vars.lineWidth;
        Object.getOwnPropertyDescriptor(this,'lineWidth') || Object.defineProperty(this,'lineWidth', {get: function(){return lineWidth;},set: function(e){lineWidth=e;}});
        var palette = p_vars.palette;
        Object.getOwnPropertyDescriptor(this,'palette') || Object.defineProperty(this,'palette', {get: function(){return palette;},set: function(e){palette=e;}});
        var particleSize = p_vars.particleSize;
        Object.getOwnPropertyDescriptor(this,'particleSize') || Object.defineProperty(this,'particleSize', {get: function(){return particleSize;},set: function(e){particleSize=e;}});
        var particleType = p_vars.particleType;
        Object.getOwnPropertyDescriptor(this,'particleType') || Object.defineProperty(this,'particleType', {get: function(){return particleType;},set: function(e){particleType=e;}});
        var radialDistributionType = p_vars.radialDistributionType;
        Object.getOwnPropertyDescriptor(this,'radialDistributionType') || Object.defineProperty(this,'radialDistributionType', {get: function(){return radialDistributionType;},set: function(e){radialDistributionType=e;}});
        var randomX = p_vars.randomX;
        Object.getOwnPropertyDescriptor(this,'randomX') || Object.defineProperty(this,'randomX', {get: function(){return randomX;},set: function(e){randomX=e;}});
        var randomY = p_vars.randomY;
        Object.getOwnPropertyDescriptor(this,'randomY') || Object.defineProperty(this,'randomY', {get: function(){return randomY;},set: function(e){randomY=e;}});
        var spawnRate = p_vars.spawnRate;
        Object.getOwnPropertyDescriptor(this,'spawnRate') || Object.defineProperty(this,'spawnRate', {get: function(){return spawnRate;},set: function(e){spawnRate=e;}});
        var spawnThreshold = p_vars.spawnThreshold;
        Object.getOwnPropertyDescriptor(this,'spawnThreshold') || Object.defineProperty(this,'spawnThreshold', {get: function(){return spawnThreshold;},set: function(e){spawnThreshold=e;}});
        var speedX = p_vars.speedX;
        Object.getOwnPropertyDescriptor(this,'speedX') || Object.defineProperty(this,'speedX', {get: function(){return speedX;},set: function(e){speedX=e;}});
        var speedY = p_vars.speedY;
        Object.getOwnPropertyDescriptor(this,'speedY') || Object.defineProperty(this,'speedY', {get: function(){return speedY;},set: function(e){speedY=e;}});
        var spriteOffsetX = p_vars.spriteOffsetX;
        Object.getOwnPropertyDescriptor(this,'spriteOffsetX') || Object.defineProperty(this,'spriteOffsetX', {get: function(){return spriteOffsetX;},set: function(e){spriteOffsetX=e;}});
        var spriteOffsetY = p_vars.spriteOffsetY;
        Object.getOwnPropertyDescriptor(this,'spriteOffsetY') || Object.defineProperty(this,'spriteOffsetY', {get: function(){return spriteOffsetY;},set: function(e){spriteOffsetY=e;}});
        var spriteRotation = p_vars.spriteRotation;
        Object.getOwnPropertyDescriptor(this,'spriteRotation') || Object.defineProperty(this,'spriteRotation', {get: function(){return spriteRotation;},set: function(e){spriteRotation=e;}});
        var spriteRotationSpeed = p_vars.spriteRotationSpeed;
        Object.getOwnPropertyDescriptor(this,'spriteRotationSpeed') || Object.defineProperty(this,'spriteRotationSpeed', {get: function(){return spriteRotationSpeed;},set: function(e){spriteRotationSpeed=e;}});
        var timedTurns = p_vars.timedTurns;
        Object.getOwnPropertyDescriptor(this,'timedTurns') || Object.defineProperty(this,'timedTurns', {get: function(){return timedTurns;},set: function(e){timedTurns=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function (_properties) {
          var properties = _properties || {};
          this.generateImageHandler=this.generateImageHandler.bind(this);
          Particle.call(this);
        }
        return ctor.apply(this,args) || this;
      }
      Effect.prototype['parseColor'] = function(colorString) {
        var r,g,b,a;
        r=g=b=a=1;
        var matchRGBA=Effect.reRGBA.exec(colorString);
        if(matchRGBA) {
          r=parseInt(matchRGBA[1]) / 255;
          g=parseInt(matchRGBA[2]) / 255;
          b=parseInt(matchRGBA[3]) / 255;
          a=parseFloat(matchRGBA[4]);
        } else {
          var matchRGB=Effect.reRGB.exec(colorString);
          if(matchRGB) {
            r=parseInt(matchRGB[1]) / 255;
            g=parseInt(matchRGB[2]) / 255;
            b=parseInt(matchRGB[3]) / 255;
          }
        }
        return {
          "r":r,
          "g":g,
          "b":b,
          "a":a
        };
      };
      Effect.prototype['prepareSprites'] = function() {
        if(!this.constructor.prototype.sprites && this.images.length > 0) {
          this.constructor.prototype.sprites=[];
          var mask=this.colorifyMask;
          for(var j=0;j < this.palette.length;j++) {
            var sprite=new Image();
            sprite.initialized=false;
            this.constructor.prototype.sprites[j]=sprite;
          }
          if(this.colorifyType === Effect.PATTERN.MASK && mask !== undefined) {
            var maskImage=new Image();
            maskImage.onload=this.generateGenerator(maskImage);
            maskImage.src=mask;
          } else {
            this.generateSprites();
          }
        }
      };
      Effect.prototype['xor'] = function(a,b) {
        return (a && !b) || (!a && b);
      };
      Effect.prototype['mix'] = function(a,b,r) {
        return a + r * (b - a);
      };
      Effect.prototype['colorifyPattern'] = function(pattern,x,y,width,height) {
        if(pattern === Effect.PATTERN.RANDOM) {
          return Math.random() > 0.5;
        } else if(pattern === Effect.PATTERN.HALF) {
          return x > width * 0.5;
        } else if(pattern === Effect.PATTERN.CHECKER) {
          return this.xor(x > width * 0.5,y > height * 0.5);
        } else if(pattern === Effect.PATTERN.GRID) {
          return (x % 7 > 3) || (y % 7 > 3);
        } else if(pattern === Effect.PATTERN.ANTIGRID) {
          return !((x % 7 > 3) || (y % 7 > 3));
        } else if(pattern === Effect.PATTERN.STRIPES) {
          return (x % 7 > 3);
        }
        return true;
      };
      Effect.prototype['colorify'] = function(ctx,width,height,colorString,colorPattern,ctxMask) {
        var color=this.parseColor(colorString);
        var r=color.r;
        var g=color.g;
        var b=color.b;
        var a=color.a;
        var imageData=ctx.getImageData(0,0,width,height);
        var data=imageData.data;
        if(colorPattern === Effect.PATTERN.MASK) {
          var maskData=ctxMask.getImageData(0,0,width,height);
          var mask=maskData.data;
        }
        for(var y=0;y < height;y++) {
          for(var x=0;x < width;x++) {
            var index=(y * width + x) * 4;
            if(colorPattern === Effect.PATTERN.MASK) {
              var ratio=mask[index] / 255;
              var rr=data[index];
              var gg=data[index + 1];
              var bb=data[index + 2];
              var aa=data[index + 3];
              data[index]=this.mix(rr,rr * r,ratio);
              data[index + 1]=this.mix(gg,gg * g,ratio);
              data[index + 2]=this.mix(bb,bb * b,ratio);
              data[index + 3]=this.mix(aa,aa * a,ratio);
            } else if(this.colorifyPattern(colorPattern,x,y,width,height)) {
              data[index]*=r;
              data[index + 1]*=g;
              data[index + 2]*=b;
              data[index + 3]*=a;
            }
          }
        }
        ctx.putImageData(imageData,0,0);
      };
      Effect.prototype['imageToCanvas'] = function(image) {
        var width=image.width;
        var height=image.height;
        var canvas=document.createElement('canvas');
        canvas.width=width;
        canvas.height=height;
        var context=canvas.getContext('2d');
        context.drawImage(image,0,0,width,height);
        return canvas;
      };
      Effect.prototype['generateImageHandler'] = function(sourceImage,bakedImage,color,pattern,maskImage,dataKey) {
        var canvas=this.imageToCanvas(sourceImage);
        var context=canvas.getContext('2d');
        var contextMask;
        if(maskImage) {
          var canvasMask=this.imageToCanvas(maskImage);
          contextMask=canvasMask.getContext('2d');
        }
        this.colorify(context,canvas.width,canvas.height,color,pattern,contextMask);
        var dataUrl=canvas.toDataURL();
        bakedImage.src=dataUrl;
        bakedImage.initialized=true;
      };
      Effect.prototype['generateSprites'] = function(maskImage) {
        for(var j=0;j < this.palette.length;j++) {
          var bakedImage=this.constructor.prototype.sprites[j];
          var index=j % this.images.length;
          var url=this.images[index];
          var color=this.palette[j];
          var dataKey=url + "_" + color + "_" + this.colorifyType;
          var sourceImage=new Image();
          var pattern=this.colorifyType;
          sourceImage.onload=this.generateImageHandler.curry(sourceImage,bakedImage,color,pattern,maskImage,dataKey);
          sourceImage.src=url;
        }
      };
      Effect.prototype['computeGravity'] = function() {
        var dx=OPT_GRAVITY * Math.sin(GAMMA_RAD) * Math.sin(BETA_RAD);
        var dy=OPT_GRAVITY * Math.cos(GAMMA_RAD) * Math.sin(BETA_RAD);
        var dz=OPT_GRAVITY * Math.cos(BETA_RAD);
        if(BETA_RAD < 0) {
          dy*=-1;
        }
        if(ORIENTATION > 0) {
          var tmp=dy;
          dy=dx;
          dx=-tmp;
        }
        if(ORIENTATION < 0) {
          var tmp=dy;
          dy=-dx;
          dx=tmp;
        }
        GRAVITY_X=dx;
        GRAVITY_Y=dy;
      };
      Effect.prototype['render'] = function() {
      };
      Effect.prototype['update'] = function() {
      };
      Effect.ATTENUATION = {
        NONE:0,
        GROW:1,
        SHRINK:2,
        SIN:3
      };
      Effect.DISTRIBUTION = {
        FULL:0,
        CROSS:1,
        LINE:2,
        STAR:3,
        TRAIL:4,
        ORBIT:5
      };
      Effect.EPSILON = 0.01;
      Effect.PARTICLE = {
        CIRCLE:0,
        DISC:1,
        LINE:2,
        SPRITE:3,
        SPRITE_MULTI:4,
        SPRITE_TIME:5
      };
      Effect.PATTERN = {
        SOLID:0,
        RANDOM:1,
        HALF:2,
        STRIPES:3,
        GRID:4,
        ANTIGRID:5,
        CHECKER:6,
        MASK:7
      };
      Effect.PI2 = Math.PI * 2;
      Effect.PIHALF = Math.PI * 0.5;
      Effect.reRGB = /rgb\( *(\d+), *(\d+), *(\d+) *\)/;
      Effect.reRGBA = /rgba\( *(\d+), *(\d+), *(\d+), *(\d?\.?\d+) *\)/;
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.ATTENUATION = Effect.ATTENUATION;
        __.DISTRIBUTION = Effect.DISTRIBUTION;
        __.EPSILON = Effect.EPSILON;
        __.PARTICLE = Effect.PARTICLE;
        __.PATTERN = Effect.PATTERN;
        __.PI2 = Effect.PI2;
        __.PIHALF = Effect.PIHALF;
        __.reRGB = Effect.reRGB;
        __.reRGBA = Effect.reRGBA;
        __.constructor = Effect;
        return new Effect(args && args.length && args[0]);
      };
    })();
    exports.Effect = Effect;
    var Fir = (function() {
      Fir.prototype = exports.Effect();
      Fir.prototype.constructor = Fir;
      var Effect = exports.Effect.constructor;
      function Fir() {
        var args = Array.prototype.slice.call(arguments);
        var ctor = function (_properties) {
          var properties = _properties || {
            x:0,
            y:0,
            color:0
          };
          Effect.call(this);
          this.attenuationType=Effect.ATTENUATION.NONE;
          this.backgroundColor="rgb(0,0,0)";
          this.clearColor="rgb(0,0,0)";
          this.clearFree=true;
          this.clearTouch=false;
          this.colorifyType=Effect.PATTERN.SOLID;
          this.fingerSize=2;
          this.globalAlphaFree=1;
          this.globalAlphaTouch=0.75;
          this.globalCompositeOperationClear="source-over";
          this.globalCompositeOperationFree="source-over";
          this.globalCompositeOperationTouch="lighter";
          this.gravity=0;
          this.gravityEnabled=false;
          this.images=[];
          this.lifeMin=0.15;
          this.lifeMultiplierFree=5;
          this.lifeRange=0.1;
          this.lineWidth=2;
          this.palette=["rgba( 255, 85, 0, 0.75 )","rgba( 55, 255, 0, 0.35 )","rgba( 255, 150, 0, 0.75 )","rgba( 0, 200, 255, 0.5 )","rgba( 0, 50, 255, 0.5 )","rgba( 255, 0, 255, 0.5 )","rgba( 255, 125, 0, 0.5 )","rgba( 0, 125, 255, 0.5 )","rgba( 255, 0, 125, 0.5 )","rgba( 255, 125, 125, 0.5 )"];
          this.particleSize=4;
          this.particleType=Effect.PARTICLE.LINE;
          this.radialDistributionType=Effect.DISTRIBUTION.TRAIL;
          this.randomX=50;
          this.randomY=50;
          this.spawnRate=6;
          this.spawnThreshold=0;
          this.speedX=150;
          this.speedY=150;
          this.spriteOffsetX=0;
          this.spriteOffsetY=0;
          this.spriteRotation=false;
          this.spriteRotationSpeed=0;
          this.timedTurns=false;
          this.life=this.lifeMin + this.lifeRange * Math.random();
          this.totalLife=this.life;
          this.color=properties.color;
          this.angle=Math.PI;
          this.x=properties.x + this.fingerSize * Math.sin(this.angle);
          this.y=properties.y + this.fingerSize * Math.cos(this.angle);
          this.oldX=this.x;
          this.oldY=this.y;
          this.dx=this.speedX * Math.sin(this.angle);
          this.dy=this.speedY * Math.cos(this.angle);
        }
        return ctor.apply(this,args) || this;
      }
      Fir.prototype['render'] = function(ctx) {
        ctx.globalCompositeOperation="lighter";
        ctx.globalAlpha=1;
        ctx.lineWidth=this.lineWidth;
        ctx.strokeStyle=this.palette[this.color];
        ctx.beginPath();
        ctx.moveTo(this.oldX,this.oldY);
        ctx.lineTo(this.x,this.y);
        ctx.stroke();
      };
      Fir.prototype['update'] = function(props) {
        this.life=this.lifeMin + this.lifeRange * Math.random();
        this.totalLife=this.life;
        if(Math.abs(props.dx) < Effect.EPSILON && Math.abs(props.dy) < Effect.EPSILON) {
          this.angle=Math.random() * Effect.PI2;
        } else {
          this.angle=Math.atan2(props.dx,props.dy) + (0.5 - Math.random()) * Effect.PIHALF * 2;
        }
        this.x=props.x + this.fingerSize * Math.sin(this.angle);
        this.y=props.y + this.fingerSize * Math.cos(this.angle);
        this.oldX=this.x;
        this.oldY=this.y;
        this.dx=this.speedX * Math.sin(this.angle);
        this.dy=this.speedY * Math.cos(this.angle);
        this.color=props.color;
        this.active=true;
      };
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.constructor = Fir;
        return new Fir(args && args.length && args[0]);
      };
    })();
    exports.Fir = Fir;
    var Galaxy = (function() {
      Galaxy.prototype = exports.Effect();
      Galaxy.prototype.constructor = Galaxy;
      var Effect = exports.Effect.constructor;
      function Galaxy() {
        var args = Array.prototype.slice.call(arguments);
        var ctor = function (_properties) {
          var properties = _properties || {
            x:0,
            y:0,
            color:0
          };
          Effect.call(this);
          this.attenuationType=Effect.ATTENUATION.SHRINK;
          this.attenuationStart=0.05;
          this.attenuationSpeed=1.27;
          this.backgroundColor="rgb(0,0,0)";
          this.clearColor="rgba(0,0,0,1)";
          this.clearFree=true;
          this.clearTouch=true;
          this.colorifyType=Effect.PATTERN.SOLID;
          this.fingerSize=5;
          this.globalAlphaFree=1;
          this.globalAlphaTouch=1;
          this.globalCompositeOperationClear="source-over";
          this.globalCompositeOperationFree="source-over";
          this.globalCompositeOperationTouch="lighter";
          this.gravity=0;
          this.gravityEnabled=false;
          this.images=["img/spikey.png"];
          this.lifeMin=1;
          this.lifeMultiplierFree=5;
          this.lifeRange=2;
          this.lineWidth=0;
          this.palette=["rgb( 255, 125, 0 )","rgb( 0, 125, 255 )","rgba( 255, 25, 0, 0.75 )","rgba( 0, 50, 255, 0.75 )","rgba( 200, 105, 255, 0.75 )","rgba( 255, 0, 255, 0.75 )","rgba( 255, 125, 0, 0.75 )","rgba( 0, 125, 255, 0.75 )","rgba( 255, 0, 125, 0.75 )","rgba( 255, 125, 125, 0.75 )"];
          this.particleSize=3;
          this.particleType=Effect.PARTICLE.SPRITE;
          this.radialDistributionType=Effect.DISTRIBUTION.FULL;
          this.randomX=60;
          this.randomY=60;
          this.spawnRate=2;
          this.spawnThreshold=0;
          this.speedX=42;
          this.speedY=42;
          this.spriteOffsetX=0;
          this.spriteOffsetY=0;
          this.spriteRotation=true;
          this.spriteRotationSpeed=5;
          this.timedTurns=false;
          this.life=this.lifeMin + this.lifeRange * Math.random();
          this.totalLife=this.life;
          this.color=properties.color;
          this.angle=Math.random() * Effect.PI2;
          this.x=properties.x + this.fingerSize * Math.sin(this.angle);
          this.y=properties.y + this.fingerSize * Math.cos(this.angle);
          this.oldX=this.x;
          this.oldY=this.y;
          this.dx=this.speedX * Math.sin(this.angle);
          this.dy=this.speedY * Math.cos(this.angle);
          this.prepareSprites();
        }
        return ctor.apply(this,args) || this;
      }
      Galaxy.prototype['render'] = function(ctx) {
        ctx.globalCompositeOperation="lighter";
        ctx.globalAlpha=1;
        ctx.lineWidth=this.lineWidth;
        var lifeRatio=1;
        lifeRatio=this.life / this.totalLife;
        lifeRatio=this.attenuationStart + this.attenuationSpeed * (lifeRatio * lifeRatio * lifeRatio * lifeRatio);
        var sprite=this.sprites[this.color];
        if(!sprite.initialized) {
          return;
        }
        var attenuatedWidth=Math.round(lifeRatio * sprite.width);
        var attenuatedHeight=Math.round(lifeRatio * sprite.height);
        if(attenuatedWidth < 1 || attenuatedHeight < 1) {
          this.life=0;
          return;
        }
        var tiny=false;
        if(attenuatedWidth < 3 || attenuatedHeight < 3) {
          tiny=true;
        }
        var x=-0.5 * attenuatedWidth + this.spriteOffsetX;
        var y=-0.5 * attenuatedHeight + this.spriteOffsetY;
        if(this.spriteRotation && !tiny) {
          var rotation=this.spriteRotationSpeed * this.elapsedCounter;
          ctx.save();
          ctx.translate(this.x,this.y);
          ctx.rotate(rotation);
        } else {
          x+=this.x;
          y+=this.y;
        }
        if(this.attenuationType) {
          ctx.drawImage(sprite,x,y,attenuatedWidth,attenuatedHeight);
        } else {
          ctx.drawImage(sprite,x,y);
        }
        if(this.spriteRotation && !tiny) {
          ctx.restore();
        }
      };
      Galaxy.prototype['update'] = function(props) {
        this.life=this.lifeMin + this.lifeRange * Math.random();
        this.totalLife=this.life;
        this.angle=Math.random() * Effect.PI2;
        var nx=this.fingerSize * Math.sin(this.angle);
        var ny=this.fingerSize * Math.cos(this.angle);
        this.x=props.x + nx;
        this.y=props.y + ny;
        this.oldX=this.x;
        this.oldY=this.y;
        this.dx=this.speedX * nx / this.fingerSize;
        this.dy=this.speedY * ny / this.fingerSize;
        this.color=props.color;
        this.active=true;
      };
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.constructor = Galaxy;
        return new Galaxy(args && args.length && args[0]);
      };
    })();
    exports.Galaxy = Galaxy;
    var Generator = (function() {
      function Generator() {
        function privateData() {
          this.clear = null;
          this.CTX = null;
          this.FREE_INDICES = null;
          this.FREE_INDICES_TOP = null;
          this.LIFE_MULTIPLIER = null;
          this.OLD_TIME = null;
          this.OLD_TOUCHES = null;
          this.PARTICLES = null;
          this.STATE = null;
          this.TOUCHES = null;
          this.UPDATE_STARTED = null;
        }
        var p_vars = new privateData();
        var clear = p_vars.clear;
        Object.getOwnPropertyDescriptor(this,'clear') || Object.defineProperty(this,'clear', {get: function(){return clear;},set: function(e){clear=e;}});
        var CTX = p_vars.CTX;
        Object.getOwnPropertyDescriptor(this,'CTX') || Object.defineProperty(this,'CTX', {get: function(){return CTX;},set: function(e){CTX=e;}});
        var FREE_INDICES = p_vars.FREE_INDICES;
        Object.getOwnPropertyDescriptor(this,'FREE_INDICES') || Object.defineProperty(this,'FREE_INDICES', {get: function(){return FREE_INDICES;},set: function(e){FREE_INDICES=e;}});
        var FREE_INDICES_TOP = p_vars.FREE_INDICES_TOP;
        Object.getOwnPropertyDescriptor(this,'FREE_INDICES_TOP') || Object.defineProperty(this,'FREE_INDICES_TOP', {get: function(){return FREE_INDICES_TOP;},set: function(e){FREE_INDICES_TOP=e;}});
        var LIFE_MULTIPLIER = p_vars.LIFE_MULTIPLIER;
        Object.getOwnPropertyDescriptor(this,'LIFE_MULTIPLIER') || Object.defineProperty(this,'LIFE_MULTIPLIER', {get: function(){return LIFE_MULTIPLIER;},set: function(e){LIFE_MULTIPLIER=e;}});
        var OLD_TIME = p_vars.OLD_TIME;
        Object.getOwnPropertyDescriptor(this,'OLD_TIME') || Object.defineProperty(this,'OLD_TIME', {get: function(){return OLD_TIME;},set: function(e){OLD_TIME=e;}});
        var OLD_TOUCHES = p_vars.OLD_TOUCHES;
        Object.getOwnPropertyDescriptor(this,'OLD_TOUCHES') || Object.defineProperty(this,'OLD_TOUCHES', {get: function(){return OLD_TOUCHES;},set: function(e){OLD_TOUCHES=e;}});
        var PARTICLES = p_vars.PARTICLES;
        Object.getOwnPropertyDescriptor(this,'PARTICLES') || Object.defineProperty(this,'PARTICLES', {get: function(){return PARTICLES;},set: function(e){PARTICLES=e;}});
        var STATE = p_vars.STATE;
        Object.getOwnPropertyDescriptor(this,'STATE') || Object.defineProperty(this,'STATE', {get: function(){return STATE;},set: function(e){STATE=e;}});
        var TOUCHES = p_vars.TOUCHES;
        Object.getOwnPropertyDescriptor(this,'TOUCHES') || Object.defineProperty(this,'TOUCHES', {get: function(){return TOUCHES;},set: function(e){TOUCHES=e;}});
        var UPDATE_STARTED = p_vars.UPDATE_STARTED;
        Object.getOwnPropertyDescriptor(this,'UPDATE_STARTED') || Object.defineProperty(this,'UPDATE_STARTED', {get: function(){return UPDATE_STARTED;},set: function(e){UPDATE_STARTED=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function (_properties) {
          var properties = _properties || {};
          this.update=this.update.bind(this);
          this.reset=this.reset.bind(this);
          this.onmove=this.onmove.bind(this);
          this.clear=false;
          this.UPDATE_STARTED=false;
          this.LIFE_MULTIPLIER=1;
          this.FREE_INDICES=[];
          this.FREE_INDICES_TOP=-1;
          this.PARTICLES=[];
          this.OLD_TOUCHES=[];
          this.OLD_TIME=Date.now();
          this.CTX=monads.DOMable({
            tagName:'canvas'
          }).on('load').attributes({
            id:'canvas',
            width:window.innerWidth,
            height:window.innerHeight
          }).style({
            left:"0px",
            top:"0px",
            width:window.innerWidth + "px",
            height:window.innerHeight + 'px',
            position:'absolute',
            backgroundColor:'black'
          }).insert(document.body).on(['touchmove'],this.onmove).on(['touchend'],this.reset).element().getContext('2d');
          this.reset();
          requestAnimationFrame(this.update);
        }
        return ctor.apply(this,args) || this;
      }
      Generator.prototype['reset'] = function() {
        for(var i=0;i < Generator.MAX_PARTICLES;i++) {
          this.PARTICLES[i]=Fir();
          this.TOUCHES=[];
          this.FREE_INDICES[i]=i;
          this.FREE_INDICES_TOP=i;
        }
        this.clear=this.PARTICLES[0].clearTouch;
      };
      Generator.prototype['onmove'] = function(event) {
        event.preventDefault();
        this.TOUCHES=event.touches;
      };
      Generator.prototype['render'] = function() {
        if(this.clear) {
          this.CTX.globalCompositeOperation="source-over";
          this.CTX.fillStyle="rgba(0,0,0,1)";
          this.CTX.fillRect(0,0,window.innerWidth,window.innerHeight);
        }
        for(var i=0;i < Generator.MAX_PARTICLES;i++) {
          var particle=this.PARTICLES[i];
          if(particle.active && particle.life > 0 && particle.x > 0 && particle.y > 0 && particle.x < window.innerWidth && particle.y < window.innerHeight) {
            particle.render(this.CTX);
          }
        }
      };
      Generator.prototype['update'] = function() {
        if(this.UPDATE_STARTED) {
          return;
        }
        this.UPDATE_STARTED=true;
        var time=Date.now();
        var delta=(time - this.OLD_TIME) * 0.001;
        this.OLD_TIME=time;
        var particle;
        var i,il,index;
        var touch,px,py;
        var oldTouch,oldX,oldY;
        var dx,dy;
        for(i=0 , il=this.TOUCHES.length;i < il;i++) {
          touch=this.TOUCHES[i];
          index=i;
          px=touch.pageX;
          py=touch.pageY;
          if(this.OLD_TOUCHES[i] !== undefined) {
            oldTouch=this.OLD_TOUCHES[i];
            oldX=oldTouch.pageX;
            oldY=oldTouch.pageY;
            dx=px - oldX;
            dy=py - oldY;
          } else {
            this.OLD_TOUCHES[i]={
              pageX:0,
              pageY:0
            };
            dx=0;
            dy=0;
          }
          this.OLD_TOUCHES[i].pageX=px;
          this.OLD_TOUCHES[i].pageY=py;
          if(this.FREE_INDICES_TOP >= 0) {
            particle=this.PARTICLES[this.FREE_INDICES[this.FREE_INDICES_TOP]];
            for(var j=0;j < particle.spawnRate;j++) {
              this.FREE_INDICES_TOP--;
              particle.update({
                x:px,
                y:py,
                dx:dx,
                dy:dy,
                color:index
              });
            }
          }
        }
        for(i=0;i < Generator.MAX_PARTICLES;i++) {
          particle=this.PARTICLES[i];
          if(particle.active) {
            particle.life-=this.LIFE_MULTIPLIER * delta;
            particle.turnCounter+=delta;
            particle.elapsedCounter+=delta;
            particle.oldX=particle.x;
            particle.oldY=particle.y;
            particle.x+=delta * (particle.dx + (0.5 - Math.random()) * particle.randomX);
            particle.y+=delta * (particle.dy + (0.5 - Math.random()) * particle.randomY);
            if(particle.life <= 0) {
              this.FREE_INDICES_TOP+=1;
              this.FREE_INDICES[this.FREE_INDICES_TOP]=i;
              particle.active=false;
            }
          }
        }
        this.render();
        this.UPDATE_STARTED=false;
        requestAnimationFrame(this.update);
      };
      Generator.MAX_PARTICLES = 500;
      Generator.T_STATE = {
        TOUCH:0,
        FREE:1
      };
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.MAX_PARTICLES = Generator.MAX_PARTICLES;
        __.T_STATE = Generator.T_STATE;
        __.constructor = Generator;
        return new Generator(args && args.length && args[0]);
      };
    })();
    exports.Generator = Generator;
  })(require, nm.getExports(), nm.getId());
})();

