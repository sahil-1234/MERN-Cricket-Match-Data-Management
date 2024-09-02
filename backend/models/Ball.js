const mongoose = require('mongoose');

const BallSchema = new mongoose.Schema({
  runsScored: Number,
  strikerName: String,
  nonStrikerName: String,
  bowlerName: String,
  isNoBall: Boolean,
  matchId: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model('Ball', BallSchema);
