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
});

module.exports = mongoose.model('Player', PlayerSchema);
