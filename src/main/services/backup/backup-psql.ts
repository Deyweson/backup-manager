import path from 'path'
import { IDatabase } from '../../../preload/models/database'
import { app } from 'electron'
import { BinPath } from '../bin-path'

export function BackupPSQL(data: IDatabase): string {
  const { hostname, port, user, database, backupname, dboption } = data

  const backupName = `${backupname}_${dboption}.sql`

  const backupPath = path.join(app.getPath('documents'), 'sql-backup-tool/')

  return `${BinPath(dboption)} -h ${hostname} -p ${port} -U ${user} -F t -d ${database} -f ${backupPath + backupName}`
}
