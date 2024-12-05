import { IDatabase } from '../../../preload/models/database'
import { BinPath } from '../bin-path'
import { execCommand } from '../execute-command'

export async function RestoreMYSQL(data: IDatabase): Promise<string> {
  const { hostname, port, user, database, backupname, dboption } = data

  try {
    const response = await execCommand(`${BinPath(dboption)} -h ${hostname} -P ${port} -u ${user} -e "CREATE DATABASE IF NOT EXISTS ${database};"`)
    console.log(response)
  } catch (er) {
    if (er === 'string') {
      return er
    }
    return 'Error'
  }

  return `${BinPath(dboption)} -h ${hostname} -P ${port} -u ${user} ${database} < ${backupname}`
}
