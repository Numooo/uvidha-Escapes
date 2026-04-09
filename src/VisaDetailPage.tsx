import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Calendar,
  CheckCircle2,
  FileText,
  AlertCircle,
  Download,
  Upload,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Shield,
  Info,
  ChevronDown,
  ChevronUp,
  User,
  Globe,
} from "lucide-react";
import { Button } from "./primitives/button";
import { Input } from "./primitives/input";
import type { VisaRequirement } from "./types";

interface VisaDetailPageProps {
  visa: VisaRequirement;
  onBack: () => void;
  onStartApplication?: (visa: VisaRequirement) => void;
}

export function VisaDetailPage({
  visa,
  onBack,
  onStartApplication,
}: VisaDetailPageProps) {
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(
    "requirements"
  );
  const [enquiryData, setEnquiryData] = useState({
    name: "",
    email: "",
    phone: "",
    travelDate: "",
    message: "",
  });

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle enquiry submission
    console.log("Enquiry submitted:", enquiryData);
    alert("Thank you! Our visa consultant will contact you within 24 hours.");
    setShowEnquiryForm(false);
    setEnquiryData({
      name: "",
      email: "",
      phone: "",
      travelDate: "",
      message: "",
    });
  };

  const handleBookNow = () => {
    onStartApplication?.(visa);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Country Image */}
      <div className="relative h-96 bg-gradient-to-b from-gray-900 to-gray-800">
        <img
          src={visa.image}
          alt={visa.country}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-lg hover:bg-white/20 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Visa Services</span>
        </button>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-7xl mx-auto px-6 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Globe className="h-8 w-8 text-white" />
                <h1 className="text-5xl font-bold text-white">
                  {visa.country}
                </h1>
              </div>
              <div className="flex items-center gap-6 text-white/90 text-lg mb-6">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  <span>{visa.visaType}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{visa.processingTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{visa.validity}</span>
                </div>
              </div>
              <p className="text-xl text-white/90 max-w-3xl">
                {visa.description}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Document Requirements */}
            <CollapsibleSection
              title="Document Requirements"
              icon={FileText}
              expanded={expandedSection === "requirements"}
              onToggle={() => toggleSection("requirements")}
              badge={`${visa.requirements.length} items`}
            >
              <div className="space-y-3">
                {visa.requirements.map((req, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium">{req}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CollapsibleSection>

            {/* Processing Timeline */}
            <CollapsibleSection
              title="Processing Timeline"
              icon={Clock}
              expanded={expandedSection === "timeline"}
              onToggle={() => toggleSection("timeline")}
            >
              <div className="space-y-6">
                {[
                  {
                    step: 1,
                    title: "Application Submission",
                    desc: "Submit your application with all required documents",
                    duration: "Day 1",
                  },
                  {
                    step: 2,
                    title: "Document Verification",
                    desc: "Our team verifies all documents for completeness",
                    duration: "Day 1-2",
                  },
                  {
                    step: 3,
                    title: "Embassy Submission",
                    desc: "Application forwarded to embassy/consulate",
                    duration: "Day 3",
                  },
                  {
                    step: 4,
                    title: "Processing",
                    desc: "Embassy processes your visa application",
                    duration: `Day 4-${visa.processingTime.split("-")[0]}`,
                  },
                  {
                    step: 5,
                    title: "Visa Issuance",
                    desc: "Approved visa sent to your email",
                    duration: visa.processingTime,
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
                        {item.step}
                      </div>
                      {idx < 4 && (
                        <div className="h-full w-0.5 bg-blue-200 my-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-gray-900">
                          {item.title}
                        </h4>
                        <span className="text-sm text-blue-600 font-medium">
                          {item.duration}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CollapsibleSection>

            {/* Fees Breakdown */}
            <CollapsibleSection
              title="Fees Breakdown"
              icon={CreditCard}
              expanded={expandedSection === "fees"}
              onToggle={() => toggleSection("fees")}
            >
              <div className="space-y-3">
                {[
                  { label: "Embassy Fee", amount: visa.price * 0.7 },
                  { label: "Service Charge", amount: visa.price * 0.2 },
                  { label: "Processing Fee", amount: visa.price * 0.1 },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <span className="text-gray-700">{item.label}</span>
                    <span className="font-semibold text-gray-900">
                      ₹{Math.round(item.amount).toLocaleString()}
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <span className="font-semibold text-blue-900">
                    Total Amount
                  </span>
                  <span className="text-2xl font-bold text-blue-600">
                    ₹{visa.price.toLocaleString()}
                  </span>
                </div>
              </div>
            </CollapsibleSection>

            {/* Important Information */}
            <CollapsibleSection
              title="Important Information"
              icon={AlertCircle}
              expanded={expandedSection === "info"}
              onToggle={() => toggleSection("info")}
            >
              <div className="space-y-4">
                <InfoItem
                  icon={Shield}
                  title="Visa Approval"
                  description="Visa approval is at the discretion of the embassy. We assist with documentation but cannot guarantee approval."
                />
                <InfoItem
                  icon={Calendar}
                  title="Passport Validity"
                  description="Your passport must be valid for at least 6 months beyond your intended stay."
                />
                <InfoItem
                  icon={Upload}
                  title="Document Format"
                  description="All documents should be clear scanned copies in PDF format, not exceeding 2MB per file."
                />
                <InfoItem
                  icon={Download}
                  title="Visa Delivery"
                  description="Approved visa will be sent to your registered email address. Physical stamps may require passport submission."
                />
              </div>
            </CollapsibleSection>

            {/* FAQs */}
            <CollapsibleSection
              title="Frequently Asked Questions"
              icon={Info}
              expanded={expandedSection === "faq"}
              onToggle={() => toggleSection("faq")}
            >
              <div className="space-y-4">
                {[
                  {
                    q: "Can I track my visa application?",
                    a: "Yes, once submitted, you'll receive a tracking ID to monitor your application status in real-time.",
                  },
                  {
                    q: "What if my visa gets rejected?",
                    a: "Embassy fees are non-refundable, but our service charges can be used towards a reapplication within 6 months.",
                  },
                  {
                    q: "Do I need to visit the embassy in person?",
                    a: "For most countries, biometrics or an interview may be required. We'll guide you through the process.",
                  },
                  {
                    q: "Can I expedite my visa processing?",
                    a: "Yes, expedited processing is available for select countries at additional cost. Contact us for details.",
                  },
                ].map((faq, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {faq.q}
                    </h4>
                    <p className="text-gray-600 text-sm">{faq.a}</p>
                  </div>
                ))}
              </div>
            </CollapsibleSection>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Price Card */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="text-center mb-6">
                  <p className="text-sm text-gray-600 mb-2">Processing Fee</p>
                  <p className="text-4xl font-bold text-blue-600">
                    ₹{visa.price.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">per applicant</p>
                </div>

                <div className="space-y-3 mb-6">
                  <Button
                    onClick={handleBookNow}
                    className="w-full h-12 text-lg"
                    size="lg"
                  >
                    Book Now
                  </Button>
                  <Button
                    onClick={() => setShowEnquiryForm(true)}
                    variant="outline"
                    className="w-full h-12 text-lg"
                    size="lg"
                  >
                    Send Enquiry
                  </Button>
                </div>

                <div className="space-y-3 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>Expert visa assistance</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>Document verification</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>24/7 application tracking</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>Secure payment</span>
                  </div>
                </div>
              </div>

              {/* Contact Card */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Need Help?</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Phone className="h-4 w-4 text-blue-600" />
                    <span>+91 98765 43210</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Mail className="h-4 w-4 text-blue-600" />
                    <span>visa@suvidhaescapes.com</span>
                  </div>
                  <div className="flex items-start gap-3 text-gray-700">
                    <MapPin className="h-4 w-4 text-blue-600 mt-0.5" />
                    <span>Mon-Sat: 9:00 AM - 6:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
                <Shield className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  Secure & Trusted
                </h3>
                <p className="text-sm text-gray-600">
                  10,000+ visas processed successfully
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enquiry Form Modal */}
      <AnimatePresence>
        {showEnquiryForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEnquiryForm(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Send Enquiry
                    </h2>
                    <p className="text-gray-600 mt-1">
                      {visa.country} - {visa.visaType}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowEnquiryForm(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleEnquirySubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <Input
                      required
                      value={enquiryData.name}
                      onChange={(e) =>
                        setEnquiryData({ ...enquiryData, name: e.target.value })
                      }
                      placeholder="Enter your full name"
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      required
                      value={enquiryData.email}
                      onChange={(e) =>
                        setEnquiryData({
                          ...enquiryData,
                          email: e.target.value,
                        })
                      }
                      placeholder="your.email@example.com"
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <Input
                      type="tel"
                      required
                      value={enquiryData.phone}
                      onChange={(e) =>
                        setEnquiryData({
                          ...enquiryData,
                          phone: e.target.value,
                        })
                      }
                      placeholder="+91 98765 43210"
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Intended Travel Date
                    </label>
                    <Input
                      type="date"
                      value={enquiryData.travelDate}
                      onChange={(e) =>
                        setEnquiryData({
                          ...enquiryData,
                          travelDate: e.target.value,
                        })
                      }
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message (Optional)
                    </label>
                    <textarea
                      value={enquiryData.message}
                      onChange={(e) =>
                        setEnquiryData({
                          ...enquiryData,
                          message: e.target.value,
                        })
                      }
                      placeholder="Any specific questions or requirements..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowEnquiryForm(false)}
                      className="flex-1 h-12"
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="flex-1 h-12">
                      Submit Enquiry
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Helper Components
interface CollapsibleSectionProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  expanded: boolean;
  onToggle: () => void;
  badge?: string;
}

function CollapsibleSection({
  title,
  icon: Icon,
  children,
  expanded,
  onToggle,
  badge,
}: CollapsibleSectionProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
            <Icon className="h-5 w-5 text-blue-600" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            {badge && <span className="text-sm text-gray-500">{badge}</span>}
          </div>
        </div>
        {expanded ? (
          <ChevronUp className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400" />
        )}
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 border-t border-gray-100">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface InfoItemProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

function InfoItem({ icon: Icon, title, description }: InfoItemProps) {
  return (
    <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 flex-shrink-0">
        <Icon className="h-5 w-5 text-blue-600" />
      </div>
      <div>
        <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}
