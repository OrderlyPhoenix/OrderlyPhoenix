const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  level: Number,
  chapter: Number,
  firstImage: String,
  secondImage: String,
  challengeText: Array,
  instructionText: String,
  learnText: String,
  points: Number,
  solution: Array
});

module.exports = mongoose.model('Game', gameSchema);
