import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../lib/store";
import { Button } from "../components/atoms/Button";
import { placeOrder, getCustomerByEmail } from "../lib/api";

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) return;

    setLoading(true);
    setError("");

    try {
      //  fetch customer by email 
      const customerEmail = "test@example.com"; 
      const customer = await getCustomerByEmail(customerEmail);
      if (!customer) throw new Error("Customer not found");

      // Prepare order items
      const items = cartItems.map((item) => ({
        productId: item.id, 
        quantity: item.qty,
      }));

      // Place order via API
      const order = await placeOrder(items, customer._id);

      // Clear cart
      clearCart();

      // Navigate to order status page with real order ID
      navigate(`/order/${order._id}`);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">
        Checkout
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between p-2 border-b">
              <span>{item.title} x {item.qty}</span>
              <span>${(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}

          <div className="text-right font-bold text-xl mt-4">
            Total: ${total.toFixed(2)}
          </div>

          {error && (
            <p className="text-red-600 text-center mt-2">{error}</p>
          )}

          <div className="text-center mt-6">
            <Button
              onClick={handlePlaceOrder}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3"
              disabled={loading}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
