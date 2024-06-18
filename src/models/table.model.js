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
    default: 'empty',
    enum: ['empty', 'waiting', 'eating']
  },
  category: {
    type: String,
    required: true,
    default: 'regular',
    enum: ['regular', 'custom']
  },
  type: {
    type: String,
    required: true,
    default: 'regular',
    enum: ['dine_in', 'take_away']
  },
  is_order: {
    type: Boolean,
    required: true,
    default: false
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
