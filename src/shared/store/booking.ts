import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  FlightOffer,
  Hotel,
  Package,
  VisaRequirement,
} from "@/types";

export type BookingType = "flight" | "hotel" | "package" | "visa";

export interface BookingMetadata {
  checkInDate?: string;
  checkOutDate?: string;
  rooms?: number;
  guests?: number;
  passengers?: number;
}

interface BookingState {
  type: BookingType | null;
  item: FlightOffer | Hotel | Package | VisaRequirement | null;
  metadata: BookingMetadata | null;
  setBooking: (
    type: BookingType,
    item: FlightOffer | Hotel | Package | VisaRequirement,
    metadata?: BookingMetadata,
  ) => void;
  clearBooking: () => void;
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      type: null,
      item: null,
      metadata: null,
      setBooking: (type, item, metadata) =>
        set({ type, item, metadata: metadata || null }),
      clearBooking: () => set({ type: null, item: null, metadata: null }),
    }),
    {
      name: "avia-booking-storage",
    },
  ),
);
