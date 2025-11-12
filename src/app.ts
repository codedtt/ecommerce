// src/app.ts (FINAL VERSION)
import express, { type Request, type Response } from 'express';
import * as dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config(); 

import clientRoutes from './routes/ClientRoutes.js';
import adminRoutes from './routes/AdminRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON bodies
app.use(express.json());

// Basic sanity check route
app.get('/', (req: Request, res: Response) => {
    res.send('E-commerce API is running!');
});

// --- API Route Integration ---
app.use('/api/v1', clientRoutes);
app.use('/api/v1/admin', adminRoutes); // Admin routes under a separate path

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`Nth order trigger set to: ${process.env.NTH_ORDER_TRIGGER}`);
    console.log(`NOTE: Data is stored in-memory and will reset on server restart.`);
});