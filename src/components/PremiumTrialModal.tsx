import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Crown, Check, Sparkles, Download, X, Shield, Zap, FileText, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface PremiumTrialModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
}

export const PremiumTrialModal: React.FC<PremiumTrialModalProps> = ({ isOpen, onClose, user }) => {
  const [showReportPreview, setShowReportPreview] = useState(false);

  if (!isOpen) return null;

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-3 sm:p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg bg-slate-900 border border-amber-500/30 rounded-3xl p-5 shadow-2xl text-slate-100 overflow-hidden space-y-4 my-auto"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-amber-500/30 to-emerald-500/30 border border-amber-500/50 text-amber-300">
              <Crown className="w-6 h-6 fill-amber-400/20" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 block">
                Zero Carb Brasil • Assinatura Premium
              </span>
              <h2 className="font-black text-lg text-slate-50">Desbloqueie Todo o Poder da IA</h2>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 5-Day Free Trial Active Status */}
        <div className="bg-gradient-to-r from-emerald-950/80 to-slate-900 border border-emerald-500/40 p-3.5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
            <div>
              <span className="text-xs font-bold text-slate-100 block">Seu Teste Grátis de 5 Dias está Ativo!</span>
              <span className="text-[11px] text-emerald-300">Aproveite todos os recursos premium sem restrições.</span>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Comparativo de Planos:
          </span>

          <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden text-xs">
            <div className="grid grid-cols-3 p-2.5 bg-slate-900/80 font-bold text-slate-400 text-[11px]">
              <span>Recurso</span>
              <span className="text-center">Plano Grátis</span>
              <span className="text-center text-amber-400">Plano Premium</span>
            </div>

            {[
              { feat: 'Perguntas para IA Nutricional', free: '5 por dia', pro: 'Ilimitado 24/7' },
              { feat: 'Scanner de Rótulo OCR', free: '10 por mês', pro: 'Ilimitado' },
              { feat: 'Catálogo de Receitas', free: '20 receitas', pro: '+200 & Novas Semanais' },
              { feat: 'Cardápios Personalizados', free: 'Padrão', pro: 'Totalmente Ajustado' },
              { feat: 'Relatório para Médico/Nutri', free: 'Não', pro: 'Exportação em PDF' },
              { feat: 'Acompanhamento Especialista', free: 'Não', pro: 'Suporte Direto' },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-3 p-2.5 border-t border-slate-900 text-[11px] items-center">
                <span className="font-medium text-slate-300">{row.feat}</span>
                <span className="text-center text-slate-500">{row.free}</span>
                <span className="text-center font-bold text-emerald-400">{row.pro}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Plan Box */}
        <div className="bg-slate-950 border border-amber-500/40 p-4 rounded-2xl text-center space-y-2">
          <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
            Assinatura Mensal Acessível
          </span>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-3xl font-black text-slate-50">R$ 29,90</span>
            <span className="text-xs text-slate-400">/mês após 5 dias grátis</span>
          </div>
          <p className="text-[11px] text-slate-400">Cancele quando quiser diretamente pelo app, sem taxa ou fidelidade.</p>
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-1">
          <button
            onClick={() => setShowReportPreview(true)}
            className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 border border-slate-700 transition"
          >
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>Gerar / Exportar Relatório em PDF para Nutricionista</span>
          </button>

          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-emerald-500 to-amber-500 hover:from-emerald-400 hover:to-amber-400 text-slate-950 font-black py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-xl shadow-amber-500/10"
          >
            <span>Continuar Aproveitando Período Grátis</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Report Preview Modal Overlay */}
        {showReportPreview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 print:p-0">
            <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 text-slate-100 space-y-4 print:bg-white print:text-black print:border-none">
              <div className="flex items-center justify-between border-b border-slate-800 print:border-slate-300 pb-3">
                <div>
                  <h3 className="font-extrabold text-base text-emerald-400 print:text-emerald-700">
                    Relatório Nutricional Metrobólico • Zero Carb Brasil
                  </h3>
                  <p className="text-xs text-slate-400 print:text-slate-600">Usuário: {user.name} • Data: {new Date().toLocaleDateString('pt-BR')}</p>
                </div>
                <button onClick={() => setShowReportPreview(false)} className="print:hidden text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div className="grid grid-cols-2 gap-2 bg-slate-950 print:bg-slate-100 p-3 rounded-xl">
                  <div><strong>Objetivo:</strong> {user.goal}</div>
                  <div><strong>Meta Net Carbs:</strong> {user.targetNetCarbs}g/dia</div>
                  <div><strong>Peso Inicial:</strong> {user.currentWeight + 1.8} kg</div>
                  <div><strong>Peso Atual:</strong> {user.currentWeight} kg (-1.8kg)</div>
                </div>

                <div className="bg-slate-950 print:bg-slate-100 p-3 rounded-xl leading-relaxed">
                  <strong>Resumo de Adesão:</strong> O paciente manteve consumo médio de 24g de carboidratos líquidos nos últimos 7 dias com ótima hidratação (&gt;2.5L/dia) e desinflamação sem intercorrências.
                </div>
              </div>

              <div className="flex gap-2 print:hidden">
                <button
                  onClick={() => setShowReportPreview(false)}
                  className="w-1/2 bg-slate-800 text-slate-300 py-2.5 rounded-xl text-xs font-semibold"
                >
                  Fechar
                </button>
                <button
                  onClick={handlePrintReport}
                  className="w-1/2 bg-emerald-500 text-slate-950 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>Imprimir / Salvar PDF</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
