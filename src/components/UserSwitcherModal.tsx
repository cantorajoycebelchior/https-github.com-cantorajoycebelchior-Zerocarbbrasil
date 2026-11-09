import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserCheck, 
  UserPlus, 
  LogIn, 
  LogOut, 
  Trash2, 
  Flame, 
  Crown, 
  ShieldCheck, 
  X, 
  ChevronRight,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';
import { UserProfile, SavedAccountItem } from '../types';
import { 
  getSavedAccountsFromStorage, 
  removeSavedAccountFromStorage, 
  getUserProfileFromFirestore 
} from '../lib/firebase';

interface UserSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onSwitchUser: (profile: UserProfile) => void;
  onOpenRegister: () => void;
  onOpenLogin: () => void;
  onLogout: () => void;
}

export const UserSwitcherModal: React.FC<UserSwitcherModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSwitchUser,
  onOpenRegister,
  onOpenLogin,
  onLogout
}) => {
  const [savedAccounts, setSavedAccounts] = useState<SavedAccountItem[]>([]);
  const [switchingUid, setSwitchingUid] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSavedAccounts(getSavedAccountsFromStorage());
    }
  }, [isOpen, currentUser]);

  if (!isOpen) return null;

  const handleSelectAccount = async (account: SavedAccountItem) => {
    if (account.uid === currentUser.uid) {
      onClose();
      return;
    }

    setSwitchingUid(account.uid);
    try {
      // Fetch fresh profile from Firestore
      const remoteProfile = await getUserProfileFromFirestore(account.uid);
      if (remoteProfile) {
        onSwitchUser(remoteProfile);
      } else {
        // Fallback to local data
        const localProfile: UserProfile = {
          ...currentUser,
          uid: account.uid,
          name: account.name,
          email: account.email,
          whatsapp: account.whatsapp || currentUser.whatsapp,
          streakDays: account.streakDays || 1,
          isSubscribed: !!account.isSubscribed
        };
        onSwitchUser(localProfile);
      }
      onClose();
    } catch (e) {
      console.error('Error switching account:', e);
    } finally {
      setSwitchingUid(null);
    }
  };

  const handleRemoveAccount = (e: React.MouseEvent, uid: string) => {
    e.stopPropagation();
    removeSavedAccountFromStorage(uid);
    setSavedAccounts(getSavedAccountsFromStorage());
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 relative shadow-2xl space-y-4 my-auto text-slate-100">
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-100 bg-slate-800/80 rounded-xl transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1">
          <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-lg shadow-emerald-500/10">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-100">Gerenciar Usuários & Contas</h3>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Alterne facilmente entre diferentes pessoas na mesma família ou cadastre um novo usuário.
          </p>
        </div>

        {/* Current Active User Card */}
        <div className="bg-slate-950/80 border border-emerald-500/40 rounded-2xl p-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              Usuário Ativo Agora
            </span>
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/20" />
              {currentUser.streakDays || 1}d foco
            </span>
          </div>

          <div className="flex items-center gap-3 mt-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-lg shadow-md shadow-emerald-500/20">
              {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-extrabold text-sm text-slate-100 truncate">{currentUser.name}</h4>
              <p className="text-xs text-slate-400 truncate">{currentUser.email || 'Sem e-mail cadastrado'}</p>
              {currentUser.whatsapp && (
                <p className="text-[11px] text-emerald-400/80 truncate">Zap: {currentUser.whatsapp}</p>
              )}
            </div>
          </div>
        </div>

        {/* Saved Other Accounts List */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">
              Contas Salvas neste Dispositivo ({savedAccounts.length})
            </span>
          </div>

          {savedAccounts.length === 0 ? (
            <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800 text-center text-xs text-slate-400">
              Nenhuma outra conta salva localmente ainda. Crie uma nova conta abaixo para alternar quando quiser.
            </div>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {savedAccounts.map((account) => {
                const isCurrent = account.uid === currentUser.uid;
                const isSwitching = switchingUid === account.uid;

                return (
                  <div
                    key={account.uid}
                    onClick={() => handleSelectAccount(account)}
                    className={`p-3 rounded-2xl border transition flex items-center justify-between gap-3 cursor-pointer ${
                      isCurrent
                        ? 'bg-emerald-950/20 border-emerald-500/50'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-950/80'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-sm text-slate-200">
                        {account.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs text-slate-100 truncate">{account.name}</span>
                          {isCurrent && (
                            <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400">
                              Atual
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400 block truncate">{account.email}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {!isCurrent && (
                        <button
                          type="button"
                          onClick={(e) => handleRemoveAccount(e, account.uid)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition"
                          title="Remover da lista de alternância rápida"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <button
                        type="button"
                        disabled={isCurrent || isSwitching}
                        className={`text-[11px] font-black px-2.5 py-1 rounded-xl transition ${
                          isCurrent
                            ? 'bg-slate-800 text-slate-500 cursor-default'
                            : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500 hover:text-slate-950 border border-emerald-500/30'
                        }`}
                      >
                        {isSwitching ? 'Entrando...' : isCurrent ? 'Conectado' : 'Alternar'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Action Buttons: Cadastrar Novo / Fazer Login / Sair */}
        <div className="pt-2 space-y-2 border-t border-slate-800">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenRegister();
              }}
              className="py-2.5 px-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 transition"
            >
              <UserPlus className="w-4 h-4" />
              <span>+ Novo Usuário</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenLogin();
              }}
              className="py-2.5 px-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition"
            >
              <LogIn className="w-4 h-4" />
              <span>Entrar com Senha</span>
            </button>
          </div>

          {/* Logout Button */}
          <button
            onClick={() => {
              onClose();
              onLogout();
            }}
            className="w-full py-2.5 rounded-2xl bg-red-950/40 hover:bg-red-950/60 border border-red-800/60 text-red-300 font-bold text-xs flex items-center justify-center gap-1.5 transition"
          >
            <LogOut className="w-4 h-4 text-red-400" />
            <span>Sair desta Conta (Logout)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
