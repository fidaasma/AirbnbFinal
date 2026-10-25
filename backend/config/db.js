const mongoose = require('mongoose');

/**
 * Connects to MongoDB using the connection string in process.env.MONGO_URI.
 * Exits the process if the connection cannot be made, because the API is
 * useless without its database.
 */
const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error('[DB] MONGO_URI is not defined. Add it to your .env file.');
    process.exit(1);
  }

  try {
    const { connection } = await mongoose.connect(uri);
    console.log(`[DB] MongoDB connected: ${connection.host}/${connection.name}`);
  } catch (error) {
    console.error(`[DB] MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

// Log problems that happen AFTER the first successful connection
mongoose.connection.on('error', (err) => console.error(`[DB] Error: ${err.message}`));
mongoose.connection.on('disconnected', () => console.warn('[DB] MongoDB disconnected'));

module.exports = connectDB;
