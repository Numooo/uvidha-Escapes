import React from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
  onStepClick?: (step: number) => void;
}

export function StepIndicator({
  currentStep,
  steps,
  onStepClick,
}: StepIndicatorProps) {
  return (
    <div className="border-b border-gray-200 bg-white py-8">
      <div className="mx-auto flex max-w-3xl items-center justify-center gap-10 px-4">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;
          const isUpcoming = stepNumber > currentStep;
          const isClickable = stepNumber < currentStep && onStepClick;

          return (
            <React.Fragment key={stepNumber}>
              {/* Step Circle */}
              <div className="flex flex-col items-center gap-2">
                <motion.button
                  onClick={() => isClickable && onStepClick(stepNumber)}
                  disabled={!isClickable}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-base font-bold transition-all ${
                    isCompleted
                      ? "border-primary-600 bg-primary-600 text-white"
                      : isActive
                      ? "border-primary-600 bg-primary-600 text-white shadow-[0_0_0_8px_rgba(59,130,246,0.15)]"
                      : "border-gray-300 bg-white text-gray-400"
                  } ${
                    isClickable
                      ? "cursor-pointer hover:scale-105"
                      : "cursor-default"
                  }`}
                  animate={
                    isActive
                      ? {
                          scale: [1, 1.15, 1.15],
                          transition: { duration: 0.3 },
                        }
                      : { scale: 1 }
                  }
                >
                  {isCompleted ? <Check className="h-5 w-5" /> : stepNumber}
                </motion.button>
                <span
                  className={`text-sm transition-all ${
                    isActive
                      ? "font-semibold text-gray-900"
                      : "font-normal text-gray-600"
                  }`}
                >
                  {label}
                </span>
              </div>

              {/* Line Connector */}
              {index < steps.length - 1 && (
                <div
                  className="relative h-0.5 w-20 self-start"
                  style={{ marginTop: "20px" }}
                >
                  <div className="absolute inset-0 bg-gray-200" />
                  <motion.div
                    className="absolute inset-0 bg-primary-600"
                    initial={{ width: "0%" }}
                    animate={{
                      width: stepNumber < currentStep ? "100%" : "0%",
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
