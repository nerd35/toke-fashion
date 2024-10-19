// components/Button.tsx
import React from "react";

type ButtonVariant =
  | "default"
  | "primary"
  | "secondary"
  | "destructive"
  | "outline"
  | "ghost"
  | "link"
  | "success"
  | "warning"
  | "info"
  | "danger"
  | "pink"
  | "teal"
  | "orange"
  | "purple"
  | "brown"
  | "navy"
  | "gold"
  | "silver"
  | "lavender"
  | "peach";

type ButtonSize = "small" | "medium" | "large";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  default: "bg-gray-200 text-black hover:bg-gray-300",
  primary: "bg-blue-500 text-white hover:bg-blue-600",
  secondary: "bg-green-500 text-white hover:bg-green-600",
  destructive: "bg-red-500 text-white hover:bg-red-600",
  outline: "border border-gray-400 bg-white text-gray-800 hover:bg-gray-100",
  ghost: "text-gray-800 hover:bg-gray-100",
  link: "text-blue-500 underline hover:text-blue-600",
  success: "bg-green-500 text-white hover:bg-green-600",
  warning: "bg-yellow-500 text-black hover:bg-yellow-600",
  info: "bg-blue-300 text-black hover:bg-blue-400",
  danger: "bg-red-300 text-black hover:bg-red-400",
  pink: "bg-pink-500 text-white hover:bg-pink-600",
  teal: "bg-teal-500 text-white hover:bg-teal-600",
  orange: "bg-orange-500 text-white hover:bg-orange-600",
  purple: "bg-purple-500 text-white hover:bg-purple-600",
  brown: "bg-brown-500 text-white hover:bg-brown-600",
  navy: "bg-blue-800 text-white hover:bg-blue-700",
  gold: "bg-yellow-600 text-black hover:bg-yellow-700",
  silver: "bg-gray-400 text-black hover:bg-gray-500",
  lavender: "bg-purple-300 text-black hover:bg-purple-400",
  peach: "bg-orange-200 text-black hover:bg-orange-300",
};

const sizeStyles: Record<ButtonSize, string> = {
  small: "h-8 px-2 text-sm",
  medium: "h-10 px-4 text-base",
  large: "h-12 px-6 text-lg",
};

const CustomButton: React.FC<ButtonProps> = ({
  variant = "default",
  size = "medium",
  className,
  children,
  ...props
}) => {
  const variantClass = variantStyles[variant];
  const sizeClass = sizeStyles[size];

  return (
    <button
      className={`inline-flex items-center justify-center rounded-md transition-colors focus:outline-none ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default CustomButton;
