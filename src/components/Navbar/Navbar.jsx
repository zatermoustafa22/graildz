import "./Navbar.css";
import ScrollButton from "../ScrollButton";

export default function Navbar({ onLoginClick, onRegClick }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        GRAILDZ
        <ScrollButton targetId="trending-section" className="trending-btn">
          Trending
        </ScrollButton>
      </div>

      <div className="navbar-search">
        <input type="text" placeholder="Search products..." />
      </div>

      <div className="navbar-actions">
        <button className="sell-btn" onClick={onRegClick}>Sell</button>
        <button className="signup-btn" onClick={onRegClick}>Sign Up</button>
        <button className="login-btn" onClick={onLoginClick}>Log In</button>
      </div>
    </nav>
  );
}