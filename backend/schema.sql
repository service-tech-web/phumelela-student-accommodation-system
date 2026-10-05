-- Run this once against your Render/Railway PostgreSQL database
-- (each platform gives you a way to run SQL — either a built-in
-- query console, or connect with a tool like TablePlus/pgAdmin
-- using the connection string they provide).

CREATE TABLE IF NOT EXISTS applications (
  id SERIAL PRIMARY KEY,
  first_name TEXT,
  surname TEXT,
  student_number VARCHAR(20) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  gender VARCHAR(20),
  additional_info TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reservations (
  id SERIAL PRIMARY KEY,
  first_name TEXT,
  surname TEXT,
  student_number VARCHAR(20) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  gender VARCHAR(20),
  additional_info TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ------------------------------------------------------------
-- FOR A DATABASE THAT ALREADY EXISTS (like your live one on Render)
-- ------------------------------------------------------------
-- The CREATE TABLE lines above do nothing when a table already exists,
-- so run this part to add the new columns and the "one student number,
-- one entry" rule. It is safe to run more than once.
--
-- If the last two lines give an error, some student numbers are already
-- in the table twice. Find them with:
--   SELECT student_number, COUNT(*) FROM applications
--   GROUP BY student_number HAVING COUNT(*) > 1;

ALTER TABLE applications
  ADD COLUMN IF NOT EXISTS first_name TEXT,
  ADD COLUMN IF NOT EXISTS surname TEXT;

ALTER TABLE reservations
  ADD COLUMN IF NOT EXISTS first_name TEXT,
  ADD COLUMN IF NOT EXISTS surname TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS applications_student_number_key
  ON applications (student_number);

CREATE UNIQUE INDEX IF NOT EXISTS reservations_student_number_key
  ON reservations (student_number);
