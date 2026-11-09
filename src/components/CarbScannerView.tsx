import React, { useState, useRef, useEffect } from 'react';
import { CarbScanResult, FoodCarbSearchResult, MealType } from '../types';
import { 
  Camera, 
  Upload, 
  Search, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Flame, 
  Plus, 
  Clock, 
  RefreshCw, 
  ShieldAlert, 
  ShieldCheck, 
  Coffee, 
  Sun, 
  UtensilsCrossed, 
  Moon, 
  Dumbbell, 
  ArrowRight, 
  Check, 
  ChevronRight, 
  History, 
  Eye, 
  FileText,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CarbScannerViewProps {
  onAddMeal?: (meal: { type: MealType; name: string; calories: number; netCarbs: number; protein: number; fat: number }) => void;
  initialMode?: 'scanner' | 'search';
}

const STORAGE_SCAN_HISTORY = 'zerocarb_scan_history_v1';
const STORAGE_SEARCH_HISTORY = 'zerocarb_search_history_v1';

// Preset sample products for quick test
const QUICK_SAMPLE_PRODUCTS = [
  {
    name: 'Presunto Cozido Magro',
    brand: 'Sadia',
    image: 'https://images.unsplash.com/photo-1524438418049-ab2acb7aa48f?auto=format&fit=crop&w=400&q=80',
    hint: 'presunto cozido sem amido',
    expected: '0g Carbo',
    status: 'zero_carb',
  },
  {
    name: 'Queijo Prato Fatiado',
    brand: 'Laticínios Brasil',
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=400&q=80',
    hint: 'queijo prato fatiado 0g carbo',
    expected: '0g Carbo',
    status: 'zero_carb',
  },
  {
    name: 'Pão de Forma Tradicional',
    brand: 'Padaria Trigo Nobre',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80',
    hint: 'pao de forma trigo refinado',
    expected: '24g Carbo',
    status: 'alto_carbo',
  },
  {
    name: 'Goma de Tapioca Hidratada',
    brand: 'Da Terrinha',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=400&q=80',
    hint: 'tapioca goma mandioca amido',
    expected: '28g Carbo',
    status: 'alto_carbo',
  },
  {
    name: 'Iogurte Grego Natural',
    brand: 'Danone',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=400&q=80',
    hint: 'iogurte grego sem acucar adicionado',
    expected: '4.2g Carbo',
    status: 'baixo_carbo',
  },
];

// Popular Brazilian search queries for quick 1-click test
const POPULAR_SEARCH_CHIPS = [
  'Tapioca',
  'Pão Francês',
  'Ovo Frito na Manteiga',
  'Filé de Frango Grelhado',
  'Batata Doce Cozida',
  'Picanha Bovina',
  'Abacate',
  'Castanha de Caju',
  'Arroz Branco',
  'Queijo Minas Curado',
  'Refrigerante Normal',
  'Presunto Cozido',
];

export const CarbScannerView: React.FC<CarbScannerViewProps> = ({ onAddMeal, initialMode = 'scanner' }) => {
  const [activeSubTab, setActiveSubTab] = useState<'scanner' | 'search'>(initialMode);

  // Scanner states
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<CarbScanResult | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraFacing, setCameraFacing] = useState<'environment' | 'user'>('environment');
  const [scanHistory, setScanHistory] = useState<CarbScanResult[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_SCAN_HISTORY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Food search states
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<FoodCarbSearchResult | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<FoodCarbSearchResult[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_SEARCH_HISTORY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Add meal confirmation modal/state
  const [selectedMealType, setSelectedMealType] = useState<MealType>('almoço');
  const [addedItemFeedback, setAddedItemFeedback] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Stop camera when unmounting or switching tab
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async (facing: 'environment' | 'user' = cameraFacing) => {
    stopCamera();
    setScanError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facing, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
        setIsCameraActive(true);
      }
    } catch (err: any) {
      console.warn('Erro ao abrir câmera:', err);
      setScanError('Não foi possível acessar a câmera. Você pode fazer upload de uma foto ou usar nossos exemplos!');
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const toggleCameraFacing = () => {
    const nextFacing = cameraFacing === 'environment' ? 'user' : 'environment';
    setCameraFacing(nextFacing);
    if (isCameraActive) {
      startCamera(nextFacing);
    }
  };

  const captureFrame = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setSelectedImage(dataUrl);
        stopCamera();
        processProductImage(dataUrl);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setSelectedImage(base64);
        stopCamera();
        processProductImage(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleQuickSample = async (sample: typeof QUICK_SAMPLE_PRODUCTS[0]) => {
    setSelectedImage(sample.image);
    stopCamera();
    setIsScanning(true);
    setScanResult(null);
    setScanError(null);

    try {
      const res = await fetch('/api/scan-carb-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: sample.image,
          sampleText: `${sample.name} - ${sample.brand} (${sample.hint})`,
        }),
      });

      const data: CarbScanResult = await res.json();
      const enrichedResult = { ...data, timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }), imageUrl: sample.image };
      setScanResult(enrichedResult);
      saveToScanHistory(enrichedResult);
    } catch (err: any) {
      console.error(err);
      setScanError('Erro ao escanear produto. Tente novamente.');
    } finally {
      setIsScanning(false);
    }
  };

  const processProductImage = async (imageBase64: string) => {
    setIsScanning(true);
    setScanResult(null);
    setScanError(null);

    try {
      const res = await fetch('/api/scan-carb-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64 }),
      });

      if (!res.ok) {
        throw new Error('Falha no processamento da imagem');
      }

      const data: CarbScanResult = await res.json();
      const enrichedResult = { ...data, timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }), imageUrl: imageBase64 };
      setScanResult(enrichedResult);
      saveToScanHistory(enrichedResult);
    } catch (err: any) {
      console.error(err);
      setScanError('Falha ao processar com a IA. Tente uma foto com iluminação melhor ou use a consulta.');
    } finally {
      setIsScanning(false);
    }
  };

  const saveToScanHistory = (result: CarbScanResult) => {
    setScanHistory((prev) => {
      const updated = [result, ...prev.filter((item) => item.productName !== result.productName)].slice(0, 8);
      try {
        localStorage.setItem(STORAGE_SCAN_HISTORY, JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });
  };

  // Perform food search with AI
  const executeFoodSearch = async (queryToSearch: string) => {
    const q = queryToSearch.trim();
    if (!q) return;

    setIsSearching(true);
    setSearchError(null);
    setSearchResult(null);

    try {
      const res = await fetch('/api/search-food-carbs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
      });

      if (!res.ok) {
        throw new Error('Erro ao obter dados do alimento');
      }

      const data: FoodCarbSearchResult = await res.json();
      const enriched = { ...data, timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) };
      setSearchResult(enriched);
      saveToSearchHistory(enriched);
    } catch (err: any) {
      console.error(err);
      setSearchError('Não foi possível obter resposta da IA Nutricional no momento. Tente novamente.');
    } finally {
      setIsSearching(false);
    }
  };

  const saveToSearchHistory = (item: FoodCarbSearchResult) => {
    setSearchHistory((prev) => {
      const updated = [item, ...prev.filter((i) => i.foodName.toLowerCase() !== item.foodName.toLowerCase())].slice(0, 8);
      try {
        localStorage.setItem(STORAGE_SEARCH_HISTORY, JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });
  };

  // Quick add to daily meals
  const handleAddToDiary = (name: string, calories: number, netCarbs: number, protein: number, fat: number) => {
    if (onAddMeal) {
      onAddMeal({
        type: selectedMealType,
        name,
        calories,
        netCarbs,
        protein,
        fat,
      });
      setAddedItemFeedback(`Adicionado ao ${selectedMealType.toUpperCase()} com sucesso!`);
      setTimeout(() => setAddedItemFeedback(null), 2500);
    }
  };

  return (
    <div className="space-y-6 pb-24 text-slate-100 max-w-2xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950/70 via-slate-900 to-emerald-950/50 border border-emerald-500/30 rounded-3xl p-5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-start gap-3.5 relative z-10">
          <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl text-emerald-400 shrink-0 shadow-lg shadow-emerald-500/10">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                IA Multimodal & Visão
              </span>
              <span className="text-[11px] text-slate-400">• Dieta Zero Carb</span>
            </div>
            <h2 className="text-lg font-black text-slate-100 mt-1">Detector & Consulta de Carboidratos</h2>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Use a câmera para escanear rótulos e embalagens, ou pesquise qualquer alimento para saber se tem carboidrato e receber sugestões para todos os períodos do dia.
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800">
          <button
            onClick={() => {
              setActiveSubTab('scanner');
              stopCamera();
            }}
            className={`py-2.5 px-3 rounded-2xl text-xs font-black flex items-center justify-center gap-2 transition ${
              activeSubTab === 'scanner'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-900/90 text-slate-300 hover:text-slate-100 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Scanner com Câmera</span>
          </button>

          <button
            onClick={() => {
              setActiveSubTab('search');
              stopCamera();
            }}
            className={`py-2.5 px-3 rounded-2xl text-xs font-black flex items-center justify-center gap-2 transition ${
              activeSubTab === 'search'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-900/90 text-slate-300 hover:text-slate-100 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Consulta IA & Refeições</span>
          </button>
        </div>
      </div>

      {/* FEEDBACK TOAST */}
      {addedItemFeedback && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-emerald-500 text-slate-950 px-4 py-2.5 rounded-2xl font-black text-xs flex items-center justify-between shadow-xl"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{addedItemFeedback}</span>
          </div>
          <button onClick={() => setAddedItemFeedback(null)} className="p-1 hover:bg-emerald-600 rounded">
            &times;
          </button>
        </motion.div>
      )}

      {/* ========================================================================= */}
      {/* TAB 1: SCANNER IA DE PRODUTOS COM CÂMERA E FOTO */}
      {/* ========================================================================= */}
      {activeSubTab === 'scanner' && (
        <div className="space-y-6">
          {/* Camera / Capture Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-slate-100 flex items-center gap-2">
                  <Camera className="w-4 h-4 text-emerald-400" />
                  <span>Leitor de Rótulos, Embalagens e Pratos</span>
                </h3>
                <p className="text-[11px] text-slate-400">
                  Detecta carboidratos líquidos, maltodextrina, amidos ocultos e veredito Zero Carb
                </p>
              </div>

              {isCameraActive && (
                <button
                  onClick={toggleCameraFacing}
                  className="px-2.5 py-1 text-[11px] font-bold rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 flex items-center gap-1 transition"
                  title="Inverter Câmera (Frontal / Traseira)"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Virar</span>
                </button>
              )}
            </div>

            {/* Viewfinder area */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 min-h-[260px] flex items-center justify-center">
              {isCameraActive ? (
                <div className="relative w-full h-[320px] bg-black">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  {/* Scanner Overlay Box */}
                  <div className="absolute inset-0 border-2 border-emerald-500/50 m-6 rounded-2xl pointer-events-none flex flex-col justify-between p-3">
                    <div className="flex justify-between items-center text-[10px] font-mono text-emerald-400 bg-slate-950/70 px-2 py-0.5 rounded backdrop-blur-sm self-center">
                      <span>• ENQUADRE A TABELA OU INGREDIENTES •</span>
                    </div>
                    <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse" />
                    <div className="text-[9px] text-slate-400 text-center bg-slate-950/70 py-0.5 px-2 rounded backdrop-blur-sm">
                      Detecta açúcares e amidos ocultos automaticamente
                    </div>
                  </div>
                </div>
              ) : selectedImage ? (
                <div className="relative w-full max-h-[320px] overflow-hidden flex items-center justify-center p-2 bg-slate-950">
                  <img
                    src={selectedImage}
                    alt="Produto capturado"
                    className="max-h-[300px] w-auto rounded-xl object-contain shadow-lg"
                  />
                  <button
                    onClick={() => {
                      setSelectedImage(null);
                      setScanResult(null);
                    }}
                    className="absolute top-4 right-4 p-2 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 text-slate-300 transition"
                    title="Limpar imagem"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="p-8 text-center space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400">
                    <Camera className="w-8 h-8 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-200">Aponte para o produto ou envie uma foto</h4>
                    <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1">
                      A IA lê a tabela nutricional e a lista de ingredientes para garantir que você não consuma carboidrato escondido.
                    </p>
                  </div>
                </div>
              )}

              {/* Scanning indicator */}
              {isScanning && (
                <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center gap-3 z-20">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
                    <Sparkles className="w-5 h-5 text-emerald-400 absolute inset-0 m-auto" />
                  </div>
                  <div className="text-center space-y-1">
                    <p className="font-black text-xs text-emerald-400 tracking-wide uppercase">
                      IA Analisando Carboidratos...
                    </p>
                    <p className="text-[11px] text-slate-400">Verificando amidos, maltodextrina e carbo líquido</p>
                  </div>
                </div>
              )}
            </div>

            {/* Error Message */}
            {scanError && (
              <div className="p-3 bg-red-500/15 border border-red-500/30 rounded-2xl text-red-300 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{scanError}</span>
              </div>
            )}

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-2.5">
              {isCameraActive ? (
                <>
                  <button
                    onClick={captureFrame}
                    className="py-3 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Capturar & Analisar</span>
                  </button>
                  <button
                    onClick={stopCamera}
                    className="py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition"
                  >
                    <span>Cancelar</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => startCamera()}
                    className="py-3 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Abrir Câmera</span>
                  </button>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-100 font-bold text-xs flex items-center justify-center gap-2 transition"
                  >
                    <Upload className="w-4 h-4 text-emerald-400" />
                    <span>Carregar Foto</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </>
              )}
            </div>

            {/* Quick Test Samples */}
            <div className="pt-2 border-t border-slate-800">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-2">
                Ou teste com exemplos reais do mercado brasileiro:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {QUICK_SAMPLE_PRODUCTS.map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickSample(sample)}
                    disabled={isScanning}
                    className="p-2 rounded-xl bg-slate-950/70 hover:bg-slate-800/90 border border-slate-800 text-left transition flex items-center gap-2.5 group disabled:opacity-50"
                  >
                    <img
                      src={sample.image}
                      alt={sample.name}
                      className="w-10 h-10 rounded-lg object-cover shrink-0 border border-slate-800 group-hover:scale-105 transition"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-bold text-slate-200 truncate group-hover:text-emerald-400">
                        {sample.name}
                      </p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span
                          className={`text-[9px] font-black px-1.5 py-0.2 rounded ${
                            sample.status === 'zero_carb'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : sample.status === 'baixo_carbo'
                              ? 'bg-amber-500/20 text-amber-400'
                              : 'bg-rose-500/20 text-rose-400'
                          }`}
                        >
                          {sample.expected}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* AI Scan Result Card */}
          {scanResult && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4"
            >
              {/* Verdict Header */}
              <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${
                        scanResult.status === 'zero_carb'
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                          : scanResult.status === 'baixo_carbo'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      }`}
                    >
                      {scanResult.status === 'zero_carb'
                        ? '🟢 100% Zero Carb'
                        : scanResult.status === 'baixo_carbo'
                        ? '🟡 Atenção: Low Carb'
                        : '🔴 Alto em Carboidrato'}
                    </span>
                    <span className="text-[10px] text-slate-400">Porção: {scanResult.servingSize}</span>
                  </div>
                  <h3 className="text-base font-black text-slate-100">{scanResult.productName}</h3>
                </div>

                <div
                  className={`p-3 rounded-2xl border shrink-0 ${
                    scanResult.isZeroCarbAllowed
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                      : 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                  }`}
                >
                  {scanResult.isZeroCarbAllowed ? <ShieldCheck className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
                </div>
              </div>

              {/* Has Carbs Verdict Banner */}
              <div
                className={`p-4 rounded-2xl border flex items-center gap-3 ${
                  !scanResult.hasCarbs
                    ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
                    : scanResult.status === 'baixo_carbo'
                    ? 'bg-amber-950/60 border-amber-500/40 text-amber-200'
                    : 'bg-rose-950/60 border-rose-500/40 text-rose-200'
                }`}
              >
                {!scanResult.hasCarbs ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                ) : (
                  <XCircle className="w-6 h-6 text-rose-400 shrink-0" />
                )}
                <div>
                  <h4 className="font-black text-sm">{scanResult.verdict}</h4>
                  <p className="text-[11px] opacity-90 mt-0.5">
                    {!scanResult.hasCarbs
                      ? 'Este alimento possui ZERO carboidratos líquidos e mantém seu corpo em estado contínuo de queima de gordura.'
                      : `Atenção: Este produto contém ${scanResult.netCarbs}g de carboidratos líquidos por porção.`}
                  </p>
                </div>
              </div>

              {/* Macro breakdown */}
              <div className="grid grid-cols-4 gap-2 text-center">
                <div
                  className={`p-3 rounded-2xl border ${
                    scanResult.netCarbs === 0
                      ? 'bg-emerald-500/10 border-emerald-500/30'
                      : 'bg-rose-500/10 border-rose-500/30'
                  }`}
                >
                  <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Carbo Líq</span>
                  <span
                    className={`text-lg font-black block ${
                      scanResult.netCarbs === 0 ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {scanResult.netCarbs}g
                  </span>
                  <span className="text-[9px] text-slate-500">Total: {scanResult.totalCarbs}g</span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Proteína</span>
                  <span className="text-lg font-black text-cyan-400 block">{scanResult.protein}g</span>
                  <span className="text-[9px] text-slate-500">Massa Magra</span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Gordura</span>
                  <span className="text-lg font-black text-amber-400 block">{scanResult.fat}g</span>
                  <span className="text-[9px] text-slate-500">Energia Cetônica</span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Calorias</span>
                  <span className="text-lg font-black text-slate-200 block">{scanResult.calories}</span>
                  <span className="text-[9px] text-slate-500">kcal</span>
                </div>
              </div>

              {/* Hidden Sugars / Starches Alert */}
              {scanResult.hiddenSugarsOrStarches && scanResult.hiddenSugarsOrStarches.length > 0 ? (
                <div className="p-3.5 bg-rose-500/15 border border-rose-500/40 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 text-rose-300 font-extrabold text-xs">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Açúcares & Amidos Ocultos Detectados:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {scanResult.hiddenSugarsOrStarches.map((sugar, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-lg bg-rose-500/30 text-rose-200 font-bold text-[10px] border border-rose-500/50"
                      >
                        ⚠️ {sugar}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-2 text-emerald-300 text-xs">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Nenhum açúcar, xarope ou amido oculto detectado nos ingredientes!</span>
                </div>
              )}

              {/* Ingredients & Recommendation */}
              <div className="space-y-2 text-xs">
                <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-3">
                  <span className="font-extrabold text-slate-300 block mb-1">Análise dos Ingredientes:</span>
                  <p className="text-slate-400 leading-relaxed">{scanResult.ingredientsAnalysis}</p>
                </div>

                <div className="bg-slate-950/80 border border-emerald-500/20 rounded-2xl p-3">
                  <span className="font-extrabold text-emerald-400 block mb-1">Recomendação da Nutricionista:</span>
                  <p className="text-slate-300 leading-relaxed">{scanResult.recommendation}</p>
                </div>
              </div>

              {/* Add to Diary Action */}
              {onAddMeal && (
                <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
                  <div className="flex-1">
                    <select
                      value={selectedMealType}
                      onChange={(e) => setSelectedMealType(e.target.value as MealType)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                    >
                      <option value="café">☕ Café da Manhã</option>
                      <option value="almoço">☀️ Almoço</option>
                      <option value="lanche">🥪 Lanche da Tarde</option>
                      <option value="jantar">🌙 Jantar</option>
                    </select>
                  </div>

                  <button
                    onClick={() =>
                      handleAddToDiary(
                        scanResult.productName,
                        scanResult.calories,
                        scanResult.netCarbs,
                        scanResult.protein,
                        scanResult.fat
                      )
                    }
                    className="py-2 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition whitespace-nowrap"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Adicionar ao Diário</span>
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* History of Scanned Products */}
          {scanHistory.length > 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <h4 className="font-extrabold text-xs text-slate-200 flex items-center gap-2">
                  <History className="w-4 h-4 text-emerald-400" />
                  <span>Produtos Escaneados Recentemente</span>
                </h4>
                <button
                  onClick={() => {
                    setScanHistory([]);
                    localStorage.removeItem(STORAGE_SCAN_HISTORY);
                  }}
                  className="text-[10px] text-slate-500 hover:text-slate-300 transition"
                >
                  Limpar
                </button>
              </div>

              <div className="space-y-2">
                {scanHistory.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setScanResult(item)}
                    className="bg-slate-950/80 hover:bg-slate-800/80 border border-slate-800/80 rounded-2xl p-3 flex items-center justify-between cursor-pointer transition"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span
                          className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded ${
                            item.status === 'zero_carb'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : item.status === 'baixo_carbo'
                              ? 'bg-amber-500/20 text-amber-400'
                              : 'bg-rose-500/20 text-rose-400'
                          }`}
                        >
                          {item.status === 'zero_carb' ? '0g Carbo' : `${item.netCarbs}g Líq`}
                        </span>
                        {item.timestamp && <span className="text-[10px] text-slate-500">{item.timestamp}</span>}
                      </div>
                      <h5 className="font-bold text-xs text-slate-200 truncate">{item.productName}</h5>
                    </div>

                    <ChevronRight className="w-4 h-4 text-slate-500 shrink-0 ml-2" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: CONSULTA IA DE ALIMENTOS E SUGESTÕES POR PERÍODO */}
      {/* ========================================================================= */}
      {activeSubTab === 'search' && (
        <div className="space-y-6">
          {/* Search Input Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
            <div>
              <h3 className="font-extrabold text-sm text-slate-100 flex items-center gap-2">
                <Search className="w-4 h-4 text-emerald-400" />
                <span>Consulta Nutricional IA de Alimentos</span>
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Digite qualquer comida brasileira e saiba se tem carboidrato e como encaixar em cada refeição
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                executeFoodSearch(searchQuery);
              }}
              className="relative"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ex: Tapioca, Pão francês, Filé de frango, Ovo, Batata doce..."
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-4 pr-24 py-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                disabled={isSearching || !searchQuery.trim()}
                className="absolute right-1.5 top-1.5 bottom-1.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-black text-xs flex items-center gap-1.5 transition shadow-sm"
              >
                {isSearching ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Consultar</span>
                  </>
                )}
              </button>
            </form>

            {/* Quick chips */}
            <div>
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-2">
                Sugestões rápidas para pesquisar:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {POPULAR_SEARCH_CHIPS.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSearchQuery(chip);
                      executeFoodSearch(chip);
                    }}
                    className="px-2.5 py-1 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-[11px] font-medium text-slate-300 hover:text-emerald-300 transition"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Search Error */}
          {searchError && (
            <div className="p-3 bg-red-500/15 border border-red-500/30 rounded-2xl text-red-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{searchError}</span>
            </div>
          )}

          {/* Loading Indicator */}
          {isSearching && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-3 shadow-xl">
              <div className="w-10 h-10 mx-auto rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
              <p className="font-extrabold text-xs text-emerald-400">Consultando IA Nutricional...</p>
              <p className="text-[11px] text-slate-400">
                Calculando carboidratos e gerando sugestões para o café, almoço, lanche, jantar e ceia
              </p>
            </div>
          )}

          {/* Food Search Result Card */}
          {searchResult && !isSearching && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-5"
            >
              {/* Header with Has Carbs Verdict */}
              <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${
                        !searchResult.hasCarbs
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                          : searchResult.zeroCarbCompatibility.includes('Moderado')
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      }`}
                    >
                      {searchResult.zeroCarbCompatibility}
                    </span>
                    <span className="text-[10px] text-slate-400">Porção: {searchResult.portionDescription}</span>
                  </div>
                  <h3 className="text-lg font-black text-slate-100">{searchResult.foodName}</h3>
                </div>

                {/* Has Carbs Badge */}
                <div
                  className={`px-3 py-2 rounded-2xl border text-center shrink-0 ${
                    !searchResult.hasCarbs
                      ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                      : 'bg-rose-500/15 border-rose-500/40 text-rose-400'
                  }`}
                >
                  <span className="text-[9px] uppercase font-black block">Tem Carboidrato?</span>
                  <span className="text-xs font-black block">
                    {!searchResult.hasCarbs ? 'NÃO (0g)' : 'SIM'}
                  </span>
                </div>
              </div>

              {/* Summary */}
              <div
                className={`p-4 rounded-2xl border flex items-start gap-3 ${
                  !searchResult.hasCarbs
                    ? 'bg-emerald-950/40 border-emerald-500/30'
                    : 'bg-slate-950/90 border-slate-800'
                }`}
              >
                <div
                  className={`p-2 rounded-xl border shrink-0 ${
                    !searchResult.hasCarbs
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                      : 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                  }`}
                >
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs text-slate-200">Parecer da IA Nutricional:</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{searchResult.summary}</p>
                  {searchResult.hiddenCarbWarning && (
                    <p className="text-[11px] text-amber-300 mt-1.5 flex items-center gap-1 font-semibold">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span>{searchResult.hiddenCarbWarning}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Nutritional numbers */}
              <div className="grid grid-cols-4 gap-2 text-center">
                <div
                  className={`p-3 rounded-2xl border ${
                    !searchResult.hasCarbs
                      ? 'bg-emerald-500/10 border-emerald-500/30'
                      : 'bg-rose-500/10 border-rose-500/30'
                  }`}
                >
                  <span className="text-[9px] font-black uppercase text-slate-400 block">Carbo Líq / Porção</span>
                  <span
                    className={`text-base font-black block ${
                      !searchResult.hasCarbs ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {searchResult.netCarbsPerPortion}g
                  </span>
                  <span className="text-[8px] text-slate-500">{searchResult.carbsPer100g}g / 100g</span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[9px] font-black uppercase text-slate-400 block">Índice Glicêmico</span>
                  <span className="text-base font-black text-amber-400 block">{searchResult.glycemicIndex}</span>
                  <span className="text-[8px] text-slate-500">Pico de Insulina</span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[9px] font-black uppercase text-slate-400 block">Proteína / 100g</span>
                  <span className="text-base font-black text-cyan-400 block">{searchResult.proteinPer100g}g</span>
                  <span className="text-[8px] text-slate-500">Massa Muscular</span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[9px] font-black uppercase text-slate-400 block">Calorias / 100g</span>
                  <span className="text-base font-black text-slate-200 block">{searchResult.caloriesPer100g}</span>
                  <span className="text-[8px] text-slate-500">kcal</span>
                </div>
              </div>

              {/* ============================================================ */}
              {/* MEAL PERIOD SUGGESTIONS (CAFÉ, ALMOÇO, LANCHE, JANTAR, CEIA) */}
              {/* ============================================================ */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-xs text-slate-200 flex items-center gap-1.5">
                    <UtensilsCrossed className="w-4 h-4 text-emerald-400" />
                    <span>Sugestões para os Períodos de Alimentação</span>
                  </h4>
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    5 Períodos Diários
                  </span>
                </div>

                <div className="space-y-2.5">
                  {/* Café da manhã */}
                  <div className="bg-slate-950/80 border border-amber-500/20 rounded-2xl p-3 flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
                      <Coffee className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-extrabold text-amber-300 block">🌅 Café da Manhã</span>
                      <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                        {searchResult.mealPeriodSuggestions.cafeDaManha}
                      </p>
                    </div>
                  </div>

                  {/* Almoço */}
                  <div className="bg-slate-950/80 border border-emerald-500/20 rounded-2xl p-3 flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                      <Sun className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-extrabold text-emerald-300 block">☀️ Almoço</span>
                      <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                        {searchResult.mealPeriodSuggestions.almoco}
                      </p>
                    </div>
                  </div>

                  {/* Lanche da Tarde */}
                  <div className="bg-slate-950/80 border border-cyan-500/20 rounded-2xl p-3 flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shrink-0">
                      <UtensilsCrossed className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-extrabold text-cyan-300 block">🥪 Lanche da Tarde</span>
                      <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                        {searchResult.mealPeriodSuggestions.lanche}
                      </p>
                    </div>
                  </div>

                  {/* Jantar */}
                  <div className="bg-slate-950/80 border border-purple-500/20 rounded-2xl p-3 flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 shrink-0">
                      <Moon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-extrabold text-purple-300 block">🌙 Jantar</span>
                      <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                        {searchResult.mealPeriodSuggestions.jantar}
                      </p>
                    </div>
                  </div>

                  {/* Ceia / Pré-treino */}
                  <div className="bg-slate-950/80 border border-indigo-500/20 rounded-2xl p-3 flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 shrink-0">
                      <Dumbbell className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-extrabold text-indigo-300 block">🍵 Ceia / Pré-treino em Casa</span>
                      <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                        {searchResult.mealPeriodSuggestions.ceia}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Zero Carb Substitutes */}
              {searchResult.zeroCarbSubstitutes && searchResult.zeroCarbSubstitutes.length > 0 && (
                <div className="bg-slate-950/90 border border-emerald-500/30 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Substitutos 100% Zero Carb Recomendados:</span>
                  </div>
                  <ul className="space-y-1.5">
                    {searchResult.zeroCarbSubstitutes.map((sub, idx) => (
                      <li key={idx} className="text-xs text-slate-200 flex items-start gap-2">
                        <span className="text-emerald-400 font-black">•</span>
                        <span>{sub}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Key Tip */}
              <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-2xl text-xs text-slate-300 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p>
                  <strong className="text-amber-300">Dica de Ouro Zero Carb:</strong> {searchResult.keyTip}
                </p>
              </div>

              {/* Add to Diary Action */}
              {onAddMeal && !searchResult.hasCarbs && (
                <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
                  <div className="flex-1">
                    <select
                      value={selectedMealType}
                      onChange={(e) => setSelectedMealType(e.target.value as MealType)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                    >
                      <option value="café">☕ Café da Manhã</option>
                      <option value="almoço">☀️ Almoço</option>
                      <option value="lanche">🥪 Lanche da Tarde</option>
                      <option value="jantar">🌙 Jantar</option>
                    </select>
                  </div>

                  <button
                    onClick={() =>
                      handleAddToDiary(
                        searchResult.foodName,
                        searchResult.caloriesPer100g,
                        searchResult.netCarbsPerPortion,
                        searchResult.proteinPer100g,
                        searchResult.fatPer100g
                      )
                    }
                    className="py-2 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition whitespace-nowrap"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Adicionar ao Diário</span>
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* Search History */}
          {searchHistory.length > 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <h4 className="font-extrabold text-xs text-slate-200 flex items-center gap-2">
                  <History className="w-4 h-4 text-emerald-400" />
                  <span>Alimentos Consultados Recentemente</span>
                </h4>
                <button
                  onClick={() => {
                    setSearchHistory([]);
                    localStorage.removeItem(STORAGE_SEARCH_HISTORY);
                  }}
                  className="text-[10px] text-slate-500 hover:text-slate-300 transition"
                >
                  Limpar
                </button>
              </div>

              <div className="space-y-2">
                {searchHistory.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setSearchResult(item);
                      setSearchQuery(item.foodName);
                    }}
                    className="bg-slate-950/80 hover:bg-slate-800/80 border border-slate-800/80 rounded-2xl p-3 flex items-center justify-between cursor-pointer transition"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span
                          className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded ${
                            !item.hasCarbs
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : item.zeroCarbCompatibility.includes('Moderado')
                              ? 'bg-amber-500/20 text-amber-400'
                              : 'bg-rose-500/20 text-rose-400'
                          }`}
                        >
                          {!item.hasCarbs ? '0g Carbo' : `${item.netCarbsPerPortion}g Líq`}
                        </span>
                        {item.timestamp && <span className="text-[10px] text-slate-500">{item.timestamp}</span>}
                      </div>
                      <h5 className="font-bold text-xs text-slate-200 truncate">{item.foodName}</h5>
                    </div>

                    <ChevronRight className="w-4 h-4 text-slate-500 shrink-0 ml-2" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
