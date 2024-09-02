const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
  teamRuns: { type: Number, default: 0 },
  teamBallsPlayed: { type: Number, default: 0 },
  batsmanStats: [
    {
      name: String,
      runs: Number,
      balls: Number,
      strikeRate: Number,
    },
  ],
  bowlerStats: [
    {
      name: String,
      runsConceded: Number,
      deliveries: Number,
      noBalls: Number,
      economyRate: Number,
    },
  ],
  currentRunRate: { type: Number, default: 0 },
  currentOver: { type: String, default: '0.0' },
});

module.exports = mongoose.model('Match', MatchSchema);
