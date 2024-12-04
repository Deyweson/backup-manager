import { IDatabase } from '../../../preload/models/database'
import { BinPath } from '../bin-path'
import { execCommand } from '../execute-command'

export async function RestorePSQL(data: IDatabase): Promise<string> {
  const { hostname, port, user, database, backupname, dboption } = data

  try {
    const response = await execCommand(`${BinPath('psql')} -h ${hostname} -p ${port} -U ${user} -c "CREATE DATABASE ${database};"`)
    console.log(response)
  } catch (er) {
    if (er === 'string') {
      return er
    }
    return 'Error'
  }

  return `${BinPath(dboption)} -h ${hostname} -p ${port} -U ${user} -d ${database} -1 ${backupname}`
}
