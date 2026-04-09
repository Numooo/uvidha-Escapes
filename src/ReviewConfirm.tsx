import React from "react";
import { Plane, Info, ChevronRight, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { FlightOffer, FareBreakdown } from "./types";
import { formatCurrency } from "./data";

interface ReviewConfirmProps {
  flight: FlightOffer;
  fareBreakdown: FareBreakdown;
  onContinue: () => void;
}

export function ReviewConfirm({
  flight,
  fareBreakdown,
  onContinue,
}: ReviewConfirmProps) {
  const firstSegment = flight.segments[0];
  const lastSegment = flight.segments[flight.segments.length - 1];

  const formatTime = (datetime: string) => {
    return new Date(datetime).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (datetime: string) => {
    return new Date(datetime).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getDurationText = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 lg:grid-cols-[2fr_1fr]">
      {/* Main Content */}
      <div className="space-y-6">
        {/* Flight Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
        >
          <div className="mb-6 flex items-center gap-3">
            <Plane className="h-6 w-6 text-primary-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Flight Details
            </h2>
          </div>

          {/* Flight Timeline */}
          <div className="space-y-6">
            {flight.segments.map((segment, index) => (
              <div key={index} className="relative">
                <div className="grid grid-cols-[auto_1fr_auto] gap-4">
                  {/* Departure */}
                  <div className="flex flex-col">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-primary-600" />
                      <div>
                        <div className="text-lg font-bold text-gray-900">
                          {formatTime(segment.departure)}
                        </div>
                        <div className="text-sm font-medium text-gray-700">
                          {segment.from}
                        </div>
                        <div className="text-xs text-gray-600">
                          {formatDate(segment.departure)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Duration Line */}
                  <div className="flex flex-col items-center justify-start pt-1">
                    <div className="relative w-full border-t-2 border-gray-300">
                      <Plane className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-90 text-gray-400" />
                    </div>
                    <div className="mt-2 text-sm text-gray-700">
                      {getDurationText(segment.duration)}
                    </div>
                    <div className="text-xs text-gray-600">
                      {flight.airline} {segment.flightNumber}
                    </div>
                    <div className="text-xs text-gray-600">{segment.cabin}</div>
                  </div>

                  {/* Arrival */}
                  <div className="flex flex-col">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="text-lg font-bold text-gray-900">
                          {formatTime(segment.arrival)}
                        </div>
                        <div className="text-sm font-medium text-gray-700">
                          {segment.to}
                        </div>
                        <div className="text-xs text-gray-600">
                          {formatDate(segment.arrival)}
                        </div>
                      </div>
                      <div className="h-3 w-3 rounded-full bg-primary-600" />
                    </div>
                  </div>
                </div>

                {/* Layover Info */}
                {index < flight.segments.length - 1 && (
                  <div className="ml-7 mt-4 flex items-center gap-2 text-sm text-gray-600">
                    <Info className="h-4 w-4" />
                    <span>Layover in {segment.to}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Fare Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
        >
          <h2 className="mb-6 text-xl font-semibold text-gray-900">
            Fare Summary
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between border-b border-gray-100 pb-3">
              <span className="text-sm text-gray-700">Base Fare</span>
              <span className="text-sm font-medium text-gray-900">
                ₹{formatCurrency(fareBreakdown.baseFare)}
              </span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-3">
              <span className="text-sm text-gray-700">Taxes & Fees</span>
              <span className="text-sm font-medium text-gray-900">
                ₹{formatCurrency(fareBreakdown.taxes)}
              </span>
            </div>
            {fareBreakdown.seatSelection && (
              <div className="flex justify-between border-b border-gray-100 pb-3">
                <span className="text-sm text-gray-700">Seat Selection</span>
                <span className="text-sm font-medium text-gray-900">
                  ₹{formatCurrency(fareBreakdown.seatSelection)}
                </span>
              </div>
            )}
            {fareBreakdown.baggage && (
              <div className="flex justify-between border-b border-gray-100 pb-3">
                <span className="text-sm text-gray-700">Extra Baggage</span>
                <span className="text-sm font-medium text-gray-900">
                  ₹{formatCurrency(fareBreakdown.baggage)}
                </span>
              </div>
            )}
            {fareBreakdown.discount && (
              <div className="flex justify-between border-b border-gray-100 pb-3 text-green-600">
                <span className="text-sm font-medium">Discount</span>
                <span className="text-sm font-medium">
                  -₹{formatCurrency(fareBreakdown.discount)}
                </span>
              </div>
            )}
            <div className="flex justify-between border-t-2 border-gray-300 pt-5">
              <span className="text-xl font-bold text-gray-900">
                Total Amount
              </span>
              <span className="text-xl font-bold text-primary-600">
                ₹{formatCurrency(fareBreakdown.total)}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Important Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-blue-200 bg-blue-50 p-6"
        >
          <div className="mb-4 flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-600" />
            <h3 className="text-base font-semibold text-blue-900">
              Important Information
            </h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-sm text-blue-900">
              <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
              <span>Web check-in opens 48 hours before departure</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-blue-900">
              <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
              <span>Please carry a valid government ID</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-blue-900">
              <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
              <span>
                Baggage allowance: {flight.baggage.cabin} cabin,{" "}
                {flight.baggage.checked} check-in
              </span>
            </li>
            {flight.refundable && (
              <li className="flex items-start gap-2 text-sm text-blue-900">
                <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                <span>Free cancellation within 24 hours</span>
              </li>
            )}
          </ul>
        </motion.div>

        {/* Continue Button (Mobile) */}
        <button
          onClick={onContinue}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-primary-700 lg:hidden"
        >
          Continue to Traveler Details
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>

      {/* Sticky Summary Sidebar */}
      <div className="hidden lg:block">
        <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Summary</h3>
          <div className="mb-6 space-y-2">
            <div className="text-sm text-gray-600">
              {firstSegment.from} → {lastSegment.to}
            </div>
            <div className="text-sm text-gray-600">
              {formatDate(firstSegment.departure)}
            </div>
            <div className="text-sm text-gray-600">
              {flight.segments.length === 1
                ? "Non-stop"
                : `${flight.segments.length - 1} stop${
                    flight.segments.length > 2 ? "s" : ""
                  }`}
            </div>
          </div>
          <div className="mb-6 border-t border-gray-200 pt-4">
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-gray-600">Total Amount</span>
              <span className="font-semibold text-gray-900">
                ₹{formatCurrency(fareBreakdown.total)}
              </span>
            </div>
          </div>
          <button
            onClick={onContinue}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 py-3 text-base font-semibold text-white transition-all hover:bg-primary-700"
          >
            Continue
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
