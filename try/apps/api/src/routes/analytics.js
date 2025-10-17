const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const os = require('os');
const checkDiskSpace = require('check-disk-space').default;
const Order = require('./orders').Order || mongoose.model('Order'); 

//  BUSINESS METRICS 
router.get('/daily-revenue', async (req, res) => {
  try {
    const { from, to } = req.query;
    if (!from || !to) return res.status(400).json({ error: 'from and to query params are required' });

    const fromDate = new Date(from);
    const toDate = new Date(to);
    if (isNaN(fromDate) || isNaN(toDate)) return res.status(400).json({ error: 'Invalid date format' });

    const dailyRevenue = await Order.aggregate([
      { $match: { $expr: { $and: [
        { $gte: [{ $toDate: "$createdAt" }, fromDate] },
        { $lte: [{ $toDate: "$createdAt" }, toDate] }
      ]}}},
      { $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: { $toDate: "$createdAt" } } },
        revenue: { $sum: '$total' },
        orderCount: { $sum: 1 }
      }},
      { $project: { _id: 0, date: '$_id', revenue: 1, orderCount: 1 } },
      { $sort: { date: 1 } }
    ]);

    res.json(dailyRevenue);
  } catch (err) {
    console.error('Error in /daily-revenue:', err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/dashboard-metrics', async (req, res) => {
  try {
    const metrics = await Order.aggregate([
      { $group: {
        _id: null,
        totalRevenue: { $sum: '$total' },
        totalOrders: { $sum: 1 },
        pendingOrders: { $sum: { $cond: [{ $eq: ['$status', 'PENDING'] }, 1, 0] } }
      }},
      { $project: {
        _id: 0,
        totalRevenue: 1,
        totalOrders: 1,
        pendingOrders: 1,
        averageOrderValue: { $cond: [{ $eq: ['$totalOrders', 0] }, 0, { $divide: ['$totalRevenue', '$totalOrders'] }] }
      }}
    ]);

    res.json(metrics[0] || { totalRevenue: 0, totalOrders: 0, pendingOrders: 0, averageOrderValue: 0 });
  } catch (err) {
    console.error('Error in /dashboard-metrics:', err);
    res.status(500).json({ error: err.message });
  }
});

// PERFORMANCE
router.get('/performance', async (req, res) => {
  try {
    const performance = {
      apiLatency: Math.floor(Math.random() * 200) + 50,
      dbQueryTime: Math.floor(Math.random() * 50) + 5,
      activeUsers: Math.floor(Math.random() * 10) + 1,
      failedRequests: Math.floor(Math.random() * 5),
      cpuUsage: parseFloat(getCpuUsage().toFixed(2)),
      memoryUsage: parseFloat((((os.totalmem() - os.freemem()) / os.totalmem()) * 100).toFixed(2))
    };
    res.json(performance);
  } catch (err) {
    console.error('Error in /performance:', err);
    res.status(500).json({ error: err.message });
  }
});

// Helper for CPU usage
function getCpuUsage() {
  const cpus = os.cpus();
  let totalIdle = 0, totalTick = 0;
  cpus.forEach(cpu => {
    for (let type in cpu.times) {
      totalTick += cpu.times[type];
    }
    totalIdle += cpu.times.idle;
  });
  return ((1 - totalIdle / totalTick) * 100);
}

//  ASSISTANT 
router.get('/assistant', async (req, res) => {
  try {
    res.json({
      totalQueries: 42,
      intentDistribution: { search_product: 20, track_order: 10, customer_support: 8, other: 4 },
      functionCalls: { getProducts: 12, getOrderStatus: 6, sendSupportMessage: 4 },
      avgResponseTime: 280
    });
  } catch (err) {
    console.error('Error in /assistant:', err);
    res.status(500).json({ error: err.message });
  }
});

// SYSTEM HEALTH
router.get('/system-health', async (req, res) => {
  try {
    const disk = await checkDiskSpace(os.platform() === 'win32' ? 'C:/' : '/');
    const systemHealth = {
      dbStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
      cpuUsage: parseFloat(getCpuUsage().toFixed(2)),
      memoryUsage: parseFloat((((os.totalmem() - os.freemem()) / os.totalmem()) * 100).toFixed(2)),
      diskSpace: parseFloat(((disk.size - disk.free) / disk.size * 100).toFixed(2)),
      activeUsers: Math.floor(Math.random() * 10) + 1,
      lastUpdated: new Date()
    };
    res.json(systemHealth);
  } catch (err) {
    console.error('Error in /system-health:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
