import { ipcMain } from 'electron'
import { IDatabase } from '../../../preload/models/database'
import { execCommand } from '../execute-command'
import { RestorePSQL } from './restore-psql'
import { RestoreMYSQL } from './restore-mysql'

export function Restore(): void {
  ipcMain.handle('restore', async (__event, data: IDatabase) => {
    let backupCommand = ''

    if (data.dboption === 'pg_restore') {
      process.env.PGPASSWORD = data.password
      backupCommand = await RestorePSQL(data)
      console.log(backupCommand)
    }
    if (data.dboption === 'mysql') {
      process.env.MYSQL_PWD = data.password
      backupCommand = await RestoreMYSQL(data)
      console.log(backupCommand)
    }

    try {
      const response = await execCommand(backupCommand)
      console.log(response)
      return 'Database Restored'
    } catch (er) {
      console.log('aqui', er)
      return er
    }
  })
}
