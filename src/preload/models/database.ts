export interface IDatabase {
  hostname: string
  port: string
  user: string
  password: string
  database: string
  backupname: string
  dboption: 'pg_dump' | 'mysql_dump' | 'pg_restore' | 'mysql_restore'
}
