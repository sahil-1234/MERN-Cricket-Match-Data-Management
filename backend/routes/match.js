const express = require('express');
const router = express.Router();
const Ball = require('../models/Ball');
const Match = require('../models/Match');

// Add Ball Data API
router.post('/add', async (req, res) => {
  try {
    const { runsScored, strikerName, nonStrikerName, bowlerName, isNoBall, matchId } = req.body;

    if (!matchId) return res.status(400).json({ message: 'Match ID is required' });

    const match = await Match.findById(matchId);
    if (!match) return res.status(404).json({ message: 'Match not found' });

    // Create and save the new ball entry
    const ball = new Ball({ runsScored, strikerName, nonStrikerName, bowlerName, isNoBall, matchId });
    await ball.save();

    // Update match data
    match.teamRuns += runsScored;
    match.teamBallsPlayed += 1;

    // Update striker stats
    let batsman = match.batsmanStats.find(b => b.name === strikerName);
    if (!batsman) {
      batsman = { name: strikerName, runs: 0, balls: 0, strikeRate: 0 };
      match.batsmanStats.push(batsman);
    }
    batsman.runs += runsScored;
    batsman.balls += 1;
    batsman.strikeRate = (batsman.runs / batsman.balls) * 100;

    // Update bowler stats
    let bowler = match.bowlerStats.find(b => b.name === bowlerName);
    if (!bowler) {
      bowler = { name: bowlerName, runsConceded: 0, deliveries: 0, noBalls: 0, economyRate: 0 };
      match.bowlerStats.push(bowler);
    }
    bowler.runsConceded += runsScored;
    bowler.deliveries += 1;
    if (isNoBall) bowler.noBalls += 1;
    bowler.economyRate = (bowler.runsConceded / (match.teamBallsPlayed / 6));

    // Update current run rate and over
    match.currentRunRate = (match.teamRuns / match.teamBallsPlayed) * 6;
    match.currentOver = `${Math.floor(match.teamBallsPlayed / 6)}.${match.teamBallsPlayed % 6}`;

    await match.save();
    res.status(201).json(ball);
  } catch (error) {
    console.error('Error adding ball data:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// Edit Ball Data API
router.put('/edit', async (req, res) => {
  try {
    const { ballId, runsScored, strikerName, nonStrikerName, bowlerName, isNoBall } = req.body;
    const ball = await Ball.findById(ballId);
    if (!ball) return res.status(404).json({ message: 'Ball not found' });

    // Reverse previous updates
    const match = await Match.findById(ball.matchId);
    if (!match) return res.status(404).json({ message: 'Match not found' });

    match.teamRuns -= ball.runsScored;
    match.teamBallsPlayed -= 1;

    let oldBatsman = match.batsmanStats.find(b => b.name === ball.strikerName);
    if (oldBatsman) {
      oldBatsman.runs -= ball.runsScored;
      oldBatsman.balls -= 1;
      oldBatsman.strikeRate = oldBatsman.balls ? (oldBatsman.runs / oldBatsman.balls) * 100 : 0;
    }

    let oldBowler = match.bowlerStats.find(b => b.name === ball.bowlerName);
    if (oldBowler) {
      oldBowler.runsConceded -= ball.runsScored;
      oldBowler.deliveries -= 1;
      if (ball.isNoBall) oldBowler.noBalls -= 1;
      oldBowler.economyRate = oldBowler.deliveries ? (oldBowler.runsConceded / (match.teamBallsPlayed / 6)) : 0;
    }

    await ball.updateOne({ runsScored, strikerName, nonStrikerName, bowlerName, isNoBall });

    // Apply new updates
    match.teamRuns += runsScored;
    match.teamBallsPlayed += 1;

    let batsman = match.batsmanStats.find(b => b.name === strikerName);
    if (!batsman) {
      batsman = { name: strikerName, runs: 0, balls: 0, strikeRate: 0 };
      match.batsmanStats.push(batsman);
    }
    batsman.runs += runsScored;
    batsman.balls += 1;
    batsman.strikeRate = (batsman.runs / batsman.balls) * 100;

    let bowler = match.bowlerStats.find(b => b.name === bowlerName);
    if (!bowler) {
      bowler = { name: bowlerName, runsConceded: 0, deliveries: 0, noBalls: 0, economyRate: 0 };
      match.bowlerStats.push(bowler);
    }
    bowler.runsConceded += runsScored;
    bowler.deliveries += 1;
    if (isNoBall) bowler.noBalls += 1;
    bowler.economyRate = (bowler.runsConceded / (match.teamBallsPlayed / 6));

    match.currentRunRate = (match.teamRuns / match.teamBallsPlayed) * 6;
    match.currentOver = `${Math.floor(match.teamBallsPlayed / 6)}.${match.teamBallsPlayed % 6}`;

    await match.save();
    res.json(ball);
  } catch (error) {
    console.error('Error editing ball data:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// Get All Details API
router.get('/details/:matchId', async (req, res) => {
  try {
    const match = await Match.findById(req.params.matchId);
    if (!match) return res.status(404).json({ message: 'Match not found' });

    res.json(match);
  } catch (error) {
    console.error('Error fetching match details:', error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
