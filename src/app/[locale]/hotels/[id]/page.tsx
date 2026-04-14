"use client";

import { use } from "react";
import { useTranslations } from "next-intl";
import { HotelDetailPage } from "@/features/hotels/components/HotelDetailPage";
import { useRouter } from "@/i18n/routing";
import { useBookingStore } from "@/shared/store/booking";
import type { Hotel } from "@/types";

export default function HotelDetailRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const t = useTranslations("Hotels");
  const hotels = t.raw("mockData") as Hotel[];
  const hotel = hotels.find((h) => h.id === id);
  const router = useRouter();
  const setBooking = useBookingStore((state) => state.setBooking);

  if (!hotel) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
         <h1 className="text-2xl font-bold text-gray-900 mb-4">Hotel Not Found</h1>
         <button 
           onClick={() => router.push("/hotels")}
           className="px-6 py-2 bg-brand-primary text-white rounded-lg"
         >
           Back to Hotels
         </button>
      </div>
    );
  }

  const handleBack = () => {
    router.back();
  };

  const handleBook = (
    hotelId: string,
    roomId?: string,
    checkInDate?: string,
    checkOutDate?: string,
    rooms?: number,
    guests?: number,
  ) => {
    const metadata = { hotelId, roomId, checkInDate, checkOutDate, rooms, guests };
    setBooking("hotel", hotel, metadata);
    router.push("/booking");
  };

  return (
    <HotelDetailPage
      hotelData={hotel}
      onBack={handleBack}
      onBook={handleBook}
    />
  );
}
