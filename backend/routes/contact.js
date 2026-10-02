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
    await db.query(
      `INSERT INTO contact_messages (name, email, subject, message)
       VALUES ($1, $2, $3, $4)`,
      [name, email, subject, message]
    );

    res.status(201).json({ message: 'Message sent successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong sending your message.' });
  }
});

export default router;
