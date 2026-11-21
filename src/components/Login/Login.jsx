import { useState } from "react";
import "./Login.css";

export default function Login({ onClose, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // ✅ state for error
  const [success, setSuccess] = useState(""); // optional success message

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");   // clear previous error
    setSuccess(""); // clear previous success

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      // ✅ save token + user
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setSuccess("Logged in successfully!");
      // optionally close modal after a short delay
      setTimeout(() => {
        onClose();
      }, 1000);

    } catch (err) {
      console.error("Fetch error:", err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Log In</button>
        </form>

        {/* ✅ Inline error message */}
        {error && <p className="form-error">{error}</p>}

        {/* ✅ Optional success message */}
        {success && <p className="form-success">{success}</p>}

        <p>
          Don't have an account?{" "}
          <span className="link" onClick={onSwitch}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
}