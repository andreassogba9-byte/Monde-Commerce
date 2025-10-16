// /pages/login.js
import Header from '../components/Header'
import { supabase } from '../utils/supabaseClient'
import { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) setMessage('Erreur: ' + error.message)
    else setMessage('Vérifie ton e-mail: le lien de connexion a été envoyé.')
  }

  return (
    <div>
      <Header />
      <div className="container">
        <div className="card" style={{ maxWidth: 480, margin: '0 auto' }}>
          <h2>Connexion / Inscription</h2>
          <input placeholder="Ton e-mail" value={email} onChange={e => setEmail(e.target.value)} />
          <button onClick={handleLogin}>Envoyer lien de connexion</button>
          <p style={{ marginTop: 12 }}>{message}</p>
        </div>
      </div>
    </div>
  )
    }
