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
  status: {
    type: String,
    require: true,
    default: 'available'
  },
  category: {
    type: String,
    require: true,
    default: 'Food'
  },
  keterangan: {
    type: String,
    require: true,
    default: ''
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
