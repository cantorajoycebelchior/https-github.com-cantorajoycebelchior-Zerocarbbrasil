import React, { useState } from 'react';
import { Challenge, Badge } from '../types';
import { INITIAL_CHALLENGES, INITIAL_BADGES } from '../data/mockData';
import { Flame, Trophy, CheckCircle2, ShieldCheck, Award, Zap, Camera, Droplet, Bot, Dumbbell } from 'lucide-react';
import { motion } from 'motion/react';

export const ChallengesView: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>(INITIAL_CHALLENGES);
  const [badges, setBadges] = useState<Badge[]>(INITIAL_BADGES);
  const [checklist, setChecklist] = useState({
    noSugar: true,
    underNetCarbs: true,
    waterGoal: true,
    loggedMeals: false,
  });

  const toggleChallenge = (id: string) => {
    setChallenges((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive, currentDay: c.isActive ? 0 : 1 } : c))
    );
  };

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame':
        return <Flame className="w-5 h-5 text-amber-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'Droplet':
        return <Droplet className="w-5 h-5 text-cyan-400" />;
      case 'Camera':
        return <Camera className="w-5 h-5 text-indigo-400" />;
      case 'Dumbbell':
        return <Dumbbell className="w-5 h-5 text-emerald-400" />;
      default:
        return <Bot className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <div className="space-y-4 text-slate-100">
      {/* Gamification Streak & Trophy Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-extrabold text-base text-slate-100">Desafios & Conquistas</h2>
              <p className="text-xs text-slate-400">Mantenha a consistência e desbloqueie medalhas</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">OFENSIVA</span>
            <div className="flex items-center gap-1 font-black text-emerald-400 text-xl">
              <Flame className="w-5 h-5 text-emerald-400 fill-emerald-400/30" />
              <span>5 DIAS</span>
            </div>
          </div>
        </div>

        {/* Daily Checklist */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5 space-y-2">
          <span className="text-xs font-bold text-slate-300 block uppercase tracking-wider">
            Checklist de Hábitos de Hoje:
          </span>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => setChecklist((p) => ({ ...p, noSugar: !p.noSugar }))}
              className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition ${
                checklist.noSugar ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <span>🚫 Zero Açúcar Hoje</span>
              <CheckCircle2 className={`w-4 h-4 ${checklist.noSugar ? 'text-emerald-400' : 'text-slate-600'}`} />
            </button>

            <button
              onClick={() => setChecklist((p) => ({ ...p, underNetCarbs: !p.underNetCarbs }))}
              className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition ${
                checklist.underNetCarbs ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <span>🥑 Limite Carbo Respeitado</span>
              <CheckCircle2 className={`w-4 h-4 ${checklist.underNetCarbs ? 'text-emerald-400' : 'text-slate-600'}`} />
            </button>

            <button
              onClick={() => setChecklist((p) => ({ ...p, waterGoal: !p.waterGoal }))}
              className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition ${
                checklist.waterGoal ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <span>💧 2.5L Água Ingeridos</span>
              <CheckCircle2 className={`w-4 h-4 ${checklist.waterGoal ? 'text-emerald-400' : 'text-slate-600'}`} />
            </button>

            <button
              onClick={() => setChecklist((p) => ({ ...p, loggedMeals: !p.loggedMeals }))}
              className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition ${
                checklist.loggedMeals ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <span>📝 Refeições Registradas</span>
              <CheckCircle2 className={`w-4 h-4 ${checklist.loggedMeals ? 'text-emerald-400' : 'text-slate-600'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Active Challenges List */}
      <div className="space-y-3">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Desafios Ativos:</span>

        {challenges.map((c) => (
          <div key={c.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 inline-block mb-1">
                  {c.durationDays} Dias
                </span>
                <h3 className="font-extrabold text-sm text-slate-100">{c.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{c.description}</p>
              </div>

              <button
                onClick={() => toggleChallenge(c.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
                  c.isActive
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600'
                }`}
              >
                {c.isActive ? 'Em Progresso' : 'Ativar Desafio'}
              </button>
            </div>

            {/* Progress Bar */}
            {c.isActive && (
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-semibold text-slate-400">
                  <span>Dia {c.currentDay} de {c.durationDays}</span>
                  <span className="text-emerald-400">{Math.round((c.currentDay / c.durationDays) * 100)}%</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${(c.currentDay / c.durationDays) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Badges & Medals Grid */}
      <div className="space-y-3">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Galeria de Medalhas:</span>

        <div className="grid grid-cols-2 gap-2.5">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`p-3 rounded-2xl border transition-all ${
                b.isUnlocked
                  ? 'bg-slate-900 border-emerald-500/40 text-slate-100'
                  : 'bg-slate-950/60 border-slate-800/80 text-slate-500 opacity-60'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className={`p-2 rounded-xl ${b.isUnlocked ? 'bg-emerald-500/20' : 'bg-slate-900'}`}>
                  {getBadgeIcon(b.iconName)}
                </div>
                <div>
                  <h4 className="font-bold text-xs leading-snug">{b.name}</h4>
                  {b.isUnlocked && (
                    <span className="text-[9px] text-emerald-400 font-bold block">Desbloqueado</span>
                  )}
                </div>
              </div>
              <p className="text-[10px] text-slate-400 leading-tight">{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
