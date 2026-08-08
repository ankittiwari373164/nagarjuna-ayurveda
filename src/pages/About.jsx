import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { GraduationCap, Award, Stethoscope, Leaf } from 'lucide-react'

const education = [
  { title: 'B.A.M.S.', place: 'Govt. Ayurvedic College & Hospital, Bareilly' },
  { title: 'M.S. (Ayurveda — Shalya Tantra)', place: 'Govt. P.G. Ayurvedic College & Hospital, Varanasi' },
]

const specialities = [
  'Ano-Rectal Surgeon (Ayurveda)', 'Kshar Sutra Therapy Specialist', 'Laser Treatment',
  'General Ayurvedic Physician', 'Digestive & Liver Care', 'Kidney & Urinary Care',
]

export default function About() {
  return (
    <div>
      <section className="max-w-7xl mx-auto px-5 md:px-8 pt-14 pb-8 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <p className="eyebrow mb-3">About the physician</p>
          <h1 className="font-display text-4xl md:text-5xl text-[var(--color-forest-deep)] leading-tight mb-6">
            Dr. Anup Kumar
          </h1>
          <p className="text-[var(--color-clay)] font-semibold mb-6">B.A.M.S., M.S. (Ayu.) — Ano-Rectal Surgeon &amp; General Physician</p>
          <p className="text-[var(--color-ink)]/75 leading-relaxed mb-4">
            Dr. Anup Kumar has spent his career bridging classical Ayurvedic surgery with the everyday realities
            of patients who fear the operation table. Trained at two of India's most respected government Ayurvedic
            institutions, he specialises in Kshar Sutra — a thread-based ligation therapy for ano-rectal conditions
            that avoids major surgery altogether.
          </p>
          <p className="text-[var(--color-ink)]/75 leading-relaxed mb-8">
            At NAKC — Nagarjuna Ayurveda &amp; Kshar-Sutra Centre — he sees patients daily for piles,
            fistula, fissure, pilonidal sinus, and related digestive, liver and kidney disorders — always starting
            with the least invasive path forward.
          </p>
          <Link to="/appointment" className="btn-primary">Book a Consultation</Link>
        </Reveal>
        <Reveal delay={0.15}>
          <img src="/images/doctor-portrait.png" alt="Dr. Anup Kumar" className="rounded-[2rem] w-full object-cover shadow-2xl border-4 border-white" />
        </Reveal>
      </section>

      <div className="vein-divider max-w-7xl mx-auto mt-8" />

      <section className="max-w-7xl mx-auto px-5 md:px-8 py-20 grid md:grid-cols-2 gap-10">
        <Reveal>
          <div className="card-soft p-8 h-full">
            <GraduationCap className="text-[var(--color-forest)] mb-4" size={32} />
            <h3 className="font-display text-2xl text-[var(--color-forest-deep)] mb-5">Education &amp; Training</h3>
            <ul className="space-y-4">
              {education.map(e => (
                <li key={e.title} className="border-l-2 border-[var(--color-gold)] pl-4">
                  <p className="font-semibold text-[var(--color-forest-deep)]">{e.title}</p>
                  <p className="text-sm text-[var(--color-ink)]/60">{e.place}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="card-soft p-8 h-full">
            <Award className="text-[var(--color-forest)] mb-4" size={32} />
            <h3 className="font-display text-2xl text-[var(--color-forest-deep)] mb-5">Areas of Specialisation</h3>
            <div className="grid grid-cols-1 gap-3">
              {specialities.map(s => (
                <p key={s} className="leaf-bullet text-sm text-[var(--color-ink)]/75">{s}</p>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="bg-[var(--color-linen-deep)]">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-20 grid md:grid-cols-3 gap-8">
          {[
            { icon: Stethoscope, title: 'Patient-first philosophy', text: 'Every consultation begins with listening — symptoms, history and lifestyle — before any treatment plan is proposed.' },
            { icon: Leaf, title: 'Ayurveda, applied rigorously', text: 'Classical texts like the Charak Samhita guide diagnosis, paired with modern hygiene and technique.' },
            { icon: Award, title: 'Long-term, not just symptom relief', text: 'Treatment plans address recurrence, not only the immediate complaint.' },
          ].map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="text-center px-4">
                <v.icon className="mx-auto text-[var(--color-clay)] mb-4" size={30} />
                <p className="font-display text-xl text-[var(--color-forest-deep)] mb-2">{v.title}</p>
                <p className="text-sm text-[var(--color-ink)]/65 leading-relaxed">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}