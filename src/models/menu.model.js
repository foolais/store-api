const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  is_available: {
    type: Boolean,
    require: true,
    default: true
  },
  category: {
    type: String,
    require: true,
    default: 'food',
    enum: ['food', 'drink']
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

const menuModel = mongoose.model('menu', menuSchema);

module.exports = menuModel;
