import { Bell, Menu, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export function Topbar({ onMenu }: { onMenu: () => void }) {
  const { currentUser, notifications } = useApp()
  const unread = notifications.filter((item) => !item.read).length
  return <header className="topbar">
    <button className="mobile-menu" onClick={onMenu} aria-label="Fungua menu"><Menu size={22} /></button>
    <div className="topbar-search"><Search size={17} /><input placeholder="Tafuta kwenye mfumo..." aria-label="Tafuta" /></div>
    <div className="topbar-actions">
      <Link to={currentUser?.role === 'manager' ? '/manager/notifications' : '/worker/notifications'} className="notification-button" aria-label="Notifications"><Bell size={19} />{unread > 0 && <span>{unread}</span>}</Link>
      <div className="topbar-divider" />
      <div className="profile-chip"><div className="avatar avatar-small">{currentUser?.name.slice(0, 1)}</div><div><strong>{currentUser?.name}</strong><small>{currentUser?.role === 'manager' ? 'Manager / Admin' : 'Mfanyakazi'}</small></div></div>
    </div>
  </header>
}
