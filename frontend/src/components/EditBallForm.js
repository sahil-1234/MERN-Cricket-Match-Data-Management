import React, { useState, useEffect } from 'react';
import { editBall } from '../api/api';
import './FormStyles.css';

const EditBallForm = ({ ball, onUpdate }) => {
  const [runsScored, setRunsScored] = useState(ball?.runsScored || '');
  const [strikerName, setStrikerName] = useState(ball?.strikerName || '');
  const [nonStrikerName, setNonStrikerName] = useState(ball?.nonStrikerName || '');
  const [bowlerName, setBowlerName] = useState(ball?.bowlerName || '');
  const [isNoBall, setIsNoBall] = useState(ball?.isNoBall || false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedBall = {
      ballId: "66d5aa699a37464560a47ae4", 
      runsScored: Number(runsScored),
      strikerName,
      nonStrikerName,
      bowlerName,
      isNoBall,
    };
    await editBall(updatedBall);
    onUpdate(); 
  };

  useEffect(() => {
    if (ball) {
      setRunsScored(ball.runsScored || '');
      setStrikerName(ball.strikerName || '');
      setNonStrikerName(ball.nonStrikerName || '');
      setBowlerName(ball.bowlerName || '');
      setIsNoBall(ball.isNoBall || false);
    }
  }, [ball]);

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
      <button type="submit" className="form-button">Edit Ball</button>
    </form>
  );
};

export default EditBallForm;
