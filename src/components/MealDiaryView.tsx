import React, { useState } from 'react';
import { BookOpen, Plus, Edit2, Trash2, Calendar, Sparkles, Check, Clock, Flame, Coffee, Utensils, Moon, Cookie, FileText, Share2, AlertCircle } from 'lucide-react';
import { DailyLog, MealEntry, MealType } from '../types';

interface MealDiaryViewProps {
  currentLog: DailyLog;
  onAddMeal: (meal: Omit<MealEntry, 'id' | 'timestamp'>) => void;
  onDeleteMeal?: (mealId: string) => void;
}

export const MealDiaryView: React.FC<MealDiaryViewProps> = ({ currentLog, onAddMeal, onDeleteMeal }) => {
  const [selectedMealType, setSelectedMealType] = useState<MealType | null>(null);
  const [mealText, setMealText] = useState('');
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState<number>(350);
  const [netCarbs, setNetCarbs] = useState<number>(0); // Default to 0g Zero Carb!
  const [protein, setProtein] = useState<number>(30);
  const [fat, setFat] = useState<number>(25);
  const [isAiEstimating, setIsAiEstimating] = useState(false);
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  const mealCategories: { type: MealType; title: string; icon: React.ReactNode; defaultTime: string; bgGradient: string }[] = [
    { type: 'café', title: 'Café da Manhã', icon: <Coffee className="w-5 h-5 text-amber-400" />, defaultTime: '08:00', bgGradient: 'from-amber-950/30 to-slate-900 border-amber-900/40' },
    { type: 'almoço', title: 'Almoço', icon: <Utensils className="w-5 h-5 text-emerald-400" />, defaultTime: '12:30', bgGradient: 'from-emerald-950/30 to-slate-900 border-emerald-900/40' },
    { type: 'jantar', title: 'Jantar', icon: <Moon className="w-5 h-5 text-indigo-400" />, defaultTime: '19:30', bgGradient: 'from-indigo-950/30 to-slate-900 border-indigo-900/40' },
    { type: 'lanche', title: 'Lanche / Petisco', icon: <Cookie className="w-5 h-5 text-purple-400" />, defaultTime: '16:00', bgGradient: 'from-purple-950/30 to-slate-900 border-purple-900/40' },
  ];

  const handleOpenForm = (type: MealType) => {
    setSelectedMealType(type);
    setMealName(type === 'café' ? 'Café da Manhã Zero Carb' : type === 'almoço' ? 'Almoço Zero Carb' : type === 'jantar' ? 'Jantar Zero Carb' : 'Lanche Carnívoro');
    setMealText('');
    setNetCarbs(0);
    setCalories(320);
    setProtein(35);
    setFat(20);
  };

  const handleAutoEstimateAi = () => {
    if (!mealText.trim()) return;
    setIsAiEstimating(true);

    setTimeout(() => {
      const lower = mealText.toLowerCase();
      let estCarbs = 0;
      let estKcal = 350;
      let estProt = 30;
      let estFat = 22;

      // Smart heuristic simulation based on free-text writing
      if (lower.includes('picanha') || lower.includes('carne') || lower.includes('costela') || lower.includes('bacon')) {
        estKcal += 200;
        estProt += 20;
        estFat += 18;
      }
      if (lower.includes('ovo') || lower.includes('ovos')) {
        estKcal += 120;
        estProt += 12;
        estFat += 10;
      }
      if (lower.includes('pão') || lower.includes('mandioca') || lower.includes('arroz') || lower.includes('banana') || lower.includes('tapioca')) {
        estCarbs += 25;
      } else if (lower.includes('abobrinha') || lower.includes('brócolis') || lower.includes('couve')) {
        estCarbs += 2.5;
      } else {
        // Zero carb default if pure meat/eggs/cheese
        estCarbs = 0;
      }

      setNetCarbs(Math.round(estCarbs * 10) / 10);
      setCalories(estKcal);
      setProtein(estProt);
      setFat(estFat);
      setIsAiEstimating(false);
    }, 600);
  };

  const handleSaveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMealType) return;

    const titleToSave = mealName.trim() || (mealText.slice(0, 35) + '...');
    onAddMeal({
      type: selectedMealType,
      name: titleToSave,
      calories: Number(calories) || 0,
      netCarbs: Number(netCarbs) || 0,
      protein: Number(protein) || 0,
      fat: Number(fat) || 0,
      notes: mealText.trim()
    });

    setSelectedMealType(null);
    setMealText('');
  };

  const handleCopyDiarySummary = () => {
    const todayStr = new Date().toLocaleDateString('pt-BR');
    let summaryText = `📖 DIÁRIO ALIMENTAR ZERO CARB (${todayStr})\n\n`;

    mealCategories.forEach(cat => {
      const entries = currentLog.meals.filter(m => m.type === cat.type);
      summaryText += `🔹 ${cat.title.toUpperCase()}:\n`;
      if (entries.length === 0) {
        summaryText += `   (Nenhum registro escrito)\n`;
      } else {
        entries.forEach(e => {
          summaryText += `   • ${e.name}\n`;
          if (e.notes) summaryText += `     "${e.notes}"\n`;
          summaryText += `     Macros: ${e.netCarbs}g Carbo | ${e.calories} kcal | ${e.protein}g Prot | ${e.fat}g Gord\n`;
        });
      }
      summaryText += `\n`;
    });

    navigator.clipboard.writeText(summaryText);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2500);
  };

  const totalCarbsLogged = currentLog.meals.reduce((acc, m) => acc + (m.netCarbs || 0), 0);
  const totalKcalLogged = currentLog.meals.reduce((acc, m) => acc + (m.calories || 0), 0);

  return (
    <div className="space-y-6 pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-900/40 rounded-2xl p-5 relative overflow-hidden shadow-lg">
        <div className="flex items-start space-x-3.5 relative z-10">
          <div className="p-3 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-emerald-400 shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 text-xs font-bold bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30 uppercase tracking-wider">
                Diário Livre de Refeições
              </span>
              <button
                onClick={handleCopyDiarySummary}
                className="flex items-center space-x-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 rounded-lg transition-colors border border-slate-700"
              >
                {copiedSuccess ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-slate-400" />}
                <span>{copiedSuccess ? 'Copiado!' : 'Copiar Diário'}</span>
              </button>
            </div>
            <h2 className="text-xl font-bold text-slate-100 mt-1">Escrever o que comeu hoje</h2>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Escreva em texto livre o que você consumiu no café, almoço, jantar ou lanches. Registro prático, rápido e sem complicações.
            </p>
          </div>
        </div>
      </div>

      {/* Daily Summary Pill */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Calendar className="w-5 h-5 text-emerald-400" />
          <div>
            <p className="text-xs text-slate-400">Resumo de Hoje</p>
            <p className="text-sm font-bold text-slate-100">
              {currentLog.meals.length} {currentLog.meals.length === 1 ? 'refeição registrada' : 'refeições registradas'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-right">
          <div>
            <p className="text-[10px] text-slate-400 uppercase">Carbo Total</p>
            <p className={`text-sm font-bold ${totalCarbsLogged === 0 ? 'text-emerald-400' : totalCarbsLogged <= 5 ? 'text-amber-400' : 'text-red-400'}`}>
              {totalCarbsLogged}g Líquido
            </p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase">Calorias</p>
            <p className="text-sm font-bold text-slate-200">{totalKcalLogged} kcal</p>
          </div>
        </div>
      </div>

      {/* Meals Categories Grid */}
      <div className="space-y-4">
        {mealCategories.map(cat => {
          const entries = currentLog.meals.filter(m => m.type === cat.type);

          return (
            <div
              key={cat.type}
              className={`bg-gradient-to-br ${cat.bgGradient} border rounded-2xl p-5 space-y-4 shadow-sm transition-all`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800">
                    {cat.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-100">{cat.title}</h3>
                    <p className="text-xs text-slate-400">
                      {entries.length === 0 ? 'Nenhum item escrito ainda' : `${entries.length} registro(s)`}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenForm(cat.type)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-transform active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>Escrever</span>
                </button>
              </div>

              {/* Entries list */}
              {entries.length > 0 && (
                <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
                  {entries.map(entry => (
                    <div
                      key={entry.id}
                      className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-sm font-bold text-slate-100">{entry.name}</h4>
                          <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3" /> {entry.timestamp}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold rounded">
                            {entry.netCarbs}g Carbo
                          </span>
                          {onDeleteMeal && (
                            <button
                              onClick={() => onDeleteMeal(entry.id)}
                              className="text-slate-500 hover:text-red-400 p-1 rounded transition-colors"
                              title="Remover entrada"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      {entry.notes && (
                        <p className="text-xs text-slate-300 bg-slate-900/90 p-2.5 rounded-lg border border-slate-800/80 italic leading-relaxed">
                          "{entry.notes}"
                        </p>
                      )}

                      <div className="flex items-center space-x-3 text-[11px] text-slate-400 pt-1">
                        <span>🔥 {entry.calories} kcal</span>
                        <span>🥩 {entry.protein}g proteína</span>
                        <span>🥑 {entry.fat}g gordura</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Freeform Writing Modal */}
      {selectedMealType && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 space-y-5 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-100">
                    Escrever no Diário - {selectedMealType.toUpperCase()}
                  </h3>
                  <p className="text-xs text-slate-400">Descreva em texto livre o que você comeu nesta refeição.</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedMealType(null)}
                className="text-slate-400 hover:text-slate-200 text-sm font-bold px-2 py-1 bg-slate-800 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEntry} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Título Curto da Refeição
                </label>
                <input
                  type="text"
                  value={mealName}
                  onChange={(e) => setMealName(e.target.value)}
                  placeholder="Ex: Ovos Mexidos com Picanha e Café"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl text-slate-100 text-sm focus:outline-none"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-300">
                    O que você comeu? (Texto livre / detalhes)
                  </label>
                  <button
                    type="button"
                    onClick={handleAutoEstimateAi}
                    disabled={!mealText.trim() || isAiEstimating}
                    className="text-[11px] text-emerald-400 font-semibold hover:underline flex items-center space-x-1 disabled:opacity-50"
                  >
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>{isAiEstimating ? 'Estimando...' : 'Estimar Macros com IA'}</span>
                  </button>
                </div>
                <textarea
                  value={mealText}
                  onChange={(e) => setMealText(e.target.value)}
                  placeholder="Exemplo: Comi 3 ovos caipiras fritos em banha de porco com 150g de picanha com sal grosso e tomei 1 xícara de café preto sem açúcar."
                  rows={4}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl text-slate-100 text-sm focus:outline-none leading-relaxed"
                />
              </div>

              {/* Quick Preset Buttons */}
              <div className="space-y-1.5">
                <p className="text-[11px] text-slate-400 font-medium">Atalhos Zero Carb rápidos:</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMealName('3 Ovos Mexidos na Manteiga');
                      setMealText('3 ovos de galinha caipira mexidos em 1 colher de manteiga de garrafa com uma pitada de sal marinho.');
                      setNetCarbs(0); setCalories(260); setProtein(19); setFat(20);
                    }}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg border border-slate-700"
                  >
                    🍳 3 Ovos na Manteiga
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMealName('200g Picanha Grelhada + Café');
                      setMealText('200g de picanha bovina grelhada na própria gordura com sal grosso e 1 xícara de café expresso sem açúcar.');
                      setNetCarbs(0); setCalories(520); setProtein(48); setFat(36);
                    }}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg border border-slate-700"
                  >
                    🥩 Picanha Grelhada (0g)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMealName('Peito de Frango + Queijo Canastra');
                      setMealText('180g de peito de frango grelhado coberto com 30g de queijo meia cura derretido.');
                      setNetCarbs(0.3); setCalories(380); setProtein(52); setFat(18);
                    }}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg border border-slate-700"
                  >
                    🍗 Frango com Queijo
                  </button>
                </div>
              </div>

              {/* Macro Inputs */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200">Valores Nutricionais da Refeição</span>
                  <button
                    type="button"
                    onClick={() => setNetCarbs(0)}
                    className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded font-bold"
                  >
                    Zerar Carbo (0g)
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Carboidratos Líquidos (g)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={netCarbs}
                      onChange={(e) => setNetCarbs(parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-lg text-slate-100 text-sm font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Calorias (kcal)</label>
                    <input
                      type="number"
                      value={calories}
                      onChange={(e) => setCalories(parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-lg text-slate-100 text-sm font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Proteínas (g)</label>
                    <input
                      type="number"
                      value={protein}
                      onChange={(e) => setProtein(parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-lg text-slate-100 text-sm font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Gorduras (g)</label>
                    <input
                      type="number"
                      value={fat}
                      onChange={(e) => setFat(parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-lg text-slate-100 text-sm font-bold"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedMealType(null)}
                  className="w-1/3 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-sm transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl text-sm transition-transform active:scale-95 shadow-lg shadow-emerald-500/20"
                >
                  Salvar no Diário
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
