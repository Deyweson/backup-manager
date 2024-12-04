import { exec } from 'child_process'

export function execCommand(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(command, (__error, stdout, stderr) => {
      if (stderr) {
        reject(stderr)
      }
      resolve(stdout)
    })
  })
}
