// src/pages/checkout.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../lib/store";
import { Button } from "../components/atoms/Button";

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const handlePlaceOrder = () => {
    const orderId = Math.floor(Math.random() * 1000000); // fake order ID
    clearCart(); // clear cart after placing order
    navigate(`/order/${orderId}`); // navigate to order page
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

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

          <div className="text-center mt-6">
            <Button
              onClick={handlePlaceOrder}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3"
            >
              Place Order
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
