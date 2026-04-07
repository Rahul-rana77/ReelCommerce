//this file for creating server and connecting all routes and middlewares
import express from 'express';
import authRoutes from './routes/auth.route.js';
import reelRoutes from './routes/reel.route.js';
import cookieparser from 'cookie-parser';
import cors from 'cors';
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

app.use(cookieparser());

app.use('/api/auth', authRoutes);
app.use('/api/reels', reelRoutes);


app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;