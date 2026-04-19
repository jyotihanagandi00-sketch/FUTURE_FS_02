const mongoose = require('mongoose');

// Define the structure of each lead in MongoDB
const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true   // cannot be empty
    },
    email: {
      type: String,
      required: true   // cannot be empty
    },
    phone: {
      type: String,
      default: ''      // optional field
    },
    source: {
      type: String,
      enum: ['Contact Form', 'LinkedIn', 'Referral', 'Instagram', 'Cold Email', 'Other'],
      default: 'Contact Form'
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'converted'],
      default: 'new'   // every new lead starts as "new"
    },
    notes: {
      type: String,
      default: ''      // optional field
    }
  },
  {
    timestamps: true   // auto adds createdAt and updatedAt
  }
);

module.exports = mongoose.model('Lead', leadSchema);