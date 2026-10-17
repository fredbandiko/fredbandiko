import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
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
  addWorker: (worker: NewWorker) => void
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

const getStoredUser = (): AppUser | null => {
  try {
    const saved = localStorage.getItem('kdm-user')
    return saved ? JSON.parse(saved) : null
  } catch {
    return null
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AppUser | null>(getStoredUser)
  const [workers, setWorkers] = useState<Worker[]>(initialWorkers)
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const [toast, setToast] = useState<Toast | null>(null)

  const showToast = (message: string, type: Toast['type'] = 'success') => setToast({ message, type })
  const clearToast = () => setToast(null)

  const login = (username: string, password: string) => {
    if (password !== '123') return null
    const user = demoUsers.find((item) => item.username === username)
    if (!user) return null
    setCurrentUser(user)
    localStorage.setItem('kdm-user', JSON.stringify(user))
    return user
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem('kdm-user')
  }

  const addWorker = (worker: NewWorker) => {
    const newWorker: Worker = { ...worker, id: `w-${Date.now()}`, lastUpload: '—', documents: [] }
    setWorkers((current) => [newWorker, ...current])
    showToast(`${worker.name} amesajiliwa kwenye mfumo.`)
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
