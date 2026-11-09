import React, { useState, useEffect } from 'react';
import { UserProfile, GoalType, ActivityLevel, NetCarbTarget } from '../types';
import { Target, Flame, Scale, Activity, ArrowRight, CheckCircle2, ChevronRight, Sparkles, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: (profile: UserProfile) => void;
  initialUserName?: string;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onComplete, initialUserName }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState(initialUserName || 'Novo Usuário');
  const [goal, setGoal] = useState<GoalType>('emagrecer');
  const [currentWeight, setCurrentWeight] = useState(74);
  const [targetWeight, setTargetWeight] = useState(64);
  const [height, setHeight] = useState(165);
  const [age, setAge] = useState(32);
  const [gender, setGender] = useState<'M' | 'F'>('F');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('leve');
  const [targetNetCarbs, setTargetNetCarbs] = useState<NetCarbTarget>(0);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      if (initialUserName) {
        setName(initialUserName);
      }
    }
  }, [isOpen, initialUserName]);

  if (!isOpen) return null;

  const calculateMacros = () => {
    // Basic BMR estimation using Mifflin-St Jeor
    let bmr = 10 * currentWeight + 6.25 * height - 5 * age + (gender === 'M' ? 5 : -161);
    let activityMult = 1.2;
    if (activityLevel === 'leve') activityMult = 1.375;
    if (activityLevel === 'moderado') activityMult = 1.55;
    if (activityLevel === 'intenso') activityMult = 1.725;

    let tdee = Math.round(bmr * activityMult);
    // Deficit for weight loss
    let targetCalories = goal === 'emagrecer' ? Math.max(1200, Math.round(tdee - 450)) : Math.round(tdee);

    // Protein: ~1.8g per kg bodyweight
    let targetProtein = Math.round(currentWeight * 1.8);
    // Net Carbs in calories (1g carb = 4 kcal)
    let carbCalories = targetNetCarbs * 4;
    let proteinCalories = targetProtein * 4;
    // Remaining calories for healthy fats (1g fat = 9 kcal)
    let fatCalories = Math.max(300, targetCalories - carbCalories - proteinCalories);
    let targetFat = Math.round(fatCalories / 9);

    return { targetCalories, targetProtein, targetFat };
  };

  const handleFinish = () => {
    const { targetCalories, targetProtein, targetFat } = calculateMacros();
    const newProfile: UserProfile = {
      name: name.trim() || 'Usuário',
      goal,
      currentWeight,
      targetWeight,
      height,
      age,
      gender,
      activityLevel,
      targetNetCarbs,
      targetCalories,
      targetProtein,
      targetFat,
      isOnboarded: true,
      trialStartDate: new Date().toISOString(),
      isPremium: true, // 5-day free trial active
      streakDays: 1,
      cycleStartDate: new Date().toISOString(),
      cycleDay: 1,
      cycleStatus: 'ativo'
    };
    onComplete(newProfile);
  };

  const macros = calculateMacros();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-slate-100 overflow-hidden"
      >
        {/* Step Progress Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-sm">
              ZC
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Zero Carb Brasil • Passo {step} de 4
            </span>
          </div>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  s === step ? 'w-6 bg-emerald-400' : s < step ? 'w-3 bg-emerald-700' : 'w-3 bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <div>
                <h2 className="text-2xl font-bold text-slate-50">Qual é o seu objetivo principal?</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Personalizaremos sua meta de carboidratos líquidos e calorias.
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Como deseja ser chamado(a)?</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-2.5">
                {[
                  { id: 'emagrecer', title: 'Emagrecer & Queimar Gordura', desc: 'Perda de peso constante usando gordura como combustível', icon: Flame },
                  { id: 'glicemia', title: 'Controlar Glicemia / Diabetes T2', desc: 'Evitar picos de insulina e estabilizar açúcar no sangue', icon: Activity },
                  { id: 'cetose', title: 'Cetose Profunda (Keto Estrita)', desc: 'Máxima clareza mental, energia e saciedade', icon: Target },
                  { id: 'saude', title: 'Saúde Metabólica & Desinflamação', desc: 'Eliminar inchaço, compulsão por doces e fadiga', icon: Sparkles },
                  { id: 'manutencao', title: 'Manutenção de Peso Saudável', desc: 'Manter corpo definido sem passar fome', icon: Scale },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = goal === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setGoal(item.id as GoalType)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                        isSelected
                          ? 'bg-emerald-500/10 border-emerald-500 text-slate-50 ring-1 ring-emerald-500/50'
                          : 'bg-slate-800/50 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className={`p-2 rounded-xl mt-0.5 ${isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{item.title}</div>
                        <div className="text-xs text-slate-400">{item.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full mt-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-500/20"
              >
                <span>Próximo Passo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div>
                <h2 className="text-2xl font-bold text-slate-50">Seus Dados Corporais</h2>
                <p className="text-xs text-slate-400 mt-1">Usados para calcular seu metabolismo basal (TDEE).</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Gênero BIológico</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setGender('F')}
                      className={`py-2 rounded-xl text-xs font-semibold border ${
                        gender === 'F' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : 'bg-slate-800 border-slate-700 text-slate-400'
                      }`}
                    >
                      Feminino
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('M')}
                      className={`py-2 rounded-xl text-xs font-semibold border ${
                        gender === 'M' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : 'bg-slate-800 border-slate-700 text-slate-400'
                      }`}
                    >
                      Masculino
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Idade (anos)</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Peso Atual (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={currentWeight}
                    onChange={(e) => setCurrentWeight(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Meta de Peso (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={targetWeight}
                    onChange={(e) => setTargetWeight(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Altura (cm)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Nível de Atividade Física</label>
                <select
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 text-xs focus:outline-none focus:border-emerald-500"
                >
                  <option value="sedentario">Sedentário (trabalho de escritório, poucos passos)</option>
                  <option value="leve">Levemente Ativo (caminhada leve 1-3x na semana)</option>
                  <option value="moderado">Moderado (exercício moderado 3-5x na semana)</option>
                  <option value="intenso">Muito Ativo (treino intenso diário / trabalho braçal)</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="w-1/3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-3 px-3 rounded-xl text-xs"
                >
                  Voltar
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="w-2/3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs transition shadow-lg shadow-emerald-500/20"
                >
                  <span>Continuar</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div>
                <h2 className="text-2xl font-bold text-slate-50">Limite Diário de Carboidratos</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Qual o seu limite de <strong className="text-emerald-400">Carboidratos Líquidos</strong> por dia?
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { amount: 0, tag: 'Dieta Zero Carb / Carnívora', desc: '0g / dia • Alimentação 100% livre de carboidratos' },
                  { amount: 5, tag: 'Zero Carb Flexível', desc: '5g / dia • Carnes, ovos e pequenos traços de queijo' },
                  { amount: 20, tag: 'Cetogênica Estrita', desc: '20g / dia • Máxima queima de gordura e cetose' },
                  { amount: 30, tag: 'Low Carb Forte', desc: '30g / dia • Padrão clássico de emagrecimento' },
                ].map((item) => {
                  const isSelected = targetNetCarbs === item.amount;
                  return (
                    <button
                      key={item.amount}
                      onClick={() => setTargetNetCarbs(item.amount as NetCarbTarget)}
                      className={`text-left p-3 rounded-2xl border transition-all ${
                        isSelected
                          ? 'bg-emerald-500/10 border-emerald-500 ring-1 ring-emerald-500/50 text-slate-50'
                          : 'bg-slate-800/50 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xl font-extrabold text-emerald-400">{item.amount}g</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      </div>
                      <div className="font-semibold text-xs text-slate-200">{item.tag}</div>
                      <div className="text-[10px] text-slate-400 mt-1 leading-snug">{item.desc}</div>
                    </button>
                  );
                })}
              </div>

              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-3 text-xs text-slate-300 space-y-1">
                <div className="font-semibold text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>O que são Carboidratos Líquidos?</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Carboidratos Líquidos = <strong>Carboidratos Totais - Fibras - Polióis</strong>. As fibras passam sem alterar a insulina!
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setStep(2)}
                  className="w-1/3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-3 px-3 rounded-xl text-xs"
                >
                  Voltar
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="w-2/3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs transition shadow-lg shadow-emerald-500/20"
                >
                  <span>Calcular Meu Plano</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4 text-center"
            >
              <div className="inline-flex p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-full text-emerald-400 mb-1">
                <Sparkles className="w-8 h-8 animate-pulse" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-50">Seu Plano Zero Carb Está Pronto!</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Baseado em seu perfil de {currentWeight}kg com meta de {targetWeight}kg.
                </p>
              </div>

              {/* Calculated Macro Summary */}
              <div className="bg-slate-950 border border-emerald-500/30 rounded-2xl p-4 text-left space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 border-b border-slate-800 pb-2 flex justify-between">
                  <span>Metas Diárias Recomendadas</span>
                  <span>{targetNetCarbs}g Net Carbs</span>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-xs text-emerald-400 font-bold block">{targetNetCarbs}g</span>
                    <span className="text-[10px] text-slate-400">Carb. Liq</span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-xs text-amber-400 font-bold block">{macros.targetCalories}</span>
                    <span className="text-[10px] text-slate-400">Calorias</span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-xs text-cyan-400 font-bold block">{macros.targetProtein}g</span>
                    <span className="text-[10px] text-slate-400">Proteínas</span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-xs text-rose-400 font-bold block">{macros.targetFat}g</span>
                    <span className="text-[10px] text-slate-400">Gorduras</span>
                  </div>
                </div>

                <div className="bg-emerald-950/40 border border-emerald-800/50 p-2.5 rounded-xl text-[11px] text-emerald-200 leading-tight">
                  🎉 <strong>5 Dias de Teste Grátis Desbloqueados!</strong> Você tem acesso total à IA Nutricional, Scanner de Rótulos por Câmera e Cardápios sem cobrança.
                </div>

                <div className="bg-amber-950/40 border border-amber-800/60 p-2.5 rounded-xl text-[11px] text-amber-200 text-left space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-amber-300">
                    <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                    <span>Protocolo de 30 Dias Obrigatório</span>
                  </div>
                  <p className="text-slate-300 text-[10px] leading-tight">
                    Esta dieta pode ser seguida por <strong>no máximo 30 dias consecutivos</strong>. Após os 30 dias, é mandatório realizar uma pausa de mais de 30 dias com dieta de manutenção antes de reiniciar outro ciclo.
                  </p>
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 text-sm transition shadow-xl shadow-emerald-500/20"
              >
                <span>Começar Minha Jornada Zero Carb</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
