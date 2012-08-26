(function() {
  var nm = module.Module('particle');
  (function(require, exports, moduleId) {
    var log = require('log');
    var Particle = (function() {
      function Particle() {
        function privateData() {
          this.x = null;
          this.y = null;
          this.age = null;
          this.xVector = null;
          this.yVector = null;
          this.scale = null;
          this.alpha = null;
          this.canRegen = null;
          this.timeDie = null;
          this.emitter = null;
          this.windVelocity = null;
        }
        var p_vars = new privateData();
        var x = p_vars.x;
        Object.getOwnPropertyDescriptor(this,'x') || Object.defineProperty(this,'x', {get: function(){return x;},set: function(e){x=e;}});
        var y = p_vars.y;
        Object.getOwnPropertyDescriptor(this,'y') || Object.defineProperty(this,'y', {get: function(){return y;},set: function(e){y=e;}});
        var age = p_vars.age;
        Object.getOwnPropertyDescriptor(this,'age') || Object.defineProperty(this,'age', {get: function(){return age;},set: function(e){age=e;}});
        var xVector = p_vars.xVector;
        Object.getOwnPropertyDescriptor(this,'xVector') || Object.defineProperty(this,'xVector', {get: function(){return xVector;},set: function(e){xVector=e;}});
        var yVector = p_vars.yVector;
        Object.getOwnPropertyDescriptor(this,'yVector') || Object.defineProperty(this,'yVector', {get: function(){return yVector;},set: function(e){yVector=e;}});
        var scale = p_vars.scale;
        Object.getOwnPropertyDescriptor(this,'scale') || Object.defineProperty(this,'scale', {get: function(){return scale;},set: function(e){scale=e;}});
        var alpha = p_vars.alpha;
        Object.getOwnPropertyDescriptor(this,'alpha') || Object.defineProperty(this,'alpha', {get: function(){return alpha;},set: function(e){alpha=e;}});
        var canRegen = p_vars.canRegen;
        Object.getOwnPropertyDescriptor(this,'canRegen') || Object.defineProperty(this,'canRegen', {get: function(){return canRegen;},set: function(e){canRegen=e;}});
        var timeDie = p_vars.timeDie;
        Object.getOwnPropertyDescriptor(this,'timeDie') || Object.defineProperty(this,'timeDie', {get: function(){return timeDie;},set: function(e){timeDie=e;}});
        var emitter = p_vars.emitter;
        Object.getOwnPropertyDescriptor(this,'emitter') || Object.defineProperty(this,'emitter', {get: function(){return emitter;},set: function(e){emitter=e;}});
        var windVelocity = p_vars.windVelocity;
        Object.getOwnPropertyDescriptor(this,'windVelocity') || Object.defineProperty(this,'windVelocity', {get: function(){return windVelocity;},set: function(e){windVelocity=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function (_properties) {
          var properties = _properties || {
            emitter:null,
            age:0,
            windVelocity:0.01
          };
          this.age=properties.age;
          this.emitter=properties.emitter;
          this.windVelocity=properties.windVelocity;
          this.canRegen=true;
          this.startRand();
        }
        return ctor.apply(this,args) || this;
      }
      Particle.prototype['isAlive'] = function() {
        return this.age < this.timeDie;
      };
      Particle.prototype['startRand'] = function() {
        this.xVector=Math.random() * 0.5 - 0.25;
        this.yVector=-1.5 - Math.random();
        this.timeDie=20000 + Math.floor(Math.random() * 12000);
        var invDist=1 / Math.sqrt(this.xVector * this.xVector + this.yVector * this.yVector);
        this.xVector=this.xVector * invDist * this.emitter.speed;
        this.yVector=this.yVector * invDist * this.emitter.speed;
        this.x=(this.emitter.x + Math.floor(Math.random() * 20) - 10);
        this.y=(this.emitter.y + Math.floor(Math.random() * 20) - 10);
        this.x+=(this.xVector + this.windVelocity) * this.age;
        this.y+=this.yVector * this.age;
        this.scale=0.01;
        this.alpha=0;
      };
      Particle.prototype['update'] = function(timeElapsed,windVelocity) {
        this.age+=timeElapsed;
        if(!this.isAlive()) {
          if(Math.random() > this.emitter.dieRate) {
            this.canRegen=false;
          }
          if(!this.canRegen) {
            return;
          }
          this.age=0;
          this.startRand();
          return;
        }
        var fadeIn=this.timeDie * 0.05;
        var startScale;
        var maxStartScale=0.3;
        if(this.age < fadeIn) {
          this.alpha=this.age / fadeIn;
          startScale=this.alpha * maxStartScale;
          this.y+=this.yVector * 2 * timeElapsed;
        } else {
          this.alpha=1 - (this.age - fadeIn) / (this.timeDie - fadeIn);
          startScale=maxStartScale;
          this.y+=this.yVector * timeElapsed;
        }
        this.x+=(this.xVector + windVelocity) * timeElapsed;
        this.alpha*=this.emitter.alpha;
        this.scale=0.001 + startScale + this.age / 4000;
      };
      Particle.prototype['render'] = function(ctx) {
        if(!this.isAlive()) {
          return;
        }
        ctx.globalAlpha=this.alpha;
        var height=this.emitter.image.height * this.scale;
        var width=this.emitter.image.width * this.scale;
        var x=Math.round(this.x - width / 2);
        var y=Math.round(this.y + height / 2);
        ctx.drawImage(this.emitter.image,x,y,width,height);
        if(x < this.dirtyLeft) {
          this.dirtyLeft=x;
        }
        if(x + width > this.dirtyRight) {
          this.dirtyRight=x + width;
        }
        if(y < this.dirtyTop) {
          this.dirtyTop=y;
        }
        if(y + height > this.dirtyBottom) {
          this.dirtyBottom=y + height;
        }
      };
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.constructor = Particle;
        return new Particle(args && args.length && args[0]);
      };
    })();
    var ParticleEmitter = (function() {
      function ParticleEmitter() {
        function privateData() {
          this.x = null;
          this.y = null;
          this.dieRate = null;
          this.image = null;
          this.speed = null;
          this.alpha = null;
          this.listParticle = null;
        }
        var p_vars = new privateData();
        var x = p_vars.x;
        Object.getOwnPropertyDescriptor(this,'x') || Object.defineProperty(this,'x', {get: function(){return x;},set: function(e){x=e;}});
        var y = p_vars.y;
        Object.getOwnPropertyDescriptor(this,'y') || Object.defineProperty(this,'y', {get: function(){return y;},set: function(e){y=e;}});
        var dieRate = p_vars.dieRate;
        Object.getOwnPropertyDescriptor(this,'dieRate') || Object.defineProperty(this,'dieRate', {get: function(){return dieRate;},set: function(e){dieRate=e;}});
        var image = p_vars.image;
        Object.getOwnPropertyDescriptor(this,'image') || Object.defineProperty(this,'image', {get: function(){return image;},set: function(e){image=e;}});
        var speed = p_vars.speed;
        Object.getOwnPropertyDescriptor(this,'speed') || Object.defineProperty(this,'speed', {get: function(){return speed;},set: function(e){speed=e;}});
        var alpha = p_vars.alpha;
        Object.getOwnPropertyDescriptor(this,'alpha') || Object.defineProperty(this,'alpha', {get: function(){return alpha;},set: function(e){alpha=e;}});
        var listParticle = p_vars.listParticle;
        Object.getOwnPropertyDescriptor(this,'listParticle') || Object.defineProperty(this,'listParticle', {get: function(){return listParticle;},set: function(e){listParticle=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function (_properties) {
          var properties = _properties || {
            xScale:1,
            yScale:1,
            particles:1,
            image:null,
            alpha:1,
            windVelocity:0.01
          };
          this.speed=0.02;
          this.alpha=properties.alpha || 1;
          this.windVelocity=properties.windVelocity;
          this.listParticle=[];
          this.x=Particles.CANVAS_WIDTH * properties.xScale;
          this.y=Particles.CANVAS_HEIGHT * properties.yScale;
          this.image=properties.image;
          this.dieRate=0.95;
          for(var n=0;n < properties.particles;n++) {
            this.listParticle.push(Particle({
              emitter:this,
              age:n * 50000 * this.speed,
              windVelocity:this.windVelocity
            }));
          }
        }
        return ctor.apply(this,args) || this;
      }
      ParticleEmitter.prototype['update'] = function(timeElapsed,windVelocity) {
        for(var n=0;n < this.listParticle.length;n++) {
          this.listParticle[n].update(timeElapsed,windVelocity);
        }
      };
      ParticleEmitter.prototype['render'] = function(context) {
        for(var n=0;n < this.listParticle.length;n++) {
          this.listParticle[n].render(context);
        }
      };
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.constructor = ParticleEmitter;
        return new ParticleEmitter(args && args.length && args[0]);
      };
    })();
    var Particles = (function() {
      function Particles() {
        function privateData() {
          this.background = null;
          this.canvas = null;
          this.context = null;
          this.count = null;
          this.image = null;
          this.lastRender = null;
          this.smokeRight = null;
          this.smokeLeft = null;
          this.dirtyLeft = null;
          this.dirtyRight = null;
          this.dirtyBottom = null;
          this.dirtyTop = null;
          this.windVelocity = null;
        }
        var p_vars = new privateData();
        var background = p_vars.background;
        Object.getOwnPropertyDescriptor(this,'background') || Object.defineProperty(this,'background', {get: function(){return background;},set: function(e){background=e;}});
        var canvas = p_vars.canvas;
        Object.getOwnPropertyDescriptor(this,'canvas') || Object.defineProperty(this,'canvas', {get: function(){return canvas;},set: function(e){canvas=e;}});
        var context = p_vars.context;
        Object.getOwnPropertyDescriptor(this,'context') || Object.defineProperty(this,'context', {get: function(){return context;},set: function(e){context=e;}});
        var count = p_vars.count;
        Object.getOwnPropertyDescriptor(this,'count') || Object.defineProperty(this,'count', {get: function(){return count;},set: function(e){count=e;}});
        var image = p_vars.image;
        Object.getOwnPropertyDescriptor(this,'image') || Object.defineProperty(this,'image', {get: function(){return image;},set: function(e){image=e;}});
        var lastRender = p_vars.lastRender;
        Object.getOwnPropertyDescriptor(this,'lastRender') || Object.defineProperty(this,'lastRender', {get: function(){return lastRender;},set: function(e){lastRender=e;}});
        var smokeRight = p_vars.smokeRight;
        Object.getOwnPropertyDescriptor(this,'smokeRight') || Object.defineProperty(this,'smokeRight', {get: function(){return smokeRight;},set: function(e){smokeRight=e;}});
        var smokeLeft = p_vars.smokeLeft;
        Object.getOwnPropertyDescriptor(this,'smokeLeft') || Object.defineProperty(this,'smokeLeft', {get: function(){return smokeLeft;},set: function(e){smokeLeft=e;}});
        var dirtyLeft = p_vars.dirtyLeft;
        Object.getOwnPropertyDescriptor(this,'dirtyLeft') || Object.defineProperty(this,'dirtyLeft', {get: function(){return dirtyLeft;},set: function(e){dirtyLeft=e;}});
        var dirtyRight = p_vars.dirtyRight;
        Object.getOwnPropertyDescriptor(this,'dirtyRight') || Object.defineProperty(this,'dirtyRight', {get: function(){return dirtyRight;},set: function(e){dirtyRight=e;}});
        var dirtyBottom = p_vars.dirtyBottom;
        Object.getOwnPropertyDescriptor(this,'dirtyBottom') || Object.defineProperty(this,'dirtyBottom', {get: function(){return dirtyBottom;},set: function(e){dirtyBottom=e;}});
        var dirtyTop = p_vars.dirtyTop;
        Object.getOwnPropertyDescriptor(this,'dirtyTop') || Object.defineProperty(this,'dirtyTop', {get: function(){return dirtyTop;},set: function(e){dirtyTop=e;}});
        var windVelocity = p_vars.windVelocity;
        Object.getOwnPropertyDescriptor(this,'windVelocity') || Object.defineProperty(this,'windVelocity', {get: function(){return windVelocity;},set: function(e){windVelocity=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function (_properties) {
          var properties = _properties || {
            canvas:canvas,
            background:background,
            image:image
          };
          this.canvas=properties.canvas;
          this.lastRender=new Date().getTime();
          this.dirtyLeft=0;
          this.dirtyTop=0;
          this.dirtyRight=Particles.CANVAS_WIDTH;
          this.dirtyBottom=Particles.CANVAS_HEIGHT;
          this.windVelocity=0.01;
          this.count=0;
          this.render=this.render.bind(this);
          this.onload=this.onload.bind(this);
          this.onbackgroundload=this.onbackgroundload.bind(this);
          this.image=new Image();
          this.image.onload=this.onload;
          this.image.src=properties.image || 'img/puffBlack.png';
          if(this.canvas.getContext) {
            this.context=this.canvas.getContext('2d');
          }
          if(properties.background) {
            this.background=new Image();
            this.background.onload=this.onbackgroundload;
            this.background.src=properties.background;
            document.body.appendChild(this.background);
          }
        }
        return ctor.apply(this,args) || this;
      }
      Particles.prototype['onbackgroundload'] = function() {
        Particles.CANVAS_WIDTH=this.background.width;
        Particles.CANVAS_HEIGHT=this.background.height;
        this.canvas.width=this.background.width;
        this.canvas.height=this.background.height;
        var xImage=this.background.offsetLeft;
        var yImage=this.background.offsetTop;
        var elem=this.background.offsetParent;
        while(elem) {
          xImage+=elem.offsetLeft;
          yImage+=elem.offsetTop;
          elem=elem.offsetParent;
        }
        this.canvas.style.position='absolute';
        this.canvas.style.left=xImage + "px";
        this.canvas.style.top=yImage + "px";
        this.smokeRight=ParticleEmitter({
          xScale:0.9,
          yScale:0.531,
          particles:20,
          image:this.image,
          alpha:1,
          windVelocity:this.windVelocity
        });
        this.smokeLeft=ParticleEmitter({
          xScale:0.322,
          yScale:0.453,
          particles:30,
          image:this.image,
          alpha:0.3,
          windVelocity:this.windVelocity
        });
        requestAnimFrame(this.render);
      };
      Particles.prototype['onload'] = function() {
      };
      Particles.prototype['render'] = function() {
        var timeElapsed=new Date().getTime() - this.lastRender;
        this.lastRender=new Date().getTime();
        this.context.clearRect(this.dirtyLeft,this.dirtyTop,this.dirtyRight - this.dirtyLeft,this.dirtyBottom - this.dirtyTop);
        this.dirtyLeft=1000;
        this.dirtyTop=1000;
        this.dirtyRight=0;
        this.dirtyBottom=0;
        this.smokeRight.update(timeElapsed,this.windVelocity);
        this.smokeRight.render(this.context);
        this.smokeLeft.update(timeElapsed,this.windVelocity);
        this.smokeLeft.render(this.context);
        this.windVelocity+=(Math.random() - 0.5) * 0.002;
        if(this.windVelocity > 0.015) {
          this.windVelocity=0.015;
        }
        if(this.windVelocity < 0) {
          this.windVelocity=0;
        }
        requestAnimFrame(this.render);
      };
      Particles.CANVAS_WIDTH = 960;
      Particles.CANVAS_HEIGHT = 640;
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.CANVAS_WIDTH = Particles.CANVAS_WIDTH;
        __.CANVAS_HEIGHT = Particles.CANVAS_HEIGHT;
        __.constructor = Particles;
        return new Particles(args && args.length && args[0]);
      };
    })();
    exports.Particles = Particles;
  })(require, nm.getExports(), nm.getId());
})();

