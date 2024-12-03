import { Route, Routes } from 'react-router-dom'
import { BackupPage } from './pages/backup-page'
import { Home } from './pages/home'

export function MainRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/backup" element={<BackupPage />} />
    </Routes>
  )
}
