import { useState } from 'react'
import toast from 'react-hot-toast'
import Reveal from '../components/Reveal'
import { supabase, supabaseReady } from '../lib/supabaseClient'
import { Loader2, Send, MapPin, Phone, Clock } from 'lucide-react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)

  const submit = async e => {
    e.preventDefault()
    if (!form.name || !form.message) return toast.error('Please add your name and message')
    if (!supabaseReady) return toast.error('Connect Supabase first (see .env).')
    setLoading(true)
    const { error } = await supabase.from('enquiries').insert([form])
    setLoading(false)
    if (error) toast.error('Could not send: ' + error.message)
    else { toast.success('Message sent — we will call you back.'); setForm({ name: '', phone: '', email: '', message: '' }) }
  }

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 grid lg:grid-cols-2 gap-12">
      <Reveal>
        <p className="eyebrow mb-3">Contact</p>
        <h1 className="font-display text-4xl text-[var(--color-forest-deep)] mb-5">We'd love to hear from you</h1>
        <p className="text-[var(--color-ink)]/65 leading-relaxed mb-8">
          Have a question before booking? Send us a message and our team will call you back within a day.
        </p>
        <div className="space-y-5 mb-10">
          <div className="flex gap-3"><MapPin className="text-[var(--color-gold)]" size={20} /><p className="text-sm text-[var(--color-ink)]/70">2C/108, Awas Vikas Colony, Near LIC Office, Shikohabad, Firozabad, Uttar Pradesh – 283135</p></div>
          <div className="flex gap-3"><Phone className="text-[var(--color-gold)]" size={20} /><p className="text-sm text-[var(--color-ink)]/70">+91 76683 53121 · +91 88649 90210</p></div>
          <div className="flex gap-3"><Clock className="text-[var(--color-gold)]" size={20} /><p className="text-sm text-[var(--color-ink)]/70">Daily 4:00 PM – 8:00 PM · Sunday 10:00 AM – 1:00 PM</p></div>
        </div>
        <div className="rounded-2xl overflow-hidden border border-[var(--color-sage-light)] h-64">
          <iframe
            title="Clinic location"
            className="w-full h-full"
            loading="lazy"
            src="https://www.google.com/maps?q=2C%2F108+Awas+Vikas+Colony+Near+LIC+Office+Shikohabad+Firozabad+Uttar+Pradesh+283135&output=embed"
          />
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="card-soft p-6 md:p-10">
          <form onSubmit={submit} className="space-y-4">
            <div><label>Name *</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" /></div>
            <div><label>Phone</label><input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="10-digit mobile" /></div>
            <div><label>Email</label><input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="optional" /></div>
            <div><label>Message *</label><textarea rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="How can we help?" /></div>
            <button disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />} {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </Reveal>
    </div>
  )
}