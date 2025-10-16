// /pages/admin.js
import Header from '../components/Header'
import { supabase } from '../utils/supabaseClient'
import { useEffect, useState } from 'react'

export default function Admin() {
  const [items, setItems] = useState([])
  const [message, setMessage] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    (async () => {
      const { data: userData } = await supabase.auth.getUser()
      const user = userData?.user
      if (!user) return
      // récupérer le profil
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
      if (profile?.role === 'admin') setIsAdmin(true)
      const { data } = await supabase.from('produits').select('*').order('created_at',{ascending:false})
      setItems(data || [])
    })()
  }, [])

  async function setValid(id, val) {
    const { error } = await supabase.from('produits').update({ est_valide: val }).eq('id', id)
    if (error) setMessage('Erreur: ' + error.message)
    else {
      setMessage('Mise à jour ok')
      const { data } = await supabase.from('produits').select('*').order('created_at',{ascending:false})
      setItems(data || [])
    }
  }

  if (!isAdmin) return (
    <div>
      <Header />
      <div className="container"><div className="card"><p>Accès admin réservé. Connecte-toi avec un compte admin.</p></div></div>
    </div>
  )

  return (
    <div>
      <Header />
      <div className="container">
        <h2>Panneau Admin — Modération des produits</h2>
        {message && <p style={{ color:'green' }}>{message}</p>}
        {items.map(p => (
          <div key={p.id} className="card" style={{ display:'flex', gap:12, marginBottom:12 }}>
            <img src={p.image_url || '/placeholder.png'} alt={p.nom} style={{ width:140, height:90, objectFit:'cover', borderRadius:8 }} />
            <div style={{ flex:1 }}>
              <strong>{p.nom}</strong>
              <p>{p.prix} FCFA — Vendeur: {p.vendeur_id}</p>
              <p>{p.description}</p>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {p.est_valide ? (
                <button onClick={() => setValid(p.id, false)}>Retirer</button>
              ) : (
                <button onClick={() => setValid(p.id, true)}>Valider</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
