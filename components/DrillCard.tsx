
import React from 'react';
import type { Drill } from '../types';
import { DrillDifficulty } from '../types';

interface DrillCardProps {
  drill: Drill;
}

const difficultyColors = {
  [DrillDifficulty.BEGINNER]: 'bg-green-500/20 text-green-400',
  [DrillDifficulty.INTERMEDIATE]: 'bg-yellow-500/20 text-yellow-400',
  [DrillDifficulty.ADVANCED]: 'bg-red-500/20 text-red-400',
};

const DrillCard: React.FC<DrillCardProps> = ({ drill }) => {
  return (
    <div className="bg-slate-800 rounded-lg p-4 space-y-3">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-indigo-400 font-semibold">{drill.category}</p>
          <h3 className="font-bold text-lg">{drill.title}</h3>
        </div>
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${difficultyColors[drill.difficulty]}`}>
          {drill.difficulty}
        </span>
      </div>
      <p className="text-sm text-gray-400">{drill.description}</p>
      <div className="flex items-center justify-between text-sm text-gray-400 border-t border-slate-700 pt-3">
        <span>Durasi: {drill.duration} menit</span>
        <span>Pemain: {drill.playerCount}</span>
      </div>
      <button className="w-full border border-indigo-500 text-indigo-400 hover:bg-indigo-500/20 font-bold py-2 px-4 rounded-lg transition-colors">
        Lihat Detail
      </button>
    </div>
  );
};

export default DrillCard;
