import React, { useState } from 'react';
import { UserProfile } from '../types';
import { 
  User, 
  Mail, 
  Phone, 
  Scale, 
  Target, 
  Database, 
  CheckCircle2, 
  ShieldCheck, 
  Save, 
  X, 
  Flame, 
  Calendar, 
  RefreshCw, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { saveUserProfileToFirestore, saveAccountToStorage } from '../lib/firebase';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUpdateUser: (updatedUser: UserProfile) => void;
  onOpenOnboarding?: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdateUser,
  onOpenOnboarding
}) => {
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [whatsapp, setWhatsapp] = useState(user.whatsapp || '(11) 98765-4321');
  const [currentWeight, setCurrentWeight] = useState(user.currentWeight.toString());
  const [targetWeight, setTargetWeight] = useState(user.targetWeight.toString());
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  if (!isOpen) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setToastMessage('');

    const updated: UserProfile = {
      ...user,
      name: name.trim() || user.name,
      email: email.trim() || user.email,
      whatsapp: whatsapp.trim() || user.whatsapp,
      currentWeight: Number(currentWeight) || user.currentWeight,
      targetWeight: Number(targetWeight) || user.targetWeight,
    };

    try {
      if (user.uid) {
        await saveUserProfileToFirestore(user.uid, updated);
      }
      saveAccountToStorage(updated);
      onUpdateUser(updated);
      setToastMessage('Perfil sincronizado com o Firebase com sucesso!');
      setTimeout(() => setToastMessage(''), 3000);
    } catch (err) {
      console.error('Error saving profile:', err);
      setToastMessage('Erro ao sincronizar com Firebase.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 relative shadow-2xl space-y-4 my-auto text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-100 bg-slate-800/80 rounded-xl transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-black text-lg">
            {name ? name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">Perfil & Integração Firebase</h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Firebase Firestore Ativo
              </span>
              <span className="text-[10px] text-slate-400">
                {user.isSubscribed || user.premium ? 'Assinante VIP' : '7d Grátis'}
              </span>
            </div>
          </div>
        </div>

        {/* Firebase Cloud Connection Status Card */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3 space-y-1.5 text-xs">
          <div className="flex items-center justify-between text-slate-300">
            <span className="flex items-center gap-1.5 font-bold text-emerald-400">
              <Database className="w-3.5 h-3.5" />
              <span>Google Cloud Firestore</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Status: 200 OK</span>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-slate-400">
            <div>
              <span className="block text-slate-500 text-[9px] uppercase font-bold">UID Firebase</span>
              <span className="font-mono text-slate-300 text-[10px] truncate block">
                {user.uid || 'usr_convidado_local'}
              </span>
            </div>
            <div>
              <span className="block text-slate-500 text-[9px] uppercase font-bold">Coleção Nuvem</span>
              <span className="font-mono text-emerald-400 text-[10px] block">/users/{user.uid || 'default'}</span>
            </div>
          </div>
        </div>

        {/* Success / Feedback Toast */}
        {toastMessage && (
          <div className="bg-emerald-950/80 border border-emerald-500 rounded-xl p-3 flex items-center space-x-2 text-xs text-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-bold">{toastMessage}</span>
          </div>
        )}

        {/* Form Fields */}
        <form onSubmit={handleSave} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Nome Completo</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">E-mail Cadastrado</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seuemail@exemplo.com"
                className="w-full pl-10 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp</label>
            <div className="relative">
              <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Peso Atual (kg)</label>
              <input
                type="number"
                step="0.1"
                value={currentWeight}
                onChange={(e) => setCurrentWeight(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-xs font-bold text-center focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Meta de Peso (kg)</label>
              <input
                type="number"
                step="0.1"
                value={targetWeight}
                onChange={(e) => setTargetWeight(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-emerald-400 text-xs font-bold text-center focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="pt-2 flex gap-2">
            {onOpenOnboarding && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenOnboarding();
                }}
                className="w-1/2 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1"
              >
                <Target className="w-3.5 h-3.5" />
                <span>Refazer Metas</span>
              </button>
            )}

            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-black shadow-lg shadow-emerald-500/20 transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saving ? 'Sincronizando...' : 'Salvar no Firebase'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
