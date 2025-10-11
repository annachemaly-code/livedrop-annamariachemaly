// src/pages/order-status.tsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getOrderStatus, OrderStatus } from "../lib/api";

const OrderStatusPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [status, setStatus] = useState<OrderStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const orderId = parseInt(id, 10);
    getOrderStatus(orderId).then((data) => {
      setStatus(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p className="p-6 text-center">Loading order status...</p>;
  if (!status) return <p className="p-6 text-center">Order not found</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Order #{status.id}</h1>
      <p className="text-xl mb-4">
        Status: <span className="font-semibold">{status.status}</span>
      </p>

      <div className="bg-gray-100 p-4 rounded mb-4">
        <p>Carrier: {status.carrier || "TBD"}</p>
        <p>ETA: {status.eta || "TBD"}</p>
      </div>

      <div className="text-center mt-6">
        <Link
          to="/"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Back to Catalog
        </Link>
      </div>
    </div>
  );
};

export default OrderStatusPage;
