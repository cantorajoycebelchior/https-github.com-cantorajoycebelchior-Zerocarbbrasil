import React, { useState } from 'react';
import { X, Code2, Database, Shield, Server, Cpu, DollarSign, Layers, Sparkles, FileText, CheckCircle2, Target, Users, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';

interface ArchitectureDocModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureDocModal: React.FC<ArchitectureDocModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'prd' | 'architecture'>('prd');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-3 sm:p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-3xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-slate-100 overflow-y-auto space-y-5 my-auto"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 block">
                Zero Carb Brasil • Documentação Oficial
              </span>
              <h2 className="font-black text-xl text-slate-50">
                {activeTab === 'prd' ? 'PRD • Documento de Requisitos do Projeto' : 'Arquitetura de Software & Especificação Técnica'}
              </h2>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-1 bg-slate-950 rounded-2xl border border-slate-800 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('prd')}
            className={`py-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
              activeTab === 'prd' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>PRD do Projeto (Escopo & Regras)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('architecture')}
            className={`py-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
              activeTab === 'architecture' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Especificação Técnica & Cloud</span>
          </button>
        </div>

        {/* TAB 1: PRD DO PROJETO */}
        {activeTab === 'prd' && (
          <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
            <div className="bg-slate-950 p-4 rounded-2xl border border-emerald-500/30 space-y-2">
              <h3 className="text-sm font-extrabold text-emerald-400 flex items-center gap-1.5">
                <Target className="w-4 h-4" />
                <span>1. Visão Geral e Proposta de Valor</span>
              </h3>
              <p>
                O <strong>Zero Carb Brasil</strong> é o ecossistema definitivo para o público brasileiro que segue a alimentação estritamente carnívora, cetogênica sem carboidratos ou de reversão de resistência à insulina. O aplicativo garante um ambiente livre de produtos com carboidratos ocultos, fornecendo ferramentas pioneiras baseadas em Inteligência Artificial.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1.5">
                <h4 className="font-extrabold text-slate-100 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Scanner de Produtos por IA</span>
                </h4>
                <p className="text-[11px] text-slate-400">
                  Leitura instantânea de tabelas nutricionais e ingredientes por visão computacional (Gemini 2.5 Flash), desmascarando maltodextrina, amidos e xaropes com veredicto binário 100% Zero Carb.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1.5">
                <h4 className="font-extrabold text-slate-100 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Consulta IA com 5 Períodos</span>
                </h4>
                <p className="text-[11px] text-slate-400">
                  Pesquisa de qualquer alimento com teor de carboidratos por 100g e sugestões personalizadas para Café da Manhã, Almoço, Lanche, Jantar e Ceia.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1.5">
                <h4 className="font-extrabold text-slate-100 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Treinos Semanais em Vídeo PT-BR</span>
                </h4>
                <p className="text-[11px] text-slate-400">
                  Grade de segunda a domingo com exercícios para fazer em casa, vídeos explicativos em português com postura correta e integração de queima calórica no diário.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1.5">
                <h4 className="font-extrabold text-slate-100 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Mais de 50 Receitas Zero Carb</span>
                </h4>
                <p className="text-[11px] text-slate-400">
                  Acervo rico com carnes bovinas, peixes, aves, suínos e ovos. Nenhuma receita ultrapassa 0g a 1g de carboidratos líquidos.
                </p>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <h3 className="text-sm font-extrabold text-emerald-400">2. Regra de Ouro dos Alimentos Permitidos</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
                <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="font-bold text-slate-100 block">🥩 Carnes de Boi</span>
                  <span className="text-slate-400">Picanha, costela, fraldinha, alcatra (0g carb)</span>
                </div>
                <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="font-bold text-slate-100 block">🍗 Aves</span>
                  <span className="text-slate-400">Frango, sobrecoxa com pele, asas (0g carb)</span>
                </div>
                <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="font-bold text-slate-100 block">🐟 Peixes</span>
                  <span className="text-slate-400">Salmão, tilápia, sardinha em azeite (0g carb)</span>
                </div>
                <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="font-bold text-slate-100 block">🥓 Porco & Presunto</span>
                  <span className="text-slate-400">Bacon artesanal, presunto cru sem amido</span>
                </div>
                <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="font-bold text-slate-100 block">🍳 Ovos & Queijos</span>
                  <span className="text-slate-400">Ovos caipiras, parmesão curado (0g carb)</span>
                </div>
                <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="font-bold text-slate-100 block">🥬 Verduras 0g</span>
                  <span className="text-slate-400">Rúcula, agrião, espinafre refogado</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-emerald-500/30 space-y-2">
              <h3 className="text-sm font-extrabold text-emerald-400">3. Protocolo Clínico de 30 Dias (Regra de Ouro)</h3>
              <p>
                A dieta Zero Carb estrita <strong>só pode ser seguida por no máximo 30 dias consecutivos</strong>. Ao atingir os 30 dias, é mandatório realizar uma <strong>pausa de no mínimo 30 dias</strong> em dieta de manutenção balanceada antes de repetir um novo ciclo. O app bloqueia repetições precipitadas e orienta a fase de manutenção.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <h3 className="text-sm font-extrabold text-emerald-400">4. Galeria de Fotos da Transformação (Antes e Depois)</h3>
              <p>
                Permite ao usuário subir a <strong>Foto do Antes</strong> (início) e a <strong>Foto do Depois</strong> (evolução), com compressão local, registro de datas, pesos comparativos e cálculo automático de quilos eliminados.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <h3 className="text-sm font-extrabold text-emerald-400">5. Modelo de Negócio & Teste Grátis</h3>
              <p>
                Todo novo usuário recebe <strong>7 dias de Teste Grátis irrestrito</strong> para testar a IA, treinos e cardápios. Após o período, a assinatura do plano mensal é de <strong>R$ 29,90/mês</strong>, gerenciável pelo Painel Administrativo.
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: ESPECIFICAÇÃO TÉCNICA */}
        {activeTab === 'architecture' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-extrabold text-emerald-400 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                <span>1. Arquitetura Proposta (Full-Stack & Cloud Services)</span>
              </h3>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2 leading-relaxed">
                <p>
                  <strong>Frontend:</strong> React 19 + TypeScript + Tailwind CSS com microinterações via Motion e anéis Apple Fitness style.
                </p>
                <p>
                  <strong>Database & Auth:</strong> Google Cloud Firestore (`users`, `dailyLogs`, `weeklyMeasurements`) + Firebase Auth com vault local resiliente.
                </p>
                <p>
                  <strong>IA & Visão Computacional:</strong> Google Gemini 2.5 Flash API para Chat Nutricional, OCR de Rótulos em Português e busca de carboidratos.
                </p>
                <p>
                  <strong>Backend Proxy:</strong> Express (Node.js) intermediando chamadas à API Gemini com proteção de chaves e tratamento de erros 503.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-extrabold text-emerald-400 flex items-center gap-2">
                <Database className="w-4 h-4" />
                <span>2. Coleções do Banco de Dados Firestore</span>
              </h3>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs font-mono text-emerald-300 space-y-2">
                <p className="text-slate-300">
                  • <strong>users:</strong> uid, name, email, whatsapp, goal, currentWeight, targetWeight, isPremium, trialEndsAt, isOnboarded, streakDays.
                </p>
                <p className="text-slate-300">
                  • <strong>dailyLogs:</strong> date, waterIntakeMl, meals (name, type, calories, netCarbs, protein, fat).
                </p>
                <p className="text-slate-300">
                  • <strong>weeklyMeasurements:</strong> weekLabel, date, weightKg, chestCm, waistCm, abdomenCm, hipsCm.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-extrabold text-emerald-400 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                <span>3. Custo Estimado por Usuário Ativo (MAU)</span>
              </h3>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2">
                <div className="grid grid-cols-2 gap-2 text-center font-bold">
                  <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
                    <span className="text-emerald-400 block text-sm">R$ 0,85 / mês</span>
                    <span className="text-[10px] text-slate-400 font-normal">Custo Infra + Gemini API por Usuário</span>
                  </div>
                  <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
                    <span className="text-amber-400 block text-sm">R$ 29,90 / mês</span>
                    <span className="text-[10px] text-slate-400 font-normal">Preço da Assinatura Premium</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400">
                  Com uma margem bruta superior a 95%, o modelo de 7 dias grátis seguido de R$ 29,90/mês oferece alto LTV (Lifetime Value) e sustentabilidade financeira.
                </p>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold py-3 rounded-2xl text-xs transition shadow-md shadow-emerald-500/20"
        >
          Fechar Visualização
        </button>
      </motion.div>
    </div>
  );
};
