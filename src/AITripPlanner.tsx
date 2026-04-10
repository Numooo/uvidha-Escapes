import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Sparkles,
  MapPin,
  Heart,
  Plane,
  Hotel,
  UtensilsCrossed,
  Camera,
  Clock,
  CheckCircle2,
  Loader2,
} from "lucide-react";

import { useTranslations } from "next-intl";
import { useCurrency } from "@/CurrencyContext";

interface Message {
  id: string;
  type: "user" | "bot" | "quick-reply";
  content: string;
  timestamp: Date;
  options?: string[];
  isTranslated?: boolean;
}

interface TripPreferences {
  destination?: string;
  duration?: string;
  budget?: string;
  travelers?: string;
  interests?: string[];
  travelStyle?: string;
}

interface DayActivity {
  time: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  duration: string;
}

interface ItineraryDay {
  day: number;
  title: string;
  activities: DayActivity[];
}

interface AITripPlannerProps {
  isOpen: boolean;
  onClose: () => void;
}

const quickQuestionsKeys = [
  "bali",
  "weekend",
  "romantic",
  "adventure",
  "family",
  "budget",
];

const interestsKeys = [
  "beach",
  "adventure",
  "culture",
  "food",
  "photography",
  "shopping",
  "art",
  "nightlife",
];

export function AITripPlanner({ isOpen, onClose }: AITripPlannerProps) {
  const t = useTranslations("AITripPlanner");
  const commonT = useTranslations("Common");
  const { symbol } = useCurrency();
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content: t("intro1"),
      timestamp: new Date(),
    },
    {
      id: "2",
      type: "bot",
      content: t("intro2"),
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState<
    | "destination"
    | "duration"
    | "budget"
    | "travelers"
    | "interests"
    | "generating"
    | "complete"
  >("destination");
  const [preferences, setPreferences] = useState<TripPreferences>({});
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const addMessage = (
    type: "user" | "bot" | "quick-reply",
    content: string,
    options?: string[]
  ) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      options,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const simulateTyping = async (duration: number = 1000) => {
    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, duration));
    setIsTyping(false);
  };

  const generateItinerary = async () => {
    setCurrentStep("generating");
    await simulateTyping(3000);

    const days = parseInt(preferences.duration?.split(" ")[0] || "5");
    const mockItinerary: ItineraryDay[] = [];

    for (let i = 1; i <= Math.min(days, 7); i++) {
      mockItinerary.push({
        day: i,
        title: t("dayTitle", { 
          day: i, 
          title: getDayTitle(i, preferences.destination || t("itineraryTitle")) 
        }),
        activities: generateDayActivities(i, preferences),
      });
    }

    setItinerary(mockItinerary);
    setCurrentStep("complete");

    addMessage(
      "bot",
      t("itinerary", {
        days,
        destination: preferences.destination,
        interests: preferences.interests?.join(", "),
        budget: preferences.budget,
        travelers: preferences.travelers
      })
    );
  };

  const getDayTitle = (day: number, destination: string): string => {
    const titles = [
      `Arrival & ${destination} Welcome`,
      "Exploring the City",
      "Cultural Immersion",
      "Adventure Day",
      "Hidden Gems Tour",
      "Relaxation & Beach Time",
      "Departure & Farewell",
    ];
    return titles[day - 1] || `Exploring ${destination}`;
  };

  const generateDayActivities = (
    day: number,
    prefs: TripPreferences
  ): DayActivity[] => {
    const hasBeachInterest = prefs.interests?.some((i) => i.includes("Beach"));
    const hasAdventure = prefs.interests?.some((i) => i.includes("Adventure"));
    const hasCulture = prefs.interests?.some((i) => i.includes("Culture"));

    if (day === 1) {
      return [
        {
          time: "10:00 AM",
          title: "Airport Pickup & Hotel Check-in",
          description: "Private transfer to your hotel. Rest and freshen up.",
          icon: <Plane className="h-5 w-5" />,
          duration: "2 hours",
        },
        {
          time: "1:00 PM",
          title: "Welcome Lunch",
          description:
            "Try authentic local cuisine at a recommended restaurant.",
          icon: <UtensilsCrossed className="h-5 w-5" />,
          duration: "1.5 hours",
        },
        {
          time: "3:00 PM",
          title: "City Orientation Walk",
          description: "Explore nearby markets and get your bearings.",
          icon: <MapPin className="h-5 w-5" />,
          duration: "2 hours",
        },
        {
          time: "7:00 PM",
          title: "Sunset View & Dinner",
          description: "Watch the sunset from a scenic viewpoint.",
          icon: <Camera className="h-5 w-5" />,
          duration: "2 hours",
        },
      ];
    }

    if (hasBeachInterest && day === 2) {
      return [
        {
          time: "8:00 AM",
          title: "Beach Morning",
          description: "Relax on pristine beaches, swimming and sunbathing.",
          icon: <Heart className="h-5 w-5" />,
          duration: "3 hours",
        },
        {
          time: "12:00 PM",
          title: "Beachside Lunch",
          description: "Fresh seafood and tropical drinks by the shore.",
          icon: <UtensilsCrossed className="h-5 w-5" />,
          duration: "1 hour",
        },
        {
          time: "2:00 PM",
          title: "Water Sports Adventure",
          description: "Snorkeling, kayaking, or paddleboarding.",
          icon: <Plane className="h-5 w-5" />,
          duration: "2 hours",
        },
        {
          time: "6:00 PM",
          title: "Beach Sunset & Bonfire",
          description: "Watch the sunset and enjoy a beach bonfire.",
          icon: <Camera className="h-5 w-5" />,
          duration: "2 hours",
        },
      ];
    }

    if (hasCulture && day === 3) {
      return [
        {
          time: "9:00 AM",
          title: "Temple & Heritage Tour",
          description: "Visit ancient temples and historical landmarks.",
          icon: <MapPin className="h-5 w-5" />,
          duration: "3 hours",
        },
        {
          time: "1:00 PM",
          title: "Traditional Cooking Class",
          description: "Learn to cook authentic local dishes.",
          icon: <UtensilsCrossed className="h-5 w-5" />,
          duration: "2 hours",
        },
        {
          time: "4:00 PM",
          title: "Local Market Shopping",
          description: "Browse handicrafts and souvenirs.",
          icon: <Camera className="h-5 w-5" />,
          duration: "2 hours",
        },
        {
          time: "7:00 PM",
          title: "Cultural Dance Performance",
          description: "Traditional music and dance show with dinner.",
          icon: <Heart className="h-5 w-5" />,
          duration: "2 hours",
        },
      ];
    }

    if (hasAdventure && day === 4) {
      return [
        {
          time: "6:00 AM",
          title: "Mountain Sunrise Trek",
          description: "Hike to a scenic viewpoint for sunrise.",
          icon: <Plane className="h-5 w-5" />,
          duration: "4 hours",
        },
        {
          time: "11:00 AM",
          title: "Adventure Lunch",
          description: "Picnic lunch with panoramic views.",
          icon: <UtensilsCrossed className="h-5 w-5" />,
          duration: "1 hour",
        },
        {
          time: "1:00 PM",
          title: "Zip-lining & Rafting",
          description: "Thrilling adventure activities in nature.",
          icon: <Heart className="h-5 w-5" />,
          duration: "3 hours",
        },
        {
          time: "6:00 PM",
          title: "Relaxation & Spa",
          description: "Unwind with a traditional massage.",
          icon: <Hotel className="h-5 w-5" />,
          duration: "2 hours",
        },
      ];
    }

    // Default activities
    return [
      {
        time: "9:00 AM",
        title: "Morning Exploration",
        description: "Discover hidden gems and local favorites.",
        icon: <MapPin className="h-5 w-5" />,
        duration: "3 hours",
      },
      {
        time: "12:30 PM",
        title: "Lunch Break",
        description: "Enjoy local specialties at a popular restaurant.",
        icon: <UtensilsCrossed className="h-5 w-5" />,
        duration: "1.5 hours",
      },
      {
        time: "2:30 PM",
        title: "Afternoon Activities",
        description: "Continue exploring based on your interests.",
        icon: <Camera className="h-5 w-5" />,
        duration: "3 hours",
      },
      {
        time: "7:00 PM",
        title: "Evening Leisure",
        description: "Dinner and free time to relax.",
        icon: <Heart className="h-5 w-5" />,
        duration: "2 hours",
      },
    ];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    addMessage("user", inputValue);
    setInputValue("");

    await simulateTyping();

    // Process based on current step
    if (currentStep === "destination") {
      setPreferences((prev) => ({ ...prev, destination: inputValue }));
      addMessage("bot", t("duration"), [
        "3-4 days",
        "5-7 days",
        "1 week",
        "10-14 days",
      ]);
      setCurrentStep("duration");
    } else if (currentStep === "duration") {
      setPreferences((prev) => ({ ...prev, duration: inputValue }));
      addMessage("bot", t("budget"), [
        `Budget (${symbol}20k-40k)`,
        `Mid-range (${symbol}40k-80k)`,
        `Luxury (${symbol}80k+)`,
        `Ultra Luxury (${symbol}150k+)`,
      ]);
      setCurrentStep("budget");
    } else if (currentStep === "budget") {
      setPreferences((prev) => ({ ...prev, budget: inputValue }));
      addMessage("bot", t("travelers"), [
        "Solo",
        "Couple",
        "Family (3-4)",
        "Group of Friends",
        "Family (5+)",
      ]);
      setCurrentStep("travelers");
    } else if (currentStep === "travelers") {
      setPreferences((prev) => ({ ...prev, travelers: inputValue }));
      addMessage(
        "bot",
        t("interests"),
        interestsKeys.map(k => t(`interestsList.${k}`))
      );
      setCurrentStep("interests");
    } else if (currentStep === "interests") {
      // This will be handled by quick replies
    }
  };

  const handleQuickReply = async (option: string) => {
    addMessage("quick-reply", option);
    await simulateTyping();

    if (currentStep === "destination") {
      // Extract destination from quick reply
      const dest = option
        .replace("Plan a trip to ", "")
        .replace("near me", "India");
      setPreferences((prev) => ({ ...prev, destination: dest }));
      addMessage("bot", t("duration"), [
        "3-4 days",
        "5-7 days",
        "1 week",
        "10-14 days",
      ]);
      setCurrentStep("duration");
    } else if (currentStep === "duration") {
      setPreferences((prev) => ({ ...prev, duration: option }));
      addMessage("bot", t("budget"), [
        `Budget (${symbol}20k-40k)`,
        `Mid-range (${symbol}40k-80k)`,
        `Luxury (${symbol}80k+)`,
        `Ultra Luxury (${symbol}150k+)`,
      ]);
      setCurrentStep("budget");
    } else if (currentStep === "budget") {
      setPreferences((prev) => ({ ...prev, budget: option }));
      addMessage("bot", t("travelers"), [
        "Solo",
        "Couple",
        "Family (3-4)",
        "Group of Friends",
        "Family (5+)",
      ]);
      setCurrentStep("travelers");
    } else if (currentStep === "travelers") {
      setPreferences((prev) => ({ ...prev, travelers: option }));
      addMessage(
        "bot",
        t("interests"),
        [...interestsKeys.map(k => t(`interestsList.${k}`)), t("done")]
      );
      setCurrentStep("interests");
    } else if (currentStep === "interests") {
      if (option.includes("Done")) {
        const selectedInterests = preferences.interests || [];
        if (selectedInterests.length === 0) {
          addMessage(
            "bot",
            t("selectInterests")
          );
          return;
        }
        addMessage("quick-reply", option);
        await simulateTyping();
        addMessage(
          "bot",
          t("generating")
        );
        await generateItinerary();
      } else {
        // Toggle interest selection without adding message
        const currentInterests = preferences.interests || [];
        if (currentInterests.includes(option)) {
          const newInterests = currentInterests.filter((i) => i !== option);
          setPreferences((prev) => ({ ...prev, interests: newInterests }));
        } else {
          const newInterests = [...currentInterests, option];
          setPreferences((prev) => ({ ...prev, interests: newInterests }));
        }
      }
    }
  };

  const downloadPDF = () => {
    // Create PDF content as HTML
    const pdfContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${preferences.destination} Itinerary - Suvidha Escapes</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 40px;
      background: #f8fafc;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      border-radius: 20px;
      padding: 40px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    .header {
      text-align: center;
      border-bottom: 4px solid #0a57a1;
      padding-bottom: 30px;
      margin-bottom: 40px;
    }
    .logo {
      font-size: 32px;
      font-weight: bold;
      color: #0a57a1;
      margin-bottom: 10px;
    }
    .title {
      font-size: 28px;
      color: #333;
      margin: 10px 0;
    }
    .subtitle {
      color: #666;
      font-size: 16px;
    }
    .trip-info {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      margin-bottom: 40px;
      padding: 20px;
      background: #f1f5f9;
      border-radius: 10px;
    }
    .info-item {
      padding: 10px;
    }
    .info-label {
      font-weight: bold;
      color: #0a57a1;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .info-value {
      color: #333;
      font-size: 16px;
      margin-top: 5px;
    }
    .day-section {
      margin-bottom: 40px;
      page-break-inside: avoid;
    }
    .day-header {
      background: #0a57a1;
      color: white;
      padding: 15px 20px;
      border-radius: 10px;
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .day-number {
      background: white;
      color: #0a57a1;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    }
    .activity {
      margin-bottom: 20px;
      padding: 20px;
      border-left: 4px solid #0a57a1;
      background: #f8fafc;
      border-radius: 0 10px 10px 0;
    }
    .activity-time {
      color: #0a57a1;
      font-weight: bold;
      font-size: 14px;
      margin-bottom: 8px;
    }
    .activity-title {
      font-size: 18px;
      font-weight: bold;
      color: #333;
      margin-bottom: 5px;
    }
    .activity-description {
      color: #666;
      font-size: 14px;
      line-height: 1.6;
    }
    .activity-duration {
      color: #999;
      font-size: 12px;
      margin-top: 8px;
      font-style: italic;
    }
    .footer {
      margin-top: 60px;
      padding-top: 30px;
      border-top: 2px solid #e5e7eb;
      text-align: center;
      color: #666;
    }
    .footer-logo {
      font-size: 24px;
      font-weight: bold;
      color: #0a57a1;
      margin-bottom: 10px;
    }
    @media print {
      body { background: white; padding: 0; }
      .container { box-shadow: none; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">✈️ SUVIDHA ESCAPES</div>
      <div class="title">Your Personalized Travel Itinerary</div>
      <div class="subtitle">${preferences.destination} • ${
      preferences.duration
    }</div>
    </div>

    <div class="trip-info">
      <div class="info-item">
        <div class="info-label">📍 Destination</div>
        <div class="info-value">${preferences.destination}</div>
      </div>
      <div class="info-item">
        <div class="info-label">⏱️ Duration</div>
        <div class="info-value">${preferences.duration}</div>
      </div>
      <div class="info-item">
        <div class="info-label">💰 Budget</div>
        <div class="info-value">${preferences.budget}</div>
      </div>
      <div class="info-item">
        <div class="info-label">👥 Travelers</div>
        <div class="info-value">${preferences.travelers}</div>
      </div>
      <div class="info-item" style="grid-column: 1 / -1;">
        <div class="info-label">❤️ Interests</div>
        <div class="info-value">${preferences.interests?.join(", ")}</div>
      </div>
    </div>

    ${itinerary
      .map(
        (day) => `
      <div class="day-section">
        <div class="day-header">
          <div class="day-number">${day.day}</div>
          <span>${day.title}</span>
        </div>
        ${day.activities
          .map(
            (activity) => `
          <div class="activity">
            <div class="activity-time">🕐 ${activity.time}</div>
            <div class="activity-title">${activity.title}</div>
            <div class="activity-description">${activity.description}</div>
            <div class="activity-duration">Duration: ${activity.duration}</div>
          </div>
        `
          )
          .join("")}
      </div>
    `
      )
      .join("")}

    <div class="footer">
      <div class="footer-logo">SUVIDHA ESCAPES</div>
      <p>${t("thankYou") || "Thank you for choosing Suvidha Escapes!"}</p>
      <p style="font-size: 12px; margin-top: 10px;">
        Generated on ${new Date().toLocaleDateString()}
      </p>
      <p style="font-size: 12px; color: #999;">
        📧 support@suvidhaescapes.com | 📞 +91-1800-123-4567 | 🌐 www.suvidhaescapes.com
      </p>
    </div>
  </div>
</body>
</html>
    `;

    // Create blob and download
    const blob = new Blob([pdfContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${preferences.destination?.replace(
      /\s+/g,
      "-"
    )}-Itinerary-SuvidhaEscapes.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-brand-primary p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 backdrop-blur-lg rounded-full p-3">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{t("title")}</h2>
                  <p className="text-sm text-white/90">
                    {t("subtitle")}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="bg-white/20 backdrop-blur-lg rounded-full p-2 hover:bg-white/30 transition-all"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="flex-1 flex overflow-hidden">
            <div className="flex-1 flex flex-col">
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.type === "user" || message.type === "quick-reply"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl p-4 ${
                        message.type === "user" ||
                        message.type === "quick-reply"
                          ? "bg-brand-primary text-white"
                          : "bg-white shadow-md border border-gray-200"
                      }`}
                    >
                      {message.type === "bot" && (
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="h-4 w-4 text-brand-primary" />
                          <span className="text-xs font-semibold text-gray-600">
                            {t("assistant")}
                          </span>
                        </div>
                      )}
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </p>
                      {message.options && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {message.options.map((option, idx) => {
                            const isSelected =
                              currentStep === "interests" &&
                              !option.includes("Done") &&
                              (preferences.interests || []).includes(option);
                            const isDoneButton =
                              option.includes("Done") ||
                              option.includes("Generate");

                            return (
                              <button
                                key={idx}
                                onClick={() => handleQuickReply(option)}
                                className={`text-xs font-medium px-3 py-2 rounded-full transition-all hover:scale-105 ${
                                  isDoneButton
                                    ? "bg-brand-accent text-white hover:shadow-lg"
                                    : isSelected
                                    ? "bg-brand-primary text-white border-2 border-brand-primary"
                                    : "bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary border-2 border-transparent"
                                }`}
                              >
                                {isSelected && "✓ "}
                                {option}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white shadow-md border border-gray-200 rounded-2xl p-4 flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-brand-primary" />
                      <span className="text-sm text-gray-600">
                        {t("thinking")}
                      </span>
                    </div>
                  </div>
                )}

                {messages.length <= 2 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {quickQuestionsKeys.map((key, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuickReply(t(`quickQuestions.${key}`))}
                        className="bg-white hover:bg-brand-primary/5 border-2 border-brand-primary/20 hover:border-brand-primary/40 text-brand-primary text-sm font-medium px-4 py-2 rounded-full transition-all hover:scale-105"
                      >
                        {t(`quickQuestions.${key}`)}
                      </button>
                    ))}
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 bg-white border-t border-gray-200">
                <div className="flex gap-3">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={t("placeholder")}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim()}
                      className="bg-brand-primary text-white px-6 py-3 rounded-xl hover:bg-brand-secondary hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-semibold"
                    >
                      <Send className="h-5 w-5" />
                      {commonT("submit")}
                    </button>
                </div>
              </div>
            </div>

            {currentStep === "complete" && itinerary.length > 0 && (
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="w-1/2 border-l border-gray-200 overflow-y-auto bg-white"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-brand-primary rounded-full p-2">
                      <CheckCircle2 className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {t("yourItinerary")}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {preferences.destination} • {preferences.duration}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {itinerary.map((day) => (
                      <div
                        key={day.day}
                        className="bg-brand-primary/[0.03] rounded-xl p-5 border border-brand-primary/10"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="bg-brand-primary text-white font-bold rounded-full w-10 h-10 flex items-center justify-center text-sm">
                            {day.day}
                          </div>
                          <h4 className="font-bold text-gray-900">
                            {day.title}
                          </h4>
                        </div>

                        <div className="space-y-3">
                          {day.activities.map((activity, idx) => (
                            <div
                              key={idx}
                              className="bg-white rounded-lg p-3 border border-gray-200 hover:shadow-md transition-shadow"
                            >
                              <div className="flex items-start gap-3">
                                <div className="bg-brand-primary/10 text-brand-primary rounded-lg p-2 mt-1">
                                  {activity.icon}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs font-semibold text-brand-primary">
                                      {activity.time}
                                    </span>
                                    <span className="text-xs text-gray-500 flex items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      {activity.duration}
                                    </span>
                                  </div>
                                  <h5 className="font-semibold text-gray-900 text-sm mb-1">
                                    {activity.title}
                                  </h5>
                                  <p className="text-xs text-gray-600">
                                    {activity.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 space-y-3">
                    <button className="w-full bg-brand-primary text-white font-semibold py-4 rounded-xl hover:bg-brand-secondary hover:shadow-lg transition-all flex items-center justify-center gap-2">
                      <CheckCircle2 className="h-5 w-5" />
                      {t("bookTrip")}
                    </button>
                    <button
                      onClick={downloadPDF}
                      className="w-full border-2 border-gray-300 text-gray-700 font-semibold py-4 rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      {t("downloadPDF")}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
