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
  const baseStyles = "inline-flex items-center justify-center font-bold rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none uppercase tracking-widest";
  
  const variants = {
    primary: "bg-accent text-white hover:bg-emerald-600 shadow-md",
    secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200",
    navy: "bg-[#0B1F3B] text-white hover:bg-slate-800 shadow-md",
    outline: "border-2 border-slate-200 text-slate-600 hover:border-navy hover:text-navy bg-white",
    ghost: "text-slate-500 hover:bg-slate-50",
  };
  
  const sizes = {
    sm: "px-4 py-2 text-[12px]",
    md: "px-6 py-3.5 text-[14px]",
    lg: "px-8 py-4 text-[16px]",
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