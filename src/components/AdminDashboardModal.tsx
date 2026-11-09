import React, { useState, useEffect } from 'react';
import { ShieldCheck, Users, Calendar, Crown, DollarSign, RefreshCw, Lock, Unlock, Phone, Mail, Search, X, CheckCircle, AlertTriangle } from 'lucide-react';
import { UserProfile } from '../types';
import { getAllUsersFromFirestore, saveUserProfileToFirestore } from '../lib/firebase';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  currentUser
}) => {
  const [usersList, setUsersList] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionSuccessMsg, setActionSuccessMsg] = useState('');

  const [pinInput, setPinInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinError, setPinError] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getAllUsersFromFirestore();
      setUsersList(data);
    } catch (err) {
      console.error('Error loading admin users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadData();
    }
  }, [isOpen, isAuthenticated]);

  if (!isOpen) return null;

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '7872' || pinInput === '1234' || pinInput === '2026') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  // Calculate Metrics
  const totalUsers = usersList.length;

  const todayISO = new Date().toISOString().split('T')[0];
  const newToday = usersList.filter((u) => {
    const created = u.createdAt || u.trialStartDate;
    return created && created.startsWith(todayISO);
  }).length;

  const premiumUsers = usersList.filter((u) => u.premium === true || u.isPremium === true || u.isSubscribed === true);
  const totalPremium = premiumUsers.length;

  const activeFreeTrials = usersList.filter((u) => {
    const isPrem = u.premium === true || u.isSubscribed === true;
    if (isPrem) return false;
    const expStr = u.trialEndsAt;
    if (!expStr) return true;
    return new Date(expStr).getTime() > Date.now();
  }).length;

  // Revenue calculation: R$ 29,90 per subscriber
  const monthlyRevenue = (totalPremium * 29.90).toFixed(2);

  const handleTogglePremium = async (user: UserProfile) => {
    if (!user.uid) return;
    const newStatus = !(user.premium || user.isSubscribed);
    
    // Update local UI state
    setUsersList((prev) =>
      prev.map((u) => (u.uid === user.uid ? { ...u, premium: newStatus, isPremium: newStatus, isSubscribed: newStatus } : u))
    );

    // Save directly to Firestore
    await saveUserProfileToFirestore(user.uid, {
      premium: newStatus,
      isPremium: newStatus,
      isSubscribed: newStatus
    });

    setActionSuccessMsg(`Status de ${user.name} alterado para ${newStatus ? 'PREMIUM (Liberado)' : 'GRÁTIS / BLOQUEADO'}`);
    setTimeout(() => setActionSuccessMsg(''), 3000);
  };

  const handleToggleBlock = async (user: UserProfile) => {
    if (!user.uid) return;
    const newBlock = !user.isBlocked;

    setUsersList((prev) =>
      prev.map((u) => (u.uid === user.uid ? { ...u, isBlocked: newBlock } : u))
    );

    await saveUserProfileToFirestore(user.uid, {
      isBlocked: newBlock
    });

    setActionSuccessMsg(`Usuário ${user.name} ${newBlock ? 'BLOQUEADO' : 'DESBLOQUEADO'}`);
    setTimeout(() => setActionSuccessMsg(''), 3000);
  };

  const filteredUsers = usersList.filter((u) => {
    const query = searchTerm.toLowerCase();
    return (
      u.name.toLowerCase().includes(query) ||
      (u.email && u.email.toLowerCase().includes(query)) ||
      (u.whatsapp && u.whatsapp.toLowerCase().includes(query))
    );
  });

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-sm p-6 relative shadow-2xl space-y-4 text-slate-100 text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-100 bg-slate-800 rounded-xl transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 bg-amber-500/20 text-amber-400 rounded-2xl border border-amber-500/40 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>

          <div>
            <h3 className="text-lg font-extrabold">Painel Administrativo</h3>
            <p className="text-xs text-slate-400 mt-1">Digite o PIN de acesso de administrador para continuar.</p>
          </div>

          <form onSubmit={handleVerifyPin} className="space-y-3 pt-2">
            <div>
              <input
                type="password"
                maxLength={6}
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                placeholder="••••••••"
                className="w-full text-center py-3 px-4 bg-slate-950 border border-slate-800 rounded-2xl text-lg font-bold tracking-widest text-emerald-400 focus:outline-none focus:border-emerald-500"
              />
              {pinError && (
                <p className="text-xs text-red-400 font-semibold mt-1.5">PIN incorreto. Tente novamente.</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm rounded-2xl transition shadow-lg shadow-emerald-500/20"
            >
              Acessar Painel
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl p-6 relative shadow-2xl space-y-5 my-auto text-slate-100 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-2xl border border-emerald-500/40 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-100 flex items-center gap-2">
                Painel Administrativo Zero Carb
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                  ADM VIP
                </span>
              </h3>
              <p className="text-xs text-slate-400">Gerenciamento de usuários, assinaturas e status no Firestore</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={loadData}
              disabled={loading}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1 transition"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Atualizar</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-100 rounded-xl transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {actionSuccessMsg && (
          <div className="bg-emerald-950/80 border border-emerald-500 rounded-xl p-3 flex items-center space-x-2 text-xs text-emerald-300 shrink-0">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-bold">{actionSuccessMsg}</span>
          </div>
        )}

        {/* Dashboard Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 shrink-0">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3 text-center space-y-1">
            <Users className="w-5 h-5 text-indigo-400 mx-auto" />
            <span className="text-[10px] text-slate-400 font-semibold block uppercase">Total Cadastrados</span>
            <span className="text-xl font-black text-slate-100">{totalUsers}</span>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3 text-center space-y-1">
            <Calendar className="w-5 h-5 text-emerald-400 mx-auto" />
            <span className="text-[10px] text-slate-400 font-semibold block uppercase">Novos Hoje</span>
            <span className="text-xl font-black text-emerald-400">+{newToday}</span>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3 text-center space-y-1">
            <Calendar className="w-5 h-5 text-amber-400 mx-auto" />
            <span className="text-[10px] text-slate-400 font-semibold block uppercase">Testes Ativos</span>
            <span className="text-xl font-black text-amber-400">{activeFreeTrials}</span>
          </div>

          <div className="bg-slate-950 border border-emerald-500/30 rounded-2xl p-3 text-center space-y-1">
            <Crown className="w-5 h-5 text-yellow-400 mx-auto" />
            <span className="text-[10px] text-slate-400 font-semibold block uppercase">Assinantes VIP</span>
            <span className="text-xl font-black text-yellow-400">{totalPremium}</span>
          </div>

          <div className="bg-slate-950 border border-emerald-500/40 rounded-2xl p-3 text-center space-y-1 col-span-2 md:col-span-1">
            <DollarSign className="w-5 h-5 text-emerald-400 mx-auto" />
            <span className="text-[10px] text-slate-400 font-semibold block uppercase">Faturamento Est.</span>
            <span className="text-lg font-black text-emerald-400">R$ {monthlyRevenue}</span>
          </div>
        </div>

        {/* User Search Bar */}
        <div className="relative shrink-0">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nome, e-mail ou WhatsApp..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl text-slate-100 text-xs focus:outline-none"
          />
        </div>

        {/* Users Table / List */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {loading ? (
            <div className="text-center py-10 text-slate-500 text-xs">Carregando usuários do Firebase...</div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-xs">Nenhum usuário encontrado.</div>
          ) : (
            filteredUsers.map((u) => {
              const isPrem = u.premium === true || u.isPremium === true || u.isSubscribed === true;
              const isBlocked = u.isBlocked === true;

              return (
                <div
                  key={u.uid || u.email || Math.random().toString()}
                  className="bg-slate-950 border border-slate-800/80 rounded-2xl p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:border-slate-700 transition text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-100 text-sm">{u.name}</span>
                      {isPrem && (
                        <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 font-bold rounded-full text-[10px] border border-emerald-500/30">
                          PREMIUM
                        </span>
                      )}
                      {isBlocked && (
                        <span className="px-2 py-0.5 bg-red-500/20 text-red-300 font-bold rounded-full text-[10px] border border-red-500/30">
                          BLOQUEADO
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-slate-400 text-[11px]">
                      {u.email && (
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-slate-500" />
                          {u.email}
                        </span>
                      )}
                      {u.whatsapp && (
                        <span className="flex items-center gap-1 text-emerald-400 font-medium">
                          <Phone className="w-3 h-3 text-emerald-500" />
                          {u.whatsapp}
                        </span>
                      )}
                      <span className="text-slate-600">
                        Cadastro: {u.createdAt ? new Date(u.createdAt).toLocaleDateString('pt-BR') : 'Hoje'}
                      </span>
                    </div>
                  </div>

                  {/* Manual Controls */}
                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      onClick={() => handleTogglePremium(u)}
                      className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center space-x-1 ${
                        isPrem
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                          : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md'
                      }`}
                    >
                      <Crown className="w-3.5 h-3.5" />
                      <span>{isPrem ? 'Tornar Grátis' : 'Liberar Premium'}</span>
                    </button>

                    <button
                      onClick={() => handleToggleBlock(u)}
                      className={`px-2.5 py-1.5 rounded-xl font-bold transition flex items-center space-x-1 ${
                        isBlocked
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-red-950/60 hover:bg-red-900/80 text-red-300 border border-red-800'
                      }`}
                      title={isBlocked ? 'Desbloquear Acesso' : 'Bloquear Acesso'}
                    >
                      {isBlocked ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                      <span>{isBlocked ? 'Desbloquear' : 'Bloquear'}</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
