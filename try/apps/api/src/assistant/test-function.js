// src/assistant/test-function.js
require('dotenv').config();
const mongoose = require('mongoose');
const registry = require('./function-registry');

const MONGODB_URI = process.env.MONGODB_URI || '';

// Connect to MongoDB
async function connectDB() {
  console.log('Connecting to MongoDB...');
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}

async function testFunctions() {
  try {
    // 1. Test getOrderStatus
    const orderId = '68eb5ffd953669d3ebe378d7'; // Example order _id
    const order = await registry.execute('getOrderStatus', { orderId });
    console.log('\nOrder:', order);

    // 2. Test searchProducts
    const products = await registry.execute('searchProducts', { query: 'Wireless Headphones' });
    console.log('\nProducts:', products);

    // 3. Test getCustomerOrders
    const email = 'anna.chemaly@example.com'; // Customer email
    const customerOrders = await registry.execute('getCustomerOrders', { email });
    console.log(`\nCustomer Orders for ${email}:`, customerOrders);

    if (customerOrders.length === 0) {
      console.log('No orders found for this customer.');
    } else {
      console.log(`Total orders found: ${customerOrders.length}`);
    }
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    mongoose.connection.close();
  }
}

// Run
(async () => {
  await connectDB();
  await testFunctions();
})();
