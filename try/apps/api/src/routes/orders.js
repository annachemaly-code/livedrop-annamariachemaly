// src/routes/orders.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Order Schema
const orderSchema = new mongoose.Schema({
  customerId: { type: String, required: true }, 
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      name: String,
      price: Number,
      quantity: Number,
    }
  ],
  total: Number,
  status: { type: String, enum: ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED'], default: 'PENDING' },
  carrier: String,
  estimatedDelivery: Date,
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

// POST /api/orders
router.post('/', async (req, res) => {
  try {
    const { customerId, items, total, status, carrier, estimatedDelivery } = req.body;

    if (!customerId || !items || items.length === 0) {
      return res.status(400).json({ error: 'customerId and items are required' });
    }

    const newOrder = new Order({
      customerId,
      items,
      total,
      status,
      carrier,
      estimatedDelivery
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// GET /api/orders?customerId=:customerId
router.get('/', async (req, res) => {
  try {
    const { customerId } = req.query;
    if (!customerId) return res.status(400).json({ error: 'customerId query param is required' });

    // Query using string
    const orders = await Order.find({ customerId });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// GET /api/orders/:id
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

module.exports = router;
