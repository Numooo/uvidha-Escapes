"use client";

import { useState } from "react";
import { HomePage } from "../../HomePage";
import { FlightsPage } from "../../FlightsPage";
import { HotelsPage } from "../../HotelsPage";
import { HolidaysPage } from "../../HolidaysPage";
import { VisaPage } from "../../VisaPage";
import { Header } from "../../Header";
import { Footer } from "../../Footer";
import { Sidebar } from "../../Sidebar";
import { CargoPage } from "../../CargoPage";
import { ProfilePage } from "../../ProfilePage";
import { UnifiedBookingFlow } from "../../UnifiedBookingFlow";
import { ChatWidget } from "../../ChatWidget";
import { FlightStatusPage } from "../../FlightStatusPage";
import type { FlightOffer, Hotel, Package, VisaRequirement } from "../../types";

type PageType = "home" | "flights" | "hotels" | "holidays" | "visa" | "cargo" | "booking" | "profile" | "status";

export default function Home() {
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [targetDestination, setTargetDestination] = useState<string | null>(null);
  const [targetOrigin, setTargetOrigin] = useState<string | null>(null);
  const [isSidebarPinned, setIsSidebarPinned] = useState(true);
  const [bookingData, setBookingData] = useState<{
    type: "flight" | "hotel" | "package" | "visa";
    item: FlightOffer | Hotel | Package | VisaRequirement;
    metadata?: {
      checkInDate?: string;
      checkOutDate?: string;
      rooms?: number;
      guests?: number;
      passengers?: number;
    };
  } | null>(null);

  const handleNavigate = (
    page: "home" | "flights" | "hotels" | "holidays" | "visa" | "cargo" | "profile" | string
  ) => {
    setCurrentPage(page as PageType);
    setBookingData(null); // Clear booking data when navigating
    setTargetDestination(null);
    setTargetOrigin(null);
  };

  const handleStartBooking = (
    type: "flight" | "hotel" | "package" | "visa",
    item: FlightOffer | Hotel | Package | VisaRequirement,
    metadata?: {
      checkInDate?: string;
      checkOutDate?: string;
      rooms?: number;
      guests?: number;
      passengers?: number;
    }
  ) => {
    setBookingData({ type, item, metadata });
    setCurrentPage("booking");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header 
        onNavigate={handleNavigate} 
        isSidebarPinned={isSidebarPinned}
        onToggleSidebar={() => setIsSidebarPinned(!isSidebarPinned)}
        isAuthenticated={isAuthenticated}
        onLogout={() => {
          setIsAuthenticated(false);
          setCurrentPage("home");
        }}
        onSignInSuccess={() => {
          setIsAuthenticated(true);
          setCurrentPage("profile");
        }}
        currentPage={currentPage}
      />

      <div className="flex flex-1 relative">
        {currentPage !== "profile" && (
          <Sidebar 
            activePage={currentPage} 
            onNavigate={handleNavigate} 
            isPinned={isSidebarPinned}
          />
        )}
        
        <div className="flex-1 flex flex-col min-h-full">
          <main className={`flex-1 flex flex-col ${currentPage === 'status' ? 'bg-brand-primary' : ''}`}>
            {currentPage === "booking" && bookingData && (
              <UnifiedBookingFlow
                type={bookingData.type as "flight" | "hotel" | "package"}
                item={bookingData.item as FlightOffer | Hotel | Package}
                metadata={bookingData.metadata}
                onBack={() => {
                  setBookingData(null);
                  setCurrentPage("home");
                }}
                onComplete={() => {
                  setBookingData(null);
                  setCurrentPage("home");
                }}
              />
            )}
            {currentPage === "home" && (
              <HomePage
                onSearchFlights={(from, to) => {
                  if (from) setTargetOrigin(from);
                  if (to) setTargetDestination(to);
                  setCurrentPage("flights");
                }}
                onNavigate={handleNavigate}
              />
            )}
            {currentPage === "flights" && (
              <FlightsPage
                initialOrigin={targetOrigin}
                initialDestination={targetDestination}
                onBookFlight={(flight) => {
                  handleStartBooking("flight", flight, { passengers: 1 });
                }}
                onBack={() => {
                  setCurrentPage("home");
                  setTargetDestination(null);
                }}
              />
            )}
            {currentPage === "hotels" && (
              <HotelsPage
                onHotelSelect={(hotel, metadata) =>
                  handleStartBooking("hotel", hotel, metadata)
                }
              />
            )}
            {currentPage === "holidays" && (
              <HolidaysPage
                onPackageSelect={(pkg, metadata) =>
                  handleStartBooking("package", pkg, metadata)
                }
              />
            )}
            {currentPage === "visa" && (
              <VisaPage
                onVisaSelect={(visa) => {
                  // For now, treat visa like a package booking
                  handleStartBooking("package", visa as unknown as Package, {
                    guests: 1,
                  });
                }}
              />
            )}
            {currentPage === "cargo" && <CargoPage />}
            {currentPage === "status" && <FlightStatusPage />}
            {currentPage === "profile" && <ProfilePage />}
          </main>
          <Footer />
        </div>
      </div>

      {/* Floating Chat Widget */}
      <ChatWidget />
    </div>
  );
}
