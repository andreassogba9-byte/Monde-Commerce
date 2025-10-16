// /pages/commandes.js
import Header from '../components/Header'
import { supabase } from '../utils/supabaseClient'
import { useEffect, useState } from 'react'

export default function Commandes() {
  const [commandes, setCommandes] = useState([])

  useEffect(() => {
    (async () => {
      const { data: userData } = await supabase.auth.getUser()
      const user = userData?.user
      if (!user) return
      const { data } = await supabase.from('commandes').select('*, produits(*)').eq('acheteur_id', user.id)
      setCommandes(data || [])
    })()
  }, [])

  return (
    <div>
      <Header />
      <div className="container">
        <h2>Mes commandes</h2>
        {commandes.length === 0 ? <p>Aucune commande.</p> : commandes.map(c => (
          <div key={c.id} className="card">
            <p>Produit: {c.produits?.nom || c.produit_id}</p>
            <p>Quantité: {c.quantite}</p>
            <p>Date: {new Date(c.created_at).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
