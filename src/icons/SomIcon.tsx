import React from "react";

interface SomIconProps {
  className?: string;
}

export function SomIcon({ className }: SomIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label="Kyrgyzstani Som"
    >
      {/* Большая буква С (arc) */}
      <path d="M18 7a7 7 0 1 0 0 10" />
      {/* Нижнее подчёркивание */}
      <line x1="4" y1="21" x2="14" y2="21" />
    </svg>
  );
}
