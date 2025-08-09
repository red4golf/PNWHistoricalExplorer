const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const fileType = require('file-type');
const { nanoid } = require('nanoid');
const path = require('path');
const fs = require('fs').promises;
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// Use memory storage so we can inspect & transform the file before saving
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

/**
 * POST /api/upload/image
 * Accepts a single file under the field name `file` and returns
 * resized versions stored in the server's public directory.
 * This route is protected by JWT auth.
 */
router.post('/image', requireAuth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const type = await fileType.fromBuffer(req.file.buffer);
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!type || !allowed.includes(type.mime)) {
      return res.status(415).json({ message: 'Unsupported file type' });
    }
    const id = nanoid();
    const outputDir = path.join(__dirname, '../public/images');
    await fs.mkdir(outputDir, { recursive: true });
    const baseName = `${id}`;
    // Process image into three sizes using sharp
    const fullBuffer = await sharp(req.file.buffer)
      .rotate()
      .withMetadata(false)
      .resize({ width: 2000 })
      .toFormat('webp')
      .toBuffer();
    const cardBuffer = await sharp(req.file.buffer)
      .rotate()
      .withMetadata(false)
      .resize({ width: 1024 })
      .toFormat('webp')
      .toBuffer();
    const thumbBuffer = await sharp(req.file.buffer)
      .rotate()
      .withMetadata(false)
      .resize({ width: 320 })
      .toFormat('webp')
      .toBuffer();
    await Promise.all([
      fs.writeFile(path.join(outputDir, `${baseName}-full.webp`), fullBuffer),
      fs.writeFile(path.join(outputDir, `${baseName}-card.webp`), cardBuffer),
      fs.writeFile(path.join(outputDir, `${baseName}-thumb.webp`), thumbBuffer),
    ]);
    // Respond with paths relative to the server root
    const publicBase = 'public/images';
    res.status(201).json({
      ok: true,
      images: {
        full: `${publicBase}/${baseName}-full.webp`,
        card: `${publicBase}/${baseName}-card.webp`,
        thumb: `${publicBase}/${baseName}-thumb.webp`,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to process image', error: err.message });
  }
});

module.exports = router;