// /components/Header.js
import Link from 'next/link'
import { supabase } from '../utils/supabaseClient'
import { useEffect, useState } from 'react'

export default function Header() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data?.user || null)
    })()
    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      supabase.auth.getUser().then(r => setUser(r.data?.user || null))
    })
    return () => { sub?.data?.subscription?.unsubscribe?.() }
  }, [])

  async function logout() {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <header className="header">
      <div style={{ fontWeight:800 }}>Commerce</div>
      <nav>
        <Link href="/">Accueil</Link>
        <Link href="/add-product">Ajouter</Link>
        <Link href="/commandes">Commandes</Link>
        <Link href="/profil">Profil</Link>
        <Link href="/admin">Admin</Link>
        {!user ? <Link href="/login" style={{ marginLeft: 12 }}>Connexion</Link> :
          <button onClick={logout} style={{ marginLeft:12, background:'#fff', color:'#0056d6', padding:'8px 12px', borderRadius:8, border:'none' }}>Déconnexion</button>
        }
      </nav>
    </header>
  )
      }
