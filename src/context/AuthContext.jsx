import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)
const STORAGE_KEY = 'singhal_admin_session'

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY)
    if (saved === 'true') setSession({ email: import.meta.env.VITE_ADMIN_EMAIL || 'admin' })
    setLoading(false)
  }, [])

  const signIn = async (email, password) => {
    const envEmail = import.meta.env.VITE_ADMIN_EMAIL
    const envPassword = import.meta.env.VITE_ADMIN_PASSWORD

    if (!envPassword) {
      return { error: { message: 'Admin password is not set in .env (VITE_ADMIN_PASSWORD).' } }
    }
    const emailOk = !envEmail || email.trim().toLowerCase() === envEmail.trim().toLowerCase()
    const passOk = password === envPassword

    if (emailOk && passOk) {
      sessionStorage.setItem(STORAGE_KEY, 'true')
      setSession({ email: envEmail || email })
      return { data: { session: true }, error: null }
    }
    return { error: { message: 'Incorrect email or password.' } }
  }

  const signOut = async () => {
    sessionStorage.removeItem(STORAGE_KEY)
    setSession(null)
  }

  return (
    <AuthContext.Provider value={{ session, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
