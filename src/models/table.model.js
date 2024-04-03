const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: 'empty'
  },
  category: {
    type: String,
    required: true,
    default: 'regular'
  },
  timestamps: {
    created_at: {
      type: Date,
      default: Date.now
    },
    updated_at: {
      type: Date,
      default: Date.now
    }
  }
});

const tableModel = mongoose.model('table', tableSchema);

module.exports = tableModel;
