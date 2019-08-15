const mongoose = require('mongoose');

const PlayerSchema = mongoose.Schema({
  username: {
    type: String,
    index: true,
  },
  totalGamesPlayed: Number,
  totalWins: Number,
  totalLosses: Number,
  totalResWins: Number,
  totalResLosses: Number,
  gamingGroup: String,
});

module.exports = mongoose.model('Player', PlayerSchema);
