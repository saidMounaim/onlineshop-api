import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import connectDB from './config/db.js';

import { notFound, errorHandler } from './middlewares/ErrorMiddleware.js';

//ROUTES
import UserRoutes from './routes/UserRoutes.js';
import AuthRoutes from './routes/AuthRoutes.js';

dotenv.config();

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// WELCOME ROUTE
app.get('/api/v1/', (req, res) => {
	res.status(201).json({ success: true, message: 'Welcome to online shop API' });
});

//USER ROUTES
app.use('/api/v1/users', UserRoutes);

//AUTH ROUTES
app.use('/api/v1/auth', AuthRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running on PORT ${PORT}`));
