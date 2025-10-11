import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/atoms/Button";
import { useCartStore } from "../lib/store"; // use global store

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const cartItems = useCartStore((state) => state.items);
  const increment = useCartStore((state) => state.increment);
  const decrement = useCartStore((state) => state.decrement);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 bg-white rounded shadow">
              <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded" />
              <div className="flex-1">
                <h2 className="font-semibold">{item.title}</h2>
                <p>${item.price.toFixed(2)}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => decrement(item.id)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => increment(item.id)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                  <button onClick={() => removeItem(item.id)} className="ml-4 text-red-600 hover:underline">Remove</button>
                </div>
              </div>
            </div>
          ))}

          <div className="text-right font-bold text-xl mt-4">Total: ${total.toFixed(2)}</div>

          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={clearCart} className="bg-red-600 hover:bg-red-700 px-4 py-2">Clear Cart</Button>
            <Button onClick={() => navigate("/checkout")} className="bg-blue-600 hover:bg-blue-700 px-4 py-2">Proceed to Checkout</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
