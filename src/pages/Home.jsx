import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShieldCheck, HeartPulse, Leaf, Sparkles, Stethoscope, Phone, CheckCircle2, MapPin, Droplet, Flame, Hand, Waves, Baby, Scissors } from 'lucide-react'
import Reveal from '../components/Reveal'
import PatientIntakeForm from '../components/PatientIntakeForm'

const conditions = [
  { name: 'Piles (बवासीर)', icon: '🩸' },
  { name: 'Fistula (भगंदर)', icon: '🌀' },
  { name: 'Fissure (परिकर्तिका)', icon: '🔥' },
  { name: 'Pilonidal Sinus (नाड़ीब्रण)', icon: '📍' },
  { name: 'Hydrocele (हाइड्रोसील)', icon: '💧' },
  { name: 'Constipation (कब्ज)', icon: '🌿' },
  { name: 'Kidney Disorders', icon: '🫘' },
  { name: 'Liver Disorders', icon: '🫀' },
]

const symptoms = [
  'Bleeding or discharge during bowel movement?',
  'Feeling of piles / lump protruding outward?',
  'Pain or burning sensation while passing stool?',
  'Recurring boil near the anal region with pus discharge?',
  'Persistent itching around the anal area?',
]

const services = [
  { icon: Scissors, name: 'Kshar Sutra' },
  { icon: Sparkles, name: 'Laser Treatment' },
  { icon: Waves, name: 'Panchakarma' },
  { icon: Droplet, name: 'Leech Therapy' },
  { icon: Flame, name: 'Agnikarma' },
  { icon: Hand, name: 'Marma Therapy' },
  { icon: Waves, name: 'Basti Chikitsa' },
  { icon: Baby, name: 'Swarna Prashan' },
]

const stats = [
  { n: '2', l: 'Ayurvedic Medical Colleges Trained' },
  { n: '100%', l: 'Ayurvedic, Painless Approach' },
  { n: '0', l: 'Major Surgery Needed' },
  { n: '6', l: 'Days a Week Available' },
]

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden texture-paper">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[var(--color-sage-light)] opacity-40 blur-3xl" />
        <div className="absolute top-40 -left-32 w-72 h-72 rounded-full bg-[var(--color-gold-light)] opacity-20 blur-3xl" />

        <div className="max-w-7xl mx-auto px-5 md:px-8 pt-14 md:pt-20 pb-16 grid lg:grid-cols-2 gap-12 items-center relative">
          <div>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="eyebrow mb-4">
              NAKC · Shikohabad, Firozabad, U.P.
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] text-[var(--color-forest-deep)]"
            >
              Root-cause Ayurvedic care, <span className="italic text-[var(--color-clay)]">without the operation table.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-lg text-[var(--color-ink)]/75 max-w-xl leading-relaxed">
              Dr. Anup Kumar, B.A.M.S., M.S. (Ayu.) — an Ano-Rectal Surgeon and Kshar Sutra specialist —
              treats piles, fistula, fissure and digestive disorders using classical Ayurveda,
              with minimal pain and faster recovery.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-4">
              <Link to="/appointment" className="btn-primary">Book an Appointment</Link>
              <a href="tel:+917668353121" className="btn-outline flex items-center gap-2"><Phone size={16} /> Call 76683 53121</a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-10 grid grid-cols-4 gap-4 max-w-md">
              {stats.map(s => (
                <div key={s.l}>
                  <p className="font-display text-2xl text-[var(--color-forest)]">{s.n}</p>
                  <p className="text-[0.68rem] text-[var(--color-ink)]/55 leading-tight mt-1">{s.l}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="relative pb-8 pr-6"
          >
            <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] bg-[var(--color-sage-light)]" />
            <img src="/images/doctor-portrait.png" alt="Dr. Anup Kumar" className="relative rounded-[2rem] w-full object-cover shadow-2xl border-4 border-white" />
            <div className="absolute bottom-0 right-0 card-soft p-4 flex items-center gap-3 animate-floaty">
              <ShieldCheck className="text-[var(--color-forest)]" size={28} />
              <div>
                <p className="font-semibold text-sm text-[var(--color-forest-deep)]">Kshar Sutra Certified</p>
                <p className="text-xs text-[var(--color-ink)]/55">Govt. P.G. Ayurvedic College, Varanasi</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="vein-divider max-w-7xl mx-auto" />

      {/* SERVICES TEASER */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-16">
        <Reveal>
          <p className="eyebrow mb-3 text-center">Our Services</p>
          <h2 className="font-display text-3xl md:text-4xl text-center text-[var(--color-forest-deep)] mb-10">Classical Ayurvedic Therapies</h2>
        </Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {services.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.04}>
              <Link to="/services" className="flex flex-col items-center text-center gap-3 p-5 rounded-2xl bg-white border-2 border-[var(--color-sage-light)] hover:border-[var(--color-forest)] hover:-translate-y-1 transition-all h-full">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-linen-deep)] flex items-center justify-center">
                  <s.icon className="text-[var(--color-forest)]" size={22} />
                </div>
                <p className="text-sm font-semibold text-[var(--color-forest-deep)]">{s.name}</p>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal className="text-center mt-8">
          <Link to="/services" className="btn-outline">Explore all services</Link>
        </Reveal>
      </section>

      <div className="vein-divider max-w-7xl mx-auto" />

      {/* CONDITIONS */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-20">
        <Reveal>
          <p className="eyebrow mb-3 text-center">Conditions &amp; Care</p>
          <h2 className="font-display text-3xl md:text-4xl text-center text-[var(--color-forest-deep)] mb-4">What we treat, ayurvedically</h2>
          <p className="text-center text-[var(--color-ink)]/65 max-w-2xl mx-auto mb-12">
            Every treatment plan is built around the person, not the procedure — natural remedies, Kshar Sutra ligation and lifestyle correction, in that order.
          </p>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {conditions.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.05}>
              <div className="card-soft p-6 h-full hover:-translate-y-1.5 transition-transform duration-300">
                <div className="text-3xl mb-3">{c.icon}</div>
                <p className="font-semibold text-[var(--color-forest-deep)]">{c.name}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="text-center mt-10">
          <Link to="/conditions" className="btn-outline">See full conditions list</Link>
        </Reveal>
      </section>

      {/* SYMPTOM CHECK */}
      <section className="bg-[var(--color-forest-deep)] text-[var(--color-linen)]">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <p className="eyebrow mb-3">Self check</p>
            <h2 className="font-display text-3xl md:text-4xl mb-6">Do any of these sound familiar?</h2>
            <p className="text-[var(--color-linen)]/70 mb-8 leading-relaxed">
              These are early signs that shouldn't wait. If you recognise even one, an early Ayurvedic consultation
              can prevent the condition from progressing.
            </p>
            <Link to="/appointment" className="btn-primary !bg-[var(--color-gold)] !text-[var(--color-forest-deep)]">Get it checked today</Link>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="space-y-4">
              {symptoms.map(s => (
                <li key={s} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl px-5 py-4">
                  <CheckCircle2 className="text-[var(--color-gold-light)] shrink-0 mt-0.5" size={20} />
                  <span className="text-sm md:text-[0.95rem] text-[var(--color-linen)]/90">{s}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-20">
        <Reveal>
          <p className="eyebrow mb-3 text-center">Why patients choose us</p>
          <h2 className="font-display text-3xl md:text-4xl text-center text-[var(--color-forest-deep)] mb-12">Care that respects your body's own pace</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Leaf, title: 'Natural & Safe', text: 'Classical Ayurvedic formulations with no known major side effects.' },
            { icon: HeartPulse, title: 'Minimal Pain', text: 'Kshar Sutra therapy avoids the trauma of conventional surgery.' },
            { icon: Sparkles, title: 'Faster Recovery', text: 'Most patients resume daily routine within a few days.' },
            { icon: ShieldCheck, title: 'Lower Recurrence', text: 'Root-cause treatment lowers the chance of the condition returning.' },
            { icon: Stethoscope, title: 'Expert, Trusted Care', text: 'Trained at Govt. Ayurvedic Colleges, Bareilly &amp; Varanasi.' },
            { icon: MapPin, title: 'Personalised Plans', text: 'Every case is assessed individually — diet, lifestyle and medicine.' },
          ].map((f, i) => (
            <Reveal key={f.title} delay={i * 0.06}>
              <div className="p-7 rounded-2xl border border-[var(--color-sage-light)] bg-white/60 hover:bg-white transition-colors h-full">
                <f.icon className="text-[var(--color-clay)] mb-4" size={30} />
                <p className="font-display text-xl text-[var(--color-forest-deep)] mb-2">{f.title}</p>
                <p className="text-sm text-[var(--color-ink)]/65 leading-relaxed">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* RECEPTION FORM (home page, for walk-in patients) */}
      <section id="reception" className="bg-[var(--color-linen-deep)]">
        <div className="max-w-4xl mx-auto px-5 md:px-8 py-20">
          <Reveal>
            <p className="eyebrow mb-3 text-center">For our reception desk</p>
            <h2 className="font-display text-3xl md:text-4xl text-center text-[var(--color-forest-deep)] mb-3">Walk-in Patient Registration</h2>
            <p className="text-center text-[var(--color-ink)]/60 mb-10 max-w-xl mx-auto">
              Front-desk staff can record a new walk-in patient here — it's saved instantly to our patient records system.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card-soft p-6 md:p-10">
              <PatientIntakeForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-20">
        <Reveal>
          <div className="rounded-[2rem] bg-[var(--color-forest)] text-[var(--color-linen)] px-8 md:px-16 py-14 text-center relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-56 h-56 rounded-full bg-[var(--color-gold)] opacity-20 blur-3xl" />
            <h2 className="font-display text-3xl md:text-4xl mb-4">Book your consultation this week</h2>
            <p className="text-[var(--color-linen)]/75 max-w-xl mx-auto mb-8">
              Appointments open daily, 4:00 PM to 8:00 PM, and Sunday 10:00 AM to 1:00 PM. Slots are limited to give every patient enough time.
            </p>
            <Link to="/appointment" className="btn-primary !bg-[var(--color-gold)] !text-[var(--color-forest-deep)]">Book Appointment</Link>
          </div>
        </Reveal>
      </section>
    </div>
  )
}