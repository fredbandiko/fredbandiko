import { Bell, Check, ChevronDown, ChevronUp, Mail, MessageCircle, Send, Users } from 'lucide-react'
import { useMemo, useState, type FormEvent } from 'react'
import { useApp } from '../context/AppContext'
import { StatusBadge } from '../components/StatusBadge'

export function NotificationsPage() {
  const { currentUser, workers, notifications, markNotificationRead, sendMessage } = useApp()
  const isManager = currentUser?.role === 'manager'
  const [expanded, setExpanded] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [recipient, setRecipient] = useState('all-workers')
  const visible = useMemo(() => isManager ? notifications : notifications.filter((item) => item.recipient === 'all-workers' || item.recipient === currentUser?.workerId), [isManager, notifications, currentUser?.workerId])
  const submit = (event: FormEvent) => { event.preventDefault(); if (!title.trim() || !message.trim()) return; sendMessage(title, message, recipient); setTitle(''); setMessage('') }
  const open = (id: string) => { setExpanded(expanded === id ? null : id); markNotificationRead(id) }
  return <>
    <div className="page-heading-row"><div><span className="eyebrow">{isManager ? 'COMMUNICATION CENTER' : 'MESSAGES'}</span><h1>{isManager ? 'Notification Center' : 'Ujumbe wangu'}</h1><p>{isManager ? 'Wasiliana na wafanyakazi na fuatilia taarifa zilizotumwa.' : 'Soma maelekezo na updates kutoka kwa manager wako.'}</p></div>{!isManager && <div className="notification-summary"><Bell size={18} /><span><strong>{visible.filter((item) => !item.read).length}</strong> unread</span></div>}</div>
    <div className={`notification-layout ${!isManager ? 'notification-layout-single' : ''}`}>
      {isManager && <section className="content-card compose-card"><div className="card-heading"><div><span className="eyebrow">NEW MESSAGE</span><h2>Tuma ujumbe</h2></div><div className="compose-icon"><Send size={19} /></div></div><form onSubmit={submit} className="compose-form"><label>Recipient<select value={recipient} onChange={(e) => setRecipient(e.target.value)}><option value="all-workers">Wafanyakazi wote</option>{workers.map((worker) => <option value={worker.id} key={worker.id}>{worker.name} · {worker.branch}</option>)}</select></label><label>Title<input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Mf. Taarifa ya wiki" required /></label><label>Message<textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Andika ujumbe wako hapa..." rows={5} required /></label><button className="primary-button" type="submit"><Send size={16} />Tuma Ujumbe</button></form></section>}
      <section className="content-card notification-list-card"><div className="card-heading"><div><span className="eyebrow">{isManager ? 'ALL UPDATES' : 'INBOX'}</span><h2>{isManager ? 'Notifications zote' : 'Ujumbe kutoka kwa manager'}</h2></div><span className="unread-chip"><Mail size={14} />{visible.filter((item) => !item.read).length} mpya</span></div><div className="notification-list">{visible.map((item) => <article key={item.id} className={`notification-item ${!item.read ? 'notification-unread' : ''}`}><div className="notification-item-icon"><Bell size={17} /></div><div className="notification-item-body"><div className="notification-item-top"><div><strong>{item.title}</strong>{!item.read && <span className="new-dot">NEW</span>}</div><span>{item.createdAt}</span></div><p className={expanded === item.id ? '' : 'notification-truncate'}>{item.message}</p>{expanded === item.id && <div className="notification-meta"><span><Users size={13} />Kwa: {item.recipient === 'all-workers' ? 'Wafanyakazi wote' : workers.find((worker) => worker.id === item.recipient)?.name ?? item.recipient}</span><span><MessageCircle size={13} />Kutoka: {item.sender}</span></div>}<button className="notification-open" onClick={() => open(item.id)}>{expanded === item.id ? <><ChevronUp size={14} />Funga ujumbe</> : <><ChevronDown size={14} />Fungua ujumbe</>}</button></div><StatusBadge status={item.read ? 'Viewed' : 'Pending'} /></article>)}</div>{visible.length === 0 && <div className="empty-state"><Mail size={26} /><strong>Hakuna ujumbe</strong><span>Ujumbe mpya utaonekana hapa.</span></div>}</section>
    </div>
  </>
}
