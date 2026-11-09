import { FoodItem, Recipe, MealPlanDay, Challenge, Badge, LabelScanResult, HighCarbFoodItem } from '../types';

// ============================================================================
// ALIMENTOS PERMITIDOS ZERO CARB BRASIL (ESTRITAMENTE 0g DE CARBOIDRATO)
// Apenas: Ovos, Carnes (Boi, Peixe, Frango, Porco), Queijos, Presunto e Café com Adoçante
// ============================================================================
export const BRAZILIAN_FOODS: FoodItem[] = [
  // --- CARNES BOVINAS (0g CARBO) ---
  { id: 'f1', name: 'Picanha bovina grelhada (com capa de gordura)', category: 'Carnes', servingSize: '100g', calories: 288, totalCarbs: 0, fiber: 0, netCarbs: 0, protein: 26, fat: 20, classification: 'Excelente' },
  { id: 'f2', name: 'Contrafilé grelhado na manteiga', category: 'Carnes', servingSize: '100g', calories: 260, totalCarbs: 0, fiber: 0, netCarbs: 0, protein: 27, fat: 17, classification: 'Excelente' },
  { id: 'f3', name: 'Carne moída (Patinho/Acém) refogada', category: 'Carnes', servingSize: '100g', calories: 215, totalCarbs: 0, fiber: 0, netCarbs: 0, protein: 26, fat: 12, classification: 'Excelente' },
  { id: 'f4', name: 'Costela bovina assada no bafo', category: 'Carnes', servingSize: '100g', calories: 330, totalCarbs: 0, fiber: 0, netCarbs: 0, protein: 22, fat: 27, classification: 'Excelente' },
  { id: 'f5', name: 'Maminha bovina assada ou grelhada', category: 'Carnes', servingSize: '100g', calories: 240, totalCarbs: 0, fiber: 0, netCarbs: 0, protein: 28, fat: 14, classification: 'Excelente' },
  { id: 'f6', name: 'Alcatra grelhada com sal grosso', category: 'Carnes', servingSize: '100g', calories: 218, totalCarbs: 0, fiber: 0, netCarbs: 0, protein: 30, fat: 10, classification: 'Excelente' },

  // --- CARNES DE FRANGO / AVES (0g CARBO) ---
  { id: 'f7', name: 'Peito de frango grelhado na manteiga', category: 'Carnes', servingSize: '100g', calories: 165, totalCarbs: 0, fiber: 0, netCarbs: 0, protein: 31, fat: 3.6, classification: 'Excelente' },
  { id: 'f8', name: 'Sobrecoxa de frango assada com pele', category: 'Carnes', servingSize: '100g', calories: 232, totalCarbs: 0, fiber: 0, netCarbs: 0, protein: 24, fat: 15, classification: 'Excelente' },
  { id: 'f9', name: 'Asinha de frango dourada crocante', category: 'Carnes', servingSize: '100g', calories: 240, totalCarbs: 0, fiber: 0, netCarbs: 0, protein: 22, fat: 17, classification: 'Excelente' },
  { id: 'f10', name: 'Frango a passarinho frito na banha', category: 'Carnes', servingSize: '100g', calories: 260, totalCarbs: 0, fiber: 0, netCarbs: 0, protein: 25, fat: 18, classification: 'Excelente' },

  // --- PEIXES (0g CARBO) ---
  { id: 'f11', name: 'Filé de Salmão grelhado', category: 'Carnes', servingSize: '100g', calories: 206, totalCarbs: 0, fiber: 0, netCarbs: 0, protein: 22, fat: 12, classification: 'Excelente' },
  { id: 'f12', name: 'Filé de Tilápia grelhado na manteiga', category: 'Carnes', servingSize: '100g', calories: 128, totalCarbs: 0, fiber: 0, netCarbs: 0, protein: 26, fat: 2.6, classification: 'Excelente' },
  { id: 'f13', name: 'Sardinha fresca grelhada com azeite', category: 'Carnes', servingSize: '100g', calories: 208, totalCarbs: 0, fiber: 0, netCarbs: 0, protein: 25, fat: 11, classification: 'Excelente' },
  { id: 'f14', name: 'Posta de Atum grelhada', category: 'Carnes', servingSize: '100g', calories: 144, totalCarbs: 0, fiber: 0, netCarbs: 0, protein: 30, fat: 1.5, classification: 'Excelente' },

  // --- CARNES SUÍNAS (0g CARBO) ---
  { id: 'f15', name: 'Costelinha suína assada no sal grosso', category: 'Carnes', servingSize: '100g', calories: 310, totalCarbs: 0, fiber: 0, netCarbs: 0, protein: 23, fat: 24, classification: 'Excelente' },
  { id: 'f16', name: 'Bisteca de porco grelhada', category: 'Carnes', servingSize: '100g', calories: 250, totalCarbs: 0, fiber: 0, netCarbs: 0, protein: 28, fat: 15, classification: 'Excelente' },
  { id: 'f17', name: 'Lombo suíno fatiado assado', category: 'Carnes', servingSize: '100g', calories: 198, totalCarbs: 0, fiber: 0, netCarbs: 0, protein: 31, fat: 8.0, classification: 'Excelente' },
  { id: 'f18', name: 'Panceta crocante ou Torresmo puro', category: 'Carnes', servingSize: '50g', calories: 270, totalCarbs: 0, fiber: 0, netCarbs: 0, protein: 18, fat: 22, classification: 'Excelente' },
  { id: 'f19', name: 'Bacon artesanal frito em tiras', category: 'Carnes', servingSize: '30g', calories: 160, totalCarbs: 0, fiber: 0, netCarbs: 0, protein: 11, fat: 12, classification: 'Excelente' },

  // --- OVOS (0g CARBO LÍQUIDO) ---
  { id: 'f20', name: 'Ovo de galinha frito na manteiga/banha', category: 'Ovos', servingSize: '1 unid (50g)', calories: 102, totalCarbs: 0, fiber: 0, netCarbs: 0, protein: 6.5, fat: 8.5, classification: 'Excelente' },
  { id: 'f21', name: 'Ovos mexidos com manteiga', category: 'Ovos', servingSize: '2 unid (100g)', calories: 190, totalCarbs: 0, fiber: 0, netCarbs: 0, protein: 13, fat: 15, classification: 'Excelente' },
  { id: 'f22', name: 'Ovo de galinha cozido firme', category: 'Ovos', servingSize: '1 unid (50g)', calories: 72, totalCarbs: 0, fiber: 0, netCarbs: 0, protein: 6.3, fat: 4.8, classification: 'Excelente' },
  { id: 'f23', name: 'Ovo de codorna cozido', category: 'Ovos', servingSize: '5 unid (50g)', calories: 79, totalCarbs: 0, fiber: 0, netCarbs: 0, protein: 6.5, fat: 5.5, classification: 'Excelente' },

  // --- QUEIJOS SEM CARBOIDRATO (0g CARBO) ---
  { id: 'f24', name: 'Queijo Muçarela fatiado', category: 'Queijos', servingSize: '30g (1 fatia)', calories: 96, totalCarbs: 0, fiber: 0, netCarbs: 0, protein: 7.0, fat: 7.5, classification: 'Excelente' },
  { id: 'f25', name: 'Queijo Prato fatiado', category: 'Queijos', servingSize: '30g (1 fatia)', calories: 105, totalCarbs: 0, fiber: 0, netCarbs: 0, protein: 7.2, fat: 8.5, classification: 'Excelente' },
  { id: 'f26', name: 'Queijo Meia Cura / Canastra curado', category: 'Queijos', servingSize: '30g', calories: 115, totalCarbs: 0, fiber: 0, netCarbs: 0, protein: 7.8, fat: 9.5, classification: 'Excelente' },
  { id: 'f27', name: 'Queijo Parmesão curado em lascas', category: 'Queijos', servingSize: '20g', calories: 85, totalCarbs: 0, fiber: 0, netCarbs: 0, protein: 7.5, fat: 6.0, classification: 'Excelente' },
  { id: 'f28', name: 'Queijo Provolone curado fatiado', category: 'Queijos', servingSize: '30g', calories: 105, totalCarbs: 0, fiber: 0, netCarbs: 0, protein: 7.5, fat: 8.0, classification: 'Excelente' },
  { id: 'f29', name: 'Queijo Gorgonzola curado', category: 'Queijos', servingSize: '30g', calories: 105, totalCarbs: 0, fiber: 0, netCarbs: 0, protein: 6.5, fat: 8.8, classification: 'Excelente' },

  // --- PRESUNTO (0g CARBO) ---
  { id: 'f30', name: 'Presunto cozido fatiado tradicional (sem amido/açúcar)', category: 'Presunto', servingSize: '30g (2 fatias)', calories: 42, totalCarbs: 0, fiber: 0, netCarbs: 0, protein: 6.0, fat: 1.8, classification: 'Excelente' },
  { id: 'f31', name: 'Presunto cru / Parma curado fatiado', category: 'Presunto', servingSize: '30g', calories: 75, totalCarbs: 0, fiber: 0, netCarbs: 0, protein: 8.5, fat: 4.5, classification: 'Excelente' },

  // --- VERDURAS ZERO CARBO LÍQUIDO (0g CARBO LÍQUIDO APÓS FIBRAS) ---
  { id: 'f_v1', name: 'Rúcula fresca (folhas lavadas)', category: 'Verduras', servingSize: '50g (1 prato fundo)', calories: 12, totalCarbs: 1.0, fiber: 1.0, netCarbs: 0, protein: 1.3, fat: 0.3, classification: 'Excelente' },
  { id: 'f_v2', name: 'Agrião fresco (folhas e talos macios)', category: 'Verduras', servingSize: '50g (1 prato fundo)', calories: 9, totalCarbs: 0.6, fiber: 0.6, netCarbs: 0, protein: 1.2, fat: 0.1, classification: 'Excelente' },
  { id: 'f_v3', name: 'Espinafre salteado na manteiga pura', category: 'Verduras', servingSize: '80g (1 porção)', calories: 48, totalCarbs: 1.2, fiber: 1.2, netCarbs: 0, protein: 2.4, fat: 4.2, classification: 'Excelente' },
  { id: 'f_v4', name: 'Alface Americana crocante', category: 'Verduras', servingSize: '50g (4 folhas grandes)', calories: 7, totalCarbs: 0.8, fiber: 0.8, netCarbs: 0, protein: 0.5, fat: 0.1, classification: 'Excelente' },
  { id: 'f_v5', name: 'Alface Crespa fresca', category: 'Verduras', servingSize: '50g (4 folhas)', calories: 7, totalCarbs: 0.7, fiber: 0.7, netCarbs: 0, protein: 0.6, fat: 0.1, classification: 'Excelente' },
  { id: 'f_v6', name: 'Alface Romana fresca', category: 'Verduras', servingSize: '50g (4 folhas)', calories: 8, totalCarbs: 0.9, fiber: 0.9, netCarbs: 0, protein: 0.6, fat: 0.1, classification: 'Excelente' },
  { id: 'f_v7', name: 'Couve-Manteiga fininha refogada na banha de porco', category: 'Verduras', servingSize: '60g (1 porção)', calories: 52, totalCarbs: 1.3, fiber: 1.3, netCarbs: 0, protein: 2.0, fat: 4.5, classification: 'Excelente' },
  { id: 'f_v8', name: 'Escarola / Chicória refogada com bacon', category: 'Verduras', servingSize: '80g (1 porção)', calories: 65, totalCarbs: 1.1, fiber: 1.1, netCarbs: 0, protein: 3.2, fat: 5.5, classification: 'Excelente' },
  { id: 'f_v9', name: 'Acelga fresca ou salteada na banha', category: 'Verduras', servingSize: '80g', calories: 28, totalCarbs: 1.0, fiber: 1.0, netCarbs: 0, protein: 1.5, fat: 2.2, classification: 'Excelente' },
  { id: 'f_v10', name: 'Broto de Alfafa fresco crocante', category: 'Verduras', servingSize: '40g', calories: 9, totalCarbs: 0.5, fiber: 0.5, netCarbs: 0, protein: 1.4, fat: 0.2, classification: 'Excelente' },
  { id: 'f_v11', name: 'Endívia fresca em folhas', category: 'Verduras', servingSize: '50g', calories: 9, totalCarbs: 0.7, fiber: 0.7, netCarbs: 0, protein: 0.6, fat: 0.1, classification: 'Excelente' },
  { id: 'f_v12', name: 'Cheiro-Verde (Salsinha & Cebolinha picadas)', category: 'Verduras', servingSize: '20g (2 colheres sopa)', calories: 7, totalCarbs: 0.5, fiber: 0.5, netCarbs: 0, protein: 0.6, fat: 0.1, classification: 'Excelente' },
  { id: 'f_v13', name: 'Radicchio / Alface Roxa fresca', category: 'Verduras', servingSize: '40g', calories: 8, totalCarbs: 0.6, fiber: 0.6, netCarbs: 0, protein: 0.6, fat: 0.1, classification: 'Excelente' },
  { id: 'f_v14', name: 'Coentro fresco picado', category: 'Verduras', servingSize: '15g', calories: 4, totalCarbs: 0.3, fiber: 0.3, netCarbs: 0, protein: 0.3, fat: 0.1, classification: 'Excelente' },

  // --- CAFÉ COM ADOÇANTE & BEBIDAS (0g CARBO) ---
  { id: 'f32', name: 'Café preto expresso puro ou coado com adoçante', category: 'Bebidas', servingSize: '1 xícara (100ml)', calories: 2, totalCarbs: 0, fiber: 0, netCarbs: 0, protein: 0.2, fat: 0, classification: 'Excelente' },
  { id: 'f33', name: 'Café gelado com adoçante (estévia/sucralose)', category: 'Bebidas', servingSize: '200ml', calories: 2, totalCarbs: 0, fiber: 0, netCarbs: 0, protein: 0.2, fat: 0, classification: 'Excelente' },
  { id: 'f34', name: 'Água mineral natural ou com gás', category: 'Bebidas', servingSize: '300ml', calories: 0, totalCarbs: 0, fiber: 0, netCarbs: 0, protein: 0, fat: 0, classification: 'Excelente' },
];

// ============================================================================
// RECEITAS 100% ZERO CARBOIDRATO (50 RECEITAS COMPLETAS 0.0g)
// Ovos, Carnes (Boi, Frango, Peixe, Porco), Queijos, Presunto e Verduras Zero Carbo
// ============================================================================
import { ALL_ZERO_CARB_RECIPES } from './recipesData';
export const LOW_CARB_RECIPES: Recipe[] = ALL_ZERO_CARB_RECIPES;


// ============================================================================
// CARDÁPIOS SEMANAIS ZERO CARB BRASIL (ESTRITAMENTE 0g DE CARBOIDRATO)
// Apenas carnes (boi, frango, peixe, porco), ovos, queijos, presunto e café
// ============================================================================
export const MEAL_PLANS: MealPlanDay[] = [
  {
    kcalTarget: 1200,
    title: 'Cardápio 1200 kcal - Zero Carb Rápido (Cetose Profunda)',
    description: 'Focado em máxima queima de gordura e estabilidade total de glicemia com 0g de carboidratos.',
    totalNetCarbs: 0,
    totalKcal: 1200,
    breakfast: { name: '2 ovos mexidos na manteiga + 1 fatia de queijo muçarela + Café com adoçante', netCarbs: 0, kcal: 260 },
    lunch: { name: '160g de filé de peito de frango grelhado na manteiga + 2 fatias de presunto', netCarbs: 0, kcal: 380 },
    dinner: { name: '150g de filé de tilápia ou salmão grelhado com crosta de queijo parmesão', netCarbs: 0, kcal: 390 },
    snack: { name: '30g de queijo Canastra curado + Café gelado com adoçante', netCarbs: 0, kcal: 170 }
  },
  {
    kcalTarget: 1500,
    title: 'Cardápio 1500 kcal - Zero Carb Clássico (Padrão)',
    description: 'Equilíbrio ideal de proteínas nobres e gorduras naturais com 0g de carboidrato para o dia a dia.',
    totalNetCarbs: 0,
    totalKcal: 1510,
    breakfast: { name: 'Omelete de 3 ovos com presunto picado e queijo muçarela + Café com adoçante', netCarbs: 0, kcal: 360 },
    lunch: { name: '180g de contrafilé ou picanha na chapa com queijo prato derretido', netCarbs: 0, kcal: 520 },
    dinner: { name: '180g de sobrecoxa de frango assada com pele + 30g de queijo provolone', netCarbs: 0, kcal: 440 },
    snack: { name: '2 ovos cozidos com sal marinho + 2 fatias de presunto', netCarbs: 0, kcal: 190 }
  },
  {
    kcalTarget: 1800,
    title: 'Cardápio 1800 kcal - Zero Carb Hiper-Proteico & Treinos em Casa',
    description: 'Perfeito para manter energia alta nos treinos semanais em casa e acelerar a recuperação muscular.',
    totalNetCarbs: 0,
    totalKcal: 1800,
    breakfast: { name: '3 ovos mexidos na manteiga + 40g de queijo meia cura + 2 fatias de presunto + Café com adoçante', netCarbs: 0, kcal: 430 },
    lunch: { name: '200g de carne moída bovina com 2 ovos estalados por cima e queijo prato', netCarbs: 0, kcal: 580 },
    dinner: { name: '200g de costelinha suína assada ou salmão grelhado na manteiga', netCarbs: 0, kcal: 550 },
    snack: { name: 'Rolinho de presunto com queijo muçarela grelhado na frigideira + Café expresso', netCarbs: 0, kcal: 240 }
  },
  {
    kcalTarget: 2000,
    title: 'Cardápio 2000 kcal - Carnívoro Completo & Tônus Muscular',
    description: 'Máxima densidade nutricional para preservação e ganho de massa magra com 0g de carboidratos.',
    totalNetCarbs: 0,
    totalKcal: 2020,
    breakfast: { name: 'Omelete de 4 ovos com presunto em cubos e queijo Canastra + Café com adoçante', netCarbs: 0, kcal: 520 },
    lunch: { name: '220g de picanha bovina grelhada na brasa/chapa com queijo derretido', netCarbs: 0, kcal: 680 },
    dinner: { name: '200g de filé de peixe (salmão/tilápia) ou bisteca de porco dourada na banha', netCarbs: 0, kcal: 560 },
    snack: { name: '40g de torresmo crocante + 30g de queijo provolone curado + Café gelado com adoçante', netCarbs: 0, kcal: 260 }
  }
];

export const INITIAL_CHALLENGES: Challenge[] = [
  { id: 'c1', title: '7 Dias Zero Carb Estrito', description: 'Consuma estritamente apenas os alimentos permitidos: carnes, ovos, queijos, presunto e café.', durationDays: 7, currentDay: 4, isActive: true, isCompleted: false, badgeName: 'Lorde Zero Carb' },
  { id: 'c2', title: 'Semana de Treinos em Casa', description: 'Realize os treinos diários em casa para queimar gordura e acelerar a cetose por 7 dias seguidos.', durationDays: 7, currentDay: 2, isActive: true, isCompleted: false, badgeName: 'Atleta Caseiro' },
  { id: 'c3', title: '21 Dias Cetose Pura 0g Carbo', description: 'Mantenha os carboidratos rigorosamente zerados por 3 semanas consecutivas com energia inabalável.', durationDays: 21, currentDay: 0, isActive: false, isCompleted: false, badgeName: 'Mestre da Cetose Pura' }
];

export const INITIAL_BADGES: Badge[] = [
  { id: 'b1', name: 'Leitor de Rótulos 0g', description: 'Escaneou um rótulo com a IA para verificar carboidratos ocultos.', iconName: 'Camera', isUnlocked: true, unlockedDate: 'Hoje' },
  { id: 'b2', name: 'Lorde Zero Carb', description: 'Manteve 0g de carboidrato consumindo apenas alimentos permitidos.', iconName: 'ShieldCheck', isUnlocked: false },
  { id: 'b3', name: 'Atleta de Casa', description: 'Concluiu os treinos semanais funcionais no conforto de casa.', iconName: 'Dumbbell', isUnlocked: true, unlockedDate: 'Hoje' },
  { id: 'b4', name: 'Hidratação de Ouro', description: 'Atingiu a meta de 2.5 Litros de água em um único dia.', iconName: 'Droplet', isUnlocked: true, unlockedDate: 'Ontem' },
  { id: 'b5', name: 'Disciplina de Aço', description: 'Seguiu o cardápio rigorosamente sem adicionar nenhum carboidrato.', iconName: 'Flame', isUnlocked: true, unlockedDate: 'Hoje' }
];

// Alimentos ricos em carboidratos (para consulta dos itens PROIBIDOS na dieta)
export const HIGH_CARB_FOODS: HighCarbFoodItem[] = [
  // Pães e Massas
  { id: 'hc1', name: 'Pão Francês Tradicional', category: 'Pães e Massas', servingSize: '1 unidade (50g)', totalCarbs: 28.5, netCarbs: 27.2, sugarGrams: 1.5, glycemicIndex: 'Alto', impactNote: 'Provoca pico imediato de glicemia e elevação drástica da insulina, interrompendo a queima de gordura e o estado de cetose.' },
  { id: 'hc2', name: 'Goma de Tapioca Pronta', category: 'Pães e Massas', servingSize: '1 disco (50g)', totalCarbs: 27.0, netCarbs: 26.5, sugarGrams: 0, glycemicIndex: 'Muito Alto', impactNote: 'Mito da alimentação saudável: tapioca tem alto índice glicêmico e quase 100% do seu peso seco é puramente carboidrato de rápida absorção.' },
  { id: 'hc3', name: 'Macarrão de Trigo Espaguete', category: 'Pães e Massas', servingSize: '100g (cozido)', totalCarbs: 31.0, netCarbs: 29.2, sugarGrams: 0.8, glycemicIndex: 'Alto', impactNote: 'Rico em glúten e amido refinado. 1 prato médio de macarrão equivale a mais de 60g de carboidratos líquidos puros.' },
  { id: 'hc4', name: 'Pão de Forma Integral', category: 'Pães e Massas', servingSize: '2 fatias (50g)', totalCarbs: 24.0, netCarbs: 21.0, sugarGrams: 3.5, glycemicIndex: 'Médio', impactNote: 'Contém açúcares ocultos e farinha de trigo refinada maquiada de integral. Bloqueia o emagrecimento.' },

  // Grãos e Cereais
  { id: 'hc5', name: 'Arroz Branco Cozido', category: 'Grãos e Cereais', servingSize: '1 escumadeira (100g)', totalCarbs: 28.1, netCarbs: 27.5, sugarGrams: 0.1, glycemicIndex: 'Alto', impactNote: 'Isento de fibras significativas. Converte-se quase integralmente em glicose no sangue em poucos minutos.' },
  { id: 'hc6', name: 'Feijão Carioca Cozido com Caldo', category: 'Grãos e Cereais', servingSize: '1 concha (100g)', totalCarbs: 14.0, netCarbs: 8.5, sugarGrams: 0.2, glycemicIndex: 'Médio', impactNote: 'Possui 8.5g de carboidratos líquidos por concha, estourando a cota de uma dieta Zero Carb.' },
  { id: 'hc7', name: 'Aveia em Flocos', category: 'Grãos e Cereais', servingSize: '3 colheres de sopa (30g)', totalCarbs: 19.8, netCarbs: 16.5, sugarGrams: 0.5, glycemicIndex: 'Médio', impactNote: 'Carrega elevada carga de carboidratos que estimulam a insulina e quebram a cetose.' },
  { id: 'hc8', name: 'Granola Doce Crocante', category: 'Grãos e Cereais', servingSize: '40g (meio copo)', totalCarbs: 28.0, netCarbs: 25.0, sugarGrams: 12.0, glycemicIndex: 'Alto', impactNote: 'Geralmente enriquecida com mel, xarope de milho e açúcar de cana. É uma bomba calórica de carboidrato refinado.' },

  // Tubérculos e Raízes
  { id: 'hc9', name: 'Mandioca / Aipim Cozido', category: 'Tubérculos e Raízes', servingSize: '100g', totalCarbs: 38.0, netCarbs: 36.2, sugarGrams: 1.8, glycemicIndex: 'Alto', impactNote: 'Uma das raízes com maior densidade de amido. Proibida na alimentação Zero Carb.' },
  { id: 'hc10', name: 'Batata Doce Assada', category: 'Tubérculos e Raízes', servingSize: '100g', totalCarbs: 24.0, netCarbs: 20.7, sugarGrams: 6.5, glycemicIndex: 'Médio', impactNote: 'Contém alto teor de amido e açúcar natural, paralisando a queima de gordura corporal.' },
  { id: 'hc11', name: 'Batata Inglesa Cozida / Purê', category: 'Tubérculos e Raízes', servingSize: '100g', totalCarbs: 20.1, netCarbs: 18.3, sugarGrams: 0.9, glycemicIndex: 'Alto', impactNote: 'O amido da batata cozida se degrada rapidamente em glicose no sangue.' },

  // Frutas e Doces
  { id: 'hc12', name: 'Banana Prata Madura', category: 'Frutas e Doces', servingSize: '1 unidade média (90g)', totalCarbs: 22.8, netCarbs: 20.2, sugarGrams: 12.0, glycemicIndex: 'Alto', impactNote: 'Rica em frutose e sacarose. 1 banana ultrapassa a cota de carboidratos do dia.' },
  { id: 'hc13', name: 'Suco de Laranja Natural Espremido', category: 'Frutas e Doces', servingSize: '1 copo (250ml)', totalCarbs: 26.0, netCarbs: 25.5, sugarGrams: 21.0, glycemicIndex: 'Muito Alto', impactNote: 'Equivale ao consumo de 3 a 4 laranjas sem as fibras. A frutose sobrecarrega o fígado.' },
  { id: 'hc14', name: 'Açúcar Refinado / Cristal', category: 'Frutas e Doces', servingSize: '1 colher de sopa (15g)', totalCarbs: 15.0, netCarbs: 15.0, sugarGrams: 15.0, glycemicIndex: 'Muito Alto', impactNote: '100% sacarose pura. O maior vilão da resistência à insulina.' },
  { id: 'hc15', name: 'Maçã Fuji', category: 'Frutas e Doces', servingSize: '1 unidade média (130g)', totalCarbs: 18.0, netCarbs: 14.8, sugarGrams: 13.0, glycemicIndex: 'Médio', impactNote: 'Possui frutose livre que interrompe o estado de jejum e cetose.' },

  // Bebidas Açucaradas
  { id: 'hc16', name: 'Refrigerante Cola Tradicional', category: 'Bebidas Açucaradas', servingSize: '1 lata (350ml)', totalCarbs: 37.0, netCarbs: 37.0, sugarGrams: 37.0, glycemicIndex: 'Muito Alto', impactNote: 'Contém cerca de 10 colheres de chá de açúcar refinado dissolvido.' },
  { id: 'hc17', name: 'Cerveja Pilsen Tradicional', category: 'Bebidas Açucaradas', servingSize: '1 lata (350ml)', totalCarbs: 12.6, netCarbs: 12.6, sugarGrams: 0, glycemicIndex: 'Muito Alto', impactNote: 'Carrega maltose do malte de cevada ("pão líquido"), interrompendo imediatamente a cetose.' },

  // Ultraprocessados
  { id: 'hc18', name: 'Biscoito Recheado de Chocolate', category: 'Ultraprocessados', servingSize: '3 unidades (30g)', totalCarbs: 21.0, netCarbs: 20.0, sugarGrams: 11.0, glycemicIndex: 'Muito Alto', impactNote: 'Farinha refinada, gordura vegetal hidrogenada e açúcar. Viciante e inflamatório.' },
  { id: 'hc19', name: 'Batata Frita Industrializada', category: 'Ultraprocessados', servingSize: '100g', totalCarbs: 35.0, netCarbs: 31.5, sugarGrams: 0.3, glycemicIndex: 'Alto', impactNote: 'Amido frito em óleos sementeiros inflamatórios.' }
];

export const SAMPLE_LABELS: { label: string; result: LabelScanResult; imgPreview: string }[] = [
  {
    label: 'Presunto Cozido Especial',
    imgPreview: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=400&q=80',
    result: {
      productName: 'Presunto Cozido Sem Adição de Amido',
      servingSize: '40g (2 fatias)',
      calories: 55,
      totalCarbs: 0,
      fiber: 0,
      netCarbs: 0,
      protein: 8.5,
      fat: 2.2,
      classification: 'Excelente',
      ingredientAlerts: [],
      verdict: 'Perfeito para o Zero Carb Brasil! 0g de carboidrato, sem açúcares ou amidos ocultos.'
    }
  },
  {
    label: 'Queijo Muçarela Artesanal',
    imgPreview: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=400&q=80',
    result: {
      productName: 'Queijo Muçarela Peça Tradicional',
      servingSize: '30g (1 fatia)',
      calories: 96,
      totalCarbs: 0,
      fiber: 0,
      netCarbs: 0,
      protein: 7.0,
      fat: 7.5,
      classification: 'Excelente',
      ingredientAlerts: [],
      verdict: 'Alimento 100% aprovado na dieta Zero Carb! Rico em proteínas e gorduras nobres, com zero carboidratos.'
    }
  },
  {
    label: 'Pão "Integral" Industrializado',
    imgPreview: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80',
    result: {
      productName: 'Pão de Forma dito "Integral"',
      servingSize: '50g (2 fatias)',
      calories: 130,
      totalCarbs: 24.0,
      fiber: 3.0,
      netCarbs: 21.0,
      protein: 4.5,
      fat: 1.5,
      classification: 'Evite',
      ingredientAlerts: ['Farinha de Trigo', 'Açúcar Mascavo', 'Maltodextrina'],
      verdict: 'PROIBIDO NO ZERO CARB! Possui 21g de carboidratos líquidos e quebra a cetose imediatamente.'
    }
  }
];
