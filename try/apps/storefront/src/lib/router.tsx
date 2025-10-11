// src/router/Router.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { MainLayout } from "../components/templates/MainLayout";
import CatalogPage from "../pages/catalog";
import ProductPage from "../pages/product";
import CartPage from "../pages/cart";
import CheckoutPage from "../pages/checkout";
import OrderStatusPage from "../pages/order-status";

export const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <CatalogPage />
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
              <OrderStatusPage />
            </MainLayout>
          }
        />
        <Route
          path="*"
          element={
            <MainLayout>
              <div className="p-4 text-center text-gray-500">Page Not Found</div>
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
};
