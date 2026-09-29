import { Router } from 'express';
import { readDB, writeDB } from '../db.js';

const router = Router();

router.post('/reserve', async (req, res) => {
  const { studentNumber, email, phone, gender, additionalInfo } = req.body;

  if (!studentNumber || !email || !phone) {
    return res.status(400).json({
      error: 'studentNumber, email, and phone are all required.',
    });
  }

  const db = await readDB();

  const newReservation = {
    id: Date.now(),
    studentNumber,
    email,
    phone,
    gender: gender ?? null,
    additionalInfo: additionalInfo ?? null,
    createdAt: new Date().toISOString(),
  };

  db.reservations.push(newReservation);
  await writeDB(db);

  res.status(201).json({
    message: 'Reservation confirmed successfully.',
    reservation: newReservation,
  });
});

router.get('/reserve', async (req, res) => {
  const db = await readDB();
  res.json(db.reservations);
});

export default router;
