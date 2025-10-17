// src/components/atoms/SmallMetricCard.tsx
import React from "react";

interface Props {
  title: string;
  value: string | number;
  color?: string;
}

const SmallMetricCard: React.FC<Props> = ({ title, value, color = "bg-gray-600" }) => {
  return (
    <div className={`p-4 rounded shadow text-white ${color}`}>
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="text-lg font-bold">{value}</p>
    </div>
  );
};

export default SmallMetricCard;
