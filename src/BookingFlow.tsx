import React, { useState } from "react";
import { StepIndicator } from "./StepIndicator";
import { ReviewConfirm } from "./ReviewConfirm";
import { TravelerDetailsForm } from "./TravelerDetailsForm";
import { PaymentPage } from "./PaymentPage";
import { BookingConfirmation } from "./BookingConfirmation";
import type {
  FlightOffer,
  TravelerDetails,
  ContactDetails,
  BookingData,
} from "./types";

interface BookingFlowProps {
  flight: FlightOffer;
  passengerCount?: number;
  onComplete?: () => void;
}

export function BookingFlow({
  flight,
  passengerCount = 1,
  onComplete,
}: BookingFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [travelers, setTravelers] = useState<TravelerDetails[]>([]);
  const [contact, setContact] = useState<ContactDetails | null>(null);
  const [booking, setBooking] = useState<BookingData | null>(null);

  const steps = ["Review", "Travelers", "Payment"];

  // Calculate fare breakdown
  const fareBreakdown = {
    baseFare: Math.floor(flight.price * 0.75),
    taxes: Math.floor(flight.price * 0.25),
    seatSelection: 0,
    baggage: 0,
    discount: 0,
    total: flight.price,
  };

  const handleReviewContinue = () => {
    setCurrentStep(2);
  };

  const handleTravelersContinue = (
    travelersData: TravelerDetails[],
    contactData: ContactDetails
  ) => {
    setTravelers(travelersData);
    setContact(contactData);
    setCurrentStep(3);
  };

  const handlePayment = (
    paymentMethod: "upi" | "card" | "netbanking" | "wallet"
  ) => {
    // Create booking data
    const bookingData: BookingData = {
      bookingId: `SE${Date.now().toString().slice(-9)}`,
      flight,
      travelers,
      contact: contact!,
      fareBreakdown,
      paymentMethod,
      paymentStatus: "completed",
      createdAt: new Date().toISOString(),
    };

    setBooking(bookingData);
    setCurrentStep(4);
  };

  const handleStepClick = (step: number) => {
    if (step < currentStep) {
      setCurrentStep(step);
    }
  };

  const handleDownloadTicket = () => {
    console.log("Download ticket");
    // In real app, generate and download PDF
  };

  const handleAddToCalendar = () => {
    console.log("Add to calendar");
    // In real app, create calendar event
  };

  const handleViewDetails = () => {
    console.log("View details");
    // In real app, navigate to booking details page
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Step Indicator - Hide on confirmation page */}
      {currentStep < 4 && (
        <StepIndicator
          currentStep={currentStep}
          steps={steps}
          onStepClick={handleStepClick}
        />
      )}

      {/* Step Content */}
      {currentStep === 1 && (
        <ReviewConfirm
          flight={flight}
          fareBreakdown={fareBreakdown}
          onContinue={handleReviewContinue}
        />
      )}

      {currentStep === 2 && (
        <TravelerDetailsForm
          passengerCount={passengerCount}
          onContinue={handleTravelersContinue}
          onBack={() => setCurrentStep(1)}
        />
      )}

      {currentStep === 3 && (
        <PaymentPage
          fareBreakdown={fareBreakdown}
          onPayment={handlePayment}
          onBack={() => setCurrentStep(2)}
        />
      )}

      {currentStep === 4 && booking && (
        <BookingConfirmation
          booking={booking}
          onDownloadTicket={handleDownloadTicket}
          onAddToCalendar={handleAddToCalendar}
          onViewDetails={handleViewDetails}
        />
      )}
    </div>
  );
}
