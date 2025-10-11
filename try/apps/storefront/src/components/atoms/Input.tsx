import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      {...props} // forwards value, onChange, placeholder, className..
      className={`border rounded-md px-4 py-2 ${props.className || ""}`}
    />
  );
};
