import './ModalConfirm.css';

interface ModalConfirmProps {
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ModalConfirm({ title, message, onCancel, onConfirm }: ModalConfirmProps) {
  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onCancel}>Cancelar</button>
          <button className="btn-confirm" onClick={onConfirm}>Confirmar</button>
        </div>
      </div>
    </div>
  );
}
