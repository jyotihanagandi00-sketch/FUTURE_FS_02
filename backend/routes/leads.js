const express = require('express');
const router  = express.Router();
const Lead    = require('../models/Lead');

// ── GET ALL LEADS ────────────────────────────────────
// URL: GET http://localhost:5000/api/leads
router.get('/', async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 }); // newest first
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET ONE LEAD ─────────────────────────────────────
// URL: GET http://localhost:5000/api/leads/:id
router.get('/:id', async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    res.json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── CREATE NEW LEAD ──────────────────────────────────
// URL: POST http://localhost:5000/api/leads
router.post('/', async (req, res) => {
  try {
    const lead = new Lead(req.body); // take data from request body
    await lead.save();               // save to MongoDB
    res.status(201).json(lead);      // send back the saved lead
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── UPDATE A LEAD ────────────────────────────────────
// URL: PUT http://localhost:5000/api/leads/:id
router.put('/:id', async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,  // find lead by id
      req.body,       // update with new data
      { new: true }   // return the updated document
    );
    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    res.json(lead);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── DELETE A LEAD ────────────────────────────────────
// URL: DELETE http://localhost:5000/api/leads/:id
router.delete('/:id', async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    res.json({ message: '✅ Lead deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;