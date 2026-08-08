import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { Droplet, Flame, Hand, Waves, Baby, ArrowRight, Scissors, Sparkles, Stethoscope } from 'lucide-react'

const services = [
  {
    icon: Scissors,
    name: 'Kshar Sutra Therapy',
    sanskrit: 'Medicated Thread Ligation',
    text: "Our signature treatment — a 3000-year-old Ayurvedic para-surgical technique for piles, fistula-in-ano and pilonidal sinus. A medicated thread is passed through the tract and changed weekly, gradually cutting and healing simultaneously, without major surgery or general anaesthesia.",
    points: ['No major operation required', 'Day-care procedure', 'Low recurrence rate', 'Suits complex, recurrent cases'],
  },
  {
    icon: Sparkles,
    name: 'Laser Treatment',
    sanskrit: 'Modern-Ayurveda Integration',
    text: "For select ano-rectal cases, laser technology is combined with Ayurvedic care to offer a precise, minimally-invasive option with reduced bleeding, less post-procedure discomfort and a quicker return to daily activity.",
    points: ['Minimally invasive', 'Reduced bleeding & discomfort', 'Faster recovery time', 'Combined with Ayurvedic aftercare'],
  },
  {
    icon: Waves,
    name: 'Panchakarma & Herbal Detox',
    sanskrit: 'Whole-Body Cleansing',
    text: "A structured five-fold detoxification program — Vamana, Virechana, Basti, Nasya and Raktamokshana — that clears accumulated toxins (Ama) from the body, resets digestion, and restores balance across all three doshas.",
    points: ['Removes accumulated toxins', 'Resets digestion & metabolism', 'Restores dosha balance', 'Personalised detox plan'],
  },
  {
    icon: Stethoscope,
    name: 'General Ayurvedic Consultation',
    sanskrit: 'Prakriti-based Assessment',
    text: "A complete Ayurvedic health assessment — pulse diagnosis, body constitution (Prakriti) analysis, and lifestyle review — to build a personalised plan for chronic issues, general wellness, or preventive care.",
    points: ['Full Prakriti assessment', 'Personalised diet & lifestyle plan', 'Chronic issue management', 'Preventive wellness care'],
  },
  {
    icon: Droplet,
    name: 'Leech Therapy',
    sanskrit: 'Jalaukavacharan',
    text: "A classical blood-purification therapy where medicinal leeches are applied to draw out impure, stagnant blood from the affected area. Especially effective for piles, varicose veins, skin disorders, localized swelling and chronic pain — it improves circulation and speeds healing without surgery.",
    points: ['Purifies impure blood', 'Reduces localized swelling & pain', 'Effective for piles & skin disorders', 'Improves blood circulation'],
  },
  {
    icon: Flame,
    name: 'Agnikarma Therapy',
    sanskrit: 'Thermal Cauterisation',
    text: "A precise, controlled thermal therapy using heated herbal probes to relieve chronic and stubborn pain at its source. Widely used for joint pain, sciatica, heel pain (calcaneal spur), fissure-in-ano and warts — offering fast, lasting relief in just a few sittings.",
    points: ['Fast, lasting pain relief', 'Effective for sciatica & joint pain', 'Treats fissure & heel spur', 'Minimal sittings required'],
  },
  {
    icon: Hand,
    name: 'Marma Therapy',
    sanskrit: 'Vital Point Stimulation',
    text: "A gentle, hands-on therapy that stimulates the body's Marma points — key junctions of energy, muscle, nerve and blood vessels. Releasing blockages at these points relieves pain, improves mobility, and restores balance across the body's doshas.",
    points: ['Releases energy blockages', 'Improves joint & muscle mobility', 'Restores dosha balance', 'Deeply relaxing, non-invasive'],
  },
  {
    icon: Waves,
    name: 'Basti Chikitsa',
    sanskrit: 'Medicated Enema Therapy',
    text: "One of the five core Panchakarma procedures — herbal oils and decoctions are gently administered to cleanse and nourish the colon. Basti is considered the single most powerful therapy for Vata-related disorders including constipation, arthritis, and chronic digestive issues.",
    points: ['Deep-cleanses the colon', 'Balances Vata dosha', 'Relieves chronic constipation', 'Supports joint & digestive health'],
  },
  {
    icon: Baby,
    name: 'Swarna Prashan Sanskar',
    sanskrit: 'Immunity Ritual for Children',
    text: "A time-honoured Ayurvedic ritual for infants and children, where gold-processed herbal drops (Swarnamrit Prashan) are administered orally on Pushya Nakshatra and every month thereafter. It's known to strengthen immunity, aid digestion, and support sharper intellect in growing children.",
    points: ['Boosts child immunity', 'Supports healthy digestion', 'Aids memory & intellect', 'Safe, classical formulation'],
  },
]

export default function Services() {
  return (
    <div>
      <section className="max-w-7xl mx-auto px-5 md:px-8 pt-14 pb-10 text-center">
        <Reveal>
          <p className="eyebrow mb-3">Our Services</p>
          <h1 className="font-display text-4xl md:text-5xl text-[var(--color-forest-deep)] mb-5">Classical Ayurvedic Therapies</h1>
          <p className="text-[var(--color-ink)]/65 max-w-2xl mx-auto">
            Beyond Kshar Sutra, NAKC offers a range of time-tested Ayurvedic procedures —
            each suited to a different kind of healing, from pain relief to child immunity.
          </p>
        </Reveal>
      </section>

      <section className="max-w-6xl mx-auto px-5 md:px-8 pb-20 space-y-8">
        {services.map((s, i) => (
          <Reveal key={s.name} delay={i * 0.06}>
            <div className={`card-soft p-7 md:p-9 grid md:grid-cols-[auto_1fr] gap-6 md:gap-9 items-start ${i % 2 === 1 ? 'md:[direction:rtl]' : ''}`}>
              <div className="md:[direction:ltr] flex md:flex-col items-center md:items-start gap-4 md:gap-3">
                <div className="w-16 h-16 shrink-0 rounded-2xl bg-[var(--color-linen-deep)] flex items-center justify-center">
                  <s.icon className="text-[var(--color-forest)]" size={30} />
                </div>
                <div>
                  <p className="font-display text-2xl text-[var(--color-forest-deep)] leading-tight">{s.name}</p>
                  <p className="text-xs uppercase tracking-wide text-[var(--color-clay)] font-semibold mt-1">{s.sanskrit}</p>
                </div>
              </div>
              <div className="md:[direction:ltr]">
                <p className="text-[var(--color-ink)]/70 leading-relaxed mb-5">{s.text}</p>
                <div className="grid sm:grid-cols-2 gap-2.5 mb-6">
                  {s.points.map(p => (
                    <p key={p} className="leaf-bullet text-sm text-[var(--color-ink)]/70">{p}</p>
                  ))}
                </div>
                <Link to="/appointment" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-forest)] hover:gap-3 transition-all">
                  Book this therapy <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="bg-[var(--color-forest-deep)] text-white">
        <div className="max-w-5xl mx-auto px-5 md:px-8 py-16 text-center">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl mb-4">Not sure which therapy is right for you?</h2>
            <p className="text-white/70 max-w-xl mx-auto mb-8">
              Book a consultation and Dr. Anup Kumar will recommend the right combination of treatments for your condition.
            </p>
            <Link to="/appointment" className="btn-primary !bg-white !text-[var(--color-forest-deep)]">Book a Consultation</Link>
          </Reveal>
        </div>
      </section>
    </div>
  )
}