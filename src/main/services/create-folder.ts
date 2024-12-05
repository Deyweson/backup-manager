import { app } from 'electron'
import path from 'path'
import fs from 'fs'

export function CreateFolder(): void {
  const folder = path.join(app.getPath('documents'), 'sql-backup-tool')

  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true })
  }
}
