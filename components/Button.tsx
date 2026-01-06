import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'navy';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none rounded-full";
  
  const variants = {
    primary: "bg-[#2BB24C] text-white hover:bg-[#239341] shadow-sm",
    secondary: "bg-[#1877F2] text-white hover:bg-[#1565D8] shadow-sm",
    navy: "bg-[#041229] text-white hover:bg-[#0a2041] shadow-sm",
    outline: "border border-slate-200 text-[#041229] hover:border-[#1877F2] hover:text-[#1877F2] bg-white",
    ghost: "text-slate-500 hover:bg-slate-50",
  };
  
  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-3.5 text-base",
  };

  const width = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${width} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;