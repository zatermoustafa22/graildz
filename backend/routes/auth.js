import express from "express";
import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // 1️⃣ Check if username exists
    db.query("SELECT * FROM users WHERE username = ?", [username], async (err, usernameData) => {
      if (err) return res.status(500).json({ message: "Database error" });
      if (usernameData.length) return res.status(409).json({ message: "Username already exists" });

      // 2️⃣ Check if email exists
      db.query("SELECT * FROM users WHERE email = ?", [email], async (err, emailData) => {
        if (err) return res.status(500).json({ message: "Database error" });
        if (emailData.length) return res.status(409).json({ message: "Email already exists" });

        // 3️⃣ Hash password and insert
        const hashedPassword = await bcrypt.hash(password, 10);
        const insertQuery = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        db.query(insertQuery, [username, email, hashedPassword], (err, result) => {
          if (err) return res.status(500).json({ message: "Database insert error" });
          return res.status(200).json({ message: "User created successfully" });
        });
      });
    });
  } catch (error) {
    return res.status(500).json({ message: "Hashing error" });
  }
});

// ✅ LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // 1️⃣ Validate input
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // 2️⃣ Find user by email
  const q = "SELECT * FROM users WHERE email = ?";
  db.query(q, [email], async (err, data) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (!data.length) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = data[0];

    try {
      // 3️⃣ Check password
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Wrong password" });
      }

      // 4️⃣ Check JWT secret
      if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: "JWT secret missing" });
      }

      // 5️⃣ Generate token
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
      const { password: _, ...others } = user;

      // 6️⃣ Send success response
      res.status(200).json({ message: "Login successful", token, user: others });
    } catch (error) {
      return res.status(500).json({ message: "Login error" });
    }
  });
});

export default router;