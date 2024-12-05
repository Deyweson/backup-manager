import path from 'path'
import { IDatabase } from '../../../preload/models/database'
import { app } from 'electron'
import { BinPath } from '../bin-path'

export function BackupMYSQL(data: IDatabase): string {
  const { hostname, port, user, database, backupname } = data

  const backupName = `${backupname}_backup.sql`

  const backupPath = path.join(app.getPath('documents'), 'sql-backup-tool/')

  return `${BinPath('mysql_dump')} -h ${hostname} -P ${port} -u ${user} ${database} > ${backupPath + backupName}`
}
