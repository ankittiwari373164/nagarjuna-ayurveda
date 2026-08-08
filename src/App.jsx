import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import PublicLayout from './components/PublicLayout'
import Home from './pages/Home'
import About from './pages/About'
import Conditions from './pages/Conditions'
import Services from './pages/Services'
import KsharSutra from './pages/KsharSutra'
import Appointment from './pages/Appointment'
import Contact from './pages/Contact'
import AdminLogin from './admin/AdminLogin'
import AdminLayout from './admin/AdminLayout'
import Dashboard from './admin/Dashboard'
import Patients from './admin/Patients'
import AddPatient from './admin/AddPatient'
import Appointments from './admin/Appointments'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-center" toastOptions={{
          style: { fontFamily: 'Work Sans, sans-serif', borderRadius: '12px' },
        }} />
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/conditions" element={<Conditions />} />
            <Route path="/services" element={<Services />} />
            <Route path="/kshar-sutra" element={<KsharSutra />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="patients" element={<Patients />} />
            <Route path="add-patient" element={<AddPatient />} />
            <Route path="appointments" element={<Appointments />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
