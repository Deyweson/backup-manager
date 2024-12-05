import { useEffect, useState } from 'react'
import { InputBackup } from '../backup-page/components/input-backup'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { MessageModal } from '../modal/message-modal'
import { Loader } from '../components/loader/loader'
import { GetLocalStorage } from '@renderer/utils/localstorage'

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

export function RestorePage(): JSX.Element {
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [modal, setModal] = useState<boolean>(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm<DBSchema>({
    resolver: zodResolver(dbSchema)
  })

  async function submit(data: DBSchema): Promise<void> {
    try {
      setLoading(true)
      const response = await window.api.Restore(data)
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

  async function handleSelectFile(): Promise<void> {
    const result = await window.api.SelectFile()
    setValue('backupname', result)
  }

  useEffect(() => {
    const inputs = GetLocalStorage()
    if (inputs !== null) {
      setValue('hostname', inputs.hostname)
      setValue('port', inputs.port)
      setValue('user', inputs.user)
      setValue('password', inputs.password)
      setValue('database', inputs.database)
    }
  }, [])

  return (
    <div className="backup-page">
      {loading ? <Loader /> : <></>}
      {modal ? <MessageModal message={message} setModal={setModal} /> : <></>}
      <h1>Restore Backup</h1>
      <form onSubmit={handleSubmit(submit)}>
        <select className="dboption" {...register('dboption')}>
          <option value="pg_restore">PostgreSQL</option>
          <option value="mysql">MySQL</option>
        </select>

        <InputBackup label="Hostname:" field="hostname" register={register} error={errors.hostname} />
        <InputBackup label="Port:" field="port" register={register} error={errors.port} />
        <InputBackup label="User:" field="user" register={register} error={errors.user} />
        <InputBackup label="Password:" field="password" register={register} error={errors.password} />
        <InputBackup label="Database:" field="database" register={register} error={errors.database} />
        <InputBackup label="Backup Path:" field="backupname" register={register} error={errors.backupname} />

        <button type="button" onClick={() => handleSelectFile()}>
          Select Backup
        </button>

        <button type="submit">Restore</button>
      </form>

      <button className="home-btn" onClick={() => navigate('/')}>
        Home
      </button>
    </div>
  )
}
