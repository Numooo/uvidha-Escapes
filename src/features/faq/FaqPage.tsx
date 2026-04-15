import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  Search, 
  HelpCircle, 
  CreditCard, 
  Ticket, 
  Plane, 
  Users, 
  RefreshCw, 
  UserPlus,
  ArrowRight,
  Globe,
  Info,
  CheckCircle2,
  Clock,
  MessageSquare
} from "lucide-react";
import { useTranslations } from "next-intl";

interface FaqItem {
  q: string;
  a: string;
}

interface FaqCategory {
  id: string;
  title: string;
  description: string;
  items: FaqItem[];
}

export function FaqPage() {
  const t = useTranslations("Faq");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("general");
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const categories = t.raw("categories") as FaqCategory[];

  const toggleItem = (categoryId: string, index: number) => {
    const key = `${categoryId}-${index}`;
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getIcon = (id: string) => {
    switch (id) {
      case "general": return HelpCircle;
      case "classes": return Ticket;
      case "cheaper": return CreditCard;
      case "children": return Users;
      case "refunds": return RefreshCw;
      case "account": return UserPlus;
      default: return HelpCircle;
    }
  };

  const filteredCategories = categories.map(cat => ({
    ...cat,
    items: cat.items.filter(item => 
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.items.length > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-brand-primary text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://dev.airbelgium.com/wp-content/uploads/2024/01/air-belgium-plane-behind.webp)",
          }}
        />
        <div className="absolute inset-0 bg-brand-primary/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-primary/20" />

        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <HelpCircle className="h-16 w-16 mx-auto mb-6 opacity-90 text-white" />
            <h1 className="text-5xl md:text-6xl font-black mb-6 drop-shadow-xl tracking-tight">
              {t("title")}
            </h1>
            <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto font-medium">
              {t("subtitle")}
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
                <input
                  type="text"
                  placeholder={t("searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 h-16 text-lg bg-white rounded-2xl text-gray-900 shadow-2xl focus:ring-4 focus:ring-brand-primary/20 outline-none transition-all border-none"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Navigation */}
          <aside className="w-full lg:w-80 shrink-0">
            <div className="sticky top-24 space-y-4">
              <h3 className="text-lg font-bold text-gray-900 px-2 mb-4 uppercase tracking-widest text-sm opacity-50">
                {t("categoriesLabel")}
              </h3>
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden p-2">
                {categories.map((cat) => {
                  const Icon = getIcon(cat.id);
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 ${
                        activeCategory === cat.id 
                          ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/30"
                          : "text-gray-600 hover:bg-gray-50 group"
                      }`}
                    >
                      <div className={`rounded-xl shrink-0 transition-colors ${
                        activeCategory === cat.id ? "" : "text-brand-primary"
                      }`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-sm leading-tight">{cat.title}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Contact Card */}
              <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-xl shadow-blue-600/20 mt-8 relative overflow-hidden group">
                <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                  <MessageSquare size={120} />
                </div>
                <h4 className="text-xl font-bold mb-2">{t("contactTitle")}</h4>
                <p className="text-sm text-blue-50/80 mb-6">{t("contactDesc")}</p>
                <button 
                  onClick={() => window.dispatchEvent(new CustomEvent("open-chat"))}
                  className="w-full bg-white text-blue-600 py-3 z-10 relative rounded-xl font-bold text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {t("contactButton")}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </aside>

          {/* FAQ Content Area */}
          <div className="flex-1">
            {filteredCategories.length > 0 ? (
              filteredCategories
                .filter(cat => searchQuery ? true : cat.id === activeCategory)
                .map((cat) => (
                  <motion.div 
                    key={cat.id} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16 last:mb-0"
                  >
                    <div className="flex items-center gap-4 mb-8">
                      <div>
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight">{cat.title}</h2>
                        <p className="text-gray-500 font-medium">{cat.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {cat.items.map((item, idx) => {
                        const isExpanded = expandedItems[`${cat.id}-${idx}`];
                        return (
                          <div 
                            key={idx}
                            className={`bg-white rounded-3xl border transition-all duration-300 ${
                              isExpanded ? "border-brand-primary shadow-xl ring-1 ring-brand-primary/5" : "border-gray-100 hover:border-gray-200 hover:shadow-md"
                            }`}
                          >
                            <button
                              onClick={() => toggleItem(cat.id, idx)}
                              className="w-full flex items-center justify-between p-6 text-left group"
                            >
                              <div className="flex items-center gap-4">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                                  isExpanded ? "bg-brand-primary text-white" : "bg-gray-100 text-gray-400 group-hover:bg-brand-primary/10 group-hover:text-brand-primary"
                                }`}>
                                  <span className="text-xs font-bold">{idx + 1}</span>
                                </div>
                                <span className={`text-lg font-bold transition-colors ${isExpanded ? "text-brand-primary" : "text-gray-900"}`}>
                                  {item.q}
                                </span>
                              </div>
                              <div className={`p-2 rounded-xl transition-all ${isExpanded ? "bg-brand-primary text-white rotate-180" : "bg-gray-50 text-gray-400"}`}>
                                <ChevronDown className="w-5 h-5" />
                              </div>
                            </button>
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-6 pb-8 ml-12 text-gray-600 leading-relaxed text-lg">
                                    <div className="h-px bg-gray-100 w-full mb-6" />
                                    {item.a}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                ))
            ) : (
              <div className="text-center py-24 bg-white rounded-[40px] border border-dashed border-gray-200">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-gray-300" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t("noResults")}</h3>
                <p className="text-gray-500 text-lg">{t("noResultsDesc")}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="bg-white border-y border-gray-100 py-12 mb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: Clock, key: "support" },
              { icon: CheckCircle2, key: "reliability" },
              { icon: Globe, key: "destinations" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-14 h-14 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center mb-4">
                  <item.icon size={28} />
                </div>
                <h4 className="font-bold text-gray-900 mb-1 text-lg">
                  {t(`trustBar.${item.key}.title` as any)}
                </h4>
                <p className="text-gray-500 text-sm">
                  {t(`trustBar.${item.key}.desc` as any)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
