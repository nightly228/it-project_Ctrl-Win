import React from 'react';

const Bracket = () => {
  const rounds = [
    { title: 'Final', matches: [{ id: 1, teams: ['NAVI', 'G2'], score: [2, 1] }] }
  ];

  return (
    <div style={{ display: 'flex', gap: '40px', padding: '20px', background: '#111', borderRadius: '8px' }}>
      {rounds.map((round, idx) => (
        <div key={idx}>
          <h4 style={{ color: '#8b5cf6', marginBottom: '15px' }}>{round.title}</h4>
          {round.matches.map(match => (
            <div key={match.id} style={{ background: '#222', border: '1px solid #333', padding: '10px', borderRadius: '5px', width: '180px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{match.teams[0]}</span> <span>{match.score[0]}</span>
              </div>
              <div style={{ height: '1px', background: '#333', margin: '5px 0' }}></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{match.teams[1]}</span> <span>{match.score[1]}</span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Bracket;