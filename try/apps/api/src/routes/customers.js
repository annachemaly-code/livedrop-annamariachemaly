// src/routes/customers.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Customer schema
const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  address: String,
}, { timestamps: true });

const Customer = mongoose.model('Customer', customerSchema);

// GET /api/customers?email=...
router.get('/', async (req, res) => {
  try {
    const { email } = req.query;
    if (email) {
      const customer = await Customer.findOne({ email });
      if (!customer) return res.status(404).json({ error: 'Customer not found' });
      return res.json(customer);
    }
    // If no email, return all customers
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/customers/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid customer ID' });
    }
    const customer = await Customer.findById(id);
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    res.json(customer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
