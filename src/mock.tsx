import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "../styles-mock.css";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { HomePage } from "./HomePage";
import { FlightsPage } from "./FlightsPage";
import { HotelsPage } from "./HotelsPage";
import { HolidaysPage } from "./HolidaysPage";
import { VisaPage } from "./VisaPage";
import { VisaDetailPage } from "./VisaDetailPage";
import { CargoPage } from "./CargoPage";
import { UnifiedBookingFlow } from "./UnifiedBookingFlow";
import type {
  FlightOffer,
  Hotel,
  Package,
  VisaRequirement,
} from "./types";

type Page =
  | "home"
  | "flights"
  | "hotels"
  | "holidays"
  | "visa"
  | "visa-detail"
  | "booking-flight"
  | "booking-hotel"
  | "booking-package"
  | "cargo";

interface BookingMetadata {
  checkInDate?: string;
  checkOutDate?: string;
  rooms?: number;
  guests?: number;
  passengers?: number;
}

function MockApp() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedFlight, setSelectedFlight] = useState<FlightOffer | null>(
    null
  );
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [selectedVisa, setSelectedVisa] = useState<VisaRequirement | null>(
    null
  );
  const [bookingMetadata, setBookingMetadata] = useState<BookingMetadata>({});

  const handleBookFlight = (flight: FlightOffer) => {
    setSelectedFlight(flight);
    setBookingMetadata({ passengers: 1 });
    setCurrentPage("booking-flight");
  };

  const handleSelectHotel = (
    hotel: Hotel,
    metadata?: {
      checkInDate?: string;
      checkOutDate?: string;
      rooms?: number;
      guests?: number;
    }
  ) => {
    setSelectedHotel(hotel);
    setBookingMetadata(
      metadata || { checkInDate: "", checkOutDate: "", rooms: 1, guests: 2 }
    );
    setCurrentPage("booking-hotel");
  };

  const handleSelectPackage = (
    pkg: Package,
    metadata?: { guests?: number }
  ) => {
    setSelectedPackage(pkg);
    setBookingMetadata(metadata || { guests: 1 });
    setCurrentPage("booking-package");
  };

  const handleSelectVisa = (visa: VisaRequirement) => {
    setSelectedVisa(visa);
    setCurrentPage("visa-detail");
  };

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  const isBookingPage = currentPage.startsWith("booking-");

  return (
    <div className="min-h-screen flex flex-col">
      {!isBookingPage && currentPage !== "visa-detail" && (
        <Header onNavigate={handleNavigate} />
      )}
      <main className="flex-1">
        {currentPage === "home" && (
          <HomePage
            onSearchFlights={() => setCurrentPage("flights")}
            onNavigate={(page) => handleNavigate(page as Page)}
          />
        )}
        {currentPage === "flights" && (
          <FlightsPage onBookFlight={handleBookFlight} />
        )}
        {currentPage === "hotels" && (
          <HotelsPage onHotelSelect={handleSelectHotel} />
        )}
        {currentPage === "holidays" && (
          <HolidaysPage onPackageSelect={handleSelectPackage} />
        )}
        {currentPage === "visa" && <VisaPage onVisaSelect={handleSelectVisa} />}
        {currentPage === "cargo" && <CargoPage />}
        {currentPage === "visa-detail" && selectedVisa && (
          <VisaDetailPage
            visa={selectedVisa}
            onBack={() => setCurrentPage("visa")}
            onStartApplication={(visa: VisaRequirement) => {
              console.log("Starting visa application for:", visa);
              // Future: Navigate to visa application form
            }}
          />
        )}
        {currentPage === "booking-flight" && selectedFlight && (
          <UnifiedBookingFlow
            type="flight"
            item={selectedFlight}
            metadata={bookingMetadata}
            onBack={() => setCurrentPage("flights")}
            onComplete={() => setCurrentPage("home")}
          />
        )}
        {currentPage === "booking-hotel" && selectedHotel && (
          <UnifiedBookingFlow
            type="hotel"
            item={selectedHotel}
            metadata={bookingMetadata}
            onBack={() => setCurrentPage("hotels")}
            onComplete={() => setCurrentPage("home")}
          />
        )}
        {currentPage === "booking-package" && selectedPackage && (
          <UnifiedBookingFlow
            type="package"
            item={selectedPackage}
            metadata={bookingMetadata}
            onBack={() => setCurrentPage("holidays")}
            onComplete={() => setCurrentPage("home")}
          />
        )}
      </main>
      {!isBookingPage && currentPage !== "visa-detail" && <Footer />}
    </div>
  );
}

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(<MockApp />);
}
