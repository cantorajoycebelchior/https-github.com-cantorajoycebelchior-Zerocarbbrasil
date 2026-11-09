import React, { useState, useEffect } from 'react';
import { UserProfile, WeeklyMeasurement } from '../types';
import { Scale, TrendingDown, Plus, Calendar, Ruler, ArrowDown, Sparkles, Trash2, CheckCircle2, History, ChevronRight, Info, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { 
  saveWeeklyMeasurementToFirestore, 
  getWeeklyMeasurementsFromFirestore, 
  deleteWeeklyMeasurementFromFirestore,
  saveUserProfileToFirestore,
  saveAccountToStorage
} from '../lib/firebase';
import { BeforeAfterGallery } from './BeforeAfterGallery';

interface WeightTrackerViewProps {
  user: UserProfile;
  onUpdateWeight: (newWeight: number) => void;
  onUpdateUser?: (updatedUser: UserProfile) => void;
}

export const WeightTrackerView: React.FC<WeightTrackerViewProps> = ({ user, onUpdateWeight, onUpdateUser }) => {
  const [weeklyHistory, setWeeklyHistory] = useState<WeeklyMeasurement[]>([
    {
      id: 'wm1',
      weekLabel: 'Semana 1',
      date: '2026-07-20',
      weightKg: 78.5,
      chestCm: 98,
      waistCm: 88,
      abdomenCm: 94,
      hipsCm: 106,
      thighCm: 60,
      armCm: 32,
      notes: 'Início da jornada Zero Carb. Sensação de desinchado rápida nos primeiros dias.'
    },
    {
      id: 'wm2',
      weekLabel: 'Semana 2',
      date: '2026-07-27',
      weightKg: 76.2,
      chestCm: 96,
      waistCm: 85,
      abdomenCm: 91,
      hipsCm: 104,
      thighCm: 59,
      armCm: 31.5,
      notes: 'Muita energia no treino. Perdi 2.3kg e desinchei visivelmente a cintura.'
    },
    {
      id: 'wm3',
      weekLabel: 'Semana 3',
      date: '2026-08-03',
      weightKg: 74.5,
      chestCm: 95,
      waistCm: 82,
      abdomenCm: 88,
      hipsCm: 102,
      thighCm: 58,
      armCm: 31,
      notes: 'Cetose profunda mantida com carbo zero. Medidas diminuindo semana a semana!'
    }
  ]);

  const [loadingFirebase, setLoadingFirebase] = useState(false);
  const [showLogModal, setShowLogModal] = useState(false);

  // Form State for Weekly Measurement Modal
  const [weekLabel, setWeekLabel] = useState(`Semana ${weeklyHistory.length + 1}`);
  const [dateInput, setDateInput] = useState(new Date().toISOString().split('T')[0]);
  const [weightKgInput, setWeightKgInput] = useState(user.currentWeight.toString());
  const [chestCmInput, setChestCmInput] = useState('95');
  const [waistCmInput, setWaistCmInput] = useState('82');
  const [abdomenCmInput, setAbdomenCmInput] = useState('88');
  const [hipsCmInput, setHipsCmInput] = useState('102');
  const [thighCmInput, setThighCmInput] = useState('58');
  const [armCmInput, setArmCmInput] = useState('31');
  const [weeklyNotes, setWeeklyNotes] = useState('');

  // Load from Firestore if user is authenticated
  useEffect(() => {
    if (user.uid) {
      setLoadingFirebase(true);
      getWeeklyMeasurementsFromFirestore(user.uid).then((records) => {
        if (records && records.length > 0) {
          setWeeklyHistory(records);
        }
        setLoadingFirebase(false);
      }).catch(() => setLoadingFirebase(false));
    }
  }, [user.uid]);

  const handleOpenModal = () => {
    setWeekLabel(`Semana ${weeklyHistory.length + 1}`);
    setDateInput(new Date().toISOString().split('T')[0]);
    setWeightKgInput(user.currentWeight.toString());
    setShowLogModal(true);
  };

  const handleAddWeeklyMeasurement = async (e: React.FormEvent) => {
    e.preventDefault();
    const wVal = Number(weightKgInput);
    if (!wVal || wVal <= 0) return;

    const newEntryData = {
      weekLabel: weekLabel.trim() || `Semana ${weeklyHistory.length + 1}`,
      date: dateInput,
      weightKg: wVal,
      chestCm: Number(chestCmInput) || undefined,
      waistCm: Number(waistCmInput) || undefined,
      abdomenCm: Number(abdomenCmInput) || undefined,
      hipsCm: Number(hipsCmInput) || undefined,
      thighCm: Number(thighCmInput) || undefined,
      armCm: Number(armCmInput) || undefined,
      notes: weeklyNotes.trim()
    };

    if (user.uid) {
      const created = await saveWeeklyMeasurementToFirestore(user.uid, newEntryData);
      if (created) {
        setWeeklyHistory((prev) => [...prev, created]);
      }
    } else {
      const localEntry: WeeklyMeasurement = {
        id: 'wm_' + Date.now(),
        ...newEntryData
      };
      setWeeklyHistory((prev) => [...prev, localEntry]);
    }

    onUpdateWeight(wVal);
    setShowLogModal(false);
    setWeeklyNotes('');
  };

  const handleDeleteMeasurement = async (id: string) => {
    if (confirm('Deseja remover esta medição semanal?')) {
      setWeeklyHistory((prev) => prev.filter((m) => m.id !== id));
      if (user.uid) {
        await deleteWeeklyMeasurementFromFirestore(id);
      }
    }
  };

  // Calculations
  const firstWeek = weeklyHistory[0];
  const latestWeek = weeklyHistory[weeklyHistory.length - 1];

  const totalWeightLostKg = (firstWeek && latestWeek)
    ? (firstWeek.weightKg - latestWeek.weightKg).toFixed(1)
    : '0';

  const waistDifferenceCm = (firstWeek?.waistCm && latestWeek?.waistCm)
    ? (firstWeek.waistCm - latestWeek.waistCm).toFixed(1)
    : '0';

  const abdomenDifferenceCm = (firstWeek?.abdomenCm && latestWeek?.abdomenCm)
    ? (firstWeek.abdomenCm - latestWeek.abdomenCm).toFixed(1)
    : '0';

  const hipsDifferenceCm = (firstWeek?.hipsCm && latestWeek?.hipsCm)
    ? (firstWeek.hipsCm - latestWeek.hipsCm).toFixed(1)
    : '0';

  const remainingToGoal = Math.max(0, Number((user.currentWeight - user.targetWeight).toFixed(1)));

  // Scaling chart bars
  const weights = weeklyHistory.map((w) => w.weightKg);
  const minW = Math.min(...weights, user.targetWeight) - 1;
  const maxW = Math.max(...weights) + 1;

  return (
    <div className="space-y-5 text-slate-100 pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-900/40 rounded-3xl p-5 shadow-xl relative overflow-hidden">
        <div className="flex items-start justify-between relative z-10">
          <div>
            <span className="px-2.5 py-0.5 text-xs font-bold bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30 uppercase tracking-wider">
              Acompanhamento Semana a Semana
            </span>
            <h2 className="text-xl font-black text-slate-100 mt-1">Evolução de Peso e Medidas</h2>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed max-w-sm">
              Registre o peso na balança e as medidas corporais fita a fita semanalmente para ver o desinchaco e a perda de gordura.
            </p>
          </div>

          <button
            onClick={handleOpenModal}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-3.5 py-2.5 rounded-2xl text-xs flex items-center gap-1.5 transition shadow-lg shadow-emerald-500/25 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Registrar Semana</span>
          </button>
        </div>
      </div>

      {/* Main Metric Badges */}
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3">
          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Peso Atual</span>
          <span className="text-lg font-black text-slate-100">{user.currentWeight} kg</span>
        </div>

        <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-3">
          <span className="text-[10px] text-emerald-400 uppercase font-bold block">Peso Eliminado</span>
          <span className="text-lg font-black text-emerald-400">-{totalWeightLostKg} kg</span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3">
          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Cintura Perda</span>
          <span className="text-lg font-black text-amber-400">-{waistDifferenceCm} cm</span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3">
          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Abdômen Perda</span>
          <span className="text-lg font-black text-indigo-400">-{abdomenDifferenceCm} cm</span>
        </div>
      </div>

      {/* Target Progress Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Scale className="w-4 h-4 text-emerald-400" />
          <span>Meta Final: <strong className="text-emerald-400">{user.targetWeight} kg</strong></span>
        </div>
        <span className="text-slate-400">Faltam apenas <strong className="text-amber-400">{remainingToGoal} kg</strong></span>
      </div>

      {/* Before & After Transformation Photo Gallery */}
      <BeforeAfterGallery
        user={user}
        onUpdateUser={(updated) => {
          if (onUpdateUser) {
            onUpdateUser(updated);
          }
        }}
      />

      {/* Weekly Weight Evolution Chart */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Gráfico de Peso Semana a Semana
          </span>
          <span className="text-[11px] text-slate-500">{weeklyHistory.length} medições registradas</span>
        </div>

        <div className="h-40 flex items-end justify-between gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
          {weeklyHistory.map((entry, idx) => {
            const heightPercent = Math.max(15, Math.min(100, ((entry.weightKg - minW) / (maxW - minW)) * 100));
            const isLatest = idx === weeklyHistory.length - 1;

            return (
              <div key={entry.id} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <span className={`text-[10px] font-bold ${isLatest ? 'text-emerald-400' : 'text-slate-400'}`}>
                  {entry.weightKg} kg
                </span>

                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${heightPercent}%` }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`w-full max-w-[36px] rounded-t-xl transition-all ${
                    isLatest ? 'bg-emerald-500 shadow-md shadow-emerald-500/40' : 'bg-slate-800'
                  }`}
                />

                <span className="text-[9px] text-slate-400 font-semibold">{entry.weekLabel}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weekly Measurements Log List */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Ruler className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-base text-slate-100">Histórico de Medidas Semanais</h3>
          </div>
          <span className="text-xs text-slate-400">Comparativo fita métrica</span>
        </div>

        {weeklyHistory.length === 0 ? (
          <div className="text-center py-6 text-slate-500 text-xs">
            Nenhuma medição semanal cadastrada ainda. Clique em "Registrar Semana" acima.
          </div>
        ) : (
          <div className="space-y-3">
            {[...weeklyHistory].reverse().map((item) => (
              <div
                key={item.id}
                className="bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 space-y-3 transition"
              >
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 font-bold text-xs rounded-lg border border-emerald-500/30">
                      {item.weekLabel}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      Data: {new Date(item.date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-base font-black text-slate-100">{item.weightKg} kg</span>
                    <button
                      onClick={() => handleDeleteMeasurement(item.id)}
                      className="text-slate-600 hover:text-red-400 p-1 rounded transition"
                      title="Excluir semana"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Body Measures Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center text-xs">
                  <div className="bg-slate-900/90 p-2 rounded-xl border border-slate-800/80">
                    <span className="text-[10px] text-slate-500 block">Peitoral</span>
                    <span className="font-bold text-slate-200">{item.chestCm ? `${item.chestCm} cm` : '-'}</span>
                  </div>

                  <div className="bg-slate-900/90 p-2 rounded-xl border border-slate-800/80">
                    <span className="text-[10px] text-slate-500 block">Cintura</span>
                    <span className="font-bold text-amber-400">{item.waistCm ? `${item.waistCm} cm` : '-'}</span>
                  </div>

                  <div className="bg-slate-900/90 p-2 rounded-xl border border-slate-800/80">
                    <span className="text-[10px] text-slate-500 block">Abdômen</span>
                    <span className="font-bold text-indigo-400">{item.abdomenCm ? `${item.abdomenCm} cm` : '-'}</span>
                  </div>

                  <div className="bg-slate-900/90 p-2 rounded-xl border border-slate-800/80">
                    <span className="text-[10px] text-slate-500 block">Quadril</span>
                    <span className="font-bold text-slate-200">{item.hipsCm ? `${item.hipsCm} cm` : '-'}</span>
                  </div>

                  <div className="bg-slate-900/90 p-2 rounded-xl border border-slate-800/80">
                    <span className="text-[10px] text-slate-500 block">Coxa</span>
                    <span className="font-bold text-slate-200">{item.thighCm ? `${item.thighCm} cm` : '-'}</span>
                  </div>

                  <div className="bg-slate-900/90 p-2 rounded-xl border border-slate-800/80">
                    <span className="text-[10px] text-slate-500 block">Braço</span>
                    <span className="font-bold text-slate-200">{item.armCm ? `${item.armCm} cm` : '-'}</span>
                  </div>
                </div>

                {item.notes && (
                  <p className="text-xs text-slate-400 bg-slate-900/50 p-2.5 rounded-xl border border-slate-800/60 italic leading-relaxed">
                    "{item.notes}"
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal: Register Weekly Measurements */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 my-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
                  <Ruler className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-100">Registrar Peso e Medidas da Semana</h3>
              </div>
              <button
                onClick={() => setShowLogModal(false)}
                className="text-slate-400 hover:text-slate-200 font-bold text-sm px-2 py-1 bg-slate-800 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddWeeklyMeasurement} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Identificação</label>
                  <input
                    type="text"
                    required
                    value={weekLabel}
                    onChange={(e) => setWeekLabel(e.target.value)}
                    placeholder="Ex: Semana 4"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 text-sm font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Data</label>
                  <input
                    type="date"
                    required
                    value={dateInput}
                    onChange={(e) => setDateInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-400 mb-1">Peso na Balança (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={weightKgInput}
                  onChange={(e) => setWeightKgInput(e.target.value)}
                  placeholder="Ex: 74.5"
                  className="w-full bg-slate-950 border border-emerald-500/40 rounded-xl p-3 text-xl font-extrabold text-emerald-400 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Medidas em cm */}
              <div>
                <p className="text-xs font-bold text-slate-300 mb-2">Medidas de Fita Métrica (cm)</p>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-0.5">Peitoral (cm)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={chestCmInput}
                      onChange={(e) => setChestCmInput(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-center text-slate-100 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 mb-0.5">Cintura (cm)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={waistCmInput}
                      onChange={(e) => setWaistCmInput(e.target.value)}
                      className="w-full bg-slate-950 border border-amber-500/40 rounded-lg p-2 text-center text-amber-400 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 mb-0.5">Abdômen (cm)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={abdomenCmInput}
                      onChange={(e) => setAbdomenCmInput(e.target.value)}
                      className="w-full bg-slate-950 border border-indigo-500/40 rounded-lg p-2 text-center text-indigo-400 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 mb-0.5">Quadril (cm)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={hipsCmInput}
                      onChange={(e) => setHipsCmInput(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-center text-slate-100 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 mb-0.5">Coxa (cm)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={thighCmInput}
                      onChange={(e) => setThighCmInput(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-center text-slate-100 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 mb-0.5">Braço (cm)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={armCmInput}
                      onChange={(e) => setArmCmInput(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-center text-slate-100 font-bold"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Notas / Observações da Semana</label>
                <textarea
                  value={weeklyNotes}
                  onChange={(e) => setWeeklyNotes(e.target.value)}
                  placeholder="Ex: Disposição excelente, roupas mais folgadas na cintura..."
                  rows={2}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="w-1/3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-3 rounded-xl text-xs"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-2/3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3 rounded-xl text-xs shadow-lg shadow-emerald-500/20"
                >
                  Salvar medição da Semana
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
