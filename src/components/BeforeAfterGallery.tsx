import React, { useState, useRef } from 'react';
import { Camera, Image as ImageIcon, Trash2, ArrowRight, Sparkles, Scale, Calendar, CheckCircle2, Maximize2, X, RefreshCw } from 'lucide-react';
import { UserProfile } from '../types';

interface BeforeAfterGalleryProps {
  user: UserProfile;
  onUpdateUser: (updatedUser: UserProfile) => void;
}

// Client-side image compression helper to keep Firestore and localStorage fast and lightweight
const compressImageFile = (file: File, maxWidth = 800, quality = 0.82): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxWidth) {
            width = Math.round((width * maxWidth) / height);
            height = maxWidth;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

export const BeforeAfterGallery: React.FC<BeforeAfterGalleryProps> = ({ user, onUpdateUser }) => {
  const [activeZoomPhoto, setActiveZoomPhoto] = useState<'before' | 'after' | 'comparison' | null>(null);
  const [uploadingType, setUploadingType] = useState<'before' | 'after' | null>(null);

  const beforeInputRef = useRef<HTMLInputElement>(null);
  const afterInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>, type: 'before' | 'after') => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingType(type);
      const compressedDataUrl = await compressImageFile(file);
      const todayISO = new Date().toISOString().split('T')[0];

      if (type === 'before') {
        const updated: UserProfile = {
          ...user,
          beforePhotoUrl: compressedDataUrl,
          beforePhotoDate: user.beforePhotoDate || todayISO,
          beforePhotoWeight: user.beforePhotoWeight || user.currentWeight
        };
        onUpdateUser(updated);
      } else {
        const updated: UserProfile = {
          ...user,
          afterPhotoUrl: compressedDataUrl,
          afterPhotoDate: todayISO,
          afterPhotoWeight: user.afterPhotoWeight || user.currentWeight
        };
        onUpdateUser(updated);
      }
    } catch (err) {
      console.error('Error uploading transformation photo:', err);
    } finally {
      setUploadingType(null);
      e.target.value = '';
    }
  };

  const handleRemovePhoto = (type: 'before' | 'after') => {
    if (confirm(`Tem certeza que deseja remover a foto do ${type === 'before' ? 'Antes' : 'Depois'}?`)) {
      if (type === 'before') {
        onUpdateUser({
          ...user,
          beforePhotoUrl: undefined,
          beforePhotoDate: undefined,
          beforePhotoWeight: undefined
        });
      } else {
        onUpdateUser({
          ...user,
          afterPhotoUrl: undefined,
          afterPhotoDate: undefined,
          afterPhotoWeight: undefined
        });
      }
    }
  };

  // Weight delta calculation
  const beforeWeight = user.beforePhotoWeight || user.currentWeight;
  const afterWeight = user.afterPhotoWeight || user.currentWeight;
  const weightDeltaKg = (beforeWeight - afterWeight).toFixed(1);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="px-2.5 py-0.5 text-xs font-bold bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30 uppercase tracking-wider">
              Galeria de Evolução
            </span>
            <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Antes e Depois</span>
            </span>
          </div>
          <h3 className="text-lg font-black text-slate-100 mt-1">Fotos da Sua Transformação</h3>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            Suba suas fotos para comparar o desinchaço facial e corporal durante os 30 dias de Zero Carb.
          </p>
        </div>

        {user.beforePhotoUrl && user.afterPhotoUrl && (
          <button
            onClick={() => setActiveZoomPhoto('comparison')}
            className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-bold flex items-center gap-1 transition"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Comparar</span>
          </button>
        )}
      </div>

      {/* Weight loss banner when both exist */}
      {user.beforePhotoUrl && user.afterPhotoUrl && (
        <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-2xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <span className="text-xs font-black text-emerald-300 block">Comparativo de Transformação</span>
              <span className="text-[11px] text-slate-300">
                {Number(weightDeltaKg) > 0
                  ? `Parabéns! Você eliminou ${weightDeltaKg} kg entre as fotos!`
                  : 'Fotos registradas com sucesso no seu perfil!'}
              </span>
            </div>
          </div>
          <span className="text-base font-black text-emerald-400 font-mono">
            {Number(weightDeltaKg) > 0 ? `-${weightDeltaKg} kg` : '0 kg'}
          </span>
        </div>
      )}

      {/* Side-by-side Photo Cards */}
      <div className="grid grid-cols-2 gap-3">
        {/* FOTO DO ANTES */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3 space-y-2.5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-300 px-2 py-0.5 bg-slate-800 rounded-md">
              Antes
            </span>
            {user.beforePhotoUrl && (
              <button
                type="button"
                onClick={() => handleRemovePhoto('before')}
                className="text-slate-500 hover:text-red-400 transition p-1"
                title="Remover foto do antes"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Photo Preview / Upload Placeholder */}
          <div className="relative aspect-[3/4] bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex items-center justify-center group">
            {user.beforePhotoUrl ? (
              <>
                <img
                  src={user.beforePhotoUrl}
                  alt="Foto do Antes"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setActiveZoomPhoto('before')}
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white"
                >
                  <Maximize2 className="w-6 h-6" />
                </button>
              </>
            ) : (
              <div
                onClick={() => beforeInputRef.current?.click()}
                className="text-center p-3 cursor-pointer hover:opacity-80 transition space-y-2"
              >
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 mx-auto">
                  <Camera className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-300 block">Subir Foto</span>
                  <span className="text-[10px] text-slate-500 block">Início da Dieta</span>
                </div>
              </div>
            )}
          </div>

          {/* Metadata / Action Button */}
          <div>
            {user.beforePhotoUrl ? (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    <span>{user.beforePhotoDate || 'Início'}</span>
                  </span>
                  <span className="font-bold text-slate-300">{user.beforePhotoWeight || user.currentWeight} kg</span>
                </div>
                <button
                  type="button"
                  onClick={() => beforeInputRef.current?.click()}
                  className="w-full py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 transition"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Trocar Foto</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => beforeInputRef.current?.click()}
                disabled={uploadingType === 'before'}
                className="w-full py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>{uploadingType === 'before' ? 'Enviando...' : 'Adicionar Antes'}</span>
              </button>
            )}
            <input
              ref={beforeInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileSelect(e, 'before')}
            />
          </div>
        </div>

        {/* FOTO DO DEPOIS */}
        <div className="bg-slate-950 border border-emerald-500/30 rounded-2xl p-3 space-y-2.5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-300 px-2 py-0.5 bg-emerald-950/80 border border-emerald-800 rounded-md">
              Depois
            </span>
            {user.afterPhotoUrl && (
              <button
                type="button"
                onClick={() => handleRemovePhoto('after')}
                className="text-slate-500 hover:text-red-400 transition p-1"
                title="Remover foto do depois"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Photo Preview / Upload Placeholder */}
          <div className="relative aspect-[3/4] bg-slate-900 border border-emerald-900/40 rounded-xl overflow-hidden flex items-center justify-center group">
            {user.afterPhotoUrl ? (
              <>
                <img
                  src={user.afterPhotoUrl}
                  alt="Foto do Depois"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setActiveZoomPhoto('after')}
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white"
                >
                  <Maximize2 className="w-6 h-6" />
                </button>
              </>
            ) : (
              <div
                onClick={() => afterInputRef.current?.click()}
                className="text-center p-3 cursor-pointer hover:opacity-80 transition space-y-2"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
                  <Camera className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-emerald-300 block">Subir Foto</span>
                  <span className="text-[10px] text-slate-500 block">Resultado Atual</span>
                </div>
              </div>
            )}
          </div>

          {/* Metadata / Action Button */}
          <div>
            {user.afterPhotoUrl ? (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-emerald-400" />
                    <span>{user.afterPhotoDate || 'Hoje'}</span>
                  </span>
                  <span className="font-bold text-emerald-400">{user.afterPhotoWeight || user.currentWeight} kg</span>
                </div>
                <button
                  type="button"
                  onClick={() => afterInputRef.current?.click()}
                  className="w-full py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 transition"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Trocar Foto</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => afterInputRef.current?.click()}
                disabled={uploadingType === 'after'}
                className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>{uploadingType === 'after' ? 'Enviando...' : 'Adicionar Depois'}</span>
              </button>
            )}
            <input
              ref={afterInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileSelect(e, 'after')}
            />
          </div>
        </div>
      </div>

      {/* Modal Zoom & Side-by-Side Comparison Fullscreen */}
      {activeZoomPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="relative max-w-xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-2xl">
            <button
              onClick={() => setActiveZoomPhoto(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <h4 className="text-base font-extrabold text-slate-100">Comparativo Visual Zero Carb</h4>
              <p className="text-xs text-slate-400">Antes vs Depois na dieta cetogênica</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {user.beforePhotoUrl && (
                <div className="space-y-1 text-center">
                  <span className="text-xs font-extrabold uppercase text-slate-400 block">Antes</span>
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
                    <img src={user.beforePhotoUrl} alt="Antes" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-300 block">{user.beforePhotoWeight || user.currentWeight} kg</span>
                </div>
              )}

              {user.afterPhotoUrl && (
                <div className="space-y-1 text-center">
                  <span className="text-xs font-extrabold uppercase text-emerald-400 block">Depois</span>
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-emerald-500/40 bg-slate-950">
                    <img src={user.afterPhotoUrl} alt="Depois" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[11px] font-bold text-emerald-400 block">{user.afterPhotoWeight || user.currentWeight} kg</span>
                </div>
              )}
            </div>

            <button
              onClick={() => setActiveZoomPhoto(null)}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition"
            >
              Fechar Visualização
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
