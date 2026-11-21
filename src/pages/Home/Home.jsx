import ProductCard from "../../components/ProductCard/ProductCard";
import Navbar from "../../components/Navbar/Navbar";
import CategoriesBar from "../../components/CategoriesBar/CategoriesBar";
import TickerBar from "../../components/TickerBar/TickerBar";
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";
import "./Home.css";
import { useState } from "react";



const trendingProducts = [
  { id: 5, name: "Bag", price: 4000, image: "/images/women5.jpg" },
  { id: 2, name: "Shirt", price: 3000, image: "/images/men2.jpg" },
  { id: 3, name: "Pants", price: 4500, image: "/images/men3.jpg" },
  { id: 1, name: "Dress", price: 3500, image: "/images/women1.jpg" },
  { id: 2, name: "Top", price: 2000, image: "/images/women2.jpg" },
  { id: 3, name: "Skirt", price: 3000, image: "/images/women3.jpg" },
    { id: 3, name: "Pants", price: 4500, image: "/images/men3.jpg" },
  { id: 1, name: "Dress", price: 3500, image: "/images/women1.jpg" },
  { id: 2, name: "Top", price: 2000, image: "/images/women2.jpg" },
  { id: 3, name: "Skirt", price: 3000, image: "/images/women3.jpg" },
];
const menProducts = [
  { id: 1, name: "T-shirt", price: 2500, image: "/images/men1.jpg" },
  { id: 2, name: "Shirt", price: 3000, image: "/images/men2.jpg" },
  { id: 3, name: "Pants", price: 4500, image: "/images/men3.jpg" },
  { id: 4, name: "Shoes", price: 6000, image: "/images/men4.jpg" },
  { id: 5, name: "Hat", price: 1500, image: "/images/men5.jpg" },
  { id: 6, name: "Jacket", price: 8000, image: "/images/men6.jpg" },
    { id: 3, name: "Pants", price: 4500, image: "/images/men3.jpg" },
  { id: 1, name: "Dress", price: 3500, image: "/images/women1.jpg" },
  { id: 2, name: "Top", price: 2000, image: "/images/women2.jpg" },
  { id: 3, name: "Skirt", price: 3000, image: "/images/women3.jpg" },
];

const womenProducts = [
  { id: 1, name: "Dress", price: 3500, image: "/images/women1.jpg" },
  { id: 2, name: "Top", price: 2000, image: "/images/women2.jpg" },
  { id: 3, name: "Skirt", price: 3000, image: "/images/women3.jpg" },
  { id: 4, name: "Shoes", price: 5500, image: "/images/women4.jpg" },
  { id: 5, name: "Bag", price: 4000, image: "/images/women5.jpg" },
  { id: 6, name: "Jacket", price: 7500, image: "/images/women6.jpg" },
    { id: 3, name: "Pants", price: 4500, image: "/images/men3.jpg" },
  { id: 1, name: "Dress", price: 3500, image: "/images/women1.jpg" },
      { id: 3, name: "Pants", price: 4500, image: "/images/men3.jpg" },
  { id: 1, name: "Dress", price: 3500, image: "/images/women1.jpg" },

];

export default function Home() {
  const [user, setUser] = useState(null); // null = not logged in
  const [showLogin, setShowLogin] = useState(false);
  const [showReg, setShowReg] = useState(false);
  return (
    <div>
      
      <Navbar onLoginClick={() => setShowLogin(true)}
      onRegClick={() => setShowReg(true)}
      />
      {showLogin && <Login onClose={() => setShowLogin(false)} />}
         
      {showReg && <Register onClose={() => setShowReg(false)} />}

      <CategoriesBar />
      <TickerBar />

{/* Trending Section */}
<div id="trending-section" className="category-section">
  <h2>Trending</h2>
  <div className="cards-container">
    {trendingProducts.map((product) => (
      <ProductCard key={product.id}
  product={product}
  user={user}
  onRequireLogin={() => setShowLogin(true)}
/> 
    ))}
  </div>
</div>

{/* Men Section */}
<div id="men-section" className="category-section">
  <h2>Homme</h2>
  <div className="cards-container">
    {menProducts.map((product) => (
      <ProductCard key={product.id}
  product={product}
  user={user}
  onRequireLogin={() => setShowLogin(true)}
/>
    ))}
  </div>
</div>


{/* Women Section */}
<div id="women-section" className="category-section">
  <h2>Femme</h2>
  <div className="cards-container">
    {womenProducts.map((product) => (
      <ProductCard key={product.id}
  product={product}
  user={user}
  onRequireLogin={() => setShowLogin(true)}
/>
    ))}
  </div>
</div>
    </div>
  );
}