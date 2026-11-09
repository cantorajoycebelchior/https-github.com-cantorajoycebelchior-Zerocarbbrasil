import React, { useState } from 'react';
import { FoodItem, MealType } from '../types';
import { BRAZILIAN_FOODS } from '../data/mockData';
import { Search, Filter, Plus, Check, Sparkles } from 'lucide-react';

interface FoodDatabaseViewProps {
  onAddMeal: (meal: { type: MealType; name: string; calories: number; netCarbs: number; protein: number; fat: number }) => void;
}

const CATEGORIES = [
  'Todos',
  'Carnes',
  'Ovos',
  'Queijos',
  'Presunto',
  'Verduras',
  'Bebidas',
];

export const FoodDatabaseView: React.FC<FoodDatabaseViewProps> = ({ onAddMeal }) => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [selectedMealType, setSelectedMealType] = useState<MealType>('almoço');
  const [addedItemName, setAddedItemName] = useState<string | null>(null);

  const filteredFoods = BRAZILIAN_FOODS.filter((food) => {
    const matchesCategory = selectedCategory === 'Todos' || food.category === selectedCategory;
    const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleQuickAdd = (food: FoodItem) => {
    onAddMeal({
      type: selectedMealType,
      name: food.name,
      calories: food.calories,
      netCarbs: food.netCarbs,
      protein: food.protein,
      fat: food.fat,
    });
    setAddedItemName(food.name);
    setTimeout(() => setAddedItemName(null), 1500);
  };

  return (
    <div className="space-y-4 text-slate-100">
      {/* Strict Zero Carb Banner */}
      <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-3xl p-4 shadow-xl flex items-start gap-3">
        <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Dieta Zero Carb Estrita
            </span>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Verduras 0g Carbo Líquido
            </span>
          </div>
          <h3 className="text-sm font-extrabold text-slate-100 mt-1">Alimentos 100% Permitidos (0.0g de Carboidrato)</h3>
          <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
            Permitido exclusivamente: <strong>Ovos, Carnes (boi, frango, peixe, porco), Queijos, Presunto, Café com Adoçante e Verduras com Zero Carbo Líquido</strong> (Rúcula, Agrião, Espinafre, Alfaces, Couve na banha, Escarola, Acelga).
          </p>
        </div>
      </div>

      {/* Search Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-base text-slate-100">Tabela de Alimentos Permitidos</h2>
            <p className="text-xs text-slate-400">Carnes, Ovos, Queijos, Presunto, Verduras e Café • Rigorosamente 0g Carbo</p>
          </div>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full">
            {BRAZILIAN_FOODS.length} Alimentos 0g
          </span>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por picanha, ovo, abobrinha, castanha..."
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap border transition ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                  : 'bg-slate-800/80 text-slate-400 border-slate-700/80 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Target Meal Selection Bar */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl px-3 py-2 flex items-center justify-between text-xs">
        <span className="text-slate-400 font-medium">Registrar no Diário para:</span>
        <div className="flex gap-1">
          {(['café', 'almoço', 'jantar', 'lanche'] as MealType[]).map((meal) => (
            <button
              key={meal}
              onClick={() => setSelectedMealType(meal)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold capitalize border ${
                selectedMealType === meal
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                  : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              {meal}
            </button>
          ))}
        </div>
      </div>

      {/* Food Cards Grid */}
      <div className="space-y-2.5">
        {filteredFoods.map((food) => {
          const isAdded = addedItemName === food.name;
          return (
            <div
              key={food.id}
              className="bg-slate-900/90 border border-slate-800/80 hover:border-slate-700 rounded-2xl p-3.5 flex items-center justify-between gap-3 transition shadow-md"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-emerald-400">
                    {food.category}
                  </span>
                  <span className="text-[10px] text-slate-400">{food.servingSize}</span>
                </div>
                <h3 className="font-bold text-xs text-slate-100 truncate">{food.name}</h3>

                <div className="flex items-center gap-3 mt-1.5 text-[11px]">
                  <span className="font-extrabold text-emerald-400">
                    {food.netCarbs}g <span className="font-normal text-[10px] text-slate-400">carbo liq</span>
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-amber-300 font-semibold">{food.calories} kcal</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-cyan-300 font-medium">{food.protein}g prot</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-rose-300 font-medium">{food.fat}g gord</span>
                </div>
              </div>

              <button
                onClick={() => handleQuickAdd(food)}
                className={`p-2.5 rounded-xl text-xs font-bold transition shrink-0 flex items-center justify-center gap-1 ${
                  isAdded
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}
                title="Adicionar ao Diário"
              >
                {isAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </button>
            </div>
          );
        })}

        {filteredFoods.length === 0 && (
          <div className="text-center py-8 text-slate-400 bg-slate-900 rounded-2xl border border-slate-800">
            Nenhum alimento encontrado para "{searchQuery}".
          </div>
        )}
      </div>
    </div>
  );
};
