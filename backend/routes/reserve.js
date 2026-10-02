import { Router } from 'express';
import db from '../db.js';

const router = Router();

router.post('/reserve', async (req, res) => {
  const { studentNumber, email, phone, gender, additionalInfo } = req.body;

  if (!studentNumber || !email || !phone) {
    return res.status(400).json({
      error: 'studentNumber, email, and phone are all required.',
    });
  }

  try {
    await db.query(
      `INSERT INTO reservations (student_number, email, phone, gender, additional_info)
       VALUES ($1, $2, $3, $4, $5)`,
      [studentNumber, email, phone, gender ?? null, additionalInfo ?? null]
    );

    res.status(201).json({ message: 'Reservation confirmed successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong saving your reservation.' });
  }
});

export default router;
