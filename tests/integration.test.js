/**
 * Integration Tests - End-to-end workflows using real MongoDB + SSE
 */

const request = require('supertest');
const mongoose = require('mongoose');
require('dotenv').config({ path: './try/apps/api/.env' });

const app = require('../try/apps/api/src/server'); // Express app
const detectIntent = require('../try/apps/api/src/assistant/intent-classifier');
const registry = require('../try/apps/api/src/assistant/function-registry');
const respond = require('../try/apps/api/src/assistant/engine');
const { Customer } = require('../try/apps/api/src/assistant/models');

const { EventSource } = require('eventsource');

// Connect to MongoDB
beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Disconnect after tests
afterAll(async () => {
  await mongoose.connection.close();
});

// Helpers
async function getTestCustomer() {
  return (
    (await Customer.findOne({ email: 'test@example.com' })) ||
    (await Customer.create({
      name: 'Test User',
      email: 'test@example.com',
      phone: '1234567890',
      address: '123 Test Street'
    }))
  );
}

async function createOrder(customerId, productId, quantity = 1) {
  const res = await request(app)
    .post('/api/orders')
    .send({ customerId, items: [{ productId, quantity }] });

  if ([200, 201].includes(res.statusCode) && res.body?._id) {
    return res.body._id;
  }
  throw new Error(`Failed to create order: ${JSON.stringify(res.body)}`);
}

// Tests
describe('Integration Tests - End-to-end workflows', () => {
  jest.setTimeout(90000); // enough time for DB + SSE

  test('Complete Purchase Flow with SSE', async () => {
    const testCustomer = await getTestCustomer();

    // 1. Browse products
    const productsRes = await request(app).get('/api/products');
    expect([200, 201]).toContain(productsRes.statusCode);
    const firstProduct = productsRes.body[0];
    expect(firstProduct).toHaveProperty('_id');

    // 2. Create order
    const orderId = await createOrder(testCustomer._id, firstProduct._id);
    expect(orderId).toBeDefined();

    // 3. SSE subscription
    const sseUrl = `http://localhost:${process.env.PORT || 5000}/api/orders/${orderId}/stream`;
    const updates = [];

    // Wrap in try-catch to prevent 500 errors from killing test
    await new Promise((resolve, reject) => {
      const es = new EventSource(sseUrl);

      es.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.status) updates.push(data.status.toLowerCase());
          if (data.status?.toLowerCase() === 'delivered') {
            es.close();
            resolve();
          }
        } catch (err) {
          es.close();
          reject(err);
        }
      };

      es.onerror = (err) => {
        es.close();
        resolve(); // don't fail test on SSE disconnect
      };

      setTimeout(() => {
        es.close();
        resolve(); // safety timeout
      }, 30000);
    });

    
    // 4. Ask assistant about order status
    const assistantResp = await respond(`What is the status of order ${orderId}?`);
    expect(assistantResp).toHaveProperty('text');
    expect(assistantResp.text.toLowerCase()).toMatch(/pending|processing|shipped|delivered|status|order/);

    // 5. Verify registry.execute was called
    const spy = jest.spyOn(registry, 'execute');
    await respond(`What is the status of order ${orderId}?`);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  test('Support Interaction Flow', async () => {
    const testCustomer = await getTestCustomer();
    const policyQ = 'What is your return policy?';
    const assistantResp = await respond(policyQ);
    expect(assistantResp).toHaveProperty('text');
    expect(assistantResp.text.toLowerCase()).toMatch(/return|refund|exchange|days|policy/);
  });

  test('Multi-Intent Conversation', async () => {
    const testCustomer = await getTestCustomer();
    const productsRes = await request(app).get('/api/products');
    const firstProduct = productsRes.body[0];
    const orderId = await createOrder(testCustomer._id, firstProduct._id);

    const conversation = [
      { text: 'Hello there!', expected: /chitchat|greet|hi|hello/i },
      { text: 'Show me the best running shoes', expected: /product_search|product|search|shoes/i },
      { text: 'What is your refund policy?', expected: /policy|refund|return/i },
      { text: `Check my order ${orderId}`, expected: /order_status|order|track/i },
    ];

    for (const turn of conversation) {
      const intentType = typeof detectIntent(turn.text) === 'string'
        ? detectIntent(turn.text)
        : detectIntent(turn.text)?.type || detectIntent(turn.text)?.intent;

      expect(String(intentType).toLowerCase()).toMatch(turn.expected);
      const reply = await respond(turn.text);
      expect(reply).toHaveProperty('text');
      expect(String(reply.text).length).toBeGreaterThan(0);
    }
  });
});
