import PatientIntakeForm from '../components/PatientIntakeForm'

export default function AddPatient() {
  return (
    <div>
      <h1 className="font-display text-3xl text-[var(--color-forest-deep)] mb-1">Add Patient</h1>
      <p className="text-[var(--color-ink)]/55 mb-8">Register a new patient directly from the admin panel.</p>
      <div className="card-soft p-6 md:p-10 max-w-3xl">
        <PatientIntakeForm />
      </div>
    </div>
  )
}
