
import React from 'react';

interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, change, icon }) => {
  return (
    <div className="bg-slate-800 p-4 rounded-lg flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <div className="flex items-baseline space-x-2">
          <p className="text-2xl font-bold">{value}</p>
          {change && <p className="text-sm text-green-400">{change}</p>}
        </div>
      </div>
      <div className="text-indigo-400">
        {icon}
      </div>
    </div>
  );
};

export default StatCard;
