// src/lib/api.ts

// Types
export interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  tags: string[];
  stock: number;
  description?: string;
  category?: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
}

export interface Order {
  _id: string;
  customerId: string;
  items: OrderItem[];
  total: number;
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED";
  carrier?: string;
  estimatedDelivery?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  createdAt?: string;
}

// API Base
// const API_BASE = "http://localhost:5000/api";
// API Base
const API_BASE =
  process.env.REACT_APP_API_BASE ||
  (window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://livedrop-annamariachemaly.onrender.com/api");

// Products API
export const listProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${API_BASE}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

export const getProduct = async (id: string): Promise<Product | null> => {
  const res = await fetch(`${API_BASE}/products/${id}`);
  if (!res.ok) return null;
  return res.json();
};

// Orders API

// Place a new order
export const placeOrder = async (
  items: { productId: string; quantity: number }[],
  customerId: string
): Promise<Order> => {
  const res = await fetch(`${API_BASE}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items, customerId }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to place order: ${errorText}`);
  }

  return res.json();
};

// Fetch a single order by ID
export const getOrder = async (orderId: string): Promise<Order> => {
  const res = await fetch(`${API_BASE}/orders/${orderId}`);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Order not found: ${errorText}`);
  }
  return res.json();
};

/**
 * Live order status via SSE
 * Returns an EventSource connected to backend SSE endpoint
 */
export const getOrderStatus = (orderId: string): EventSource => {
  const sseUrl = `${API_BASE}/orders/${orderId}/stream`;
  return new EventSource(sseUrl);
};

// Customers API
export const getCustomerByEmail = async (email: string): Promise<Customer | null> => {
  try {
    const res = await fetch(`${API_BASE}/customers?email=${encodeURIComponent(email)}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data; // single object from backend
  } catch (err) {
    console.error("Error fetching customer by email:", err);
    return null;
  }
};

// Analytics API
export const getDashboardMetrics = async () => {
  const res = await fetch(`${API_BASE}/analytics/dashboard-metrics`);
  if (!res.ok) throw new Error("Failed to fetch dashboard metrics");
  return res.json();
};

export const getDailyRevenue = async (from: string, to: string) => {
  const res = await fetch(`${API_BASE}/analytics/daily-revenue?from=${from}&to=${to}`);
  if (!res.ok) throw new Error("Failed to fetch daily revenue");
  return res.json();
};

export const getPerformanceMetrics = async () => {
  const res = await fetch(`${API_BASE}/analytics/performance`);
  if (!res.ok) throw new Error("Failed to fetch performance metrics");
  return res.json();
};

export const getAssistantAnalytics = async () => {
  const res = await fetch(`${API_BASE}/analytics/assistant`);
  if (!res.ok) throw new Error("Failed to fetch assistant analytics");
  return res.json();
};

export const getSystemHealth = async () => {
  const res = await fetch(`${API_BASE}/analytics/system-health`);
  if (!res.ok) throw new Error("Failed to fetch system health");
  return res.json();
};
