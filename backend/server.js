import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import applyRoutes from './routes/apply.js';
import reserveRoutes from './routes/reserve.js';
import contactRoutes from './routes/contact.js';
import adminRoutes from './routes/admin.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Only your own frontend may send requests to this backend.
// On Render, set FRONTEND_URL (no slash at the end).
// On your computer it falls back to the Vite dev server.
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json());

app.use('/api', applyRoutes);
app.use('/api', reserveRoutes);
app.use('/api', contactRoutes);
app.use('/api', adminRoutes);

app.get('/', (req, res) => {
  res.send('Phumelela backend is running.');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
