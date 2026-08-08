import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'

const groups = [
  {
    title: 'Ano-Rectal Diseases (गुदा रोग)',
    items: ['Piles (बवासीर)', 'Fistula (भगंदर)', 'Fissure-in-Ano (परिकर्तिका)', 'Pilonidal Sinus (नाड़ीब्रण)', 'Proctitis (मलशोथ)', 'Ulcerative Colitis (संघर्षणी)'],
  },
  {
    title: 'Digestive & Abdominal (पाचन एवं पेट रोग)',
    items: ['Gas & Stomach Disorders', 'IBS / IBD (आन्त्र शोथ)', 'Liver Diseases (यकृत रोग)', 'Kidney Diseases (मूत्र विकार)', 'Hydrocele (हाइड्रोसील)', 'Phimosis (फिमोसिस)', 'Breast Lump (स्तन गाँठ)'],
  },
  {
    title: 'General Disorders (सामान्य रोग)',
    items: ['All Ano-Rectal Diseases', 'Stress & Anxiety', 'Kidney Stones (गुर्दे की पथरी)', 'Joint Pain (गठिया/सियाटिका)', 'Fever, Cold & Cough'],
  },
]

const checklist = [
  'Bleeding or discharge during motion?',
  'Feeling of a lump around the anus during motion?',
  'Pain or burning sensation while passing stool?',
  'A recurring boil near the anus that discharges pus?',
  'Persistent itching around the anal area?',
]

export default function Conditions() {
  return (
    <div>
      <section className="max-w-7xl mx-auto px-5 md:px-8 pt-14 pb-10 text-center">
        <Reveal>
          <p className="eyebrow mb-3">Consultation &amp; Treatment</p>
          <h1 className="font-display text-4xl md:text-5xl text-[var(--color-forest-deep)] mb-5">Conditions we treat</h1>
          <p className="text-[var(--color-ink)]/65 max-w-2xl mx-auto">
            From ano-rectal disorders to digestive, liver and kidney conditions — every diagnosis begins with a
            detailed consultation, ayurvedic examination, and an honest conversation about the right path forward.
          </p>
        </Reveal>
      </section>

      <section className="max-w-7xl mx-auto px-5 md:px-8 pb-16 grid md:grid-cols-3 gap-6">
        {groups.map((g, i) => (
          <Reveal key={g.title} delay={i * 0.08}>
            <div className="card-soft p-7 h-full">
              <h3 className="font-display text-xl text-[var(--color-forest-deep)] mb-5">{g.title}</h3>
              <ul className="space-y-3">
                {g.items.map(it => <li key={it} className="leaf-bullet text-sm text-[var(--color-ink)]/75">{it}</li>)}
              </ul>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="bg-[var(--color-forest-deep)] text-[var(--color-linen)]">
        <div className="max-w-5xl mx-auto px-5 md:px-8 py-20 text-center">
          <Reveal>
            <p className="eyebrow mb-3">Immediate check-up needed if…</p>
            <h2 className="font-display text-3xl md:text-4xl mb-10">Recognise any of these signs?</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-4 text-left mb-10">
            {checklist.map((c, i) => (
              <Reveal key={c} delay={i * 0.06}>
                <div className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-[var(--color-linen)]/90">{c}</div>
              </Reveal>
            ))}
          </div>
          <Link to="/appointment" className="btn-primary !bg-[var(--color-gold)] !text-[var(--color-forest-deep)]">Book a Check-up</Link>
        </div>
      </section>
    </div>
  )
}
