import { Router } from 'express';
import db from '../db.js';

const router = Router();

router.post('/reserve', async (req, res) => {
  const { firstName, surname, studentNumber, email, phone, gender, additionalInfo } = req.body;

  const cleanFirstName = firstName?.trim();
  const cleanSurname = surname?.trim();
  const cleanStudentNumber = studentNumber?.trim();

  if (!cleanFirstName || !cleanSurname || !cleanStudentNumber || !email || !phone) {
    return res.status(400).json({
      error: 'firstName, surname, studentNumber, email, and phone are all required.',
    });
  }

  if (!/^\d{9}$/.test(cleanStudentNumber)) {
    return res.status(400).json({
      field: 'student-number',
      error: 'Student number must be 9 digits.',
    });
  }

  try {
    await db.query(
      `INSERT INTO reservations (first_name, surname, student_number, email, phone, gender, additional_info)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [cleanFirstName, cleanSurname, cleanStudentNumber, email, phone, gender ?? null, additionalInfo ?? null]
    );

    res.status(201).json({ message: 'Reservation confirmed successfully.' });
  } catch (err) {
    // 23505 = Postgres says this student number already exists
    if (err.code === '23505') {
      return res.status(409).json({
        field: 'student-number',
        error: 'This student number has already reserved.',
      });
    }
    console.error(err);
    res.status(500).json({ error: 'Something went wrong saving your reservation.' });
  }
});

export default router;
