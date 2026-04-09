import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Check,
  Calendar,
  Home,
  Users,
  IndianRupee,
  Shield,
  Clock,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import type { Hotel } from "./types";

interface HotelBookingFlowProps {
  hotel: Hotel;
  checkInDate: string;
  checkOutDate: string;
  rooms: number;
  guests: number;
  selectedRoom?: string;
  onBack: () => void;
  onComplete?: () => void;
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

export function HotelBookingFlow({
  hotel,
  checkInDate,
  checkOutDate,
  rooms,
  guests,
  selectedRoom,
  onBack,
  onComplete,
}: HotelBookingFlowProps) {
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

  const hotelPrice = hotel.price || hotel.pricePerNight || 0;
  const nights =
    checkInDate && checkOutDate
      ? Math.ceil(
          (new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 1;
  const totalPrice = hotelPrice * nights * rooms;
  const taxesAndFees = Math.round(totalPrice * 0.12);
  const grandTotal = totalPrice + taxesAndFees;

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePayment = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Generate booking reference
    const ref = `SE-HTL-${Date.now().toString(36).toUpperCase()}`;
    setBookingRef(ref);
    setIsProcessing(false);
    setStep("confirmation");
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {["Guest Details", "Payment", "Confirmation"].map((stepName, idx) => (
        <div key={stepName} className="flex items-center">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
              (step === "details" && idx === 0) ||
              (step === "payment" && idx === 1) ||
              (step === "confirmation" && idx === 2)
                ? "bg-purple-600 text-white"
                : idx < (step === "details" ? 0 : step === "payment" ? 1 : 2)
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {idx < (step === "details" ? 0 : step === "payment" ? 1 : 2) ? (
              <Check className="h-5 w-5" />
            ) : (
              idx + 1
            )}
          </div>
          <div className="ml-2 mr-6">
            <div
              className={`text-sm font-medium ${
                (step === "details" && idx === 0) ||
                (step === "payment" && idx === 1) ||
                (step === "confirmation" && idx === 2)
                  ? "text-purple-600"
                  : "text-gray-500"
              }`}
            >
              {stepName}
            </div>
          </div>
          {idx < 2 && (
            <div
              className={`w-16 h-0.5 ${
                idx < (step === "details" ? 0 : step === "payment" ? 1 : 2)
                  ? "bg-green-500"
                  : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-6 w-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Complete Your Booking
              </h1>
              <p className="text-sm text-gray-600">{hotel.name}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderStepIndicator()}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {step === "details" && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white rounded-xl shadow-sm p-6"
                >
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Guest Information
                  </h2>
                  <form onSubmit={handleDetailsSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            required
                            value={guestDetails.firstName}
                            onChange={(e) =>
                              setGuestDetails({
                                ...guestDetails,
                                firstName: e.target.value,
                              })
                            }
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="John"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            required
                            value={guestDetails.lastName}
                            onChange={(e) =>
                              setGuestDetails({
                                ...guestDetails,
                                lastName: e.target.value,
                              })
                            }
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Doe"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          required
                          value={guestDetails.email}
                          onChange={(e) =>
                            setGuestDetails({
                              ...guestDetails,
                              email: e.target.value,
                            })
                          }
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="john.doe@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="tel"
                          required
                          value={guestDetails.phone}
                          onChange={(e) =>
                            setGuestDetails({
                              ...guestDetails,
                              phone: e.target.value,
                            })
                          }
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          required
                          value={guestDetails.address}
                          onChange={(e) =>
                            setGuestDetails({
                              ...guestDetails,
                              address: e.target.value,
                            })
                          }
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="123 Main Street"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          required
                          value={guestDetails.city}
                          onChange={(e) =>
                            setGuestDetails({
                              ...guestDetails,
                              city: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="Mumbai"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Zip Code *
                        </label>
                        <input
                          type="text"
                          required
                          value={guestDetails.zipCode}
                          onChange={(e) =>
                            setGuestDetails({
                              ...guestDetails,
                              zipCode: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="400001"
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
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Any special requirements or preferences..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 rounded-xl hover:shadow-lg transition-all"
                    >
                      Continue to Payment
                    </button>
                  </form>
                </motion.div>
              )}

              {step === "payment" && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white rounded-xl shadow-sm p-6"
                >
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Payment Details
                  </h2>

                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl p-6 mb-6">
                    <div className="flex items-start gap-3">
                      <Shield className="h-6 w-6 text-yellow-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">
                          Mock Payment Gateway
                        </h3>
                        <p className="text-sm text-gray-600">
                          This is a demo booking flow. No actual payment will be
                          processed. Click "Complete Booking" to simulate a
                          successful payment.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="4111 1111 1111 1111"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep("details")}
                      className="flex-1 border-2 border-gray-300 text-gray-700 font-semibold py-4 rounded-xl hover:bg-gray-50 transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={handlePayment}
                      disabled={isProcessing}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="h-5 w-5" />
                          Complete Booking
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

              {step === "confirmation" && (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-xl shadow-sm p-8 text-center"
                >
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                      <CheckCircle2 className="h-12 w-12 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      Booking Confirmed!
                    </h2>
                    <p className="text-gray-600">
                      Your hotel reservation has been successfully confirmed.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Sparkles className="h-5 w-5 text-purple-600" />
                      <span className="text-sm font-semibold text-gray-600">
                        Booking Reference
                      </span>
                    </div>
                    <div className="text-3xl font-bold text-purple-600 tracking-wider">
                      {bookingRef}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 mb-6 text-left space-y-3">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Booking Details
                    </h3>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Hotel:</span>
                      <span className="font-medium text-gray-900">
                        {hotel.name}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Check-in:</span>
                      <span className="font-medium text-gray-900">
                        {new Date(checkInDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Check-out:</span>
                      <span className="font-medium text-gray-900">
                        {new Date(checkOutDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Rooms:</span>
                      <span className="font-medium text-gray-900">{rooms}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Guests:</span>
                      <span className="font-medium text-gray-900">
                        {guests}
                      </span>
                    </div>
                    <div className="border-t border-gray-200 pt-3 mt-3">
                      <div className="flex justify-between text-sm font-semibold">
                        <span className="text-gray-900">Total Paid:</span>
                        <span className="text-purple-600 text-lg">
                          ₹{grandTotal.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                    <p className="text-sm text-blue-800">
                      📧 A confirmation email has been sent to{" "}
                      <strong>{guestDetails.email}</strong>
                    </p>
                  </div>

                  <button
                    onClick={onBack}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 rounded-xl hover:shadow-lg transition-all"
                  >
                    Back to Hotels
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">
                Booking Summary
              </h3>

              <div className="mb-4">
                <img
                  src={hotel.images?.[0] || "/placeholder-hotel.jpg"}
                  alt={hotel.name}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h4 className="font-semibold text-gray-900">{hotel.name}</h4>
                <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                  <MapPin className="h-4 w-4" />
                  {hotel.location}
                </p>
              </div>

              <div className="space-y-3 py-4 border-t border-gray-200">
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Check-in:</span>
                  <span className="font-medium text-gray-900 ml-auto">
                    {new Date(checkInDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Check-out:</span>
                  <span className="font-medium text-gray-900 ml-auto">
                    {new Date(checkOutDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Nights:</span>
                  <span className="font-medium text-gray-900 ml-auto">
                    {nights}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Home className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Rooms:</span>
                  <span className="font-medium text-gray-900 ml-auto">
                    {rooms}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Guests:</span>
                  <span className="font-medium text-gray-900 ml-auto">
                    {guests}
                  </span>
                </div>
              </div>

              <div className="space-y-2 py-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    ₹{hotelPrice.toLocaleString()} × {nights} nights × {rooms}{" "}
                    room{rooms > 1 ? "s" : ""}
                  </span>
                  <span className="font-medium text-gray-900">
                    ₹{totalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Taxes & Fees (12%)</span>
                  <span className="font-medium text-gray-900">
                    ₹{taxesAndFees.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-purple-600">
                    ₹{grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Shield className="h-4 w-4 text-green-600" />
                  100% Secure Payment
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  Instant Confirmation
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Phone className="h-4 w-4 text-green-600" />
                  24/7 Customer Support
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
