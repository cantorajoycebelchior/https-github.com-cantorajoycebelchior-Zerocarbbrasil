import React, { useState } from 'react';
import { Lock, Crown, Sparkles, CheckCircle, ShieldCheck, Phone, CreditCard, ArrowRight, X } from 'lucide-react';
import { UserProfile } from '../types';
import { saveUserProfileToFirestore } from '../lib/firebase';

interface PaywallModalProps {
  isOpen: boolean;
  onClose?: () => void;
  userProfile: UserProfile;
  onSubscribeSuccess: () => void;
  isExpired?: boolean;
}

export const PaywallModal: React.FC<PaywallModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onSubscribeSuccess,
  isExpired = false
}) => {
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSimulatePayment = async () => {
    setProcessing(true);
    setTimeout(async () => {
      setProcessing(false);
      setPaymentSuccess(true);

      if (userProfile.uid) {
        await saveUserProfileToFirestore(userProfile.uid, {
          isSubscribed: true,
          isPremium: true
        });
      }

      setTimeout(() => {
        onSubscribeSuccess();
      }, 1500);
    }, 1200);
  };

  const handleOpenWhatsappSupport = () => {
    const text = encodeURIComponent(`Olá! Preciso de ajuda com a minha assinatura no app Zero Carb Brasil. Meu e-mail: ${userProfile.email || userProfile.name}`);
    window.open(`https://wa.me/5517981897872?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-amber-500/40 rounded-3xl w-full max-w-md p-6 relative shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200 my-auto text-slate-100">
        {!isExpired && onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-100 bg-slate-800/80 rounded-xl transition"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Crown Badge */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-amber-500/20 font-black">
            {isExpired ? <Lock className="w-8 h-8" /> : <Crown className="w-8 h-8" />}
          </div>

          <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-bold rounded-full border border-amber-500/40 uppercase tracking-wider inline-block">
            {isExpired ? 'Período Grátis de 5 Dias Concluído' : 'Assinatura Premium Zero Carb VIP'}
          </span>

          <h3 className="text-2xl font-black text-slate-100 mt-1">
            {isExpired ? 'Seu teste grátis expirou!' : 'Desbloqueie Acesso Ilimitado'}
          </h3>

          <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">
            {isExpired
              ? 'Seus 5 dias de degustação gratuita chegaram ao fim. Para continuar registrando seu diário, suas medidas semanais e gerando cardápios, assine o plano completo.'
              : 'Garanta sincronização vitalícia em nuvem Firebase, acompanhamento semanal de medidas e receitas exclusivas.'}
          </p>
        </div>

        {/* Included Benefits */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2.5">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">O que você recebe:</p>
          {[
            'Evolução completa: Peso e Medidas semana a semana com gráfico',
            'Sincronização ilimitada de dados no Firebase Firestore',
            'Diário Alimentar livre com calculador de macros',
            'Consultor de alimentos com carboidratos ocultos',
            'Suporte prioritário via WhatsApp com nutricionistas'
          ].map((benefit, idx) => (
            <div key={idx} className="flex items-start space-x-2.5 text-xs text-slate-200">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>

        {/* Special Offer Pricing Box */}
        <div className="bg-gradient-to-r from-amber-950/60 to-slate-900 border border-amber-500/40 rounded-2xl p-4 text-center space-y-1">
          <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Oferta Exclusiva de Lançamento</span>
          <div className="flex items-baseline justify-center space-x-1.5">
            <span className="text-slate-500 line-through text-sm font-semibold">R$ 97,00</span>
            <span className="text-3xl font-black text-emerald-400">R$ 29,90</span>
            <span className="text-xs text-slate-400">/ único</span>
          </div>
          <p className="text-[11px] text-slate-400">Sem mensalidades recorrentes • Acesso completo vitalício</p>
        </div>

        {paymentSuccess ? (
          <div className="bg-emerald-950 border border-emerald-500 rounded-2xl p-4 text-center space-y-2 text-emerald-300">
            <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
            <h4 className="font-bold text-base">Assinatura Ativada com Sucesso!</h4>
            <p className="text-xs">Bem-vindo(a) ao Zero Carb Brasil VIP. Redirecionando...</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            <button
              onClick={handleSimulatePayment}
              disabled={processing}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-slate-950 font-black text-sm rounded-xl transition shadow-xl shadow-emerald-500/25 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <CreditCard className="w-5 h-5" />
              <span>{processing ? 'Ativando Assinatura...' : 'Ativar Acesso VIP (R$ 29,90)'}</span>
            </button>

            <button
              onClick={handleOpenWhatsappSupport}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-emerald-400 font-bold text-xs rounded-xl transition border border-emerald-500/30 flex items-center justify-center space-x-2"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Assinar ou Tirar Dúvidas no WhatsApp</span>
            </button>
          </div>
        )}

        <div className="text-center">
          <p className="text-[10px] text-slate-500">
            Garantia incondicional de 7 dias • Pagamento 100% seguro via Firebase & Stripe
          </p>
        </div>
      </div>
    </div>
  );
};
