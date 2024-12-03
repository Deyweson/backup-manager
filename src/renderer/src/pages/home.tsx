import { useNavigate } from 'react-router-dom'
import './styles/home.css'

export function Home(): JSX.Element {
  const navigate = useNavigate()
  return (
    <div className="home">
      <h1>Backup Manager</h1>
      <div className="home-btns">
        <button onClick={() => navigate('/backup')}>Backup</button>
        <button disabled>
          <p>Restore</p>
          <p style={{ fontSize: '12px' }}> (not available)</p>
        </button>
      </div>

      <h2>Suported Database:</h2>
      <ul>
        <li>PostgreSQL</li>
      </ul>
    </div>
  )
}
