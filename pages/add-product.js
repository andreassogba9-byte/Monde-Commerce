// /pages/add-product.js
import Header from '../components/Header'
import { supabase } from '../utils/supabaseClient'
import { useState } from 'react'

export default function AddProduct() {
  const [nom, setNom] = useState('')
  const [prix, setPrix] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [message, setMessage] = useState('')

  async function handleAdd() {
    const { data } = await supabase.auth.getUser()
    const user = data?.user
    if (!user) { setMessage('Connecte-toi d’abord.'); return }

    const { error } = await supabase.from('produits').insert([{
      nom, prix, description, image_url: image, vendeur_id: user.id, est_valide: false
    }])

    if (error) setMessage('Erreur: ' + error.message)
    else setMessage('Produit ajouté — en attente de validation par l’administrateur.')
  }

  return (
    <div>
      <Header />
      <div className="container">
        <div className="card" style={{ maxWidth:700, margin:'0 auto' }}>
          <h2>Ajouter un produit</h2>
          <input placeholder="Nom" value={nom} onChange={e => setNom(e.target.value)} />
          <input placeholder="Prix (FCFA)" type="number" value={prix} onChange={e => setPrix(e.target.value)} />
          <input placeholder="Lien image" value={image} onChange={e => setImage(e.target.value)} />
          <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
          <button onClick={handleAdd}>Publier (Demande)</button>
          {message && <p style={{ marginTop: 12 }}>{message}</p>}
        </div>
      </div>
    </div>
  )
      }
