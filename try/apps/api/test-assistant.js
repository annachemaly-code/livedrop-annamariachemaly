// test-assistant.js
require('dotenv').config();           //  Load .env variables
const connectDB = require('./src/db'); //  Import your DB connector
const engine = require('./src/assistant/engine'); // Import assistant engine

(async () => {
  //  Connect to MongoDB first
  await connectDB();

  const queries = [
    "What is your return policy?",
    "Where is my order 68eb5ffd953669d3ebe378d7?",
    "Show me wireless headphones",
    "Hello, good morning!",
    "Tell me the weather",
    "You are stupid"
  ];

  for (const q of queries) {
    try {
      const res = await engine(q);
      console.log("Query:", q);
      console.log("Response:", res.text);
      console.log("Intent:", res.intent);
      console.log("Citations:", res.citations);
      console.log("Functions called:", res.functionsCalled);
      console.log("--------------------------------------------------\n");
    } catch (err) {
      console.error("Error processing query:", q, err);
    }
  }

  process.exit(0);
})();
