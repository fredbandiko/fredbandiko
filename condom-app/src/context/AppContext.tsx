import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { initialNotifications, initialWorkers } from '../data'
import type { AppUser, DocumentRecord, NewWorker, Notification, Worker } from '../types'

type Toast = { message: string; type: 'success' | 'error' | 'info' }

type AppContextValue = {
  currentUser: AppUser | null
  workers: Worker[]
  notifications: Notification[]
  toast: Toast | null
  login: (username: string, password: string) => AppUser | null
  logout: () => void
  addWorker: (worker: NewWorker) => boolean
  addDocument: (workerId: string, document: DocumentRecord) => void
  updateDocument: (workerId: string, documentId: string, status: DocumentRecord['status']) => void
  deleteDocument: (workerId: string, documentId: string) => void
  markNotificationRead: (notificationId: string) => void
  sendMessage: (title: string, message: string, recipient: string) => void
  showToast: (message: string, type?: Toast['type']) => void
  clearToast: () => void
}

const AppContext = createContext<AppContextValue | null>(null)

const demoUsers: AppUser[] = [
  { id: 'admin', name: 'Admin', username: 'admin', role: 'manager' },
  { id: 'worker-user', name: 'Mfanyakazi', username: 'mfanyakazi', role: 'worker', workerId: 'w-asha' },
]

function readStorage<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) as T : fallback
  } catch {
    return fallback
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AppUser | null>(() => readStorage<AppUser | null>('kdm-user', null))
  const [workers, setWorkers] = useState<Worker[]>(() => readStorage('kdm-workers', initialWorkers))
  const [notifications, setNotifications] = useState<Notification[]>(() => readStorage('kdm-notifications', initialNotifications))
  const [toast, setToast] = useState<Toast | null>(null)

  useEffect(() => { localStorage.setItem('kdm-workers', JSON.stringify(workers)) }, [workers])
  useEffect(() => { localStorage.setItem('kdm-notifications', JSON.stringify(notifications)) }, [notifications])

  const showToast = (message: string, type: Toast['type'] = 'success') => setToast({ message, type })
  const clearToast = () => setToast(null)

  const login = (username: string, password: string) => {
    const user = demoUsers.find((item) => item.username === username)
    if (user && password === '123') {
      setCurrentUser(user)
      localStorage.setItem('kdm-user', JSON.stringify(user))
      return user
    }
    const worker = workers.find((item) => item.username === username && (item.demoPassword === password || (password === '123' && !item.demoPassword)))
    if (!worker) return null
    const workerUser: AppUser = { id: worker.id, name: worker.name, username: worker.username, role: 'worker', workerId: worker.id }
    setCurrentUser(workerUser)
    localStorage.setItem('kdm-user', JSON.stringify(workerUser))
    return workerUser
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem('kdm-user')
  }

  const addWorker = (worker: NewWorker) => {
    if (workers.some((item) => item.username.toLowerCase() === worker.username.trim().toLowerCase())) return false
    const newWorker: Worker = { ...worker, name: worker.name.trim(), username: worker.username.trim().toLowerCase(), email: worker.email.trim().toLowerCase(), demoPassword: worker.initialPassword, id: `w-${Date.now()}`, lastUpload: '—', documents: [] }
    setWorkers((current) => [newWorker, ...current])
    showToast(`${worker.name} amesajiliwa kwenye mfumo.`)
    return true
  }

  const addDocument = (workerId: string, document: DocumentRecord) => {
    setWorkers((current) => current.map((worker) => worker.id === workerId
      ? { ...worker, documents: [document, ...worker.documents], lastUpload: document.uploadedAt }
      : worker))
  }

  const updateDocument = (workerId: string, documentId: string, status: DocumentRecord['status']) => {
    setWorkers((current) => current.map((worker) => worker.id === workerId
      ? { ...worker, documents: worker.documents.map((document) => document.id === documentId ? { ...document, status } : document) }
      : worker))
  }

  const deleteDocument = (workerId: string, documentId: string) => {
    setWorkers((current) => current.map((worker) => worker.id === workerId
      ? { ...worker, documents: worker.documents.filter((document) => document.id !== documentId) }
      : worker))
    showToast('PDF imefutwa kwenye mock data.', 'info')
  }

  const markNotificationRead = (notificationId: string) => {
    setNotifications((current) => current.map((item) => item.id === notificationId ? { ...item, read: true } : item))
  }

  const sendMessage = (title: string, message: string, recipient: string) => {
    const newNotification: Notification = {
      id: `note-${Date.now()}`,
      title,
      message,
      recipient,
      createdAt: 'Leo, sasa hivi',
      read: false,
      sender: 'Admin',
    }
    setNotifications((current) => [newNotification, ...current])
    showToast('Ujumbe umetumwa kwa mafanikio.')
  }

  const value = useMemo(() => ({ currentUser, workers, notifications, toast, login, logout, addWorker, addDocument, updateDocument, deleteDocument, markNotificationRead, sendMessage, showToast, clearToast }), [currentUser, workers, notifications, toast])
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp lazima itumike ndani ya AppProvider')
  return context
}
