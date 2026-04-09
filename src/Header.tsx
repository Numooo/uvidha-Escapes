import React, { useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Globe,
  Plane,
  Hotel,
  Palmtree,
  FileText,
  Sparkles,
  LogIn,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AITripPlanner } from "./AITripPlanner";
import { SignInModal } from "./SignInModal";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: "Flights", href: "/flights", icon: <Plane className="h-4 w-4" /> },
  { label: "Hotels", href: "/hotels", icon: <Hotel className="h-4 w-4" /> },
  {
    label: "Holidays",
    href: "/holidays",
    icon: <Palmtree className="h-4 w-4" />,
  },
  { label: "Visa", href: "/visa", icon: <FileText className="h-4 w-4" /> },
];

const currencies = ["INR", "USD", "EUR", "GBP"];

interface HeaderProps {
  onNavigate?: (
    page: "home" | "flights" | "hotels" | "holidays" | "visa"
  ) => void;
}

export function Header({ onNavigate }: HeaderProps = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("INR");
  const [aiPlannerOpen, setAiPlannerOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      const page = href.replace("/", "") as
        | "home"
        | "flights"
        | "hotels"
        | "holidays"
        | "visa";
      onNavigate(page || "home");
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <a
                href="/"
                onClick={(e) => handleNavClick("/", e)}
                className="flex items-center gap-2.5 group"
              >
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 shadow-lg group-hover:shadow-xl transition-all group-hover:scale-105">
                  <span className="text-xl font-bold text-white">SE</span>
                  <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </div>
                <div className="hidden sm:block">
                  <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Suvidha Escapes
                  </span>
                  <p className="text-xs text-gray-500 -mt-1">
                    Your Journey Begins
                  </p>
                </div>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:gap-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(item.href, e)}
                  className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-purple-50 hover:text-purple-700 relative group"
                >
                  <span className="text-gray-500 group-hover:text-purple-600 transition-colors">
                    {item.icon}
                  </span>
                  {item.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-3/4 transition-all duration-300"></span>
                </a>
              ))}

              {/* AI Trip Planner Button */}
              <button
                onClick={() => setAiPlannerOpen(true)}
                className="ml-2 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-md hover:shadow-lg transition-all hover:scale-105 relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
                <Sparkles className="h-4 w-4 animate-pulse" />
                AI Trip Planner
              </button>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Currency Selector */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700"
                >
                  <Globe className="h-4 w-4" />
                  <span>{selectedCurrency}</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      currencyDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {currencyDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-40 rounded-xl border border-gray-200 bg-white shadow-xl overflow-hidden"
                    >
                      {currencies.map((currency) => (
                        <button
                          key={currency}
                          onClick={() => {
                            setSelectedCurrency(currency);
                            setCurrencyDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-2.5 text-left text-sm transition-colors flex items-center justify-between ${
                            currency === selectedCurrency
                              ? "bg-purple-50 font-semibold text-purple-700"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {currency}
                          {currency === selectedCurrency && (
                            <div className="w-1.5 h-1.5 rounded-full bg-purple-600"></div>
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Sign In Button */}
              <button
                onClick={() => setSignInOpen(true)}
                className="hidden md:inline-flex items-center gap-2 rounded-lg border-2 border-purple-600 bg-white px-4 py-2 text-sm font-semibold text-purple-700 transition-all hover:bg-purple-600 hover:text-white shadow-sm hover:shadow-md"
              >
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden rounded-lg p-2 text-gray-700 hover:bg-gray-100 transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden lg:hidden"
              >
                <div className="space-y-1 pb-4 pt-2 border-t border-gray-100">
                  {navItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => {
                        handleNavClick(item.href, e);
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                    >
                      <span className="text-gray-500">{item.icon}</span>
                      {item.label}
                    </a>
                  ))}

                  {/* Mobile AI Trip Planner */}
                  <button
                    onClick={() => {
                      setAiPlannerOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-3 rounded-lg bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 px-3 py-2.5 text-base font-semibold text-white shadow-md"
                  >
                    <Sparkles className="h-5 w-5" />
                    AI Trip Planner
                  </button>

                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <button
                      onClick={() => {
                        setSignInOpen(true);
                        setMobileMenuOpen(false);
                      }}
                      className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-purple-600 bg-white px-4 py-2.5 text-base font-semibold text-purple-700 hover:bg-purple-600 hover:text-white transition-colors"
                    >
                      <LogIn className="h-5 w-5" />
                      <span>Sign In</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* AI Trip Planner Modal */}
      <AITripPlanner
        isOpen={aiPlannerOpen}
        onClose={() => setAiPlannerOpen(false)}
      />

      {/* Sign In Modal */}
      <SignInModal isOpen={signInOpen} onClose={() => setSignInOpen(false)} />
    </>
  );
}
