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
  Globe,
  Check,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useCurrency } from "@/CurrencyContext";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import type { VisaRequirement } from "@/types";
import { DatePicker } from "@/shared/ui/DatePicker";

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
  const t = useTranslations("VisaDetail");
  const tFooter = useTranslations("Footer");
  const { symbol, symbolText, CurrencyIcon, CurrencySymbol } = useCurrency();
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(
    "requirements",
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
    // Simulate API call
    console.log("Enquiry submitted:", enquiryData);
    setIsSubmitted(true);
    
    // Auto-close after 3 seconds
    setTimeout(() => {
      setShowEnquiryForm(false);
      setIsSubmitted(false);
      setEnquiryData({
        name: "",
        email: "",
        phone: "",
        travelDate: "",
        message: "",
      });
    }, 3000);
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
          <span>{t("back")}</span>
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
              title={t("documentRequirements")}
              icon={FileText}
              expanded={expandedSection === "requirements"}
              onToggle={() => toggleSection("requirements")}
              badge={t("itemsCount", { count: visa.requirements.length })}
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
              title={t("processingTimeline")}
              icon={Clock}
              expanded={expandedSection === "timeline"}
              onToggle={() => toggleSection("timeline")}
            >
              <div className="space-y-6">
                {[
                  { step: 1, duration: "Day 1" },
                  { step: 2, duration: "Day 1-2" },
                  { step: 3, duration: "Day 3" },
                  { step: 4, duration: `Day 4-${visa.processingTime.split("-")[0]}` },
                  { step: 5, duration: visa.processingTime },
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
                          {t(`timeline.step${item.step}.title` as any)}
                        </h4>
                        <span className="text-sm text-blue-600 font-medium">
                          {item.duration}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        {t(`timeline.step${item.step}.desc` as any)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CollapsibleSection>

            {/* Fees Breakdown */}
            <CollapsibleSection
              title={t("feesBreakdown")}
              icon={CreditCard}
              expanded={expandedSection === "fees"}
              onToggle={() => toggleSection("fees")}
            >
              <div className="space-y-3">
                {[
                  { label: t("fees.embassy"), amount: visa.price * 0.7 },
                  { label: t("fees.service"), amount: visa.price * 0.2 },
                  { label: t("fees.processing"), amount: visa.price * 0.1 },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <span className="text-gray-700">{item.label}</span>
                    <span className="font-semibold text-gray-900 flex items-center">
                      <CurrencySymbol className="h-4 w-4 mr-1" />
                      {Math.round(item.amount).toLocaleString()}
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <span className="font-semibold text-blue-900">
                    {t("fees.total")}
                  </span>
                  <span className="text-2xl font-bold text-blue-600 flex items-center">
                    <CurrencySymbol className="h-6 w-6 mr-1" />
                    {visa.price.toLocaleString()}
                  </span>
                </div>
              </div>
            </CollapsibleSection>

            {/* Important Information */}
            <CollapsibleSection
              title={t("importantInformation")}
              icon={AlertCircle}
              expanded={expandedSection === "info"}
              onToggle={() => toggleSection("info")}
            >
              <div className="space-y-4">
                <InfoItem
                  icon={Shield}
                  title={t("info.approval.title")}
                  description={t("info.approval.desc")}
                />
                <InfoItem
                  icon={Calendar}
                  title={t("info.validity.title")}
                  description={t("info.validity.desc")}
                />
                <InfoItem
                  icon={Upload}
                  title={t("info.format.title")}
                  description={t("info.format.desc")}
                />
                <InfoItem
                  icon={Download}
                  title={t("info.delivery.title")}
                  description={t("info.delivery.desc")}
                />
              </div>
            </CollapsibleSection>

            {/* FAQs */}
            <CollapsibleSection
              title={t("faqs")}
              icon={Info}
              expanded={expandedSection === "faq"}
              onToggle={() => toggleSection("faq")}
            >
              <div className="space-y-4">
                {(t.raw("faqsList") as any[]).map((faq, idx) => (
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
                  <p className="text-sm text-gray-600 mb-2">
                    {t("fees.processing")}
                  </p>
                  <p className="text-4xl font-bold text-blue-600 flex items-center justify-center">
                    <CurrencySymbol className="h-8 w-8 mr-2" />
                    {visa.price.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{t("labels.perApplicant")}</p>
                </div>

                <div className="space-y-3 mb-6">
                  <Button
                    onClick={handleBookNow}
                    className="w-full h-12 text-lg"
                    size="lg"
                  >
                    {t("bookNow")}
                  </Button>
                  <Button
                    onClick={() => setShowEnquiryForm(true)}
                    variant="outline"
                    className="w-full h-12 text-lg"
                    size="lg"
                  >
                    {t("enquiryTitle")}
                  </Button>
                </div>

                <div className="space-y-3 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>{t("trust.expertAssistance")}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>{t("trust.verification")}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>{t("trust.tracking")}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>{t("trust.secure")}</span>
                  </div>
                </div>
              </div>

              {/* Contact Card */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  {t("helpTitle")}
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Phone className="h-4 w-4 text-blue-600" />
                    <span>{tFooter("contact.phone")}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Mail className="h-4 w-4 text-blue-600" />
                    <span>{tFooter("contact.email")}</span>
                  </div>
                  <div className="flex items-start gap-3 text-gray-700">
                    <MapPin className="h-4 w-4 text-blue-600 mt-0.5" />
                    <span>{t("labels.workingHours")}</span>
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
                <Shield className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  {t("trust.secureTitle")}
                </h3>
                <p className="text-sm text-gray-600">
                  {t("trust.stats")}
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
                      {t("enquiryTitle")}
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

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 flex flex-col items-center justify-center text-center"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <Check className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {t("thankYou")}
                    </h3>
                  </motion.div>
                ) : (
                  <form onSubmit={handleEnquirySubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("form.name")} *
                      </label>
                      <Input
                        required
                        value={enquiryData.name}
                        onChange={(e: any) =>
                          setEnquiryData({ ...enquiryData, name: e.target.value })
                        }
                        placeholder="John Doe"
                        className="h-12"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t("form.email")} *
                        </label>
                        <Input
                          type="email"
                          required
                          value={enquiryData.email}
                          onChange={(e: any) =>
                            setEnquiryData({
                              ...enquiryData,
                              email: e.target.value,
                            })
                          }
                          placeholder="john@example.com"
                          className="h-12"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t("form.phone")} *
                        </label>
                        <Input
                          type="tel"
                          required
                          value={enquiryData.phone}
                          onChange={(e: any) =>
                            setEnquiryData({
                              ...enquiryData,
                              phone: e.target.value,
                            })
                          }
                          placeholder={tFooter("contact.phone")}
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div>
                      <DatePicker
                        label={t("form.travelDate")}
                        value={enquiryData.travelDate}
                        onChange={(date) => setEnquiryData({ ...enquiryData, travelDate: date })}
                        minDate={new Date()}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("form.message")}
                      </label>
                      <textarea
                        value={enquiryData.message}
                        onChange={(e) =>
                          setEnquiryData({
                            ...enquiryData,
                            message: e.target.value,
                          })
                        }
                        placeholder="..."
                        rows={4}
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowEnquiryForm(false)}
                        className="flex-1 h-12 rounded-2xl"
                      >
                        {t("form.cancel")}
                      </Button>
                      <Button type="submit" className="flex-1 h-12 rounded-2xl">
                        {t("form.submit")}
                      </Button>
                    </div>
                  </form>
                )}
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
