const express = require('express');
const path = require('path');
const { readJson, writeJson } = require('../utils/jsonStore');
const { z } = require('zod');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// Path to the JSON file storing location data
const locationsFile = path.join(__dirname, '../data/locations.json');

const readLocations = () => readJson(locationsFile);
const writeLocations = (data) => writeJson(locationsFile, data);

// GET all locations
router.get('/', async (req, res) => {
  try {
    const locations = await readLocations();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ message: 'Failed to read locations', error: err.message });
  }
});

// GET a single location by id
router.get('/:id', async (req, res) => {
  try {
    const locations = await readLocations();
    const location = locations.find((l) => l.id === req.params.id);
    if (!location) return res.status(404).json({ message: 'Location not found' });
    res.json(location);
  } catch (err) {
    res.status(500).json({ message: 'Failed to read locations', error: err.message });
  }
});

// Create a new location (admin only)
router.post('/', requireAuth, async (req, res) => {
  const schema = z.object({
    id: z.string(),
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    address: z.string().optional().nullable(),
    lat: z.number().optional(),
    lng: z.number().optional(),
    images: z.any().optional(),
    audio: z.string().optional().nullable(),
    books: z.array(z.string()).optional(),
  });
  try {
    const payload = schema.parse(req.body);
    const locations = await readLocations();
    // avoid duplicate ids
    if (locations.some((l) => l.id === payload.id)) {
      return res.status(400).json({ message: 'A location with this ID already exists' });
    }
    locations.push(payload);
    await writeLocations(locations);
    res.status(201).json(payload);
  } catch (err) {
    res.status(400).json({ message: 'Invalid data', error: err.message });
  }
});

// Update an existing location (admin only)
router.put('/:id', requireAuth, async (req, res) => {
  const id = req.params.id;
  const schema = z.object({
    title: z.string().optional(),
    slug: z.string().optional(),
    description: z.string().optional(),
    address: z.string().optional().nullable(),
    lat: z.number().optional(),
    lng: z.number().optional(),
    images: z.any().optional(),
    audio: z.string().optional().nullable(),
    books: z.array(z.string()).optional(),
  });
  try {
    const payload = schema.parse(req.body);
    const locations = await readLocations();
    const idx = locations.findIndex((l) => l.id === id);
    if (idx === -1) return res.status(404).json({ message: 'Location not found' });
    locations[idx] = { ...locations[idx], ...payload };
    await writeLocations(locations);
    res.json(locations[idx]);
  } catch (err) {
    res.status(400).json({ message: 'Invalid data', error: err.message });
  }
});

// Delete a location (admin only)
router.delete('/:id', requireAuth, async (req, res) => {
  const id = req.params.id;
  try {
    const locations = await readLocations();
    const filtered = locations.filter((l) => l.id !== id);
    if (filtered.length === locations.length) return res.status(404).json({ message: 'Location not found' });
    await writeLocations(filtered);
    res.json({ message: 'Location deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete location', error: err.message });
  }
});

module.exports = router;