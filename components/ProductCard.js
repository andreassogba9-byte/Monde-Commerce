// /components/ProductCard.js
export default function ProductCard({ produit }) {
  return (
    <div className="product-card card">
      <img src={produit.image_url || 'https://via.placeholder.com/400x300?text=No+Image'} alt={produit.nom} />
      <h3>{produit.nom}</h3>
      <p className="price">{produit.prix} FCFA</p>
      <p style={{ color:'#666', fontSize:13 }}>{produit.description}</p>
    </div>
  )
}
