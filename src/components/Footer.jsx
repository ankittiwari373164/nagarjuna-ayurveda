import { Phone, MapPin, Clock, Leaf } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[var(--color-forest-deep)] text-[var(--color-linen)] mt-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src="/images/nakc-logo.png" alt="NAKC logo" className="w-11 h-11 object-contain bg-white rounded-full p-0.5" />
            <div>
              <p className="font-display text-xl leading-tight">NAKC</p>
              <p className="text-[0.62rem] uppercase tracking-wide text-[var(--color-sage-light)]">Nagarjuna Ayurveda &amp; Kshar-Sutra Centre</p>
            </div>
          </div>
          <p className="text-sm text-[var(--color-sage-light)] leading-relaxed">
            Smart goal for better health — root-cause, ayurvedic, mostly-painless care for piles, fistula, fissure and digestive disorders, led by Dr. Anup Kumar.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-4">Explore</p>
          <ul className="space-y-2 text-sm text-[var(--color-linen)]/85">
            <li><Link to="/about" className="hover:text-[var(--color-gold-light)]">About Dr. Anup Kumar</Link></li>
            <li><Link to="/conditions" className="hover:text-[var(--color-gold-light)]">Conditions We Treat</Link></li>
            <li><Link to="/services" className="hover:text-[var(--color-gold-light)]">Our Services</Link></li>
            <li><Link to="/kshar-sutra" className="hover:text-[var(--color-gold-light)]">Kshar Sutra Therapy</Link></li>
            <li><Link to="/appointment" className="hover:text-[var(--color-gold-light)]">Book Appointment</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">Reach Us</p>
          <ul className="space-y-3 text-sm text-[var(--color-linen)]/85">
            <li className="flex gap-2"><MapPin size={16} className="text-[var(--color-gold-light)] shrink-0 mt-0.5" /> Station Road, Shikohabad, U.P.</li>
            <li className="flex gap-2"><Phone size={16} className="text-[var(--color-gold-light)] shrink-0 mt-0.5" /> +91 76683 53121 / +91 88649 90210</li>
            <li className="flex gap-2"><Clock size={16} className="text-[var(--color-gold-light)] shrink-0 mt-0.5" /> Daily, 5:00 PM – 8:00 PM (Sun closed)</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-[var(--color-linen)]/50 flex items-center justify-center gap-2">
        <Leaf size={12} /> © {new Date().getFullYear()} NAKC · Nagarjuna Ayurveda &amp; Kshar-Sutra Centre. All rights reserved.
      </div>
    </footer>
  )
}