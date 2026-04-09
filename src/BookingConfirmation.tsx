import React, { useEffect } from "react";
import {
  CheckCircle2,
  Download,
  Calendar,
  FileText,
  Copy,
  Plane,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import type { BookingData } from "./types";
import { formatCurrency } from "./data";

interface BookingConfirmationProps {
  booking: BookingData;
  onDownloadTicket: () => void;
  onAddToCalendar: () => void;
  onViewDetails: () => void;
}

export function BookingConfirmation({
  booking,
  onDownloadTicket,
  onAddToCalendar,
  onViewDetails,
}: BookingConfirmationProps) {
  useEffect(() => {
    // Trigger confetti on mount
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

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

  const copyBookingId = () => {
    navigator.clipboard.writeText(booking.bookingId);
    // You could add a toast notification here
  };

  const firstSegment = booking.flight.segments[0];
  const lastSegment =
    booking.flight.segments[booking.flight.segments.length - 1];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Success Header */}
      <div className="px-4 py-16 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="mx-auto mb-6 flex h-30 w-30 items-center justify-center rounded-full bg-green-100"
        >
          <CheckCircle2 className="h-16 w-16 text-green-600" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4 text-4xl font-bold text-gray-900"
        >
          Booking Confirmed!
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-4 inline-flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2"
        >
          <span className="text-lg font-medium text-blue-600">
            Booking ID: {booking.bookingId}
          </span>
          <button
            onClick={copyBookingId}
            className="rounded p-1 transition-colors hover:bg-blue-100"
          >
            <Copy className="h-4 w-4 text-blue-600" />
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600"
        >
          We've sent confirmation to {booking.contact.email}
        </motion.p>
      </div>

      {/* Booking Details Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mx-auto -mt-8 mb-10 max-w-3xl px-4"
      >
        <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">
          {/* Flight Details */}
          <div className="p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Flight Details
              </h2>
              <div className="rounded-lg bg-primary-50 px-3 py-1 text-sm font-semibold text-primary-600">
                {booking.flight.cabin}
              </div>
            </div>

            <div className="mb-6 flex items-center justify-between">
              <div className="text-center">
                <div className="mb-1 text-3xl font-bold text-gray-900">
                  {formatTime(firstSegment.departure)}
                </div>
                <div className="text-lg font-semibold text-gray-700">
                  {firstSegment.from}
                </div>
                <div className="text-sm text-gray-600">
                  {formatDate(firstSegment.departure)}
                </div>
              </div>

              <div className="flex flex-1 flex-col items-center px-8">
                <div className="mb-2 text-sm font-medium text-gray-600">
                  {getDurationText(booking.flight.duration)}
                </div>
                <div className="relative w-full border-t-2 border-gray-300">
                  <Plane className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rotate-90 text-gray-400" />
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  {booking.flight.airline} {booking.flight.flightNumber}
                </div>
              </div>

              <div className="text-center">
                <div className="mb-1 text-3xl font-bold text-gray-900">
                  {formatTime(lastSegment.arrival)}
                </div>
                <div className="text-lg font-semibold text-gray-700">
                  {lastSegment.to}
                </div>
                <div className="text-sm text-gray-600">
                  {formatDate(lastSegment.arrival)}
                </div>
              </div>
            </div>
          </div>

          {/* Perforation Line */}
          <div className="relative">
            <div className="border-t-2 border-dashed border-gray-300"></div>
            <div className="absolute -left-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-green-50"></div>
            <div className="absolute -right-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-green-50"></div>
          </div>

          {/* Passenger Details */}
          <div className="p-8">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Passengers
            </h3>
            <div className="space-y-2">
              {booking.travelers.map((traveler, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <span className="text-sm">•</span>
                  <span className="text-sm">
                    {traveler.title} {traveler.firstName} {traveler.lastName}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-2 border-t border-gray-200 pt-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Paid</span>
                <span className="font-semibold text-gray-900">
                  ₹{formatCurrency(booking.fareBreakdown.total)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Payment Method</span>
                <span className="font-semibold capitalize text-gray-900">
                  {booking.paymentMethod}
                </span>
              </div>
            </div>
          </div>

          {/* QR Code (placeholder) */}
          <div className="absolute bottom-6 right-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-lg border-2 border-gray-200 bg-gray-50">
              <span className="text-xs text-gray-400">QR</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mx-auto mb-16 max-w-4xl px-4"
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <button
            onClick={onDownloadTicket}
            className="group flex flex-col items-start gap-3 rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-sm transition-all hover:border-primary-300 hover:shadow-md"
          >
            <Download className="h-8 w-8 text-primary-600" />
            <div>
              <div className="mb-1 font-semibold text-gray-900">
                Download Ticket
              </div>
              <div className="text-sm text-gray-600">Get your e-ticket PDF</div>
            </div>
            <div className="ml-auto opacity-0 transition-opacity group-hover:opacity-100">
              →
            </div>
          </button>

          <button
            onClick={onAddToCalendar}
            className="group flex flex-col items-start gap-3 rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-sm transition-all hover:border-primary-300 hover:shadow-md"
          >
            <Calendar className="h-8 w-8 text-primary-600" />
            <div>
              <div className="mb-1 font-semibold text-gray-900">
                Add to Calendar
              </div>
              <div className="text-sm text-gray-600">Set a reminder</div>
            </div>
            <div className="ml-auto opacity-0 transition-opacity group-hover:opacity-100">
              →
            </div>
          </button>

          <button
            onClick={onViewDetails}
            className="group flex flex-col items-start gap-3 rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-sm transition-all hover:border-primary-300 hover:shadow-md"
          >
            <FileText className="h-8 w-8 text-primary-600" />
            <div>
              <div className="mb-1 font-semibold text-gray-900">
                View Details
              </div>
              <div className="text-sm text-gray-600">Full booking info</div>
            </div>
            <div className="ml-auto opacity-0 transition-opacity group-hover:opacity-100">
              →
            </div>
          </button>
        </div>
      </motion.div>

      {/* What's Next Section */}
      <div className="border-t border-gray-200 bg-gray-50 px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mx-auto max-w-4xl"
        >
          <h2 className="mb-8 text-3xl font-bold text-gray-900">
            What's Next?
          </h2>

          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white">
                  <Clock className="h-6 w-6" />
                </div>
                <div className="h-full w-0.5 bg-gray-300"></div>
              </div>
              <div className="pb-8">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  Check-in opens
                </h3>
                <p className="mb-1 text-gray-600">48 hours before departure</p>
                <p className="text-sm text-gray-500">
                  We'll send you a reminder
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="h-full w-0.5 bg-gray-300"></div>
              </div>
              <div className="pb-8">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  Prepare documents
                </h3>
                <p className="mb-1 text-gray-600">Keep your ID ready</p>
                <p className="text-sm text-gray-500">Download your ticket</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white">
                  <Plane className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  Arrive at airport
                </h3>
                <p className="mb-1 text-gray-600">2 hours before departure</p>
                <p className="text-sm text-gray-500">Complete security check</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
