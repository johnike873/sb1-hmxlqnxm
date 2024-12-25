import React from 'react';

interface StatsCardProps {
  title: string;
  value: number;
  color: string;
}

export default function StatsCard({ title, value, color }: StatsCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}