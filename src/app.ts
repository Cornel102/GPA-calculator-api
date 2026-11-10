import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import 'express-async-errors'; // to handle async errors

import studentRoutes from './routes/studentRoutes';
import subjectRoutes from './routes/subjectRoutes';
import scoreRoutes from './routes/scoreRoutes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();

// Health-check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use(cors());
app.use(express.json());

// Base API router
const apiRouter = express.Router();
apiRouter.use('/students', studentRoutes);
apiRouter.use('/subjects', subjectRoutes);
apiRouter.use('/', scoreRoutes); // scoreRoutes defines its own paths

app.use('/api/v1', apiRouter);

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error('Error: MONGO_URI is not defined in the environment variables.');
  process.exit(1);
}

(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
})();

