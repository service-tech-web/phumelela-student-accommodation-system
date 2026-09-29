import { Router } from 'express';
import { readDB, writeDB } from '../db.js';

const router = Router();

router.post('/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      error: 'name, email, subject, and message are all required.',
    });
  }

  const db = await readDB();

  const newMessage = {
    id: Date.now(),
    name,
    email,
    subject,
    message,
    createdAt: new Date().toISOString(),
  };

  db.contactMessages.push(newMessage);
  await writeDB(db);

  res.status(201).json({
    message: 'Message sent successfully.',
    contactMessage: newMessage,
  });
});

router.get('/contact', async (req, res) => {
  const db = await readDB();
  res.json(db.contactMessages);
});

export default router;
