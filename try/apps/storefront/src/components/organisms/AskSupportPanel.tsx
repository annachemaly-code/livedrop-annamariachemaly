// // src/components/organisms/AskSupportPanel.tsx
// import React, { useState } from "react";
// import { Button } from "../atoms/Button";
// import groundTruth from "../../assistant/ground-truth.json";
// import { getOrderStatus } from "../../lib/api";

// interface AskSupportPanelProps {
//   onSubmit?: (question: string) => void;
// }

// interface GroundTruthQA {
//   qid: string;
//   category: string;
//   question: string;
//   answer: string;
// }

// export const AskSupportPanel: React.FC<AskSupportPanelProps> = ({ onSubmit }) => {
//   const [question, setQuestion] = useState("");
//   const [messages, setMessages] = useState<string[]>([]);
//   const [loading, setLoading] = useState(false);

//   const handleSend = async () => {
//     if (!question.trim()) return;

//     // Show user's question
//     setMessages((prev) => [...prev, `You: ${question}`]);
//     if (onSubmit) onSubmit(question);

//     setLoading(true);

//     try {
//       // Check if the question contains a numeric order ID (4+ digits)
//       const orderMatch = question.match(/\b\d{4,}\b/);

//       if (orderMatch) {
//         const orderId = parseInt(orderMatch[0], 10);
//         const status = await getOrderStatus(orderId);
//         setMessages((prev) => [
//           ...prev,
//           `Support: Order ${orderId} is ${status.status}${
//             status.carrier ? ` via ${status.carrier}` : ""
//           }${status.eta ? `, ETA: ${status.eta}` : ""}. [Order Status]`,
//         ]);
//       } else {
//         // Find best match in ground-truth
//         const lowerQ = question.toLowerCase();
//         const match = (groundTruth as GroundTruthQA[]).find((qa) =>
//           qa.question.toLowerCase().includes(lowerQ)
//         );

//         if (match) {
//           setMessages((prev) => [...prev, `Support: ${match.answer} [${match.qid}]`]);
//         } else {
//           setMessages((prev) => [...prev, "Support: Sorry, I cannot answer that."]);
//         }
//       }
//     } catch (err) {
//       setMessages((prev) => [...prev, "Support: Sorry, something went wrong."]);
//     }

//     setLoading(false);
//     setQuestion("");
//   };

//   return (
//     <div className="fixed bottom-4 right-4 w-80 bg-white border rounded-xl shadow-lg flex flex-col overflow-hidden">
//       <div className="bg-blue-600 text-white px-4 py-2 font-semibold">Ask Support</div>

//       <div className="p-3 flex-1 overflow-y-auto h-40 space-y-1">
//         {messages.length === 0 ? (
//           <p className="text-gray-400 text-sm">Type your question below...</p>
//         ) : (
//           messages.map((msg, idx) => (
//             <p
//               key={idx}
//               className={`text-sm ${msg.startsWith("You:") ? "font-bold" : "font-normal"}`}
//             >
//               {msg}
//             </p>
//           ))
//         )}
//         {loading && <p className="text-gray-500 text-sm">Support is typing...</p>}
//       </div>

//       <div className="flex border-t p-2">
//         <input
//           type="text"
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//           placeholder="Type your question..."
//           className="flex-1 px-2 py-1 border rounded-l focus:outline-none"
//           onKeyDown={(e) => e.key === "Enter" && handleSend()}
//         />
//         <Button
//           className="bg-blue-600 hover:bg-blue-700 rounded-r px-3 py-1"
//           onClick={handleSend}
//           disabled={loading}
//         >
//           Send
//         </Button>
//       </div>
//     </div>
//   );
// };
