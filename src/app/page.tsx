"use client";

import { useState } from "react";
import { HomePage } from "../HomePage";
import { FlightsPage } from "../FlightsPage";
import { HotelsPage } from "../HotelsPage";
import { HolidaysPage } from "../HolidaysPage";
import { VisaPage } from "../VisaPage";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { UnifiedBookingFlow } from "../UnifiedBookingFlow";
import type { FlightOffer, Hotel, Package, VisaRequirement } from "../types";

type PageType = "home" | "flights" | "hotels" | "holidays" | "visa" | "booking";

export default function Home() {
  const [currentPage, setCurrentPage] = useState<PageType>("home");
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
    page: "home" | "flights" | "hotels" | "holidays" | "visa"
  ) => {
    setCurrentPage(page);
    setBookingData(null); // Clear booking data when navigating
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header onNavigate={handleNavigate} />

      <main>
        {currentPage === "booking" && bookingData && (
          <UnifiedBookingFlow
            type={bookingData.type as "flight" | "hotel" | "package"}
            item={bookingData.item as FlightOffer | Hotel | Package}
            metadata={bookingData.metadata}
            onBack={() => {
              setBookingData(null);
              setCurrentPage("home");
            }}
          />
        )}
        {currentPage === "home" && (
          <HomePage
            onSearchFlights={() => setCurrentPage("flights")}
            onNavigate={handleNavigate}
          />
        )}
        {currentPage === "flights" && (
          <FlightsPage
            onBookFlight={(flight) => {
              handleStartBooking("flight", flight, { passengers: 1 });
            }}
            onBack={() => setCurrentPage("home")}
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
      </main>

      <Footer />
    </div>
  );
}
