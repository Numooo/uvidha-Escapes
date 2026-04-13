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
  content: React.ReactNode;
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
  const { symbolText, CurrencySymbol } = useCurrency();
  const symbol = symbolText;
  
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
    content: React.ReactNode,
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
      <div className="space-y-2">
        <p>{t("itineraryReady", { 
          days, 
          destination: preferences.destination || "" 
        })}</p>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="bg-brand-primary/10 text-brand-primary px-2 py-1 rounded-md">{preferences.duration}</span>
          <span className="bg-brand-primary/10 text-brand-primary px-2 py-1 rounded-md flex items-center gap-1">
            <CurrencySymbol className="h-3 w-3" />
            {preferences.budget}
          </span>
          <span className="bg-brand-primary/10 text-brand-primary px-2 py-1 rounded-md">{preferences.travelers}</span>
        </div>
      </div>
    );
  };

  const getDayTitle = (day: number, destination: string): string => {
    const titles = [
      t("dayTitles.arrival", { destination }),
      t("dayTitles.exploring"),
      t("dayTitles.culture"),
      t("dayTitles.adventure"),
      t("dayTitles.hiddenGems"),
      t("dayTitles.relaxation"),
      t("dayTitles.departure"),
    ];
    return titles[day - 1] || t("dayTitles.exploringDest", { destination });
  };

  const generateDayActivities = (
    day: number,
    prefs: TripPreferences
  ): DayActivity[] => {
    const hasBeachInterest = prefs.interests?.some((i) => i.includes(t("interestsList.beach")));
    const hasAdventure = prefs.interests?.some((i) => i.includes(t("interestsList.adventure")));
    const hasCulture = prefs.interests?.some((i) => i.includes(t("interestsList.culture")));

    if (day === 1) {
      return [
        {
          time: "10:00 AM",
          title: t("activityDetails.arrival.title"),
          description: t("activityDetails.arrival.desc"),
          icon: <Plane className="h-5 w-5" />,
          duration: "2 hours",
        },
        {
          time: "1:00 PM",
          title: t("activityDetails.welcomeLunch.title"),
          description: t("activityDetails.welcomeLunch.desc"),
          icon: <UtensilsCrossed className="h-5 w-5" />,
          duration: "1.5 hours",
        },
        {
          time: "3:00 PM",
          title: t("activityDetails.orientation.title"),
          description: t("activityDetails.orientation.desc"),
          icon: <MapPin className="h-5 w-5" />,
          duration: "2 hours",
        },
        {
          time: "7:00 PM",
          title: t("activityDetails.sunset.title"),
          description: t("activityDetails.sunset.desc"),
          icon: <Camera className="h-5 w-5" />,
          duration: "2 hours",
        },
      ];
    }

    if (hasBeachInterest && day === 2) {
      return [
        {
          time: "8:00 AM",
          title: t("activityDetails.beachMorning.title"),
          description: t("activityDetails.beachMorning.desc"),
          icon: <Heart className="h-5 w-5" />,
          duration: "3 hours",
        },
        {
          time: "12:00 PM",
          title: t("activityDetails.beachsideLunch.title"),
          description: t("activityDetails.beachsideLunch.desc"),
          icon: <UtensilsCrossed className="h-5 w-5" />,
          duration: "1 hour",
        },
        {
          time: "2:00 PM",
          title: t("activityDetails.waterSports.title"),
          description: t("activityDetails.waterSports.desc"),
          icon: <Plane className="h-5 w-5" />,
          duration: "2 hours",
        },
        {
          time: "6:00 PM",
          title: t("activityDetails.beachSunset.title"),
          description: t("activityDetails.beachSunset.desc"),
          icon: <Camera className="h-5 w-5" />,
          duration: "2 hours",
        },
      ];
    }

    if (hasCulture && day === 3) {
      return [
        {
          time: "9:00 AM",
          title: t("activityDetails.cultureTour.title"),
          description: t("activityDetails.cultureTour.desc"),
          icon: <MapPin className="h-5 w-5" />,
          duration: "3 hours",
        },
        {
          time: "1:00 PM",
          title: t("activityDetails.cookingClass.title"),
          description: t("activityDetails.cookingClass.desc"),
          icon: <UtensilsCrossed className="h-5 w-5" />,
          duration: "2 hours",
        },
        {
          time: "4:00 PM",
          title: t("activityDetails.marketShopping.title"),
          description: t("activityDetails.marketShopping.desc"),
          icon: <Camera className="h-5 w-5" />,
          duration: "2 hours",
        },
        {
          time: "7:00 PM",
          title: t("activityDetails.culturalDance.title"),
          description: t("activityDetails.culturalDance.desc"),
          icon: <Heart className="h-5 w-5" />,
          duration: "2 hours",
        },
      ];
    }

    if (hasAdventure && day === 4) {
      return [
        {
          time: "6:00 AM",
          title: t("activityDetails.sunriseTrek.title"),
          description: t("activityDetails.sunriseTrek.desc"),
          icon: <Plane className="h-5 w-5" />,
          duration: "4 hours",
        },
        {
          time: "11:00 AM",
          title: t("activityDetails.adventureLunch.title"),
          description: t("activityDetails.adventureLunch.desc"),
          icon: <UtensilsCrossed className="h-5 w-5" />,
          duration: "1 hour",
        },
        {
          time: "1:00 PM",
          title: t("activityDetails.rafting.title"),
          description: t("activityDetails.rafting.desc"),
          icon: <Heart className="h-5 w-5" />,
          duration: "3 hours",
        },
        {
          time: "6:00 PM",
          title: t("activityDetails.spa.title"),
          description: t("activityDetails.spa.desc"),
          icon: <Hotel className="h-5 w-5" />,
          duration: "2 hours",
        },
      ];
    }

    // Default activities
    return [
      {
        time: "9:00 AM",
        title: t("activityDetails.defaultMorning.title"),
        description: t("activityDetails.defaultMorning.desc"),
        icon: <MapPin className="h-5 w-5" />,
        duration: "3 hours",
      },
      {
        time: "12:30 PM",
        title: t("activityDetails.defaultLunch.title"),
        description: t("activityDetails.defaultLunch.desc"),
        icon: <UtensilsCrossed className="h-5 w-5" />,
        duration: "1.5 hours",
      },
      {
        time: "2:30 PM",
        title: t("activityDetails.defaultAfternoon.title"),
        description: t("activityDetails.defaultAfternoon.desc"),
        icon: <Camera className="h-5 w-5" />,
        duration: "3 hours",
      },
      {
        time: "7:00 PM",
        title: t("activityDetails.defaultEvening.title"),
        description: t("activityDetails.defaultEvening.desc"),
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
         t("durationOptions.3-4"),
         t("durationOptions.5-7"),
         t("durationOptions.7"),
         t("durationOptions.10-14")
      ]);
      setCurrentStep("duration");
    } else if (currentStep === "duration") {
      setPreferences((prev) => ({ ...prev, duration: inputValue }));
      addMessage("bot", t("budget"), [
        t("budgetOptions.budget") + " (20k-40k)",
        t("budgetOptions.midrange") + " (40k-80k)",
        t("budgetOptions.luxury") + " (80k+)",
        t("budgetOptions.ultraLuxury") + " (150k+)",
      ]);
      setCurrentStep("budget");
    } else if (currentStep === "budget") {
      setPreferences((prev) => ({ ...prev, budget: inputValue }));
      addMessage("bot", t("travelers"), [
        t("travelerOptions.solo"),
        t("travelerOptions.couple"),
        t("travelerOptions.familySmall"),
        t("travelerOptions.friends"),
        t("travelerOptions.familyLarge"),
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
      // Extract destination from quick reply (this is a bit tricky with localized strings, but we can assume the option matches one of the quickQuestion values)
      let dest = option;
      // Simple fallback for known quick questions
      if (option === t("quickQuestions.bali")) dest = "Bali";
      else if (option === t("quickQuestions.weekend")) dest = "Bishkek (FRU)";
      else if (option === t("quickQuestions.romantic")) dest = "Maldives";
      
      setPreferences((prev) => ({ ...prev, destination: dest }));
      addMessage("bot", t("duration"), [
        t("durationOptions.3-4"),
        t("durationOptions.5-7"),
        t("durationOptions.7"),
        t("durationOptions.10-14")
      ]);
      setCurrentStep("duration");
    } else if (currentStep === "duration") {
      setPreferences((prev) => ({ ...prev, duration: option }));
      addMessage("bot", t("budget"), [
        t("budgetOptions.budget") + " (20k-40k)",
        t("budgetOptions.midrange") + " (40k-80k)",
        t("budgetOptions.luxury") + " (80k+)",
        t("budgetOptions.ultraLuxury") + " (150k+)",
      ]);
      setCurrentStep("budget");
    } else if (currentStep === "budget") {
      setPreferences((prev) => ({ ...prev, budget: option }));
      addMessage("bot", t("travelers"), [
        t("travelerOptions.solo"),
        t("travelerOptions.couple"),
        t("travelerOptions.familySmall"),
        t("travelerOptions.friends"),
        t("travelerOptions.familyLarge"),
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
      if (option === t("done")) {
        const selectedInterests = preferences.interests || [];
        if (selectedInterests.length === 0) {
          addMessage(
            "bot",
            t("selectInterests")
          );
          return;
        }
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
  <title>${preferences.destination} ${t("itineraryTitle")}</title>
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
      <div class="logo">✈️ Avia Travel Club</div>
      <div class="title">${t("itineraryTitle")}</div>
      <div class="subtitle">${preferences.destination || ""} • ${
      preferences.duration || ""
    }</div>
    </div>

    <div class="trip-info">
      <div class="info-item">
        <div class="info-label">📍 ${t("labels.destination")}</div>
        <div class="info-value">${preferences.destination || ""}</div>
      </div>
      <div class="info-item">
        <div class="info-label">⏱️ ${t("labels.duration")}</div>
        <div class="info-value">${preferences.duration || ""}</div>
      </div>
      <div class="info-item">
        <div class="info-label">💰 ${t("labels.budget")}</div>
        <div class="info-value">${preferences.budget || ""}</div>
      </div>
      <div class="info-item">
        <div class="info-label">👥 ${t("labels.travelers")}</div>
        <div class="info-value">${preferences.travelers || ""}</div>
      </div>
      <div class="info-item" style="grid-column: 1 / -1;">
        <div class="info-label">❤️ ${t("labels.interests")}</div>
        <div class="info-value">${preferences.interests?.join(", ") || ""}</div>
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
            <div class="activity-duration">${t("labels.duration")}: ${activity.duration}</div>
          </div>
        `
          )
          .join("")}
      </div>
    `
      )
      .join("")}

    <div class="footer">
      <div class="footer-logo">Avia Travel Club</div>
      <p>${t("thankYou") || "Thank you for choosing Avia Travel Club!"}</p>
      <p style="font-size: 12px; margin-top: 10px;">
        Generated on ${new Date().toLocaleDateString()}
      </p>
      <p style="font-size: 12px; color: #999;">
        📧 support@AviaTravelClub.com | 📞 +91-1800-123-4567 | 🌐 www.AviaTravelClub.com
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
    a.download = `${(preferences.destination || "Trip").replace(
      /\s+/g,
      "-"
    )}-Itinerary-AviaTravelClub.html`;
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
                                <div className="flex items-center gap-1">
                                  {isSelected && "✓ "}
                                  {option.includes("0k") && <CurrencySymbol className="h-3 w-3 inline-block" />}
                                  {option}
                                </div>
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
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        {preferences.destination} • {preferences.duration} • <CurrencySymbol className="h-3 w-3" /> {preferences.budget}
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
