// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { MainLayout } from "./components/templates/MainLayout";

import Catalog from "./pages/catalog";
import ProductPage from "./pages/product";
import CartPage from "./pages/cart";
import CheckoutPage from "./pages/checkout";
import OrderPage from "./pages/order-status";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Catalog />
            </MainLayout>
          }
        />
        <Route
          path="/p/:id"
          element={
            <MainLayout>
              <ProductPage />
            </MainLayout>
          }
        />
        <Route
          path="/cart"
          element={
            <MainLayout>
              <CartPage />
            </MainLayout>
          }
        />
        <Route
          path="/checkout"
          element={
            <MainLayout>
              <CheckoutPage />
            </MainLayout>
          }
        />
        <Route
          path="/order/:id"
          element={
            <MainLayout>
              <OrderPage />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
