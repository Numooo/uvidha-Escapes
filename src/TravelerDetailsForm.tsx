import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { TravelerDetails, ContactDetails } from "./types";

interface TravelerDetailsFormProps {
  passengerCount: number;
  onContinue: (travelers: TravelerDetails[], contact: ContactDetails) => void;
  onBack: () => void;
}

export function TravelerDetailsForm({
  passengerCount,
  onContinue,
  onBack,
}: TravelerDetailsFormProps) {
  const [travelers, setTravelers] = useState<TravelerDetails[]>(
    Array.from({ length: passengerCount }, () => ({
      title: "Mr" as const,
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "male" as const,
      nationality: "IN",
    }))
  );

  const [contact, setContact] = useState<ContactDetails>({
    email: "",
    phone: "",
    countryCode: "+91",
    receiveUpdates: true,
  });

  const [expandedIndex, setExpandedIndex] = useState<number>(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isTravelerComplete = (traveler: TravelerDetails) => {
    return (
      traveler.firstName &&
      traveler.lastName &&
      traveler.dateOfBirth &&
      traveler.gender &&
      traveler.nationality
    );
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^\d{10}$/.test(phone);
  };

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};

    // Validate travelers
    travelers.forEach((traveler, index) => {
      if (!isTravelerComplete(traveler)) {
        newErrors[`traveler-${index}`] = "Please complete all fields";
      }
    });

    // Validate contact
    if (!validateEmail(contact.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!validatePhone(contact.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onContinue(travelers, contact);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="space-y-6">
        {/* Traveler Information Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
        >
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Traveler Information
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Enter details as per government ID
            </p>
          </div>

          <div className="space-y-3">
            {travelers.map((traveler, index) => {
              const isExpanded = expandedIndex === index;
              const isComplete = isTravelerComplete(traveler);

              return (
                <div
                  key={index}
                  className="overflow-hidden rounded-xl border border-gray-200"
                >
                  {/* Accordion Header */}
                  <button
                    onClick={() => setExpandedIndex(isExpanded ? -1 : index)}
                    className={`flex w-full items-center justify-between p-4 transition-colors ${
                      isExpanded ? "bg-white" : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {isComplete ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      ) : (
                        <User className="h-5 w-5 text-gray-400" />
                      )}
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">
                          Adult {index + 1}
                        </div>
                        {isComplete ? (
                          <div className="text-sm text-gray-600">
                            {traveler.firstName} {traveler.lastName} •{" "}
                            {traveler.gender} •{" "}
                            {new Date().getFullYear() -
                              new Date(traveler.dateOfBirth).getFullYear()}{" "}
                            years
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500">
                            Not filled yet
                          </div>
                        )}
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </button>

                  {/* Accordion Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-gray-200 bg-white p-6">
                          <div className="grid gap-4 sm:grid-cols-2">
                            {/* Title */}
                            <div>
                              <label className="mb-2 block text-sm font-medium text-gray-700">
                                Title
                              </label>
                              <select
                                value={traveler.title}
                                onChange={(e) => {
                                  const newTravelers = [...travelers];
                                  newTravelers[index].title = e.target
                                    .value as TravelerDetails["title"];
                                  setTravelers(newTravelers);
                                }}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                              >
                                <option value="Mr">Mr</option>
                                <option value="Ms">Ms</option>
                                <option value="Mrs">Mrs</option>
                                <option value="Dr">Dr</option>
                              </select>
                            </div>

                            {/* First Name */}
                            <div>
                              <label className="mb-2 block text-sm font-medium text-gray-700">
                                First Name
                              </label>
                              <input
                                type="text"
                                value={traveler.firstName}
                                onChange={(e) => {
                                  const newTravelers = [...travelers];
                                  newTravelers[index].firstName =
                                    e.target.value;
                                  setTravelers(newTravelers);
                                }}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                                placeholder="Enter first name"
                              />
                            </div>

                            {/* Last Name */}
                            <div>
                              <label className="mb-2 block text-sm font-medium text-gray-700">
                                Last Name
                              </label>
                              <input
                                type="text"
                                value={traveler.lastName}
                                onChange={(e) => {
                                  const newTravelers = [...travelers];
                                  newTravelers[index].lastName = e.target.value;
                                  setTravelers(newTravelers);
                                }}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                                placeholder="Enter last name"
                              />
                            </div>

                            {/* Date of Birth */}
                            <div>
                              <label className="mb-2 block text-sm font-medium text-gray-700">
                                Date of Birth
                              </label>
                              <input
                                type="date"
                                value={traveler.dateOfBirth}
                                onChange={(e) => {
                                  const newTravelers = [...travelers];
                                  newTravelers[index].dateOfBirth =
                                    e.target.value;
                                  setTravelers(newTravelers);
                                }}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                              />
                            </div>

                            {/* Gender */}
                            <div className="sm:col-span-2">
                              <label className="mb-3 block text-sm font-medium text-gray-700">
                                Gender
                              </label>
                              <div className="flex gap-4">
                                {["male", "female", "other"].map((gender) => (
                                  <label
                                    key={gender}
                                    className="flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 transition-colors hover:bg-gray-50"
                                  >
                                    <input
                                      type="radio"
                                      name={`gender-${index}`}
                                      value={gender}
                                      checked={traveler.gender === gender}
                                      onChange={(e) => {
                                        const newTravelers = [...travelers];
                                        newTravelers[index].gender = e.target
                                          .value as TravelerDetails["gender"];
                                        setTravelers(newTravelers);
                                      }}
                                      className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-2 focus:ring-primary-500/20"
                                    />
                                    <span className="text-sm font-medium capitalize text-gray-700">
                                      {gender}
                                    </span>
                                  </label>
                                ))}
                              </div>
                            </div>

                            {/* Nationality */}
                            <div className="sm:col-span-2">
                              <label className="mb-2 block text-sm font-medium text-gray-700">
                                Nationality
                              </label>
                              <select
                                value={traveler.nationality}
                                onChange={(e) => {
                                  const newTravelers = [...travelers];
                                  newTravelers[index].nationality =
                                    e.target.value;
                                  setTravelers(newTravelers);
                                }}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                              >
                                <option value="IN">India</option>
                                <option value="US">United States</option>
                                <option value="GB">United Kingdom</option>
                                <option value="AU">Australia</option>
                                <option value="CA">Canada</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Contact Information Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
        >
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Contact Information
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              We'll send booking confirmation here
            </p>
          </div>

          <div className="space-y-4">
            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={contact.email}
                  onChange={(e) =>
                    setContact({ ...contact, email: e.target.value })
                  }
                  className={`w-full rounded-lg border ${
                    errors.email ? "border-red-300" : "border-gray-300"
                  } py-2.5 pl-11 pr-4 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20`}
                  placeholder="your@email.com"
                />
                {contact.email && validateEmail(contact.email) && (
                  <CheckCircle2 className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-green-600" />
                )}
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="flex gap-2">
                <select
                  value={contact.countryCode}
                  onChange={(e) =>
                    setContact({ ...contact, countryCode: e.target.value })
                  }
                  className="w-24 rounded-lg border border-gray-300 px-3 py-2.5 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                >
                  <option value="+91">+91</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                  <option value="+61">+61</option>
                </select>
                <div className="relative flex-1">
                  <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    value={contact.phone}
                    onChange={(e) =>
                      setContact({ ...contact, phone: e.target.value })
                    }
                    className={`w-full rounded-lg border ${
                      errors.phone ? "border-red-300" : "border-gray-300"
                    } py-2.5 pl-11 pr-4 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20`}
                    placeholder="9876543210"
                  />
                </div>
              </div>
              {errors.phone && (
                <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
              )}
            </div>

            {/* Receive Updates Toggle */}
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={contact.receiveUpdates}
                onChange={(e) =>
                  setContact({ ...contact, receiveUpdates: e.target.checked })
                }
                className="h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-2 focus:ring-primary-500/20"
              />
              <span className="text-sm text-gray-700">
                I want to receive booking updates and offers via email/SMS
              </span>
            </label>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={onBack}
            className="flex-1 rounded-lg border border-gray-300 py-3 text-base font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary-600 py-3 text-base font-semibold text-white transition-colors hover:bg-primary-700"
          >
            Continue to Payment
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
