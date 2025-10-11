// src/lib/api.ts
import mockProducts from "../../public/mock-catalog.json";

export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  tags: string[];
  stockQty: number;
}

export interface OrderStatus {
  id: number;
  status: "Placed" | "Packed" | "Shipped" | "Delivered";
  carrier?: string;
  eta?: string;
}

let nextOrderId = 1000;
const mockStatuses: Record<number, OrderStatus> = {};

// List all products
export const listProducts = (): Promise<Product[]> =>
  new Promise((resolve) => setTimeout(() => resolve(mockProducts), 300));

// Get single product by id
export const getProduct = (id: string): Promise<Product | undefined> =>
  new Promise((resolve) =>
    setTimeout(() => resolve(mockProducts.find((p) => p.id === id)), 300)
  );

// Get order status
export const getOrderStatus = (id: number): Promise<OrderStatus> => {
  if (!mockStatuses[id]) {
    const statuses: OrderStatus["status"][] = ["Placed", "Packed", "Shipped", "Delivered"];
    const randomIndex = Math.floor(Math.random() * statuses.length);
    const status: OrderStatus = { id, status: statuses[randomIndex] };
    if (status.status === "Shipped" || status.status === "Delivered") {
      status.carrier = "UPS";
      status.eta = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString();
    }
    mockStatuses[id] = status;
  }
  return new Promise((resolve) => setTimeout(() => resolve(mockStatuses[id]), 500));
};

// Place order
export const placeOrder = (cart: { productId: string; quantity: number }[]): Promise<{ orderId: number }> => {
  const orderId = nextOrderId++;
  mockStatuses[orderId] = { id: orderId, status: "Placed" };
  return new Promise((resolve) => setTimeout(() => resolve({ orderId }), 500));
};
