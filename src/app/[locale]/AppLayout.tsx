"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/layout/ChatWidget";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarPinned, setIsSidebarPinned] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        isSidebarPinned={isSidebarPinned}
        onToggleSidebar={() => setIsSidebarPinned(!isSidebarPinned)}
        isAuthenticated={isAuthenticated}
        onLogout={() => setIsAuthenticated(false)}
        onSignInSuccess={() => setIsAuthenticated(true)}
      />

      <div className="flex flex-1 relative">
        <Sidebar isPinned={isSidebarPinned} />

        <div className="flex-1 flex flex-col min-h-full">
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
        </div>
      </div>

      <ChatWidget />
    </div>
  );
}
