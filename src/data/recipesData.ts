import { Recipe } from '../types';

export const ALL_ZERO_CARB_RECIPES: Recipe[] = [
  // =========================================================================
  // CAFÉ DA MANHÃ (RECEITAS 1 A 10)
  // =========================================================================
  {
    id: 'r1',
    title: 'Omelete Carnívoro com Queijo Muçarela e Presunto',
    category: 'Café da Manhã',
    prepTime: '6 min',
    calories: 340,
    netCarbs: 0,
    protein: 28,
    fat: 25,
    servings: 1,
    classification: 'Excelente',
    ingredients: [
      '3 ovos caipiras inteiros',
      '50g de queijo muçarela fatiado ou ralado',
      '40g de presunto cozido em tiras (sem amido)',
      '1 colher de manteiga pura para untar',
      'Pitada de sal marinho'
    ],
    steps: [
      'Em uma tigela, bata vigorosamente os 3 ovos com o sal marinho até espumar levemente.',
      'Aqueça uma frigideira antiaderente em fogo médio com a colher de manteiga.',
      'Despeje os ovos batidos e espalhe o presunto em tiras por cima.',
      'Quando o fundo firmar, cubra toda a superfície com o queijo muçarela.',
      'Dobre o omelete ao meio, tampe por 1 minuto até o queijo derreter por completo e sirva bem quente. 0g de carboidrato!'
    ]
  },
  {
    id: 'r2',
    title: 'Ovos Mexidos Cremosos na Manteiga de Garrafa com Bacon Crocante',
    category: 'Café da Manhã',
    prepTime: '8 min',
    calories: 360,
    netCarbs: 0,
    protein: 24,
    fat: 29,
    servings: 1,
    classification: 'Excelente',
    ingredients: [
      '3 ovos caipiras grandes',
      '2 fatias de bacon artesanal (sem açúcar)',
      '1 colher de sopa de manteiga de garrafa pura',
      'Sal marinho a gosto'
    ],
    steps: [
      'Corte o bacon em cubos pequenos e frite na própria gordura até ficar bem dourado e crocante. Reserve o bacon.',
      'Na mesma frigideira, adicione a manteiga de garrafa em fogo bem baixo.',
      'Quebre os ovos diretamente e mexa suavemente com espátula de silicone para criar dobras cremosas.',
      'Desligue o fogo com os ovos ainda úmidos e tempere com sal marinho.',
      'Finalize polvilhando o bacon crocante por cima. Cremoso e 100% zero carbo.'
    ]
  },
  {
    id: 'r3',
    title: 'Pão Carnívoro de Frango e Ovos (Zero Farinha, 100% Proteína)',
    category: 'Café da Manhã',
    prepTime: '25 min',
    calories: 380,
    netCarbs: 0,
    protein: 52,
    fat: 18,
    servings: 2,
    classification: 'Excelente',
    ingredients: [
      '150g de peito de frango cozido e desfiado',
      '3 ovos caipiras inteiros',
      '1 colher de sopa de manteiga derretida',
      '1/2 colher de chá de fermento químico',
      'Pitada de sal marinho'
    ],
    steps: [
      'No processador ou liquidificador, bata o peito de frango, os 3 ovos, a manteiga e o sal até formar uma pasta homogênea.',
      'Misture o fermento delicadamente com uma colher.',
      'Despeje em uma forma pequena de pão untada com manteiga.',
      'Asse no forno pré-aquecido a 180°C ou na Airfryer a 160°C por cerca de 20 minutos até dourar por cima e passar no teste do palito.',
      'Fatie e toste na frigideira com manteiga. Um pão real, fofo e com zero gramas de carboidrato!'
    ]
  },
  {
    id: 'r4',
    title: 'Cestinhas de Presunto Assadas com Ovo Caipira e Queijo',
    category: 'Café da Manhã',
    prepTime: '15 min',
    calories: 290,
    netCarbs: 0,
    protein: 26,
    fat: 20,
    servings: 1,
    classification: 'Excelente',
    ingredients: [
      '4 fatias de presunto cozido de qualidade',
      '2 ovos caipiras inteiros',
      '30g de queijo Canastra ou Prato ralado',
      'Manteiga para untar as forminhas',
      'Pitada de sal marinho'
    ],
    steps: [
      'Unte duas forminhas de muffin ou ramequins com manteiga pura.',
      'Forre cada forminha com 2 fatias de presunto cruzadas, formando uma cestinha.',
      'Quebre um ovo inteiro dentro de cada cestinha de presunto.',
      'Tempere a gema com uma pitada de sal e cubra com o queijo ralado.',
      'Leve à Airfryer ou forno a 180°C por 10 a 12 minutos até a clara cozinhar e o queijo gratinar.'
    ]
  },
  {
    id: 'r5',
    title: 'Ovos Estalados na Banha de Porco com Lascas de Queijo Canastra',
    category: 'Café da Manhã',
    prepTime: '5 min',
    calories: 310,
    netCarbs: 0,
    protein: 22,
    fat: 24,
    servings: 1,
    classification: 'Excelente',
    ingredients: [
      '2 ovos caipiras',
      '1 colher de sopa de banha de porco artesanal',
      '40g de queijo Canastra curado em lascas',
      'Flor de sal a gosto'
    ],
    steps: [
      'Aqueça a banha de porco em uma frigideira de ferro até ficar bem quente.',
      'Quebre os ovos cuidadosamente para manter as gemas intactas.',
      'Com uma colher, jogue um pouco da banha quente sobre as claras para fritar uniformemente sem queimar o fundo.',
      'Espalhe as lascas de queijo Canastra ao redor dos ovos na frigideira para criar uma bordinha tostada.',
      'Sirva imediatamente com gema bem mole e queijo derretido.'
    ]
  },
  {
    id: 'r6',
    title: 'Omelete Nuvem de Claras com Salmão Desfiado e Muçarela',
    category: 'Café da Manhã',
    prepTime: '10 min',
    calories: 320,
    netCarbs: 0,
    protein: 34,
    fat: 20,
    servings: 1,
    classification: 'Excelente',
    ingredients: [
      '3 ovos (claras e gemas separadas)',
      '60g de salmão grelhado desfiado',
      '30g de queijo muçarela ralado',
      '1 colher de chá de manteiga',
      'Pitada de sal'
    ],
    steps: [
      'Bata as claras em ponto de neve firme com uma pitada de sal.',
      'Misture delicadamente as gemas com uma espátula, mantendo a aeração.',
      'Despeje a massa aerada na frigideira untada com manteiga em fogo baixo.',
      'Distribua o salmão desfiado e a muçarela por cima.',
      'Tampe por 3 minutos, dobre delicadamente ao meio e sirva essa nuvem proteica zero carbo.'
    ]
  },
  {
    id: 'r7',
    title: 'Café Expresso Turbinado & Queijo Canastra Tostado na Chapa',
    category: 'Café da Manhã',
    prepTime: '4 min',
    calories: 180,
    netCarbs: 0,
    protein: 10,
    fat: 15,
    servings: 1,
    classification: 'Excelente',
    ingredients: [
      '1 xícara (100ml) de café expresso ou coado bem forte',
      'Gotas de adoçante puro (estévia ou sucralose)',
      '1 colher de chá de manteiga pura no café (opcional)',
      '50g de queijo Canastra ou Meia Cura em fatias grossas'
    ],
    steps: [
      'Passe o café quente na hora e adoce a gosto com adoçante sem carboidratos.',
      'Se desejar energia extra cetogênica, emulsione a manteiga no café quente com um mixer de mão.',
      'Aqueça uma frigideira bem seca e toste as fatias de queijo até formar uma crosta crocante dourada de ambos os lados.',
      'A combinação perfeita de café matinal com a gordura saborosa do queijo curado brasileiro.'
    ]
  },
  {
    id: 'r8',
    title: 'Waffle Carnívoro de Frango e Queijo Parmesão',
    category: 'Café da Manhã',
    prepTime: '10 min',
    calories: 340,
    netCarbs: 0,
    protein: 40,
    fat: 20,
    servings: 1,
    classification: 'Excelente',
    ingredients: [
      '100g de peito de frango cozido e triturado fininho',
      '1 ovo caipira inteiro',
      '30g de queijo parmesão ralado na hora',
      '1 colher de manteiga para pincelar a máquina',
      'Pitada de sal marinho'
    ],
    steps: [
      'Em um bowl, misture o frango triturado, o ovo, o parmesão e o sal até obter uma massa consistente.',
      'Pré-aqueça a máquina de waffle ou sanduicheira e pincele com manteiga.',
      'Distribua a massa carnívora na chapa e feche.',
      'Deixe assar por 5 a 7 minutos até a casca ficar super dourada e crocante.',
      'Coma puro ou com uma fatia de queijo muçarela derretida por cima. 0g de carbo!'
    ]
  },
  {
    id: 'r9',
    title: 'Ovos Cozidos Recheados com Presunto e Muçarela Cremosa',
    category: 'Café da Manhã',
    prepTime: '12 min',
    calories: 270,
    netCarbs: 0,
    protein: 21,
    fat: 20,
    servings: 1,
    classification: 'Excelente',
    ingredients: [
      '3 ovos caipiras cozidos firmes',
      '30g de presunto cozido bem picadinho',
      '20g de queijo muçarela derretido com 1 colher de manteiga',
      'Pitada de sal marinho'
    ],
    steps: [
      'Corte os ovos cozidos ao meio no sentido do comprimento e retire as gemas com uma colher pequena.',
      'Em um pote, amasse as gemas com a manteiga morna, o presunto picadinho e o queijo derretido até virar um patê denso.',
      'Tempere com sal a gosto.',
      'Recheie as cavidades das claras cozidas com essa pasta rica e cremosa.',
      'Excelente opção prática para começar o dia ou levar para viagem.'
    ]
  },
  {
    id: 'r10',
    title: 'Crepe Zero Carbo de Queijo Parmesão com Recheio de Ovos Mexidos',
    category: 'Café da Manhã',
    prepTime: '8 min',
    calories: 330,
    netCarbs: 0,
    protein: 25,
    fat: 25,
    servings: 1,
    classification: 'Excelente',
    ingredients: [
      '40g de queijo parmesão ralado puro',
      '2 ovos caipiras batidos com sal',
      '1 colher de chá de manteiga',
      'Pitada de sal marinho'
    ],
    steps: [
      'Em fogo médio-baixo, polvilhe o queijo parmesão em círculo cobrindo o fundo de uma frigideira antiaderente.',
      'Deixe o queijo derreter e borbulhar até as bordas dourarem e se soltarem facilmente (cerca de 2 minutos).',
      'Em outra panelinha, mexa rapidamente os ovos batidos na manteiga.',
      'Coloque os ovos mexidos no centro do disco de parmesão ainda na frigideira e enrole como uma panqueca.',
      'Retire e sirva imediatamente: crosta exterior crocante de queijo e interior macio de ovos!'
    ]
  },

  // =========================================================================
  // ALMOÇO E JANTAR - CARNES BOVINAS & NOBRES (RECEITAS 11 A 20)
  // =========================================================================
  {
    id: 'r11',
    title: 'Picanha na Manteiga de Garrafa com Crosta de Queijo Canastra',
    category: 'Almoço e Jantar',
    prepTime: '15 min',
    calories: 490,
    netCarbs: 0,
    protein: 44,
    fat: 35,
    servings: 1,
    classification: 'Excelente',
    ingredients: [
      '220g de bife de picanha bovina grossa com capa de gordura',
      '50g de queijo Canastra ou Meia Cura fatiado',
      '1 colher de sopa de manteiga de garrafa pura',
      'Sal grosso marinho triturado a gosto'
    ],
    steps: [
      'Tempere o bife de picanha com sal grosso triturado 5 minutos antes.',
      'Aqueça a frigideira de ferro até soltar fumaça e sele primeiro a capa de gordura em pé até dourar.',
      'Grelhe a carne por cerca de 3 a 4 minutos de cada lado adicionando a manteiga de garrafa.',
      'Coloque as fatias de queijo Canastra sobre a carne e tampe por 1 minuto para fundir.',
      'Suculência carnívora total, zero carboidratos e altíssima saciedade.'
    ]
  },
  {
    id: 'r12',
    title: 'Contrafilé Alto Grelhado com Crosta de Parmesão e Manteiga',
    category: 'Almoço e Jantar',
    prepTime: '12 min',
    calories: 450,
    netCarbs: 0,
    protein: 46,
    fat: 29,
    servings: 1,
    classification: 'Excelente',
    ingredients: [
      '200g de contrafilé bovino alto',
      '35g de queijo parmesão curado ralado',
      '1 colher de sopa de manteiga pura',
      'Sal grosso a gosto'
    ],
    steps: [
      'Aqueça a frigideira de ferro em fogo bem alto com a manteiga.',
      'Tempere o contrafilé com sal grosso e coloque na frigideira bem quente.',
      'Doure por 3 minutos de um lado, vire o bife e cubra o topo com o parmesão ralado.',
      'Regue as laterais com a manteiga espumante e deixe o queijo dourar.',
      'Deixe descansar por 2 minutos antes de cortar para reter todo o suco da carne.'
    ]
  },
  {
    id: 'r13',
    title: 'Hambúrguer 100% Bovino Recheado com Muçarela e Presunto',
    category: 'Almoço e Jantar',
    prepTime: '14 min',
    calories: 460,
    netCarbs: 0,
    protein: 46,
    fat: 31,
    servings: 1,
    classification: 'Excelente',
    ingredients: [
      '180g de carne bovina moída pura (fraldinha ou acém com 20% gordura)',
      '50g de queijo muçarela fatiado',
      '2 fatias de presunto cozido',
      '1 colher de banha ou manteiga para chapear',
      'Sal marinho e pimenta a gosto'
    ],
    steps: [
      'Divida a carne moída temperada apenas com sal em duas bolas e achate formando dois discos finos.',
      'Dobre o presunto e a muçarela no meio de um disco e cubra com o outro, selando muito bem as bordas.',
      'Aqueça uma chapa ou frigideira grossa com banha de porco.',
      'Grelhe o hambúrguer por 4 minutos de cada lado até ficar com crosta dourada e o queijo derreter no recheio.',
      'O verdadeiro smash burger carnívoro: zero pão, zero açúcar e zero carboidrato!'
    ]
  },
  {
    id: 'r14',
    title: 'Carne Moída Suculenta na Frigideira com Ovos Estalados e Queijo Prato',
    category: 'Almoço e Jantar',
    prepTime: '12 min',
    calories: 440,
    netCarbs: 0,
    protein: 45,
    fat: 29,
    servings: 1,
    classification: 'Excelente',
    ingredients: [
      '170g de carne moída bovina fresca',
      '2 ovos caipiras inteiros',
      '40g de queijo prato fatiado',
      '1 colher de manteiga pura',
      'Sal marinho a gosto'
    ],
    steps: [
      'Em fogo médio, refogue a carne moída na manteiga com sal marinho até secar a água e dourar.',
      'Com uma colher, abra dois espaços na carne no fundo da frigideira.',
      'Quebre os dois ovos inteiros diretamente nesses espaços.',
      'Cubra a carne ao redor com as fatias de queijo prato.',
      'Tampe a frigideira em fogo baixo por 3 minutos até as claras firmarem e o queijo derreter sobre a carne.'
    ]
  },
  {
    id: 'r15',
    title: 'Costela Bovina de Panela Desmanchando com Agrião Fresco Zero Carbo',
    category: 'Almoço e Jantar',
    prepTime: '45 min',
    calories: 520,
    netCarbs: 0,
    protein: 42,
    fat: 39,
    servings: 2,
    classification: 'Excelente',
    ingredients: [
      '350g de costela bovina em pedaços com osso',
      '1 maço pequeno (50g) de agrião fresco lavado (0g carbo líquido)',
      '1 colher de sopa de banha de porco',
      '1 xícara de água',
      'Sal grosso a gosto'
    ],
    steps: [
      'Na panela de pressão bem quente, doure os pedaços de costela na banha até formar uma crosta escura.',
      'Adicione o sal grosso e a xícara de água.',
      'Feche a pressão e cozinhe por 40 minutos em fogo médio até a carne desmanchar do osso.',
      'Abra a panela, desligue o fogo e misture as folhas frescas de agrião no caldo fervente por 30 segundos.',
      'O agrião absorve os sucos nobres da carne mantendo carboidratos estritamente zerados.'
    ]
  },
  {
    id: 'r16',
    title: 'Maminha Fatiada na Chapa com Rúcula e Lascas de Meia Cura',
    category: 'Almoço e Jantar',
    prepTime: '15 min',
    calories: 420,
    netCarbs: 0,
    protein: 44,
    fat: 27,
    servings: 1,
    classification: 'Excelente',
    ingredients: [
      '200g de bife de maminha bovina macia',
      '1 xícara (40g) de folhas de rúcula fresca (0g carbo líquido)',
      '40g de queijo meia cura em lascas finas',
      '1 colher de manteiga para grelhar',
      'Sal marinho a gosto'
    ],
    steps: [
      'Grelhe a maminha na chapa quente com manteiga até o ponto desejado (cerca de 3 a 4 minutos por lado).',
      'Transfira para a tábua, salpique sal e fatie em tiras finas contra a fibra da carne.',
      'Disponha as tiras quentes sobre uma cama de rúcula fresca lavada.',
      'Finalize distribuindo as lascas de queijo meia cura, que amolecem levemente em contato com a carne quente.'
    ]
  },
  {
    id: 'r17',
    title: 'Bife de Alcatra com Queijo Canastra Fundido na Manteiga',
    category: 'Almoço e Jantar',
    prepTime: '10 min',
    calories: 390,
    netCarbs: 0,
    protein: 48,
    fat: 22,
    servings: 1,
    classification: 'Excelente',
    ingredients: [
      '200g de bife de alcatra bovina limpa',
      '40g de queijo Canastra fatiado',
      '1 colher de manteiga pura',
      'Sal grosso fino e pimenta a gosto'
    ],
    steps: [
      'Aqueça a frigideira com a manteiga até espumar.',
      'Coloque o bife de alcatra temperado com sal e doure por 3 minutos.',
      'Vire o bife e coloque imediatamente o queijo Canastra sobre a carne quente.',
      'Tampe e deixe em fogo baixo por 2 minutos até o queijo cobrir todo o bife em um manto cremoso.',
      'Refeição rápida, prática e 100% isenta de açúcares ou carboidratos.'
    ]
  },
  {
    id: 'r18',
    title: 'Cupim Bovina Assado no Bafo com Sal Grosso e Manteiga',
    category: 'Almoço e Jantar',
    prepTime: '50 min',
    calories: 540,
    netCarbs: 0,
    protein: 38,
    fat: 43,
    servings: 2,
    classification: 'Excelente',
    ingredients: [
      '400g de cupim bovino fatiado espesso',
      '2 colheres de sopa de manteiga pura',
      'Sal grosso marinho a gosto',
      '1/2 xícara de água'
    ],
    steps: [
      'Na panela de pressão, sele as fatias de cupim com a manteiga de todos os lados.',
      'Tempere com o sal grosso e adicione a meia xícara de água.',
      'Tampe e deixe na pressão por 45 minutos em fogo baixo.',
      'Deixe a pressão sair naturalmente e abra: o cupim estará desmanchando na própria gordura marmorizada.',
      'Puro sabor e colágeno sem um único grama de carbo.'
    ]
  },
  {
    id: 'r19',
    title: 'Escondidinho Carnívoro: Carne Bovina com Cobertura de Queijo e Ovos',
    category: 'Almoço e Jantar',
    prepTime: '20 min',
    calories: 470,
    netCarbs: 0,
    protein: 47,
    fat: 31,
    servings: 1,
    classification: 'Excelente',
    ingredients: [
      '180g de carne moída bovina refogada na manteiga com sal',
      '2 ovos caipiras batidos',
      '50g de queijo muçarela ralado',
      '20g de queijo parmesão ralado',
      '1 colher de manteiga'
    ],
    steps: [
      'Em um ramequim ou pequeno refratário, faça a base com a carne moída refogada e temperada.',
      'Bata os 2 ovos com a manteiga derretida e metade da muçarela.',
      'Despeje esse creme carnívoro sobre a carne moída.',
      'Cubra com o restante da muçarela e o queijo parmesão ralado.',
      'Leve à Airfryer a 180°C por 8 minutos até a camada de ovos e queijo formar um suflê dourado e borbulhante.'
    ]
  },
  {
    id: 'r20',
    title: 'Medalhão de Filé Mignon Envolto em Bacon Grelhado na Manteiga',
    category: 'Almoço e Jantar',
    prepTime: '14 min',
    calories: 430,
    netCarbs: 0,
    protein: 44,
    fat: 28,
    servings: 1,
    classification: 'Excelente',
    ingredients: [
      '180g de medalhão de filé mignon bovino',
      '2 fatias longas de bacon artesanal (sem açúcar)',
      '1 colher de manteiga pura',
      'Palito de dente para fixar o bacon',
      'Sal marinho a gosto'
    ],
    steps: [
      'Enrole as fatias de bacon ao redor da lateral do medalhão de filé mignon e prenda com um palito de dente.',
      'Tempere a carne de ambos os lados com sal marinho.',
      'Aqueça a frigideira com manteiga e grelhe o medalhão por 4 minutos de cada lado.',
      'Role o medalhão de lado na frigideira para dourar e deixar o bacon perfeitamente crocante.',
      'Retire o palito e sirva suculento. Sofisticação carnívora com 0g de carbo!'
    ]
  },

  // =========================================================================
  // ALMOÇO E JANTAR - FRANGO E AVES (RECEITAS 21 A 28)
  // =========================================================================
  {
    id: 'r21',
    title: 'Sobrecoxa de Frango Crocante Gratinada com Queijo Parmesão',
    category: 'Almoço e Jantar',
    prepTime: '25 min',
    calories: 410,
    netCarbs: 0,
    protein: 44,
    fat: 26,
    servings: 1,
    classification: 'Excelente',
    ingredients: [
      '200g de filé de sobrecoxa de frango com pele',
      '40g de queijo parmesão curado ralado puro',
      '1 colher de sopa de manteiga para dourar',
      'Sal marinho e pimenta a gosto'
    ],
    steps: [
      'Tempere a sobrecoxa com sal marinho.',
      'Coloque na frigideira de ferro com a manteiga, mantendo a pele virada para baixo em fogo médio.',
      'Deixe dourar por 12 minutos até a pele ficar extremamente sequinha e crocante.',
      'Vire a carne, cubra o topo com o queijo parmesão ralado e tampe até derreter e gratinar.',
      'Refeição hiperproteica, saborosa e com zero gramas de carboidrato.'
    ]
  },
  {
    id: 'r22',
    title: 'Frango a Passarinho Crocante Frito na Banha de Porco Pura',
    category: 'Almoço e Jantar',
    prepTime: '20 min',
    calories: 430,
    netCarbs: 0,
    protein: 42,
    fat: 29,
    servings: 1,
    classification: 'Excelente',
    ingredients: [
      '250g de pedaços de frango a passarinho com pele',
      '2 colheres de sopa de banha de porco artesanal',
      'Sal marinho a gosto'
    ],
    steps: [
      'Seque muito bem os pedaços de frango com papel toalha e tempere com bastante sal marinho.',
      'Aqueça a banha de porco na panela em fogo médio.',
      'Coloque o frango sem sobrepor e frite até ficar intensamente dourado e crocante por fora e cozido por dentro.',
      'Retire e escorra em uma grelha. Sem nenhuma farinha ou empanamento, crocância pura e 0g de carbo.'
    ]
  },
  {
    id: 'r23',
    title: 'Peito de Frango Recheado com Presunto e Queijo Muçarela',
    category: 'Almoço e Jantar',
    prepTime: '18 min',
    calories: 390,
    netCarbs: 0,
    protein: 50,
    fat: 20,
    servings: 1,
    classification: 'Excelente',
    ingredients: [
      '200g de filé de peito de frango grosso',
      '2 fatias de presunto cozido',
      '50g de queijo muçarela',
      '1 colher de manteiga pura para dourar',
      'Sal marinho a gosto'
    ],
    steps: [
      'Com uma faca afiada, faça um corte horizontal no peito de frango criando uma bolsa interna.',
      'Recheie com as fatias de presunto dobradas com o queijo muçarela por dentro.',
      'Feche a abertura com palitos de dente e tempere o lado externo com sal marinho.',
      'Grelhe na frigideira untada com manteiga em fogo brando com tampa por 7 minutos de cada lado até dourar e o queijo fundir por dentro.',
      'Retire os palitos e corte ao meio para ver o queijo derretendo.'
    ]
  },
  {
    id: 'r24',
    title: 'Asinhas de Frango Douradas na Airfryer com Crosta Salgada',
    category: 'Almoço e Jantar',
    prepTime: '25 min',
    calories: 380,
    netCarbs: 0,
    protein: 36,
    fat: 26,
    servings: 1,
    classification: 'Excelente',
    ingredients: [
      '250g de asinhas e coxinhas da asa de frango frescas',
      '1 colher de manteiga derretida',
      'Sal grosso triturado a gosto'
    ],
    steps: [
      'Pincele as asinhas com a manteiga derretida e passe no sal grosso triturado.',
      'Acomode na cesta da Airfryer pré-aquecida a 190°C.',
      'Asse por 15 minutos, agite a cesta e asse por mais 10 minutos a 200°C até a pele pururucar.',
      'Petisco suculento, perfeito para qualquer refeição zero carboidrato.'
    ]
  },
  {
    id: 'r25',
    title: 'Tiras de Frango Salteadas na Manteiga com Espinafre Zero Carbo',
    category: 'Almoço e Jantar',
    prepTime: '12 min',
    calories: 340,
    netCarbs: 0,
    protein: 42,
    fat: 18,
    servings: 1,
    classification: 'Excelente',
    ingredients: [
      '180g de peito de frango cortado em tiras',
      '80g de folhas frescas de espinafre lavado (0g carbo líquido)',
      '1 colher de sopa de manteiga pura',
      '30g de queijo Canastra ou Prato ralado',
      'Sal marinho a gosto'
    ],
    steps: [
      'Doure as tiras de frango na frigideira com metade da manteiga e o sal até ficarem completamente cozidas e douradas.',
      'Adicione a outra metade da manteiga e despeje as folhas de espinafre cru.',
      'Mexa por cerca de 1 a 2 minutos até o espinafre murchar e absorver a manteiga.',
      'Desligue o fogo, salpique o queijo ralado por cima e deixe derreter.',
      'Combinação rica em minerais, ferro e 0g de carboidratos líquidos!'
    ]
  },
  {
    id: 'r26',
    title: 'Coxa de Frango Assada com Pele Crocante e Queijo Provolone',
    category: 'Almoço e Jantar',
    prepTime: '30 min',
    calories: 420,
    netCarbs: 0,
    protein: 40,
    fat: 28,
    servings: 1,
    classification: 'Excelente',
    ingredients: [
      '2 coxas de frango inteiras com pele',
      '40g de queijo provolone em fatias',
      '1 colher de banha de porco para pincelar',
      'Sal grosso a gosto'
    ],
    steps: [
      'Pincele as coxas com a banha de porco e tempere generosamente com sal grosso.',
      'Asse na Airfryer a 180°C por 25 minutos até a carne ficar macia e a pele estaladiça.',
      'Nos últimos 3 minutos, coloque as fatias de queijo provolone sobre as coxas e retorne para gratinar.',
      'Sabor defumado do provolone com a suculência do frango assado.'
    ]
  },
  {
    id: 'r27',
    title: 'Fricassê Carnívoro de Frango com Creme de Ovos e Muçarela',
    category: 'Almoço e Jantar',
    prepTime: '15 min',
    calories: 410,
    netCarbs: 0,
    protein: 48,
    fat: 23,
    servings: 1,
    classification: 'Excelente',
    ingredients: [
      '180g de peito de frango cozido e desfiado',
      '2 ovos caipiras inteiros',
      '60g de queijo muçarela ralado',
      '1 colher de sopa de manteiga pura',
      'Sal marinho a gosto'
    ],
    steps: [
      'No liquidificador, bata os 2 ovos com a manteiga morna e 20g de muçarela até emulsionar em um creme aveludado.',
      'Em uma frigideira funda, misture o frango desfiado com esse creme em fogo baixo até encorpar.',
      'Transfira para um refratário pequeno, cubra com o restante da muçarela (40g).',
      'Gratine por 5 minutos no forno ou Airfryer até a camada de cima formar bolhas douradas.',
      'Sem milho, sem farinha, sem leite: apenas proteína nobre e zero carbo!'
    ]
  },
  {
    id: 'r28',
    title: 'Moela de Frango Macia Cozida na Pressão com Cubos de Bacon',
    category: 'Almoço e Jantar',
    prepTime: '35 min',
    calories: 360,
    netCarbs: 0,
    protein: 42,
    fat: 20,
    servings: 1,
    classification: 'Excelente',
    ingredients: [
      '250g de moela de frango limpa',
      '40g de bacon artesanal cortado em cubos',
      '1 colher de banha de porco',
      '1/2 xícara de água',
      'Sal marinho a gosto'
    ],
    steps: [
      'Na panela de pressão, frite os cubos de bacon na banha até soltarem aroma e gordura.',
      'Acrescente a moela limpa e sele na gordura quente por 3 minutos.',
      'Tempere com sal e acrescente a água.',
      'Tampe e deixe cozinhar na pressão por 30 minutos até a moela ficar incrivelmente macia e desmanchando na boca.',
      'Prato tradicional de boteco brasileiro 100% zero carboidrato.'
    ]
  },

  // =========================================================================
  // ALMOÇO E JANTAR - PEIXES E FRUTOS DO MAR (RECEITAS 29 A 36)
  // =========================================================================
  {
    id: 'r29',
    title: 'Filé de Salmão Grelhado na Manteiga com Crosta de Provolone',
    category: 'Almoço e Jantar',
    prepTime: '12 min',
    calories: 390,
    netCarbs: 0,
    protein: 38,
    fat: 26,
    servings: 1,
    classification: 'Excelente',
    ingredients: [
      '180g de filé de salmão fresco',
      '40g de queijo provolone curado fatiado fino',
      '1 colher de sopa de manteiga pura',
      'Sal marinho a gosto'
    ],
    steps: [
      'Tempere o salmão com sal marinho minutos antes do preparo.',
      'Derreta a manteiga na frigideira de ferro em fogo médio e doure o filé por cerca de 3 minutos de cada lado.',
      'Cubra a superfície do filé com as fatias finas de queijo provolone.',
      'Tampe a frigideira para que o calor retenha e derreta o queijo fundindo com os óleos saudáveis do peixe.',
      'Riquíssimo em ômega-3 anti-inflamatório e rigorosamente 0.0g de carboidrato.'
    ]
  },
  {
    id: 'r30',
    title: 'Filé de Tilápia na Manteiga com Crosta Crocante de Canastra',
    category: 'Almoço e Jantar',
    prepTime: '10 min',
    calories: 320,
    netCarbs: 0,
    protein: 42,
    fat: 17,
    servings: 1,
    classification: 'Excelente',
    ingredients: [
      '200g de filé de tilápia fresca',
      '40g de queijo Canastra ou Parmesão ralado na hora',
      '1 colher de sopa de manteiga pura',
      'Sal marinho a gosto'
    ],
    steps: [
      'Seque os filés de tilápia com papel absorvente e salpique sal marinho de ambos os lados.',
      'Aqueça a frigideira antiaderente com a manteiga.',
      'Pressione o lado superior do filé no queijo ralado formando uma camada espessa.',
      'Coloque o filé com o lado do queijo virado para cima primeiro por 3 minutos; depois vire delicadamente e doure a crosta de queijo por 2 minutos até ficar crocante.',
      'Peixe leve, saboroso e zero carbo para emagrecimento rápido.'
    ]
  },
  {
    id: 'r31',
    title: 'Sardinha Fresca Assada com Azeite de Oliva e Sal Grosso',
    category: 'Almoço e Jantar',
    prepTime: '18 min',
    calories: 340,
    netCarbs: 0,
    protein: 36,
    fat: 21,
    servings: 1,
    classification: 'Excelente',
    ingredients: [
      '4 sardinhas frescas espalmadas e limpas (200g)',
      '1 colher de sopa de azeite de oliva extravirgem',
      'Sal grosso triturado a gosto'
    ],
    steps: [
      'Abra as sardinhas limpas em uma assadeira ou na cesta da Airfryer.',
      'Regue com o azeite de oliva e polvilhe sal grosso por toda a carne.',
      'Asse a 200°C por 12 a 15 minutos até a pele ficar dourada e crocante.',
      'Alimento riquíssimo em cálcio, fósforo, vitamina D e ômega-3 natural com 0g de carbo.'
    ]
  },
  {
    id: 'r32',
    title: 'Camarão Salteado na Manteiga de Garrafa com Queijo Meia Cura',
    category: 'Almoço e Jantar',
    prepTime: '10 min',
    calories: 330,
    netCarbs: 0,
    protein: 38,
    fat: 19,
    servings: 1,
    classification: 'Excelente',
    ingredients: [
      '200g de camarões limpos e sem casca',
      '1 colher de sopa de manteiga de garrafa',
      '40g de queijo meia cura cortado em cubinhos pequenos',
      'Sal marinho a gosto'
    ],
    steps: [
      'Tempere os camarões com sal marinho.',
      'Aqueça a frigideira bem quente com a manteiga de garrafa.',
      'Adicione os camarões e salteie por apenas 2 minutos de cada lado até ficarem rosados.',
      'Nos últimos 30 segundos, jogue os cubinhos de queijo meia cura na frigideira para que comecem a fundir.',
      'Desligue imediatamente e sirva quente. Prato de praia nobre e 100% zero carbo.'
    ]
  },
  {
    id: 'r33',
    title: 'Posta de Atum Selada com Parmesão e Cama de Rúcula Zero Carbo',
    category: 'Almoço e Jantar',
    prepTime: '8 min',
    calories: 350,
    netCarbs: 0,
    protein: 48,
    fat: 17,
    servings: 1,
    classification: 'Excelente',
    ingredients: [
      '180g de posta de atum fresco',
      '40g de folhas frescas de rúcula (0g carbo líquido)',
      '25g de queijo parmesão ralado',
      '1 colher de manteiga para selar',
      'Sal marinho a gosto'
    ],
    steps: [
      'Passe o atum no sal marinho e empane levemente no queijo parmesão ralado.',
      'Aqueça a frigideira de ferro com a manteiga até quase fumegar.',
      'Sele o atum por 1 minuto e meio de cada lado, mantendo o centro rosado e suculento.',
      'Coloque a posta sobre as folhas frescas de rúcula no prato e sirva imediatamente.'
    ]
  },
  {
    id: 'r34',
    title: 'Moqueca Carnívora de Peixe Branco e Ovos Caipiras na Banha',
    category: 'Almoço e Jantar',
    prepTime: '20 min',
    calories: 380,
    netCarbs: 0,
    protein: 44,
    fat: 22,
    servings: 1,
    classification: 'Excelente',
    ingredients: [
      '200g de posta ou filé de peixe branco firme (cação ou robalo)',
      '2 ovos caipiras inteiros cozidos',
      '1 colher de sopa de banha de porco artesanal',
      '1/2 xícara de caldo concentrado de ossos ou água pura',
      'Sal grosso triturado a gosto'
    ],
    steps: [
      'Na panela de barro ou ferro, derreta a banha de porco com sal.',
      'Acomode o peixe e deixe cozinhar em fogo brando com o caldo tampado por 10 minutos.',
      'Corte os ovos cozidos ao meio e coloque na panela ao lado do peixe nos últimos 3 minutos.',
      'O caldo encorpa com os sucos naturais do peixe e da gema de ovo. Puro aconchego 0g carbo!'
    ]
  },
  {
    id: 'r35',
    title: 'Pescada Branca Grelhada com Molho de Manteiga Dourada e Cheiro-Verde',
    category: 'Almoço e Jantar',
    prepTime: '10 min',
    calories: 300,
    netCarbs: 0,
    protein: 36,
    fat: 17,
    servings: 1,
    classification: 'Excelente',
    ingredients: [
      '200g de filé de pescada branca limpa',
      '1 colher e meia de sopa de manteiga pura',
      '1 colher de sopa de salsinha e cebolinha verde picadas (0g carbo líquido)',
      'Sal marinho a gosto'
    ],
    steps: [
      'Tempere o filé de pescada com sal marinho.',
      'Em frigideira antiaderente, doure o peixe com meia colher de manteiga por 3 minutos de cada lado.',
      'Em uma panelinha separada, aqueça o restante da manteiga em fogo baixo até chiar e ganhar um tom levemente dourado (manteiga noisette).',
      'Despeje a manteiga dourada e o cheiro-verde fresco sobre o filé grelhado no prato.'
    ]
  },
  {
    id: 'r36',
    title: 'Salpicão Carnívoro de Frango Desfiado, Presunto e Queijo Ralado',
    category: 'Almoço e Jantar',
    prepTime: '10 min',
    calories: 360,
    netCarbs: 0,
    protein: 44,
    fat: 20,
    servings: 1,
    classification: 'Excelente',
    ingredients: [
      '150g de peito de frango cozido e desfiado frio',
      '50g de presunto cozido em tiras finas',
      '40g de queijo prato ou muçarela ralado',
      '2 gemas de ovos caipiras cozidas amassadas com 1 colher de manteiga derretida (molho)',
      'Sal marinho a gosto'
    ],
    steps: [
      'Em uma tigela, misture as gemas cozidas com a manteiga derretida e o sal até formar uma pasta sedosa que substitui a maionese.',
      'Adicione o frango desfiado, as tiras de presunto e o queijo ralado.',
      'Misture muito bem até todos os ingredientes estarem incorporados e cremosos.',
      'Sirva gelado ou em temperatura ambiente. Zero uva-passa, zero cenoura: 100% carnívoro e zero carbo.'
    ]
  },

  // =========================================================================
  // ALMOÇO E JANTAR - CARNES SUÍNAS (RECEITAS 37 A 43)
  // =========================================================================
  {
    id: 'r37',
    title: 'Costelinha de Porco Dourada com Torresmo Crocante',
    category: 'Almoço e Jantar',
    prepTime: '30 min',
    calories: 480,
    netCarbs: 0,
    protein: 38,
    fat: 36,
    servings: 1,
    classification: 'Excelente',
    ingredients: [
      '220g de costelinha suína macia',
      '30g de torresmo artesanal crocante puro',
      'Sal grosso triturado a gosto',
      'Banha de porco para untar'
    ],
    steps: [
      'Tempere a costelinha com sal grosso triturado.',
      'Asse no forno a 200°C ou na Airfryer por 25 minutos até ficar bem dourada, macia e soltando do osso.',
      'Finalize acompanhada de cubos crocantes de torresmo puro artesanal.',
      'Máxima densidade nutricional, gorduras boas e saciedade carnívora prolongada.'
    ]
  },
  {
    id: 'r38',
    title: 'Bisteca Suína na Chapa com Queijo Gorgonzola Fundido',
    category: 'Almoço e Jantar',
    prepTime: '12 min',
    calories: 410,
    netCarbs: 0,
    protein: 39,
    fat: 28,
    servings: 1,
    classification: 'Excelente',
    ingredients: [
      '200g de bisteca de porco suculenta',
      '35g de queijo gorgonzola curado',
      '1 colher de manteiga pura',
      'Sal marinho a gosto'
    ],
    steps: [
      'Tempere a bisteca suína com sal marinho.',
      'Aqueça a chapa ou frigideira com manteiga e grelhe a bisteca por 4 a 5 minutos de cada lado até dourar.',
      'Coloque pedaços de queijo gorgonzola sobre a carne quente nos minutos finais para fundir.',
      'Sabor sofisticado, zero carboidratos e altíssima saciedade.'
    ]
  },
  {
    id: 'r39',
    title: 'Lombo Suíno Assado Fatiado com Manteiga e Queijo Prato',
    category: 'Almoço e Jantar',
    prepTime: '25 min',
    calories: 390,
    netCarbs: 0,
    protein: 48,
    fat: 21,
    servings: 1,
    classification: 'Excelente',
    ingredients: [
      '220g de lombo suíno fatiado',
      '40g de queijo prato fatiado',
      '1 colher de manteiga de garrafa pura',
      'Sal grosso fino a gosto'
    ],
    steps: [
      'Tempere as fatias de lombo com sal grosso.',
      'Grelhe na frigideira de ferro com a manteiga de garrafa até selar e dourar dos dois lados.',
      'Sobreponha as fatias de queijo prato em cada fatia de lombo.',
      'Tampe e abafe por 2 minutos para derreter o queijo sobre a carne magra suína.'
    ]
  },
  {
    id: 'r40',
    title: 'Panceta Crocante Dourada na Airfryer com Sal Grosso Marinho',
    category: 'Almoço e Jantar',
    prepTime: '30 min',
    calories: 470,
    netCarbs: 0,
    protein: 26,
    fat: 41,
    servings: 1,
    classification: 'Excelente',
    ingredients: [
      '200g de panceta suína fatiada em tiras de 1 dedo',
      'Sal grosso marinho a gosto'
    ],
    steps: [
      'Seque muito bem a pele da panceta com papel toalha.',
      'Tempere as tiras com sal grosso marinho.',
      'Disponha na cesta da Airfryer com a pele voltada para cima.',
      'Asse a 180°C por 20 minutos e finalize a 200°C por mais 8 minutos até a pele pipocar por completo e pururucar.',
      'Crocância extrema e energia cetogênica sem carboidratos.'
    ]
  },
  {
    id: 'r41',
    title: 'Torresmo de Rolo Pururuca Estalando na Banha',
    category: 'Almoço e Jantar',
    prepTime: '40 min',
    calories: 510,
    netCarbs: 0,
    protein: 30,
    fat: 43,
    servings: 2,
    classification: 'Excelente',
    ingredients: [
      '300g de barriga de porco enrolada em rolo e amarrada com barbante',
      '1 colher de sopa de banha de porco',
      'Sal grosso a gosto'
    ],
    steps: [
      'Tempere a peça de barriga de porco com bastante sal grosso.',
      'Asse no forno ou Airfryer a 160°C por 30 minutos para desidratar o couro.',
      'Retire e despeje banha de porco fervente sobre o couro ou coloque a 200°C por 10 minutos até estalar e formar pururuca.',
      'Corte em rodelas crocantes. O clássico petisco caipira 100% zero carbo.'
    ]
  },
  {
    id: 'r42',
    title: 'Cubos de Pernil de Porco Dourados com Escarola Salteada Zero Carbo',
    category: 'Almoço e Jantar',
    prepTime: '18 min',
    calories: 410,
    netCarbs: 0,
    protein: 44,
    fat: 26,
    servings: 1,
    classification: 'Excelente',
    ingredients: [
      '200g de pernil suíno em cubos médios',
      '80g de folhas de escarola lavadas e picadas grosseiramente (0g carbo líquido)',
      '1 colher de sopa de banha de porco',
      'Sal marinho a gosto'
    ],
    steps: [
      'Em frigideira grande, doure os cubos de pernil na banha de porco com sal até ficarem bem corados.',
      'Quando o pernil estiver dourado e macio, adicione as folhas de escarola diretamente na frigideira.',
      'Salteie por 2 minutos para murchar levemente a verdura na gordura do porco.',
      'A escarola traz frescor e saciedade sem somar carboidratos absorvíveis.'
    ]
  },
  {
    id: 'r43',
    title: 'Linguiça de Carne 100% Artesanal Grelhada com Ovos Caipiras',
    category: 'Almoço e Jantar',
    prepTime: '15 min',
    calories: 430,
    netCarbs: 0,
    protein: 38,
    fat: 31,
    servings: 1,
    classification: 'Excelente',
    ingredients: [
      '180g de linguiça artesanal de pernil ou carne bovina (sem amido, sem açúcar)',
      '2 ovos caipiras inteiros',
      '1 colher de manteiga ou banha',
      'Sal a gosto'
    ],
    steps: [
      'Corte a linguiça ao meio no comprimento e grelhe na frigideira até dourar bem.',
      'Afaste as linguiças para a lateral da frigideira e quebre os dois ovos no centro.',
      'Frite os ovos até a gema ficar no ponto desejado.',
      'Prato rústico e autêntico brasileiro com zero gramas de carboidrato.'
    ]
  },

  // =========================================================================
  // LANCHES, CALDOS & PETISCOS ZERO CARBO (RECEITAS 44 A 50)
  // =========================================================================
  {
    id: 'r44',
    title: 'Rolinhos de Presunto Recheados com Frango e Muçarela Derretida',
    category: 'Lanches',
    prepTime: '8 min',
    calories: 320,
    netCarbs: 0,
    protein: 36,
    fat: 19,
    servings: 1,
    classification: 'Excelente',
    ingredients: [
      '4 fatias de presunto cozido de qualidade (sem amido)',
      '100g de peito de frango cozido e desfiado',
      '60g de queijo muçarela ralado',
      '1 colher de manteiga pura para dourar'
    ],
    steps: [
      'Abra as fatias de presunto sobre uma superfície limpa.',
      'Coloque uma porção de frango desfiado temperado com sal e queijo muçarela no meio de cada fatia.',
      'Enrole firmemente como pequenos charutos.',
      'Coloque na frigideira untada com manteiga em fogo baixo com tampa por 3 a 5 minutos até a muçarela derreter e o presunto dourar.',
      'Lanche rápido, prático e rigorosamente zero carboidrato.'
    ]
  },
  {
    id: 'r45',
    title: 'Chips Crocantes de Queijo Provolone Assados (Zero Carbo)',
    category: 'Lanches',
    prepTime: '10 min',
    calories: 210,
    netCarbs: 0,
    protein: 16,
    fat: 16,
    servings: 1,
    classification: 'Excelente',
    ingredients: [
      '60g de queijo provolone fatiado fininho (cerca de 6 a 8 fatias)'
    ],
    steps: [
      'Disponha as fatias de queijo provolone sobre papel manteiga em uma assadeira ou direto na cesta da Airfryer.',
      'Asse no forno a 180°C ou na Airfryer a 170°C por 6 a 8 minutos até borbulhar e ficar dourado.',
      'Retire e espere esfriar por 2 minutos: ao esfriar, o queijo fica tão crocante quanto um salgadinho de pacote!',
      'Perfeito para matar a vontade de petiscar mantendo 0g de carbo.'
    ]
  },
  {
    id: 'r46',
    title: 'Caldo Concentrado de Tutano e Ossos Bovinos (Rico em Colágeno)',
    category: 'Lanches',
    prepTime: '60 min',
    calories: 220,
    netCarbs: 0,
    protein: 26,
    fat: 13,
    servings: 2,
    classification: 'Excelente',
    ingredients: [
      '500g de ossos bovinos com tutano (ossobuco ou mocotó)',
      '1 colher de sopa de vinagre de maçã (ajuda a extrair minerais dos ossos)',
      '1 colher de sopa de cebolinha verde picada (0g carbo)',
      '1 litro de água',
      'Sal marinho a gosto'
    ],
    steps: [
      'Na panela de pressão, coloque os ossos, a água, o sal e o vinagre.',
      'Cozinhe sob pressão por pelo menos 50 a 60 minutos.',
      'Retire a pressão, coe o caldo dourado e espesso com auxílio de uma peneira.',
      'Retire o tutano macio de dentro dos ossos e misture ao caldo quente.',
      'Sirva em canecas com a cebolinha verde fresca polvilhada. Cura intestinal, colágeno puro e zero carbo.'
    ]
  },
  {
    id: 'r47',
    title: 'Canapés de Presunto Parma com Rúcula e Queijo Meia Cura',
    category: 'Lanches',
    prepTime: '5 min',
    calories: 240,
    netCarbs: 0,
    protein: 24,
    fat: 16,
    servings: 1,
    classification: 'Excelente',
    ingredients: [
      '4 fatias de presunto cru tipo Parma ou Serrano (sem açúcar)',
      '4 fatias médias de queijo meia cura artesanal',
      'Folhas frescas de rúcula (0g carbo líquido)',
      'Gotas de azeite extravirgem e flor de sal'
    ],
    steps: [
      'Use cada fatia de queijo meia cura como base do canapé.',
      'Dobre uma folha de rúcula sobre o queijo.',
      'Cubra e envolva com uma fatia de presunto cru tipo Parma.',
      'Finalize com gotas de azeite extravirgem e sirva frio. Elegante, proteico e zero carboidrato.'
    ]
  },
  {
    id: 'r48',
    title: 'Petisco de Ovos de Codorna com Cubos de Queijo Canastra e Presunto',
    category: 'Lanches',
    prepTime: '10 min',
    calories: 270,
    netCarbs: 0,
    protein: 23,
    fat: 20,
    servings: 1,
    classification: 'Excelente',
    ingredients: [
      '6 ovos de codorna cozidos e descascados',
      '40g de queijo Canastra em cubos',
      '40g de presunto cozido em cubos',
      'Palitos de dente'
    ],
    steps: [
      'Em cada palito de dente, espete um cubo de presunto, um cubo de queijo Canastra e um ovo de codorna.',
      'Salpique flor de sal por cima.',
      'Excelente para manter na geladeira e consumir quando bater fome fora de hora com zero impacto na glicemia.'
    ]
  },
  {
    id: 'r49',
    title: 'Salada Refrescante de Agrião, Rúcula e Tiras de Picanha com Queijo',
    category: 'Lanches',
    prepTime: '10 min',
    calories: 380,
    netCarbs: 0,
    protein: 38,
    fat: 25,
    servings: 1,
    classification: 'Excelente',
    ingredients: [
      '150g de picanha bovina grelhada em tiras finas',
      '40g de agrião fresco (0g carbo líquido)',
      '40g de rúcula fresca (0g carbo líquido)',
      '30g de queijo parmesão curado em lascas',
      '1 colher de azeite de oliva e sal marinho'
    ],
    steps: [
      'Lave e seque as folhas de agrião e rúcula e disponha em um prato fundo.',
      'Tempere as verduras com o azeite de oliva e sal marinho.',
      'Acomode as tiras ainda mornas de picanha grelhada sobre as folhas.',
      'Finalize com lascas generosas de queijo parmesão curado. O contraste das verduras frescas com a carne quente é espetacular e 100% zero carbo.'
    ]
  },
  {
    id: 'r50',
    title: 'Couve-Manteiga Fininha Salteada na Banha com Bacon e Ovos',
    category: 'Lanches',
    prepTime: '8 min',
    calories: 320,
    netCarbs: 0,
    protein: 20,
    fat: 26,
    servings: 1,
    classification: 'Excelente',
    ingredients: [
      '60g de couve-manteiga fatiada fininha (0g carbo líquido por porção após fibras)',
      '2 fatias de bacon artesanal picado',
      '2 ovos caipiras inteiros',
      '1 colher de banha de porco pura',
      'Sal marinho a gosto'
    ],
    steps: [
      'Em frigideira bem quente, doure o bacon picado na banha de porco.',
      'Adicione a couve-manteiga fininha e salteie rapidamente por 1 minuto para manter verde e viva.',
      'Abra um espaço no centro e quebre os dois ovos.',
      'Mexa suavemente até os ovos cozinharem junto à couve e ao bacon.',
      'Sirva quente com uma pitada de sal marinho. O clássico mineiro adaptado ao rigor carnívoro zero carboidrato!'
    ]
  }
];
