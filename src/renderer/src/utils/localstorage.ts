interface inputs {
  hostname: string
  port: string
  user: string
  password: string
  database: string
}

export function GetLocalStorage(): inputs {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const input: inputs = JSON.parse(localStorage.getItem('inputs'))
  console.log()
  return input
}

export function SetLocalStorage(data: inputs): void {
  localStorage.setItem('inputs', JSON.stringify(data))
}
