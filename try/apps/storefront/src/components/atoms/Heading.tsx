import React from "react";

interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}

export const Heading: React.FC<HeadingProps> = ({
  level = 1,
  children,
  className = "",
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  const baseClass = {
    1: "text-3xl font-bold text-gray-900",
    2: "text-2xl font-semibold text-gray-800",
    3: "text-xl font-semibold text-gray-700",
    4: "text-lg font-medium text-gray-700",
    5: "text-base font-medium text-gray-600",
    6: "text-sm font-medium text-gray-600",
  }[level];

  return <Tag className={`${baseClass} ${className}`}>{children}</Tag>;
};
