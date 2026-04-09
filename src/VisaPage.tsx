import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Globe,
  Clock,
  FileText,
  CheckCircle2,
  Upload,
  ArrowRight,
  AlertCircle,
  Calendar,
  CreditCard,
} from "lucide-react";
import { Input } from "./primitives/input";
import { Button } from "./primitives/button";
import { VisaDetailPage } from "./VisaDetailPage";
import type { VisaRequirement } from "./types";

// Mock visa data with real country images
const MOCK_VISAS: VisaRequirement[] = [
  {
    id: "1",
    country: "United States",
    countryCode: "US",
    visaType: "Tourist (B-2)",
    processingTime: "7-10 business days",
    validity: "10 years (multiple entry)",
    price: 18500,
    image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800",
    description:
      "Tourist visa for leisure, visiting family, or medical treatment",
    requirements: [
      "Valid passport (6 months validity)",
      "Recent passport-size photograph",
      "Proof of financial stability",
      "Travel itinerary and hotel bookings",
      "Employment letter or business proof",
      "Previous travel history",
    ],
  },
  {
    id: "2",
    country: "United Kingdom",
    countryCode: "GB",
    visaType: "Standard Visitor",
    processingTime: "15 business days",
    validity: "6 months (single/multiple entry)",
    price: 14200,
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800",
    description:
      "For tourism, visiting family and friends, or business purposes",
    requirements: [
      "Valid passport",
      "Bank statements (last 6 months)",
      "Travel insurance",
      "Hotel bookings and return tickets",
      "Purpose of visit letter",
      "Employment/income proof",
    ],
  },
  {
    id: "3",
    country: "Schengen Area",
    countryCode: "EU",
    visaType: "Tourist Visa",
    processingTime: "10-15 business days",
    validity: "90 days (within 180 days)",
    price: 9500,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
    description: "Valid for 26 European countries in the Schengen zone",
    requirements: [
      "Valid passport (3 months beyond stay)",
      "Travel insurance (30,000 EUR coverage)",
      "Flight reservations",
      "Hotel bookings",
      "Bank statements",
      "Cover letter",
    ],
  },
  {
    id: "4",
    country: "Australia",
    countryCode: "AU",
    visaType: "Visitor Visa (600)",
    processingTime: "15-20 business days",
    validity: "12 months (multiple entry)",
    price: 16800,
    image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800",
    description: "For tourism or visiting family and friends",
    requirements: [
      "Valid passport",
      "Financial capacity proof",
      "Health insurance",
      "Character documents",
      "Travel plans",
      "Employment details",
    ],
  },
  {
    id: "5",
    country: "Canada",
    countryCode: "CA",
    visaType: "Temporary Resident Visa",
    processingTime: "15-20 business days",
    validity: "10 years (multiple entry)",
    price: 12500,
    image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800",
    description: "Visitor visa for tourism, family visits, or business",
    requirements: [
      "Valid passport",
      "Proof of financial support",
      "Purpose of visit",
      "Ties to home country",
      "Biometrics",
      "Travel history",
    ],
  },
  {
    id: "6",
    country: "Dubai (UAE)",
    countryCode: "AE",
    visaType: "Tourist Visa",
    processingTime: "3-5 business days",
    validity: "60 days (single entry)",
    price: 8500,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
    description: "Tourist visa for short-term leisure travel",
    requirements: [
      "Valid passport (6 months validity)",
      "Passport-size photograph",
      "Return flight tickets",
      "Hotel booking confirmation",
      "Bank statements (last 3 months)",
      "Travel insurance",
    ],
  },
];

interface VisaPageProps {
  onVisaSelect?: (visa: VisaRequirement) => void;
}

export function VisaPage({ onVisaSelect }: VisaPageProps) {
  const [visas] = useState(MOCK_VISAS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVisa, setSelectedVisa] = useState<VisaRequirement | null>(
    null
  );

  const filteredVisas = searchQuery
    ? visas.filter((visa) =>
        visa.country.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : visas;

  const handleApply = (visa: VisaRequirement) => {
    setSelectedVisa(visa);
  };

  // Show detail page if a visa is selected
  if (selectedVisa) {
    return (
      <VisaDetailPage
        visa={selectedVisa}
        onBack={() => setSelectedVisa(null)}
        onStartApplication={(visa) => {
          onVisaSelect?.(visa);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Globe className="h-16 w-16 mx-auto mb-4 opacity-90" />
            <h1 className="text-5xl font-bold mb-4">Visa Services</h1>
            <p className="text-xl opacity-90 mb-8">
              Quick and hassle-free visa processing for your international
              travel
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search for a country (e.g., USA, UK, Dubai)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-lg bg-white"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Results Count */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredVisas.length} Visa Services Available
          </h2>
          <p className="text-gray-600 mt-1">
            Select a destination to view visa requirements and apply
          </p>
        </div>

        {/* Visa Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVisas.map((visa, index) => (
            <VisaCard
              key={visa.id}
              visa={visa}
              index={index}
              onApply={handleApply}
            />
          ))}
        </div>

        {/* How It Works Section */}
        <div className="mt-16 bg-white rounded-2xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: 1,
                icon: FileText,
                title: "Choose Destination",
                desc: "Select the country you want to visit",
              },
              {
                step: 2,
                icon: Upload,
                title: "Upload Documents",
                desc: "Submit required documents online",
              },
              {
                step: 3,
                icon: CreditCard,
                title: "Make Payment",
                desc: "Secure online payment",
              },
              {
                step: 4,
                icon: CheckCircle2,
                title: "Get Visa",
                desc: "Receive approved visa via email",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <item.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {item.step}
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Important Note */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6 flex gap-4">
          <AlertCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">
              Important Information
            </h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>
                • Processing times are approximate and may vary based on embassy
                workload
              </li>
              <li>
                • Ensure your passport has at least 6 months validity from
                travel date
              </li>
              <li>
                • All documents should be clear scanned copies in PDF format
              </li>
              <li>
                • Visa approval is subject to embassy discretion and
                documentation
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

interface VisaCardProps {
  visa: VisaRequirement;
  index: number;
  onApply: (visa: VisaRequirement) => void;
}

function VisaCard({ visa, index, onApply }: VisaCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all group"
    >
      {/* Country Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={visa.image}
          alt={visa.country}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-2xl font-bold text-white mb-1">{visa.country}</h3>
          <p className="text-sm text-white/90">{visa.visaType}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="flex items-start gap-2">
            <Clock className="h-4 w-4 text-gray-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-600 mb-0.5">Processing Time</p>
              <p className="text-sm font-medium text-gray-900">
                {visa.processingTime}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Calendar className="h-4 w-4 text-gray-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-600 mb-0.5">Validity</p>
              <p className="text-sm font-medium text-gray-900">
                {visa.validity}
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4">{visa.description}</p>

        {/* Requirements Preview */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          className="text-sm text-blue-600 font-medium hover:text-blue-700 mb-4 flex items-center gap-1"
        >
          <FileText className="h-4 w-4" />
          {isExpanded ? "Hide" : "View"} Requirements
          {isExpanded && (
            <span className="ml-1 text-gray-500">
              ({visa.requirements.length})
            </span>
          )}
        </button>

        {/* Requirements List */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-5 bg-gray-50 rounded-lg p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="space-y-2">
              {visa.requirements.map((req, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div>
            <p className="text-xs text-gray-600 mb-0.5">Processing Fee</p>
            <p className="text-2xl font-bold text-blue-600">
              ₹{visa.price.toLocaleString()}
            </p>
          </div>
          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onApply(visa);
            }}
            className="gap-2 cursor-pointer hover:shadow-lg"
            type="button"
          >
            View Details
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
