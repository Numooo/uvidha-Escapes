"use client";

import React, { useState } from "react";
import { Header } from "@/shared/components/layout/Header";
import { Sidebar } from "@/shared/components/layout/Sidebar";
import { Footer } from "@/shared/components/layout/Footer";
import { ChatWidget } from "@/shared/components/layout/ChatWidget";
import { useRouter, usePathname } from "@/i18n/routing";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<"personal" | "corporate">("personal");
  const [isSidebarPinned, setIsSidebarPinned] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const isCabinetPage = pathname.includes("profile") || pathname.includes("cabinet") || pathname.includes("corporate");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        isSidebarPinned={isSidebarPinned}
        onToggleSidebar={() => setIsSidebarPinned(!isSidebarPinned)}
        isAuthenticated={isAuthenticated}
        userType={userType}
        onLogout={() => setIsAuthenticated(false)}
        onSignInSuccess={(type) => {
          setIsAuthenticated(true);
          if (type) setUserType(type);
        }}
        onNavigate={(page) => {
          if (page === "home") router.push("/");
          else router.push(`/${page}`);
        }}
      />

      <div className="flex-1 flex relative">
        {!isCabinetPage && <Sidebar isPinned={isSidebarPinned} />}

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
