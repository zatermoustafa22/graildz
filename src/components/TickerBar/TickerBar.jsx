import "./TickerBar.css";

export default function TickerBar() {
  const items = [
    { text: "🔥 Nike Tech +120%", image: "assets/images/trending.jpg" },
    { text: "📦 1,245 items sold", image: "assets/images/trending.jpg" },
    { text: "💸 Avg price: $85", image: "assets/images/trending.jpg" },
    { text: "⚡ 32 new listings", image: "assets/images/trending.jpg" },
    { text: "👕 Hoodies fast", image: "assets/images/trending.jpg" },
  ];

  return (
    <div className="ticker">
      <div className="ticker-track">
        {items.map((item, index) => (
          <div
            key={index}
            className="ticker-item"
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}