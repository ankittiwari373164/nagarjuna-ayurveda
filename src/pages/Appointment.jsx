import Reveal from '../components/Reveal'
import AppointmentForm from '../components/AppointmentForm'
import { Clock, MapPin, Phone } from 'lucide-react'

export default function Appointment() {
  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 grid lg:grid-cols-5 gap-12">
      <Reveal className="lg:col-span-2">
        <p className="eyebrow mb-3">Get in touch</p>
        <h1 className="font-display text-4xl text-[var(--color-forest-deep)] mb-5">Book your appointment</h1>
        <p className="text-[var(--color-ink)]/65 leading-relaxed mb-8">
          Fill in your details and preferred slot. A small booking fee secures your consultation time —
          or choose to pay at the clinic instead.
        </p>
        <div className="space-y-5">
          <div className="flex gap-3">
            <Clock className="text-[var(--color-gold)] shrink-0" size={20} />
            <div>
              <p className="font-semibold text-[var(--color-forest-deep)] text-sm">Clinic Hours</p>
              <p className="text-sm text-[var(--color-ink)]/60">Daily, 5:00 PM – 8:00 PM (Sunday closed)</p>
            </div>
          </div>
          <div className="flex gap-3">
            <MapPin className="text-[var(--color-gold)] shrink-0" size={20} />
            <div>
              <p className="font-semibold text-[var(--color-forest-deep)] text-sm">Location</p>
              <p className="text-sm text-[var(--color-ink)]/60">NAKC, 2C/108, Awas Vikas Colony, Near LIC Office, Shikohabad, Firozabad, U.P. – 283135</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Phone className="text-[var(--color-gold)] shrink-0" size={20} />
            <div>
              <p className="font-semibold text-[var(--color-forest-deep)] text-sm">Call Direct</p>
              <p className="text-sm text-[var(--color-ink)]/60">+91 94570 88602 · +91 76683 53121</p>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1} className="lg:col-span-3">
        <div className="card-soft p-6 md:p-10">
          <AppointmentForm />
        </div>
      </Reveal>
    </div>
  )
}