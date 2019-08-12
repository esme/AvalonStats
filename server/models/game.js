const mongoose = require('mongoose');

const GamerSchema = mongoose.Schema({
  playerName: String,
  playerRole: String,
});

const GameSchema = mongoose.Schema({
  title: String,
  username: String,
  startDate: Date,
  winningTeam: String,
  spyTeam: [GamerSchema],
  resistanceTeam: [GamerSchema],
  players: String,
});

module.exports = mongoose.model('Game', GameSchema);
