import { useState } from 'react'
import toast from 'react-hot-toast'
import { supabase, supabaseReady } from '../lib/supabaseClient'
import { Loader2, CalendarCheck, QrCode, CheckCircle2, Upload, ImageIcon } from 'lucide-react'

const empty = {
  full_name: '', phone: '', email: '', age: '', gender: 'Male',
  condition: 'Piles (बवासीर)', preferred_date: '', preferred_time: '17:00', message: '',
}

const conditions = [
  'Piles (बवासीर)', 'Fistula (भगंदर)', 'Fissure (परिकर्तिका)', 'Pilonidal Sinus (नाड़ीब्रण)',
  'Hydrocele (हाइड्रोसील)', 'Digestive / Stomach Issue', 'Kidney / Liver Issue', 'General Consultation',
]

const CONSULT_FEE = 300 // ₹ booking fee, required to confirm the slot

export default function AppointmentForm() {
  const [form, setForm] = useState(empty)
  const [loading, setLoading] = useState(false)
  const [paidNow, setPaidNow] = useState(false)
  const [txnId, setTxnId] = useState('')
  const [screenshotFile, setScreenshotFile] = useState(null)
  const [screenshotPreview, setScreenshotPreview] = useState(null)
  const [uploading, setUploading] = useState(false)

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleScreenshot = e => {
    const file = e.target.files?.[0]
    if (!file) return
    setScreenshotFile(file)
    setScreenshotPreview(URL.createObjectURL(file))
  }

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
    if (!paidNow) {
      toast.error(`Please pay the ₹${CONSULT_FEE} booking fee to confirm your appointment`)
      return
    }
    if (!txnId.trim()) {
      toast.error('Please enter your UPI transaction ID')
      return
    }
    if (!screenshotFile) {
      toast.error('Please upload a screenshot of your payment')
      return
    }

    setLoading(true)
    setUploading(true)

    let screenshotUrl = null
    const fileExt = screenshotFile.name.split('.').pop()
    const fileName = `${Date.now()}-${form.phone}.${fileExt}`
    const { error: uploadError } = await supabase.storage
      .from('payment-screenshots')
      .upload(fileName, screenshotFile)

    setUploading(false)

    if (uploadError) {
      setLoading(false)
      toast.error('Could not upload screenshot: ' + uploadError.message)
      return
    }
    const { data: publicUrlData } = supabase.storage.from('payment-screenshots').getPublicUrl(fileName)
    screenshotUrl = publicUrlData?.publicUrl || null

    const { error } = await supabase.from('appointments').insert([{
      ...form,
      age: form.age ? Number(form.age) : null,
      amount: CONSULT_FEE,
      payment_status: 'paid_pending_verification',
      payment_note: 'Patient marked as paid via UPI QR — please verify.',
      transaction_id: txnId.trim(),
      payment_screenshot_url: screenshotUrl,
    }])
    setLoading(false)
    if (error) return toast.error('Could not book: ' + error.message)
    toast.success('Thank you! We will verify your payment and confirm shortly.')
    setForm(empty)
    setPaidNow(false)
    setTxnId('')
    setScreenshotFile(null)
    setScreenshotPreview(null)
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
          <QrCode size={18} className="text-[var(--color-forest)]" /> Booking fee: ₹{CONSULT_FEE} (required to confirm your slot)
        </p>
        <p className="text-xs text-[var(--color-ink)]/55 mb-4">Scan &amp; pay by UPI, then enter your transaction ID and upload a screenshot below.</p>

        <div className="flex flex-col sm:flex-row items-start gap-5">
          <img src="/images/payment-qr.png" alt="Scan to pay via UPI — Anup Kumar" className="w-40 h-auto rounded-xl border-2 border-[var(--color-sage-light)] bg-white p-2 shrink-0" />
          <div className="text-sm text-[var(--color-ink)]/70 leading-relaxed flex-1 w-full">
            <p className="font-semibold text-[var(--color-forest-deep)] mb-1">Anup Kumar · Bank of India</p>
            <p>Open any UPI app (PhonePe, Google Pay, Paytm, etc.), scan the code and pay ₹{CONSULT_FEE}.</p>

            <div className="mt-4">
              <label>Transaction / UPI Reference ID *</label>
              <input value={txnId} onChange={e => setTxnId(e.target.value)} placeholder="e.g. 123456789012" />
            </div>

            <div className="mt-4">
              <label>Upload Payment Screenshot *</label>
              <label className="flex items-center gap-2 cursor-pointer border-2 border-dashed border-[var(--color-sage-light)] rounded-xl px-4 py-3 hover:border-[var(--color-forest)] transition-colors bg-white">
                {screenshotPreview ? (
                  <img src={screenshotPreview} alt="Payment screenshot preview" className="w-12 h-12 object-cover rounded-lg" />
                ) : (
                  <ImageIcon size={20} className="text-[var(--color-ink)]/40" />
                )}
                <span className="text-sm text-[var(--color-ink)]/70 flex-1">
                  {screenshotFile ? screenshotFile.name : 'Tap to choose a screenshot'}
                </span>
                <Upload size={16} className="text-[var(--color-forest)]" />
                <input type="file" accept="image/*" onChange={handleScreenshot} className="hidden" />
              </label>
            </div>

            <label className="flex items-center gap-2 mt-4 !mb-0 font-normal text-[var(--color-ink)]">
              <input type="checkbox" checked={paidNow} onChange={e => setPaidNow(e.target.checked)} className="w-4 h-4" />
              <span className="!font-normal">I've completed the UPI payment</span>
            </label>
          </div>
        </div>
      </div>

      <div className="md:col-span-2 pt-1">
        <button disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
          {loading ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle2 size={18} />}
          {loading ? (uploading ? 'Uploading screenshot...' : 'Booking...') : 'Confirm Booking — Payment Done'}
        </button>
        <p className="text-xs text-center text-[var(--color-ink)]/50 mt-2">Your slot is held once confirmed by our reception team.</p>
      </div>
    </form>
  )
}