-- Run this once against your Render/Railway PostgreSQL database
-- (each platform gives you a way to run SQL — either a built-in
-- query console, or connect with a tool like TablePlus/pgAdmin
-- using the connection string they provide).

CREATE TABLE IF NOT EXISTS applications (
  id SERIAL PRIMARY KEY,
  student_number VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  gender VARCHAR(20),
  additional_info TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reservations (
  id SERIAL PRIMARY KEY,
  student_number VARCHAR(20) NOT NULL,
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
