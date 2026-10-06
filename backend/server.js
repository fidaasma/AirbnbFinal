require('dotenv').config(); // 1. load .env before anything reads process.env

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const connectDB = require('./config/db');
const listingRoutes = require('./routes/listingRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const { sendSuccess } = require('./utils/apiResponse');

const app = express();
const PORT = process.env.PORT || 5000;

// ---- Global middleware ----
// CORS: set CORS_ORIGIN in .env to your frontend URL(s) when deploying (comma-separated)
const allowedOrigins = process.env.CORS_ORIGIN && process.env.CORS_ORIGIN !== '*'
  ? process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim())
  : '*';
app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: '1mb' })); // parse JSON request bodies
app.use(morgan('dev'));                  // log every request

// ---- Routes ----
app.get('/api/health', (req, res) => sendSuccess(res, 200, { message: 'API is running' }));
app.use('/api/listings', listingRoutes);

// ---- Error handling (must be registered LAST) ----
app.use(notFound);
app.use(errorHandler);

// ---- Start: connect to the database first, then accept requests ----
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => console.log(`[SERVER] Running on http://localhost:${PORT}`));
};

startServer();
