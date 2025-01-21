import React from "react";
import { ButtonProps } from "@/types";

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  icon: Icon,
  className = "",
}) => {
  const baseStyles =
    "p-2 rounded-lg transition-colors flex items-center justify-center gap-2";

  const variantStyles = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800",
    outline: "border border-gray-300 hover:bg-gray-50",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
};

export default Button;
