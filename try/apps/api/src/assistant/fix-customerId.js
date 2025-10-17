// src/assistant/fix-customerId.js
const mongoose = require('mongoose');
require('dotenv').config();
const { Order } = require('./models');

async function fixCustomerIds() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');

    const orders = await Order.find({});
    console.log(`Found ${orders.length} orders.`);

    for (const order of orders) {
      // Check if customerId is a string
      if (typeof order.customerId === 'string') {
        order.customerId = mongoose.Types.ObjectId(order.customerId);
        await order.save();
        console.log(`Updated order ${order._id} customerId`);
      }
    }

    console.log('All customerIds fixed!');
    process.exit(0);
  } catch (err) {
    console.error('Error fixing customerIds:', err);
    process.exit(1);
  }
}

fixCustomerIds();
