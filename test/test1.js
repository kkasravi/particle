var log = require('log');
var monads = require('monads');
var particle = require('particle');
particle.Particles({
  canvas:monads.DOMable({
    tagName:'canvas'
  }).on('load').attributes({
    'id':'particles',
    width:'640',
    height:'555'
  }).style({
    'background-color':'transparent',
    'left':'510px',
    'top':'380px',
    'z-index':'1',
    'position':'absolute'
  }).insert(document.body).element(),
  background:'img/aftermath.jpg'
});

