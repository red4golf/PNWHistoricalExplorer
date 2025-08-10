const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();

/**
 * Simple login endpoint for admin authentication.
 * Configure ADMIN_EMAIL and ADMIN_PASSWORD_HASH in your .env file.
 * Returns a JWT on successful login that can be used to access protected routes.
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
  if (!adminEmail || !adminPasswordHash) {
    return res
      .status(500)
      .json({ message: 'Admin credentials are not configured on the server.' });
  }
  const passwordMatches = await bcrypt.compare(password || '', adminPasswordHash);
  if (email !== adminEmail || !passwordMatches) {
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