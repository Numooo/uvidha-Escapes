import React, { useState } from "react";
import {
  CreditCard,
  Smartphone,
  Building2,
  Wallet,
  Lock,
  Loader,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { FareBreakdown } from "./types";
import { formatCurrency } from "./data";

interface PaymentPageProps {
  fareBreakdown: FareBreakdown;
  onPayment: (method: "upi" | "card" | "netbanking" | "wallet") => void;
  onBack: () => void;
}

export function PaymentPage({
  fareBreakdown,
  onPayment,
  onBack,
}: PaymentPageProps) {
  const [paymentMethod, setPaymentMethod] = useState<
    "upi" | "card" | "netbanking" | "wallet"
  >("upi");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Payment form states
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const handlePay = () => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);

      // Show success for 2 seconds then call onPayment
      setTimeout(() => {
        onPayment(paymentMethod);
      }, 2000);
    }, 3000);
  };

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          {/* Payment Methods */}
          <div className="space-y-6">
            {/* Payment Method Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <h2 className="mb-6 text-xl font-semibold text-gray-900">
                Select Payment Method
              </h2>

              {/* Tab Buttons */}
              <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { id: "upi", label: "UPI", icon: Smartphone },
                  { id: "card", label: "Cards", icon: CreditCard },
                  { id: "netbanking", label: "Net Banking", icon: Building2 },
                  { id: "wallet", label: "Wallets", icon: Wallet },
                ].map((method) => {
                  const Icon = method.icon;
                  return (
                    <button
                      key={method.id}
                      onClick={() =>
                        setPaymentMethod(method.id as typeof paymentMethod)
                      }
                      className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all ${
                        paymentMethod === method.id
                          ? "border-primary-600 bg-primary-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Icon
                        className={`h-6 w-6 ${
                          paymentMethod === method.id
                            ? "text-primary-600"
                            : "text-gray-400"
                        }`}
                      />
                      <span
                        className={`text-sm font-medium ${
                          paymentMethod === method.id
                            ? "text-primary-900"
                            : "text-gray-700"
                        }`}
                      >
                        {method.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Payment Forms */}
              <AnimatePresence mode="wait">
                {/* UPI Form */}
                {paymentMethod === "upi" && (
                  <motion.div
                    key="upi"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Enter UPI ID
                      </label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@upi"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                      />
                    </div>
                    <div className="rounded-lg bg-blue-50 p-4">
                      <p className="text-sm text-blue-900">
                        <strong>Popular UPI Apps:</strong> Google Pay, PhonePe,
                        Paytm, BHIM
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Card Form */}
                {paymentMethod === "card" && (
                  <motion.div
                    key="card"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          CVV
                        </label>
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="123"
                          maxLength={3}
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Net Banking Form */}
                {paymentMethod === "netbanking" && (
                  <motion.div
                    key="netbanking"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Select Your Bank
                    </label>
                    <select className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20">
                      <option>State Bank of India</option>
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>Axis Bank</option>
                      <option>Kotak Mahindra Bank</option>
                      <option>Punjab National Bank</option>
                    </select>
                  </motion.div>
                )}

                {/* Wallet Form */}
                {paymentMethod === "wallet" && (
                  <motion.div
                    key="wallet"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    {["Paytm", "PhonePe", "Amazon Pay", "Mobikwik"].map(
                      (wallet) => (
                        <label
                          key={wallet}
                          className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4 transition-all hover:border-primary-300 hover:bg-primary-50"
                        >
                          <input
                            type="radio"
                            name="wallet"
                            className="h-4 w-4 text-primary-600 focus:ring-2 focus:ring-primary-500/20"
                          />
                          <span className="font-medium text-gray-900">
                            {wallet}
                          </span>
                        </label>
                      )
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Back Button */}
            <button
              onClick={onBack}
              className="w-full rounded-lg border border-gray-300 py-3 text-base font-semibold text-gray-700 transition-colors hover:bg-gray-50 lg:hidden"
            >
              Back
            </button>
          </div>

          {/* Sticky Summary */}
          <div>
            <div className="sticky top-24 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                  Payment Summary
                </h3>

                <div className="space-y-3 border-b border-gray-200 pb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Base Fare</span>
                    <span className="text-gray-900">
                      ₹{formatCurrency(fareBreakdown.baseFare)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Taxes & Fees</span>
                    <span className="text-gray-900">
                      ₹{formatCurrency(fareBreakdown.taxes)}
                    </span>
                  </div>
                  {fareBreakdown.discount && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount</span>
                      <span>-₹{formatCurrency(fareBreakdown.discount)}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between border-b border-gray-200 py-4">
                  <span className="text-lg font-semibold text-gray-900">
                    Total Amount
                  </span>
                  <span className="text-lg font-semibold text-primary-600">
                    ₹{formatCurrency(fareBreakdown.total)}
                  </span>
                </div>

                <button
                  onClick={handlePay}
                  disabled={isProcessing}
                  className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-primary-600 text-lg font-bold text-white shadow-lg transition-all hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Lock className="h-5 w-5" />
                  Pay ₹{formatCurrency(fareBreakdown.total)}
                </button>

                <div className="mt-4 flex items-center justify-center gap-2">
                  <span className="text-xs text-gray-600">
                    Powered by Razorpay
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-center gap-3">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                    alt="Visa"
                    className="h-5 opacity-60"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                    alt="Mastercard"
                    className="h-5 opacity-60"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/1/1b/RuPay.svg"
                    alt="RuPay"
                    className="h-5 opacity-60"
                  />
                </div>
              </motion.div>

              <button
                onClick={onBack}
                className="hidden w-full rounded-lg border border-gray-300 py-3 text-base font-semibold text-gray-700 transition-colors hover:bg-gray-50 lg:block"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Processing Overlay */}
      <AnimatePresence>
        {(isProcessing || isSuccess) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/98 backdrop-blur-sm"
          >
            <div className="text-center">
              {isProcessing && (
                <>
                  <Loader className="mx-auto h-12 w-12 animate-spin text-primary-600" />
                  <h3 className="mt-6 text-xl font-semibold text-gray-900">
                    Processing Payment...
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Please don't close or refresh this page
                  </p>
                  <p className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                    <span>⚡</span>
                    <span>This usually takes a few seconds</span>
                  </p>
                </>
              )}

              {isSuccess && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                >
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle2 className="h-14 w-14 text-green-600" />
                  </div>
                  <h3 className="mt-6 text-2xl font-bold text-gray-900">
                    Payment Successful!
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Redirecting to confirmation page...
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
