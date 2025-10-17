import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../lib/store";
import { getCustomerByEmail } from "../lib/api";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const setUser = useCartStore((state) => state.setUser);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const user = await getCustomerByEmail(email);
    setLoading(false);

    if (!user) {
      alert("User not found");
      return;
    }

    setUser(user);           // save user in store
    navigate("/catalog");    //  redirect to catalog after login
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Login</h1>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 text-white p-2 rounded"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
};

export default LoginPage;
