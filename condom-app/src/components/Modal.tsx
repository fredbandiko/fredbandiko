import { X } from 'lucide-react'
import type { ReactNode } from 'react'

type ModalProps = { open: boolean; title: string; subtitle?: string; onClose: () => void; children: ReactNode; wide?: boolean }

export function Modal({ open, title, subtitle, onClose, children, wide = false }: ModalProps) {
  if (!open) return null
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className={`modal-card ${wide ? 'modal-card-wide' : ''}`} role="dialog" aria-modal="true" aria-label={title}>
        <div className="modal-header">
          <div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>
          <button className="icon-button" onClick={onClose} aria-label="Funga"><X size={18} /></button>
        </div>
        {children}
      </section>
    </div>
  )
}
