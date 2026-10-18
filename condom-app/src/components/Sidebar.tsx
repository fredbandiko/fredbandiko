import { BarChart3, Bell, ClipboardList, FileText, LayoutDashboard, LogOut, Settings, ShieldCheck, UserPlus, Users, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import type { Role } from '../types'

const managerLinks = [
  { to: '/manager', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/manager/workers', label: 'Wafanyakazi', icon: Users },
  { to: '/manager/documents', label: 'Documents', icon: FileText },
  { to: '/manager/notifications', label: 'Notification Center', icon: Bell },
  { to: '/manager/register', label: 'Sajili Mfanyakazi', icon: UserPlus },
  { to: '/manager/settings', label: 'Settings', icon: Settings },
]

const workerLinks = [
  { to: '/worker', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/worker/documents', label: 'Documents Zangu', icon: FileText },
  { to: '/worker/notifications', label: 'Ujumbe', icon: Bell },
]

export function Sidebar({ role, mobileOpen, onClose }: { role: Role; mobileOpen: boolean; onClose: () => void }) {
  const { currentUser, notifications, logout } = useApp()
  const links = role === 'manager' ? managerLinks : workerLinks
  const unread = notifications.filter((item) => !item.read && (role === 'manager' || item.recipient === 'all-workers' || item.recipient === currentUser?.workerId)).length
  return <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
    <div className="sidebar-brand">
      <div className="brand-mark">K<span>•</span></div>
      <div><strong>KDM System</strong><small>Usambazaji wa Kondomu</small></div>
      <button className="mobile-close" onClick={onClose} aria-label="Funga menu"><X size={19} /></button>
    </div>
    <div className="sidebar-section-label">MENU KUU</div>
    <nav className="sidebar-nav">
      {links.map(({ to, label, icon: Icon, end }) => <NavLink key={to} to={to} end={end} onClick={onClose} className={({ isActive }) => isActive ? 'nav-item nav-item-active' : 'nav-item'}><Icon size={18} /><span>{label}</span>{(label === 'Notification Center' || label === 'Ujumbe') && unread > 0 && <span className="nav-count">{unread}</span>}</NavLink>)}
    </nav>
    <div className="sidebar-help">
      <div className="help-icon"><ShieldCheck size={18} /></div>
      <strong>Demo mode</strong>
      <p>Data hii ni ya kuonyesha prototype pekee.</p>
    </div>
    <button className="nav-item sidebar-logout" onClick={logout}><LogOut size={18} /><span>Logout</span></button>
    <div className="sidebar-footer"><BarChart3 size={14} /> <span>KDM v1.0 · Prototype</span></div>
  </aside>
}
