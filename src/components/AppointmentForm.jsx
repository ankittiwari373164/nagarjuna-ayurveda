import { useState } from 'react'
import toast from 'react-hot-toast'
import { supabase, supabaseReady } from '../lib/supabaseClient'
import { Loader2, CalendarCheck, QrCode, CheckCircle2 } from 'lucide-react'

const empty = {
  full_name: '', phone: '', email: '', age: '', gender: 'Male',
  condition: 'Piles (बवासीर)', preferred_date: '', preferred_time: '17:00', message: '',
}

const conditions = [
  'Piles (बवासीर)', 'Fistula (भगंदर)', 'Fissure (परिकर्तिका)', 'Pilonidal Sinus (नाड़ीब्रण)',
  'Hydrocele (हाइड्रोसील)', 'Digestive / Stomach Issue', 'Kidney / Liver Issue', 'General Consultation',
]

const CONSULT_FEE = 200 // ₹ token booking fee

export default function AppointmentForm() {
  const [form, setForm] = useState(empty)
  const [loading, setLoading] = useState(false)
  const [paidNow, setPaidNow] = useState(false)
  const [showQr, setShowQr] = useState(false)

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async e => {
    e.preventDefault()
    if (!form.full_name || !form.phone || !form.preferred_date) {
      toast.error('Please fill name, phone and preferred date')
      return
    }
    if (!supabaseReady) {
      toast.error('Connect Supabase first (see .env) to book appointments.')
      return
    }
    setLoading(true)
    const { error } = await supabase.from('appointments').insert([{
      ...form,
      age: form.age ? Number(form.age) : null,
      amount: CONSULT_FEE,
      payment_status: paidNow ? 'paid_pending_verification' : 'unpaid',
      payment_note: paidNow ? 'Patient marked as paid via UPI QR — please verify.' : 'Will pay at clinic',
    }])
    setLoading(false)
    if (error) return toast.error('Could not book: ' + error.message)
    toast.success(paidNow ? 'Thank you! We will verify your payment and confirm shortly.' : 'Appointment requested! We will confirm shortly.')
    setForm(empty)
    setPaidNow(false)
    setShowQr(false)
  }

  return (
    <form onSubmit={submit} className="grid md:grid-cols-2 gap-4">
      <div>
        <label>Full Name *</label>
        <input name="full_name" value={form.full_name} onChange={handle} placeholder="Your full name" />
      </div>
      <div>
        <label>Phone Number *</label>
        <input name="phone" value={form.phone} onChange={handle} placeholder="10-digit mobile" />
      </div>
      <div>
        <label>Email</label>
        <input name="email" type="email" value={form.email} onChange={handle} placeholder="optional" />
      </div>
      <div>
        <label>Age</label>
        <input name="age" type="number" value={form.age} onChange={handle} placeholder="e.g. 35" />
      </div>
      <div>
        <label>Gender</label>
        <select name="gender" value={form.gender} onChange={handle}>
          <option>Male</option><option>Female</option><option>Other</option>
        </select>
      </div>
      <div>
        <label>Condition / Concern</label>
        <select name="condition" value={form.condition} onChange={handle}>
          {conditions.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label>Preferred Date *</label>
        <input name="preferred_date" type="date" value={form.preferred_date} onChange={handle} min={new Date().toISOString().split('T')[0]} />
      </div>
      <div>
        <label>Preferred Time</label>
        <input name="preferred_time" type="time" value={form.preferred_time} onChange={handle} />
      </div>
      <div className="md:col-span-2">
        <label>Message (optional)</label>
        <textarea name="message" rows={3} value={form.message} onChange={handle} placeholder="Briefly describe your symptoms" />
      </div>

      {/* Payment section */}
      <div className="md:col-span-2 rounded-2xl border-2 border-[var(--color-sage-light)] bg-[var(--color-linen)] p-5">
        <p className="font-semibold text-[var(--color-forest-deep)] text-sm mb-1 flex items-center gap-2">
          <QrCode size={18} className="text-[var(--color-forest)]" /> Booking fee: ₹{CONSULT_FEE} (optional, secures your slot)
        </p>
        <p className="text-xs text-[var(--color-ink)]/55 mb-4">Scan &amp; pay by UPI, or simply pay at the clinic when you arrive.</p>

        {!showQr && (
          <button type="button" onClick={() => setShowQr(true)} className="btn-outline text-sm">
            Show UPI QR Code
          </button>
        )}

        {showQr && (
          <div className="flex flex-col sm:flex-row items-center gap-5 mt-2">
            <img src="/images/payment-qr.png" alt="Scan to pay via UPI — Anup Kumar" className="w-40 h-auto rounded-xl border-2 border-[var(--color-sage-light)] bg-white p-2" />
            <div className="text-sm text-[var(--color-ink)]/70 leading-relaxed">
              <p className="font-semibold text-[var(--color-forest-deep)] mb-1">Anup Kumar · Bank of India</p>
              <p>Open any UPI app (PhonePe, Google Pay, Paytm, etc.), scan the code and pay ₹{CONSULT_FEE}.</p>
              <label className="flex items-center gap-2 mt-3 !mb-0 font-normal text-[var(--color-ink)]">
                <input type="checkbox" checked={paidNow} onChange={e => setPaidNow(e.target.checked)} className="w-4 h-4" />
                <span className="!font-normal">I've completed the UPI payment</span>
              </label>
            </div>
          </div>
        )}
      </div>

      <div className="md:col-span-2 pt-1">
        <button disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
          {loading ? <Loader2 size={18} className="animate-spin" /> : paidNow ? <CheckCircle2 size={18} /> : <CalendarCheck size={18} />}
          {loading ? 'Booking...' : paidNow ? 'Confirm Booking — Payment Done' : 'Request Appointment'}
        </button>
        <p className="text-xs text-center text-[var(--color-ink)]/50 mt-2">Your slot is held once confirmed by our reception team.</p>
      </div>
    </form>
  )
}
