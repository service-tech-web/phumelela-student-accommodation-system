import { Router } from 'express';
import db from '../db.js';

const router = Router();

router.post('/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      error: 'name, email, subject, and message are all required.',
    });
  }

  try {
    const result = await db.query(
      `INSERT INTO contact_messages (name, email, subject, message)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, email, subject, message]
    );

    res.status(201).json({
      message: 'Message sent successfully.',
      contactMessage: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong sending your message.' });
  }
});

router.get('/contact', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM contact_messages ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not fetch messages.' });
  }
});

export default router;
