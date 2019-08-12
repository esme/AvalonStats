const Player = require('../models/player');

const updateStats = async (stats) => {
  const { username } = stats;
  const doc = await Player.find({ username });
  if (!doc.length) {
    await Player.create(stats);
  } else {
    doc.totalGamesPlayed += stats.totalGamesPlayed;
    doc.totalWins += stats.totalGamesPlayed;
    doc.totalLosses += stats.totalLosses;
    doc.totalResWins += stats.totalResWins;
    doc.totalResLosses += stats.totalResLosses;
    await doc.save();
  }
};

const gameStats = async ({ winningTeam, resistanceTeam, spyTeam }) => {
  if (winningTeam === 'resistance') {
    await resistanceTeam.forEach(el => updateStats({
      username: el.playerName,
      totalGamesPlayed: 1,
      totalWins: 1,
      totalLosses: 0,
      totalResWins: 1,
      totalResLosses: 0,
    }));
    await spyTeam.forEach(el => updateStats({
      username: el.playerName,
      totalGamesPlayed: 1,
      totalWins: 0,
      totalLosses: 1,
      totalResWins: 0,
      totalResLosses: 1,
    }));
  } else {
    await spyTeam.forEach(el => updateStats({
      username: el.playerName,
      totalGamesPlayed: 1,
      totalWins: 1,
      totalLosses: 0,
      totalResWins: 0,
      totalResLosses: 0,
    }));
    await resistanceTeam.forEach(el => updateStats({
      username: el.playerName,
      totalGamesPlayed: 1,
      totalWins: 0,
      totalLosses: 1,
      totalResWins: 0,
      totalResLosses: 1,
    }));
  }
};

module.exports = gameStats;
