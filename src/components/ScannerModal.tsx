import React, { useState, useRef } from 'react';
import { LabelScanResult, MealType } from '../types';
import { SAMPLE_LABELS } from '../data/mockData';
import { Camera, Upload, X, Check, AlertTriangle, Sparkles, Plus, RefreshCw, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface ScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMeal: (meal: { type: MealType; name: string; calories: number; netCarbs: number; protein: number; fat: number }) => void;
}

export const ScannerModal: React.FC<ScannerModalProps> = ({ isOpen, onClose, onAddMeal }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<LabelScanResult | null>(null);
  const [selectedMealType, setSelectedMealType] = useState<MealType>('lanche');
  const [addedSuccess, setAddedSuccess] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  if (!isOpen) return null;

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (err) {
      console.warn('Camera access error, fallback to image selection:', err);
    }
  };

  const captureCameraFrame = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setSelectedImage(dataUrl);
        stopCamera();
        processImageOCR(dataUrl);
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setSelectedImage(base64);
        processImageOCR(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSampleTest = (sample: typeof SAMPLE_LABELS[0]) => {
    setSelectedImage(sample.imgPreview);
    setScanResult(sample.result);
  };

  const processImageOCR = async (imageBase64: string) => {
    setIsScanning(true);
    setScanResult(null);

    try {
      const res = await fetch('/api/scan-label', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64 }),
      });

      const data = await res.json();
      setScanResult(data);
    } catch (err) {
      console.error(err);
      // Fallback sample
      setScanResult(SAMPLE_LABELS[0].result);
    } finally {
      setIsScanning(false);
    }
  };

  const handleConfirmAdd = () => {
    if (!scanResult) return;
    onAddMeal({
      type: selectedMealType,
      name: scanResult.productName,
      calories: scanResult.calories,
      netCarbs: scanResult.netCarbs,
      protein: scanResult.protein,
      fat: scanResult.fat,
    });
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1200);
  };

  const getClassBadge = (classification: string) => {
    switch (classification) {
      case 'Excelente':
        return { color: 'bg-emerald-500 text-slate-950 border-emerald-400', label: '🟢 Excelente Para Cetose' };
      case 'Bom':
        return { color: 'bg-cyan-500 text-slate-950 border-cyan-400', label: '🟢 Bom na Low Carb' };
      case 'Moderado':
        return { color: 'bg-amber-500 text-slate-950 border-amber-400', label: '🟡 Moderado (Com Atencão)' };
      default:
        return { color: 'bg-rose-500 text-slate-100 border-rose-400', label: '🔴 EVITE! Alto Carboidrato' };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-3 sm:p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl text-slate-100 overflow-hidden space-y-4"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-sm text-slate-100">Scanner de Rótulo & OCR</h2>
              <p className="text-[11px] text-slate-400">Análise de carboidratos ocultos com visão computacional</p>
            </div>
          </div>

          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Camera Viewfinder or Sample Presets */}
        {!selectedImage && !isCameraActive && (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-slate-800 hover:border-emerald-500/50 rounded-2xl p-6 text-center space-y-3 bg-slate-950/50 transition">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                <Camera className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-xs text-slate-200">Fotografar Tabela Nutricional</h3>
                <p className="text-[11px] text-slate-400 mt-1">
                  Aponte a câmera para o rótulo do produto para ler os carboidratos líquidos automaticamente
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
                <button
                  onClick={startCamera}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20"
                >
                  <Camera className="w-4 h-4" />
                  <span>Abrir Câmera do Celular</span>
                </button>

                <label className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer border border-slate-700">
                  <Upload className="w-4 h-4 text-emerald-400" />
                  <span>Enviar Foto do Rótulo</span>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>
            </div>

            {/* Quick Sample Test Drives */}
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Ou Teste Imediatamente com Rótulos de Exemplo:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {SAMPLE_LABELS.map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSampleTest(sample)}
                    className="flex items-center gap-2 p-2 rounded-xl bg-slate-800/60 border border-slate-700/80 hover:border-emerald-500/50 text-left transition"
                  >
                    <img src={sample.imgPreview} alt={sample.label} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <span className="text-xs font-bold text-slate-200 block truncate">{sample.label}</span>
                      <span className="text-[10px] text-emerald-400 font-semibold">
                        {sample.result.netCarbs}g carbo liq.
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Live Camera Stream View */}
        {isCameraActive && (
          <div className="space-y-3 text-center">
            <div className="relative rounded-2xl overflow-hidden bg-black aspect-video border border-emerald-500/40">
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
              <div className="absolute inset-0 border-2 border-emerald-400/60 rounded-2xl m-6 pointer-events-none flex items-center justify-center">
                <span className="text-[10px] font-bold bg-slate-950/80 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/40">
                  Posicione a tabela nutricional aqui
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={stopCamera}
                className="w-1/3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-2.5 rounded-xl text-xs"
              >
                Cancelar
              </button>
              <button
                onClick={captureCameraFrame}
                className="w-2/3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20"
              >
                <Camera className="w-4 h-4" />
                <span>Capturar e Analisar</span>
              </button>
            </div>
          </div>
        )}

        {/* OCR Processing Loader */}
        {isScanning && (
          <div className="py-8 text-center space-y-3 bg-slate-950/40 rounded-2xl border border-slate-800">
            <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
            <div>
              <p className="font-bold text-xs text-slate-200">Processando OCR & Inteligência Nutricional...</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Calculando Carboidratos Líquidos = Totais - Fibras</p>
            </div>
          </div>
        )}

        {/* Scan Result Card */}
        {scanResult && !isScanning && (
          <div className="space-y-3 bg-slate-950/90 border border-slate-800 p-4 rounded-2xl">
            {/* Header Product Info */}
            <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span
                  className={`inline-block text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border mb-1.5 ${
                    getClassBadge(scanResult.classification).color
                  }`}
                >
                  {getClassBadge(scanResult.classification).label}
                </span>
                <h3 className="font-extrabold text-sm text-slate-100 leading-tight">{scanResult.productName}</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Porção: {scanResult.servingSize}</p>
              </div>

              <button
                onClick={() => {
                  setSelectedImage(null);
                  setScanResult(null);
                }}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs"
                title="Escanear Outro"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Macro Grid */}
            <div className="grid grid-cols-4 gap-2 text-center py-1">
              <div className="bg-emerald-950/40 border border-emerald-800/60 p-2 rounded-xl">
                <span className="text-xs font-black text-emerald-400 block">{scanResult.netCarbs}g</span>
                <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400">Carb. Liq</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-2 rounded-xl">
                <span className="text-xs font-bold text-amber-400 block">{scanResult.calories}</span>
                <span className="text-[9px] uppercase tracking-wider text-slate-400">Kcal</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-2 rounded-xl">
                <span className="text-xs font-bold text-cyan-400 block">{scanResult.protein}g</span>
                <span className="text-[9px] uppercase tracking-wider text-slate-400">Prot</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-2 rounded-xl">
                <span className="text-xs font-bold text-rose-400 block">{scanResult.fat}g</span>
                <span className="text-[9px] uppercase tracking-wider text-slate-400">Gord</span>
              </div>
            </div>

            {/* Hidden Sugar Alerts */}
            {scanResult.ingredientAlerts && scanResult.ingredientAlerts.length > 0 && (
              <div className="bg-rose-950/40 border border-rose-900/60 p-2.5 rounded-xl text-xs text-rose-200 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[11px] font-bold text-rose-300">
                    Açúcares Ocultos Identificados:
                  </strong>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {scanResult.ingredientAlerts.map((alert, idx) => (
                      <span key={idx} className="bg-rose-900/60 border border-rose-700/60 px-1.5 py-0.5 rounded text-[10px] text-rose-100 font-medium">
                        {alert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Verdict text */}
            <div className="text-[11px] text-slate-300 bg-slate-900 p-2.5 rounded-xl border border-slate-800 leading-relaxed">
              <span className="text-emerald-400 font-bold flex items-center gap-1 mb-0.5">
                <Sparkles className="w-3 h-3" />
                Veredito Nutricional:
              </span>
              {scanResult.verdict}
            </div>

            {/* Add to Diary Action */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Adicionar à Refeição:</span>
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
                onClick={handleConfirmAdd}
                disabled={addedSuccess}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold py-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition shadow-lg shadow-emerald-500/20"
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-slate-950" />
                    <span>Adicionado ao Diário com Sucesso!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Adicionar ao Diário de Hoje</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
