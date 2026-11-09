export type GoalType = 'emagrecer' | 'glicemia' | 'cetose' | 'saude' | 'manutencao';
export type ActivityLevel = 'sedentario' | 'leve' | 'moderado' | 'intenso';
export type NetCarbTarget = 0 | 5 | 10 | 20 | 30 | 50;
export type MealType = 'café' | 'almoço' | 'jantar' | 'lanche';
export type FoodClassification = 'Excelente' | 'Bom' | 'Moderado' | 'Evite';

export interface UserProfile {
  uid?: string;
  name: string;
  email?: string;
  whatsapp?: string;
  goal: GoalType;
  currentWeight: number;
  targetWeight: number;
  height: number;
  age: number;
  gender: 'M' | 'F';
  activityLevel: ActivityLevel;
  targetNetCarbs: NetCarbTarget;
  targetCalories: number;
  targetProtein: number;
  targetFat: number;
  isOnboarded: boolean;
  trialStartDate: string; // ISO String
  trialEndsAt?: string; // ISO String for 5 days free trial expiry
  isPremium: boolean;
  premium?: boolean; // Firestore compatibility field
  isSubscribed?: boolean;
  isBlocked?: boolean; // Manual block override in Firestore
  role?: 'admin' | 'user';
  streakDays: number;
  createdAt?: string;

  // Protocolo de 30 Dias (Ciclo de 30 dias máximo + 30 dias de pausa obrigatória)
  cycleStartDate?: string;
  cycleDay?: number;
  cycleStatus?: 'ativo' | 'pausa_obrigatoria';
  lastCycleCompletedDate?: string;

  // Fotos de Antes e Depois (Transformação Corporal)
  beforePhotoUrl?: string;
  beforePhotoDate?: string;
  beforePhotoWeight?: number;
  afterPhotoUrl?: string;
  afterPhotoDate?: string;
  afterPhotoWeight?: number;
}

export interface WeeklyMeasurement {
  id: string;
  userId?: string;
  weekLabel: string; // e.g. "Semana 1", "Semana 2"
  date: string; // YYYY-MM-DD
  weightKg: number;
  chestCm?: number; // Peitoral / Busto
  waistCm?: number; // Cintura
  abdomenCm?: number; // Abdômen
  hipsCm?: number; // Quadril
  thighCm?: number; // Coxa
  armCm?: number; // Braço
  notes?: string;
  createdAt?: string;
}

export interface MealEntry {
  id: string;
  type: MealType;
  name: string;
  calories: number;
  netCarbs: number;
  protein: number;
  fat: number;
  timestamp: string;
  notes?: string;
}

export interface HighCarbFoodItem {
  id: string;
  name: string;
  category: 'Pães e Massas' | 'Grãos e Cereais' | 'Tubérculos e Raízes' | 'Frutas e Doces' | 'Bebidas Açucaradas' | 'Ultraprocessados';
  servingSize: string;
  totalCarbs: number;
  netCarbs: number;
  sugarGrams: number;
  glycemicIndex: 'Alto' | 'Médio' | 'Muito Alto';
  impactNote: string;
}

export interface DailyLog {
  date: string; // YYYY-MM-DD
  waterIntakeMl: number;
  meals: MealEntry[];
  weight?: number;
  chestCm?: number;
  waistCm?: number;
  hipsCm?: number;
}

export interface FoodItem {
  id: string;
  name: string;
  category: 'Carnes' | 'Ovos' | 'Queijos' | 'Presunto' | 'Verduras' | 'Bebidas' | 'Vegetais' | 'Oleaginosas' | 'Laticínios' | 'Embutidos' | 'Doces Low Carb';
  servingSize: string;
  calories: number;
  netCarbs: number;
  totalCarbs: number;
  fiber: number;
  protein: number;
  fat: number;
  classification: FoodClassification;
}

export interface Recipe {
  id: string;
  title: string;
  category: string;
  prepTime: string;
  calories: number;
  netCarbs: number;
  protein: number;
  fat: number;
  servings: number;
  ingredients: string[];
  steps: string[];
  classification: FoodClassification;
  imageUrl?: string;
}

export interface MealPlanDay {
  kcalTarget: 1200 | 1500 | 1800 | 2000;
  title: string;
  description: string;
  breakfast: { name: string; netCarbs: number; kcal: number };
  lunch: { name: string; netCarbs: number; kcal: number };
  dinner: { name: string; netCarbs: number; kcal: number };
  snack: { name: string; netCarbs: number; kcal: number };
  totalNetCarbs: number;
  totalKcal: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  durationDays: number;
  currentDay: number;
  isActive: boolean;
  isCompleted: boolean;
  badgeName: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  iconName: string;
  isUnlocked: boolean;
  unlockedDate?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface LabelScanResult {
  productName: string;
  servingSize: string;
  calories: number;
  totalCarbs: number;
  fiber: number;
  netCarbs: number;
  protein: number;
  fat: number;
  classification: FoodClassification;
  ingredientAlerts: string[];
  verdict: string;
}

export interface CarbScanResult {
  productName: string;
  hasCarbs: boolean;
  totalCarbs: number;
  netCarbs: number;
  fiber: number;
  protein: number;
  fat: number;
  calories: number;
  servingSize: string;
  status: 'zero_carb' | 'baixo_carbo' | 'alto_carbo';
  verdict: string;
  isZeroCarbAllowed: boolean;
  hiddenSugarsOrStarches: string[];
  ingredientsAnalysis: string;
  recommendation: string;
  timestamp?: string;
  imageUrl?: string;
}

export interface MealPeriodSuggestions {
  cafeDaManha: string;
  almoco: string;
  lanche: string;
  jantar: string;
  ceia: string;
}

export interface FoodCarbSearchResult {
  foodName: string;
  hasCarbs: boolean;
  carbsPer100g: number;
  carbsPerPortion: number;
  portionDescription: string;
  netCarbsPerPortion: number;
  fiberPer100g: number;
  proteinPer100g: number;
  fatPer100g: number;
  caloriesPer100g: number;
  glycemicIndex: 'Zero' | 'Baixo' | 'Médio' | 'Alto' | 'Muito Alto';
  zeroCarbCompatibility: '100% Zero Carb (Permitido)' | 'Low Carb Moderado (Atenção)' | 'Proibido na Zero Carb';
  summary: string;
  hiddenCarbWarning?: string | null;
  mealPeriodSuggestions: MealPeriodSuggestions;
  zeroCarbSubstitutes: string[];
  keyTip: string;
  timestamp?: string;
}

export type WorkoutDayOfWeek = 'segunda' | 'terca' | 'quarta' | 'quinta' | 'sexta' | 'sabado' | 'domingo' | 'boxe' | 'taichi';

export interface ExerciseItem {
  id: string;
  name: string;
  targetMuscles: string;
  setsAndReps: string;
  durationSec?: number;
  instructions: string[];
  tips: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  videoDurationText?: string;
  videoLanguage?: string;
  videoTitlePt?: string;
  instructorName?: string;
  youtubeSearchUrl?: string;
  voiceGuidanceText?: string;
  breathingTip?: string;
  commonMistakes?: string[];
}

export interface SavedAccountItem {
  uid: string;
  name: string;
  email: string;
  whatsapp?: string;
  lastLogin: string;
  isSubscribed?: boolean;
  streakDays?: number;
}


export interface WeeklyHomeWorkout {
  id: string;
  dayOfWeek: WorkoutDayOfWeek;
  dayLabel: string;
  title: string;
  focus: string;
  category?: string;
  keywords?: string[];
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  durationMin: number;
  caloriesBurnEstimate: number;
  equipment: string;
  warmup: string[];
  cooldown: string[];
  exercises: ExerciseItem[];
  fullSessionVideoUrl?: string;
  fullSessionTitle?: string;
  fullSessionYoutubeUrl?: string;
}

export interface CompletedWorkoutLog {
  id: string;
  workoutId: string;
  dayOfWeek: WorkoutDayOfWeek;
  completedAt: string;
  durationMinutes: number;
  caloriesBurned: number;
  notes?: string;
}

