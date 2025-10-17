// assistant/test-intent.js
const detectIntent = require("./intent-classifier");

const queries = [
  "Where is my order?",
  "I want to return my item",
  "Show me red sneakers",
  "Hello, good morning!",
  "Tell me the weather",
  "You are stupid"
];

queries.forEach(q => {
  console.log(`Query: "${q}" -> Intent: ${detectIntent(q)}`);
});
