import { ipcMain } from 'electron'
import { IDatabase } from '../../../preload/models/database'
import { BackupPSQL } from './backup-psql'
import { execCommand } from '../execute-command'
import { BackupMYSQL } from './backup-mysql'

export function Backup(): void {
  ipcMain.handle('backup', async (__event, data: IDatabase) => {
    let backupCommand = ''

    if (data.dboption === 'pg_dump') {
      process.env.PGPASSWORD = data.password
      backupCommand = BackupPSQL(data)
      console.log(backupCommand)
    }
    if (data.dboption === 'mysql_dump') {
      process.env.MYSQL_PWD = data.password
      backupCommand = BackupMYSQL(data)
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
