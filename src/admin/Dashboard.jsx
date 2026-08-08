import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase, supabaseReady } from '../lib/supabaseClient'
import { Users, CalendarClock, IndianRupee, MessageSquare } from 'lucide-react'

export default function Dashboard() {
  const [stats, setStats] = useState({ patients: 0, appointments: 0, pending: 0, revenue: 0 })
  const [recent, setRecent] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabaseReady) { setLoading(false); return }
    (async () => {
      const [{ count: patients }, { count: appointments }, { count: pending }, { data: paidRows }, { data: recentAppts }] = await Promise.all([
        supabase.from('patients').select('*', { count: 'exact', head: true }),
        supabase.from('appointments').select('*', { count: 'exact', head: true }),
        supabase.from('appointments').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('appointments').select('amount').eq('payment_status', 'paid'),
        supabase.from('appointments').select('*').order('created_at', { ascending: false }).limit(6),
      ])
      const revenue = (paidRows || []).reduce((s, r) => s + Number(r.amount || 0), 0)
      setStats({ patients: patients || 0, appointments: appointments || 0, pending: pending || 0, revenue })
      setRecent(recentAppts || [])
      setLoading(false)
    })()
  }, [])

  const cards = [
    { label: 'Total Patients', value: stats.patients, icon: Users, to: '/admin/patients' },
    { label: 'Total Appointments', value: stats.appointments, icon: CalendarClock, to: '/admin/appointments' },
    { label: 'Pending Requests', value: stats.pending, icon: MessageSquare, to: '/admin/appointments' },
    { label: 'Revenue Collected', value: `₹${stats.revenue}`, icon: IndianRupee, to: '/admin/appointments' },
  ]

  return (
    <div>
      <h1 className="font-display text-3xl text-[var(--color-forest-deep)] mb-1">Dashboard</h1>
      <p className="text-[var(--color-ink)]/55 mb-8">Overview of patients, appointments and payments.</p>

      {!supabaseReady && (
        <div className="bg-amber-50 border border-amber-200 text-amber-700 text-sm rounded-xl p-4 mb-8">
          Supabase is not connected. Add credentials to <code>.env</code> and run <code>supabase_schema.sql</code> to see live data.
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {cards.map(c => (
          <Link key={c.label} to={c.to} className="card-soft p-6 hover:-translate-y-1 transition-transform">
            <c.icon className="text-[var(--color-clay)] mb-3" size={26} />
            <p className="font-display text-2xl text-[var(--color-forest-deep)]">{loading ? '…' : c.value}</p>
            <p className="text-xs text-[var(--color-ink)]/55 mt-1">{c.label}</p>
          </Link>
        ))}
      </div>

      <div className="card-soft p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-xl text-[var(--color-forest-deep)]">Recent Appointments</h2>
          <Link to="/admin/appointments" className="text-sm text-[var(--color-forest)] font-semibold">View all →</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[var(--color-ink)]/50 border-b border-[var(--color-sage-light)]">
                <th className="py-2 pr-4">Name</th><th className="py-2 pr-4">Phone</th><th className="py-2 pr-4">Date</th><th className="py-2 pr-4">Status</th><th className="py-2">Payment</th>
              </tr>
            </thead>
            <tbody>
              {recent.map(a => (
                <tr key={a.id} className="border-b border-[var(--color-sage-light)]/50">
                  <td className="py-3 pr-4 font-medium text-[var(--color-forest-deep)]">{a.full_name}</td>
                  <td className="py-3 pr-4">{a.phone}</td>
                  <td className="py-3 pr-4">{a.preferred_date}</td>
                  <td className="py-3 pr-4 capitalize">{a.status}</td>
                  <td className="py-3 capitalize">{a.payment_status}</td>
                </tr>
              ))}
              {!loading && recent.length === 0 && (
                <tr><td colSpan={5} className="py-6 text-center text-[var(--color-ink)]/40">No appointments yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
