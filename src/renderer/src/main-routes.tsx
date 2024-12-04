import { Home } from './pages/home'
import { BackupPage } from './pages/backup-page/backup-page'
import { RestorePage } from './pages/restore-page/restore-page'
import { Route, Routes } from 'react-router-dom'

export function MainRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/backup" element={<BackupPage />} />
      <Route path="/restore" element={<RestorePage />} />
    </Routes>
  )
}
