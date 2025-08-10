const express = require('express');
const path = require('path');
const { readJson, writeJson } = require('../utils/jsonStore');
const { z } = require('zod');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

const booksFile = path.join(__dirname, '../data/books.json');

const readBooks = () => readJson(booksFile);
const writeBooks = (data) => writeJson(booksFile, data);

// List all books
router.get('/', async (req, res) => {
  try {
    const books = await readBooks();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Failed to read books', error: err.message });
  }
});

// Get a book by id
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const books = await readBooks();
    const book = books.find((b) => b.id === id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: 'Failed to read books', error: err.message });
  }
});

// Create a new book (admin only)
router.post('/', requireAuth, async (req, res) => {
  const schema = z.object({
    id: z.string(),
    title: z.string(),
    author: z.string(),
    description: z.string(),
    link: z.string().url(),
    cover: z.string().url().optional().nullable(),
    isbn: z.string().optional().nullable(),
  });
  try {
    const payload = schema.parse(req.body);
    const books = await readBooks();
    if (books.some((b) => b.id === payload.id)) {
      return res.status(400).json({ message: 'A book with this ID already exists' });
    }
    books.push(payload);
    await writeBooks(books);
    res.status(201).json(payload);
  } catch (err) {
    res.status(400).json({ message: 'Invalid data', error: err.message });
  }
});

// Update an existing book (admin only)
router.put('/:id', requireAuth, async (req, res) => {
  const id = req.params.id;
  const schema = z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    description: z.string().optional(),
    link: z.string().url().optional(),
    cover: z.string().url().optional().nullable(),
    isbn: z.string().optional().nullable(),
  });
  try {
    const payload = schema.parse(req.body);
    const books = await readBooks();
    const idx = books.findIndex((b) => b.id === id);
    if (idx === -1) return res.status(404).json({ message: 'Book not found' });
    books[idx] = { ...books[idx], ...payload };
    await writeBooks(books);
    res.json(books[idx]);
  } catch (err) {
    res.status(400).json({ message: 'Invalid data', error: err.message });
  }
});

// Delete a book (admin only)
router.delete('/:id', requireAuth, async (req, res) => {
  const id = req.params.id;
  try {
    const books = await readBooks();
    const filtered = books.filter((b) => b.id !== id);
    if (filtered.length === books.length) return res.status(404).json({ message: 'Book not found' });
    await writeBooks(filtered);
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete book', error: err.message });
  }
});

module.exports = router;