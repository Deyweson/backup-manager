import { app, ipcMain } from 'electron'
import { IDatabase } from '../../preload/models/database'
import path from 'node:path'
import fs from 'node:fs'
import { is } from '@electron-toolkit/utils'
import { exec } from 'node:child_process'

export function Backup(): void {
  ipcMain.handle('backup', async (__event, data: IDatabase) => {
    let binPath = ''
    if (is.dev) {
      binPath = path.join(app.getAppPath(), 'bin', 'pg_dump.exe')
      console.log('Running in development')
    } else {
      binPath = path.join(app.getAppPath(), '../app.asar.unpacked', 'bin', 'pg_dump.exe') // prod path
      console.log('Running in production')
    }

    process.env.PGPASSWORD = data.password
    const date = new Date()
    const backupName = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}_backup.sql`
    const backupPath = path.join(app.getPath('documents'), 'backups/')
    const backupCommand = `${binPath} -h ${data.hostname} -p ${data.port} -U ${data.user} -F t -d ${data.database} -f ${backupPath + backupName}`

    if (!fs.existsSync(backupPath)) {
      fs.mkdirSync(backupPath, { recursive: true })
    }

    try {
      const response = await execCommand(backupCommand)
      console.log(response)
      return 'Backup Finished'
    } catch (er) {
      console.log('aqui', er)
      return er
    }
  })
}

function execCommand(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(command, (__error, stdout, stderr) => {
      if (stderr) {
        reject(stderr)
      }
      resolve(stdout)
    })
  })
}
