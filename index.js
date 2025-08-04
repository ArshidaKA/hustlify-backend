import express from 'express';
import dotenv from 'dotenv';
import blogRoutes from './routes/blogRoutes.js';
import cors from 'cors';
import connectDB from './config/db.js';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/blogs', blogRoutes);

// DB + Server Start
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
