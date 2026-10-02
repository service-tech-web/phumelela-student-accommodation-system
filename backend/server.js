import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import applyRoutes from './routes/apply.js';
import reserveRoutes from './routes/reserve.js';
import contactRoutes from './routes/contact.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', applyRoutes);
app.use('/api', reserveRoutes);
app.use('/api', contactRoutes);

app.get('/', (req, res) => {
  res.send('Phumelela backend is running.');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
