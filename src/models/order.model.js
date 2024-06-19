const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  table: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'table',
      required: true,
      validate: {
        validator: async (value) => {
          if (!value) return true;

          return await mongoose.model('table').exists({ _id: value });
        },
        message: 'Table ID tidak ditemukan'
      }
    },
    name: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    }
  },
  menu: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'menu',
        required: true,
        validate: {
          validator: async (value) => {
            if (!value) return true;

            return await mongoose.model('menu').exists({ _id: value });
          },
          message: 'Menu ID tidak ditemukan'
        }
      },
      name: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      category: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      is_take_away: {
        type: Boolean,
        required: true,
        default: false
      },
      is_served: {
        type: Boolean,
        required: true,
        default: false
      }
    }
  ],
  notes: {
    type: String,
    default: ''
  },
  number_order: {
    type: String,
    required: true
  },
  total_price: {
    type: Number,
    required: true
  },
  is_finished: {
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

const orderModel = mongoose.model('order', orderSchema);

module.exports = orderModel;
