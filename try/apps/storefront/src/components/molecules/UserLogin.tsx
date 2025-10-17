// src/components/UserLogin.tsx
import React, { useState } from "react";
import { getCustomerByEmail } from "../../lib/api";

interface UserLoginProps {
  onUserSelected: (user: any) => void; // Callback to parent
}

const UserLogin: React.FC<UserLoginProps> = ({ onUserSelected }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const user = await getCustomerByEmail(email);

      if (!user) {
        setError("User not found. Try demo@example.com");
      } else {
        localStorage.setItem("currentUser", JSON.stringify(user));
        onUserSelected(user); // pass to parent
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching user. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow space-y-2">
      <h2 className="text-xl font-semibold">User Login</h2>
      <input
        type="email"
        placeholder="Enter your email"
        className="border p-2 w-full rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
};

export default UserLogin;
