import './message-modal.css'

interface props {
  message: string
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}

export function MessageModal({ message, setModal }: props): JSX.Element {
  return (
    <div className="message-modal-container">
      <div className="message-modal">
        <p>{message}</p>

        <button onClick={() => setModal(false)}>Ok</button>
      </div>
    </div>
  )
}
