import React from 'react';
import { UserProfile } from '../types';
import { Flame, Crown, ShieldCheck, UserCheck, LogIn, Users, LogOut, ChevronDown } from 'lucide-react';
import { isTrialExpired, getRemainingDaysInTrial } from '../lib/firebase';

interface HeaderProps {
  user: UserProfile;
  onOpenProfile: () => void;
  onOpenSpecs: () => void;
  onOpenPremium: () => void;
  onOpenAuth: () => void;
  onOpenAdmin?: () => void;
  onOpenUserSwitcher?: () => void;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onOpenProfile,
  onOpenSpecs,
  onOpenPremium,
  onOpenAuth,
  onOpenAdmin,
  onOpenUserSwitcher,
  onLogout
}) => {
  const daysLeft = getRemainingDaysInTrial(user);
  const expired = isTrialExpired(user);
  const firstName = user.name ? user.name.split(' ')[0] : 'Visitante';

  return (
    <header className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur-md border-b border-slate-900 px-4 py-3">
      <div className="max-w-xl mx-auto flex items-center justify-between gap-2">
        {/* App Logo & Greeting */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-black text-sm shadow-md shadow-emerald-500/10">
            ZC
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-extrabold text-sm tracking-tight text-slate-100">Zero Carb Brasil</h1>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {user.isSubscribed || user.premium ? 'VIP' : '7d Grátis'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 flex items-center gap-1">
              <span>{user.uid && user.name ? `Olá, ${firstName}` : 'Bem-vindo(a)'}</span>
              <span className="text-slate-600">•</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-0.5">
                <Flame className="w-3 h-3 text-emerald-400 fill-emerald-400/30" />
                {user.streakDays || 1}d
              </span>
            </p>
          </div>
        </div>

        {/* Right Action Chips */}
        <div className="flex items-center gap-1.5">
          {/* Admin Dashboard Button */}
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="p-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30 transition"
              title="Painel Administrativo Firebase"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>
          )}

          {/* User Account Switcher / Auth Button */}
          {user.uid ? (
            <button
              onClick={onOpenUserSwitcher || onOpenAuth}
              className="flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-emerald-300 transition"
              title="Gerenciar Usuários / Trocar de Conta"
            >
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span className="max-w-[70px] truncate">{firstName}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-xl bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition shadow-sm"
              title="Entrar ou Cadastrar com E-mail e WhatsApp"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Login</span>
            </button>
          )}

          {/* Trial / Premium Badge */}
          <button
            onClick={onOpenPremium}
            className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-xl transition border ${
              user.isSubscribed || user.premium
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : expired
                ? 'bg-red-500/20 text-red-300 border-red-500/40 animate-pulse'
                : 'bg-gradient-to-r from-amber-500/20 to-emerald-500/20 border-amber-500/40 text-amber-300'
            }`}
            title="Ver Status do Acesso"
          >
            <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400/30" />
            <span>
              {user.isSubscribed || user.premium
                ? 'VIP'
                : expired
                ? 'Expirado'
                : `${daysLeft}d grátis`}
            </span>
          </button>

          {/* Profile Trigger */}
          <button
            onClick={onOpenProfile}
            className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-slate-100 hover:border-slate-600 transition"
            title="Perfil & Metas"
          >
            <UserCheck className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
