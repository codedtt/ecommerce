// src/app.ts
import express, { type Request, type Response } from 'express';
import * as dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON bodies
app.use(express.json());

// Basic sanity check route
app.get('/', (req: Request, res: Response) => {
    res.send('E-commerce API is running!');
});

// TODO: Import and use API routes here

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`Nth order trigger set to: ${process.env.NTH_ORDER_TRIGGER}`);
});