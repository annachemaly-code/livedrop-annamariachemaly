// src/assistant/engine.ts
export interface AssistantResponse {
  text: string;
  citations?: string[];
}

interface GroundTruthQA {
  id: string;
  category: string;
  question: string;
  answer: string;
  lastUpdated: string;
}

let groundTruth: GroundTruthQA[] = [];

// Fetch ground-truth JSON from public folder
export const loadGroundTruth = async () => {
  if (groundTruth.length === 0) {
    const res = await fetch("/ground-truth.json");
    groundTruth = await res.json();
  }
  return groundTruth;
};

// Simple intent classifier (keyword-based)
function classifyIntent(question: string): string {
  const q = question.toLowerCase().trim();

  // Order-related questions
  if (/\b(order|status|tracking|delivered|pending)\b/.test(q)) return "order_status";

  // Policy or return questions
  if (/\b(return|refund|exchange|warranty|policy)\b/.test(q)) return "policy_question";

  // Product-related questions
  if (/\b(product|search|find|show)\b/.test(q)) return "product_search";

  // Mild complaints
  if (/\b(bad|complain|problem|issue|wrong|broken|late)\b/.test(q)) return "complaint";

  // Specific "how are you" questions
  if (/\b(how are you|how's it going|how r u)\b/.test(q)) return "how_are_you";

  // Friendly greetings
  if (/\b(hi|hello|hey|good morning|good afternoon|good evening)\b/.test(q)) return "chitchat";

  // Strong/offensive words
  if (/\b(stupid|nonsense|random|abuse|hate|violence|idiot|dumb|ugly|annoying|useless)\b/.test(q)) return "violation";

  return "unknown";
}

// Main assistant engine
export const assistantEngine = async (question: string): Promise<AssistantResponse> => {
  const intent = classifyIntent(question);
  const gt = await loadGroundTruth();

  // For policy_question, find best match in ground-truth
  if (intent === "policy_question") {
    const lowerQ = question.toLowerCase();
    const match = gt.find((qa) => qa.question.toLowerCase().includes(lowerQ));
    if (match) {
      return { text: match.answer, citations: [match.id] };
    } else {
      return { text: "Sorry, I cannot answer that.", citations: [] };
    }
  }

  // For other intents, provide canned responses
  switch (intent) {
    case "order_status":
      return { text: "You can check your order status in the Orders page.", citations: [] };
    case "product_search":
      return { text: "You can browse products in the Catalog page.", citations: [] };
    case "complaint":
      return { text: "We're sorry to hear that. Please contact support for assistance.", citations: [] };
    case "how_are_you":
      return { text: "I'm fine, and you?", citations: [] };
    case "chitchat":
      return { text: "Hello! How can I assist you today?", citations: [] };
    case "violation":
      return { text: "Please be respectful. I cannot respond to that.", citations: [] };
    default:
      return { text: "Sorry, I didn't understand. Can you rephrase?", citations: [] };
  }
};
