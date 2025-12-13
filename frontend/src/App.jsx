import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [tournaments, setTournaments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getTournaments = async () => {
      try {
        setLoading(true)
        let response = await fetch("http://localhost:8000/tournaments/")
        let data = await response.json()
        console.log(data.tournaments)
        setTournaments(data.tournaments || [])
      } catch (error) {
        console.error('Error fetching tournaments:', error)
      } finally {
        setLoading(false)
      }
    }
    getTournaments()
  }, [])

  // Функция для форматирования даты
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo-section">
          <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Tournament Manager</h1>
        <div className="counter">
          <button onClick={() => setCount(count + 1)} className="counter-btn">
            Count: {count}
          </button>
        </div>
      </header>

      <main className="main-content">
        <div className="table-container">
          <div className="table-header">
            <h2>Tournaments ({tournaments.length})</h2>
            {loading && <div className="loading-spinner"></div>}
          </div>
          
          {loading ? (
            <div className="loading-state">
              <p>Loading tournaments...</p>
            </div>
          ) : tournaments.length === 0 ? (
            <div className="empty-state">
              <p>No tournaments available</p>
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="tournaments-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Tournament Name</th>
                    <th>Game</th>
                    <th>Start Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tournaments.map((tournament, index) => (
                    <tr key={tournament.id || index} className="table-row">
                      <td className="index-column">{index + 1}</td>
                      <td className="name-column">
                        <div className="tournament-name">
                          <span className="name-text">{tournament.name || `Tournament ${index + 1}`}</span>
                        </div>
                      </td>
                      <td className="game-column">
                        <span className="game-badge">{tournament.game || 'Unknown'}</span>
                      </td>
                      <td className="date-column">
                        {formatDate(tournament.start_time)}
                      </td>
                      <td className="status-column">
                        <span className={`status-badge ${tournament.status === 'active' ? 'active' : 'upcoming'}`}>
                          {tournament.status || 'upcoming'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </footer>
    </div>
  )
}

export default App