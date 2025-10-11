// src/components/templates/MainLayout.tsx
import React, { ReactNode } from "react";
import { AskSupportPanel } from "../organisms/AskSupportPanel";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Header with logo */}
      <header className="bg-gray-100 p-4 flex items-center gap-4">
        <img src="/logo.svg" alt="Shoplite Logo" className="h-12 w-auto" />
        <h1 className="text-2xl font-bold"> Storefront</h1>
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Floating Ask Support Panel */}
      <AskSupportPanel />
    </div>
  );
};
