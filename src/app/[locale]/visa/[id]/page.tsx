"use client";

import { use } from "react";
import { useTranslations } from "next-intl";
import { VisaDetailPage } from "@/features/visa/components/VisaDetailPage";
import { useRouter } from "@/i18n/routing";
import type { VisaRequirement } from "@/types";

export default function VisaDetailRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const t = useTranslations("Visa");
  const visas = t.raw("mockData") as VisaRequirement[];
  const visa = visas.find((v) => v.id === id);
  const router = useRouter();

  if (!visa) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
         <h1 className="text-2xl font-bold text-gray-900 mb-4">Visa Requirement Not Found</h1>
         <button 
           onClick={() => router.push("/visa")}
           className="px-6 py-2 bg-brand-primary text-white rounded-lg"
         >
           Back to Visa Services
         </button>
      </div>
    );
  }

  const handleBack = () => {
    router.back();
  };

  const handleStartApplication = (visaData: VisaRequirement) => {
    // Navigate to booking or application flow with this visa data
    // For now, consistent with other flows
    router.push("/visa"); // Or wherever the application starts
  };

  return (
    <VisaDetailPage
      visa={visa}
      onBack={handleBack}
      onStartApplication={handleStartApplication}
    />
  );
}
