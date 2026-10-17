export type Role = 'manager' | 'worker'
export type AccountStatus = 'Active' | 'Inactive'
export type DocumentStatus = 'Draft' | 'Sent' | 'Viewed' | 'Pending'

export type AppUser = {
  id: string
  name: string
  username: string
  role: Role
  workerId?: string
}

export type DocumentRecord = {
  id: string
  name: string
  uploadedAt: string
  size: string
  status: DocumentStatus
}

export type Worker = {
  id: string
  name: string
  username: string
  email: string
  phone: string
  branch: string
  status: AccountStatus
  lastUpload: string
  documents: DocumentRecord[]
}

export type Notification = {
  id: string
  title: string
  message: string
  recipient: string
  createdAt: string
  read: boolean
  sender: string
}

export type NewWorker = Omit<Worker, 'id' | 'lastUpload' | 'documents'> & {
  initialPassword: string
}
