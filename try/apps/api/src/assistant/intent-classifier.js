// assistant/intent-classifier.js

// Define keywords for each intent
const INTENT_KEYWORDS = {
  policy_question: ["return", "refund", "warranty", "shipping", "policy", "exchange", "delivery", "guarantee"],
  order_status: ["where", "track", "status", "order", "delivered", "shipping", "progress"],
  product_search: ["find", "search", "buy", "product", "item", "show me", "catalog", "available", "stock"],
  complaint: ["problem", "issue", "wrong", "broken", "late", "missing", "damaged", "refund"],
  chitchat: ["hello", "hi", "thanks", "good morning", "how are you", "hey", "bye", "good evening"],
  off_topic: ["movie", "weather", "sports", "random", "joke", "news"],
  violation: ["stupid", "idiot", "hate", "abuse", "kill", "terror", "offensive"]
};

/**
 * Detects user intent based on keyword matching.
 * @param {string} userQuery - The user input
 * @returns {string} - The detected intent
 */
function detectIntent(userQuery) {
  const query = userQuery.toLowerCase();

  // Loop through all intents and check for keyword match
  for (const [intent, keywords] of Object.entries(INTENT_KEYWORDS)) {
    if (keywords.some(kw => query.includes(kw))) {
      return intent;
    }
  }

  // Fallback if no match found
  return "chitchat";
}

module.exports = detectIntent;

