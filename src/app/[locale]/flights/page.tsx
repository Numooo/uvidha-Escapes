"use client";

import { useSearchParams } from "next/navigation";
import { FlightsPage } from "@/features/flights/FlightsPage";
import { useBookingStore } from "@/shared/store/booking";
import { useRouter } from "@/i18n/routing";

export default function FlightsRoute() {
  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");
  
  const setBooking = useBookingStore((state) => state.setBooking);
  const router = useRouter();

  const handleBookFlight = (flight: any) => {
    setBooking("flight", flight, { passengers: 1 }); // Hardcoded guests for now, will get from searchParams later
    router.push("/booking");
  };

  const handleBack = () => {
    router.push("/");
  };

  return (
    <FlightsPage
      initialOrigin={origin}
      initialDestination={destination}
      onBookFlight={handleBookFlight}
      onBack={handleBack}
    />
  );
}
