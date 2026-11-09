import React, { useState, useEffect } from 'react';
import { WEEKLY_HOME_WORKOUTS } from '../data/workoutsData';
import { WeeklyHomeWorkout, WorkoutDayOfWeek, ExerciseItem, UserProfile } from '../types';
import { 
  Dumbbell, 
  Flame, 
  Clock, 
  CheckCircle2, 
  Circle, 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft,
  ChevronRight,
  ShieldCheck, 
  Trophy,
  Calendar,
  Zap,
  Info,
  Video,
  PlayCircle,
  X,
  ExternalLink,
  Volume2,
  VolumeX,
  Tv,
  Wind,
  AlertTriangle,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HomeWorkoutsViewProps {
  user?: UserProfile;
  onLogWorkoutCalories?: (calories: number, title: string) => void;
}

const DAY_ORDER: { key: WorkoutDayOfWeek; label: string; short: string; dayIndex?: number; icon?: string }[] = [
  { key: 'segunda', label: 'Segunda-feira', short: 'Seg', dayIndex: 1 },
  { key: 'terca', label: 'Terça-feira', short: 'Ter', dayIndex: 2 },
  { key: 'quarta', label: 'Quarta-feira', short: 'Qua', dayIndex: 3 },
  { key: 'quinta', label: 'Quinta-feira', short: 'Qui', dayIndex: 4 },
  { key: 'sexta', label: 'Sexta-feira', short: 'Sex', dayIndex: 5 },
  { key: 'sabado', label: 'Sábado', short: 'Sáb', dayIndex: 6 },
  { key: 'domingo', label: 'Domingo', short: 'Dom', dayIndex: 0 },
  { key: 'boxe', label: 'Boxe', short: 'Boxe', icon: '🥊' },
  { key: 'taichi', label: 'Tai Chi', short: 'Tai Chi', icon: '☯️' },
];

export const HomeWorkoutsView: React.FC<HomeWorkoutsViewProps> = ({ user, onLogWorkoutCalories }) => {
  // Determine current day of week
  const todayDayIndex = new Date().getDay();
  const defaultDay = DAY_ORDER.find((d) => d.dayIndex === todayDayIndex)?.key || 'segunda';

  const userKey = user?.uid ? `zc_completed_workouts_${user.uid}` : 'zc_completed_workouts_guest';

  const [selectedDay, setSelectedDay] = useState<WorkoutDayOfWeek>(defaultDay);
  const [completedDays, setCompletedDays] = useState<Record<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem(userKey);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const [completedExercises, setCompletedExercises] = useState<Record<string, boolean>>({});
  const [expandedExerciseId, setExpandedExerciseId] = useState<string | null>(null);

  // Search state for workout modalities (e.g. Tai Chi, Boxe, Pernas)
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Spoken audio coach state (Portuguese pt-BR)
  const [isSpeakingVoice, setIsSpeakingVoice] = useState<boolean>(false);

  // Timer state
  const [timerSeconds, setTimerSeconds] = useState<number>(45);
  const [initialTimerDuration, setInitialTimerDuration] = useState<number>(45);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timerFinishedNotice, setTimerFinishedNotice] = useState<boolean>(false);

  // Success celebration modal or toast
  const [showCelebration, setShowCelebration] = useState(false);

  // Auto-switch selected workout when search query targets a specific modality
  useEffect(() => {
    if (!searchQuery.trim()) return;
    const q = searchQuery.toLowerCase().trim();
    if (q.includes('boxe') || q.includes('boxing')) {
      setSelectedDay('boxe');
    } else if (q.includes('tai chi') || q.includes('taichi')) {
      setSelectedDay('taichi');
    } else if (q.includes('perna') || q.includes('gluteo') || q.includes('agachamento')) {
      setSelectedDay('segunda');
    } else if (q.includes('superior') || q.includes('peito') || q.includes('costas')) {
      setSelectedDay('terca');
    } else if (q.includes('core') || q.includes('abd') || q.includes('prancha')) {
      setSelectedDay('quarta');
    } else if (q.includes('hiit') || q.includes('queima') || q.includes('cardio')) {
      setSelectedDay('quinta');
    } else if (q.includes('along') || q.includes('mobi')) {
      setSelectedDay('sabado');
    }
  }, [searchQuery]);

  // Reload user-specific completed workouts when user changes
  useEffect(() => {
    try {
      const stored = localStorage.getItem(userKey);
      setCompletedDays(stored ? JSON.parse(stored) : {});
      setCompletedExercises({});
    } catch (e) {
      console.warn('Error reading completed workouts for user:', e);
    }
  }, [userKey]);

  // Find workout for selected day
  const currentWorkout = WEEKLY_HOME_WORKOUTS.find((w) => w.dayOfWeek === selectedDay) || WEEKLY_HOME_WORKOUTS[0];

  // Save completed days to localStorage per user
  useEffect(() => {
    try {
      localStorage.setItem(userKey, JSON.stringify(completedDays));
    } catch (e) {
      console.warn('Could not save completed workouts to localStorage', e);
    }
  }, [completedDays, userKey]);

  // Timer countdown hook
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      setTimerFinishedNotice(true);
      setTimeout(() => setTimerFinishedNotice(false), 3000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  // Handle Portuguese Voice Speech Synthesis
  const handleToggleVoiceCoach = (text?: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeakingVoice) {
      window.speechSynthesis.cancel();
      setIsSpeakingVoice(false);
      return;
    }

    const textToSpeak = text || '';
    if (!textToSpeak) return;

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'pt-BR';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const ptVoice = voices.find((v) => v.lang === 'pt-BR' || v.lang.startsWith('pt'));
      if (ptVoice) {
        utterance.voice = ptVoice;
      }

      utterance.onend = () => setIsSpeakingVoice(false);
      utterance.onerror = () => setIsSpeakingVoice(false);

      setIsSpeakingVoice(true);
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('SpeechSynthesis error:', err);
      setIsSpeakingVoice(false);
    }
  };

  const handleStopVoice = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeakingVoice(false);
  };

  const toggleExerciseCheck = (exerciseId: string) => {
    setCompletedExercises((prev) => ({
      ...prev,
      [exerciseId]: !prev[exerciseId],
    }));
  };

  const handleStartTimerPreset = (secs: number) => {
    setInitialTimerDuration(secs);
    setTimerSeconds(secs);
    setIsTimerRunning(true);
    setTimerFinishedNotice(false);
  };

  const handleToggleTimer = () => {
    if (timerSeconds === 0) {
      setTimerSeconds(initialTimerDuration);
    }
    setIsTimerRunning((prev) => !prev);
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(initialTimerDuration);
    setTimerFinishedNotice(false);
  };

  const handleCompleteCurrentWorkout = () => {
    const isNowDone = !completedDays[selectedDay];
    setCompletedDays((prev) => ({
      ...prev,
      [selectedDay]: isNowDone,
    }));

    if (isNowDone) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 4500);

      // Auto log calories to daily log if callback exists
      if (onLogWorkoutCalories) {
        onLogWorkoutCalories(currentWorkout.caloriesBurnEstimate, currentWorkout.title);
      }
    }
  };

  // Format seconds to MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Count total completed days this week
  const completedCount = Object.values(completedDays).filter(Boolean).length;

  return (
    <div className="space-y-5 pb-24 text-slate-100">
      {/* Top Banner & Motivation */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800 rounded-3xl p-5 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-start justify-between gap-3 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <Dumbbell className="w-3 h-3 text-emerald-400" />
                Treinos Semanais em Casa
              </span>
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                🇧🇷 Vídeos em Português (pt-BR)
              </span>
              <span className="text-[10px] font-bold text-slate-400">100% Sem Aparelhos</span>
            </div>
            <h2 className="text-xl font-black text-slate-100 tracking-tight">
              Rotina Semanal com Vídeos em Português
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
              Acesse os links diretos para os treinos no YouTube em <strong className="text-emerald-400 font-extrabold">Português do Brasil (pt-BR)</strong>, com passo a passo dos exercícios, cronômetro integrado e orientações para queimar gordura com segurança.
            </p>
          </div>

          <div className="hidden sm:flex flex-col items-end shrink-0">
            <span className="text-xs font-bold text-slate-400">Progresso Semanal</span>
            <div className="flex items-center gap-1.5 mt-1">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-black text-emerald-400">
                {completedCount}/7 dias
              </span>
            </div>
          </div>
        </div>

        {/* Search Bar for Workouts & Modalities (Boxe, Tai Chi, Pernas, etc.) */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar treino ou exercício (ex: Boxe, Tai Chi, Pernas, HIIT)..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-9 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Filter Modality Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-none">
            {[
              { label: 'Todos', query: '' },
              { label: '🥊 Boxe', query: 'Boxe', key: 'boxe' },
              { label: '☯️ Tai Chi', query: 'Tai Chi', key: 'taichi' },
              { label: '🦵 Pernas', query: 'Pernas', key: 'segunda' },
              { label: '💪 Superiores', query: 'Superiores', key: 'terca' },
              { label: '🔥 Core', query: 'Core', key: 'quarta' },
              { label: '⚡ HIIT', query: 'HIIT', key: 'quinta' },
              { label: '🧘 Alongamento', query: 'Alongamento', key: 'sabado' },
            ].map((chip) => {
              const isActive = (chip.query === '' && !searchQuery) || (chip.query && searchQuery.toLowerCase().includes(chip.query.toLowerCase()));
              return (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => {
                    if (chip.query === '') {
                      setSearchQuery('');
                    } else {
                      setSearchQuery(chip.query);
                      if (chip.key) setSelectedDay(chip.key as WorkoutDayOfWeek);
                    }
                  }}
                  className={`px-2.5 py-1 rounded-xl font-bold whitespace-nowrap transition border ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Days & Modalities Selector Bar */}
        <div className="grid grid-cols-5 sm:grid-cols-9 gap-1.5 mt-3 pt-3 border-t border-slate-800/80">
          {DAY_ORDER.map((item) => {
            const isSelected = selectedDay === item.key;
            const isCompleted = !!completedDays[item.key];
            const isToday = item.dayIndex !== undefined && item.dayIndex === todayDayIndex;

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => {
                  setSelectedDay(item.key);
                  if (item.key === 'boxe') setSearchQuery('Boxe');
                  else if (item.key === 'taichi') setSearchQuery('Tai Chi');
                }}
                className={`py-2 px-1 rounded-2xl flex flex-col items-center justify-center transition relative ${
                  isSelected
                    ? 'bg-emerald-500 text-slate-950 font-black shadow-lg shadow-emerald-500/20'
                    : isCompleted
                    ? 'bg-slate-800/90 text-emerald-400 border border-emerald-500/40 hover:bg-slate-800'
                    : 'bg-slate-950/60 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                {isToday && (
                  <span className={`absolute -top-1 w-2 h-2 rounded-full ${isSelected ? 'bg-slate-950' : 'bg-amber-400 animate-ping'}`} />
                )}
                <span className="text-[10px] uppercase font-bold tracking-tight">{item.short}</span>
                <div className="mt-1">
                  {isCompleted ? (
                    <CheckCircle2 className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950' : 'text-emerald-400'}`} />
                  ) : item.icon ? (
                    <span className="text-xs">{item.icon}</span>
                  ) : (
                    <span className={`text-[10px] font-black ${isSelected ? 'text-slate-950' : 'text-slate-500'}`}>
                      •
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Treino Completo no YouTube Banner */}
      {(currentWorkout.fullSessionYoutubeUrl || currentWorkout.fullSessionVideoUrl) && (
        <div className="bg-gradient-to-r from-red-950/50 via-slate-900 to-slate-900 border border-red-500/30 rounded-3xl p-4 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-red-600/20 text-red-400 border border-red-500/30 flex items-center gap-1">
                <Tv className="w-3 h-3 text-red-400" />
                Treino Completo no YouTube
              </span>
              <span className="text-[10px] font-bold text-amber-300 flex items-center gap-1">
                🇧🇷 Em Português
              </span>
            </div>
            <h4 className="text-sm font-black text-slate-100">
              {currentWorkout.fullSessionTitle || `Treino Completo de ${currentWorkout.dayLabel}`}
            </h4>
            <p className="text-xs text-slate-400">
              Acompanhe o treino de {currentWorkout.durationMin} minutos diretamente no YouTube.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            <a
              href={currentWorkout.fullSessionYoutubeUrl || `https://www.youtube.com/results?search_query=${encodeURIComponent(currentWorkout.title + ' em casa')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 text-xs font-black px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white transition shadow-lg shadow-red-600/30 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-white text-white" />
              <span>Abrir Treino no YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}

      {/* Active Workout Card Overview */}
      <div className="bg-slate-900/95 border border-slate-800 rounded-3xl p-5 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {currentWorkout.dayLabel}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                Nível: {currentWorkout.level}
              </span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-red-500/15 text-red-300 border border-red-500/30 flex items-center gap-1">
                ▶ Treino no YouTube
              </span>
            </div>
            <h3 className="text-lg font-black text-slate-100">{currentWorkout.title}</h3>
            <p className="text-xs text-emerald-400 font-semibold mt-0.5">Foco: {currentWorkout.focus}</p>
          </div>

          <div className="flex items-center gap-3 text-xs shrink-0">
            <div className="flex items-center gap-1.5 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-extrabold text-slate-200">{currentWorkout.durationMin} min</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
              <Flame className="w-3.5 h-3.5 text-rose-400 fill-rose-400/30" />
              <span className="font-extrabold text-emerald-400">~{currentWorkout.caloriesBurnEstimate} kcal</span>
            </div>
          </div>
        </div>

        {/* Integrated Exercise Stopwatch / Timer */}
        <div className="bg-slate-950/90 border border-slate-800/90 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-mono text-xl font-black border transition ${
              isTimerRunning
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 animate-pulse'
                : timerSeconds === 0
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/50'
                : 'bg-slate-900 text-slate-200 border-slate-800'
            }`}>
              {formatTime(timerSeconds)}
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase text-slate-400 block tracking-wider">
                Cronômetro de Séries & Descanso
              </span>
              <span className="text-xs text-slate-300 font-semibold">
                {isTimerRunning ? 'Contando tempo...' : timerSeconds === 0 ? 'Tempo concluído! Descanse ou mude de série.' : 'Pronto para treinar'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleStartTimerPreset(20)}
              className="text-[11px] font-bold px-2 py-1 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-slate-300"
            >
              20s
            </button>
            <button
              onClick={() => handleStartTimerPreset(30)}
              className="text-[11px] font-bold px-2 py-1 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-slate-300"
            >
              30s
            </button>
            <button
              onClick={() => handleStartTimerPreset(45)}
              className="text-[11px] font-bold px-2 py-1 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-slate-300"
            >
              45s
            </button>
            <button
              onClick={() => handleStartTimerPreset(60)}
              className="text-[11px] font-bold px-2 py-1 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-slate-300"
            >
              60s
            </button>

            <button
              onClick={handleToggleTimer}
              className={`p-2 rounded-xl transition ${
                isTimerRunning
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold'
              }`}
              title={isTimerRunning ? 'Pausar' : 'Iniciar'}
            >
              {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-slate-950" />}
            </button>

            <button
              onClick={handleResetTimer}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              title="Reiniciar"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {timerFinishedNotice && (
          <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-xl p-2.5 text-center text-xs font-extrabold text-emerald-300 animate-bounce">
            ⏰ Tempo finalizado! Excelente execução!
          </div>
        )}
      </div>

      {/* Warmup (Aquecimento) */}
      <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4">
        <h4 className="text-xs font-extrabold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider mb-2">
          <Zap className="w-4 h-4" />
          Aquecimento Articular (2 a 3 minutos)
        </h4>
        <ul className="space-y-1.5 text-xs text-slate-300">
          {currentWorkout.warmup.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Exercises List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h4 className="text-sm font-extrabold text-slate-100 flex items-center gap-2">
            <span>Exercícios da Rotina ({currentWorkout.exercises.length})</span>
          </h4>
          <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
            <Video className="w-3.5 h-3.5" /> Vídeos e Aulas 100% em Português
          </span>
        </div>

        {currentWorkout.exercises.map((exercise, index) => {
          const isDone = !!completedExercises[exercise.id];
          const isExpanded = expandedExerciseId === exercise.id;

          return (
            <div
              key={exercise.id}
              className={`bg-slate-900/90 border rounded-2xl transition overflow-hidden ${
                isDone
                  ? 'border-emerald-500/40 bg-emerald-950/10'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Exercise Header */}
              <div className="p-4 flex items-center justify-between gap-3">
                <button
                  onClick={() => toggleExerciseCheck(exercise.id)}
                  className="shrink-0 p-1 text-slate-400 hover:text-emerald-400 transition"
                  title={isDone ? 'Desmarcar' : 'Marcar exercício como feito'}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 fill-emerald-500/20" />
                  ) : (
                    <Circle className="w-6 h-6 text-slate-600 hover:text-slate-400" />
                  )}
                </button>

                <div
                  className="flex-1 cursor-pointer"
                  onClick={() => setExpandedExerciseId(isExpanded ? null : exercise.id)}
                >
                  <div className="flex flex-wrap items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                      #{index + 1}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                      {exercise.targetMuscles}
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                      🇧🇷 Português
                    </span>
                  </div>
                  <h5 className={`font-black text-sm ${isDone ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                    {exercise.name}
                  </h5>
                  <div className="flex flex-wrap items-center gap-2 mt-1 text-xs">
                    <span className="text-amber-300 font-extrabold">{exercise.setsAndReps}</span>
                    {exercise.instructorName && (
                      <span className="text-[11px] text-slate-400">
                        • {exercise.instructorName}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Direct YouTube Link Button */}
                  {(exercise.youtubeSearchUrl || exercise.videoUrl) && (
                    <a
                      href={exercise.youtubeSearchUrl || `https://www.youtube.com/results?search_query=${encodeURIComponent(exercise.name + ' como fazer')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1 text-[11px] font-black px-2.5 py-1.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 text-red-300 transition shadow-sm cursor-pointer"
                      title="Abrir no YouTube"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-red-400" />
                      <span className="hidden sm:inline">YouTube</span>
                    </a>
                  )}

                  <button
                    onClick={() => setExpandedExerciseId(isExpanded ? null : exercise.id)}
                    className="p-2 text-slate-400 hover:text-slate-100 rounded-xl bg-slate-800/60 transition"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Collapsible Details */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-slate-800 bg-slate-950/60 p-4 space-y-3 text-xs"
                  >
                    {/* Direct YouTube Link Card (no in-app iframe) */}
                    {(exercise.youtubeSearchUrl || exercise.videoUrl) && (
                      <div className="rounded-2xl p-3.5 bg-gradient-to-r from-red-950/30 via-slate-900 to-slate-900 border border-red-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-md shadow-red-600/25">
                            ▶
                          </div>
                          <div>
                            <span className="text-[10px] font-black uppercase text-red-400 block tracking-wider">
                              Treino no YouTube • Português
                            </span>
                            <span className="text-xs font-bold text-slate-100 block">
                              {exercise.videoTitlePt || `Vídeo no YouTube: ${exercise.name}`}
                            </span>
                          </div>
                        </div>

                        <a
                          href={exercise.youtubeSearchUrl || `https://www.youtube.com/results?search_query=${encodeURIComponent(exercise.name + ' como fazer')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 text-xs font-black text-white bg-red-600 hover:bg-red-500 px-3.5 py-2 rounded-xl transition shadow-md shadow-red-600/30 shrink-0 w-full sm:w-auto cursor-pointer"
                        >
                          <span>Assistir no YouTube</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}

                    <div>
                      <h6 className="font-extrabold text-slate-200 mb-1.5 flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5 text-emerald-400" />
                        Como Executar Corretamente em Casa:
                      </h6>
                      <ol className="space-y-1.5 text-slate-300 list-decimal list-inside pl-1 leading-relaxed">
                        {exercise.instructions.map((step, sIdx) => (
                          <li key={sIdx}>{step}</li>
                        ))}
                      </ol>
                    </div>

                    {exercise.breathingTip && (
                      <div className="bg-sky-500/10 border border-sky-500/20 rounded-xl p-2.5 text-sky-300 flex items-start gap-2">
                        <Wind className="w-4 h-4 shrink-0 mt-0.5 text-sky-400" />
                        <div>
                          <strong className="block font-black text-[11px] uppercase tracking-wider mb-0.5">
                            🫁 Respiração Correta:
                          </strong>
                          <p className="text-[11px] text-slate-300 leading-relaxed">{exercise.breathingTip}</p>
                        </div>
                      </div>
                    )}

                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-2.5 text-emerald-300">
                      <strong className="block font-black text-[11px] uppercase tracking-wider mb-0.5">
                        💡 Dica de Postura & Eficiência:
                      </strong>
                      <p className="text-[11px] text-slate-300 leading-relaxed">{exercise.tips}</p>
                    </div>

                    {exercise.commonMistakes && exercise.commonMistakes.length > 0 && (
                      <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-2.5 text-rose-300">
                        <strong className="block font-black text-[11px] uppercase tracking-wider mb-1 flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                          Erros Comuns para Evitar:
                        </strong>
                        <ul className="space-y-1 text-[11px] text-slate-300 list-disc list-inside">
                          {exercise.commonMistakes.map((m, mIdx) => (
                            <li key={mIdx}>{m}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            if (exercise.durationSec) {
                              handleStartTimerPreset(exercise.durationSec);
                            } else {
                              handleStartTimerPreset(45);
                            }
                          }}
                          className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30"
                        >
                          <Play className="w-3 h-3 fill-emerald-400" />
                          <span>Cronometrar Série ({exercise.durationSec || 45}s)</span>
                        </button>

                        <button
                          onClick={() => handleToggleVoiceCoach(exercise.voiceGuidanceText || exercise.instructions.join('. '))}
                          className="flex items-center gap-1 text-[11px] font-bold text-amber-300 hover:text-amber-200 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/30"
                          title="Ouvir instrução com áudio guia em português"
                        >
                          <Volume2 className="w-3 h-3 text-amber-400" />
                          <span>Ouvir Voz pt-BR</span>
                        </button>
                      </div>

                      <button
                        onClick={() => toggleExerciseCheck(exercise.id)}
                        className={`text-[11px] font-extrabold px-3 py-1.5 rounded-xl transition ${
                          isDone
                            ? 'bg-slate-800 text-slate-300'
                            : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                        }`}
                      >
                        {isDone ? 'Concluído' : 'Marcar Feito ✓'}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Cooldown (Desaquecimento e Alongamento) */}
      <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4">
        <h4 className="text-xs font-extrabold text-blue-400 flex items-center gap-1.5 uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4" />
          Desaquecimento & Alongamento Final
        </h4>
        <ul className="space-y-1.5 text-xs text-slate-300">
          {currentWorkout.cooldown.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Final Action Button */}
      <div className="pt-2">
        <button
          onClick={handleCompleteCurrentWorkout}
          className={`w-full py-4 rounded-3xl font-black text-sm flex items-center justify-center gap-2 shadow-2xl transition border ${
            completedDays[selectedDay]
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
              : 'bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-950 hover:from-emerald-400 hover:to-emerald-300 border-emerald-300 shadow-emerald-500/25'
          }`}
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>
            {completedDays[selectedDay]
              ? `Treino de ${currentWorkout.dayLabel} Já Concluído (Toque para desmarcar)`
              : `Finalizar Treino de ${currentWorkout.dayLabel} (+${currentWorkout.caloriesBurnEstimate} kcal)`}
          </span>
        </button>
      </div>

      {/* Celebration Modal Toast */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-x-4 bottom-24 z-50 max-w-md mx-auto bg-slate-900 border-2 border-emerald-500 rounded-3xl p-5 shadow-2xl text-center space-y-2 text-slate-100"
          >
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto">
              <Trophy className="w-6 h-6 text-amber-400" />
            </div>
            <h4 className="text-base font-black text-slate-100">Parabéns! Treino Concluído! 🔥</h4>
            <p className="text-xs text-slate-300">
              Você completou a rotina de <strong>{currentWorkout.dayLabel}</strong>! Queima estimada de{' '}
              <strong className="text-emerald-400">~{currentWorkout.caloriesBurnEstimate} kcal</strong> sem sair de casa!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
