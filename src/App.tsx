import React, { useState, useEffect } from 'react';
import { UserProfile, DailyLog, MealEntry, MealType } from './types';
import { OnboardingModal } from './components/OnboardingModal';
import { Header } from './components/Header';
import { MacroRings } from './components/MacroRings';
import { AIChatModal } from './components/AIChatModal';
import { ScannerModal } from './components/ScannerModal';
import { FoodDatabaseView } from './components/FoodDatabaseView';
import { MealPlansView } from './components/MealPlansView';
import { RecipesView } from './components/RecipesView';
import { WeightTrackerView } from './components/WeightTrackerView';
import { ChallengesView } from './components/ChallengesView';
import { PremiumTrialModal } from './components/PremiumTrialModal';
import { ArchitectureDocModal } from './components/ArchitectureDocModal';
import { MealDiaryView } from './components/MealDiaryView';
import { HighCarbFoodsView } from './components/HighCarbFoodsView';
import { HomeWorkoutsView } from './components/HomeWorkoutsView';
import { CarbScannerView } from './components/CarbScannerView';
import { AuthModal } from './components/AuthModal';
import { PaywallModal } from './components/PaywallModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { UserSwitcherModal } from './components/UserSwitcherModal';
import { CycleTrackerCard } from './components/CycleTrackerCard';
import { UserProfileModal } from './components/UserProfileModal';
import { 
  auth, 
  onAuthStateChanged, 
  signOut,
  getUserProfileFromFirestore, 
  saveUserProfileToFirestore, 
  saveDailyLogToFirestore, 
  getDailyLogsFromFirestore, 
  saveAccountToStorage,
  isTrialExpired 
} from './lib/firebase';

import {
  Home,
  Bot,
  Camera,
  Search,
  Utensils,
  BookOpen,
  Scale,
  Trophy,
  Dumbbell,
  Plus,
  Trash2,
  Sparkles,
  Flame,
  ChevronRight,
  ShieldAlert,
  Crown,
  BookText,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const STORAGE_KEY_USER = 'zerocarb_user_profile_v1';
const STORAGE_KEY_LOGS = 'zerocarb_daily_logs_v1';

export default function App() {
  // Initial default user profile (Zero Carb 0g default)
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_USER);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return {
      name: '',
      goal: 'emagrecer',
      currentWeight: 75.0,
      targetWeight: 65.0,
      height: 168,
      age: 30,
      gender: 'F',
      activityLevel: 'moderado',
      targetNetCarbs: 0,
      targetCalories: 1550,
      targetProtein: 125,
      targetFat: 110,
      isOnboarded: true, // Prevents onboarding from popping up behind registration
      trialStartDate: new Date().toISOString(),
      isPremium: true,
      streakDays: 1,
      uid: undefined,
      email: undefined
    };
  });

  // Daily logs state
  const todayDateStr = new Date().toISOString().split('T')[0];

  const [dailyLogs, setDailyLogs] = useState<Record<string, DailyLog>>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_LOGS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return {
      [todayDateStr]: {
        date: todayDateStr,
        waterIntakeMl: 1750,
        meals: [
          {
            id: 'm1',
            type: 'café',
            name: 'Ovos mexidos com bacon no café da manhã',
            calories: 320,
            netCarbs: 0,
            protein: 22,
            fat: 26,
            timestamp: '08:15',
            notes: 'Comi 3 ovos caipiras fritos na manteiga com 2 fatias de bacon e um café preto expresso sem açúcar.',
          },
          {
            id: 'm2',
            type: 'almoço',
            name: 'Picanha Bovina Grelhada',
            calories: 580,
            netCarbs: 0,
            protein: 48,
            fat: 42,
            timestamp: '12:40',
            notes: '220g de picanha com capa de gordura grelhada com sal grosso marinho. Zero carboidratos!',
          },
        ],
      },
    };
  });

  // Navigation tab state
  const [activeTab, setActiveTab] = useState<
    'home' | 'diario' | 'treinos' | 'scanner_ia' | 'alimentos' | 'carbo_consulta' | 'cardapios' | 'receitas' | 'peso' | 'desafios'
  >('home');

  // Modals state
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAIChatModal, setShowAIChatModal] = useState(false);
  const [showScannerModal, setShowScannerModal] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showSpecsModal, setShowSpecsModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(() => !user.uid);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('register');
  const [showUserSwitcherModal, setShowUserSwitcherModal] = useState(false);
  const [showPaywallModal, setShowPaywallModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        setShowAuthModal(false);
        const firestoreProfile = await getUserProfileFromFirestore(fbUser.uid);
        if (firestoreProfile && firestoreProfile.name) {
          setUser(firestoreProfile);
          saveAccountToStorage(firestoreProfile);
        } else {
          // If profile doc not created yet, merge auth info into current user without wiping state
          setUser((prev) => {
            const updated = {
              ...prev,
              uid: fbUser.uid,
              email: fbUser.email || prev.email,
              name: prev.name !== 'Carnívoro Iniciante' ? prev.name : (fbUser.displayName || fbUser.email?.split('@')[0] || prev.name),
              isPremium: true,
              premium: true
            };
            saveUserProfileToFirestore(fbUser.uid, updated);
            saveAccountToStorage(updated);
            return updated;
          });
        }

        // Fetch logs from Firestore
        const remoteLogs = await getDailyLogsFromFirestore(fbUser.uid);
        if (remoteLogs && Object.keys(remoteLogs).length > 0) {
          setDailyLogs((prev) => ({ ...prev, ...remoteLogs }));
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Multi-user switch handler
  const handleSwitchUser = async (newProfile: UserProfile) => {
    setUser(newProfile);
    saveAccountToStorage(newProfile);

    // Load logs for this specific user
    if (newProfile.uid) {
      const remoteLogs = await getDailyLogsFromFirestore(newProfile.uid);
      if (remoteLogs && Object.keys(remoteLogs).length > 0) {
        setDailyLogs(remoteLogs);
      } else {
        const localKey = `zc_daily_logs_${newProfile.uid}`;
        const saved = localStorage.getItem(localKey);
        if (saved) {
          try {
            setDailyLogs(JSON.parse(saved));
          } catch (e) {
            console.error(e);
          }
        }
      }
    }
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn('Error during sign out:', e);
    }
    const guestUser: UserProfile = {
      name: 'Novo Usuário',
      goal: 'emagrecer',
      currentWeight: 75.0,
      targetWeight: 65.0,
      height: 165,
      age: 30,
      gender: 'F',
      activityLevel: 'moderado',
      targetNetCarbs: 0,
      targetCalories: 1550,
      targetProtein: 125,
      targetFat: 110,
      isOnboarded: false,
      trialStartDate: new Date().toISOString(),
      isPremium: true,
      streakDays: 1,
      uid: undefined,
      email: undefined
    };
    setUser(guestUser);
    localStorage.removeItem(STORAGE_KEY_USER);
    setAuthModalMode('login');
    setShowAuthModal(true);
  };

  // Workout calorie logging
  const handleLogWorkoutCalories = (caloriesBurned: number, workoutTitle: string) => {
    const updatedMeals = [
      ...todayLog.meals,
      {
        id: 'w_' + Date.now(),
        type: 'lanche' as MealType,
        name: `Treino Concluído: ${workoutTitle}`,
        calories: -caloriesBurned,
        netCarbs: 0,
        protein: 0,
        fat: 0,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        notes: `Treino em casa de queima calórica (-${caloriesBurned} kcal)`
      }
    ];

    const updatedLog: DailyLog = {
      ...todayLog,
      meals: updatedMeals
    };

    setDailyLogs((prev) => ({
      ...prev,
      [todayDateStr]: updatedLog
    }));

    if (user.uid) {
      saveDailyLogToFirestore(user.uid, updatedLog);
    }
  };

  // Check 5 Days Trial Expiration
  useEffect(() => {
    if (isTrialExpired(user)) {
      setShowPaywallModal(true);
    }
  }, [user]);

  // Manual Add Meal Modal
  const [showAddMealModal, setShowAddMealModal] = useState(false);
  const [newMealName, setNewMealName] = useState('');
  const [newMealNetCarbs, setNewMealNetCarbs] = useState('2.0');
  const [newMealKcal, setNewMealKcal] = useState('250');
  const [newMealType, setNewMealType] = useState<MealType>('lanche');

  // Save changes to localStorage per user
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    if (user.uid) {
      saveAccountToStorage(user);
    }
  }, [user]);

  const userLogsStorageKey = user.uid ? `zc_daily_logs_${user.uid}` : STORAGE_KEY_LOGS;

  useEffect(() => {
    localStorage.setItem(userLogsStorageKey, JSON.stringify(dailyLogs));
  }, [dailyLogs, userLogsStorageKey]);


  const todayLog: DailyLog = dailyLogs[todayDateStr] || {
    date: todayDateStr,
    waterIntakeMl: 0,
    meals: [],
  };

  const handleUpdateWater = (newMl: number) => {
    const updatedLog: DailyLog = {
      ...todayLog,
      waterIntakeMl: newMl,
    };
    setDailyLogs((prev) => ({
      ...prev,
      [todayDateStr]: updatedLog,
    }));
    if (user.uid) {
      saveDailyLogToFirestore(user.uid, updatedLog);
    }
  };

  const handleAddMeal = (meal: {
    type: MealType;
    name: string;
    calories: number;
    netCarbs: number;
    protein: number;
    fat: number;
  }) => {
    const newEntry: MealEntry = {
      id: `m-${Date.now()}`,
      type: meal.type,
      name: meal.name,
      calories: meal.calories,
      netCarbs: meal.netCarbs,
      protein: meal.protein,
      fat: meal.fat,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedLog: DailyLog = {
      ...todayLog,
      meals: [...todayLog.meals, newEntry],
    };

    setDailyLogs((prev) => ({
      ...prev,
      [todayDateStr]: updatedLog,
    }));

    if (user.uid) {
      saveDailyLogToFirestore(user.uid, updatedLog);
    }
  };

  const handleDeleteMeal = (id: string) => {
    const updatedLog: DailyLog = {
      ...todayLog,
      meals: todayLog.meals.filter((m) => m.id !== id),
    };

    setDailyLogs((prev) => ({
      ...prev,
      [todayDateStr]: updatedLog,
    }));

    if (user.uid) {
      saveDailyLogToFirestore(user.uid, updatedLog);
    }
  };

  const handleUpdateWeight = (newWeight: number) => {
    const updatedUser = { ...user, currentWeight: newWeight };
    setUser(updatedUser);
    saveAccountToStorage(updatedUser);
    if (user.uid) {
      saveUserProfileToFirestore(user.uid, updatedUser);
    }
  };

  const handleUpdateUser = (updatedUser: UserProfile) => {
    setUser(updatedUser);
    saveAccountToStorage(updatedUser);
    if (updatedUser.uid) {
      saveUserProfileToFirestore(updatedUser.uid, updatedUser);
    }
  };

  const handleManualAddMealSubmit = () => {
    if (!newMealName.trim()) return;
    handleAddMeal({
      type: newMealType,
      name: newMealName,
      calories: Number(newMealKcal) || 150,
      netCarbs: Number(newMealNetCarbs) || 0,
      protein: 15,
      fat: 10,
    });
    setNewMealName('');
    setShowAddMealModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Header Navigation */}
      <Header
        user={user}
        onOpenProfile={() => setShowProfileModal(true)}
        onOpenSpecs={() => setShowSpecsModal(true)}
        onOpenPremium={() => setShowPremiumModal(true)}
        onOpenAuth={() => {
          setAuthModalMode('login');
          setShowAuthModal(true);
        }}
        onOpenAdmin={() => setShowAdminModal(true)}
        onOpenUserSwitcher={() => setShowUserSwitcherModal(true)}
        onLogout={handleLogout}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-xl w-full mx-auto p-4 pb-28 space-y-4">
        {/* TAB 1: HOME DASHBOARD */}
        {activeTab === 'home' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            {/* Trial Banner */}
            <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-amber-950/50 border border-emerald-500/40 p-3.5 rounded-2xl flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  <Crown className="w-4 h-4 fill-amber-400/20" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-100 block">5 Dias de Teste Grátis Ativado</span>
                  <span className="text-[11px] text-slate-400">Acesso ilimitado à IA, Scanner e Receitas</span>
                </div>
              </div>
              <button
                onClick={() => setShowPremiumModal(true)}
                className="text-[11px] font-extrabold text-amber-400 hover:text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-xl border border-amber-500/30"
              >
                Ver Plano
              </button>
            </div>

            {/* Apple Fitness Style Macro Rings & Water Counter */}
            <MacroRings user={user} todayLog={todayLog} onUpdateWater={handleUpdateWater} />

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowScannerModal(true)}
                className="bg-gradient-to-br from-emerald-600 to-emerald-800 hover:from-emerald-500 hover:to-emerald-700 text-slate-950 font-black p-4 rounded-3xl flex items-center justify-between shadow-xl shadow-emerald-950/40 border border-emerald-400/40 group transition"
              >
                <div className="text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-900 block">
                    Visão Computacional
                  </span>
                  <span className="text-sm font-extrabold text-slate-950 block">Escanear Rótulo</span>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-slate-950/20 flex items-center justify-center text-slate-950 group-hover:scale-110 transition">
                  <Camera className="w-5 h-5" />
                </div>
              </button>

              <button
                onClick={() => setShowAIChatModal(true)}
                className="bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-slate-100 font-extrabold p-4 rounded-3xl flex items-center justify-between shadow-xl group transition"
              >
                <div className="text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                    Assistente IA
                  </span>
                  <span className="text-sm font-extrabold text-slate-100 block">Perguntar à IA</span>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition">
                  <Bot className="w-5 h-5" />
                </div>
              </button>
            </div>

            {/* Treinos Semanais em Casa Card */}
            <div
              onClick={() => setActiveTab('treinos')}
              className="bg-gradient-to-r from-emerald-950/70 via-slate-900 to-slate-900 border border-emerald-500/40 hover:border-emerald-400 rounded-3xl p-4 shadow-xl cursor-pointer transition flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 group-hover:scale-105 transition">
                  <Dumbbell className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider block">
                      Treinos Semanais em Casa
                    </span>
                    <span className="text-[9px] font-bold px-1.5 rounded-full bg-emerald-500/20 text-emerald-300">
                      Zero Equipamentos
                    </span>
                  </div>
                  <h4 className="font-extrabold text-sm text-slate-100 mt-0.5">Rotina de Exercícios em Casa</h4>
                  <p className="text-[11px] text-slate-300">Treinos de Segunda a Domingo para queimar gordura na sala ou quarto.</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition" />
            </div>

            {/* Dieta Zero Carb Estrita Rule Card */}
            <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-3 flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
              <p className="text-[11px] text-slate-300 leading-snug">
                <strong className="text-emerald-400">Regra Zero Carb:</strong> Apenas Ovos, Carnes (boi, frango, peixe, porco), Queijos, Presunto e Café com Adoçante. 0g de carbo!
              </p>
            </div>

            {/* Protocolo Clínico 30 Dias (Máx. 30 dias + Pausa obrigatória de 30+ dias) */}
            <CycleTrackerCard user={user} onUpdateUser={handleUpdateUser} />

            {/* Zero Carb Features Shortcut Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => setActiveTab('scanner_ia')}
                className="bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-900 hover:bg-slate-800/90 border border-emerald-500/40 p-3.5 rounded-2xl flex items-center space-x-3 text-left transition group shadow-md"
              >
                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shrink-0 group-hover:scale-105 transition shadow-sm">
                  <Camera className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-100 block">Scanner IA</span>
                    <span className="text-[8px] font-black uppercase px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-300">Câmera</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block">Detecta carbos em rótulos</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('carbo_consulta')}
                className="bg-gradient-to-br from-amber-950/60 via-slate-900 to-slate-900 hover:bg-slate-800/90 border border-amber-500/40 p-3.5 rounded-2xl flex items-center space-x-3 text-left transition group shadow-md"
              >
                <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 shrink-0 group-hover:scale-105 transition shadow-sm">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-100 block">Consulta IA</span>
                    <span className="text-[8px] font-black uppercase px-1 py-0.2 rounded bg-amber-500/20 text-amber-300">5 Refeições</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block">Tem carbo? Sugestões IA</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('diario')}
                className="bg-slate-900 hover:bg-slate-800/90 border border-slate-800 p-3 rounded-2xl flex items-center space-x-2.5 text-left transition group shadow-sm"
              >
                <div className="p-2 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 shrink-0 group-hover:scale-105 transition">
                  <BookText className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-100 block">Diário de Refeições</span>
                  <span className="text-[9px] text-slate-400 block">Acompanhe seu consumo 0g</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('treinos')}
                className="bg-slate-900 hover:bg-slate-800/90 border border-slate-800 p-3 rounded-2xl flex items-center space-x-2.5 text-left transition group shadow-sm"
              >
                <div className="p-2 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 shrink-0 group-hover:scale-105 transition">
                  <Dumbbell className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-100 block">Treinos em Casa</span>
                  <span className="text-[9px] text-slate-400 block">Vídeos 100% em Português</span>
                </div>
              </button>
            </div>

            {/* Meal Logs for Today */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-100">Refeições de Hoje</h3>
                  <p className="text-[11px] text-slate-400">
                    {todayLog.meals.length} registro(s) • Total:{' '}
                    <strong className="text-emerald-400">
                      {todayLog.meals.reduce((a, b) => a + b.netCarbs, 0).toFixed(1)}g net carbs
                    </strong>
                  </p>
                </div>

                <button
                  onClick={() => setShowAddMealModal(true)}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 transition shadow-md shadow-emerald-500/20"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Registrar</span>
                </button>
              </div>

              {todayLog.meals.length === 0 ? (
                <div className="text-center py-6 text-slate-500 text-xs">
                  Nenhuma refeição registrada hoje. Use o scanner, o banco de alimentos ou registre acima!
                </div>
              ) : (
                <div className="space-y-2">
                  {todayLog.meals.map((meal) => (
                    <div
                      key={meal.id}
                      className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-3 flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.2 rounded bg-slate-800 border border-slate-700 text-emerald-400">
                            {meal.type}
                          </span>
                          <span className="text-[10px] text-slate-500">{meal.timestamp}</span>
                        </div>
                        <h4 className="font-bold text-xs text-slate-200 truncate">{meal.name}</h4>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                          <span className="text-emerald-400 font-bold">{meal.netCarbs}g carbo liq</span>
                          <span>•</span>
                          <span className="text-amber-400 font-semibold">{meal.calories} kcal</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteMeal(meal.id)}
                        className="p-1.5 rounded-xl text-slate-600 hover:text-rose-400 hover:bg-slate-900 transition"
                        title="Remover"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Active Challenge Preview Card */}
            <div
              onClick={() => setActiveTab('desafios')}
              className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 rounded-3xl p-4 shadow-xl cursor-pointer transition flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <Flame className="w-5 h-5 fill-amber-400/20" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                    Desafio em Andamento
                  </span>
                  <h4 className="font-bold text-xs text-slate-100">7 Dias Zero Carb Estrito • Dia 4/7</h4>
                  <p className="text-[11px] text-slate-400">Faltam apenas 3 dias para a medalha Lorde Zero Carb!</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-500" />
            </div>

            {/* Quick Access to Home Workouts with Portuguese Videos */}
            <div
              onClick={() => setActiveTab('treinos')}
              className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 hover:border-emerald-500/60 rounded-3xl p-4 shadow-xl cursor-pointer transition flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <Dumbbell className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-wider block">
                      Treinos em Casa
                    </span>
                    <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      🇧🇷 Vídeos em Português
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-100">Videoaulas completas e guiadas por voz</h4>
                  <p className="text-[11px] text-slate-400">Pernas, braços, abdômen e queima metabólica sem aparelhos</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-emerald-400" />
            </div>
          </motion.div>
        )}

        {/* TAB: TREINOS EM CASA */}
        {activeTab === 'treinos' && (
          <HomeWorkoutsView 
            user={user} 
            onLogWorkoutCalories={handleLogWorkoutCalories} 
          />
        )}

        {/* TAB: DIÁRIO DE REFEIÇÕES (ESCREVER REFEIÇÕES) */}
        {activeTab === 'diario' && (
          <MealDiaryView
            currentLog={todayLog}
            onAddMeal={handleAddMeal}
            onDeleteMeal={handleDeleteMeal}
          />
        )}

        {/* TAB: SCANNER IA DE PRODUTOS COM CÂMERA & CONSULTA */}
        {activeTab === 'scanner_ia' && (
          <CarbScannerView onAddMeal={handleAddMeal} initialMode="scanner" />
        )}

        {/* TAB: ALIMENTOS ZERO / LOW CARB */}
        {activeTab === 'alimentos' && <FoodDatabaseView onAddMeal={handleAddMeal} />}

        {/* TAB: ALIMENTOS COM CARBOIDRATOS (CONSULTA IA & GUIA) */}
        {activeTab === 'carbo_consulta' && (
          <div className="space-y-6">
            <CarbScannerView onAddMeal={handleAddMeal} initialMode="search" />
            <HighCarbFoodsView />
          </div>
        )}

        {/* TAB: CARDÁPIOS & GERADOR IA */}
        {activeTab === 'cardapios' && <MealPlansView onAddMeal={handleAddMeal} />}

        {/* TAB: RECEITAS */}
        {activeTab === 'receitas' && <RecipesView onAddMeal={handleAddMeal} />}

        {/* TAB: PESO & EVOLUÇÃO */}
        {activeTab === 'peso' && (
          <WeightTrackerView 
            user={user} 
            onUpdateWeight={handleUpdateWeight} 
            onUpdateUser={handleUpdateUser} 
          />
        )}

        {/* TAB: DESAFIOS */}
        {activeTab === 'desafios' && <ChallengesView />}
      </main>

      {/* Floating Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-slate-900 px-1.5 py-1.5">
        <div className="max-w-md mx-auto flex items-center justify-between gap-0.5">
          {[
            { id: 'home', label: 'Início', icon: Home },
            { id: 'treinos', label: 'Treinos', icon: Dumbbell },
            { id: 'scanner_ia', label: 'Scanner IA', icon: Camera },
            { id: 'diario', label: 'Diário', icon: BookText },
            { id: 'alimentos', label: 'Alimentos 0g', icon: Search },
            { id: 'cardapios', label: 'Cardápios', icon: Utensils },
            { id: 'receitas', label: 'Receitas', icon: BookOpen },
            { id: 'peso', label: 'Evolução', icon: Scale },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-1.5 flex flex-col items-center justify-center rounded-xl transition ${
                  isActive ? 'text-emerald-400 font-extrabold bg-emerald-500/10' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'text-emerald-400' : ''}`} />
                <span className="text-[9px] tracking-tight whitespace-nowrap">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* MODALS */}
      <UserProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        user={user}
        onUpdateUser={handleUpdateUser}
        onOpenOnboarding={() => setShowOnboarding(true)}
      />

      <OnboardingModal
        isOpen={showOnboarding}
        initialUserName={user.name}
        onComplete={(p) => {
          handleUpdateUser({
            ...user,
            ...p,
            isOnboarded: true
          });
          setShowOnboarding(false);
        }}
      />

      <AIChatModal isOpen={showAIChatModal} onClose={() => setShowAIChatModal(false)} user={user} />

      <ScannerModal isOpen={showScannerModal} onClose={() => setShowScannerModal(false)} onAddMeal={handleAddMeal} />

      <PremiumTrialModal isOpen={showPremiumModal} onClose={() => setShowPremiumModal(false)} user={user} />

      <ArchitectureDocModal isOpen={showSpecsModal} onClose={() => setShowSpecsModal(false)} />

      <AuthModal
        key={authModalMode}
        isOpen={showAuthModal}
        initialMode={authModalMode}
        onClose={() => setShowAuthModal(false)}
        currentUserProfile={user}
        onAuthSuccess={(p) => {
          handleSwitchUser(p);
          setShowAuthModal(false);
          if (!p.isOnboarded) {
            setShowOnboarding(true);
          }
        }}
      />

      <UserSwitcherModal
        isOpen={showUserSwitcherModal}
        onClose={() => setShowUserSwitcherModal(false)}
        currentUser={user}
        onSwitchUser={handleSwitchUser}
        onOpenRegister={() => {
          setAuthModalMode('register');
          setShowAuthModal(true);
        }}
        onOpenLogin={() => {
          setAuthModalMode('login');
          setShowAuthModal(true);
        }}
        onLogout={handleLogout}
      />

      <PaywallModal
        isOpen={showPaywallModal}
        onClose={() => setShowPaywallModal(false)}
        userProfile={user}
        isExpired={isTrialExpired(user)}
        onSubscribeSuccess={() => {
          setUser((prev) => ({ ...prev, isSubscribed: true, isPremium: true }));
          setShowPaywallModal(false);
        }}
      />

      <AdminDashboardModal
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
        currentUser={user}
      />

      {/* Floating Support "Precisa de ajuda?" Button */}
      <div className="fixed bottom-16 right-4 z-40">
        <a
          href="https://wa.me/5517981897872?text=Ol%C3%A1!%20Preciso%20de%20ajuda%20com%20o%20app%20Zero%20Carb%20Brasil."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold px-3.5 py-2.5 rounded-full shadow-2xl transition hover:scale-105 border border-emerald-300/40 text-xs"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-950"></span>
          </span>
          <span>Precisa de Ajuda?</span>
        </a>
      </div>

      {/* Manual Add Meal Modal */}
      {showAddMealModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4">
            <h3 className="font-bold text-base text-slate-100">Registrar Refeição no Diário</h3>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Nome do Alimento / Refeição</label>
              <input
                type="text"
                value={newMealName}
                onChange={(e) => setNewMealName(e.target.value)}
                placeholder="Ex: Omelete de 3 ovos com bacon"
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Carboidratos Líquidos (g)</label>
                <input
                  type="number"
                  step="0.1"
                  value={newMealNetCarbs}
                  onChange={(e) => setNewMealNetCarbs(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs font-bold text-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Calorias (kcal)</label>
                <input
                  type="number"
                  value={newMealKcal}
                  onChange={(e) => setNewMealKcal(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs font-bold text-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Refeição</label>
              <div className="grid grid-cols-4 gap-1">
                {(['café', 'almoço', 'jantar', 'lanche'] as MealType[]).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setNewMealType(m)}
                    className={`py-2 rounded-xl text-[10px] font-bold capitalize border ${
                      newMealType === m
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowAddMealModal(false)}
                className="w-1/3 bg-slate-800 text-slate-300 font-semibold py-2.5 rounded-xl text-xs"
              >
                Cancelar
              </button>
              <button
                onClick={handleManualAddMealSubmit}
                className="w-2/3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold py-2.5 rounded-xl text-xs shadow-md shadow-emerald-500/20"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
