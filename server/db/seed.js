const Game = require('./Game/Game.js');
const db = require('./index.js');

Game.remove({}).then(function() {
  Game.create({
    level: 1, chapter: 1, firstImage: 'https://s3-us-west-1.amazonaws.com/codr/L1I1.png', secondImage: 'https://s3-us-west-1.amazonaws.com/codr/L1I2.png', challengeText: ['input1', 'apples', 'input2', 'banana'], instructionText: 'Fill in the text below so that the box is labeled.', learnText: 'To start coding, we need a way to save the values from our coding.', points: 25, solution: [{input1: 'var', input2: 'var'}]
  }).then(function() {
    console.log('Successfully seeded level data into database');
  }).catch(function(err) {
    console.log('ERROR seeding level into db: ', err);
  });
});
