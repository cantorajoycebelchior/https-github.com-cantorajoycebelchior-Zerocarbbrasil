import React from 'react';
import { UserProfile, DailyLog } from '../types';
import { Droplet, Plus, Minus } from 'lucide-react';
import { motion } from 'motion/react';

interface MacroRingsProps {
  user: UserProfile;
  todayLog: DailyLog;
  onUpdateWater: (newAmountMl: number) => void;
}

export const MacroRings: React.FC<MacroRingsProps> = ({ user, todayLog, onUpdateWater }) => {
  // Calculate total consumed today
  const consumedNetCarbs = todayLog.meals.reduce((acc, m) => acc + m.netCarbs, 0);
  const consumedCalories = todayLog.meals.reduce((acc, m) => acc + m.calories, 0);
  const consumedProtein = todayLog.meals.reduce((acc, m) => acc + m.protein, 0);
  const consumedFat = todayLog.meals.reduce((acc, m) => acc + m.fat, 0);

  const netCarbPercent = Math.min(100, Math.round((consumedNetCarbs / user.targetNetCarbs) * 100));
  const caloriePercent = Math.min(100, Math.round((consumedCalories / user.targetCalories) * 100));
  const proteinPercent = Math.min(100, Math.round((consumedProtein / user.targetProtein) * 100));
  const fatPercent = Math.min(100, Math.round((consumedFat / user.targetFat) * 100));

  const remainingNetCarbs = Math.max(0, Number((user.targetNetCarbs - consumedNetCarbs).toFixed(1)));
  const remainingCalories = Math.max(0, user.targetCalories - consumedCalories);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
      {/* Top Main Stat Banner */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div>
          <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 block">
            Carboidratos Líquidos Restantes
          </span>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-3xl font-black text-emerald-400 tracking-tight">{remainingNetCarbs}g</span>
            <span className="text-xs text-slate-400">/ limite {user.targetNetCarbs}g</span>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 block">
            Calorias Restantes
          </span>
          <div className="flex items-baseline justify-end gap-1 mt-0.5">
            <span className="text-2xl font-bold text-slate-100 tracking-tight">{remainingCalories}</span>
            <span className="text-xs text-slate-400">kcal</span>
          </div>
        </div>
      </div>

      {/* Fitness Style SVG Rings & Macro Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* Ring Graphic */}
        <div className="relative flex items-center justify-center py-2">
          <svg className="w-44 h-44 transform -rotate-90">
            {/* Outer Ring: Net Carbs (Emerald) */}
            <circle cx="88" cy="88" r="70" stroke="#064e3b" strokeWidth="9" fill="transparent" />
            <motion.circle
              cx="88"
              cy="88"
              r="70"
              stroke="#10b981"
              strokeWidth="9"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 70}
              initial={{ strokeDashoffset: 2 * Math.PI * 70 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 70 - (netCarbPercent / 100) * (2 * Math.PI * 70) }}
              transition={{ duration: 1, ease: 'easeOut' }}
              strokeLinecap="round"
            />

            {/* Middle Ring: Calories (Amber) */}
            <circle cx="88" cy="88" r="54" stroke="#78350f" strokeWidth="9" fill="transparent" />
            <motion.circle
              cx="88"
              cy="88"
              r="54"
              stroke="#f59e0b"
              strokeWidth="9"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 54}
              initial={{ strokeDashoffset: 2 * Math.PI * 54 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 54 - (caloriePercent / 100) * (2 * Math.PI * 54) }}
              transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
              strokeLinecap="round"
            />

            {/* Inner Ring: Protein (Cyan) */}
            <circle cx="88" cy="88" r="38" stroke="#164e63" strokeWidth="9" fill="transparent" />
            <motion.circle
              cx="88"
              cy="88"
              r="38"
              stroke="#06b6d4"
              strokeWidth="9"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 38}
              initial={{ strokeDashoffset: 2 * Math.PI * 38 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 38 - (proteinPercent / 100) * (2 * Math.PI * 38) }}
              transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
              strokeLinecap="round"
            />
          </svg>

          {/* Center Info Overlay */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">CETOSE</span>
            <span className="text-xl font-black text-slate-100">{netCarbPercent}%</span>
            <span className="text-[9px] text-emerald-400 font-semibold">Meta Carbo</span>
          </div>
        </div>

        {/* Macro Progress Bars */}
        <div className="space-y-2.5">
          {/* Net Carbs */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-emerald-400 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                Carb. Líquidos
              </span>
              <span className="text-slate-300">
                {consumedNetCarbs.toFixed(1)}g / {user.targetNetCarbs}g
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${netCarbPercent}%` }} />
            </div>
          </div>

          {/* Calories */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-amber-400 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                Calorias Totais
              </span>
              <span className="text-slate-300">
                {consumedCalories} / {user.targetCalories} kcal
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div className="bg-amber-500 h-full rounded-full transition-all duration-500" style={{ width: `${caloriePercent}%` }} />
            </div>
          </div>

          {/* Protein */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-cyan-400 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block" />
                Proteínas
              </span>
              <span className="text-slate-300">
                {consumedProtein}g / {user.targetProtein}g
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div className="bg-cyan-500 h-full rounded-full transition-all duration-500" style={{ width: `${proteinPercent}%` }} />
            </div>
          </div>

          {/* Fat */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-rose-400 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                Gorduras Boas
              </span>
              <span className="text-slate-300">
                {consumedFat}g / {user.targetFat}g
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div className="bg-rose-500 h-full rounded-full transition-all duration-500" style={{ width: `${fatPercent}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Water Intake Tracker Bar */}
      <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Droplet className="w-5 h-5 fill-cyan-400/20" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-200 block">Hidratação Diária</span>
            <span className="text-[11px] text-cyan-400 font-medium">
              {(todayLog.waterIntakeMl / 1000).toFixed(2)}L / 2.50L Meta
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onUpdateWater(Math.max(0, todayLog.waterIntakeMl - 250))}
            className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center hover:bg-slate-700 text-xs font-bold"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onUpdateWater(todayLog.waterIntakeMl + 250)}
            className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs flex items-center gap-1 transition shadow-md shadow-cyan-500/20"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+250ml</span>
          </button>
        </div>
      </div>
    </div>
  );
};
