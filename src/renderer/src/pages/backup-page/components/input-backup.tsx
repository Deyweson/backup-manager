import { FieldError, UseFormRegister } from 'react-hook-form'
import { DBSchema } from '../backup-page'

interface props {
  label: string
  field: 'hostname' | 'port' | 'user' | 'password' | 'database' | 'backupname'
  register: UseFormRegister<DBSchema>
  error: FieldError | undefined
}

export function InputBackup({ label, field, register, error }: props): JSX.Element {
  return (
    <div>
      <label>{label}</label>
      <input type="text" {...register(field)} style={{ borderColor: error ? 'red' : '' }} />
    </div>
  )
}
