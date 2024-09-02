const API_URL = 'http://localhost:4000/api/match';

export const addBall = async (ballData) => {
  const response = await fetch(`${API_URL}/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ballData),
  });
  return response.json();
};

export const editBall = async (ballData) => {
  const response = await fetch(`${API_URL}/edit`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ballData),
  });
  return response.json();
};

export const getMatchDetails = async (matchId) => {
  const response = await fetch(`${API_URL}/details/${matchId}`);
  return response.json();
};
