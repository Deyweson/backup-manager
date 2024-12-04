import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import './backup-page.css'
import { Loader } from '../components/loader/loader'
import { useState } from 'react'
import { MessageModal } from '../modal/message-modal'
import { InputBackup } from './components/input-backup'

export const dbSchema = z.object({
  hostname: z.string().nonempty(),
  port: z.string().nonempty(),
  user: z.string().nonempty(),
  password: z.string().nonempty(),
  database: z.string().nonempty(),
  backupname: z.string().nonempty(),
  dboption: z.string()
})
export type DBSchema = z.infer<typeof dbSchema>

export function BackupPage(): JSX.Element {
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [modal, setModal] = useState<boolean>(false)

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<DBSchema>({
    resolver: zodResolver(dbSchema)
  })

  async function submit(data: DBSchema): Promise<void> {
    try {
      setLoading(true)
      const response = await window.api.Backup(data)
      console.log(response)
      setMessage(response)
      setModal(true)
    } catch (er) {
      console.log(er)
      if (er === 'string') {
        setMessage(er)
        setModal(true)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="backup-page">
      {loading ? <Loader /> : <></>}
      {modal ? <MessageModal message={message} setModal={setModal} /> : <></>}
      <h1>Create Backup</h1>
      <form onSubmit={handleSubmit(submit)}>
        <select className="dboption" {...register('dboption')}>
          <option value="pg_dump">PostgreSQL</option>
          <option value="mysql_dump">MySQL</option>
        </select>

        <InputBackup label="Hostname:" field="hostname" register={register} error={errors.hostname} />
        <InputBackup label="Port:" field="port" register={register} error={errors.port} />
        <InputBackup label="User:" field="user" register={register} error={errors.user} />
        <InputBackup label="Password:" field="password" register={register} error={errors.password} />
        <InputBackup label="Database:" field="database" register={register} error={errors.database} />
        <InputBackup label="Backup Name:" field="backupname" register={register} error={errors.backupname} />

        <button>Backup</button>
      </form>

      <button className="home-btn" onClick={() => navigate('/')}>
        Home
      </button>
    </div>
  )
}
