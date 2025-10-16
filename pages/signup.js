// /pages/signup.js
import Header from '../components/Header'
import { supabase } from '../utils/supabaseClient'
import { useState } from 'react'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  async function handleSignup() {
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) setMessage('Erreur: ' + error.message)
    else setMessage('Compte créé — vérifie ton email.')
  }

  return (
    <div>
      <Header />
      <div className="container">
        <div className="card" style={{ maxWidth: 480, margin: '0 auto' }}>
          <h2>Créer un compte</h2>
          <input placeholder="Ton e-mail" value={email} onChange={e => setEmail(e.target.value)} />
          <input placeholder="Mot de passe" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <button onClick={handleSignup}>S'inscrire</button>
          <p style={{ marginTop: 12 }}>{message}</p>
        </div>
      </div>
    </div>
  )
  }
