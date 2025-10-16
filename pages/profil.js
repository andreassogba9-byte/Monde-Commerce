// /pages/profil.js
import Header from '../components/Header'
import ProductCard from '../components/ProductCard'
import { supabase } from '../utils/supabaseClient'
import { useEffect, useState } from 'react'

export default function Profil() {
  const [profile, setProfile] = useState(null)
  const [produits, setProduits] = useState([])

  useEffect(() => {
    (async () => {
      const { data: userData } = await supabase.auth.getUser()
      const user = userData?.user
      if (!user) return
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      setProfile(data)
      const { data: prods } = await supabase.from('produits').select('*').eq('vendeur_id', user.id).order('created_at',{ascending:false})
      setProduits(prods || [])
    })()
  }, [])

  if (!profile) return <div><Header /><div className="container"><p>Connecte-toi pour voir ton profil.</p></div></div>

  return (
    <div>
      <Header />
      <div className="container">
        <div className="card" style={{ maxWidth:600, margin:'0 auto' }}>
          <h2>Mon profil</h2>
          <p>Email: {profile.email}</p>
          <p>Role: {profile.role}</p>
        </div>

        <h3 style={{ marginTop:20 }}>Mes produits (tous les statuts)</h3>
        <div className="product-grid">
          {produits.map(p => <ProductCard key={p.id} produit={p} />)}
        </div>
      </div>
    </div>
  )
}
