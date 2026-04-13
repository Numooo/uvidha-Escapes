"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  MessageSquare,
  Send,
  ArrowLeft,
  Headphones,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────
interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "support";
  time: string;
}

interface ChatWidgetProps {
  whatsappNumber?: string;
  telegramUsername?: string;
}

// ─── Simulated bot responses (Russian) ───────────────────────
const BOT_RESPONSES = [
  "Спасибо за ваше сообщение! Сейчас уточню информацию для вас.",
  "Понял вас! Дайте мне пару минут, чтобы проверить.",
  "Отличный вопрос! Мы предлагаем лучшие цены на авиабилеты и отели.",
  "Рада помочь! Вы можете найти все доступные варианты на нашем сайте.",
  "Наши специалисты работают 24/7. Если нужна дополнительная помощь — обращайтесь!",
  "Вы можете оформить бронирование прямо на сайте — это быстро и удобно.",
  "Спасибо за ожидание! Вот что я нашла по вашему запросу.",
  "Мы ценим ваше доверие! Обязательно поможем подобрать лучший вариант.",
  "Хороший выбор! Могу предложить несколько вариантов по этому направлению.",
  "Если у вас есть ещё вопросы — пишите, я всегда на связи! 😊",
];

function getTimeString(): string {
  return new Date().toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ─── Chat Panel Component ────────────────────────────────────
function ChatPanel({ onBack }: { onBack: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      text: "Здравствуйте! 👋 Чем можем помочь?",
      sender: "support",
      time: getTimeString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const responseIndexRef = useRef(0);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      text,
      sender: "user",
      time: getTimeString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate typing delay then respond
    setIsTyping(true);
    const delay = 1200 + Math.random() * 1200;
    setTimeout(() => {
      setIsTyping(false);
      const botText =
        BOT_RESPONSES[responseIndexRef.current % BOT_RESPONSES.length];
      responseIndexRef.current += 1;
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        text: botText,
        sender: "support",
        time: getTimeString(),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, delay);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* ── Header ── */}
      <div
        className="relative flex items-center gap-3 px-4 py-3.5 flex-shrink-0"
        style={{
          background: "linear-gradient(135deg, #0a57a1 0%, #3b89e5 100%)",
        }}
      >
        <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-white/[0.06]" />
        <div className="absolute -bottom-5 -left-5 w-16 h-16 rounded-full bg-white/[0.04]" />

        <button
          onClick={onBack}
          className="relative z-10 p-1.5 -ml-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          aria-label="Назад"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>

        <div className="relative z-10 flex items-center gap-2.5 flex-1 min-w-0">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
            <Headphones className="h-4 w-4 text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-white text-[13px] font-semibold leading-tight truncate">
              Поддержка
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white/65 text-[11px]">Онлайн</span>
            </div>
          </div>
        </div>

        <button
          onClick={onBack}
          className="relative z-10 p-1.5 -mr-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          aria-label="Закрыть"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* ── Messages ── */}
      <div
        className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
        style={{
          background:
            "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)",
        }}
      >
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`relative max-w-[82%] px-3.5 py-2.5 ${
                msg.sender === "user"
                  ? "rounded-2xl rounded-br-md text-white"
                  : "rounded-2xl rounded-bl-md text-gray-800"
              }`}
              style={
                msg.sender === "user"
                  ? {
                      background:
                        "linear-gradient(135deg, #0a57a1 0%, #3b89e5 100%)",
                    }
                  : {
                      background: "rgba(255,255,255,0.95)",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                    }
              }
            >
              <p className="text-[13px] leading-relaxed whitespace-pre-wrap">
                {msg.text}
              </p>
              <p
                className={`text-[10px] mt-1 ${
                  msg.sender === "user" ? "text-white/50" : "text-gray-400"
                } text-right`}
              >
                {msg.time}
              </p>
            </div>
          </motion.div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex justify-start"
          >
            <div
              className="px-4 py-3 rounded-2xl rounded-bl-md"
              style={{
                background: "rgba(255,255,255,0.95)",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              }}
            >
              <div className="flex items-center gap-1.5">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-[6px] h-[6px] rounded-full bg-gray-400"
                      style={{
                        animation: `chatBounce 1.2s ease-in-out ${i * 0.15}s infinite`,
                      }}
                    />
                  ))}
                </div>
                <span className="text-[11px] text-gray-400 ml-1">
                  печатает...
                </span>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── Input ── */}
      <div className="flex-shrink-0 px-3 py-2.5 bg-white">
        <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-1.5">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Введите сообщение..."
            className="flex-1 bg-transparent text-[13px] text-gray-800 placeholder-gray-400 outline-none py-1.5"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className={`p-2 rounded-lg transition-all duration-200 cursor-pointer ${
              input.trim()
                ? "bg-brand-primary text-white hover:bg-brand-secondary shadow-sm"
                : "text-gray-300"
            }`}
            aria-label="Отправить"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Typing animation keyframes */}
      <style jsx>{`
        @keyframes chatBounce {
          0%,
          60%,
          100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          30% {
            transform: translateY(-4px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

// ─── Main Widget ─────────────────────────────────────────────
type WidgetView = "menu" | "chat";

export function ChatWidget({
  whatsappNumber = "996555123456",
  telegramUsername = "aviatrevelclub",
}: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<WidgetView>("menu");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (view === "chat") setView("menu");
        else setIsOpen(false);
      }
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [view]);

  // Reset view when closing
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => setView("menu"), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const channels = [
    {
      id: "chat",
      label: "Онлайн чат",
      sublabel: "Обычно отвечаем мгновенно",
      icon: <MessageSquare className="h-[18px] w-[18px]" />,
      gradient: "from-brand-primary to-brand-secondary",
      onClick: () => setView("chat"),
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      sublabel: "Напишите нам в WhatsApp",
      icon: (
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      gradient: "from-[#25D366] to-[#1DA851]",
      onClick: () => {
        window.open(
          `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Здравствуйте! Мне нужна помощь с бронированием.")}`,
          "_blank"
        );
      },
    },
    {
      id: "telegram",
      label: "Telegram",
      sublabel: "Напишите нам в Telegram",
      icon: <Send className="h-[18px] w-[18px]" />,
      gradient: "from-[#2AABEE] to-[#1E96D1]",
      onClick: () => {
        window.open(`https://t.me/${telegramUsername}`, "_blank");
      },
    },
  ];

  return (
    <div
      ref={menuRef}
      className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7"
      id="chat-widget"
    >
      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            className="w-[300px] sm:w-[340px] rounded-2xl overflow-hidden"
            style={{
              height: view === "chat" ? "480px" : "auto",
              maxHeight: "calc(100vh - 120px)",
              background: "#fff",
              boxShadow:
                "0 20px 60px -12px rgba(10,87,161,0.25), 0 8px 24px -8px rgba(0,0,0,0.12)",
              transition: "height 0.3s ease",
            }}
          >
            {view === "chat" ? (
              <ChatPanel onBack={() => setView("menu")} />
            ) : (
              <>
                {/* Header */}
                <div
                  className="relative px-5 pt-5 pb-4 overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, #0a57a1 0%, #3b89e5 100%)",
                  }}
                >
                  <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/[0.07]" />
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/[0.05]" />

                  <div className="relative flex items-start justify-between">
                    <div>
                      <h3 className="text-white text-[15px] font-bold leading-tight mb-1">
                        Нужна помощь?
                      </h3>
                      <p className="text-white/75 text-[13px] leading-snug">
                        Выберите удобный способ связи
                      </p>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="mt-0.5 p-1.5 -mr-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
                      aria-label="Закрыть"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Channel List */}
                <div className="p-2.5 space-y-1">
                  {channels.map((channel, index) => (
                    <motion.button
                      key={channel.id}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.05 * (index + 1),
                        type: "spring",
                        stiffness: 320,
                        damping: 22,
                      }}
                      onClick={channel.onClick}
                      className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl hover:bg-gray-50 transition-all duration-200 group text-left cursor-pointer"
                    >
                      <div
                        className={`flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br ${channel.gradient} text-white shadow-sm group-hover:shadow-md group-hover:scale-[1.06] transition-all duration-200`}
                      >
                        {channel.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold text-gray-800 group-hover:text-brand-primary transition-colors">
                          {channel.label}
                        </p>
                        <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">
                          {channel.sublabel}
                        </p>
                      </div>
                      <svg
                        className="flex-shrink-0 h-3.5 w-3.5 text-gray-300 group-hover:text-brand-primary group-hover:translate-x-0.5 transition-all duration-200"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </motion.button>
                  ))}
                </div>

                {/* Footer */}
                <div className="px-4 py-2.5 bg-gray-50/70">
                  <p className="text-[10px] text-gray-400 text-center tracking-wide">
                    Avia Travel Club • Онлайн 24/7
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <div className="relative">
        {!isOpen && (
          <span className="absolute inset-0 rounded-full animate-ping bg-brand-primary/30 pointer-events-none" />
        )}

        <motion.button
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.93 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex items-center justify-center w-[52px] h-[52px] sm:w-14 sm:h-14 rounded-full transition-all duration-300 cursor-pointer"
          style={{
            background: isOpen
              ? "linear-gradient(135deg, #374151 0%, #1f2937 100%)"
              : "linear-gradient(135deg, #0a57a1 0%, #3b89e5 100%)",
            boxShadow: isOpen
              ? "0 6px 24px -4px rgba(31,41,55,0.4)"
              : "0 6px 28px -4px rgba(10,87,161,0.5), 0 0 0 3px rgba(10,87,161,0.1)",
          }}
          aria-label={isOpen ? "Закрыть меню" : "Открыть меню связи"}
          id="chat-widget-toggle"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </motion.span>
            ) : (
              <motion.span
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}
