export default function ScrollButton({ targetId, className, children }) {
  const handleClick = () => {
    const section = document.getElementById(targetId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}