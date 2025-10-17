// src/routes/dashboard.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('./orders').Order || mongoose.model('Order'); 


// Business Metrics
// GET /api/dashboard/business-metrics
// Returns totalRevenue, totalOrders, averageOrderValue

router.get('/business-metrics', async (req, res) => {
  try {
    const metrics = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$total' },
          totalOrders: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          totalRevenue: 1,
          totalOrders: 1,
          averageOrderValue: {
            $cond: [
              { $eq: ['$totalOrders', 0] },
              0,
              { $divide: ['$totalRevenue', '$totalOrders'] }
            ]
          }
        }
      }
    ]);

    res.json(metrics[0] || { totalRevenue: 0, totalOrders: 0, averageOrderValue: 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});


// Performance Metrics
// GET /api/dashboard/performance
// Returns API latency and SSE connections (example/mock values)

router.get('/performance', (req, res) => {
  const apiLatencyMs = Math.floor(Math.random() * 20) + 5; // Example latency
  const sseConnections = 5; // Example SSE connections

  res.json({ apiLatencyMs, sseConnections });
});


// Assistant Stats
// GET /api/dashboard/assistant-stats
// Returns intent distribution and function call counts (mocked data)

router.get('/assistant-stats', (req, res) => {
  const intentDistribution = {
    greeting: 10,
    orderStatus: 7,
    support: 3
  };

  const functionCalls = {
    getOrder: 5,
    updateCart: 4
  };

  res.json({ intentDistribution, functionCalls });
});

module.exports = router;
