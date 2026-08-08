import { useState } from 'react'
import toast from 'react-hot-toast'
import { supabase, supabaseReady } from '../lib/supabaseClient'
import { Loader2, UserPlus } from 'lucide-react'

const empty = { full_name: '', phone: '', age: '', gender: 'Male', address: '', condition: 'Piles (बवासीर)', notes: '' }

const conditions = [
  'Piles (बवासीर)', 'Fistula (भगंदर)', 'Fissure (परिकर्तिका)', 'Pilonidal Sinus (नाड़ीब्रण)',
  'Hydrocele (हाइड्रोसील)', 'Constipation (कब्ज)', 'Kidney Disorder', 'Liver Disorder', 'Other',
]

export default function PatientIntakeForm({ compact = false }) {
  const [form, setForm] = useState(empty)
  const [loading, setLoading] = useState(false)

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async e => {
    e.preventDefault()
    if (!form.full_name || !form.phone) {
      toast.error('Name and phone are required')
      return
    }
    if (!supabaseReady) {
      toast.error('Connect Supabase first (see .env) to save patient records.')
      return
    }
    setLoading(true)
    const { error } = await supabase.from('patients').insert([{
      ...form,
      age: form.age ? Number(form.age) : null,
      created_by: 'reception',
    }])
    setLoading(false)
    if (error) {
      toast.error('Could not save: ' + error.message)
    } else {
      toast.success('Patient record saved successfully')
      setForm(empty)
    }
  }

  return (
    <form onSubmit={submit} className={`grid ${compact ? 'sm:grid-cols-2' : 'md:grid-cols-2'} gap-4`}>
      <div>
        <label>Patient Full Name *</label>
        <input name="full_name" value={form.full_name} onChange={handle} placeholder="e.g. Ramesh Chandra" />
      </div>
      <div>
        <label>Phone Number *</label>
        <input name="phone" value={form.phone} onChange={handle} placeholder="10-digit mobile" />
      </div>
      <div>
        <label>Age</label>
        <input name="age" type="number" value={form.age} onChange={handle} placeholder="e.g. 42" />
      </div>
      <div>
        <label>Gender</label>
        <select name="gender" value={form.gender} onChange={handle}>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </div>
      <div className={compact ? 'sm:col-span-2' : 'md:col-span-2'}>
        <label>Address</label>
        <input name="address" value={form.address} onChange={handle} placeholder="Village / City" />
      </div>
      <div>
        <label>Condition</label>
        <select name="condition" value={form.condition} onChange={handle}>
          {conditions.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label>Notes</label>
        <input name="notes" value={form.notes} onChange={handle} placeholder="Optional remarks" />
      </div>

      <div className={`${compact ? 'sm:col-span-2' : 'md:col-span-2'} pt-2`}>
        <button disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
          {loading ? <Loader2 size={18} className="animate-spin" /> : <UserPlus size={18} />}
          {loading ? 'Saving...' : 'Save Patient Record'}
        </button>
      </div>
    </form>
  )
}
