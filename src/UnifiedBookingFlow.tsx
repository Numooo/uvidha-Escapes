import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  User,
  CreditCard,
  Check,
  Plane,
  Hotel as HotelIcon,
  Palmtree,
  IndianRupee,
  Shield,
  Clock,
  CheckCircle2,
  Sparkles,
  Download,
  Home,
} from "lucide-react";
import { Button } from "./primitives/button";
import { Input } from "./primitives/input";
import type { FlightOffer, Hotel, Package } from "./types";

type BookingType = "flight" | "hotel" | "package";

interface UnifiedBookingFlowProps {
  type: BookingType;
  item: FlightOffer | Hotel | Package;
  metadata?: {
    checkInDate?: string;
    checkOutDate?: string;
    rooms?: number;
    guests?: number;
    passengers?: number;
  };
  onBack: () => void;
}

interface GuestDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  specialRequests?: string;
}

export function UnifiedBookingFlow({
  type,
  item,
  metadata = {},
  onBack,
}: UnifiedBookingFlowProps) {
  const [step, setStep] = useState<"details" | "payment" | "confirmation">(
    "details"
  );
  const [guestDetails, setGuestDetails] = useState<GuestDetails>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    specialRequests: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  // Calculate pricing based on type
  const calculatePricing = () => {
    if (type === "flight") {
      const flight = item as FlightOffer;
      const passengers = metadata.passengers || 1;
      const basePrice = flight.price * passengers;
      const taxes = Math.round(basePrice * 0.12);
      return {
        basePrice,
        taxes,
        total: basePrice + taxes,
        label: "Flight Fare",
      };
    } else if (type === "hotel") {
      const hotel = item as Hotel;
      const hotelPrice = hotel.price || hotel.pricePerNight || 0;
      const rooms = metadata.rooms || 1;
      const nights =
        metadata.checkInDate && metadata.checkOutDate
          ? Math.max(
              1,
              Math.ceil(
                (new Date(metadata.checkOutDate).getTime() -
                  new Date(metadata.checkInDate).getTime()) /
                  (1000 * 60 * 60 * 24)
              )
            )
          : 1;
      const basePrice = hotelPrice * nights * rooms;
      const taxes = Math.round(basePrice * 0.12);
      return {
        basePrice,
        taxes,
        total: basePrice + taxes,
        label: `${nights} Night${nights > 1 ? "s" : ""} × ${rooms} Room${
          rooms > 1 ? "s" : ""
        }`,
      };
    } else {
      const pkg = item as Package;
      const guests = metadata.guests || 1;
      const pricePerPerson = pkg.price || pkg.pricePerPerson || 0;
      const basePrice = pricePerPerson * guests;
      const taxes = Math.round(basePrice * 0.05);
      return {
        basePrice,
        taxes,
        total: basePrice + taxes,
        label: `${guests} Traveler${guests > 1 ? "s" : ""}`,
      };
    }
  };

  const pricing = calculatePricing();

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2500));

    const prefix = type === "flight" ? "FLT" : type === "hotel" ? "HTL" : "PKG";
    const ref = `SE-${prefix}-${Date.now().toString(36).toUpperCase()}`;
    setBookingRef(ref);
    setIsProcessing(false);
    setStep("confirmation");
  };

  const getItemTitle = () => {
    if (type === "flight") {
      const flight = item as FlightOffer;
      return `${flight.segments[0].from} → ${
        flight.segments[flight.segments.length - 1].to
      }`;
    } else if (type === "hotel") {
      return (item as Hotel).name;
    } else {
      return (item as Package).title;
    }
  };

  const getItemSubtitle = () => {
    if (type === "flight") {
      return (item as FlightOffer).airline;
    } else if (type === "hotel") {
      return (item as Hotel).location;
    } else {
      const pkg = item as Package;
      // Handle both package and visa (visa doesn't have duration)
      if (pkg.duration?.days && pkg.duration?.nights) {
        return `${pkg.duration.days} Days / ${pkg.duration.nights} Nights`;
      }
      // For visa or packages without duration, check if it has a country property
      const itemWithCountry = item as {
        country?: string;
        destination?: string;
      };
      return pkg.destination || itemWithCountry.country || "Travel Package";
    }
  };

  const getItemIcon = () => {
    if (type === "flight") return Plane;
    if (type === "hotel") return HotelIcon;
    return Palmtree;
  };

  const ItemIcon = getItemIcon();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back</span>
            </button>
            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-900">
                Complete Your Booking
              </h1>
              <p className="text-sm text-gray-600 mt-0.5">{getItemTitle()}</p>
            </div>
            <div className="w-20" /> {/* Spacer for alignment */}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Step Indicator */}
        {step !== "confirmation" && (
          <div className="flex items-center justify-center mb-8">
            {["Guest Details", "Payment"].map((stepName, idx) => (
              <div key={stepName} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                    (step === "details" && idx === 0) ||
                    (step === "payment" && idx === 1)
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                      : idx < (step === "details" ? 0 : 1)
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {idx < (step === "details" ? 0 : 1) ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    idx + 1
                  )}
                </div>
                <div className="ml-2 mr-6">
                  <div
                    className={`text-sm font-medium ${
                      (step === "details" && idx === 0) ||
                      (step === "payment" && idx === 1)
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
                        : "text-gray-500"
                    }`}
                  >
                    {stepName}
                  </div>
                </div>
                {idx < 1 && (
                  <div
                    className={`w-16 h-0.5 ${
                      idx < (step === "details" ? 0 : 1)
                        ? "bg-green-500"
                        : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div
            className={
              step === "confirmation" ? "lg:col-span-3" : "lg:col-span-2"
            }
          >
            <AnimatePresence mode="wait">
              {step === "details" && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-100 to-blue-100">
                        <User className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          Guest Details
                        </h2>
                        <p className="text-sm text-gray-600">
                          Please provide your information
                        </p>
                      </div>
                    </div>

                    <form onSubmit={handleDetailsSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            First Name *
                          </label>
                          <Input
                            required
                            value={guestDetails.firstName}
                            onChange={(e) =>
                              setGuestDetails({
                                ...guestDetails,
                                firstName: e.target.value,
                              })
                            }
                            placeholder="John"
                            className="h-12"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name *
                          </label>
                          <Input
                            required
                            value={guestDetails.lastName}
                            onChange={(e) =>
                              setGuestDetails({
                                ...guestDetails,
                                lastName: e.target.value,
                              })
                            }
                            placeholder="Doe"
                            className="h-12"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <Input
                            type="email"
                            required
                            value={guestDetails.email}
                            onChange={(e) =>
                              setGuestDetails({
                                ...guestDetails,
                                email: e.target.value,
                              })
                            }
                            placeholder="john.doe@example.com"
                            className="h-12"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number *
                          </label>
                          <Input
                            type="tel"
                            required
                            value={guestDetails.phone}
                            onChange={(e) =>
                              setGuestDetails({
                                ...guestDetails,
                                phone: e.target.value,
                              })
                            }
                            placeholder="+91 98765 43210"
                            className="h-12"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address *
                        </label>
                        <Input
                          required
                          value={guestDetails.address}
                          onChange={(e) =>
                            setGuestDetails({
                              ...guestDetails,
                              address: e.target.value,
                            })
                          }
                          placeholder="123 Main Street, Apartment 4B"
                          className="h-12"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            City *
                          </label>
                          <Input
                            required
                            value={guestDetails.city}
                            onChange={(e) =>
                              setGuestDetails({
                                ...guestDetails,
                                city: e.target.value,
                              })
                            }
                            placeholder="Mumbai"
                            className="h-12"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            ZIP Code *
                          </label>
                          <Input
                            required
                            value={guestDetails.zipCode}
                            onChange={(e) =>
                              setGuestDetails({
                                ...guestDetails,
                                zipCode: e.target.value,
                              })
                            }
                            placeholder="400001"
                            className="h-12"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Special Requests (Optional)
                        </label>
                        <textarea
                          value={guestDetails.specialRequests}
                          onChange={(e) =>
                            setGuestDetails({
                              ...guestDetails,
                              specialRequests: e.target.value,
                            })
                          }
                          placeholder="Any special requirements or preferences..."
                          rows={4}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>

                      <div className="flex justify-end pt-4">
                        <Button
                          type="submit"
                          size="lg"
                          className="px-8 h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                        >
                          Continue to Payment
                        </Button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              )}

              {step === "payment" && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <PaymentSection
                    isProcessing={isProcessing}
                    onPayment={handlePayment}
                    onBack={() => setStep("details")}
                  />
                </motion.div>
              )}

              {step === "confirmation" && (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <ConfirmationSection
                    bookingRef={bookingRef}
                    type={type}
                    itemTitle={getItemTitle()}
                    itemSubtitle={getItemSubtitle()}
                    guestDetails={guestDetails}
                    pricing={pricing}
                    onBack={onBack}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar - Booking Summary */}
          {step !== "confirmation" && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm sticky top-24">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Booking Summary
                </h3>

                {/* Item Details */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 flex-shrink-0">
                      <ItemIcon className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 truncate">
                        {getItemTitle()}
                      </h4>
                      <p className="text-sm text-gray-600 mt-0.5">
                        {getItemSubtitle()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Metadata */}
                {type === "hotel" && metadata.checkInDate && (
                  <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Check-in</span>
                      <span className="font-medium text-gray-900">
                        {new Date(metadata.checkInDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Check-out</span>
                      <span className="font-medium text-gray-900">
                        {metadata.checkOutDate &&
                          new Date(metadata.checkOutDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Guests</span>
                      <span className="font-medium text-gray-900">
                        {metadata.guests}{" "}
                        {metadata.guests === 1 ? "Guest" : "Guests"}
                      </span>
                    </div>
                  </div>
                )}

                {type === "flight" && (
                  <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Passengers</span>
                      <span className="font-medium text-gray-900">
                        {metadata.passengers || 1}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Class</span>
                      <span className="font-medium text-gray-900">
                        {(item as FlightOffer).cabin}
                      </span>
                    </div>
                  </div>
                )}

                {type === "package" && (
                  <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Travelers</span>
                      <span className="font-medium text-gray-900">
                        {metadata.guests || 1}
                      </span>
                    </div>
                  </div>
                )}

                {/* Price Breakdown */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{pricing.label}</span>
                    <span className="font-medium text-gray-900">
                      ₹{pricing.basePrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Taxes & Fees</span>
                    <span className="font-medium text-gray-900">
                      ₹{pricing.taxes.toLocaleString()}
                    </span>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">
                        Total Amount
                      </span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        ₹{pricing.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span>Secure payment</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Instant confirmation</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Clock className="h-5 w-5 text-green-600" />
                    <span>24/7 support</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Payment Section Component
interface PaymentSectionProps {
  isProcessing: boolean;
  onPayment: () => void;
  onBack: () => void;
}

function PaymentSection({
  isProcessing,
  onPayment,
  onBack,
}: PaymentSectionProps) {
  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "upi" | "netbanking" | "wallet"
  >("card");

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-100 to-blue-100">
          <CreditCard className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Payment</h2>
          <p className="text-sm text-gray-600">Choose your payment method</p>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        {[
          { id: "card", label: "Credit / Debit Card", icon: CreditCard },
          { id: "upi", label: "UPI", icon: IndianRupee },
          { id: "netbanking", label: "Net Banking", icon: Home },
          { id: "wallet", label: "Wallet", icon: CreditCard },
        ].map((method) => (
          <button
            key={method.id}
            onClick={() =>
              setPaymentMethod(
                method.id as "card" | "upi" | "netbanking" | "wallet"
              )
            }
            className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
              paymentMethod === method.id
                ? "border-purple-600 bg-purple-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                paymentMethod === method.id
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              <method.icon className="h-5 w-5" />
            </div>
            <span className="font-medium text-gray-900">{method.label}</span>
            {paymentMethod === method.id && (
              <CheckCircle2 className="h-5 w-5 text-purple-600 ml-auto" />
            )}
          </button>
        ))}
      </div>

      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex-1 h-12"
          disabled={isProcessing}
        >
          Back
        </Button>
        <Button
          onClick={onPayment}
          disabled={isProcessing}
          className="flex-1 h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Processing...</span>
            </div>
          ) : (
            "Complete Payment"
          )}
        </Button>
      </div>
    </div>
  );
}

// Confirmation Section Component
interface ConfirmationSectionProps {
  bookingRef: string;
  type: BookingType;
  itemTitle: string;
  itemSubtitle: string;
  guestDetails: GuestDetails;
  pricing: { basePrice: number; taxes: number; total: number; label: string };
  onBack: () => void;
}

function ConfirmationSection({
  bookingRef,
  type,
  itemTitle,
  itemSubtitle,
  guestDetails,
  pricing,
  onBack,
}: ConfirmationSectionProps) {
  const handleDownloadConfirmation = () => {
    // Create a simple HTML confirmation document
    const confirmationHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Booking Confirmation - ${bookingRef}</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      max-width: 800px;
      margin: 40px auto;
      padding: 20px;
      color: #333;
    }
    .header {
      text-align: center;
      margin-bottom: 40px;
      padding-bottom: 20px;
      border-bottom: 3px solid #7c3aed;
    }
    .logo {
      font-size: 32px;
      font-weight: bold;
      background: linear-gradient(to right, #7c3aed, #2563eb);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 10px;
    }
    .confirmed {
      color: #10b981;
      font-size: 24px;
      font-weight: bold;
      margin: 20px 0;
    }
    .booking-ref {
      background: linear-gradient(to right, #7c3aed, #2563eb);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 28px;
      font-weight: bold;
      margin: 10px 0;
    }
    .section {
      margin: 30px 0;
      padding: 20px;
      background: #f9fafb;
      border-radius: 8px;
    }
    .section-title {
      font-size: 18px;
      font-weight: bold;
      color: #7c3aed;
      margin-bottom: 15px;
    }
    .detail-row {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #e5e7eb;
    }
    .detail-row:last-child {
      border-bottom: none;
    }
    .label {
      color: #6b7280;
    }
    .value {
      font-weight: 600;
      color: #111827;
    }
    .total {
      font-size: 20px;
      color: #10b981;
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px solid #e5e7eb;
      color: #6b7280;
      font-size: 14px;
    }
    .contact {
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">Suvidha Escapes</div>
    <div>Your Journey, Our Priority</div>
  </div>

  <div class="confirmed">✓ Booking Confirmed!</div>
  
  <div style="text-align: center; margin: 30px 0;">
    <div style="color: #6b7280; font-size: 14px; margin-bottom: 10px;">Booking Reference</div>
    <div class="booking-ref">${bookingRef}</div>
  </div>

  <div class="section">
    <div class="section-title">Booking Details</div>
    <div class="detail-row">
      <span class="label">${
        type === "flight" ? "Flight" : type === "hotel" ? "Hotel" : "Package"
      }</span>
      <span class="value">${itemTitle}</span>
    </div>
    <div class="detail-row">
      <span class="label">Details</span>
      <span class="value">${itemSubtitle}</span>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Guest Information</div>
    <div class="detail-row">
      <span class="label">Name</span>
      <span class="value">${guestDetails.firstName} ${
      guestDetails.lastName
    }</span>
    </div>
    <div class="detail-row">
      <span class="label">Email</span>
      <span class="value">${guestDetails.email}</span>
    </div>
    <div class="detail-row">
      <span class="label">Phone</span>
      <span class="value">${guestDetails.phone}</span>
    </div>
    <div class="detail-row">
      <span class="label">Address</span>
      <span class="value">${guestDetails.address}, ${guestDetails.city} - ${
      guestDetails.zipCode
    }</span>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Payment Summary</div>
    <div class="detail-row">
      <span class="label">${pricing.label}</span>
      <span class="value">₹${pricing.basePrice.toLocaleString()}</span>
    </div>
    <div class="detail-row">
      <span class="label">Taxes & Fees</span>
      <span class="value">₹${pricing.taxes.toLocaleString()}</span>
    </div>
    <div class="detail-row">
      <span class="label">Total Amount Paid</span>
      <span class="value total">₹${pricing.total.toLocaleString()}</span>
    </div>
  </div>

  <div class="contact">
    <div class="section-title" style="text-align: center;">Need Assistance?</div>
    <div style="text-align: center; color: #6b7280;">
      <p>📧 Email: support@suvidhaescapes.com</p>
      <p>📞 Phone: +91 98765 43210</p>
      <p>🕐 Available: 24/7</p>
    </div>
  </div>

  <div class="footer">
    <p><strong>Suvidha Escapes</strong></p>
    <p>Making your travel dreams come true</p>
    <p>© ${new Date().getFullYear()} Suvidha Escapes. All rights reserved.</p>
  </div>
</body>
</html>
    `;

    // Create a Blob from the HTML
    const blob = new Blob([confirmationHTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    // Create a temporary link and trigger download
    const link = document.createElement("a");
    link.href = url;
    link.download = `Booking-Confirmation-${bookingRef}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="flex justify-center mb-8"
      >
        <div className="relative">
          <div className="h-24 w-24 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
            <CheckCircle2 className="h-12 w-12 text-white" />
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute -top-2 -right-2"
          >
            <Sparkles className="h-8 w-8 text-yellow-400" />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Booking Confirmed!
        </h1>
        <p className="text-lg text-gray-600">
          Your booking has been successfully confirmed
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm mb-6"
      >
        <div className="text-center mb-6 pb-6 border-b border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Booking Reference</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {bookingRef}
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-3 text-center">
              Booking Details
            </h3>
            <div className="space-y-3 max-w-md mx-auto">
              <div className="flex justify-center gap-2 text-center">
                <span className="text-gray-700">
                  {type === "flight"
                    ? "Flight"
                    : type === "hotel"
                    ? "Hotel"
                    : "Package"}
                  :
                </span>
                <span className="font-medium text-gray-900">{itemTitle}</span>
              </div>
              <div className="flex justify-center gap-2 text-center">
                <span className="text-gray-700">Details:</span>
                <span className="font-medium text-gray-900">
                  {itemSubtitle}
                </span>
              </div>
              <div className="flex justify-center gap-2 text-center">
                <span className="text-gray-700">Guest Name:</span>
                <span className="font-medium text-gray-900">
                  {guestDetails.firstName} {guestDetails.lastName}
                </span>
              </div>
              <div className="flex justify-center gap-2 text-center pt-3 border-t border-gray-200">
                <span className="text-gray-700">Total Amount:</span>
                <span className="text-xl font-bold text-green-600">
                  ₹{pricing.total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-4 text-center">
              A confirmation email has been sent to{" "}
              <span className="font-medium text-gray-900">
                {guestDetails.email}
              </span>
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Button
          onClick={onBack}
          variant="outline"
          className="flex-1 h-12 gap-2"
        >
          <Home className="h-5 w-5" />
          Back to Home
        </Button>
        <Button
          onClick={handleDownloadConfirmation}
          className="flex-1 h-12 gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          <Download className="h-5 w-5" />
          Download Confirmation
        </Button>
      </motion.div>
    </div>
  );
}
