import { useNavigate } from 'react-router-dom'
import './styles/home.css'

export function Home(): JSX.Element {
  const navigate = useNavigate()
  return (
    <div className="home">
      <h1>SQL Backup Tool</h1>
      <div className="home-btns">
        <button onClick={() => navigate('/backup')}>Backup</button>
        <button onClick={() => navigate('/restore')}>Restore</button>
      </div>
      <div className="home-database-list">
        <h2>Suported Database:</h2>
        <ul>
          <li>PostgreSQL</li>
          <li>MySQL</li>
        </ul>
      </div>

      <p className="version">v.0.0.1</p>
    </div>
  )
}
