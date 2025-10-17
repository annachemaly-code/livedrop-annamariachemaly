// /apps/api/assistant/engine.js

const fs = require('fs');
const path = require('path');
const detectIntent = require('./intent-classifier'); 
const registry = require('./function-registry');     

// Load knowledge base
const kbPath = path.join(__dirname, '../../../../../docs/ground-truth.json');
const knowledgeBase = JSON.parse(fs.readFileSync(kbPath, 'utf-8'));

/**
 * Simple grounding: finds policies based on keywords
 */
function findRelevantPolicies(userQuery) {
  const query = userQuery.toLowerCase();

  const categoryKeywords = {
    'returns': ['return', 'refund', 'exchange', 'money back'],
    'shipping': ['shipping', 'delivery', 'ship', 'arrive', 'carrier'],
    'warranties': ['warranty', 'guarantee', 'defect', 'repair'],
    'privacy': ['privacy', 'data', 'information', 'personal'],
    'security': ['security', 'hack', 'password', 'protection'],
  };

  let matchedCategory = null;
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some(kw => query.includes(kw))) {
      matchedCategory = category;
      break;
    }
  }

  return matchedCategory
    ? knowledgeBase.filter(p => p.category === matchedCategory)
    : [];
}

/**
 * Citation validator: extract [PolicyID] and check against KB
 */
function validateCitations(responseText) {
  const citationRegex = /\[([^\]]+)\]/g;
  const citations = [];
  let match;
  while ((match = citationRegex.exec(responseText)) !== null) {
    citations.push(match[1]);
  }

  const validCitations = [];
  const invalidCitations = [];

  for (const c of citations) {
    if (knowledgeBase.some(p => p.id === c)) {
      validCitations.push(c);
    } else {
      invalidCitations.push(c);
    }
  }

  return { isValid: invalidCitations.length === 0, validCitations, invalidCitations };
}

/**
 * Main assistant engine 
 */
async function assistantEngine(userQuery) {
  const intent = detectIntent(userQuery);
  let text = '';
  const functionsCalled = [];

  try {
    switch (intent) {
      case 'policy_question': {
        const policies = findRelevantPolicies(userQuery);
        if (policies.length > 0) {
          const policy = policies[0]; 
          text = `${policy.answer} [${policy.id}]`;
          functionsCalled.push('groundPolicy');
        } else {
          text = "I'm sorry, I could not find a policy matching your question.";
        }
        break;
      }

      case 'order_status': {
        const orderIdMatch = userQuery.match(/([a-f\d]{24})/i);
        if (orderIdMatch) {
          const orderId = orderIdMatch[1];
          const order = await registry.execute('getOrderStatus', { orderId });
          text = `Your order #${order._id} is currently ${order.status}. Estimated delivery: ${order.estimatedDelivery}`;
          functionsCalled.push('getOrderStatus');
        } else {
          text = "Please provide a valid order ID to check status.";
        }
        break;
      }

      case 'product_search': {
        const searchQuery = userQuery.replace(/(find|search|show me|buy)/gi, '').trim();
        const results = await registry.execute('searchProducts', { query: searchQuery, limit: 5 });
        functionsCalled.push('searchProducts');
        if (results.length > 0) {
          text = 'Here are some products I found:\n' + results.map(p => `- ${p.name} ($${p.price})`).join('\n');
        } else {
          text = 'No products found matching your query.';
        }
        break;
      }

      case 'complaint':
        text = 'I understand your issue and apologize for the inconvenience. Our support team will assist you shortly.';
        break;

      case 'chitchat':
        text = 'Hello! How can I assist you with your shopping today?';
        break;

      case 'off_topic':
        text = "I'm here to help with store-related questions. Can I assist you with orders, products, or policies?";
        break;

      case 'violation':
        text = "Please refrain from using offensive language. I’m here to assist you politely and professionally.";
        break;

      default:
        text = "I'm not sure how to help with that. Can you rephrase?";
    }
  } catch (err) {
    console.error(err);
    text = 'Oops! Something went wrong while processing your request.';
  }

  // Validate citations for policy questions
  const citations = validateCitations(text);

  return {
    text,
    intent,
    citations,
    functionsCalled
  };
}

module.exports = assistantEngine;
