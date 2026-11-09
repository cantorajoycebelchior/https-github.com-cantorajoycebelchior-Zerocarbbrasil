import React, { useState } from 'react';
import { Search, AlertTriangle, AlertCircle, Info, ArrowDown, ChevronRight, ShieldAlert, Sparkles, Filter, X } from 'lucide-react';
import { HighCarbFoodItem } from '../types';
import { HIGH_CARB_FOODS } from '../data/mockData';

export const HighCarbFoodsView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedGI, setSelectedGI] = useState<string>('Todos');
  const [selectedFoodDetail, setSelectedFoodDetail] = useState<HighCarbFoodItem | null>(null);

  const categories = ['Todos', 'Pães e Massas', 'Grãos e Cereais', 'Tubérculos e Raízes', 'Frutas e Doces', 'Bebidas Açucaradas', 'Ultraprocessados'];

  const filteredFoods = HIGH_CARB_FOODS.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          food.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          food.impactNote.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || food.category === selectedCategory;
    const matchesGI = selectedGI === 'Todos' || food.glycemicIndex === selectedGI;
    return matchesSearch && matchesCategory && matchesGI;
  }).sort((a, b) => b.netCarbs - a.netCarbs);

  const getGiBadgeColor = (gi: string) => {
    switch (gi) {
      case 'Muito Alto':
        return 'bg-red-500/20 text-red-400 border-red-500/40';
      case 'Alto':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      case 'Médio':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40';
      default:
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Banner / Header */}
      <div className="bg-gradient-to-r from-red-950/60 via-amber-950/40 to-slate-900 border border-red-900/40 rounded-2xl p-5 relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-start space-x-3.5 relative z-10">
          <div className="p-3 bg-red-500/15 border border-red-500/30 rounded-xl text-red-400 shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 text-xs font-bold bg-red-500/20 text-red-300 rounded-full border border-red-500/30 uppercase tracking-wider">
                Consulta de Carboidratos
              </span>
              <span className="text-xs text-slate-400">• Dieta Zero Carb</span>
            </div>
            <h2 className="text-xl font-bold text-slate-100 mt-1">Guia de Alimentos com Carboidratos</h2>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Consulte aqui os alimentos ricos em amidos, açúcares e carboidratos ocultos. Na alimentação Zero Carb e Cetogênica Estrita, estes itens devem ser <strong>evitados</strong> para manter a cetose e a queima de gordura ativas.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats bar */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-center">
          <p className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">Itens Mapeados</p>
          <p className="text-lg font-bold text-red-400 mt-0.5">{HIGH_CARB_FOODS.length}</p>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-center">
          <p className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">Carbo Médio</p>
          <p className="text-lg font-bold text-amber-400 mt-0.5">24.5g / porção</p>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-center">
          <p className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">Recomendação Zero Carb</p>
          <p className="text-lg font-bold text-emerald-400 mt-0.5">Substituir / Evitar</p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar pão, tapioca, arroz, feijão, sucos, banana..."
            className="w-full pl-10 pr-4 py-3 bg-slate-900/90 border border-slate-800 focus:border-red-500 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Categories scrollable */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${
                selectedCategory === cat
                  ? 'bg-red-500/20 text-red-300 border-red-500/50 shadow-sm'
                  : 'bg-slate-900/70 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Food List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Exibindo {filteredFoods.length} alimentos com carboidratos
          </span>
          <span className="text-[11px] text-red-400/90 flex items-center gap-1 font-medium">
            <ArrowDown className="w-3 h-3" /> Ordenado por Carbo Líquido
          </span>
        </div>

        {filteredFoods.length === 0 ? (
          <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-8 text-center space-y-3">
            <AlertCircle className="w-10 h-10 text-slate-500 mx-auto" />
            <p className="text-slate-300 font-medium">Nenhum alimento com carboidrato encontrado para "{searchTerm}".</p>
            <p className="text-xs text-slate-500">Tente buscar por termos genéricos como "massa", "açúcar", "fruta" ou "bebida".</p>
          </div>
        ) : (
          filteredFoods.map(food => (
            <div
              key={food.id}
              onClick={() => setSelectedFoodDetail(food)}
              className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-red-900/50 rounded-xl p-4 transition-all cursor-pointer shadow-sm group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                    <span className="text-xs font-semibold text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/50">
                      {food.category}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getGiBadgeColor(food.glycemicIndex)}`}>
                      I.G. {food.glycemicIndex}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-red-300 transition-colors">
                    {food.name}
                  </h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    Porção: <span className="text-slate-300 font-medium">{food.servingSize}</span>
                  </p>
                </div>

                {/* Carbs badge */}
                <div className="text-right shrink-0 bg-red-950/40 border border-red-900/40 rounded-xl p-2.5 min-w-[95px]">
                  <p className="text-[10px] text-red-300 uppercase font-semibold">Carbo Líquido</p>
                  <p className="text-xl font-black text-red-400">{food.netCarbs}g</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Total: {food.totalCarbs}g</p>
                </div>
              </div>

              {/* Impact note preview */}
              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center space-x-1.5 text-amber-300/90 truncate pr-2">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                  <span className="truncate">{food.impactNote}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-red-400 transition-colors shrink-0" />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Detail for Food */}
      {selectedFoodDetail && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-red-900/60 rounded-2xl w-full max-w-lg p-6 space-y-5 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedFoodDetail(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-100 bg-slate-800/80 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3">
              <div className="p-3 bg-red-500/20 border border-red-500/40 rounded-xl text-red-400">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
                  Detalhes do Alimento com Carboidratos
                </span>
                <h3 className="text-xl font-bold text-slate-100">{selectedFoodDetail.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
              <div>
                <p className="text-[11px] text-slate-400">Carbo Líquido</p>
                <p className="text-2xl font-black text-red-400">{selectedFoodDetail.netCarbs}g</p>
              </div>
              <div>
                <p className="text-[11px] text-slate-400">Açúcares</p>
                <p className="text-2xl font-bold text-amber-400">{selectedFoodDetail.sugarGrams}g</p>
              </div>
              <div>
                <p className="text-[11px] text-slate-400">Índice Glicêmico</p>
                <span className={`inline-block mt-1 text-xs font-bold px-2 py-0.5 rounded border ${getGiBadgeColor(selectedFoodDetail.glycemicIndex)}`}>
                  {selectedFoodDetail.glycemicIndex}
                </span>
              </div>
            </div>

            <div className="space-y-2 bg-red-950/30 border border-red-900/40 rounded-xl p-4">
              <h4 className="text-sm font-bold text-red-300 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-400" />
                Por que evitar na Dieta Zero Carb / Cetogênica?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedFoodDetail.impactNote}
              </p>
            </div>

            <div className="space-y-2 bg-emerald-950/30 border border-emerald-900/40 rounded-xl p-4">
              <h4 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Substitutos Recomendados (0g Carbo)
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Em vez de <strong>{selectedFoodDetail.name}</strong>, opte por carnes grelhadas (picanha, patinho, peito de frango), ovos mexidos na manteiga, queijo curado, bacon crocante ou peixes ricos em ômega-3.
              </p>
            </div>

            <button
              onClick={() => setSelectedFoodDetail(null)}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl transition-colors text-sm"
            >
              Entendido / Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
