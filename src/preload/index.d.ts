import { ElectronAPI } from '@electron-toolkit/preload'
import IDatabase from './models/database'

interface IApi {
  Backup: (data: IDatabase) => Promise<string>
  Restore: (data: IDatabase) => Promise<string>
  SelectFile: () => Promise<string>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: IApi
  }
}
