import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import cookieParser from 'cookie-parser';
import path from 'path'
import { fileURLToPath } from 'url';
import cors from 'cors'; // Import cors
const port = process.env.PORT || 3000;
dotenv.config();
// Define __filename and __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('MongoDb is connected');
  })
  .catch((err) => {
    console.log(err); 
  });

// const __dirname = path.resolve();

const app = express();

app.use(cors()); // Enable CORS
app.use(express.json());
app.use(cookieParser());
app.use(express.static(__dirname+'/dist'));
// Routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

// Serve static files from the client
// app.use(express.static(path.join(__dirname, '/client/dist')));

// Handle all other routes and serve the client app
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// });


// Error handling middleware

app.use('*',(req,res)=>
{
  return res.sendFile(__dirname + '/dist/index.html');
})
// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || 'Internal Server Error';
  // res.status(statusCode).json({
  //   success: false,
  //   statusCode,
  //   message,
  // });
// });

app.listen(port, () => {
  console.log('Server is running on port '+port+'!');
});
