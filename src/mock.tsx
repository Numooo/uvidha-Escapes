import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "../styles-mock.css";
import { Header } from "./mock/Header";
import { Footer } from "./mock/Footer";
import { HomePage } from "./mock/HomePage";
import { FlightsPage } from "./mock/FlightsPage";
import { HotelsPage } from "./mock/HotelsPage";
import { HolidaysPage } from "./mock/HolidaysPage";
import { VisaPage } from "./mock/VisaPage";
import { VisaDetailPage } from "./mock/VisaDetailPage";
import { UnifiedBookingFlow } from "./mock/UnifiedBookingFlow";
import type {
  FlightOffer,
  Hotel,
  Package,
  VisaRequirement,
} from "./mock/types";

type Page =
  | "home"
  | "flights"
  | "hotels"
  | "holidays"
  | "visa"
  | "visa-detail"
  | "booking-flight"
  | "booking-hotel"
  | "booking-package";

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
  const [bookingMetadata, setBookingMetadata] = useState<any>({});

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
            onNavigate={handleNavigate}
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
