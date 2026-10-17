import type { Notification, Worker } from './types'

export const initialWorkers: Worker[] = [
  {
    id: 'w-asha',
    name: 'Asha Mushi',
    username: 'asha.mushi',
    email: 'asha.mushi@kdm.demo',
    phone: '+255 712 341 220',
    branch: 'Kinondoni',
    status: 'Active',
    lastUpload: '16 Okt 2026, 09:24',
    documents: [
      { id: 'doc-asha-1', name: 'Taarifa_Wiki_41_Asha.pdf', uploadedAt: '16 Okt 2026, 09:24', size: '1.8 MB', status: 'Sent' },
      { id: 'doc-asha-2', name: 'Stock_Count_Asha.pdf', uploadedAt: '10 Okt 2026, 14:05', size: '860 KB', status: 'Viewed' },
    ],
  },
  {
    id: 'w-juma',
    name: 'Juma Said',
    username: 'juma.said',
    email: 'juma.said@kdm.demo',
    phone: '+255 754 902 118',
    branch: 'Temeke',
    status: 'Active',
    lastUpload: '15 Okt 2026, 16:42',
    documents: [
      { id: 'doc-juma-1', name: 'Taarifa_Wiki_41_Juma.pdf', uploadedAt: '15 Okt 2026, 16:42', size: '2.1 MB', status: 'Pending' },
      { id: 'doc-juma-2', name: 'Distribution_Log_Juma.pdf', uploadedAt: '08 Okt 2026, 11:17', size: '1.2 MB', status: 'Sent' },
    ],
  },
  {
    id: 'w-neema',
    name: 'Neema Joseph',
    username: 'neema.joseph',
    email: 'neema.joseph@kdm.demo',
    phone: '+255 687 121 399',
    branch: 'Ilala',
    status: 'Inactive',
    lastUpload: '05 Okt 2026, 10:10',
    documents: [
      { id: 'doc-neema-1', name: 'Taarifa_Wiki_40_Neema.pdf', uploadedAt: '05 Okt 2026, 10:10', size: '1.4 MB', status: 'Viewed' },
    ],
  },
]

export const initialNotifications: Notification[] = [
  {
    id: 'note-1',
    title: 'Taarifa ya wiki',
    message: 'Wasilisha taarifa za wiki hii kabla ya Ijumaa.',
    recipient: 'all-workers',
    createdAt: '16 Okt 2026, 08:45',
    read: false,
    sender: 'Admin',
  },
  {
    id: 'note-2',
    title: 'Hongera kwa kazi nzuri',
    message: 'Asha, asante kwa kutuma taarifa zako kwa wakati.',
    recipient: 'w-asha',
    createdAt: '15 Okt 2026, 15:20',
    read: false,
    sender: 'Admin',
  },
  {
    id: 'note-3',
    title: 'Ratiba ya field visit',
    message: 'Kumbuka ku-update stock count baada ya field visit.',
    recipient: 'w-juma',
    createdAt: '14 Okt 2026, 10:05',
    read: true,
    sender: 'Admin',
  },
]
