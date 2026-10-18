import { ArrowLeft, CheckCircle2, UserPlus } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export function RegisterWorkerPage() {
  const { addWorker, showToast } = useApp()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', username: '', email: '', phone: '', branch: 'Kinondoni', initialPassword: '', confirmPassword: '', status: 'Active' as 'Active' | 'Inactive' })
  const [error, setError] = useState('')
  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }))
  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (form.initialPassword !== form.confirmPassword) { setError('Password na confirm password hazifanani.'); return }
    if (form.initialPassword.length < 3) { setError('Password ya awali iwe na angalau characters 3.'); return }
    setError('')
    const created = addWorker({ name: form.name, username: form.username, email: form.email, phone: form.phone, branch: form.branch, status: form.status, initialPassword: form.initialPassword })
    if (!created) { setError('Username hiyo tayari ipo. Chagua username nyingine.'); return }
    showToast('Mfanyakazi amesajiliwa kwa mafanikio.')
    navigate('/manager/workers')
  }
  return <>
    <div className="breadcrumb-row"><Link className="back-link" to="/manager"><ArrowLeft size={16} />Rudi Dashboard</Link><span>/</span><strong>Sajili Mfanyakazi</strong></div>
    <div className="page-heading-row"><div><span className="eyebrow">WORKER MANAGEMENT</span><h1>Sajili mfanyakazi mpya</h1><p>Jaza taarifa hizi kuunda akaunti ya demo ya mfanyakazi.</p></div></div>
    <section className="content-card form-card"><div className="form-card-intro"><div className="form-hero-icon"><UserPlus size={23} /></div><div><h2>Taarifa za akaunti</h2><p>Fields zenye <b>*</b> ni lazima zijazwe. Hii ni mock registration kwa prototype.</p></div></div><form className="worker-form" onSubmit={submit}><div className="form-section-label">TAARIFA BINAFSI</div><div className="form-grid"><label>Jina kamili *<input value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Mf. Amina Hassan" required /></label><label>Username *<input value={form.username} onChange={(e) => update('username', e.target.value)} placeholder="amina.hassan" required /></label><label>Email address *<input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="amina@kdm.demo" required /></label><label>Namba ya simu *<input value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+255 7xx xxx xxx" required /></label><label>Eneo / Branch<select value={form.branch} onChange={(e) => update('branch', e.target.value)}><option>Kinondoni</option><option>Temeke</option><option>Ilala</option><option>Ubungo</option><option>Arusha</option></select></label><label>Account status<select value={form.status} onChange={(e) => update('status', e.target.value as 'Active' | 'Inactive')}><option value="Active">Active</option><option value="Inactive">Inactive</option></select></label></div><div className="form-section-label form-section-spaced">PASSWORD YA AWALI</div><div className="form-grid"><label>Password ya awali *<input type="password" value={form.initialPassword} onChange={(e) => update('initialPassword', e.target.value)} placeholder="Weka password" required /></label><label>Confirm password *<input type="password" value={form.confirmPassword} onChange={(e) => update('confirmPassword', e.target.value)} placeholder="Rudia password" required /></label></div>{error && <div className="form-error"><span>!</span>{error}</div>}<div className="form-footer"><span><CheckCircle2 size={16} />Akaunti itatengenezwa kwenye mock data</span><div><Link to="/manager" className="secondary-button">Cancel</Link><button className="primary-button" type="submit"><UserPlus size={16} />Sajili Mfanyakazi</button></div></div></form></section>
  </>
}
