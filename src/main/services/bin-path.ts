import { is } from '@electron-toolkit/utils'
import { app } from 'electron'
import path from 'path'

export function BinPath(bin: string): string {
  const binName = `${bin}.exe`
  if (is.dev) {
    return path.join(app.getAppPath(), 'bin', binName)
  }
  return path.join(app.getAppPath(), '../app.asar.unpacked', 'bin', binName)
}
