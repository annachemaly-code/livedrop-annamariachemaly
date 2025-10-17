import React, { useState, useRef, useEffect } from "react";
import { Button } from "./atoms/Button";
import { assistantEngine } from "../assistant/engine";

export const SupportAssistant: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSend = async () => {
    if (!question.trim()) return;

    setMessages((prev) => [...prev, `You: ${question}`]);
    setLoading(true);

    try {
      const res = await assistantEngine(question);
      let msg = `Support: ${res.text}`;
      if (res.citations?.length) msg += ` [${res.citations.join(", ")}]`;
      setMessages((prev) => [...prev, msg]);
    } catch (err) {
      setMessages((prev) => [...prev, "Support: Sorry, something went wrong."]);
    }

    setLoading(false);
    setQuestion("");
  };

  // Auto-scroll to the bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleClear = () => setMessages([]);

  return (
    <div className="fixed bottom-4 right-4 w-80 max-h-[400px] bg-white border rounded-xl shadow-lg flex flex-col overflow-hidden">
      {/* Header with clear button */}
      <div className="bg-blue-600 text-white px-4 py-2 font-semibold flex justify-between items-center">
        Ask Support
        <button
          onClick={handleClear}
          className="text-white font-bold px-2 py-1 hover:bg-blue-700 rounded"
        >
          ✕
        </button>
      </div>

      {/* Messages container */}
      <div className="p-3 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {messages.length === 0 && (
          <p className="text-gray-400 text-sm">Type your question below...</p>
        )}
        {messages.map((msg, idx) => (
          <p
            key={idx}
            className={`text-sm ${msg.startsWith("You:") ? "font-bold" : "font-normal"}`}
          >
            {msg}
          </p>
        ))}
        {loading && <p className="text-gray-500 text-sm">Support is typing...</p>}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="flex border-t p-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question..."
          className="flex-1 px-2 py-1 border rounded-l focus:outline-none"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button
          className="bg-blue-600 hover:bg-blue-700 rounded-r px-3 py-1"
          onClick={handleSend}
          disabled={loading}
        >
          Send
        </Button>
      </div>
    </div>
  );
};
