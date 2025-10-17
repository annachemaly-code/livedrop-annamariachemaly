import { create } from "zustand";

export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  qty: number;
}

export interface User {
  _id: string;   // MongoDB user ID
  name: string;
  email: string;
}

interface CartState {
  items: CartItem[];
  user: User | null;               //  add user
  setUser: (user: User) => void;   //  function to set logged-in user
  clearUser: () => void;           //  logout function
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeItem: (id: string) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  clearCart: () => void;
  total: () => number;
}

// Helper: safely load cart from localStorage
const loadCart = (): CartItem[] => {
  try {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Helper: save cart to localStorage
const saveCart = (items: CartItem[]) => {
  localStorage.setItem("cart", JSON.stringify(items));
};

export const useCartStore = create<CartState>((set, get) => ({
  items: loadCart(),
  user: null,  // initially no user

  setUser: (user: User) => set({ user }),
  clearUser: () => set({ user: null }),

  addItem: (item, qty = 1) => {
    const items = [...get().items];
    const index = items.findIndex((i) => i.id === item.id);
    if (index >= 0) items[index].qty += qty;
    else items.push({ ...item, qty });
    set({ items });
    saveCart(items);
  },

  removeItem: (id) => {
    const items = get().items.filter((i) => i.id !== id);
    set({ items });
    saveCart(items);
  },

  increment: (id) => {
    const items = get().items.map((i) =>
      i.id === id ? { ...i, qty: i.qty + 1 } : i
    );
    set({ items });
    saveCart(items);
  },

  decrement: (id) => {
    const items = get().items.map((i) =>
      i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i
    );
    set({ items });
    saveCart(items);
  },

  clearCart: () => {
    set({ items: [] });
    localStorage.removeItem("cart");
  },

  total: () => get().items.reduce((acc, i) => acc + i.price * i.qty, 0),
}));
