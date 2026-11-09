import { WeeklyHomeWorkout } from '../types';

export const WEEKLY_HOME_WORKOUTS: WeeklyHomeWorkout[] = [
  {
    id: 'w-segunda',
    dayOfWeek: 'segunda',
    dayLabel: 'Segunda-feira',
    title: 'Treino A: Pernas, Glúteos & Queima Metabólica',
    focus: 'Membros Inferiores & Aceleração da Cetose',
    level: 'Intermediário',
    durationMin: 22,
    caloriesBurnEstimate: 210,
    equipment: 'Nenhum equipamento (apenas o chão ou colchonete)',
    fullSessionTitle: 'Vídeo-Aula Completa em Português: Pernas e Glúteos em Casa',
    fullSessionVideoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=treino+completo+pernas+e+gluteos+em+casa+portugues',
    fullSessionYoutubeUrl: 'https://www.youtube.com/results?search_query=treino+completo+pernas+e+gluteos+em+casa+portugues',
    warmup: [
      '30s de elevação leve de joelhos no lugar',
      '10 rotações de quadril e tornozelos para cada lado',
      '10 agachamentos lentos sem carga para lubrificar as articulações'
    ],
    cooldown: [
      'Alongamento de quadríceps puxando o pé atrás (30s cada perna)',
      'Alongamento de posteriores descendo o tronco com pernas retas (30s)',
      'Respirações profundas para desaceleração cardíaca'
    ],
    exercises: [
      {
        id: 'ex-seg-1',
        name: 'Agachamento Livre com Peso do Corpo',
        targetMuscles: 'Quadríceps, Glúteos e Core',
        setsAndReps: '3 séries de 15 a 20 repetições',
        durationSec: 45,
        videoLanguage: 'Português (pt-BR)',
        videoTitlePt: 'Como Fazer Agachamento Livre Corretamente em Casa',
        videoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=como+fazer+agachamento+livre+corretamente+exercicio+em+casa',
        youtubeSearchUrl: 'https://www.youtube.com/results?search_query=como+fazer+agachamento+livre+corretamente+exercicio+em+casa',
        videoDurationText: 'Tutorial pt-BR',
        breathingTip: 'Inspire lentamente ao descer o quadril; expire soltando o ar com força ao empurrar o chão e subir.',
        voiceGuidanceText: 'Atenção ao agachamento: pés na largura dos ombros, peito aberto e empurre o chão com os calcanhares. Vamos começar!',
        commonMistakes: [
          'Deixar os joelhos irem para dentro (valgo dinâmico)',
          'Tirar os calcanhares do chão durante a descida',
          'Curvar a coluna para a frente'
        ],
        instructions: [
          'Fique em pé com os pés na largura dos ombros e pontas levemente voltadas para fora.',
          'Mantenha o peito aberto, coluna neutra e abdômen bem contraído.',
          'Flexione os joelhos e empurre o quadril para trás como se fosse sentar em uma cadeira.',
          'Desça até as coxas ficarem paralelas ao chão (ou até onde conseguir com conforto).',
          'Empurre o chão com os calcanhares para retornar à posição inicial contraindo os glúteos no topo.'
        ],
        tips: 'Nunca deixe os joelhos dobrarem para dentro. Mantenha os calcanhares colados no chão o tempo todo!'
      },
      {
        id: 'ex-seg-2',
        name: 'Afundo Alternado para Trás (Reverse Lunge)',
        targetMuscles: 'Glúteos, Posterior de Coxa e Equilíbrio',
        setsAndReps: '3 séries de 12 repetições cada perna',
        durationSec: 50,
        videoLanguage: 'Português (pt-BR)',
        videoTitlePt: 'Execução Perfeita do Afundo / Passada para Trás',
        videoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=como+fazer+afundo+passada+para+tras+corretamente',
        youtubeSearchUrl: 'https://www.youtube.com/results?search_query=como+fazer+afundo+passada+para+tras+corretamente',
        videoDurationText: 'Tutorial pt-BR',
        breathingTip: 'Puxe o ar ao dar o passo atrás e descer o joelho; solte o ar ao retornar à posição de pé.',
        voiceGuidanceText: 'Afundo alternado: dê um passo firme para trás, mantenha o tronco ereto e o joelho da frente a 90 graus.',
        commonMistakes: [
          'Bater o joelho de trás com força no chão',
          'Inclinar o tronco excessivamente para a frente',
          'Deixar o pé da frente sem estabilidade no calcanhar'
        ],
        instructions: [
          'Em pé, dê um passo largo para trás com uma das pernas.',
          'Dobre os dois joelhos em um ângulo próximo de 90 graus, aproximando o joelho de trás do chão.',
          'O joelho da frente deve ficar alinhado com o tornozelo (não ultrapassar a ponta do pé).',
          'Faça força na perna da frente para retornar à posição inicial e alterne a perna.'
        ],
        tips: 'Fazer o afundo para trás protege a patela e ativa muito mais os glúteos do que o afundo para a frente.'
      },
      {
        id: 'ex-seg-3',
        name: 'Ponte de Glúteos no Chão (Elevação Pélvica)',
        targetMuscles: 'Glúteos Máximo e Região Lombar',
        setsAndReps: '3 séries de 20 repetições com pausa',
        durationSec: 45,
        videoLanguage: 'Português (pt-BR)',
        videoTitlePt: 'Elevação Pélvica / Ponte de Glúteo no Chão Passo a Passo',
        videoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=como+fazer+elevacao+pelvica+ponte+de+gluteo+no+chao',
        youtubeSearchUrl: 'https://www.youtube.com/results?search_query=como+fazer+elevacao+pelvica+ponte+de+gluteo+no+chao',
        videoDurationText: 'Tutorial pt-BR',
        breathingTip: 'Solte o ar no topo da elevação apertando o bumbum por 2 segundos; inspire ao descer.',
        voiceGuidanceText: 'Ponte de glúteos: empurre o quadril para cima com os calcanhares e aperte o glúteo no topo com firmeza!',
        commonMistakes: [
          'Hiperextender a lombar no alto ao invés de contrair o glúteo',
          'Afastar demais os pés dos glúteos gerando cãibra nos posteriores'
        ],
        instructions: [
          'Deite de costas no chão com os joelhos dobrados e pés firmes no chão na largura do quadril.',
          'Braços estendidos ao lado do corpo para estabilidade.',
          'Eleve o quadril em direção ao teto empurrando pelos calcanhares.',
          'No ponto mais alto, aperte os glúteos com força e segure por 2 segundos antes de descer lentamente.'
        ],
        tips: 'Não arqueie excessivamente a lombar no topo; a força deve vir 100% da contração dos glúteos!'
      },
      {
        id: 'ex-seg-4',
        name: 'Agachamento Sumô com Isometria',
        targetMuscles: 'Internos de Coxa (Adutores) e Glúteos',
        setsAndReps: '3 séries de 15 reps + 10s segurando embaixo',
        durationSec: 45,
        videoLanguage: 'Português (pt-BR)',
        videoTitlePt: 'Agachamento Sumô: Posição dos Pés e Execução Correta',
        videoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=como+fazer+agachamento+sumo+em+casa+postura',
        youtubeSearchUrl: 'https://www.youtube.com/results?search_query=como+fazer+agachamento+sumo+em+casa+postura',
        videoDurationText: 'Tutorial pt-BR',
        breathingTip: 'Puxe o ar ao descer abrindo os joelhos para fora; solte o ar forte na subida.',
        voiceGuidanceText: 'Agachamento sumô: pernas bem abertas, pés apontando para fora e peito ereto. Sinta a parte interna das pernas.',
        commonMistakes: [
          'Deixar os joelhos fecharem para dentro',
          'Não abrir os pés na angulação correta de 45 graus'
        ],
        instructions: [
          'Afaste as pernas bem mais que a largura dos ombros com os pés apontando a 45 graus.',
          'Desça o quadril mantendo o tronco ereto e os joelhos apontando na mesma direção dos pés.',
          'Ao completar 15 repetições, permaneça parado no ponto mais baixo por 10 segundos antes de subir.'
        ],
        tips: 'Excelente exercício para esculpir a parte interna das pernas sem precisar de pesos.'
      },
      {
        id: 'ex-seg-5',
        name: 'Elevação de Panturrilhas no Chão ou Degrau',
        targetMuscles: 'Panturrilhas (Gastrocnêmio e Sóleo)',
        setsAndReps: '3 séries de 25 repetições concentradas',
        durationSec: 40,
        videoLanguage: 'Português (pt-BR)',
        videoTitlePt: 'Como Treinar Panturrilhas em Casa Corretamente',
        videoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=como+treinar+panturrilhas+em+casa+exercicio',
        youtubeSearchUrl: 'https://www.youtube.com/results?search_query=como+treinar+panturrilhas+em+casa+exercicio',
        videoDurationText: 'Tutorial pt-BR',
        breathingTip: 'Inspire ao descer os calcanhares; solte o ar ao subir na ponta dos pés.',
        voiceGuidanceText: 'Panturrilha: suba o mais alto possível na ponta dos pés, aperte 1 segundo e desça devagar.',
        commonMistakes: [
          'Fazer o movimento rápido e quicando sem pausa no topo',
          'Dobrar os joelhos em excesso'
        ],
        instructions: [
          'Em pé, pode apoiar levemente a ponta dos dedos na parede para equilíbrio.',
          'Suba na ponta dos pés o mais alto possível, contraindo a panturrilha no topo.',
          'Desça de forma controlada até o calcanhar quase tocar o solo e repita imediatamente.'
        ],
        tips: 'Melhora o retorno venoso, a circulação sanguínea nas pernas e define os membros inferiores.'
      }
    ]
  },
  {
    id: 'w-terca',
    dayOfWeek: 'terca',
    dayLabel: 'Terça-feira',
    title: 'Treino B: Superiores, Peitoral & Braços Firmes',
    focus: 'Peitoral, Tríceps, Ombros e Costas',
    level: 'Iniciante',
    durationMin: 20,
    caloriesBurnEstimate: 180,
    equipment: 'Cadeira ou sofá firme e toalha',
    fullSessionTitle: 'Vídeo-Aula Completa em Português: Braços, Costas e Peitoral sem Aparelhos',
    fullSessionVideoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=treino+completo+superiores+bracos+costas+em+casa+portugues',
    fullSessionYoutubeUrl: 'https://www.youtube.com/results?search_query=treino+completo+superiores+bracos+costas+em+casa+portugues',
    warmup: [
      'Rotação ampla de braços para frente e para trás (20 repetições)',
      'Abraços dinâmicos abrindo e cruzando os braços no peito (20 repetições)',
      'Prancha alta estática por 20 segundos'
    ],
    cooldown: [
      'Alongamento de peitoral abrindo os braços contra a parede (30s)',
      'Alongamento de tríceps puxando o cotovelo atrás da cabeça (20s cada lado)',
      'Alongamento de costas abraçando os próprios joelhos'
    ],
    exercises: [
      {
        id: 'ex-ter-1',
        name: 'Flexão de Braço (No Chão ou com Joelhos Apoiados)',
        targetMuscles: 'Peitoral Maior, Ombros e Tríceps',
        setsAndReps: '3 séries de 10 a 15 repetições',
        durationSec: 45,
        videoLanguage: 'Português (pt-BR)',
        videoTitlePt: 'Como Fazer Flexão de Braço para Iniciantes e Avançados',
        videoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=como+fazer+flexao+de+braco+iniciantes+exercicio+em+casa',
        youtubeSearchUrl: 'https://www.youtube.com/results?search_query=como+fazer+flexao+de+braco+iniciantes+exercicio+em+casa',
        videoDurationText: 'Tutorial pt-BR',
        breathingTip: 'Puxe o ar na descida em direção ao solo; solte o ar com vigor empurrando o chão na subida.',
        voiceGuidanceText: 'Flexão de braço: trave o abdômen, cotovelos a 45 graus e desça o peito em direção ao chão.',
        commonMistakes: [
          'Abrir os cotovelos em ângulo de 90 graus (em formato de T)',
          'Deixar o quadril cair ou empinar a lombar',
          'Descer apenas a cabeça e não o peito'
        ],
        instructions: [
          'Posicione as mãos no chão um pouco mais afastadas que a largura dos ombros.',
          'Se for iniciante, apoie os joelhos no chão; se for avançado, faça na ponta dos pés.',
          'Desça o peito em direção ao chão mantendo os cotovelos a 45 graus do tronco (não abra em T).',
          'Empurre o chão com firmeza até estender os braços, mantendo o abdômen firme.'
        ],
        tips: 'O corpo deve formar uma linha reta da cabeça aos joelhos/calcanhares. Não deixe o quadril cair.'
      },
      {
        id: 'ex-ter-2',
        name: 'Mergulho na Cadeira para Tríceps (Chair Dips)',
        targetMuscles: 'Tríceps (Tchauzinho) e Ombros',
        setsAndReps: '3 séries de 12 a 15 repetições',
        durationSec: 40,
        videoLanguage: 'Português (pt-BR)',
        videoTitlePt: 'Tríceps Banco / Cadeira: Postura Segura e Ativação Correta',
        videoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=como+fazer+triceps+banco+cadeira+corretamente',
        youtubeSearchUrl: 'https://www.youtube.com/results?search_query=como+fazer+triceps+banco+cadeira+corretamente',
        videoDurationText: 'Tutorial pt-BR',
        breathingTip: 'Inspire ao dobrar os cotovelos para trás; expire ao empurrar as palmas contra o assento.',
        voiceGuidanceText: 'Mergulho na cadeira: costas coladas no móvel, dobre os cotovelos para trás e empurre com o tríceps.',
        commonMistakes: [
          'Afastar o corpo para a frente da cadeira sobrecarregando o ombro',
          'Abrir os cotovelos para as laterais ao invés de apontar para trás'
        ],
        instructions: [
          'Sente-se na borda de uma cadeira ou sofá firme e apoie as mãos ao lado do quadril com dedos para frente.',
          'Deslize o quadril para fora da cadeira, mantendo as pernas flexionadas (ou estendidas para mais dificuldade).',
          'Dobre os cotovelos para trás, descendo o quadril rente à cadeira até os cotovelos atingirem 90 graus.',
          'Empurre com os braços estendendo os cotovelos para retornar.'
        ],
        tips: 'Mantenha as costas sempre bem próximas da cadeira para não sobrecarregar as articulações dos ombros.'
      },
      {
        id: 'ex-ter-3',
        name: 'Superman no Chão com Puxada de Costas',
        targetMuscles: 'Dorsais, Lombar e Deltoides Posteriores',
        setsAndReps: '3 séries de 15 repetições',
        durationSec: 45,
        videoLanguage: 'Português (pt-BR)',
        videoTitlePt: 'Exercício Superman para Lombar e Postura das Costas',
        videoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=como+fazer+exercicio+superman+lombar+costas',
        youtubeSearchUrl: 'https://www.youtube.com/results?search_query=como+fazer+exercicio+superman+lombar+costas',
        videoDurationText: 'Tutorial pt-BR',
        breathingTip: 'Inspire no solo; expire levantando o peito e puxando os cotovelos para trás.',
        voiceGuidanceText: 'Superman no chão: tire o peito do solo, puxe os cotovelos para trás e aperte as escápulas.',
        commonMistakes: [
          'Puxar a cabeça para cima forçando o pescoço',
          'Não ativar os glúteos para proteger a lombar'
        ],
        instructions: [
          'Deite de bruços no chão com braços e pernas estendidos.',
          'Simultaneamente, eleve o peito e as coxas do chão, contraindo glúteos e costas.',
          'No topo, puxe os cotovelos para trás em direção à cintura imaginando que está apertando as escápulas.',
          'Estenda os braços novamente e desça suavemente ao chão.'
        ],
        tips: 'Exercício primordial para corrigir a postura de quem passa muito tempo sentado no celular ou computador.'
      },
      {
        id: 'ex-ter-4',
        name: 'Prancha com Toque nos Ombros (Shoulder Tap)',
        targetMuscles: 'Core, Ombros e Estabilizadores',
        setsAndReps: '3 séries de 20 toques alternados',
        durationSec: 45,
        videoLanguage: 'Português (pt-BR)',
        videoTitlePt: 'Prancha Alta com Toque no Ombro: Estabilidade do Quadril',
        videoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=prancha+alta+toque+no+ombro+shoulder+tap+correto',
        youtubeSearchUrl: 'https://www.youtube.com/results?search_query=prancha+alta+toque+no+ombro+shoulder+tap+correto',
        videoDurationText: 'Tutorial pt-BR',
        breathingTip: 'Mantenha respiração contínua e constante sem prender o ar.',
        voiceGuidanceText: 'Prancha com toque nos ombros: trave o abdômen e não deixe o quadril balançar de um lado para o outro.',
        commonMistakes: [
          'Girar o quadril para os lados a cada toque',
          'Posicionar as mãos muito à frente dos ombros'
        ],
        instructions: [
          'Inicie na posição de prancha alta com as mãos alinhadas sob os ombros e pés um pouco afastados.',
          'Sem deixar o quadril rebolar ou girar, tire a mão direita do chão e toque suavemente o ombro esquerdo.',
          'Volte a mão direita ao chão e repita com a mão esquerda no ombro direito.',
          'Faça o movimento de forma lenta e altamente controlada.'
        ],
        tips: 'O segredo é travar o abdômen e glúteos para o quadril não mexer nada durante os toques!'
      }
    ]
  },
  {
    id: 'w-quarta',
    dayOfWeek: 'quarta',
    dayLabel: 'Quarta-feira',
    title: 'Treino C: HIIT Queima de Gordura & Cardio em Casa',
    focus: 'Aceleração Metabólica, Condicionamento e Gasto Calórico',
    level: 'Intermediário',
    durationMin: 18,
    caloriesBurnEstimate: 230,
    equipment: 'Apenas espaço livre na sala ou quarto',
    fullSessionTitle: 'Vídeo-Aula Completa em Português: Treino HIIT Queima Gordura em Casa',
    fullSessionVideoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=treino+hiit+queima+gordura+em+casa+portugues+iniciante',
    fullSessionYoutubeUrl: 'https://www.youtube.com/results?search_query=treino+hiit+queima+gordura+em+casa+portugues+iniciante',
    warmup: [
      'Passos laterais com balanço de braços (30s)',
      'Polichinelos em ritmo leve (30s)',
      'Respiração controlada'
    ],
    cooldown: [
      'Caminhada lenta pela sala por 1 minuto',
      'Alongamento de pernas e respirações profundas',
      'Beber um copo d’água gelada'
    ],
    exercises: [
      {
        id: 'ex-qua-1',
        name: 'Polichinelos Dinâmicos (Jumping Jacks)',
        targetMuscles: 'Cardiovascular, Panturrilhas e Ombros',
        setsAndReps: '4 séries de 40s ativo / 20s descanso',
        durationSec: 40,
        videoLanguage: 'Português (pt-BR)',
        videoTitlePt: 'Como Fazer Polichinelo Corretamente (com e sem impacto)',
        videoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=como+fazer+polichinelo+corretamente+sem+impacto',
        youtubeSearchUrl: 'https://www.youtube.com/results?search_query=como+fazer+polichinelo+corretamente+sem+impacto',
        videoDurationText: 'Tutorial pt-BR',
        breathingTip: 'Respire com ritmo compassado: inspire a cada dois saltos e expire ritmicamente.',
        voiceGuidanceText: 'Polichinelos: mantenha os pés leves na ponta, amorteça a queda e abra bem os braços. No seu ritmo!',
        commonMistakes: [
          'Aterrissar com os calcanhares no chão de forma pesada',
          'Não abrir os braços na amplitude completa'
        ],
        instructions: [
          'Em pé, pés juntos e braços ao lado do corpo.',
          'Salte abrindo as pernas e levantando os braços até as mãos quase se tocarem acima da cabeça.',
          'Salte novamente voltando os pés juntos e braços ao lado do corpo com ritmo constante.',
          'Se tiver restrição nos joelhos, faça sem pular: dê passos laterais alternados abrindo os braços.'
        ],
        tips: 'Amorteça a queda na ponta dos pés para proteger as articulações.'
      },
      {
        id: 'ex-qua-2',
        name: 'Corrida Estacionária com Elevação de Joelhos',
        targetMuscles: 'Flexores do Quadril, Abdômen e Cardio',
        setsAndReps: '4 séries de 35s ativo / 25s descanso',
        durationSec: 35,
        videoLanguage: 'Português (pt-BR)',
        videoTitlePt: 'Corrida no Lugar com Elevação de Joelhos (High Knees)',
        videoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=corrida+no+lugar+joelhos+altos+exercicio+em+casa',
        youtubeSearchUrl: 'https://www.youtube.com/results?search_query=corrida+no+lugar+joelhos+altos+exercicio+em+casa',
        videoDurationText: 'Tutorial pt-BR',
        breathingTip: 'Inspire pelo nariz e solte pela boca no ritmo dos passos.',
        voiceGuidanceText: 'Corrida no lugar: suba os joelhos até a altura da cintura, peito aberto e braços coordenados.',
        commonMistakes: [
          'Inclinar o tronco excessivamente para trás',
          'Pisar forte com o calcanhar'
        ],
        instructions: [
          'Simule uma corrida parado no mesmo lugar.',
          'Suba os joelhos até a altura da cintura, alternando os braços no ritmo da corrida.',
          'Mantenha o peito aberto e o tronco reto durante todo o exercício.'
        ],
        tips: 'Quanto mais alto você subir os joelhos, maior será o recrutamento dos músculos abdominais!'
      },
      {
        id: 'ex-qua-3',
        name: 'Escaladores no Chão (Mountain Climbers)',
        targetMuscles: 'Abdômen Total, Ombros e Queima Calórica',
        setsAndReps: '4 séries de 35s ativo / 25s descanso',
        durationSec: 35,
        videoLanguage: 'Português (pt-BR)',
        videoTitlePt: 'Mountain Climber / Escalador: Postura e Ritmo Ideal',
        videoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=como+fazer+mountain+climber+escalador+abdominal',
        youtubeSearchUrl: 'https://www.youtube.com/results?search_query=como+fazer+mountain+climber+escalador+abdominal',
        videoDurationText: 'Tutorial pt-BR',
        breathingTip: 'Não tranque a respiração; solte o ar cada vez que o joelho sobe ao peito.',
        voiceGuidanceText: 'Escaladores: posição de prancha, mãos firmes e puxe os joelhos para o peito de forma contínua e rápida.',
        commonMistakes: [
          'Elevar o quadril muito alto parecendo uma tenda',
          'Colocar o peso todo nos dedos ao invés da palma da mão'
        ],
        instructions: [
          'Fique na posição de prancha alta com as mãos no chão alinhadas sob os ombros.',
          'Puxe um joelho em direção ao peito com rapidez e controle.',
          'Alterne as pernas em movimento contínuo como se estivesse escalando uma ladeira íngreme.',
          'Mantenha o quadril alinhado com as costas (não empine o bumbum para cima).'
        ],
        tips: 'Excelente exercício que combina trabalho de abdômen intenso com queima máxima de calorias.'
      },
      {
        id: 'ex-qua-4',
        name: 'Burpee Adaptado ou Completo',
        targetMuscles: 'Corpo Inteiro (Full Body Explosivo)',
        setsAndReps: '3 séries de 30s ativo / 30s descanso',
        durationSec: 30,
        videoLanguage: 'Português (pt-BR)',
        videoTitlePt: 'Como Fazer Burpee Adaptado para Iniciantes sem Lesões',
        videoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=como+fazer+burpee+adaptado+iniciantes+exercicio',
        youtubeSearchUrl: 'https://www.youtube.com/results?search_query=como+fazer+burpee+adaptado+iniciantes+exercicio',
        videoDurationText: 'Tutorial pt-BR',
        breathingTip: 'Solte o ar com força ao pular ou ficar de pé.',
        voiceGuidanceText: 'Burpee adaptado: agache, apoie as mãos, jogue as pernas atrás, volte e levante com energia!',
        commonMistakes: [
          'Deixar a lombar desabar na posição de prancha',
          'Tentar fazer rápido demais perdendo a postura'
        ],
        instructions: [
          'Em pé, agache e apoie as mãos no chão.',
          'Jogue ou dê passos com os pés para trás até a posição de prancha.',
          'Retorne os pés para perto das mãos em um salto ou passos rápidos.',
          'Fique de pé e dê um salto estendendo os braços para o teto (ou apenas fique na ponta dos pés se preferir sem impacto).'
        ],
        tips: 'Faça no seu ritmo. O objetivo do treino HIIT é elevar seus batimentos cardíacos com segurança!'
      }
    ]
  },
  {
    id: 'w-quinta',
    dayOfWeek: 'quinta',
    dayLabel: 'Quinta-feira',
    title: 'Treino D: Abdômen Definido & Fortalecimento de Core',
    focus: 'Músculos Abdominais, Oblíquos e Estabilidade Lombar',
    level: 'Intermediário',
    durationMin: 20,
    caloriesBurnEstimate: 170,
    equipment: 'Colchonete, toalha ou tapete',
    fullSessionTitle: 'Vídeo-Aula Completa em Português: Abdômen Trincado e Core em Casa',
    fullSessionVideoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=treino+completo+abdomen+em+casa+portugues+definir',
    fullSessionYoutubeUrl: 'https://www.youtube.com/results?search_query=treino+completo+abdomen+em+casa+portugues+definir',
    warmup: [
      'Gato e Vaca (Cat-Cow) no chão (10 repetições lentas)',
      'Rotação suave do tronco sentado',
      'Ativação do vácuo abdominal (Bracing)'
    ],
    cooldown: [
      'Postura da Cobra (Alongamento suave da parede abdominal por 30s)',
      'Postura da Criança (Child’s pose) relaxando a lombar por 40s'
    ],
    exercises: [
      {
        id: 'ex-qui-1',
        name: 'Abdominal Tradicional com Contração Máxima (Crunch)',
        targetMuscles: 'Reto Abdominal Superior',
        setsAndReps: '3 séries de 20 repetições lentas',
        durationSec: 45,
        videoLanguage: 'Português (pt-BR)',
        videoTitlePt: 'Abdominal Supra / Crunch: Como Fazer Certo Sem Dor no Pescoço',
        videoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=como+fazer+abdominal+crunch+corretamente+sem+dor+pescoco',
        youtubeSearchUrl: 'https://www.youtube.com/results?search_query=como+fazer+abdominal+crunch+corretamente+sem+dor+pescoco',
        videoDurationText: 'Tutorial pt-BR',
        breathingTip: 'Esvazie todo o ar dos pulmões ao subir e aperte a barriga; puxe o ar ao descer.',
        voiceGuidanceText: 'Abdominal tradicional: olhe para o teto, não puxe o pescoço e solte todo o ar espremendo o abdômen.',
        commonMistakes: [
          'Puxar a cabeça com as mãos gerando dor cervical',
          'Tirar a lombar inteira do chão ao invés de enrolar o tronco'
        ],
        instructions: [
          'Deite de costas com os joelhos dobrados e pés apoiados no chão.',
          'Coloque as mãos atrás da cabeça ou cruzadas no peito (não puxe o pescoço).',
          'Expire todo o ar e tire os ombros e a parte superior das costas do chão encurtando o abdômen.',
          'Segure a contração por 1 segundo no topo e retorne lentamente.'
        ],
        tips: 'Olhe para um ponto fixo no teto para não flexionar o pescoço em direção ao peito.'
      },
      {
        id: 'ex-qui-2',
        name: 'Bicicleta no Solo (Bicycle Crunches)',
        targetMuscles: 'Oblíquos e Abdômen Completo',
        setsAndReps: '3 séries de 24 repetições alternadas (12 cada lado)',
        durationSec: 45,
        videoLanguage: 'Português (pt-BR)',
        videoTitlePt: 'Abdominal Bicicleta: O Mais Eficiente para Queimar Gordura Lateral',
        videoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=como+fazer+abdominal+bicicleta+corretamente',
        youtubeSearchUrl: 'https://www.youtube.com/results?search_query=como+fazer+abdominal+bicicleta+corretamente',
        videoDurationText: 'Tutorial pt-BR',
        breathingTip: 'Solte o ar na rotação ao aproximar o cotovelo do joelho oposto.',
        voiceGuidanceText: 'Abdominal bicicleta: gire o tronco levando o ombro em direção ao joelho oposto, com movimento fluido e sem pressa.',
        commonMistakes: [
          'Apenas mover os cotovelos sem girar os ombros',
          'Fazer com velocidade excessiva sem contração'
        ],
        instructions: [
          'Deite de costas, tire os ombros do chão e coloque as pontas dos dedos atrás das orelhas.',
          'Eleve as pernas e dobre o joelho direito trazendo-o em direção ao cotovelo esquerdo.',
          'Enquanto gira o tronco para o lado direito, estenda a perna esquerda reta para a frente.',
          'Alterne os lados em movimento fluido e coordenado.'
        ],
        tips: 'Estudos eletromiográficos comprovam que a bicicleta é um dos abdominais mais eficazes do mundo.'
      },
      {
        id: 'ex-qui-3',
        name: 'Elevação de Pernas no Chão (Leg Raises)',
        targetMuscles: 'Abdômen Inferior (Pochete)',
        setsAndReps: '3 séries de 12 a 15 repetições controladas',
        durationSec: 45,
        videoLanguage: 'Português (pt-BR)',
        videoTitlePt: 'Abdominal Infra e Elevação de Pernas sem Dor na Lombar',
        videoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=como+fazer+elevacao+de+pernas+abdominal+infra',
        youtubeSearchUrl: 'https://www.youtube.com/results?search_query=como+fazer+elevacao+de+pernas+abdominal+infra',
        videoDurationText: 'Tutorial pt-BR',
        breathingTip: 'Solte o ar subindo as pernas; puxe o ar descendo devagar sem deixar a lombar sair do chão.',
        voiceGuidanceText: 'Elevação de pernas: mãos sob os glúteos, suba as pernas retas e desça bem devagar sem encostar no chão.',
        commonMistakes: [
          'Descolar a lombar do chão curvando as costas',
          'Despencar as pernas no retorno'
        ],
        instructions: [
          'Deite de costas com as mãos sob os glúteos para proteger a curvatura lombar.',
          'Com as pernas retas ou levemente dobradas, eleve-as até formarem um ângulo de 90 graus com o chão.',
          'Desça as pernas bem devagar sem deixar a lombar descolar do solo.',
          'Pare a poucos centímetros do chão e suba novamente.'
        ],
        tips: 'Se sentir a lombar arquear, dobre um pouco os joelhos para diminuir a alavanca de peso.'
      },
      {
        id: 'ex-qui-4',
        name: 'Prancha Isométrica Estática no Antebraço',
        targetMuscles: 'Transverso Abdominal e Cintura Escapular',
        setsAndReps: '3 séries de 30 a 50 segundos',
        durationSec: 45,
        videoLanguage: 'Português (pt-BR)',
        videoTitlePt: 'Como Fazer a Prancha Abdominal Corretamente',
        videoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=como+fazer+prancha+abdominal+corretamente+smart+fit',
        youtubeSearchUrl: 'https://www.youtube.com/results?search_query=como+fazer+prancha+abdominal+corretamente+smart+fit',
        videoDurationText: 'Tutorial pt-BR',
        breathingTip: 'Respire profunda e pausadamente sem prender o ar.',
        voiceGuidanceText: 'Prancha isométrica: antebraços firmes, umbigo para dentro, glúteos travados. Segure firme!',
        commonMistakes: [
          'Deixar a bacia cair em direção ao chão (arqueando a lombar)',
          'Levantar o bumbum muito alto',
          'Olhar para a frente tensionando a cervical'
        ],
        instructions: [
          'Apoie os antebraços e os cotovelos no chão alinhados logo abaixo dos ombros.',
          'Estenda as pernas para trás apoiando-se na ponta dos pés.',
          'Contraia fortemente o abdômen, os glúteos e as coxas.',
          'Mantenha a cabeça em posição neutra alinhada com a coluna.'
        ],
        tips: 'Imagine que você está tentando puxar o umbigo para dentro em direção à coluna vertebral.'
      }
    ]
  },
  {
    id: 'w-sexta',
    dayOfWeek: 'sexta',
    dayLabel: 'Sexta-feira',
    title: 'Treino E: Full Body Tônus & Resistência Muscular',
    focus: 'Corpo Inteiro, Postura e Firmeza',
    level: 'Intermediário',
    durationMin: 22,
    caloriesBurnEstimate: 215,
    equipment: 'Sem equipamentos (peso corporal)',
    fullSessionTitle: 'Vídeo-Aula Completa em Português: Full Body Corpo Todo em 20 Minutos',
    fullSessionVideoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=treino+completo+full+body+corpo+todo+em+casa+portugues',
    fullSessionYoutubeUrl: 'https://www.youtube.com/results?search_query=treino+completo+full+body+corpo+todo+em+casa+portugues',
    warmup: [
      'Agachamentos dinâmicos sem carga (15 reps)',
      'Polichinelos (30s)',
      'Balanço de pernas para frente e para trás'
    ],
    cooldown: [
      'Alongamento de corpo inteiro deitado no chão',
      'Alongamento de peitoral e glúteos',
      'Descompressão da coluna'
    ],
    exercises: [
      {
        id: 'ex-sex-1',
        name: 'Agachamento com Elevação de Braços',
        targetMuscles: 'Pernas, Glúteos, Ombros e Lombar',
        setsAndReps: '3 séries de 15 repetições',
        durationSec: 45,
        videoLanguage: 'Português (pt-BR)',
        videoTitlePt: 'Agachamento com Elevação de Braços: Tônus e Postura',
        videoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=agachamento+com+elevacao+de+bracos+treino+em+casa',
        youtubeSearchUrl: 'https://www.youtube.com/results?search_query=agachamento+com+elevacao+de+bracos+treino+em+casa',
        videoDurationText: 'Tutorial pt-BR',
        breathingTip: 'Inspire descendo no agachamento; solte o ar subindo e esticando os braços no alto.',
        voiceGuidanceText: 'Agachamento com braços: desça com calcanhares firmes e, ao subir, estenda os braços para o alto ativando os ombros.',
        commonMistakes: [
          'Deixar os ombros encolherem perto das orelhas ao levantar os braços'
        ],
        instructions: [
          'Em pé, agache até o paralelo mantendo a postura ereta.',
          'Ao subir empurrando com os calcanhares, estenda os braços acima da cabeça esticando todo o corpo.',
          'Retorne os braços ao lado do corpo e agache novamente de forma fluida.'
        ],
        tips: 'Trabalha a cadeia muscular anterior e posterior ao mesmo tempo.'
      },
      {
        id: 'ex-sex-2',
        name: 'Flexão com 2 Segundos de Pausa Embaixo',
        targetMuscles: 'Peito, Tríceps e Força Isométrica',
        setsAndReps: '3 séries de 8 a 12 repetições',
        durationSec: 45,
        videoLanguage: 'Português (pt-BR)',
        videoTitlePt: 'Flexão de Braço com Pausa Isométrica: Técnica Avançada',
        videoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=como+fazer+flexao+de+braco+com+pausa+isometria',
        youtubeSearchUrl: 'https://www.youtube.com/results?search_query=como+fazer+flexao+de+braco+com+pausa+isometria',
        videoDurationText: 'Tutorial pt-BR',
        breathingTip: 'Segure o ar durante os 2 segundos de pausa embaixo; solte o ar empurrando o chão com explosão.',
        voiceGuidanceText: 'Flexão com pausa: desça quase encostando o peito no chão, segure 2 segundos e suba com força!',
        commonMistakes: [
          'Descansar relaxando o corpo totalmente no chão na pausa'
        ],
        instructions: [
          'Faça a flexão tradicional (no chão ou de joelhos).',
          'Ao descer até o peito quase encostar no chão, congele a posição por 2 segundos contados.',
          'Depois suba com explosão empurrando o chão.',
          'Essa pausa remove o impulso elástico e força as fibras musculares a trabalharem no dobro da intensidade.'
        ],
        tips: 'Se ficar muito difícil, apoie os joelhos para completar todas as repetições com perfeição.'
      },
      {
        id: 'ex-sex-3',
        name: 'Afundo Cruzado Atrás (Curtsy Lunge)',
        targetMuscles: 'Glúteo Médio, Quadril e Coxas',
        setsAndReps: '3 séries de 12 repetições por perna',
        durationSec: 50,
        videoLanguage: 'Português (pt-BR)',
        videoTitlePt: 'Afundo Cruzado (Curtsy Lunge): Desenhar a Lateral do Glúteo',
        videoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=afundo+cruzado+curtsy+lunge+gluteo+como+fazer',
        youtubeSearchUrl: 'https://www.youtube.com/results?search_query=afundo+cruzado+curtsy+lunge+gluteo+como+fazer',
        videoDurationText: 'Tutorial pt-BR',
        breathingTip: 'Inspire no cruzamento da descida; solte o ar voltando à posição inicial.',
        voiceGuidanceText: 'Afundo cruzado: dê o passo diagonal para trás como uma reverência, sentindo a lateral do glúteo queimar.',
        commonMistakes: [
          'Girar o quadril excessivamente para o lado'
        ],
        instructions: [
          'Em pé, dê um passo para trás na diagonal, cruzando a perna atrás da perna da frente como uma reverência.',
          'Dobre os dois joelhos descendo o quadril de forma controlada.',
          'Empurre o chão com o calcanhar da frente para voltar e alterne a perna.'
        ],
        tips: 'Excelente variação para desenhar a curva lateral do glúteo e melhorar a estabilidade do joelho.'
      },
      {
        id: 'ex-sex-4',
        name: 'Prancha Dinâmica (Sobe e Desce Antebraço)',
        targetMuscles: 'Braços, Ombros e Core Completo',
        setsAndReps: '3 séries de 10 subidas (5 com cada braço)',
        durationSec: 45,
        videoLanguage: 'Português (pt-BR)',
        videoTitlePt: 'Prancha Sobe e Desce Dinâmica: Execução e Controle',
        videoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=como+fazer+prancha+dinamica+sobe+e+desce',
        youtubeSearchUrl: 'https://www.youtube.com/results?search_query=como+fazer+prancha+dinamica+sobe+e+desce',
        videoDurationText: 'Tutorial pt-BR',
        breathingTip: 'Mantenha a respiração constante sem trancar o ar.',
        voiceGuidanceText: 'Prancha dinâmica: apoie a mão, suba na prancha alta e volte o antebraço. Mantenha o quadril firme.',
        commonMistakes: [
          'Balançar o quadril descontroladamente de um lado para o outro'
        ],
        instructions: [
          'Comece na prancha sobre os antebraços.',
          'Coloque a mão direita no chão onde estava o cotovelo e empurre.',
          'Em seguida, apoie a mão esquerda e suba para a prancha alta.',
          'Volte o antebraço direito ao chão e depois o esquerdo. Alterne o braço que lidera a subida.'
        ],
        tips: 'Tente manter o quadril o mais estável possível, evitando balançar para os lados.'
      }
    ]
  },
  {
    id: 'w-sabado',
    dayOfWeek: 'sabado',
    dayLabel: 'Sábado',
    title: 'Treino F: Desafio Queima Extrema Tabata (20s/10s)',
    focus: 'Queima Acelerada de Gordura em 16 Minutos',
    level: 'Avançado',
    durationMin: 16,
    caloriesBurnEstimate: 240,
    equipment: 'Cronômetro (integrado no app) e muita disposição!',
    fullSessionTitle: 'Vídeo-Aula Completa em Português: Treino Tabata Queima Intensa de Fim de Semana',
    fullSessionVideoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=treino+tabata+em+casa+portugues+queimar+gordura',
    fullSessionYoutubeUrl: 'https://www.youtube.com/results?search_query=treino+tabata+em+casa+portugues+queimar+gordura',
    warmup: [
      'Corrida no lugar suave por 1 minuto',
      'Rotação de tronco e braços por 30s',
      'Alongamento dinâmico'
    ],
    cooldown: [
      'Caminhada lenta para baixar batimentos',
      'Alongamento relaxante de pernas e coluna',
      'Hidratação caprichada'
    ],
    exercises: [
      {
        id: 'ex-sab-1',
        name: 'Tabata Bloco 1: Polichinelo Veloz',
        targetMuscles: 'Cardio, Pernas e Ombro',
        setsAndReps: '4 rounds de 20s no ritmo máximo / 10s descanso total',
        durationSec: 20,
        videoLanguage: 'Português (pt-BR)',
        videoTitlePt: 'Protocolo Tabata em Casa: Polichinelo Acelerado',
        videoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=polichinelo+veloz+tabata+treino+em+casa',
        youtubeSearchUrl: 'https://www.youtube.com/results?search_query=polichinelo+veloz+tabata+treino+em+casa',
        videoDurationText: 'Tutorial pt-BR',
        breathingTip: 'Respire rápido e focado durante os 20 segundos de tiro máximo.',
        voiceGuidanceText: 'Tabata polichinelo: 20 segundos na sua intensidade máxima! Vamos lá, dê o seu melhor!',
        commonMistakes: [
          'Diminuir o ritmo nos últimos 5 segundos'
        ],
        instructions: [
          'Execute o polichinelo com a máxima velocidade que conseguir por 20 segundos.',
          'Descanse completamente parado por 10 segundos.',
          'Repita 4 vezes consecutivas.'
        ],
        tips: 'O protocolo Tabata eleva o consumo de oxigênio pós-exercício (EPOC), queimando gordura mesmo em repouso!'
      },
      {
        id: 'ex-sab-2',
        name: 'Tabata Bloco 2: Agachamento Pulsado (Pulse Squat)',
        targetMuscles: 'Quadríceps e Glúteos em Queimação',
        setsAndReps: '4 rounds de 20s pulsando / 10s descanso',
        durationSec: 20,
        videoLanguage: 'Português (pt-BR)',
        videoTitlePt: 'Agachamento Pulsado (Pulse Squat): Queima Intensa de Coxa',
        videoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=como+fazer+agachamento+pulsado+pulse+squat',
        youtubeSearchUrl: 'https://www.youtube.com/results?search_query=como+fazer+agachamento+pulsado+pulse+squat',
        videoDurationText: 'Tutorial pt-BR',
        breathingTip: 'Respirações curtas e controladas enquanto mantém a tensão constante.',
        voiceGuidanceText: 'Agachamento pulsado: fique embaixo e faça pequenos movimentos. Não suba tudo, aguente a queimação!',
        commonMistakes: [
          'Subir até o topo e perder a tensão muscular'
        ],
        instructions: [
          'Desça no agachamento e não suba até o topo!',
          'Fique pulsando no terço final do movimento (pequenos movimentos de 5cm para cima e para baixo).',
          'Sinta as coxas queimarem intensamente por 20 segundos e descanse 10 segundos.'
        ],
        tips: 'Manter a tensão contínua sem descanso faz as fibras musculares trabalharem no limite.'
      },
      {
        id: 'ex-sab-3',
        name: 'Tabata Bloco 3: Escaladores Acelerados',
        targetMuscles: 'Core, Queima Abdominal e Ombros',
        setsAndReps: '4 rounds de 20s rápido / 10s descanso',
        durationSec: 20,
        videoLanguage: 'Português (pt-BR)',
        videoTitlePt: 'Escalador Rápido Tabata: Explosão e Queima Calórica',
        videoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=escalador+rapido+mountain+climber+tabata+treino',
        youtubeSearchUrl: 'https://www.youtube.com/results?search_query=escalador+rapido+mountain+climber+tabata+treino',
        videoDurationText: 'Tutorial pt-BR',
        breathingTip: 'Mantenha o ar fluindo rápido junto com as passadas.',
        voiceGuidanceText: 'Escaladores rápidos: velocidade máxima por 20 segundos! Joelhos no peito e abdômen de aço!',
        commonMistakes: [
          'Puxar o quadril para cima com o cansaço'
        ],
        instructions: [
          'Na posição de prancha, acelere a puxada dos joelhos alternados.',
          'Dê o seu melhor por 20 segundos.',
          'Apoie os joelhos no chão nos 10 segundos de descanso.'
        ],
        tips: 'Mantenha as mãos firmes contra o chão e respire ritmadamente.'
      },
      {
        id: 'ex-sab-4',
        name: 'Tabata Bloco 4: Skater Hops (Salto do Patinador)',
        targetMuscles: 'Glúteos, Coordenação e Queima Calórica',
        setsAndReps: '4 rounds de 20s / 10s descanso',
        durationSec: 20,
        videoLanguage: 'Português (pt-BR)',
        videoTitlePt: 'Salto do Patinador (Skater Hops) em Casa: Queima Lateral',
        videoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=como+fazer+exercicio+skater+salto+do+patinador',
        youtubeSearchUrl: 'https://www.youtube.com/results?search_query=como+fazer+exercicio+skater+salto+do+patinador',
        videoDurationText: 'Tutorial pt-BR',
        breathingTip: 'Solte o ar no momento do salto lateral.',
        voiceGuidanceText: 'Salto do patinador: salte de um lado para o outro amortecendo com a perna de apoio. Finalize com chave de ouro!',
        commonMistakes: [
          'Aterrissar com o joelho travado esticado'
        ],
        instructions: [
          'Dê um salto lateral para o lado direito, aterrissando na perna direita com joelho levemente flexionado.',
          'Cruze a perna esquerda atrás como um patinador de gelo.',
          'Imediatamente salte para o lado esquerdo repetindo o movimento.',
          'Se não puder saltar, dê passos laterais rápidos cruzando a perna atrás.'
        ],
        tips: 'Termine o treino com chave de ouro, liberando endorfina e acelerando o metabolismo para o fim de semana!'
      }
    ]
  },
  {
    id: 'w-domingo',
    dayOfWeek: 'domingo',
    dayLabel: 'Domingo',
    title: 'Treino G: Recuperação Ativa, Mobilidade & Descompressão',
    focus: 'Alongamento Profundo, Postura e Bem-estar',
    level: 'Iniciante',
    durationMin: 15,
    caloriesBurnEstimate: 90,
    equipment: 'Tapete macio, cama ou chão',
    fullSessionTitle: 'Vídeo-Aula Completa em Português: Alongamento e Alívio de Dores nas Costas',
    fullSessionVideoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=alongamento+completo+recuperacao+ativa+portugues+em+casa',
    fullSessionYoutubeUrl: 'https://www.youtube.com/results?search_query=alongamento+completo+recuperacao+ativa+portugues+em+casa',
    warmup: [
      'Sentar confortavelmente de pernas cruzadas',
      '3 respirações profundas inspirando pelo nariz e soltando pela boca lentamente'
    ],
    cooldown: [
      'Deitar de barriga para cima de olhos fechados por 2 minutos',
      'Sensação de corpo leve e renovado para iniciar uma nova semana com foco!'
    ],
    exercises: [
      {
        id: 'ex-dom-1',
        name: 'Postura Gato e Vaca Fluida (Cat-Cow Flow)',
        targetMuscles: 'Mobilidade da Coluna Vertebral e Lombar',
        setsAndReps: '2 minutos contínuos e suaves',
        durationSec: 60,
        videoLanguage: 'Português (pt-BR)',
        videoTitlePt: 'Alongamento Gato e Vaca: Como Aliviar Dores na Coluna',
        videoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=como+fazer+alongamento+gato+e+vaca+coluna+fisioterapia',
        youtubeSearchUrl: 'https://www.youtube.com/results?search_query=como+fazer+alongamento+gato+e+vaca+coluna+fisioterapia',
        videoDurationText: 'Tutorial pt-BR',
        breathingTip: 'Inspire ao arquear para baixo olhando para cima; expire profundamente ao curvar a coluna para o teto.',
        voiceGuidanceText: 'Gato e vaca: quatro apoios, inspire abrindo o peito e expire curvando a coluna como um gato. Bem suave.',
        commonMistakes: [
          'Fazer com pressa sem sincronizar a respiração'
        ],
        instructions: [
          'Fique na posição de 4 apoios com punhos sob ombros e joelhos sob quadris.',
          'Inspire: afunde a barriga em direção ao chão, abra o peito e olhe para o teto (Vaca).',
          'Expire: curve a coluna para cima como um gato assustado, empurrando o chão e olhando para o umbigo (Gato).',
          'Alterne no ritmo natural da sua respiração.'
        ],
        tips: 'Alivia dores nas costas instantaneamente e relaxa a tensão acumulada na coluna.'
      },
      {
        id: 'ex-dom-2',
        name: 'Alongamento do Pombo para Glúteo e Quadril (Pigeon Pose)',
        targetMuscles: 'Glúteo Profundo, Piriforme e Flexores de Quadril',
        setsAndReps: '1 minuto de permanência suave para cada lado',
        durationSec: 60,
        videoLanguage: 'Português (pt-BR)',
        videoTitlePt: 'Postura do Pombo: Soltar o Nervo Ciático e Quadril Travado',
        videoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=postura+do+pombo+alongamento+gluteo+ciatico+como+fazer',
        youtubeSearchUrl: 'https://www.youtube.com/results?search_query=postura+do+pombo+alongamento+gluteo+ciatico+como+fazer',
        videoDurationText: 'Tutorial pt-BR',
        breathingTip: 'A cada expiração longa, relaxe o peso do tronco mais próximo ao chão.',
        voiceGuidanceText: 'Alongamento do pombo: joelho à frente, perna de trás esticada. Respire fundo e sinta o glúteo destensionar.',
        commonMistakes: [
          'Tensionar os ombros ou pescoço durante o alongamento'
        ],
        instructions: [
          'A partir de 4 apoios, traga o joelho direito para a frente, posicionando a canela no chão inclinada.',
          'Estenda a perna esquerda reta para trás no chão.',
          'Mantenha o quadril nivelado e, se tiver conforto, apoie os antebraços no chão à frente.',
          'Respire profundamente sentindo o alongamento no glúteo direito e depois inverta.'
        ],
        tips: 'Libera o nervo ciático e destrava o quadril travado por horas sentado.'
      },
      {
        id: 'ex-dom-3',
        name: 'Postura da Criança com Braços Estendidos (Child’s Pose)',
        targetMuscles: 'Costas, Ombros e Relaxamento Lombar',
        setsAndReps: '2 minutos de permanência profunda',
        durationSec: 60,
        videoLanguage: 'Português (pt-BR)',
        videoTitlePt: 'Postura da Criança (Balasana): Relaxamento e Lombar',
        videoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=como+fazer+postura+da+crianca+balasana+alongamento',
        youtubeSearchUrl: 'https://www.youtube.com/results?search_query=como+fazer+postura+da+crianca+balasana+alongamento',
        videoDurationText: 'Tutorial pt-BR',
        breathingTip: 'Inspire expandindo as costelas e expire soltando todo o estresse da semana.',
        voiceGuidanceText: 'Postura da criança: sente-se nos calcanhares, estenda as mãos no chão à frente, apoie a testa e relaxe.',
        commonMistakes: [
          'Forçar os joelhos se sentir desconforto (pode colocar uma almofada sob o bumbum)'
        ],
        instructions: [
          'De joelhos, una os dedões dos pés e afaste os joelhos na largura do tapete.',
          'Sente-se sobre os calcanhares e caminhe as mãos para a frente no chão.',
          'Apoie a testa no chão e relaxe os ombros e a respiração.',
          'A cada expiração, sinta o peito descer mais próximo do solo.'
        ],
        tips: 'Excelente postura de descanso para regular os níveis de cortisol e promover o sono reparador.'
      },
      {
        id: 'ex-dom-4',
        name: 'Torção de Coluna Deitado (Spinal Twist)',
        targetMuscles: 'Coluna Média, Lombar e Peitoral',
        setsAndReps: '1 minuto para cada lado',
        durationSec: 60,
        videoLanguage: 'Português (pt-BR)',
        videoTitlePt: 'Torção de Coluna Deitado: Descompressão e Alívio da Lombar',
        videoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=alongamento+torcao+de+coluna+deitado+lombar',
        youtubeSearchUrl: 'https://www.youtube.com/results?search_query=alongamento+torcao+de+coluna+deitado+lombar',
        videoDurationText: 'Tutorial pt-BR',
        breathingTip: 'Solte o ar lentamente permitindo que a perna cruze mais profundamente para o lado.',
        voiceGuidanceText: 'Torção de coluna: joelho dobrado para o lado oposto, braço estendido e olhe para o lado contrário. Respire e relaxe.',
        commonMistakes: [
          'Tirar o ombro oposto do chão forçando excessivamente'
        ],
        instructions: [
          'Deite de costas e abrace o joelho direito no peito.',
          'Abra o braço direito no chão em linha reta.',
          'Com a mão esquerda, guie o joelho direito cruzando o corpo até tocar o chão do lado esquerdo.',
          'Gire o rosto para olhar para a mão direita e respire fundo.',
          'Repita para o outro lado.'
        ],
        tips: 'Descomprime as vértebras lombares e melhora a digestão e a saúde visceral.'
      }
    ]
  },
  {
    id: 'w-boxe',
    dayOfWeek: 'boxe',
    dayLabel: 'Especial Boxe',
    title: 'Treino de Boxe em Casa: Cardio & Queima Calórica',
    focus: 'Boxe, Agilidade, Queima Acelerada de Gordura & Core',
    category: 'Boxe',
    keywords: ['boxe', 'boxing', 'cardio boxe', 'shadow boxing', 'luta', 'queima', 'golpes', 'jab', 'direto'],
    level: 'Intermediário',
    durationMin: 25,
    caloriesBurnEstimate: 290,
    equipment: 'Nenhum equipamento (apenas espaço livre para movimentação)',
    fullSessionTitle: 'Vídeo-Aula em Português: Treino Completo de Boxe em Casa para Secar',
    fullSessionVideoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=treino+boxe+em+casa+iniciante+portugues+queimar+gordura',
    fullSessionYoutubeUrl: 'https://www.youtube.com/results?search_query=treino+boxe+em+casa+iniciante+portugues+queimar+gordura',
    warmup: [
      '1 minuto de corrida no lugar com giros suaves de ombros',
      '30 segundos de polichinelo leve e saltitos de boxeador',
      'Rotação de tronco com guarda alta para aquecer o core'
    ],
    cooldown: [
      'Alongamento de ombros e deltoides cruzando o braço no peito (30s cada)',
      'Alongamento de tríceps com braço atrás da cabeça (30s cada)',
      'Respirações calmas e soltura dos punhos e antebraços'
    ],
    exercises: [
      {
        id: 'ex-boxe-1',
        name: 'Jab e Direto com Guarda Alta (Golpes Retos de Boxe)',
        targetMuscles: 'Ombros, Peitoral, Core e Panturrilhas',
        setsAndReps: '3 séries de 45 segundos em ritmo constante',
        durationSec: 45,
        videoLanguage: 'Português (pt-BR)',
        videoTitlePt: 'Como Executar Jab e Direto Corretamente no Boxe',
        videoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=como+dar+jab+e+direto+boxe+tutorial+portugues',
        youtubeSearchUrl: 'https://www.youtube.com/results?search_query=como+dar+jab+e+direto+boxe+tutorial+portugues',
        videoDurationText: 'Tutorial Boxe pt-BR',
        breathingTip: 'Solte o ar bruscamente a cada golpe (tsst! tsst!) e inspire pelo nariz ao recolher o punho na guarda.',
        voiceGuidanceText: 'Atenção aos golpes de boxe: queixo baixo, guarda protegendo o rosto. Solte o jab com o braço da frente e o direto girando o quadril!',
        commonMistakes: [
          'Abaixar a mão oposta enquanto golpeia (perder a guarda)',
          'Não girar o calcanhar e quadril no golpe direto',
          'Esticar o cotovelo além do limite causando impacto articular'
        ],
        instructions: [
          'Assuma a base de boxe: pés afastados na largura dos ombros, pé não-dominante à frente.',
          'Mantenha as mãos fechadas na altura do queixo e cotovelos colados nas costelas.',
          'Lance o Jab estendendo o braço da frente em linha reta e recolha rapidamente.',
          'Em seguida, lance o Direto empurrando com a perna de trás e girando o quadril.',
          'Mantenha o ritmo dinâmico e os joelhos levemente flexionados.'
        ],
        tips: 'A força do boxe não vem do braço, vem do giro do quadril e do empurrão do chão!'
      },
      {
        id: 'ex-boxe-2',
        name: 'Esquivas Pendulares de Boxe (Pêndulo & Saídas)',
        targetMuscles: 'Abdômen, Oblíquos, Quadríceps e Lombar',
        setsAndReps: '3 séries de 40 segundos',
        durationSec: 40,
        videoLanguage: 'Português (pt-BR)',
        videoTitlePt: 'Esquivas de Boxe: Pêndulo e Movimentação de Cabeça',
        videoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=como+fazer+pendulo+esquiva+boxe+tutorial',
        youtubeSearchUrl: 'https://www.youtube.com/results?search_query=como+fazer+pendulo+esquiva+boxe+tutorial',
        videoDurationText: 'Tutorial Boxe pt-BR',
        breathingTip: 'Puxe o ar antes de descer e expire ao completar a subida do pêndulo.',
        voiceGuidanceText: 'Pêndulo de boxe: flexione as pernas em U sob a linha do golpe imaginário, mantendo o abdômen firme e os olhos à frente!',
        commonMistakes: [
          'Dobrar apenas a coluna para a frente em vez de agachar com as pernas',
          'Tirar os olhos do oponente imaginário'
        ],
        instructions: [
          'Mantenha a guarda alta colada ao rosto.',
          'Flexione os joelhos e desenhe um formato de "U" com o tronco de um lado para o outro.',
          'Transfira o peso de uma perna para a outra com suavidade.',
          'Retorne à guarda no lado oposto pronto para contra-atacar.'
        ],
        tips: 'O pêndulo queima intensamente as pernas e fortalece todo o cinturão abdominal.'
      },
      {
        id: 'ex-boxe-3',
        name: 'Combinação de Boxe: Jab + Direto + Cruzado + Esquiva',
        targetMuscles: 'Corpo Inteiro, Alta Queima Calórica e Coordenação',
        setsAndReps: '4 séries de 45 segundos com 15 segundos de descanso',
        durationSec: 45,
        videoLanguage: 'Português (pt-BR)',
        videoTitlePt: 'Combinação Clássica de Boxe para Queima Rápida',
        videoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=combinacoes+boxe+em+casa+treino+para+emagrecer',
        youtubeSearchUrl: 'https://www.youtube.com/results?search_query=combinacoes+boxe+em+casa+treino+para+emagrecer',
        videoDurationText: 'Combos pt-BR',
        breathingTip: 'Expirações curtas e coordenadas com cada impacto: um, dois, três e esquiva!',
        voiceGuidanceText: 'Vamos lá: Jab, Direto, Cruzado e pêndulo para o lado! Mantenha a velocidade e a respiração!',
        commonMistakes: [
          'Perder o equilíbrio ao cruzar os pés',
          'Ficar sem ar por esquecer de soltar o ar nos socos'
        ],
        instructions: [
          'Inicie na base estável com punhos fechados na guarda.',
          'Desfira Jab (frente), Direto (trás), Cruzado potente com o cotovelo paralelo ao solo.',
          'Faça o pêndulo esquivando e volte à guarda inicial.',
          'Mantenha a movimentação constante na ponta dos pés.'
        ],
        tips: 'Treino perfeito para acelerar a queima de gordura em jejum ou na dieta Zero Carb.'
      }
    ]
  },
  {
    id: 'w-taichi',
    dayOfWeek: 'taichi',
    dayLabel: 'Especial Tai Chi',
    title: 'Tai Chi Chuan: Equilíbrio, Respiração e Mobilidade',
    focus: 'Tai Chi Chuan, Equilíbrio, Redução do Cortisol & Postura',
    category: 'Tai Chi',
    keywords: ['tai chi', 'tai chi chuan', 'artes marciais', 'taichi', 'equilibrio', 'mente', 'postura', 'cortisol'],
    level: 'Iniciante',
    durationMin: 20,
    caloriesBurnEstimate: 140,
    equipment: 'Apenas roupa confortável e pés descalços ou meias antiderrapantes',
    fullSessionTitle: 'Vídeo-Aula em Português: Tai Chi Chuan para Iniciantes em Casa',
    fullSessionVideoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=tai+chi+chuan+iniciantes+aula+completa+portugues',
    fullSessionYoutubeUrl: 'https://www.youtube.com/results?search_query=tai+chi+chuan+iniciantes+aula+completa+portugues',
    warmup: [
      'Aquecimento articular suave: rotação lenta do pescoço e dos ombros',
      'Balanço suave dos braços com rotação do tronco (exercício do sino)',
      'Respiração diafragmática profunda em pé (Dan Tian)'
    ],
    cooldown: [
      'Postura do abraço da árvore (Zhan Zhuang) por 2 minutos',
      'Massagem suave no abdômen no sentido horário para digestão',
      'Três respirações integradoras assentando a energia'
    ],
    exercises: [
      {
        id: 'ex-taichi-1',
        name: 'Movimento de Abertura do Tai Chi (Qi Shi)',
        targetMuscles: 'Ombros, Respiração, Postura e Conexão Mente-Corpo',
        setsAndReps: '8 a 10 ciclos respiratórios lentos',
        durationSec: 60,
        videoLanguage: 'Português (pt-BR)',
        videoTitlePt: 'Como Fazer a Abertura do Tai Chi Chuan (Passo a Passo)',
        videoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=abertura+tai+chi+chuan+iniciante+portugues',
        youtubeSearchUrl: 'https://www.youtube.com/results?search_query=abertura+tai+chi+chuan+iniciante+portugues',
        videoDurationText: 'Tutorial Tai Chi pt-BR',
        breathingTip: 'Inspire pelo nariz elevando os braços suavemente como flutuando na água; expire afundando o peso nos joelhos.',
        voiceGuidanceText: 'Abertura do Tai Chi: pés na largura dos ombros, destrave os joelhos e eleve as mãos sem tensão. Sinta a leveza.',
        commonMistakes: [
          'Tensionar os ombros ou elevar os cotovelos com rigidez',
          'Travar os joelhos e prender a respiração'
        ],
        instructions: [
          'Em pé, pés paralelos na largura dos ombros, braços relaxados ao lado do corpo.',
          'Dobre suavemente os joelhos como se fosse se apoiar no ar.',
          'Inspire lentamente elevando os dois braços à frente até a altura dos ombros, palmas para baixo.',
          'Ao atingir a altura do peito, flexione os cotovelos e empurre suavemente as palmas para baixo soltando o ar.',
          'Concentre-se na sensação de calma e desaceleração.'
        ],
        tips: 'O Tai Chi ensina o corpo a relaxar sob esforço, reduzindo o cortisol que trava a perda de gordura.'
      },
      {
        id: 'ex-taichi-2',
        name: 'Acariciar a Crina do Cavalo Selvagem (Ye Ma Fen Zong)',
        targetMuscles: 'Equilíbrio, Rotação Pélvica, Quadríceps e Core',
        setsAndReps: '5 repetições para cada lado em ritmo contínuo',
        durationSec: 60,
        videoLanguage: 'Português (pt-BR)',
        videoTitlePt: 'Acariciar a Crina do Cavalo no Tai Chi Chuan',
        videoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=acariciar+a+crina+do+cavalo+tai+chi+tutorial+portugues',
        youtubeSearchUrl: 'https://www.youtube.com/results?search_query=acariciar+a+crina+do+cavalo+tai+chi+tutorial+portugues',
        videoDurationText: 'Forma Tai Chi pt-BR',
        breathingTip: 'Inspire ao recolher as mãos formando a esfera de energia; expire dando o passo e abrindo os braços.',
        voiceGuidanceText: 'Tai Chi Chuan: segure a esfera no peito, dê um passo diagonal suave e abra os braços com harmonia.',
        commonMistakes: [
          'Dar um passo muito largo e perder a estabilidade',
          'Mover os braços desconectados da rotação da cintura'
        ],
        instructions: [
          'Segure uma "esfera de ar imaginária" na frente do peito com uma mão em cima e outra embaixo.',
          'Dê um passo diagonal com o pé esquerdo sem jogar o peso de uma vez.',
          'Gire o tronco abrindo o braço esquerdo para cima em diagonal e a mão direita empurrando para baixo.',
          'Transfira o peso para a perna da frente (arco e flecha suave) mantendo a coluna ereta.',
          'Recolha e repita para o lado direito.'
        ],
        tips: 'Melhora incrivelmente a estabilidade dos tornozelos, joelhos e equilíbrio postural.'
      },
      {
        id: 'ex-taichi-3',
        name: 'Mover as Mãos como Nuvens (Yun Shou)',
        targetMuscles: 'Mobilidade Torácica, Abdômen, Quadris e Serenidade Mental',
        setsAndReps: '3 minutos contínuos de fluxo suave',
        durationSec: 90,
        videoLanguage: 'Português (pt-BR)',
        videoTitlePt: 'Mãos de Nuvem no Tai Chi Chuan: Movimento Contínuo',
        videoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=maos+de+nuvem+tai+chi+chuan+portugues+tutorial',
        youtubeSearchUrl: 'https://www.youtube.com/results?search_query=maos+de+nuvem+tai+chi+chuan+portugues+tutorial',
        videoDurationText: 'Fluxo Tai Chi pt-BR',
        breathingTip: 'Respiração natural, calma e contínua pelo nariz, acompanhando o movimento circular.',
        voiceGuidanceText: 'Mãos de nuvem: circule as mãos como nuvens flutuando, acompanhando o movimento com o centro do corpo.',
        commonMistakes: [
          'Movimentar os braços sem mover a cintura e o quadril',
          'Pressa: o movimento deve ser tão lento e contínuo quanto a água corrente'
        ],
        instructions: [
          'Em pé, pés paralelos e joelhos destravados.',
          'Gire a cintura para a direita enquanto a mão direita sobe até o nível dos olhos e a esquerda desce.',
          'Gire a cintura para a esquerda alternando a posição das mãos em círculos contínuos.',
          'Olhe suavemente para a palma da mão que estiver no alto.',
          'Sinta a massagem interna nos órgãos digestivos e a descompressão mental.'
        ],
        tips: 'Excelente após as refeições ou ao final do dia para acalmar a mente e apoiar a digestão.'
      }
    ]
  }
];
