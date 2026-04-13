import React, { useState, useTransition } from "react";
import Link from "next/link";
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
  Languages,
  DollarSign,
  User,
  LogOut,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AITripPlanner } from "./AITripPlanner";
import { SignInModal } from "./SignInModal";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter, routing } from "@/i18n/routing";
import { useCurrency, CURRENCIES, CurrencyCode } from "@/CurrencyContext";
import logo from "./app/logo1.png";
import Image from "next/image";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const currencies: CurrencyCode[] = ["KGS", "RUB", "USD", "EUR"];

interface HeaderProps {
  onNavigate?: (
    page: "home" | "flights" | "hotels" | "holidays" | "visa" | "cargo" | "profile"
  ) => void;
  isSidebarPinned?: boolean;
  onToggleSidebar?: () => void;
  isAuthenticated?: boolean;
  onLogout?: () => void;
  onSignInSuccess?: () => void;
}

export function Header({ 
  onNavigate, 
  isSidebarPinned, 
  onToggleSidebar,
  isAuthenticated,
  onLogout,
  onSignInSuccess
}: HeaderProps = {}) {
  const t = useTranslations("Header");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const { currency: selectedCurrency, setCurrency, symbol, CurrencyIcon, CurrencySymbol } = useCurrency();
  const [aiPlannerOpen, setAiPlannerOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      const page = href.replace("/", "") as
        | "home"
        | "flights"
        | "hotels"
        | "holidays"
        | "visa"
        | "cargo"
        | "profile";
      onNavigate(page || "home");
    }
  };

  const onLanguageChange = (nextLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale as any });
    });
    setLanguageDropdownOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-brand-primary/95 backdrop-blur-md">
        <nav className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Left Side: Toggle & Logo */}
            <div className="flex items-center gap-4">
              {/* Sidebar Toggle Button (Desktop) */}
              <button
                onClick={onToggleSidebar}
                className="hidden lg:flex items-center justify-center p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
                aria-label="Toggle Sidebar"
              >
                <Menu className="h-6 w-6" />
              </button>

              <Link
                href="/"
                onClick={(e) => handleNavClick("/", e)}
                className="flex items-center gap-2.5 group"
              >
                <div className="relative flex h-12 min-w-[180px] items-center justify-start transition-all group-hover:scale-105">
                  <Image src={logo} alt="Logo" className="h-10 w-auto object-contain object-left" priority />
                </div>
              </Link>
            </div>

            {/* AI Trip Planner Button */}
            <div className="hidden lg:flex lg:items-center">
              <button
                onClick={() => setAiPlannerOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-white/20 transition-all hover:scale-105 relative overflow-hidden group"
              >
                <Sparkles className="h-4 w-4 text-brand-accent animate-pulse" />
                {t("aiPlanner")}
              </button>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-white/10"
                  disabled={isPending}
                >
                  <Languages className="h-4 w-4 text-white/70" />
                  <span className="uppercase">{locale}</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform text-white/50 ${
                      languageDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {languageDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-32 rounded-xl border border-gray-200 bg-white shadow-xl overflow-hidden"
                    >
                      {routing.locales.map((l) => (
                        <button
                          key={l}
                          onClick={() => onLanguageChange(l)}
                          className={`w-full px-4 py-2.5 text-left text-sm transition-colors flex items-center justify-between ${
                            l === locale
                              ? "bg-brand-primary/10 font-semibold text-brand-primary"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <span className="uppercase">{l}</span>
                          {l === locale && (
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-primary"></div>
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Currency Selector */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-white/10"
                >
                  <CurrencyIcon className="h-4 w-4 text-white/70" />
                  <span>{selectedCurrency}</span>
                  <span className="ml-1 text-white/50 flex items-center">
                    (<CurrencySymbol className="h-3 w-3" />)
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform text-white/50 ${
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
                      {currencies.map((code) => {
                        const info = CURRENCIES[code];
                        const Icon = info.icon;
                        return (
                          <button
                            key={code}
                            onClick={() => {
                              setCurrency(code);
                              setCurrencyDropdownOpen(false);
                            }}
                            className={`w-full px-4 py-2.5 text-left text-sm transition-colors flex items-center justify-between ${
                              code === selectedCurrency
                                ? "bg-brand-primary/10 font-semibold text-brand-primary"
                                : "text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <Icon className={`h-4 w-4 ${code === selectedCurrency ? "text-brand-primary" : "text-gray-400"}`} />
                              <span>{code}</span>
                              <span className="text-gray-400 text-xs flex items-center">
                                (
                                {typeof info.symbol === "string" ? (
                                  info.symbol
                                ) : (
                                  <info.symbol className="h-2.5 w-2.5" />
                                )}
                                )
                              </span>
                            </div>
                            {code === selectedCurrency && (
                              <div className="w-1.5 h-1.5 rounded-full bg-brand-primary"></div>
                            )}
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

               {/* Sign In or Profile */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 rounded-lg bg-white/10 p-1 pr-3 border border-white/20 transition-all hover:bg-white/20"
                  >
                    <div className="w-8 h-8 rounded-md bg-brand-accent flex items-center justify-center text-white font-bold text-xs">
                      JD
                    </div>
                    <span className="hidden sm:inline text-xs font-bold text-white uppercase tracking-wider">John Doe</span>
                    <ChevronDown size={14} className={`text-white/50 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {userDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 rounded-xl border border-gray-200 bg-white shadow-xl overflow-hidden py-1"
                      >
                        <button
                          onClick={() => {
                            onNavigate?.("profile");
                            setUserDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <User size={16} className="text-gray-400" />
                          <span>{t("myCabinet")}</span>
                        </button>
                        <div className="h-px bg-gray-100 my-1" />
                        <button
                          onClick={() => {
                            onLogout?.();
                            setUserDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut size={16} />
                          <span>{t("logout")}</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  onClick={() => setSignInOpen(true)}
                  className="hidden md:inline-flex items-center gap-2 rounded-lg border border-white/40 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-white hover:text-brand-primary shadow-sm hover:shadow-md"
                >
                  <LogIn className="h-4 w-4" />
                  <span>{t("signIn")}</span>
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden rounded-lg p-2 text-white hover:bg-white/10 transition-colors"
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
                  {/* For mobile, we might still want the links since the sidebar is hidden on small screens */}
                  {["flights", "hotels", "holidays", "visa", "cargo"].map((id) => (
                    <button
                      key={id}
                      onClick={(e) => {
                        onNavigate?.(id as any);
                        setMobileMenuOpen(false);
                      }}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium text-white/90 hover:bg-white/10 transition-colors"
                    >
                      <span className="text-white/40 uppercase font-bold text-xs">{id}</span>
                      {t(id as any)}
                    </button>
                  ))}

                  {/* Mobile AI Trip Planner */}
                  <button
                    onClick={() => {
                      setAiPlannerOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-3 rounded-lg bg-white/10 border border-white/20 px-3 py-2.5 text-base font-semibold text-white shadow-md"
                  >
                    <Sparkles className="h-5 w-5 text-brand-accent" />
                    {t("aiPlanner")}
                  </button>

                  <div className="border-t border-white/10 pt-3 mt-3">
                    <button
                      onClick={() => {
                        setSignInOpen(true);
                        setMobileMenuOpen(false);
                      }}
                      className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/40 bg-white/5 px-4 py-2.5 text-base font-semibold text-white hover:bg-white hover:text-brand-primary transition-colors"
                    >
                      <LogIn className="h-5 w-5" />
                      <span>{t("signIn")}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      <SignInModal 
        isOpen={signInOpen} 
        onClose={() => setSignInOpen(false)} 
        onSignInSuccess={onSignInSuccess}
      />
      <AITripPlanner isOpen={aiPlannerOpen} onClose={() => setAiPlannerOpen(false)} />
    </>
  );
}
