// src/components/atoms/Button.tsx
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, className = "", ...props }) => {
  return (
    <button
      {...props} // supports disabled, onClick, type..
      className={`rounded-md px-4 py-2 text-white transition
        ${props.disabled ? "bg-gray-400 cursor-not-allowed" : ""} 
        ${className}`}
    >
      {children}
    </button>
  );
};
