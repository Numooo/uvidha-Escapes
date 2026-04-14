"use client";

import { use } from "react";
import { useTranslations } from "next-intl";
import { PackageDetailPage } from "@/features/holidays/components/PackageDetailPage";
import { useRouter } from "@/i18n/routing";
import { useBookingStore } from "@/shared/store/booking";
import type { HolidayPackage } from "@/types";

export default function HolidayDetailRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const t = useTranslations("Holidays");
  const packages = t.raw("mockData") as HolidayPackage[];
  const pkg = packages.find((p) => p.id === id);
  const router = useRouter();
  const setBooking = useBookingStore((state) => state.setBooking);

  if (!pkg) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
         <h1 className="text-2xl font-bold text-gray-900 mb-4">Package Not Found</h1>
         <button 
           onClick={() => router.push("/holidays")}
           className="px-6 py-2 bg-brand-primary text-white rounded-lg"
         >
           Back to Holidays
         </button>
      </div>
    );
  }

  const handleBack = () => {
    router.back();
  };

  const handleBook = (pkgData: HolidayPackage, metadata: any) => {
    setBooking("package", pkgData, metadata);
    router.push("/booking");
  };

  return (
    <PackageDetailPage
      packageData={pkg}
      onBack={handleBack}
      onBook={handleBook}
    />
  );
}
