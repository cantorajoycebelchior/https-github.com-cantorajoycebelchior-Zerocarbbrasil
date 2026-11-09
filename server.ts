import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '15mb' }));

// Lazy initializer for Gemini Client
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY environment variable is not set. Gemini features will run in fallback mock mode.');
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'Zero Carb Brasil', timestamp: new Date().toISOString() });
});

// 1. Chat Nutricional com IA
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, userProfile } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      // Fallback smart response if key is absent
      return res.json({
        reply: `Dieta Zero Carb Brasil: Aqui consumimos estritamente 0g de carboidrato! Os alimentos permitidos são exclusivamente: **Ovos**, **Carnes** (boi, peixe, frango, porco), **Queijos**, **Presunto** e **Café com adoçante**. Nenhuma receita com carboidratos é permitida.\n\nCombine essa alimentação com os nossos **treinos semanais em casa** para máxima queima de gordura e preservação de massa magra!\n\n*Nota: Esta orientação não substitui acompanhamento médico ou nutricional.*`,
      });
    }

    const systemInstruction = `Você é o assistente oficial de IA Nutricional e Treinos do aplicativo "Zero Carb Brasil".
Você é um especialista em alimentação Carnívora / Zero Carb e Treinos Funcionais em Casa.

REGRA DE OURO ABSOLUTA DO ZERO CARB BRASIL:
Esta dieta é ESTRITA e permite EXCLUSIVAMENTE os seguintes alimentos (0g de carbo líquido):
1. Ovos (todos os preparos sem farinhas)
2. Carnes: Boi, Peixe/Frutos do Mar, Frango e Porco
3. Queijos (muçarela, prato, canastra, parmesão, provolone, gorgonzola - 0g carbo)
4. Presunto (sem adição de amido/açúcar)
5. Verduras com 0g de Carboidrato Líquido (rúcula, agrião, espinafre na manteiga, alface americana/crespa, couve-manteiga fininha na banha, escarola, acelga, broto de alfafa, salsinha/cebolinha)
6. Café com adoçante (estévia, sucralose) e água pura/com gás.
Gorduras para preparo: manteiga ou banha de porco e sal.
O aplicativo conta com uma coleção de 50 receitas completas 100% zero carboidrato.

PROIBIÇÃO DE CARBOIDRATOS LÍQUIDOS:
NENHUMA receita recomendada pode ter carboidratos líquidos (DEVE TER RIGOROSAMENTE 0.0g de carbo líquido).
NÃO sugira tubérculos (batata, mandioca), grãos (arroz, feijão, aveia), frutas ricas em frutose, açúcares, doces ou farinhas convencionais.


TREINOS EM CASA:
Você também orienta sobre a rotina de treinos semanais em casa disponíveis no aplicativo (exercícios com o peso do próprio corpo sem equipamentos, como agachamentos, flexões, pranchas, afundos e cardio metabólico).

DADOS DO USUÁRIO ATUAL:
- Objetivo: ${userProfile?.goal || 'Emagrecer com 0g de carbo e treino em casa'}
- Limite diário de Carboidratos: 0g (Zero Carb Estrito)
- Peso: ${userProfile?.currentWeight || 70}kg, Altura: ${userProfile?.height || 170}cm

DIRETRIZES DE RESPOSTA:
1. Responda SEMPRE em Português do Brasil (pt-BR) de forma amigável, clara, motivadora e direta.
2. Reafirme sempre o princípio de 0g de carboidratos líquidos e a lista restrita de alimentos permitidos.
3. Se perguntado sobre treinos, incentive a realização dos treinos semanais em casa do app.
4. Finalize respostas relevantes com uma nota discreta: "*Esta resposta possui caráter informativo e não substitui consulta médica ou nutricional.*"`;

    // Map conversation history
    const contents = (messages || []).map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    if (contents.length === 0) {
      contents.push({ role: 'user', parts: [{ text: 'Olá! Como você pode me ajudar na dieta low carb?' }] });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || 'Desculpe, não consegui processar sua dúvida nutricional no momento.';
    return res.json({ reply });
  } catch (err: any) {
    console.error('Chat API Error:', err);
    res.status(500).json({
      error: 'Erro ao conectar com a IA Nutricional.',
      details: err?.message || String(err),
    });
  }
});

// Fallback smart analyzer for product labels / packaging when AI is unavailable or as quick baseline
function getFallbackProductAnalysis(textHint?: string) {
  const lower = (textHint || '').toLowerCase();
  
  if (lower.includes('presunto') || lower.includes('bacon') || lower.includes('queijo') || lower.includes('frango') || lower.includes('carne') || lower.includes('ovo')) {
    return {
      productName: textHint || 'Alimento Proteico Animal (Carne / Queijo / Ovo)',
      hasCarbs: false,
      totalCarbs: 0.0,
      netCarbs: 0.0,
      fiber: 0.0,
      protein: 24.5,
      fat: 16.0,
      calories: 242,
      servingSize: '100g',
      status: 'zero_carb',
      verdict: '🟢 100% ZERO CARBOIDRATO - PERMITIDO NA DIETA ZERO CARB BRASIL',
      isZeroCarbAllowed: true,
      hiddenSugarsOrStarches: [],
      ingredientsAnalysis: 'Produto de origem animal puro. Livre de carboidratos, farinhas e açúcares adicionados. Mantém o corpo em estado profundo de cetose.',
      recommendation: 'Excelente para qualquer período do dia. Tempere apenas com sal e prepare com manteiga ou banha de porco.',
    };
  }

  if (lower.includes('pao') || lower.includes('tapioca') || lower.includes('biscoito') || lower.includes('arroz') || lower.includes('batata') || lower.includes('doce')) {
    return {
      productName: textHint || 'Alimento Rico em Amido / Açúcar',
      hasCarbs: true,
      totalCarbs: 58.0,
      netCarbs: 55.0,
      fiber: 3.0,
      protein: 7.0,
      fat: 2.0,
      calories: 270,
      servingSize: '100g',
      status: 'alto_carbo',
      verdict: '🔴 CONTÉM CARBOIDRATOS ALTOS - PROIBIDO NA DIETA ZERO CARB',
      isZeroCarbAllowed: false,
      hiddenSugarsOrStarches: ['Amido modificado', 'Farinha refinada', 'Açúcar'],
      ingredientsAnalysis: 'Este produto é rico em carboidratos de rápida absorção e estimula picos de insulina, bloqueando a queima de gordura.',
      recommendation: 'Substitua por pão carnívoro de ovos e queijo, omelete de presunto ou tiras de frango grelhado.',
    };
  }

  return {
    productName: 'Iogurte Grego Natural sem Açúcar',
    hasCarbs: true,
    totalCarbs: 4.2,
    netCarbs: 4.2,
    fiber: 0.0,
    protein: 6.8,
    fat: 5.5,
    calories: 93,
    servingSize: '100g (1 pote)',
    status: 'baixo_carbo',
    verdict: '🟡 ATENÇÃO: CONTÉM CARBOIDRATO LÍQUIDO (4.2g)',
    isZeroCarbAllowed: false,
    hiddenSugarsOrStarches: ['Lactose (açúcar natural do leite)'],
    ingredientsAnalysis: 'Embora não tenha açúcar refinado adicionado, contém 4.2g de carboidratos por porção provenientes da lactose do leite. Não é 100% Zero Carb.',
    recommendation: 'Para manter 0g absoluto de carbo, prefira queijos curados (parmesão, canastra) ou carnes magras.',
  };
}

// 2. Scanner IA de Produtos (Câmera / Foto de Rótulo, Embalagem ou Prato)
app.post('/api/scan-carb-product', async (req, res) => {
  try {
    const { imageBase64, sampleText } = req.body;
    const ai = getGeminiClient();

    if (!ai || !imageBase64) {
      return res.json(getFallbackProductAnalysis(sampleText));
    }

    let mimeType = 'image/jpeg';
    let cleanBase64 = imageBase64;
    if (imageBase64.includes(';base64,')) {
      const parts = imageBase64.split(';base64,');
      mimeType = parts[0].replace('data:', '');
      cleanBase64 = parts[1];
    }

    const promptText = `Você é o analisador oficial de IA do "Zero Carb Brasil", especialista em ler rótulos, tabelas nutricionais (normas Anvisa RDC 429/In 75), listas de ingredientes e fotos de embalagens ou pratos.
Sua missão primordial é responder:
1. ESTE PRODUTO TEM CARBOIDRATO? (SIM ou NÃO, com quantidade exata de carboidratos totais e carboidratos líquidos).
2. CONTÉM AÇÚCARES OU AMIDOS OCULTOS? (Detectar se há maltodextrina, dextrose, sacarose, xarope de milho/glicose, amido modificado, polidextrose, maltitol, farinhas, etc. na lista de ingredientes).
3. É PERMITIDO NA DIETA ZERO CARB BRASIL?
   - REGRA ESTRITA: A Dieta Zero Carb permite apenas: Ovos, Carnes (boi, frango, peixe, porco), Queijos, Presunto puro, Café com adoçante e Verduras com 0g de carbo líquido.
   - Se o produto tiver > 0.0g de carbo líquido ou aditivos de amido/açúcar, o status DEVE ser 'alto_carbo' ou 'baixo_carbo' e isZeroCarbAllowed DEVE ser false.
   - Somente se tiver 0.0g de carbo líquido e ingredientes permitidos, o status será 'zero_carb' e isZeroCarbAllowed true.

Retorne rigorosamente um JSON estruturado com:
- productName: string (Nome exato ou identificado do produto)
- hasCarbs: boolean (true se contiver qualquer quantidade > 0.1g de carboidrato, false se for estritamente 0g)
- totalCarbs: number (Carboidratos totais em gramas por porção)
- netCarbs: number (Carboidratos líquidos = totalCarbs - fibras/polióis em gramas)
- fiber: number (Fibras alimentares em gramas)
- protein: number (Proteínas em gramas)
- fat: number (Gorduras totais em gramas)
- calories: number (Calorias kcal por porção)
- servingSize: string (Ex: '100g', '2 fatias (30g)', '1 xícara')
- status: string (Uma das 3 opções: 'zero_carb' | 'baixo_carbo' | 'alto_carbo')
- verdict: string (Veredito em maiúsculas com emoji, ex: '🟢 100% ZERO CARBOIDRATO - PERMITIDO NA DIETA' ou '🔴 CONTÉM CARBOIDRATO - PROIBIDO NA ZERO CARB' ou '🟡 ATENÇÃO: BAIXO CARBO MAS NÃO É ZERO')
- isZeroCarbAllowed: boolean (true apenas se for 100% Zero Carb permitido na regra da dieta)
- hiddenSugarsOrStarches: array de strings (Nomes de açúcares/amidos/aditivos ocultos encontrados na lista de ingredientes, ou vazio [] se não houver)
- ingredientsAnalysis: string (Explicação em 2 frases em pt-BR avaliando os ingredientes reais do produto)
- recommendation: string (Recomendação clara para o usuário: se pode comer à vontade, se deve evitar, ou qual o melhor substituto 0g carbo)`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType,
              data: cleanBase64,
            },
          },
          { text: promptText },
        ],
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            productName: { type: Type.STRING },
            hasCarbs: { type: Type.BOOLEAN },
            totalCarbs: { type: Type.NUMBER },
            netCarbs: { type: Type.NUMBER },
            fiber: { type: Type.NUMBER },
            protein: { type: Type.NUMBER },
            fat: { type: Type.NUMBER },
            calories: { type: Type.NUMBER },
            servingSize: { type: Type.STRING },
            status: { type: Type.STRING, enum: ['zero_carb', 'baixo_carbo', 'alto_carbo'] },
            verdict: { type: Type.STRING },
            isZeroCarbAllowed: { type: Type.BOOLEAN },
            hiddenSugarsOrStarches: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            ingredientsAnalysis: { type: Type.STRING },
            recommendation: { type: Type.STRING },
          },
          required: ['productName', 'hasCarbs', 'totalCarbs', 'netCarbs', 'status', 'verdict', 'isZeroCarbAllowed', 'ingredientsAnalysis', 'recommendation'],
        },
      },
    });

    const parsedData = JSON.parse(response.text || '{}');
    return res.json(parsedData);
  } catch (err: any) {
    console.warn('Scan Carb Product AI temporarily unavailable, using fallback analyzer:', err?.message);
    const fallback = getFallbackProductAnalysis(req.body?.sampleText || 'Produto Alimentício');
    return res.json(fallback);
  }
});

// Legacy backward-compatible endpoint for existing components
app.post('/api/scan-label', async (req, res) => {
  try {
    const { imageBase64 } = req.body;
    const ai = getGeminiClient();

    if (!ai || !imageBase64) {
      return res.json({
        productName: 'Iogurte Grego Natural sem Açúcar',
        servingSize: '100g (1 pote)',
        calories: 95,
        totalCarbs: 4.2,
        fiber: 0,
        netCarbs: 4.2,
        protein: 6.5,
        fat: 5.8,
        classification: 'Excelente',
        ingredientAlerts: [],
        verdict: 'Excelente opção para dieta low carb e cetogênica! Possui baixo teor de carboidratos líquidos e boa quantidade de gorduras e proteínas de alto valor biológico.',
      });
    }

    let mimeType = 'image/jpeg';
    let cleanBase64 = imageBase64;
    if (imageBase64.includes(';base64,')) {
      const parts = imageBase64.split(';base64,');
      mimeType = parts[0].replace('data:', '');
      cleanBase64 = parts[1];
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType,
              data: cleanBase64,
            },
          },
          { text: 'Analise este rótulo ou tabela nutricional e extraia productName, servingSize, calories, totalCarbs, fiber, netCarbs, protein, fat, classification (Excelente, Bom, Moderado, Evite), ingredientAlerts e verdict em JSON.' },
        ],
      },
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsedData = JSON.parse(response.text || '{}');
    return res.json(parsedData);
  } catch (err: any) {
    console.error('Scan Label Legacy Error:', err);
    res.status(500).json({ error: 'Erro ao processar imagem do rótulo.', details: err?.message || String(err) });
  }
});

// Built-in intelligent food database for instant fallback when searching foods
const BUILTIN_FOOD_DATABASE: Record<string, any> = {
  'tapioca': {
    foodName: 'Goma de Tapioca / Beiju',
    hasCarbs: true,
    carbsPer100g: 54.0,
    carbsPerPortion: 27.0,
    portionDescription: '1 unidade média recheada (50g de goma)',
    netCarbsPerPortion: 26.5,
    fiberPer100g: 0.5,
    proteinPer100g: 0.2,
    fatPer100g: 0.1,
    caloriesPer100g: 220,
    glycemicIndex: 'Muito Alto',
    zeroCarbCompatibility: 'Proibido na Zero Carb',
    summary: 'A tapioca é amido puro de mandioca e possui altíssimo índice glicêmico (IG ~115), provocando picos imediatos de insulina e interrompendo a cetose.',
    hiddenCarbWarning: 'Muitos acreditam que tapioca é saudável por não ter glúten, mas é rica em carboidratos puros.',
    mealPeriodSuggestions: {
      cafeDaManha: 'Substitua por Ovos Mexidos com Bacon e Queijo na Manteiga ou Pão Carnívoro de Frigideira (0g carbo).',
      almoco: 'Consuma Picanha ou Peito de Frango grelhado com rúcula e azeite (0g carbo). Não use tapioca.',
      lanche: 'Faça Rolinhos de Queijo Prato com Presunto ou Ovos Cozidos com sal e pimenta.',
      jantar: 'Omelete de 3 ovos recheado com queijo muçarela derretido e presunto.',
      ceia: 'Chá de camomila sem açúcar ou uma fatia de queijo canastra/parmesão.'
    },
    zeroCarbSubstitutes: ['Pão Carnívoro de Queijo e Ovo na Frigideira', 'Omelete Recheado com Presunto', 'Crepioca Carnívora (sem goma, apenas ovo e queijo ralado)'],
    keyTip: 'Na Dieta Zero Carb Brasil, a tapioca é terminantemente proibida. O substituto perfeito é o omelete recheado.'
  },
  'pao': {
    foodName: 'Pão Francês Tradicional',
    hasCarbs: true,
    carbsPer100g: 58.5,
    carbsPerPortion: 29.0,
    portionDescription: '1 unidade de pão francês (50g)',
    netCarbsPerPortion: 27.5,
    fiberPer100g: 2.3,
    proteinPer100g: 8.0,
    fatPer100g: 1.5,
    caloriesPer100g: 280,
    glycemicIndex: 'Muito Alto',
    zeroCarbCompatibility: 'Proibido na Zero Carb',
    summary: 'O pão francês é feito de farinha de trigo refinada. Uma única unidade contém cerca de 29g de carboidratos líquidos, proibido na alimentação Zero Carb.',
    hiddenCarbWarning: 'Farinha de trigo enriquece o sangue com glicose mais rápido que o açúcar puro.',
    mealPeriodSuggestions: {
      cafeDaManha: 'Faça o "Pão Carnívoro da Joyce": 2 ovos batidos com 40g de queijo parmesão e sal, dourados na frigideira com manteiga. 0g de carbo!',
      almoco: 'Dispense acompanhamentos de farinha. Prato principal: Bife ancho ou sobrecoxa de frango assada.',
      lanche: 'Cubos de queijo provolone e fatias de presunto de parma ou cozido.',
      jantar: 'Filé de tilápia na manteiga de garrafa com sal e ervas permitidas.',
      ceia: 'Água com gás e gotas de limão ou café descafeinado com adoçante.'
    },
    zeroCarbSubstitutes: ['Pão Carnívoro de Frigideira (Ovos + Queijo)', 'Waffle Carnívoro de Frango Desfiado e Ovo', 'Ovos Fritos na Manteiga com Queijo Coalho'],
    keyTip: 'Substitua o pão da manhã por ovos mexidos cremosos na manteiga com queijo derretido.'
  },
  'ovo': {
    foodName: 'Ovo de Galinha (Frito na Manteiga ou Cozido)',
    hasCarbs: false,
    carbsPer100g: 0.6,
    carbsPerPortion: 0.3,
    portionDescription: '2 ovos grandes (100g)',
    netCarbsPerPortion: 0.0,
    fiberPer100g: 0.0,
    proteinPer100g: 13.0,
    fatPer100g: 12.0,
    caloriesPer100g: 155,
    glycemicIndex: 'Zero',
    zeroCarbCompatibility: '100% Zero Carb (Permitido)',
    summary: 'O ovo é o alimento padrão-ouro da Dieta Zero Carb Brasil! Fornece proteínas de altíssimo valor biológico, colina e gorduras saudáveis com 0g de carboidrato líquido.',
    hiddenCarbWarning: null,
    mealPeriodSuggestions: {
      cafeDaManha: '3 ovos mexidos na manteiga pura com fatias de queijo prato derretido e café com adoçante.',
      almoco: 'Ovos fritos com gema mole sobre bife bovino acebolado (sem farinha).',
      lanche: '2 ovos cozidos com pitada de flor de sal e fio de azeite.',
      jantar: 'Omelete fofo de 3 ovos com presunto em cubos e queijo muçarela.',
      ceia: 'Ovo pochê rápido ou shake carnívoro de claras e gemas pasteurizadas.'
    },
    zeroCarbSubstitutes: ['Alimento base permitido! Consuma à vontade.'],
    keyTip: 'Use ovos caipiras ou enriquecidos com ômega-3. Não use óleo de soja; prepare sempre na manteiga ou banha.'
  },
  'frango': {
    foodName: 'Peito ou Sobrecoxa de Frango Grelhado',
    hasCarbs: false,
    carbsPer100g: 0.0,
    carbsPerPortion: 0.0,
    portionDescription: '1 filé médio (150g)',
    netCarbsPerPortion: 0.0,
    fiberPer100g: 0.0,
    proteinPer100g: 31.0,
    fatPer100g: 3.6,
    caloriesPer100g: 165,
    glycemicIndex: 'Zero',
    zeroCarbCompatibility: '100% Zero Carb (Permitido)',
    summary: 'Carne 100% Zero Carb! O frango é rico em proteína magra, fósforo, selênio e niacina, ideal para preservação muscular e queima acelerada de gordura.',
    hiddenCarbWarning: 'Atenção aos temperos prontos industriais que costumam adicionar amido de milho e açúcar. Tempere apenas com sal, alho e ervas.',
    mealPeriodSuggestions: {
      cafeDaManha: 'Frango desfiado aquecido na manteiga com queijo muçarela derretido.',
      almoco: 'Sobrecoxa grelhada com a pele bem crocante e folhas de rúcula temperadas com azeite.',
      lanche: 'Iscas de peito de frango assadas na airfryer com sal grosso.',
      jantar: 'Filé de frango grelhado coberto com presunto e queijo derretido (Frango à Parmegiana sem farinha).',
      ceia: 'Caldo de frango caseiro com os ossos (bone broth) rico em colágeno.'
    },
    zeroCarbSubstitutes: ['Alimento base da dieta carnívora/zero carb. Permitido livremente.'],
    keyTip: 'Evite empanados de farinha de trigo ou rosca. Para empanar no estilo Zero Carb, use queijo parmesão ralado fininho!'
  },
  'carne': {
    foodName: 'Carne Bovina (Picanha, Contrafilé, Alcatra)',
    hasCarbs: false,
    carbsPer100g: 0.0,
    carbsPerPortion: 0.0,
    portionDescription: '1 bife generoso (200g)',
    netCarbsPerPortion: 0.0,
    fiberPer100g: 0.0,
    proteinPer100g: 26.0,
    fatPer100g: 18.0,
    caloriesPer100g: 260,
    glycemicIndex: 'Zero',
    zeroCarbCompatibility: '100% Zero Carb (Permitido)',
    summary: 'O carro-chefe da alimentação carnívora e Zero Carb! Fornece ferro heme, vitamina B12, creatina e carnosina sem um único grama de carboidrato.',
    hiddenCarbWarning: 'Evite molhos prontos como barbecue, ketchup ou madeira tradicionais que levam açúcar e xarope de milho.',
    mealPeriodSuggestions: {
      cafeDaManha: 'Tiras de bife acebolado ou hambúrguer 100% bovino com ovo frito por cima.',
      almoco: 'Picanha fatiada com capa de gordura grelhada ao ponto com sal grosso marinho.',
      lanche: 'Chips de carne seca caseira ou cubos de queijo e carne assada desfiada.',
      jantar: 'Contrafilé na manteiga com alho e ramos de alecrim.',
      ceia: 'Caldo de ossos bovinos com tutano, altamente restaurador para o sono.'
    },
    zeroCarbSubstitutes: ['Alimento essencial da dieta Zero Carb Brasil.'],
    keyTip: 'Mantenha a gordura natural da carne para saciedade duradoura e energia estável em cetose.'
  },
  'batata': {
    foodName: 'Batata Doce / Batata Inglesa Cozida',
    hasCarbs: true,
    carbsPer100g: 21.0,
    carbsPerPortion: 31.5,
    portionDescription: '1 batata média cozida (150g)',
    netCarbsPerPortion: 28.0,
    fiberPer100g: 2.2,
    proteinPer100g: 1.6,
    fatPer100g: 0.2,
    caloriesPer100g: 90,
    glycemicIndex: 'Alto',
    zeroCarbCompatibility: 'Proibido na Zero Carb',
    summary: 'Tubérculos são depósitos vegetais de amido puro. Cada porção contém mais de 28g de carboidratos líquidos, interrompendo a cetose e o protocolo Zero Carb.',
    hiddenCarbWarning: 'Embora a batata-doce seja popular no mundo fitness tradicional, ela NÃO cabe na dieta Zero Carb.',
    mealPeriodSuggestions: {
      cafeDaManha: 'Substitua por Ovos mexidos com cubos de bacon crocante.',
      almoco: 'Substitua o purê de batata por purê carnívoro de queijo ou apenas sirva carnes nobres com manteiga.',
      lanche: 'Queijo provolone desidratado crocante.',
      jantar: 'Salmão ou tilápia grelhada na manteiga com agrião e rúcula.',
      ceia: 'Infusão de hortelã ou água com gás gelada.'
    },
    zeroCarbSubstitutes: ['Purê de couve-flor ou queijo prato derretido', 'Ovos caipiras fritos na manteiga', 'Torresmo crocante na banha'],
    keyTip: 'Na Dieta Zero Carb Brasil, nenhum tubérculo é permitido. Obtenha energia da gordura saudável e proteínas.'
  },
  'arroz': {
    foodName: 'Arroz Branco ou Integral Cozido',
    hasCarbs: true,
    carbsPer100g: 28.2,
    carbsPerPortion: 35.0,
    portionDescription: '1 escumadeira cheia (125g)',
    netCarbsPerPortion: 34.0,
    fiberPer100g: 0.4,
    proteinPer100g: 2.5,
    fatPer100g: 0.3,
    caloriesPer100g: 130,
    glycemicIndex: 'Alto',
    zeroCarbCompatibility: 'Proibido na Zero Carb',
    summary: 'O arroz é grão com alta concentração de amido. Cada porção comum ultrapassa 34g de carboidratos líquidos, interrompendo a cetose imediatamente.',
    hiddenCarbWarning: 'Mesmo o arroz integral contém praticamente a mesma carga glicêmica que o arroz branco.',
    mealPeriodSuggestions: {
      cafeDaManha: 'Ovos mexidos com manteiga e queijo prato (0g carbo).',
      almoco: 'Substitua o arroz por tiras de carne grelhada na manteiga com folhas de agrião ou rúcula.',
      lanche: 'Ovos cozidos temperados com sal e pimenta ou rolinhos de queijo.',
      jantar: 'Sobrecoxa de frango com pele crocante e folhas de espinafre refogadas na manteiga.',
      ceia: 'Chá de erva-doce sem açúcar ou fatia de queijo provolone.'
    },
    zeroCarbSubstitutes: ['Arroz Carnívoro (peito de frango ralado fininho e salteado na manteiga)', 'Ovos mexidos com queijo derretido', 'Couve-manteiga refogada na banha'],
    keyTip: 'Elimine os grãos da sua rotina e foque no aporte proteico e lipídico dos alimentos animais.'
  },
  'feijao': {
    foodName: 'Feijão Carioca / Preto Cozido',
    hasCarbs: true,
    carbsPer100g: 14.0,
    carbsPerPortion: 18.0,
    portionDescription: '1 concha média (130g)',
    netCarbsPerPortion: 12.0,
    fiberPer100g: 5.5,
    proteinPer100g: 4.8,
    fatPer100g: 0.5,
    caloriesPer100g: 76,
    glycemicIndex: 'Médio',
    zeroCarbCompatibility: 'Proibido na Zero Carb',
    summary: 'Leguminosas como o feijão contêm amido e antinutrientes (fitatos). Não são permitidas na dieta Zero Carb Estrita.',
    hiddenCarbWarning: 'Muitos caldos de feijão contêm farinha para engrossar.',
    mealPeriodSuggestions: {
      cafeDaManha: 'Omelete de presunto e queijo na manteiga.',
      almoco: 'Carne de panela macia desfiando com bacon e sal marinho (sem feijão).',
      lanche: 'Fatias de queijo canastra e presunto cozido.',
      jantar: 'Costelinha de porco assada com crosta crocante.',
      ceia: 'Caldo de ossos caseiro rico em eletrólitos.'
    },
    zeroCarbSubstitutes: ['Caldo de ossos com tutano bovino', 'Bacon crocante na banha de porco', 'Carne moída refogada com queijo'],
    keyTip: 'O caldo de carne ou tutano substitui o sabor encorpado do feijão sem nenhum carboidrato.'
  },
  'queijo': {
    foodName: 'Queijo (Prato, Muçarela, Parmesão, Canastra)',
    hasCarbs: false,
    carbsPer100g: 0.5,
    carbsPerPortion: 0.1,
    portionDescription: '2 fatias grossas (50g)',
    netCarbsPerPortion: 0.0,
    fiberPer100g: 0.0,
    proteinPer100g: 25.0,
    fatPer100g: 30.0,
    caloriesPer100g: 370,
    glycemicIndex: 'Zero',
    zeroCarbCompatibility: '100% Zero Carb (Permitido)',
    summary: 'Queijos amarelos e curados são permitidos e excelentes na Dieta Zero Carb Brasil. Praticamente 0g de carboidrato líquido, ricos em cálcio e gorduras saciantes.',
    hiddenCarbWarning: 'Evite queijos fundidos ou cremosos ultraprocessados que levam amido modificado e óleo vegetal na fórmula.',
    mealPeriodSuggestions: {
      cafeDaManha: 'Queijo prato derretido na frigideira sobre ovos caipiras.',
      almoco: 'Bife à milanesa sem farinha: coberto com queijo muçarela e gratinado.',
      lanche: 'Chips de queijo parmesão assados na airfryer até dourarem.',
      jantar: 'Hambúrguer caseiro com crosta de queijo provolone derretido.',
      ceia: 'Cubinhos de queijo canastra com sal grosso.'
    },
    zeroCarbSubstitutes: ['Alimento permitido! Consuma queijos curados à vontade.'],
    keyTip: 'Prefira queijos curados e tradicionais (prato, muçarela, parmesão, provolone) que têm zero lactose.'
  },
  'presunto': {
    foodName: 'Presunto Cozido Magro / Presunto de Parma',
    hasCarbs: false,
    carbsPer100g: 0.0,
    carbsPerPortion: 0.0,
    portionDescription: '3 fatias finas (45g)',
    netCarbsPerPortion: 0.0,
    fiberPer100g: 0.0,
    proteinPer100g: 17.0,
    fatPer100g: 3.5,
    caloriesPer100g: 100,
    glycemicIndex: 'Zero',
    zeroCarbCompatibility: '100% Zero Carb (Permitido)',
    summary: 'O presunto puro (sem amido ou açúcar adicionado) é um alimento expressamente permitido na Dieta Zero Carb Brasil.',
    hiddenCarbWarning: 'Fique atento ao rótulo: algumas marcas adicionam amido de milho ou maltodextrina. Escolha sempre presunto cozido puro.',
    mealPeriodSuggestions: {
      cafeDaManha: 'Ovos mexidos com presunto picado na manteiga de garrafa.',
      almoco: 'Filé de frango recheado com presunto e queijo muçarela.',
      lanche: 'Rolinhos rápidos de presunto com queijo prato.',
      jantar: 'Omelete de 3 ovos com presunto e queijo derretido.',
      ceia: '2 fatias de presunto puro com água com gás.'
    },
    zeroCarbSubstitutes: ['Alimento base permitido na dieta.'],
    keyTip: 'Excelente para lanches rápidos entre as refeições sem risco de sair da cetose.'
  },
  'abacate': {
    foodName: 'Abacate Brasileiro',
    hasCarbs: true,
    carbsPer100g: 6.0,
    carbsPerPortion: 4.0,
    portionDescription: 'Meio abacate pequeno (100g)',
    netCarbsPerPortion: 2.0,
    fiberPer100g: 4.0,
    proteinPer100g: 1.5,
    fatPer100g: 15.0,
    caloriesPer100g: 160,
    glycemicIndex: 'Baixo',
    zeroCarbCompatibility: 'Low Carb Moderado (Atenção)',
    summary: 'Embora o abacate seja rico em gorduras boas e tenha baixo carbo líquido (~2g), a Dieta Zero Carb Estrita prioriza alimentos 100% de origem animal.',
    hiddenCarbWarning: 'Cuidado para nunca consumir com açúcar ou mel.',
    mealPeriodSuggestions: {
      cafeDaManha: 'Para 0g estrito, consuma ovos mexidos na manteiga. Se permitir cetogênica flexível, consuma com gotas de limão e sal.',
      almoco: 'Consuma cortes bovinos com sua gordura natural.',
      lanche: 'Queijo prato e presunto magro.',
      jantar: 'Salmão na manteiga com sal.',
      ceia: 'Chá calmante sem açúcar.'
    },
    zeroCarbSubstitutes: ['Manteiga pura de vaca', 'Banha de porco artesanal', 'Gema de ovo caipira'],
    keyTip: 'Se o objetivo for 0g rigoroso de carbo, substitua a gordura vegetal do abacate por manteiga pura ou banha.'
  },
  'castanha': {
    foodName: 'Castanha de Caju / Pará',
    hasCarbs: true,
    carbsPer100g: 30.0,
    carbsPerPortion: 9.0,
    portionDescription: '1 punhado pequeno (30g)',
    netCarbsPerPortion: 7.5,
    fiberPer100g: 3.3,
    proteinPer100g: 18.0,
    fatPer100g: 44.0,
    caloriesPer100g: 550,
    glycemicIndex: 'Médio',
    zeroCarbCompatibility: 'Low Carb Moderado (Atenção)',
    summary: 'A castanha de caju possui alta concentração de carboidratos (quase 30%). A castanha-do-pará tem menos, mas nenhuma é 0g de carbo.',
    hiddenCarbWarning: 'É muito fácil exagerar na porção e acumular 20g de carbo sem perceber.',
    mealPeriodSuggestions: {
      cafeDaManha: 'Prefira ovos caipiras e café com adoçante.',
      almoco: 'Carne bovina com capa de gordura grelhada.',
      lanche: 'Chips de provolone crocante ou torresmo artesanal sem farinha.',
      jantar: 'Peixe na manteiga com rúcula.',
      ceia: 'Água mineral pura ou com gás.'
    },
    zeroCarbSubstitutes: ['Torresmo crocante na banha (0g carbo)', 'Queijo provolone desidratado', 'Presunto fatiado'],
    keyTip: 'Substitua o crocante das castanhas por torresmo pururuca caseiro: zero carboidrato e muita saciedade.'
  },
  'refrigerante': {
    foodName: 'Refrigerante Tradicional (com Açúcar)',
    hasCarbs: true,
    carbsPer100g: 10.6,
    carbsPerPortion: 37.0,
    portionDescription: '1 lata (350ml)',
    netCarbsPerPortion: 37.0,
    fiberPer100g: 0.0,
    proteinPer100g: 0.0,
    fatPer100g: 0.0,
    caloriesPer100g: 42,
    glycemicIndex: 'Muito Alto',
    zeroCarbCompatibility: 'Proibido na Zero Carb',
    summary: 'Xarope de açúcar líquido puro! Uma única lata contém cerca de 7 colheres de açúcar, gerando explosão de insulina e bloqueio total da lipólise.',
    hiddenCarbWarning: 'Líquido calórico sem nenhuma saciedade.',
    mealPeriodSuggestions: {
      cafeDaManha: 'Café passado na hora com adoçante estévia ou sucralose.',
      almoco: 'Água mineral com gás, gelo e gotas de limão.',
      lanche: 'Chá mate gelado com adoçante.',
      jantar: 'Refrigerante Zero (sem açúcar) moderadamente, ou água com gás.',
      ceia: 'Chá de camomila morno.'
    },
    zeroCarbSubstitutes: ['Água com gás e rodelas de limão', 'Refrigerante Zero Açúcar (com moderação)', 'Café gelado com adoçante'],
    keyTip: 'Se quiser gás e refrescância, use água com gás bem gelada com gotas de limão e pitada de sal marinho!'
  }
};

// Comprehensive fallback builder for any food search query
function getFoodCarbFallback(query: string) {
  const clean = (query || '').trim();
  const normalized = clean.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  for (const key of Object.keys(BUILTIN_FOOD_DATABASE)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return BUILTIN_FOOD_DATABASE[key];
    }
  }

  // Check if it sounds animal/zero carb
  const isAnimalZeroCarb = /bife|picanha|maminha|alcatra|costela|porco|bacon|frango|peru|peixe|tilapia|salmao|camarao|ovo|omelete|queijo|presunto|manteiga|banha/.test(normalized);

  if (isAnimalZeroCarb) {
    return {
      foodName: clean,
      hasCarbs: false,
      carbsPer100g: 0.0,
      carbsPerPortion: 0.0,
      portionDescription: '1 porção média (150g)',
      netCarbsPerPortion: 0.0,
      fiberPer100g: 0.0,
      proteinPer100g: 27.0,
      fatPer100g: 15.0,
      caloriesPer100g: 240,
      glycemicIndex: 'Zero',
      zeroCarbCompatibility: '100% Zero Carb (Permitido)',
      summary: `O alimento "${clean}" é de origem animal e possui 0g de carboidrato líquido. É totalmente permitido e recomendado na Dieta Zero Carb Brasil.`,
      hiddenCarbWarning: 'Evite molhos ou temperos industriais prontos que possam conter açúcar e amido oculto.',
      mealPeriodSuggestions: {
        cafeDaManha: 'Excelente opção proteica para iniciar o dia sem quebrar a cetose.',
        almoco: 'Prato principal perfeito, prepare grelhado na manteiga ou banha com sal grosso.',
        lanche: 'Consuma em pequenas porções frias ou cubos com queijo.',
        jantar: 'Refeição altamente saciante que evita a fome noturna.',
        ceia: 'Pequena porção leve ou caldo da carne.'
      },
      zeroCarbSubstitutes: ['Alimento permitido na dieta carnívora/zero carb! Consuma à vontade.'],
      keyTip: 'Prepare sempre com manteiga pura ou banha de porco e tempere apenas com sal e pimenta.'
    };
  }

  return {
    foodName: clean,
    hasCarbs: true,
    carbsPer100g: 22.0,
    carbsPerPortion: 18.0,
    portionDescription: '1 porção habitual (100g)',
    netCarbsPerPortion: 16.0,
    fiberPer100g: 2.0,
    proteinPer100g: 3.5,
    fatPer100g: 2.0,
    caloriesPer100g: 120,
    glycemicIndex: 'Alto',
    zeroCarbCompatibility: 'Proibido na Zero Carb',
    summary: `O alimento "${clean}" possui carboidratos líquidos e não se enquadra na Dieta Zero Carb Brasil (que permite apenas Ovos, Carnes, Queijos, Presunto e Café com Adoçante).`,
    hiddenCarbWarning: 'Alimentos vegetais processados ou grãos estimulam a produção de insulina e paralisam a queima de gordura.',
    mealPeriodSuggestions: {
      cafeDaManha: 'Substitua por Ovos mexidos na manteiga com queijo derretido e café com adoçante.',
      almoco: 'Substitua por Bife bovino grelhado ou filé de frango com rúcula e azeite.',
      lanche: 'Substitua por rolinhos de queijo prato com presunto sem amido.',
      jantar: 'Substitua por Omelete de 3 ovos com queijo muçarela e sal.',
      ceia: 'Substitua por chá de camomila sem açúcar ou água com gás gelada.'
    },
    zeroCarbSubstitutes: ['Ovos mexidos na manteiga', 'Bife de ancho com queijo derretido', 'Presunto fatiado e cubos de queijo'],
    keyTip: 'Troque carboidratos por proteínas e gorduras nobres para manter a queima de gordura no nível máximo.'
  };
}

// 4. Endpoint de Consulta IA de Alimentos (Responde se tem carboidrato e sugere por período)
app.post('/api/search-food-carbs', async (req, res) => {
  try {
    const { query } = req.body;
    const cleanQuery = (query || '').trim();

    if (!cleanQuery) {
      return res.status(400).json({ error: 'Informe o nome do alimento para consulta.' });
    }

    const ai = getGeminiClient();

    if (!ai) {
      return res.json(getFoodCarbFallback(cleanQuery));
    }

    const promptText = `Você é o especialista mestre em nutrição do aplicativo "Zero Carb Brasil".
O usuário está pesquisando sobre o alimento: "${cleanQuery}".

Analise minuciosamente este alimento sob a ótica da DIETA ZERO CARB BRASIL:
1. RESPONDA CLARAMENTE: Este alimento TEM CARBOIDRATO? (SIM ou NÃO, com gramatura exata por 100g e por porção habitual).
2. COMPATIBILIDADE ZERO CARB:
   - A Dieta Zero Carb Brasil permite EXCLUSIVAMENTE: Ovos, Carnes (boi, frango, peixe, porco), Queijos (0g carbo), Presunto puro (sem amido/açúcar), Café com adoçante e Verduras com 0g carbo líquido (rúcula, agrião, espinafre na manteiga, alface, couve na banha).
   - Se tiver qualquer carboidrato ou for derivado de grãos, farinhas, açúcares, tubérculos ou frutas doces, classifique como "Proibido na Zero Carb" ou "Low Carb Moderado (Atenção)".
3. DÊ SUGESTÕES PRÁTICAS E DELICIOSAS PARA TODOS OS 5 PERÍODOS DE ALIMENTAÇÃO:
   - cafeDaManha: Como consumir esse alimento OU qual o substituto perfeito Zero Carb para o Café da Manhã caso proibido.
   - almoco: Sugestão prática para o Almoço.
   - lanche: Sugestão prática para o Lanche da Tarde.
   - jantar: Sugestão prática para o Jantar.
   - ceia: Sugestão prática para a Ceia / Pré-treino.
4. FORNEÇA 2 a 3 SUBSTITUTOS 100% ZERO CARBOIDRATO caso o alimento tenha carbo.

Retorne rigorosamente um JSON estruturado com:
- foodName: string (Nome em pt-BR correto do alimento)
- hasCarbs: boolean (true se contiver carboidratos líquidos > 0.2g, false se for 0g)
- carbsPer100g: number (Carboidratos totais em g por 100g)
- carbsPerPortion: number (Carboidratos totais em g por porção típica)
- portionDescription: string (Ex: '1 unidade (50g)', '1 filé médio (150g)', '1 colher de sopa')
- netCarbsPerPortion: number (Carboidratos líquidos por porção)
- fiberPer100g: number (Fibras em g)
- proteinPer100g: number (Proteínas em g por 100g)
- fatPer100g: number (Gorduras em g por 100g)
- caloriesPer100g: number (Calorias por 100g)
- glycemicIndex: string ('Zero' | 'Baixo' | 'Médio' | 'Alto' | 'Muito Alto')
- zeroCarbCompatibility: string ('100% Zero Carb (Permitido)' | 'Low Carb Moderado (Atenção)' | 'Proibido na Zero Carb')
- summary: string (Resumo direto de 2 a 3 frases respondendo se tem carboidrato e o impacto metabólico)
- hiddenCarbWarning: string ou null (Alerta se costuma esconder açúcares ou amidos industriais)
- mealPeriodSuggestions: {
    cafeDaManha: string,
    almoco: string,
    lanche: string,
    jantar: string,
    ceia: string
  }
- zeroCarbSubstitutes: array de strings (2 a 3 opções 100% 0g carbo deliciosas)
- keyTip: string (Dica de ouro em pt-BR)`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            foodName: { type: Type.STRING },
            hasCarbs: { type: Type.BOOLEAN },
            carbsPer100g: { type: Type.NUMBER },
            carbsPerPortion: { type: Type.NUMBER },
            portionDescription: { type: Type.STRING },
            netCarbsPerPortion: { type: Type.NUMBER },
            fiberPer100g: { type: Type.NUMBER },
            proteinPer100g: { type: Type.NUMBER },
            fatPer100g: { type: Type.NUMBER },
            caloriesPer100g: { type: Type.NUMBER },
            glycemicIndex: { type: Type.STRING, enum: ['Zero', 'Baixo', 'Médio', 'Alto', 'Muito Alto'] },
            zeroCarbCompatibility: {
              type: Type.STRING,
              enum: ['100% Zero Carb (Permitido)', 'Low Carb Moderado (Atenção)', 'Proibido na Zero Carb'],
            },
            summary: { type: Type.STRING },
            hiddenCarbWarning: { type: Type.STRING },
            mealPeriodSuggestions: {
              type: Type.OBJECT,
              properties: {
                cafeDaManha: { type: Type.STRING },
                almoco: { type: Type.STRING },
                lanche: { type: Type.STRING },
                jantar: { type: Type.STRING },
                ceia: { type: Type.STRING },
              },
              required: ['cafeDaManha', 'almoco', 'lanche', 'jantar', 'ceia'],
            },
            zeroCarbSubstitutes: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            keyTip: { type: Type.STRING },
          },
          required: [
            'foodName',
            'hasCarbs',
            'carbsPer100g',
            'carbsPerPortion',
            'portionDescription',
            'netCarbsPerPortion',
            'zeroCarbCompatibility',
            'summary',
            'mealPeriodSuggestions',
            'zeroCarbSubstitutes',
            'keyTip',
          ],
        },
      },
    });

    const parsedData = JSON.parse(response.text || '{}');
    return res.json(parsedData);
  } catch (err: any) {
    console.warn('Search Food Carbs AI temporarily busy, using specialized fallback:', err?.message);
    const fallback = getFoodCarbFallback(req.body?.query || '');
    return res.json(fallback);
  }
});

// 5. Gerador de Refeição IA por Ingredientes
app.post('/api/generate-meal', async (req, res) => {
  try {
    const { ingredients, maxCalories, maxNetCarbs, mealType } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        title: 'Omelete Carnívoro com Queijo Muçarela e Presunto na Manteiga',
        prepTime: '6 min',
        calories: 340,
        netCarbs: 0,
        protein: 28,
        fat: 25,
        servings: 1,
        ingredientsList: [
          '3 ovos caipiras batidos',
          '50g de queijo muçarela ou prato ralado (0g carbo)',
          '40g de presunto cozido fatiado em tiras',
          '1 colher de manteiga pura para dourar',
          'Pitada de sal marinho',
        ],
        stepByStep: [
          'Bata os 3 ovos com o sal marinho em uma tigela.',
          'Aqueça a frigideira com uma ponta de manteiga pura em fogo médio.',
          'Despeje os ovos e distribua o presunto picado.',
          'Cubra com o queijo muçarela e dobre o omelete ao meio quando firmar.',
          'Deixe o queijo derreter completamente e sirva quente. 100% Zero Carboidrato!',
        ],
        ketoTip: 'Rigorosamente 0g de carboidratos! Apenas ingredientes permitidos: ovos, queijo e presunto para queima contínua de gordura.',
      });
    }

    const promptText = `Crie uma receita saudável e deliciosa em Português do Brasil para o aplicativo "Zero Carb Brasil".
REGRA OBRIGATÓRIA E ABSOLUTA:
Esta dieta só permite EXCLUSIVAMENTE: Ovos, Carnes (boi, peixe, frango, porco), Queijos, Presunto, Café com Adoçante e Verduras com 0g de Carboidrato Líquido (rúcula, agrião, espinafre na manteiga, alfaces, couve-manteiga fininha na banha, escarola, acelga).
NÃO É PERMITIDO NENHUM GRAMA DE CARBOIDRATO LÍQUIDO. O campo netCarbs DEVE SER RIGOROSAMENTE 0 (zero).
PROIBIDO incluir: farinhas de trigo/amido, açúcares, tubérculos (batata, mandioca), grãos (arroz, feijão), frutas ricas em frutose ou ultraprocessados.

Ingredientes disponíveis informados pelo usuário: ${ingredients || 'Ovos, Carne bovina, Peito de Frango, Queijo Muçarela, Presunto, Rúcula, Manteiga'}.
Tipo de refeição: ${mealType || 'Almoço/Jantar'}.
Calorias máximas: ${maxCalories || 450} kcal.

Retorne rigorosamente um JSON no seguinte formato:
- title: Nome apetitoso da receita 100% Zero Carb
- prepTime: Tempo estimado (ex: '12 min')
- calories: Calorias totais estimadas (número)
- netCarbs: 0 (DEVE ser 0, exatamente zero gramas)
- protein: Proteínas em gramas (número)
- fat: Gorduras em gramas (número)
- servings: Número de porções (ex: 1 ou 2)
- ingredientsList: Array de strings com os ingredientes permitidos e quantidades
- stepByStep: Array de strings com os passos do preparo
- ketoTip: Uma dica carnívora / zero carb em pt-BR`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            prepTime: { type: Type.STRING },
            calories: { type: Type.NUMBER },
            netCarbs: { type: Type.NUMBER },
            protein: { type: Type.NUMBER },
            fat: { type: Type.NUMBER },
            servings: { type: Type.NUMBER },
            ingredientsList: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            stepByStep: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            ketoTip: { type: Type.STRING },
          },
          required: ['title', 'calories', 'netCarbs', 'protein', 'fat', 'ingredientsList', 'stepByStep'],
        },
      },
    });

    const mealData = JSON.parse(response.text || '{}');
    return res.json(mealData);
  } catch (err: any) {
    console.error('Generate Meal Error:', err);
    res.status(500).json({ error: 'Erro ao gerar receita com IA.', details: err?.message || String(err) });
  }
});

// Start Express + Vite Middleware Server
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Zero Carb Brasil Server rodando em http://0.0.0.0:${PORT}`);
  });
}

startServer();
