//this file for starting the server
import app from './src/app.js';
import connectDB from './src/db/db.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 8000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error("Failed to start server:", error);
});