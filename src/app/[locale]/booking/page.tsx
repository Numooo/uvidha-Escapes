"use client";

import { useBookingStore } from "@/shared/store/booking";
import { UnifiedBookingFlow } from "@/UnifiedBookingFlow";
import { useRouter } from "@/i18n/routing";
import { useEffect } from "react";

export default function BookingRoute() {
  const { type, item, metadata, clearBooking } = useBookingStore();
  const router = useRouter();

  useEffect(() => {
    // If user refreshes or hits this URL without data, send them to home
    if (!type || !item) {
      router.push("/");
    }
  }, [type, item, router]);

  if (!type || !item) {
    return null;
  }

  const handleBack = () => {
    clearBooking();
    router.back();
  };

  const handleComplete = () => {
    clearBooking();
    router.push("/");
  };

  return (
    <div className="flex-1">
      <UnifiedBookingFlow
        type={type as any}
        item={item as any}
        metadata={metadata as any}
        onBack={handleBack}
        onComplete={handleComplete}
      />
    </div>
  );
}
