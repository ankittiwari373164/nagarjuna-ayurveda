import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { supabase, supabaseReady } from '../lib/supabaseClient'
import { exportToExcel } from '../lib/exportExcel'
import { Download, Search, ImageOff } from 'lucide-react'

const statuses = ['pending', 'confirmed', 'completed', 'cancelled']

export default function Appointments() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState('all')

  const load = async () => {
    if (!supabaseReady) { setLoading(false); return }
    setLoading(true)
    const { data, error } = await supabase.from('appointments').select('*').order('created_at', { ascending: false })
    if (error) toast.error(error.message)
    setRows(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const updateStatus = async (id, status) => {
    const { error } = await supabase.from('appointments').update({ status }).eq('id', id)
    if (error) toast.error(error.message)
    else setRows(r => r.map(x => x.id === id ? { ...x, status } : x))
  }

  const updatePayment = async (id, payment_status) => {
    const { error } = await supabase.from('appointments').update({ payment_status }).eq('id', id)
    if (error) toast.error(error.message)
    else { toast.success('Payment status updated'); setRows(r => r.map(x => x.id === id ? { ...x, payment_status } : x)) }
  }

  const filtered = rows.filter(r => {
    const matchQ = r.full_name?.toLowerCase().includes(q.toLowerCase()) || r.phone?.includes(q)
    const matchF = filter === 'all' || r.status === filter
    return matchQ && matchF
  })

  const doExport = () => {
    if (filtered.length === 0) return toast.error('No appointments to export')
    exportToExcel(filtered.map(a => ({
      Name: a.full_name, Phone: a.phone, Email: a.email, Age: a.age, Gender: a.gender,
      Condition: a.condition, Date: a.preferred_date, Time: a.preferred_time,
      Status: a.status, Payment: a.payment_status, Amount: a.amount, 'Payment Note': a.payment_note,
      'Transaction ID': a.transaction_id, 'Payment Screenshot': a.payment_screenshot_url,
      Message: a.message, 'Booked On': new Date(a.created_at).toLocaleString(),
    })), 'appointments.xlsx', 'Appointments')
  }

  const badge = s => ({
    pending: 'bg-amber-100 text-amber-700', confirmed: 'bg-blue-100 text-blue-700',
    completed: 'bg-emerald-100 text-emerald-700', cancelled: 'bg-red-100 text-red-700',
  }[s] || 'bg-gray-100 text-gray-700')

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl text-[var(--color-forest-deep)]">Appointments</h1>
          <p className="text-[var(--color-ink)]/55">Manage bookings, payment status and confirmations.</p>
        </div>
        <button onClick={doExport} className="btn-primary flex items-center gap-2 text-sm"><Download size={16} /> Export Excel</button>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative max-w-sm flex-1 min-w-[220px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-ink)]/40" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by name or phone" className="pl-9" />
        </div>
        <select value={filter} onChange={e => setFilter(e.target.value)} className="max-w-[180px]">
          <option value="all">All statuses</option>
          {statuses.map(s => <option key={s} value={s} className="capitalize">{s}</option>)}
        </select>
      </div>

      <div className="card-soft p-6 overflow-x-auto">
        <table className="w-full text-sm min-w-[1000px]">
          <thead>
            <tr className="text-left text-[var(--color-ink)]/50 border-b border-[var(--color-sage-light)]">
              <th className="py-2 pr-4">Name</th><th className="py-2 pr-4">Phone</th><th className="py-2 pr-4">Date/Time</th>
              <th className="py-2 pr-4">Condition</th><th className="py-2 pr-4">Payment</th><th className="py-2 pr-4">Proof</th><th className="py-2 pr-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(a => (
              <tr key={a.id} className="border-b border-[var(--color-sage-light)]/50">
                <td className="py-3 pr-4 font-medium text-[var(--color-forest-deep)]">{a.full_name}</td>
                <td className="py-3 pr-4">{a.phone}</td>
                <td className="py-3 pr-4">{a.preferred_date} · {a.preferred_time}</td>
                <td className="py-3 pr-4">{a.condition}</td>
                <td className="py-3 pr-4">
                  <select
                    value={a.payment_status}
                    onChange={e => updatePayment(a.id, e.target.value)}
                    className={`!py-1.5 !px-2 text-xs font-semibold rounded-full border-0 ${
                      a.payment_status === 'paid' ? 'bg-emerald-100 text-emerald-700'
                      : a.payment_status === 'paid_pending_verification' ? 'bg-amber-100 text-amber-700'
                      : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <option value="unpaid">Unpaid</option>
                    <option value="paid_pending_verification">Paid — Verify</option>
                    <option value="paid">Paid ✓</option>
                  </select>
                  <p className="text-[0.65rem] text-[var(--color-ink)]/40 mt-1">₹{a.amount}</p>
                </td>
                <td className="py-3 pr-4">
                  {a.payment_screenshot_url ? (
                    <a href={a.payment_screenshot_url} target="_blank" rel="noopener noreferrer" className="block">
                      <img
                        src={a.payment_screenshot_url}
                        alt="Payment screenshot"
                        className="w-14 h-14 object-cover rounded-lg border border-[var(--color-sage-light)] hover:opacity-80 transition-opacity"
                      />
                    </a>
                  ) : (
                    <div className="w-14 h-14 flex items-center justify-center rounded-lg border border-dashed border-[var(--color-sage-light)] text-[var(--color-ink)]/25">
                      <ImageOff size={18} />
                    </div>
                  )}
                  {a.transaction_id && (
                    <p className="text-[0.65rem] text-[var(--color-ink)]/50 mt-1 max-w-[110px] truncate" title={a.transaction_id}>
                      Txn: {a.transaction_id}
                    </p>
                  )}
                </td>
                <td className="py-3 pr-4">
                  <select value={a.status} onChange={e => updateStatus(a.id, e.target.value)} className={`!py-1.5 !px-2 text-xs font-semibold rounded-full ${badge(a.status)}`}>
                    {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
            {!loading && filtered.length === 0 && (
              <tr><td colSpan={7} className="py-8 text-center text-[var(--color-ink)]/40">No appointments found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}