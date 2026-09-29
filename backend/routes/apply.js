import { Router } from 'express';
import { readDB, writeDB } from '../db.js';

const router = Router();

router.post('/apply', async (req, res) => {
  const { studentNumber, email, phone, gender, additionalInfo } = req.body;

  if (!studentNumber || !email || !phone) {
    return res.status(400).json({
      error: 'studentNumber, email, and phone are all required.',
    });
  }

  const db = await readDB();

  const newApplication = {
    id: Date.now(), // simple unique id — good enough for learning
    studentNumber,
    email,
    phone,
    gender: gender ?? null,
    additionalInfo: additionalInfo ?? null,
    createdAt: new Date().toISOString(),
  };

  db.applications.push(newApplication);
  await writeDB(db);

  res.status(201).json({
    message: 'Application submitted successfully.',
    application: newApplication,
  });
});

// Handy for checking your work in the browser while learning
router.get('/apply', async (req, res) => {
  const db = await readDB();
  res.json(db.applications);
});

export default router;
