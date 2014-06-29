define(function(require, exports, module) {
var Engine = require('famous/core/Engine');
var Surface = require('famous/core/Surface');
var Transform = require('famous/core/Transform');
var StateModifier = require('famous/modifiers/StateModifier');
var Easing = require('famous/transitions/Easing')
var Timer = require('famous/utilities/Timer');

var mainContext = Engine.createContext();

var startCenter = new StateModifier({
  align: [0.5, 0.5],
  origin: [0.5, 0.5],
});

var score = 0;
var timer = 10;

// modifier.setTransform(
//   Transform.translate(200, 300, 0),
//   { duration: 1000, curve: 'easeInOut'}
// );

var player = new Surface({
  size: [100, 100],
  content: '0',
  properties: {
    color: 'black',
    textAlign: 'center',
    fontSize: '80px',
    backgroundColor: 'yellow'
  }
});

var topBar = new Surface({
  size: [100, 100],
  content: timer,
  properties: {
    color: 'white',
    textAlign: 'center',
    fontSize: '100px',
  }
});

var move = function() {
  if(timer > 0) {
    var sign1 = Math.random() < .5 ? -1 : 1;
    var sign2 = Math.random() < .5 ? -1 : 1;
    startCenter.setTransform(
      Transform.translate(600 * Math.random() * sign1, 300 * Math.random() * sign2, 0),
      { duration: 500, curve: 'easeInOut'}
    );
  }
};

var updateTime = function() {
  if(timer > 0) {
    timer--;
    topBar.setContent(timer);
    if(timer < 0) { 
      alert("Game Over!");
      if(topScore > score) {
        highScore.setContent(highScore);
      }

    }
  }
};

Timer.setInterval(updateTime, 1000);
Timer.setInterval(move, 500);

player.on('mouseover', function() {
  if(timer > 0) {
    score++;
    this.setContent(score);
  }
});

mainContext.add(startCenter).add(player);
mainContext.add(topBar);

  
});