import React, { useEffect, useState } from 'react';
import { getMatchDetails } from '../api/api';
import AddBallForm from './AddBallForm';
import EditBallForm from './EditBallForm';
import './MatchDetailsStyles.css';

const MatchDetails = ({ matchId }) => {
  const [match, setMatch] = useState(null);
  const [error, setError] = useState(null);

  const fetchMatchDetails = async () => {
    try {
      const data = await getMatchDetails(matchId);
      setMatch(data);
    } catch (error) {
      setError('Failed to fetch match details');
      console.error('Error fetching match details:', error);
    }
  };

  useEffect(() => {
    if (matchId) {
      fetchMatchDetails();
    }
  }, [matchId]);

  const handleUpdate = () => {
    fetchMatchDetails(); 
  };

  if (error) return <p className="error-text">{error}</p>;
  if (!match) return <p className="loading-text">Loading...</p>;

  return (
    <div className="match-details-container">
      <h2 className="section-title">Match Details</h2>
      <p className="match-info">Team Runs: {match.teamRuns || 'N/A'}</p>
      <p className="match-info">Team Balls Played: {match.teamBallsPlayed || 'N/A'}</p>
      <p className="match-info">Current Run Rate: {match.currentRunRate ? match.currentRunRate.toFixed(2) : 'N/A'}</p>
      <p className="match-info">Current Over: {match.currentOver || 'N/A'}</p>

      <h3 className="section-subtitle">Batsman Stats</h3>
      <ul className="stats-list">
        {match.batsmanStats && match.batsmanStats.length > 0 ? (
          match.batsmanStats.map((batsman) => (
            <li key={batsman.name} className="stats-item">
              {batsman.name} - Runs: {batsman.runs || 0}, Balls: {batsman.balls || 0}, SR: {batsman.strikeRate ? batsman.strikeRate.toFixed(2) : 'N/A'}
            </li>
          ))
        ) : (
          <li className="stats-item">No batsman stats available</li>
        )}
      </ul>

      <h3 className="section-subtitle">Bowler Stats</h3>
      <ul className="stats-list">
        {match.bowlerStats && match.bowlerStats.length > 0 ? (
          match.bowlerStats.map((bowler) => (
            <li key={bowler.name} className="stats-item">
              {bowler.name} - Runs Conceded: {bowler.runsConceded || 0}, Deliveries: {bowler.deliveries || 0}, No Balls: {bowler.noBalls || 0}, ER: {bowler.economyRate ? bowler.economyRate.toFixed(2) : 'N/A'}
            </li>
          ))
        ) : (
          <li className="stats-item">No bowler stats available</li>
        )}
      </ul>

      <AddBallForm matchId={matchId} onUpdate={handleUpdate} />
      <EditBallForm matchId={matchId} onUpdate={handleUpdate} />
    </div>
  );
};

export default MatchDetails;
