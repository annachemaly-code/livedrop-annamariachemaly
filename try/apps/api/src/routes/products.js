// src/routes/products.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: String,
  tags: [String],
  imageUrl: String,
  stock: Number,
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

// GET /api/products
// query: search, tag, sort, page, limit
router.get('/', async (req, res) => {
  try {
    let { search, tag, sort, page, limit } = req.query;

    const query = {};
    if (search) query.name = { $regex: search, $options: 'i' };
    if (tag) query.tags = tag;

    let productsQuery = Product.find(query);

    // Sorting
    if (sort) {
      const order = sort.startsWith('-') ? -1 : 1;
      const field = sort.replace('-', '');
      productsQuery = productsQuery.sort({ [field]: order });
    }

    // Pagination
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 100;
    const skip = (page - 1) * limit;
    productsQuery = productsQuery.skip(skip).limit(limit);

    const products = await productsQuery.exec();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/products
router.post('/', async (req, res) => {
  try {
    const { name, description, price, category, tags, imageUrl, stock } = req.body;
    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price are required' });
    }

    const newProduct = new Product({ name, description, price, category, tags, imageUrl, stock });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
