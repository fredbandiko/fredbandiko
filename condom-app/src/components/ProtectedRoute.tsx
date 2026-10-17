import { Navigate, Outlet } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import type { Role } from '../types'

export function ProtectedRoute({ role }: { role?: Role }) {
  const { currentUser } = useApp()
  if (!currentUser) return <Navigate to="/login" replace />
  if (role && currentUser.role !== role) return <Navigate to={currentUser.role === 'manager' ? '/manager' : '/worker'} replace />
  return <Outlet />
}
