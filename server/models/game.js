const mongoose = require('mongoose');

const PlayerSchema = mongoose.Schema({
  playerName: {
    type: String,
  },
  score: {
    type: Number,
  },
  role: {
    type: String,
  },
});

const GameSchema = mongoose.Schema({
  title: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  players: [PlayerSchema],
});

module.exports = mongoose.model('Game', GameSchema);
