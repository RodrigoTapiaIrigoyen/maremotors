import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  icon?: LucideIcon;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const Button = ({ children, icon: Icon, onClick, variant = 'primary', className = '' }: ButtonProps) => {
  const baseStyles = "px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 transform hover:scale-105";
  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200"
  };

  return (
    <button 
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
};

export default Button;