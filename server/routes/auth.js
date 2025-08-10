const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { z } = require('zod');
const validator = require('validator');

const router = express.Router();

/**
 * Simple login endpoint for admin authentication.
 * Configure ADMIN_EMAIL and ADMIN_PASSWORD_HASH in your .env file.
 * Returns a JWT on successful login that can be used to access protected routes.
 */
router.post('/login', async (req, res, next) => {
  try {
    const schema = z.object({
      email: z.string().email(),
      password: z.string().min(1),
    });
    const { email, password } = schema.parse(req.body);
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
    if (!adminEmail || !adminPasswordHash) {
      return res
        .status(500)
        .json({ message: 'Admin credentials are not configured on the server.' });
    }
    const normalizedEmail = validator.normalizeEmail(email);
    if (normalizedEmail !== adminEmail) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const valid = await bcrypt.compare(password, adminPasswordHash);
    if (!valid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { email: normalizedEmail, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    return res.json({ token });
  } catch (err) {
    if (err.name === 'ZodError') {
      err.status = 400;
    }
    next(err);
  }
});

module.exports = router;
