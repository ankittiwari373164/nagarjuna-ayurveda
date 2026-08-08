import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { supabase, supabaseReady } from '../lib/supabaseClient'
import { exportToExcel } from '../lib/exportExcel'
import { Download, Search, Trash2, UserPlus } from 'lucide-react'

export default function Patients() {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [q, setQ] = useState('')

  const load = async () => {
    if (!supabaseReady) { setLoading(false); return }
    setLoading(true)
    const { data, error } = await supabase.from('patients').select('*').order('created_at', { ascending: false })
    if (error) toast.error(error.message)
    setPatients(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const remove = async id => {
    if (!confirm('Delete this patient record?')) return
    const { error } = await supabase.from('patients').delete().eq('id', id)
    if (error) toast.error(error.message)
    else { toast.success('Patient deleted'); setPatients(p => p.filter(x => x.id !== id)) }
  }

  const filtered = patients.filter(p =>
    p.full_name?.toLowerCase().includes(q.toLowerCase()) || p.phone?.includes(q)
  )

  const doExport = () => {
    if (filtered.length === 0) return toast.error('No patients to export')
    exportToExcel(filtered.map(p => ({
      Name: p.full_name, Phone: p.phone, Age: p.age, Gender: p.gender,
      Address: p.address, Condition: p.condition, Notes: p.notes,
      'Registered By': p.created_by, 'Registered On': new Date(p.created_at).toLocaleString(),
    })), 'patients.xlsx', 'Patients')
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl text-[var(--color-forest-deep)]">Patients</h1>
          <p className="text-[var(--color-ink)]/55">All registered patient records.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/admin/add-patient" className="btn-outline flex items-center gap-2 text-sm"><UserPlus size={16} /> Add Patient</Link>
          <button onClick={doExport} className="btn-primary flex items-center gap-2 text-sm"><Download size={16} /> Export Excel</button>
        </div>
      </div>

      <div className="relative max-w-sm mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-ink)]/40" />
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by name or phone" className="pl-9" />
      </div>

      <div className="card-soft p-6 overflow-x-auto">
        <table className="w-full text-sm min-w-[720px]">
          <thead>
            <tr className="text-left text-[var(--color-ink)]/50 border-b border-[var(--color-sage-light)]">
              <th className="py-2 pr-4">Name</th><th className="py-2 pr-4">Phone</th><th className="py-2 pr-4">Age/Gender</th>
              <th className="py-2 pr-4">Condition</th><th className="py-2 pr-4">Registered</th><th className="py-2"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} className="border-b border-[var(--color-sage-light)]/50">
                <td className="py-3 pr-4 font-medium text-[var(--color-forest-deep)]">{p.full_name}</td>
                <td className="py-3 pr-4">{p.phone}</td>
                <td className="py-3 pr-4">{p.age || '—'} / {p.gender}</td>
                <td className="py-3 pr-4">{p.condition}</td>
                <td className="py-3 pr-4">{new Date(p.created_at).toLocaleDateString()}</td>
                <td className="py-3 text-right">
                  <button onClick={() => remove(p.id)} className="text-[var(--color-clay)] hover:opacity-70"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
            {!loading && filtered.length === 0 && (
              <tr><td colSpan={6} className="py-8 text-center text-[var(--color-ink)]/40">No patients found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
