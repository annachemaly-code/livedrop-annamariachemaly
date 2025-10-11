// src/assistant/engine.ts
import groundTruth from "./ground-truth.json";
import { getOrderStatus } from "../lib/api";

interface GroundTruthQA {
  qid: string;
  category: string;
  question: string;
  answer: string;
}

export async function askSupport(question: string): Promise<string> {
  const trimmedQ = question.trim();

  if (!trimmedQ) return "Sorry, please type a question.";

  // Check if the question contains a numeric order ID (4+ digits)
  const orderMatch = trimmedQ.match(/\b\d{4,}\b/);
  if (orderMatch) {
    const orderId = parseInt(orderMatch[0], 10);
    try {
      const status = await getOrderStatus(orderId);
      return `Order ${orderId} is ${status.status}${
        status.carrier ? ` via ${status.carrier}` : ""
      }${status.eta ? `, ETA: ${status.eta}` : ""}. [Order Status]`;
    } catch (err) {
      return "Sorry, could not fetch order status. Please try again later.";
    }
  }

  // Match question with ground-truth JSON using keyword overlap
  const lowerQ = trimmedQ.toLowerCase();
  const words = lowerQ.split(/\s+/).filter(Boolean);

  let bestMatch: GroundTruthQA | null = null;
  let maxOverlap = 0;

  for (const qa of groundTruth as GroundTruthQA[]) {
    const qaWords = qa.question.toLowerCase().split(/\s+/);
    const overlap = words.filter((w) => qaWords.includes(w)).length;
    if (overlap > maxOverlap) {
      maxOverlap = overlap;
      bestMatch = qa;
    }
  }

  if (bestMatch && maxOverlap > 0) {
    return `${bestMatch.answer} [${bestMatch.qid}]`;
  }

  // Fallback
  return "Sorry, I could not find this in the Shoplite documentation. Please contact support for more details.";
}
