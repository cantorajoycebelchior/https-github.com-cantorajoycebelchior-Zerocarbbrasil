import React, { useState } from 'react';
import { LOW_CARB_RECIPES } from '../data/mockData';
import { Recipe, MealType } from '../types';
import { Clock, ChefHat, Plus, Check, Search, X, Sparkles, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RecipesViewProps {
  onAddMeal: (meal: { type: MealType; name: string; calories: number; netCarbs: number; protein: number; fat: number }) => void;
}

const RECIPE_CATEGORIES = [
  'Todas',
  'Café da Manhã',
  'Almoço e Jantar',
  'Lanches',
];

export const RecipesView: React.FC<RecipesViewProps> = ({ onAddMeal }) => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedMealType, setSelectedMealType] = useState<MealType>('lanche');
  const [addedSuccess, setAddedSuccess] = useState(false);

  const filteredRecipes = LOW_CARB_RECIPES.filter((r) => {
    const matchesCategory = selectedCategory === 'Todas' || r.category === selectedCategory;
    const matchesSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleAddMeal = (recipe: Recipe) => {
    onAddMeal({
      type: selectedMealType,
      name: recipe.title,
      calories: recipe.calories,
      netCarbs: recipe.netCarbs,
      protein: recipe.protein,
      fat: recipe.fat,
    });
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 1200);
  };

  return (
    <div className="space-y-4 text-slate-100">
      {/* Search Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                100% Zero Carb (0.0g)
              </span>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                50 Receitas Liberadas
              </span>
            </div>
            <h2 className="font-black text-base text-slate-100 mt-1">50 Receitas Rigorosamente Zero Carboidrato</h2>
            <p className="text-xs text-slate-300">
              Ovos, Carnes (Boi, Frango, Peixe, Porco), Queijos, Presunto e Verduras Zero Carbo Líquido. Nem 1g de carboidrato!
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full whitespace-nowrap">
            {LOW_CARB_RECIPES.length} Receitas 0g
          </span>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar entre 50 receitas (picanha, tilápia, salmão, omelete, torresmo, rúcula...)"
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {RECIPE_CATEGORIES.map((cat) => (
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


      {/* Recipe List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            onClick={() => setSelectedRecipe(recipe)}
            className="bg-slate-900/90 border border-slate-800/80 hover:border-emerald-500/50 rounded-2xl p-4 cursor-pointer transition shadow-lg space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {recipe.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  {recipe.prepTime}
                </span>
              </div>

              <h3 className="font-extrabold text-sm text-slate-100 leading-snug">{recipe.title}</h3>

              <div className="flex items-center gap-2 mt-2 text-xs font-semibold">
                <span className="text-emerald-400 font-extrabold">{recipe.netCarbs}g carbo liq</span>
                <span className="text-slate-600">•</span>
                <span className="text-amber-400">{recipe.calories} kcal</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400 font-normal">{recipe.servings} porção</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs text-emerald-400 font-bold">
              <span>Ver Ingredientes e Preparo</span>
              <ChefHat className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      {/* Recipe Details Modal */}
      <AnimatePresence>
        {selectedRecipe && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-3 sm:p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl text-slate-100 overflow-hidden space-y-4 my-auto"
            >
              <div className="flex items-start justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-1 inline-block">
                    {selectedRecipe.category}
                  </span>
                  <h2 className="font-extrabold text-lg text-slate-100 leading-snug">{selectedRecipe.title}</h2>
                  <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {selectedRecipe.prepTime}
                    </span>
                    <span>•</span>
                    <span className="text-emerald-400 font-extrabold">{selectedRecipe.netCarbs}g Net Carbs</span>
                    <span>•</span>
                    <span className="text-amber-400 font-bold">{selectedRecipe.calories} kcal</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedRecipe(null)}
                  className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Macro Grid */}
              <div className="grid grid-cols-4 gap-2 text-center py-1">
                <div className="bg-emerald-950/40 border border-emerald-800/60 p-2 rounded-xl">
                  <span className="text-xs font-black text-emerald-400 block">{selectedRecipe.netCarbs}g</span>
                  <span className="text-[9px] uppercase tracking-wider text-slate-400">Carb. Liq</span>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-2 rounded-xl">
                  <span className="text-xs font-bold text-amber-400 block">{selectedRecipe.calories}</span>
                  <span className="text-[9px] uppercase tracking-wider text-slate-400">Kcal</span>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-2 rounded-xl">
                  <span className="text-xs font-bold text-cyan-400 block">{selectedRecipe.protein}g</span>
                  <span className="text-[9px] uppercase tracking-wider text-slate-400">Proteína</span>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-2 rounded-xl">
                  <span className="text-xs font-bold text-rose-400 block">{selectedRecipe.fat}g</span>
                  <span className="text-[9px] uppercase tracking-wider text-slate-400">Gordura</span>
                </div>
              </div>

              {/* Ingredients */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-300">Ingredientes:</h4>
                <ul className="text-xs text-slate-300 space-y-1.5 bg-slate-950 p-3 rounded-2xl border border-slate-800">
                  {selectedRecipe.ingredients.map((ing, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Steps */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-300">Modo de Preparo:</h4>
                <ol className="text-xs text-slate-300 space-y-2 bg-slate-950 p-3 rounded-2xl border border-slate-800">
                  {selectedRecipe.steps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-emerald-400 font-extrabold shrink-0">{idx + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Log to Diary */}
              <div className="pt-2 border-t border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Adicionar ao Diário em:</span>
                  <div className="flex gap-1">
                    {(['café', 'almoço', 'jantar', 'lanche'] as MealType[]).map((meal) => (
                      <button
                        key={meal}
                        onClick={() => setSelectedMealType(meal)}
                        className={`px-2 py-1 rounded-lg text-[10px] font-bold capitalize border ${
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

                <button
                  onClick={() => handleAddMeal(selectedRecipe)}
                  disabled={addedSuccess}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold py-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition shadow-lg shadow-emerald-500/20"
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-slate-950" />
                      <span>Adicionado com Sucesso!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Adicionar ao Diário</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
