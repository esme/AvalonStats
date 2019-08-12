const mongoose = require('mongoose');

const PlayerSchema = mongoose.Schema({
  playerName: String,
  playerRole: String,
});

const GameSchema = mongoose.Schema({
  title: String,
  startDate: Date,
  winningTeam: String,
  userName: String,
  spyTeam: [PlayerSchema],
  resistanceTeam: [PlayerSchema],
});

module.exports = mongoose.model('Game', GameSchema);
