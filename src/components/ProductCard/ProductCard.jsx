export default function ProductCard({ product, user, onRequireLogin }) {
  
  const handleClick = () => {
    if (!user) {
      onRequireLogin(); // open login modal
    } else {
      console.log("Added to cart:", product);
    }
  };

  return (
    <div className="card" onClick={handleClick}>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price} DA</p>
      <button>Ajouter au panier</button>
    </div>
  );
}