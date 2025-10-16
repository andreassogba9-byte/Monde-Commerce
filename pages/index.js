// /pages/index.js
import Header from '../components/Header'
import ProductCard from '../components/ProductCard'
import { supabase } from '../utils/supabaseClient'
import { useEffect, useState } from 'react'

export default function Home() {
  const [produits, setProduits] = useState([])

  useEffect(() => {
    async function charger() {
      const { data, error } = await supabase
        .from('produits')
        .select('*')
        .eq('est_valide', true)
        .order('created_at', { ascending: false })
      if (!error) setProduits(data || [])
    }
    charger()
  }, [])

  return (
    <div>
      <Header />
      <div className="container">
        <h2>Produits disponibles</h2>
        <div className="product-grid">
          {produits.length === 0 && <p>Aucun produit publié pour le moment.</p>}
          {produits.map(p => <ProductCard key={p.id} produit={p} />)}
        </div>
      </div>
    </div>
  )
      }
