import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

/* ======================
   MANUAL USER (ONLY ONE)
====================== */
const manualUser = {
  id: "1",
  name: "Tech",
  email: "tech@gmail.com",
  // password = 123456
  passwordHash: bcrypt.hashSync("123456", 10)
};

/* ======================
   REGISTER (OPTIONAL)
====================== */
router.post("/register", (req, res) => {
  return res.json({
    message: "Registration disabled. Use predefined account."
  });
});

/* ======================
   LOGIN
====================== */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  if (email !== manualUser.email) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, manualUser.passwordHash);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    {
      id: manualUser.id,
      name: manualUser.name,
      email: manualUser.email
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
});

export default router;
