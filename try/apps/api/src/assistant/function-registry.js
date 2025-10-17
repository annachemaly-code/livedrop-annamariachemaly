const { Customer, Product, Order } = require('./models');
const mongoose = require('mongoose');

class FunctionRegistry {
  constructor() {
    this.functions = {};
  }

  register(name, fn, schema = {}) {
    this.functions[name] = { fn, schema };
  }

  getAllSchemas() {
    const schemas = {};
    for (const [name, { schema }] of Object.entries(this.functions)) {
      schemas[name] = schema;
    }
    return schemas;
  }

  async execute(name, args) {
    if (!this.functions[name]) {
      throw new Error(`Function "${name}" is not registered`);
    }
    return await this.functions[name].fn(args);
  }
}

const registry = new FunctionRegistry();

// 1. Get order status by orderId
registry.register('getOrderStatus', async ({ orderId }) => {
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new Error('Invalid orderId');
  }
  const order = await Order.findById(orderId).lean();
  if (!order) throw new Error('Order not found');
  return order;
}, { orderId: 'string' });

// 2. Search products
registry.register('searchProducts', async ({ query, limit = 10 }) => {
  const products = await Product.find({
    name: { $regex: query, $options: 'i' }
  }).limit(limit).lean();
  return products;
}, { query: 'string', limit: 'number' });

// 3. Get customer orders by email
registry.register('getCustomerOrders', async ({ email }) => {
  // Find customer by email (case-insensitive)
  const customer = await Customer.findOne({ email: new RegExp(`^${email}$`, 'i') }).lean();
  if (!customer) throw new Error('Customer not found');

  // Use the ObjectId directly for matching
  const orders = await Order.find({ customerId: customer._id }).lean();
  return orders;
}, { email: 'string' });

module.exports = registry;
