import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 focus:ring-blue-500",
    secondary:
      "bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500",
    outline:
      "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:ring-blue-500",
    ghost:
      "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 focus:ring-gray-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
