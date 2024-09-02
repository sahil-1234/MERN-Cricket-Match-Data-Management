import React from 'react';
import AddBallForm from './components/AddBallForm';
import EditBallForm from './components/EditBallForm';
import MatchDetails from './components/MatchDetails';

function App() {
  const ballData = {
    _id: 'some-ball-id',
    runsScored: 4,
    strikerName: 'Player A',
    nonStrikerName: 'Player B',
    bowlerName: 'Bowler X',
    isNoBall: false,
  };

  return (
    <div className="App">
      <h1>Cricket Match Tracker</h1>
      <MatchDetails matchId="66d59bb5c88ef7a7467f0332" />
    </div>
  );
}

export default App;
