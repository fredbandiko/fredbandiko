import { useEffect, useState, type ReactNode } from 'react'
import { useApp } from '../context/AppContext'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'

export function AppShell({ children }: { children: ReactNode }) {
  const { currentUser, toast, clearToast } = useApp()
  const [mobileOpen, setMobileOpen] = useState(false)
  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(clearToast, 3600)
    return () => window.clearTimeout(timer)
  }, [toast, clearToast])
  if (!currentUser) return null
  return <div className="app-layout">
    <Sidebar role={currentUser.role} mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    {mobileOpen && <div className="sidebar-overlay" onClick={() => setMobileOpen(false)} />}
    <div className="app-shell-main"><Topbar onMenu={() => setMobileOpen(true)} /><main className="page-content">{children}</main></div>
    {toast && <div className={`toast toast-${toast.type}`} role="status"><span className="toast-dot" />{toast.message}<button onClick={clearToast}>×</button></div>}
  </div>
}
