import React, { useEffect, useState } from "react";
import { getOrder, getOrderStatus } from "../../lib/api";

interface OrderTrackingProps {
  orderId: string;
}

const STATUS_FLOW = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED"];

const OrderTracking: React.FC<OrderTrackingProps> = ({ orderId }) => {
  const [status, setStatus] = useState<string>("PENDING");

  useEffect(() => {
    let sse: EventSource | null = null;

    const init = async () => {
      try {
        // Fetch initial order
        const order = await getOrder(orderId);
        setStatus(order.status.toUpperCase());

        // Connect SSE
        sse = getOrderStatus(orderId);
        sse.onmessage = (event) => {
          const data = JSON.parse(event.data);
          console.log("SSE received:", data); // <-- debug
          setStatus(data.status.toUpperCase());
        };

        sse.onerror = (err) => {
          console.error("SSE error:", err);
          sse?.close();
        };
      } catch (err) {
        console.error("Failed to fetch order:", err);
      }
    };

    init();

    return () => {
      sse?.close();
    };
  }, [orderId]);

  return (
    <div className="p-4 border rounded-md shadow-md bg-white max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-2">Order Status</h2>
      <p className="text-lg mb-4">
        Current Status: <span className="font-bold">{status}</span>
      </p>
      <div className="flex justify-between">
        {STATUS_FLOW.map((step) => (
          <div key={step} className="flex-1 text-center">
            <div
              className={`w-6 h-6 mx-auto rounded-full mb-1 ${
                STATUS_FLOW.indexOf(step) <= STATUS_FLOW.indexOf(status)
                  ? "bg-green-500"
                  : "bg-gray-300"
              }`}
            ></div>
            <span className="text-sm">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTracking;


