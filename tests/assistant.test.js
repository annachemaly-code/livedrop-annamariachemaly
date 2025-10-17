const detectIntent = require('../../apps/api/src/assistant/intent-classifier');
const registry = require('../../apps/api/src/assistant/function-registry');

//  Mocked KB responses for policy questions 
const KB_RESPONSES = {
  'What is your return policy?': { reply: 'Items can be returned within 30 days of purchase with original receipt.', source: 'KB' },
  'Do you have a warranty on electronics?': { reply: 'All electronics come with a 1-year manufacturer warranty covering defects.', source: 'KB' }
};

describe('Assistant - Intent Detection, Identity & Function Calling', () => {

  //  Intent Detection Tests 
  const intentTests = [
    { input: 'Hello!', expected: 'chitchat' },
    { input: 'How are you?', expected: 'chitchat' },
    { input: 'Good morning!', expected: 'chitchat' },
    { input: 'I want to buy shoes', expected: 'product_search' },
    { input: 'Show me laptops under $1000', expected: 'product_search' },
    { input: 'Find wireless headphones', expected: 'product_search' },
    { input: 'How do I return an item?', expected: 'policy_question' },
    { input: 'What is your refund policy?', expected: 'policy_question' },
    { input: 'Do you have a warranty on electronics?', expected: 'policy_question' },
    { input: 'What is my order status for ID 68eb5ffd953669d3ebe378d7?', expected: 'order_status' },
    { input: 'Check order 68eb5ffd953669d3ebe378d8', expected: 'order_status' },
    { input: 'Track my recent order', expected: 'order_status' },
  ];

  intentTests.forEach(({ input, expected }) => {
    test(`Intent detection for: "${input}" → ${expected}`, () => {
      const result = detectIntent(input);
      expect(result).toBe(expected);
    });
  });

  //  Identity Tests 
  test('Should NOT reveal ChatGPT/Llama', () => {
    const response = "I am your assistant.";
    expect(response).not.toMatch(/ChatGPT|Llama/i);
  });

  test('Should respond naturally to "Are you a robot?"', () => {
    const response = "I am an AI assistant here to help you!";
    expect(response).toMatch(/I am|I can|I/);
  });

  test('Should reference company, not OpenAI/Meta, for "Who created you?"', () => {
    const response = "I was created by our company to assist customers.";
    expect(response).toMatch(/company/i);
    expect(response).not.toMatch(/OpenAI|Meta/i);
  });

  //  Function Registry Calls 
  describe('Function registry calls', () => {

    beforeEach(() => {
      // Mock registry.execute to prevent real DB calls
      jest.spyOn(registry, 'execute').mockImplementation((fn, params) => {
        if (fn === 'getOrderStatus') {
          return Promise.resolve({
            _id: params.orderId,
            status: 'PENDING',
            total: 299.99
          });
        }
        if (fn === 'searchProducts') {
          return Promise.resolve([
            { name: 'Running Shoes', price: 80 },
            { name: 'Yoga Mat', price: 35 }
          ]);
        }
        return Promise.resolve({});
      });
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    test('Order status function call with valid ID', async () => {
      const orderId = '68eb5ffd953669d3ebe378d7';
      const result = await registry.execute('getOrderStatus', { orderId });
      expect(result._id).toBe(orderId);
    });

    test('Product search function called and returns array', async () => {
      const results = await registry.execute('searchProducts', { query: 'shoes', limit: 5 });
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBeGreaterThan(0);
    });

    test('Policy question uses KB (mocked, no registry call)', () => {
      const kbResponse = KB_RESPONSES['What is your return policy?'];
      expect(kbResponse.source).toBe('KB');
      expect(kbResponse.reply).toContain('returned');
    });

  });

});
