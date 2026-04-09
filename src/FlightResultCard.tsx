import React, { useState } from "react";
import {
  Plane,
  Clock,
  ChevronDown,
  ChevronUp,
  Briefcase,
  ShoppingBag,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { FlightOffer } from "./types";
import { formatCurrency } from "./data";

interface FlightResultCardProps {
  flight: FlightOffer;
  onBook: (flight: FlightOffer) => void;
}

export function FlightResultCard({ flight, onBook }: FlightResultCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getDurationText = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatTime = (datetime: string) => {
    return new Date(datetime).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatDate = (datetime: string) => {
    return new Date(datetime).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const getStopsText = () => {
    if (flight.segments.length === 1) return "Non-stop";
    if (flight.segments.length === 2) return "1 stop";
    return `${flight.segments.length - 1} stops`;
  };

  const firstSegment = flight.segments[0];
  const lastSegment = flight.segments[flight.segments.length - 1];

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      {/* Main Flight Info */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Airline */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-white">
            {flight.airlineLogo || flight.logo ? (
              <img
                src={flight.airlineLogo || flight.logo}
                alt={flight.airline}
                className="h-full w-full object-contain p-1"
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  // Fallback to Plane icon if image fails to load
                  e.currentTarget.style.display = "none";
                  const fallback = e.currentTarget.nextElementSibling;
                  if (fallback) {
                    (fallback as HTMLElement).style.display = "block";
                  }
                }}
              />
            ) : null}
            <Plane
              className="h-6 w-6 text-gray-600"
              style={{
                display: flight.airlineLogo || flight.logo ? "none" : "block",
              }}
            />
          </div>
          <div>
            <div className="font-semibold text-gray-900">{flight.airline}</div>
            <div className="text-sm text-gray-600">{flight.flightNumber}</div>
          </div>
        </div>

        {/* Route & Time */}
        <div className="flex flex-1 items-center gap-4">
          {/* Departure */}
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {formatTime(firstSegment.departure)}
            </div>
            <div className="text-sm text-gray-600">{firstSegment.from}</div>
            <div className="text-xs text-gray-500">
              {formatDate(firstSegment.departure)}
            </div>
          </div>

          {/* Duration & Stops */}
          <div className="flex flex-1 flex-col items-center">
            <div className="text-sm text-gray-600">
              {getDurationText(flight.duration)}
            </div>
            <div className="relative w-full">
              <div className="h-0.5 w-full bg-gray-300"></div>
              <Plane className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-90 text-gray-400" />
            </div>
            <div className="text-xs text-gray-600">{getStopsText()}</div>
          </div>

          {/* Arrival */}
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {formatTime(lastSegment.arrival)}
            </div>
            <div className="text-sm text-gray-600">{lastSegment.to}</div>
            <div className="text-xs text-gray-500">
              {formatDate(lastSegment.arrival)}
            </div>
          </div>
        </div>

        {/* Price & Action */}
        <div className="flex items-center gap-4 lg:flex-col lg:items-end">
          <div className="flex-1 lg:flex-none">
            <div className="text-right text-2xl font-bold text-gray-900">
              {formatCurrency(flight.price)}
            </div>
            <div className="text-right text-sm text-gray-600">per adult</div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 cursor-pointer"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="inline h-4 w-4" /> Hide
                </>
              ) : (
                <>
                  <ChevronDown className="inline h-4 w-4" /> Details
                </>
              )}
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onBook(flight);
              }}
              className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 cursor-pointer"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-4 border-t border-gray-200 pt-4">
              {/* Flight Segments */}
              <div>
                <h4 className="mb-3 text-sm font-semibold text-gray-900">
                  Flight Details
                </h4>
                <div className="space-y-4">
                  {flight.segments.map((segment, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                        {index + 1}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-gray-900">
                              {segment.from} → {segment.to}
                            </div>
                            <div className="text-sm text-gray-600">
                              {formatTime(segment.departure)} -{" "}
                              {formatTime(segment.arrival)} •{" "}
                              {getDurationText(segment.duration)}
                            </div>
                          </div>
                          <div className="text-sm text-gray-600">
                            {segment.cabin}
                          </div>
                        </div>
                        {index < flight.segments.length - 1 && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="h-4 w-4" />
                            <span>Layover in {segment.to}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Baggage */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 text-sm font-semibold text-gray-900">
                    Baggage Allowance
                  </h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      <span>Cabin: {flight.baggage.cabin || "7 kg"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="h-4 w-4" />
                      <span>Check-in: {flight.baggage.checked || "15 kg"}</span>
                    </div>
                  </div>
                </div>

                {/* Fare Rules */}
                <div>
                  <h4 className="mb-2 text-sm font-semibold text-gray-900">
                    Fare Rules
                  </h4>
                  <div className="space-y-1 text-sm">
                    <div
                      className={`${
                        flight.refundable ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {flight.refundable ? "✓ Refundable" : "✗ Non-refundable"}
                    </div>
                    <div className="text-gray-600">
                      {flight.changeable
                        ? "✓ Date change allowed"
                        : "✗ Date change not allowed"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              {flight.amenities && flight.amenities.length > 0 && (
                <div>
                  <h4 className="mb-2 text-sm font-semibold text-gray-900">
                    Amenities
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {flight.amenities.map((amenity, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
