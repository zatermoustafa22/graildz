import "./CategoriesBar.css";
import ScrollButton from "../ScrollButton"; // adjust path if needed

export default function CategoriesBar() {
  return (
    <div className="categories-bar">
      <ScrollButton targetId="men-section" className="category-button">
        Homme
      </ScrollButton>

      <ScrollButton targetId="women-section" className="category-button">
        Femme
      </ScrollButton>
    </div>
  );
}