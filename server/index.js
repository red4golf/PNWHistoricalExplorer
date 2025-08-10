const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
require('dotenv').config();

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}

// Route imports
const authRoutes = require('./routes/auth');
const locationsRoutes = require('./routes/locations');
const booksRoutes = require('./routes/books');
const uploadRoutes = require('./routes/upload');

const app = express();

// Determine port
const port = process.env.PORT || 4000;

// Configure allowed origins from environment
const allowedOrigins = (process.env.CORS_ALLOWED_ORIGINS || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

// Apply security middleware
app.use(helmet());

// Configure CORS with dynamic origins. If no origins specified, allow all.
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (e.g. mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('CORS not allowed'));
    },
    credentials: true,
  })
);

// Parse JSON and URL-encoded bodies
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/locations', locationsRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/upload', uploadRoutes);

// Serve static assets (images, audio)
app.use('/public', express.static(path.join(__dirname, 'public')));

// Fallback for unmatched routes
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
