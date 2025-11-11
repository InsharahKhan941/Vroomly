
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'w-full text-center py-3 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#3A3A69]';

  const variantClasses = {
    primary: 'bg-[#FFA8A8] text-[#3A3A69] hover:bg-pink-300 focus:ring-pink-400',
    secondary: 'bg-white/10 text-white hover:bg-white/20 focus:ring-white/50',
    ghost: 'bg-transparent text-white hover:bg-white/10 focus:ring-white/50 border border-white/20',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
