import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import OrderTracking from "../components/molecules/OrderTracking";
import { Button } from "../components/atoms/Button";

const OrderStatusPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id) return <p className="text-center mt-6">Order ID missing</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Order Status</h1>
      <p className="text-gray-700 mb-4">Order ID: {id}</p>

      {/* Live SSE Tracking */}
      <OrderTracking orderId={id} />

      <div className="flex justify-center gap-4 mt-6">
        <Link
          to="/"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Back to Catalog
        </Link>

        <Button
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          onClick={() => navigate("/admin")}
        >
          Check Admin Dashboard
        </Button>
      </div>
    </div>
  );
};

export default OrderStatusPage;
