import { useState } from "react";
import "./Register.css";

export default function Register({ onClose, onSwitch }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // ✅ State for error message
  const [success, setSuccess] = useState(""); // Optional: success message

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");   // Clear previous error
    setSuccess(""); // Clear previous success

    if (!username || !email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
      });

      const data = await res.json();

    console.log("STATUS:", res.status);
console.log("DATA:", data);

      if (!res.ok) {
  switch (res.status) {
    case 409:
      setError(data.message); // "Username already exists" or "Email already exists"
      break;
    case 400:
      setError(data.message); // "All fields are required"
      break;
    default:
      setError("Something went wrong");
  }
  return;
}

      setSuccess(data.message || "Account created successfully!");
     
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Register</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

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

          <button type="submit">Register</button>
        </form>

        {/* ✅ Error message */}
        {error && <p className="form-error">{error}</p>}

        {/* ✅ Success message */}
        {success && <p className="form-success">{success}</p>}

        <p>
          Have an account?{" "}
          <span className="link" onClick={onSwitch}>
            Log In
          </span>
        </p>
      </div>
    </div>
  );
}