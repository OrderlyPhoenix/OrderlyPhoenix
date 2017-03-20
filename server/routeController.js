const Game = require('./db/Game/Game.js');
const db = require('./db/index.js');

const getLevel = function(req, res) {
  Game.find({level: req.query.level})
  .then(function(data) {
    res.send(data);
  })
  .catch(function(err) {
    console.error('Error retrieving game data from db: ', err);
    res.sendStatus(500);
  });
};

module.exports.getLevel = getLevel;
