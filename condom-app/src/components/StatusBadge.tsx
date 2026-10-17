import type { AccountStatus, DocumentStatus } from '../types'

export function StatusBadge({ status }: { status: AccountStatus | DocumentStatus }) {
  const tone = status === 'Active' || status === 'Viewed' ? 'success' : status === 'Inactive' ? 'muted' : status === 'Sent' ? 'blue' : 'warning'
  return <span className={`status-badge status-${tone}`}><span className="status-dot" />{status}</span>
}
