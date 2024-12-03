import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import './styles/backup-page.css'
import { Loader } from './components/loader/loader'
import { useState } from 'react'
import { MessageModal } from './modal/message-modal'

const dbSchema = z.object({
  hostname: z.string().nonempty(),
  port: z.string().nonempty(),
  user: z.string().nonempty(),
  password: z.string().nonempty(),
  database: z.string().nonempty()
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
    console.log(data)
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
      <h1>Backup Manager</h1>
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <label>Hostname:</label>
          <input
            type="text"
            {...register('hostname')}
            style={{ borderColor: errors.hostname ? 'red' : '' }}
          />
        </div>

        <div>
          <label>Port:</label>
          <input
            type="text"
            {...register('port')}
            style={{ borderColor: errors.port ? 'red' : '' }}
          />
        </div>

        <div>
          <label>User:</label>
          <input
            type="text"
            {...register('user')}
            style={{ borderColor: errors.user ? 'red' : '' }}
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="text"
            {...register('password')}
            style={{ borderColor: errors.password ? 'red' : '' }}
          />
        </div>

        <div>
          <label>Database:</label>
          <input
            type="text"
            {...register('database')}
            style={{ borderColor: errors.database ? 'red' : '' }}
          />
        </div>
        <button>Backup</button>
      </form>

      <button className="home-btn" onClick={() => navigate('/')}>
        Home
      </button>
    </div>
  )
}
