import React, { useState } from 'react';
import { MEAL_PLANS } from '../data/mockData';
import { MealPlanDay, MealType } from '../types';
import { Sparkles, Utensils, Clock, Flame, ChevronRight, Check, Plus } from 'lucide-react';
import { motion } from 'motion/react';

interface MealPlansViewProps {
  onAddMeal: (meal: { type: MealType; name: string; calories: number; netCarbs: number; protein: number; fat: number }) => void;
}

export const MealPlansView: React.FC<MealPlansViewProps> = ({ onAddMeal }) => {
  const [activeTab, setActiveTab] = useState<'cardapios' | 'gerador'>('cardapios');
  const [selectedPlanKcal, setSelectedPlanKcal] = useState<number>(1500);

  // AI Generator state
  const [ingredients, setIngredients] = useState('Ovos, Peito de Frango, Queijo Muçarela, Presunto, Rúcula, Agrião, Manteiga');
  const [maxKcal, setMaxKcal] = useState(400);
  const [maxNetCarbs, setMaxNetCarbs] = useState(0);
  const [mealType, setMealType] = useState<MealType>('almoço');

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMeal, setGeneratedMeal] = useState<{
    title: string;
    prepTime: string;
    calories: number;
    netCarbs: number;
    protein: number;
    fat: number;
    servings: number;
    ingredientsList: string[];
    stepByStep: string[];
    ketoTip: string;
  } | null>(null);

  const [addedNotice, setAddedNotice] = useState(false);

  const selectedPlan = MEAL_PLANS.find((p) => p.kcalTarget === selectedPlanKcal) || MEAL_PLANS[1];

  const handleGenerateAIMeal = async () => {
    setIsGenerating(true);
    setGeneratedMeal(null);

    try {
      const res = await fetch('/api/generate-meal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ingredients,
          maxCalories: maxKcal,
          maxNetCarbs: 0,
          mealType,
        }),
      });

      const data = await res.json();
      setGeneratedMeal(data);
    } catch (err) {
      console.error(err);
      // Fallback response strictly 0g carbo
      setGeneratedMeal({
        title: 'Frango Dourado com Presunto e Queijo Muçarela na Manteiga',
        prepTime: '12 min',
        calories: 390,
        netCarbs: 0,
        protein: 42,
        fat: 24,
        servings: 1,
        ingredientsList: [
          '180g de peito de frango em bifes ou cubos',
          '50g de queijo muçarela fatiado',
          '30g de presunto cozido fatiado',
          '1 colher de sopa de manteiga pura',
          'Sal marinho a gosto'
        ],
        stepByStep: [
          'Aqueça a manteiga na frigideira e doure o frango temperado com sal.',
          'Coloque as fatias de presunto sobre o frango dourado.',
          'Cubra com o queijo muçarela e tampe a frigideira por 2 minutos em fogo baixo.',
          'Sirva assim que o queijo derreter. 100% Zero Carboidrato (0.0g)!'
        ],
        ketoTip: '100% Zero Carb Brasil: apenas proteínas nobres e gorduras boas sem nenhum grama de carboidrato!'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddGeneratedToDiary = () => {
    if (!generatedMeal) return;
    onAddMeal({
      type: mealType,
      name: generatedMeal.title,
      calories: generatedMeal.calories,
      netCarbs: generatedMeal.netCarbs,
      protein: generatedMeal.protein,
      fat: generatedMeal.fat,
    });
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 1500);
  };

  return (
    <div className="space-y-4 text-slate-100">
      {/* View Switch Tabs */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-1.5 flex gap-1 shadow-lg">
        <button
          onClick={() => setActiveTab('cardapios')}
          className={`flex-1 py-2.5 rounded-2xl text-xs font-extrabold transition flex items-center justify-center gap-2 ${
            activeTab === 'cardapios'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Utensils className="w-4 h-4" />
          <span>Cardápios Prontos</span>
        </button>

        <button
          onClick={() => setActiveTab('gerador')}
          className={`flex-1 py-2.5 rounded-2xl text-xs font-extrabold transition flex items-center justify-center gap-2 ${
            activeTab === 'gerador'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Gerador de Refeições IA</span>
        </button>
      </div>

      {/* TAB 1: CARDÁPIOS PRONTOS */}
      {activeTab === 'cardapios' && (
        <div className="space-y-4">
          {/* Calorie Tier Selector */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 space-y-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Escolha seu Calibre Calórico Diário:
            </span>
            <div className="grid grid-cols-4 gap-2">
              {[1200, 1500, 1800, 2000].map((kcal) => (
                <button
                  key={kcal}
                  onClick={() => setSelectedPlanKcal(kcal)}
                  className={`p-2.5 rounded-2xl border text-center transition ${
                    selectedPlanKcal === kcal
                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500/50'
                      : 'bg-slate-800/80 border-slate-700/80 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="font-extrabold text-sm block">{kcal}</span>
                  <span className="text-[10px] text-slate-400">kcal/dia</span>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Plan Details */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {selectedPlan.totalNetCarbs}g Net Carbs Total
                </span>
                <span className="text-xs text-amber-400 font-bold">{selectedPlan.totalKcal} kcal</span>
              </div>
              <h3 className="font-extrabold text-base text-slate-100">{selectedPlan.title}</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{selectedPlan.description}</p>
            </div>

            {/* Daily Meals Breakdown */}
            <div className="space-y-3 pt-2">
              {[
                { title: 'Café da Manhã', data: selectedPlan.breakfast, mealType: 'café' as MealType },
                { title: 'Almoço', data: selectedPlan.lunch, mealType: 'almoço' as MealType },
                { title: 'Jantar', data: selectedPlan.dinner, mealType: 'jantar' as MealType },
                { title: 'Lanche / Ceia', data: selectedPlan.snack, mealType: 'lanche' as MealType },
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-200 uppercase tracking-wider">{item.title}</span>
                    <div className="flex gap-2">
                      <span className="text-emerald-400 font-bold">{item.data.netCarbs}g carbo liq</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-amber-400 font-semibold">{item.data.kcal} kcal</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 font-medium leading-normal">{item.data.name}</p>

                  <button
                    onClick={() =>
                      onAddMeal({
                        type: item.mealType,
                        name: item.data.name,
                        calories: item.data.kcal,
                        netCarbs: item.data.netCarbs,
                        protein: 20,
                        fat: 15,
                      })
                    }
                    className="mt-1 text-[11px] font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Adicionar este item ao Diário de Hoje</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: GERADOR DE REFEIÇÃO COM IA */}
      {activeTab === 'gerador' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <h3 className="font-extrabold text-base text-slate-100">Gerador de Refeições Inteligente</h3>
              </div>
              <p className="text-xs text-slate-400">
                Informe o que você tem na geladeira/despensa e a IA criará uma receita sob medida.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Ingredientes permitidos disponíveis (Ovos, Carnes, Queijos, Presunto):
              </label>
              <textarea
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                rows={2}
                placeholder="Ex: Ovos, peito de frango, bife de alcatra, queijo muçarela, presunto, manteiga..."
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Máx. Calorias</label>
                <input
                  type="number"
                  value={maxKcal}
                  onChange={(e) => setMaxKcal(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-100"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Máx. Carbo Liq.</label>
                <input
                  type="number"
                  value={maxNetCarbs}
                  onChange={(e) => setMaxNetCarbs(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-emerald-400"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Tipo Refeição</label>
                <select
                  value={mealType}
                  onChange={(e) => setMealType(e.target.value as MealType)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2 py-2 text-xs text-slate-100 capitalize"
                >
                  <option value="café">Café</option>
                  <option value="almoço">Almoço</option>
                  <option value="jantar">Jantar</option>
                  <option value="lanche">Lanche</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerateAIMeal}
              disabled={isGenerating}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold py-3 rounded-2xl text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-500/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isGenerating ? 'Criando Receita com IA...' : 'Gerar Refeição com IA'}</span>
            </button>
          </div>

          {/* Generated Result Card */}
          {generatedMeal && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900 border border-emerald-500/40 rounded-3xl p-5 space-y-4 shadow-2xl"
            >
              <div className="flex items-start justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-1.5 inline-block">
                    Receita Gerada por IA
                  </span>
                  <h3 className="font-extrabold text-base text-slate-50">{generatedMeal.title}</h3>
                  <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {generatedMeal.prepTime}
                    </span>
                    <span>•</span>
                    <span className="text-emerald-400 font-bold">{generatedMeal.netCarbs}g carbo liq</span>
                    <span>•</span>
                    <span className="text-amber-400 font-bold">{generatedMeal.calories} kcal</span>
                  </div>
                </div>
              </div>

              {/* Ingredients List */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-300 block uppercase tracking-wider">Ingredientes:</span>
                <ul className="text-xs text-slate-300 space-y-1 pl-1">
                  {generatedMeal.ingredientsList.map((ing, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Step by Step */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-300 block uppercase tracking-wider">Modo de Preparo:</span>
                <ol className="text-xs text-slate-300 space-y-1.5 pl-1">
                  {generatedMeal.stepByStep.map((step, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold text-xs shrink-0">{i + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Tip */}
              <div className="bg-emerald-950/40 border border-emerald-800/50 p-3 rounded-2xl text-xs text-emerald-200">
                💡 <strong>Dica do Nutricionista IA:</strong> {generatedMeal.ketoTip}
              </div>

              <button
                onClick={handleAddGeneratedToDiary}
                disabled={addedNotice}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold py-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition shadow-lg shadow-emerald-500/20"
              >
                {addedNotice ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                <span>{addedNotice ? 'Adicionado ao Diário!' : 'Adicionar ao Diário do Dia'}</span>
              </button>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};
