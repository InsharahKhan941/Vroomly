
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, id, ...props }) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="text-sm font-medium text-white/80 mb-2 block">{label}</label>
      <input
        id={id}
        className="w-full bg-[#2E2E55] border border-transparent focus:border-pink-400 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400/50"
        {...props}
      />
    </div>
  );
};

export default Input;
