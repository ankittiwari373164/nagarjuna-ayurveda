import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { CheckCircle2 } from 'lucide-react'

const steps = [
  { n: '01', title: 'Detailed Examination', text: 'A thorough ano-rectal examination to confirm diagnosis and staging.' },
  { n: '02', title: 'Medicated Thread Preparation', text: 'A special ayurvedic thread (Kshar Sutra) is coated with herbal preparations.' },
  { n: '03', title: 'Ligation', text: 'The thread is passed through the fistula tract or around the pile mass under local anaesthesia.' },
  { n: '04', title: 'Weekly Thread Change', text: 'The thread is replaced weekly, gradually cutting and healing the tract simultaneously.' },
  { n: '05', title: 'Complete Healing', text: 'The tract heals from within as the thread cuts through, minimising recurrence.' },
]

const benefits = [
  'No major operation or general anaesthesia required',
  'Minimal bleeding and significantly less pain',
  'Day-care procedure — usually no overnight hospital stay',
  'Very low recurrence compared to conventional surgery',
  'Suitable for complex and recurrent fistula cases',
  'Faster return to daily work and routine',
]

export default function KsharSutra() {
  return (
    <div>
      <section className="max-w-7xl mx-auto px-5 md:px-8 pt-14 pb-10 text-center">
        <Reveal>
          <p className="eyebrow mb-3">Signature Treatment</p>
          <h1 className="font-display text-4xl md:text-5xl text-[var(--color-forest-deep)] mb-5">Kshar Sutra Therapy</h1>
          <p className="text-[var(--color-ink)]/65 max-w-2xl mx-auto">
            A 3000-year-old Ayurvedic para-surgical technique — still one of the most effective, least invasive
            treatments for fistula-in-ano, piles and pilonidal sinus available today.
          </p>
        </Reveal>
      </section>

      <section className="max-w-5xl mx-auto px-5 md:px-8 pb-20">
        <div className="relative">
          <div className="absolute left-6 top-2 bottom-2 w-px bg-[var(--color-sage)] opacity-40 hidden md:block" />
          <div className="space-y-8">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-[var(--color-forest)] text-[var(--color-gold-light)] font-display flex items-center justify-center text-sm relative z-10">
                    {s.n}
                  </div>
                  <div className="card-soft p-6 flex-1">
                    <p className="font-display text-xl text-[var(--color-forest-deep)] mb-2">{s.title}</p>
                    <p className="text-sm text-[var(--color-ink)]/65 leading-relaxed">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-linen-deep)]">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <img src="/images/doctor-consult.png" alt="Consultation" className="rounded-[2rem] w-full object-cover shadow-2xl border-4 border-white" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow mb-3">Why patients prefer it</p>
            <h2 className="font-display text-3xl md:text-4xl text-[var(--color-forest-deep)] mb-6">The benefits of going the Ayurvedic route</h2>
            <ul className="space-y-3 mb-8">
              {benefits.map(b => (
                <li key={b} className="flex items-start gap-3 text-sm text-[var(--color-ink)]/75">
                  <CheckCircle2 className="text-[var(--color-gold)] shrink-0 mt-0.5" size={18} /> {b}
                </li>
              ))}
            </ul>
            <Link to="/appointment" className="btn-primary">Discuss Your Case</Link>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
