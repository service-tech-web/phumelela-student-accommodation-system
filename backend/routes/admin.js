import { Router } from 'express';
import crypto from 'node:crypto';
import db from '../db.js';

const router = Router();

// Every /admin route needs the secret key in the "x-admin-key" header.
// The key lives in the ADMIN_KEY environment variable on Render,
// never in the code and never in the frontend files.
function requireAdmin(req, res, next) {
  const expected = process.env.ADMIN_KEY;

  if (!expected) {
    return res.status(503).json({ error: 'Admin access is not set up.' });
  }

  const given = req.get('x-admin-key') || '';

  // Compare hashes so the check takes the same time for every guess.
  const a = crypto.createHash('sha256').update(given).digest();
  const b = crypto.createHash('sha256').update(expected).digest();

  if (!crypto.timingSafeEqual(a, b)) {
    return res.status(401).json({ error: 'Wrong admin key.' });
  }

  next();
}

router.use('/admin', requireAdmin);

router.get('/admin/applications', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM applications ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not fetch applications.' });
  }
});

router.get('/admin/reservations', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM reservations ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not fetch reservations.' });
  }
});

router.get('/admin/messages', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM contact_messages ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not fetch messages.' });
  }
});

export default router;
