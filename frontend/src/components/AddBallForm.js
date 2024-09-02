import React, { useState } from 'react';
import { addBall } from '../api/api';
import './FormStyles.css';

const AddBallForm = ({ matchId, onUpdate }) => {
  const [runsScored, setRunsScored] = useState('');
  const [strikerName, setStrikerName] = useState('');
  const [nonStrikerName, setNonStrikerName] = useState('');
  const [bowlerName, setBowlerName] = useState('');
  const [isNoBall, setIsNoBall] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ballData = {
      runsScored: Number(runsScored),
      strikerName,
      nonStrikerName,
      bowlerName,
      isNoBall,
      matchId: "66d59bb5c88ef7a7467f0332",  
    };
    await addBall(ballData);
    onUpdate(); 
    setRunsScored('');
    setStrikerName('');
    setNonStrikerName('');
    setBowlerName('');
    setIsNoBall(false);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <input
        type="number"
        value={runsScored}
        onChange={(e) => setRunsScored(e.target.value)}
        placeholder="Runs Scored"
        required
      />
      <input
        type="text"
        value={strikerName}
        onChange={(e) => setStrikerName(e.target.value)}
        placeholder="Striker Name"
        required
      />
      <input
        type="text"
        value={nonStrikerName}
        onChange={(e) => setNonStrikerName(e.target.value)}
        placeholder="Non-Striker Name"
        required
      />
      <input
        type="text"
        value={bowlerName}
        onChange={(e) => setBowlerName(e.target.value)}
        placeholder="Bowler Name"
        required
      />
      <label className="checkbox-label">
        No Ball
        <input
          type="checkbox"
          checked={isNoBall}
          onChange={(e) => setIsNoBall(e.target.checked)}
        />
      </label>
      <button type="submit" className="form-button">Add Ball</button>
    </form>
  );
};

export default AddBallForm;
