import React, { useState } from 'react';
import { Calendar, AlertTriangle, CheckCircle2, RotateCcw, Clock, ShieldAlert, Sparkles, Info } from 'lucide-react';
import { UserProfile } from '../types';
import { get30DayCycleInfo, startNew30DayCycle } from '../lib/cycleUtils';

interface CycleTrackerCardProps {
  user: UserProfile;
  onUpdateUser: (updatedUser: UserProfile) => void;
}

export const CycleTrackerCard: React.FC<CycleTrackerCardProps> = ({ user, onUpdateUser }) => {
  const [showConfirmRestart, setShowConfirmRestart] = useState(false);
  const cycleInfo = get30DayCycleInfo(user);

  const handleRestartCycle = () => {
    const updated = startNew30DayCycle(user);
    onUpdateUser(updated);
    setShowConfirmRestart(false);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 border border-emerald-500/30 rounded-3xl p-4 sm:p-5 shadow-xl relative overflow-hidden space-y-4">
      {/* Top Header Badge */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 shadow-md shadow-emerald-500/10">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
                Protocolo Clínico 30 Dias
              </span>
              <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border ${
                cycleInfo.status === 'ativo'
                  ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                  : 'bg-amber-500/15 border-amber-500/30 text-amber-300'
              }`}>
                {cycleInfo.status === 'ativo' ? 'Ciclo em Andamento' : 'Pausa Obrigatória'}
              </span>
            </div>
            <h3 className="text-base font-black text-slate-100 mt-0.5">
              {cycleInfo.status === 'ativo'
                ? `Dia ${cycleInfo.currentDay} de 30`
                : `Ciclo Finalizado (Dia ${cycleInfo.pauseDaysElapsed} da Pausa)`}
            </h3>
          </div>
        </div>

        <button
          onClick={() => setShowConfirmRestart(true)}
          title="Reiniciar Ciclo de 30 Dias"
          className="p-2 text-slate-400 hover:text-emerald-400 bg-slate-800/80 hover:bg-slate-800 rounded-xl transition cursor-pointer shrink-0 border border-slate-700/60"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-400 font-semibold text-[11px]">
            {cycleInfo.status === 'ativo'
              ? `${cycleInfo.daysRemainingInCycle} dias restantes neste ciclo`
              : `${cycleInfo.pauseDaysRemaining > 0 ? `${cycleInfo.pauseDaysRemaining} dias para liberar novo ciclo` : 'Pausa concluída! Pronto para novo ciclo'}`}
          </span>
          <span className="font-extrabold text-emerald-400 font-mono text-[11px]">
            {cycleInfo.percentProgress}%
          </span>
        </div>

        <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              cycleInfo.status === 'ativo'
                ? 'bg-gradient-to-r from-emerald-500 to-emerald-400'
                : 'bg-gradient-to-r from-amber-500 to-amber-400'
            }`}
            style={{ width: `${cycleInfo.percentProgress}%` }}
          />
        </div>
      </div>

      {/* Mandatory Medical Rule Callout */}
      <div className={`p-3 rounded-2xl border text-xs leading-relaxed space-y-1 ${
        cycleInfo.status === 'ativo'
          ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
          : 'bg-amber-950/40 border-amber-500/40 text-amber-200'
      }`}>
        <div className="flex items-center gap-1.5 font-bold text-[11px] uppercase tracking-wider">
          {cycleInfo.status === 'ativo' ? (
            <>
              <ShieldAlert className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Regra Médica de Segurança: Máximo 30 Dias</span>
            </>
          ) : (
            <>
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Pausa Obrigatória de 30+ Dias em Andamento</span>
            </>
          )}
        </div>
        <p className="text-[11px] text-slate-300">
          Esta dieta Zero Carb estrita <strong>só pode ser seguida por no máximo 30 dias consecutivos</strong>. Após os 30 dias, é mandatório fazer uma <strong>pausa de mais de 30 dias</strong> em dieta de manutenção com vegetais antes de repeti-la.
        </p>
      </div>

      {/* Confirmation Modal to Restart Cycle */}
      {showConfirmRestart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="w-12 h-12 bg-amber-500/20 border border-amber-500/40 text-amber-400 rounded-2xl flex items-center justify-center mx-auto">
              <RotateCcw className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h4 className="font-extrabold text-base text-slate-100">Iniciar Novo Ciclo de 30 Dias?</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Lembre-se: O protocolo Zero Carb só deve ser repetido se você já cumpriu o período de <strong>mais de 30 dias de pausa</strong> em manutenção.
              </p>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowConfirmRestart(false)}
                className="w-1/2 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition"
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={handleRestartCycle}
                className="w-1/2 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-black shadow-lg shadow-emerald-500/25 transition cursor-pointer"
              >
                Confirmar e Iniciar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
