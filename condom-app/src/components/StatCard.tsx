import type { LucideIcon } from 'lucide-react'

type StatCardProps = { label: string; value: string | number; detail: string; icon: LucideIcon; tone?: 'navy' | 'mint' | 'amber' | 'violet' }

export function StatCard({ label, value, detail, icon: Icon, tone = 'navy' }: StatCardProps) {
  return <article className={`stat-card stat-${tone}`}>
    <div className="stat-icon"><Icon size={20} strokeWidth={2.1} /></div>
    <div className="stat-copy"><p>{label}</p><strong>{value}</strong><span>{detail}</span></div>
  </article>
}
