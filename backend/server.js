require('dotenv').config({ path: './backend/.env' });
const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');


const app = express();

// ── MIDDLEWARE ──────────────────────────────────────
// Allow JSON data in requests
app.use(express.json());

// Allow frontend to talk to backend (different ports)
app.use(cors());

// ── DATABASE CONNECTION ─────────────────────────────
mongoose.connect('mongodb://localhost:27017/minicrm')
  .then(() => console.log('✅ MongoDB Connected Successfully!'))
  .catch((err) => console.log('❌ MongoDB Connection Error:', err));

// ── ROUTES ──────────────────────────────────────────
// All lead routes → /api/leads
app.use('/api/leads', require('./routes/leads'));

// ── TEST ROUTE ──────────────────────────────────────
// Open browser → http://localhost:5000 → should show this message
app.get('/', (req, res) => {
  res.send('🚀 LeadFlow CRM Server is Running!');
});

// ── START SERVER ────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});