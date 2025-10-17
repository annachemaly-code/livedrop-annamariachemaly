// src/components/atoms/MetricCard.tsx
import React from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  color?: string; 
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, color = "bg-gray-200" }) => {
  return (
    <div className={`p-4 rounded shadow text-white ${color}`}>
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
};

export default MetricCard;
