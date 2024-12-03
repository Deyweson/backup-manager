import { ElectronAPI } from '@electron-toolkit/preload'
import IDatabase from './models/database'

interface IApi {
  Backup: (data: IDatabase) => Promise<string>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: IApi
  }
}
