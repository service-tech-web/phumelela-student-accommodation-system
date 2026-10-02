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
    const result = await db.query(
      `INSERT INTO reservations (student_number, email, phone, gender, additional_info)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [studentNumber, email, phone, gender ?? null, additionalInfo ?? null]
    );

    res.status(201).json({
      message: 'Reservation confirmed successfully.',
      reservation: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong saving your reservation.' });
  }
});

router.get('/reserve', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM reservations ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not fetch reservations.' });
  }
});

export default router;
