import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import { Loader2, LogIn, Leaf } from 'lucide-react'

export default function AdminLogin() {
  const { signIn } = useAuth()
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async e => {
    e.preventDefault()
    setLoading(true)
    const { error } = await signIn(email, password)
    setLoading(false)
    if (error) toast.error(error.message)
    else { toast.success('Welcome back'); nav('/admin') }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-forest-deep)] px-5 texture-paper">
      <div className="card-soft w-full max-w-md p-8 md:p-10">
        <div className="flex items-center gap-3 mb-8 justify-center">
          <img src="/images/nakc-logo.png" alt="NAKC logo" className="w-12 h-12 object-contain" />
          <div>
            <p className="font-display text-lg text-[var(--color-forest-deep)]">NAKC</p>
            <p className="text-[0.65rem] uppercase tracking-widest text-[var(--color-sage)]">Admin Panel</p>
          </div>
        </div>

        {!import.meta.env.VITE_ADMIN_PASSWORD && (
          <p className="text-xs bg-amber-50 border border-amber-200 text-amber-700 rounded-lg p-3 mb-5 leading-relaxed">
            No admin password is set yet. Add <code>VITE_ADMIN_EMAIL</code> and <code>VITE_ADMIN_PASSWORD</code> to
            your <code>.env</code> file to enable login.
          </p>
        )}

        <form onSubmit={submit} className="space-y-4">
          <div><label>Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@clinic.com" required /></div>
          <div><label>Password</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required /></div>
          <button disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
            {loading ? <Loader2 size={18} className="animate-spin" /> : <LogIn size={18} />} {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <Link to="/" className="flex items-center justify-center gap-1 text-xs text-[var(--color-ink)]/50 mt-6 hover:text-[var(--color-forest)]">
          <Leaf size={12} /> Back to website
        </Link>
      </div>
    </div>
  )
}