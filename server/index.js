require('dotenv').config({ path: './server/.env' });
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/mongodb');

const authRoutes = require('./routes/auth');
const developerRoutes = require('./routes/developers');

const app = express();
const PORT = process.env.PORT || 5000;

console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://warm-gumption-44bfd7.netlify.app',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/developers', developerRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
