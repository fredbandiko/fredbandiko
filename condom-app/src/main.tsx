import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AppProvider, useApp } from './context/AppContext'
import { DocumentsPage } from './pages/DocumentsPage'
import { LoginPage } from './pages/LoginPage'
import { ManagerDashboard } from './pages/ManagerDashboard'
import { NotificationsPage } from './pages/NotificationsPage'
import { RegisterWorkerPage } from './pages/RegisterWorkerPage'
import { SettingsPage } from './pages/SettingsPage'
import { WorkerDashboard } from './pages/WorkerDashboard'
import { WorkerDetailsPage } from './pages/WorkerDetailsPage'
import './index.css'

function ShellRoute() {
  return <AppShell><Outlet /></AppShell>
}

function HomeRedirect() {
  const { currentUser } = useApp()
  return <Navigate to={currentUser ? (currentUser.role === 'manager' ? '/manager' : '/worker') : '/login'} replace />
}

function AppRoutes() {
  return <Routes>
    <Route path="/" element={<HomeRedirect />} />
    <Route path="/login" element={<LoginPage />} />
    <Route element={<ProtectedRoute role="manager" />}>
      <Route element={<ShellRoute />}>
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/manager/workers" element={<ManagerDashboard />} />
        <Route path="/manager/workers/:workerId" element={<WorkerDetailsPage />} />
        <Route path="/manager/documents" element={<DocumentsPage />} />
        <Route path="/manager/notifications" element={<NotificationsPage />} />
        <Route path="/manager/register" element={<RegisterWorkerPage />} />
        <Route path="/manager/settings" element={<SettingsPage />} />
      </Route>
    </Route>
    <Route element={<ProtectedRoute role="worker" />}>
      <Route element={<ShellRoute />}>
        <Route path="/worker" element={<WorkerDashboard />} />
        <Route path="/worker/documents" element={<DocumentsPage />} />
        <Route path="/worker/notifications" element={<NotificationsPage />} />
      </Route>
    </Route>
    <Route path="*" element={<HomeRedirect />} />
  </Routes>
}

createRoot(document.getElementById('root')!).render(<StrictMode><AppProvider><BrowserRouter basename={import.meta.env.BASE_URL}><AppRoutes /></BrowserRouter></AppProvider></StrictMode>)
