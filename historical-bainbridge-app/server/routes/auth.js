const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

/**
 * Simple login endpoint for admin authentication.
 * Configure ADMIN_EMAIL and ADMIN_PASSWORD in your .env file.
 * Returns a JWT on successful login that can be used to access protected routes.
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) {
    return res
      .status(500)
      .json({ message: 'Admin credentials are not configured on the server.' });
  }
  if (email !== adminEmail || password !== adminPassword) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign(
    { email, role: 'admin' },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '1h' }
  );
  return res.json({ token });
});

module.exports = router;