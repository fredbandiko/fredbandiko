import { Eye, EyeOff, LockKeyhole, LogIn, ShieldCheck, UserRound } from 'lucide-react'
import { useEffect, useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export function LoginPage() {
  const { currentUser, login } = useApp()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (currentUser) navigate(currentUser.role === 'manager' ? '/manager' : '/worker', { replace: true })
  }, [currentUser, navigate])

  if (currentUser) return <Navigate to={currentUser.role === 'manager' ? '/manager' : '/worker'} replace />

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setError('')
    setLoading(true)
    window.setTimeout(() => {
      const user = login(username.trim().toLowerCase(), password)
      if (!user) {
        setError('Username au password si sahihi. Tumia credentials za demo zilizoonyeshwa hapa chini.')
        setLoading(false)
        return
      }
      navigate(user.role === 'manager' ? '/manager' : '/worker', { replace: true })
      setLoading(false)
    }, 650)
  }

  return <div className="login-page">
    <div className="login-visual">
      <div className="login-orbit orbit-one" /><div className="login-orbit orbit-two" />
      <div className="login-visual-content">
        <div className="brand-lockup"><div className="brand-mark brand-mark-large">K<span>•</span></div><div><strong>KDM System</strong><small>Usambazaji wa Kondomu</small></div></div>
        <div className="login-hero-copy"><span className="eyebrow light-eyebrow">MFUMO WA TAARIFA</span><h1>Unganisha field na maamuzi bora.</h1><p>Sehemu moja ya kupokea, kusoma na kufuatilia taarifa za usambazaji kwa uwazi.</p></div>
        <div className="login-trust"><div className="trust-icon"><ShieldCheck size={20} /></div><div><strong>Demo prototype salama</strong><span>Inatumia mock data tu — hakuna taarifa za production.</span></div></div>
      </div>
      <div className="login-visual-footer"><span>© 2026 KDM System</span><span>Prototype ya majaribio</span></div>
    </div>
    <div className="login-panel">
      <div className="login-panel-inner">
        <div className="mobile-login-brand"><div className="brand-mark">K<span>•</span></div><strong>KDM System</strong></div>
        <div className="login-heading"><span className="eyebrow">KARIBU TENA</span><h2>Ingia kwenye mfumo</h2><p>Weka taarifa zako ili kuendelea kwenye dashboard yako.</p></div>
        <form className="login-form" onSubmit={handleSubmit}>
          <label>Username<div className="input-with-icon"><UserRound size={17} /><input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="mf. admin" autoComplete="username" required /></div></label>
          <label>Password<div className="input-with-icon"><LockKeyhole size={17} /><input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Weka password" autoComplete="current-password" required /><button type="button" className="input-action" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Ficha password' : 'Onyesha password'}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div></label>
          {error && <div className="form-error"><span>!</span>{error}</div>}
          <button className="primary-button login-submit" disabled={loading}>{loading ? <><span className="spinner" />Inaingia...</> : <><LogIn size={18} />Ingia kwenye mfumo</>}</button>
        </form>
        <div className="demo-accounts"><div className="demo-header"><span>DEMO ACCOUNTS</span><span className="demo-pill">Kwa preview tu</span></div><div className="demo-row"><span><b>Manager</b><small>admin</small></span><code>123</code></div><div className="demo-row"><span><b>Mfanyakazi</b><small>mfanyakazi</small></span><code>123</code></div></div>
        <p className="login-footnote">Kwa kutumia mfumo huu unaendelea kwenye mazingira ya majaribio ya KDM System.</p>
      </div>
    </div>
  </div>
}
