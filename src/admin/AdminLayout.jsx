import { NavLink, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LayoutDashboard, Users, CalendarClock, LogOut, UserPlus, Leaf } from 'lucide-react'

const nav = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/patients', label: 'Patients', icon: Users },
  { to: '/admin/add-patient', label: 'Add Patient', icon: UserPlus },
  { to: '/admin/appointments', label: 'Appointments', icon: CalendarClock },
]

export default function AdminLayout() {
  const { session, loading, signOut } = useAuth()
  const navigate = useNavigate()

  if (loading) return <div className="min-h-screen flex items-center justify-center text-[var(--color-forest)]">Loading…</div>
  if (!session) return <Navigate to="/admin/login" replace />

  const logout = async () => { await signOut(); navigate('/admin/login') }

  return (
    <div className="min-h-screen flex bg-[var(--color-linen-deep)]">
      <aside className="w-64 shrink-0 bg-[var(--color-forest-deep)] text-[var(--color-linen)] hidden md:flex flex-col">
        <div className="flex items-center gap-3 px-6 py-6 border-b border-white/10">
          <img src="/images/nakc-logo.png" alt="NAKC logo" className="w-10 h-10 object-contain bg-white rounded-full p-0.5" />
          <div>
            <p className="font-display text-base leading-tight">NAKC</p>
            <p className="text-[0.62rem] uppercase tracking-widest text-[var(--color-sage-light)]">Admin Panel</p>
          </div>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1">
          {nav.map(n => (
            <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive ? 'bg-[var(--color-gold)] text-[var(--color-forest-deep)]' : 'text-[var(--color-linen)]/75 hover:bg-white/10'}`
            }>
              <n.icon size={18} /> {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="px-4 py-6 border-t border-white/10 space-y-3">
          <a href="/" className="flex items-center gap-2 text-xs text-[var(--color-linen)]/50 hover:text-[var(--color-gold-light)] px-2">
            <Leaf size={12} /> View website
          </a>
          <button onClick={logout} className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-[var(--color-linen)]/85 hover:bg-white/10">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden flex items-center justify-between px-5 py-4 bg-[var(--color-forest-deep)] text-[var(--color-linen)]">
          <p className="font-display">NAKC Admin</p>
          <button onClick={logout}><LogOut size={20} /></button>
        </header>
        <main className="flex-1 p-5 md:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  )
}