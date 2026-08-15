import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X, Phone, Clock, Mail } from 'lucide-react'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/conditions', label: 'Conditions' },
  { to: '/services', label: 'Services' },
  { to: '/kshar-sutra', label: 'Kshar Sutra' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50">
      {/* Slim info bar */}
      <div className="hidden md:flex items-center justify-between bg-[var(--color-forest-deep)] text-white text-xs px-8 py-2">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5"><Phone size={13} className="text-[var(--color-gold-light)]" /> +91 76683 53121</span>
          <span className="flex items-center gap-1.5"><Clock size={13} className="text-[var(--color-gold-light)]" /> Daily 5–8 PM (Sun closed)</span>
        </div>
        <span className="flex items-center gap-1.5"><Mail size={13} className="text-[var(--color-gold-light)]" /> 2C/108, Awas Vikas Colony, Near LIC Office, Shikohabad, Firozabad, U.P. – 283135</span>
      </div>

      {/* Main navbar */}
      <div className={`bg-white transition-shadow duration-300 ${scrolled ? 'shadow-[0_4px_24px_-12px_rgba(20,51,94,0.25)]' : ''}`}>
        <nav className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/images/nakc-logo.png" alt="NAKC logo" className="w-12 h-12 object-contain group-hover:rotate-6 transition-transform" />
            <div className="leading-tight">
              <p className="font-display text-lg text-[var(--color-forest-deep)] tracking-tight">NAKC</p>
              <p className="text-[0.6rem] uppercase tracking-[0.1em] text-[var(--color-sage)] font-semibold">Nagarjuna Ayurveda &amp; Kshar-Sutra Centre</p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {links.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `text-sm font-semibold transition-colors relative pb-1 ${isActive ? 'text-[var(--color-forest)]' : 'text-[var(--color-ink)]/70 hover:text-[var(--color-forest)]'}`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && <span className="absolute left-0 -bottom-0.5 w-full h-[2px] bg-[var(--color-forest)] rounded-full" />}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link to="/appointment" className="btn-primary text-sm">Book Appointment</Link>
          </div>

          <button className="lg:hidden text-[var(--color-forest-deep)]" onClick={() => setOpen(o => !o)} aria-label="Toggle menu">
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </nav>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-[var(--color-sage-light)] px-5 py-5 flex flex-col gap-4">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)} className="text-[var(--color-forest-deep)] font-semibold">
              {l.label}
            </NavLink>
          ))}
          <Link to="/appointment" onClick={() => setOpen(false)} className="btn-primary text-center">Book Appointment</Link>
        </div>
      )}
    </header>
  )
}