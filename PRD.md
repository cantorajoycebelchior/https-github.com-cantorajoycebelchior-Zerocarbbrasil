# Product Requirements Document (PRD)
## Zero Carb Brasil • Plataforma de Emagrecimento e Saúde Metabólica

---

### 1. Visão Geral do Produto (Executive Summary)

**Nome do Produto:** Zero Carb Brasil  
**Público Principal:** Brasileiros que buscam emagrecimento rápido, reversão de resistência à insulina, controle de diabetes tipo 2 e máxima clareza mental através do estilo de vida estritamente Zero Carb / Carnívoro / Cetogênico Estrito.  
**Proposta de Valor:** O primeiro ecossistema brasileiro focado exclusivamente em nutrição com **0g a 5g de carboidratos líquidos**, combinando:
1. Inteligência Artificial com Visão Computacional para ler rótulos brasileiros e desmascarar açúcares e amidos ocultos.
2. IA Nutricional com sugestões para todos os períodos do dia (café, almoço, lanche, jantar e ceia).
3. Mais de 50 receitas 100% livres de carboidratos com ingredientes acessíveis no Brasil.
4. Treinos semanais em casa com links diretos para o YouTube em língua portuguesa e queima calórica integrada.
5. Acompanhamento de peso, medidas corporais e anéis de hidratação/macronutrientes.
6. Painel administrativo para gestão de assinaturas e suporte nativo via WhatsApp.

---

### 2. Objetivos de Negócio e Indicadores-Chave (KPIs)

| Objetivo Estratégico | Métrica de Sucesso (KPI) | Meta |
| :--- | :--- | :--- |
| **Aquisição de Usuários** | Conversão de visitantes para início de Teste Grátis (Trial 7 dias) | > 25% |
| **Ativação** | Conclusão do fluxo de Onboarding e registro da 1ª refeição | > 70% dos cadastros |
| **Engajamento Diário** | Dias seguidos de registro (Streak) e uso do Scanner de Rótulos IA | Média ≥ 5 dias/semana |
| **Retenção & Conversão** | Conversão de Teste Grátis em Assinantes Pagantes (R$ 29,90/mês) | > 12% |
| **Eficiência Nutricional** | Aderência à meta de 0g a 5g de carboidratos líquidos | 95% das refeições dentro da meta |

---

### 3. Personas de Usuários

#### Persona 1: A Buscadora de Emagrecimento Rápido (Ex: Maria, 34 anos)
- **Dores:** Já tentou dietas restritivas convencionais, sentia fome constante e sofria com efeito sanfona. Não entende rótulos com nomes técnicos de açúcares disfarçados (maltodextrina, xarope de milho).
- **Necessidades:** Saber exatamente o que pode comer no café da manhã e almoço sem sair de casa; escanear o presunto ou queijo no supermercado antes de comprar.

#### Persona 2: O Homem com Resistência à Insulina (Ex: Carlos, 42 anos)
- **Dores:** Pré-diabetes, cansaço pós-refeição, acúmulo de gordura abdominal. Pouco tempo para ir à academia.
- **Necessidades:** Treinos rápidos de 15 a 25 minutos em casa com vídeos didáticos em português; alimentos com impacto glicêmico zero.

#### Persona 3: A Praticante da Dieta Carnívora Estrita (Ex: Joyce, 32 anos)
- **Regras:** Consumo restrito a carnes (boi, frango, porco, peixes), ovos, queijos 0g carb, presunto de verdade, água e café sem açúcar.
- **Necessidades:** Garantir zero carboidratos reais, monitorar água, perda de centímetros na cintura e manter sequências diárias.

---

### 4. Requisitos Funcionais Detalhados

#### 4.1. Autenticação e Multi-Usuário (Multi-Tenant Local & Nuvem)
- **RF-01 (Cadastro):** Formulário simples com `E-mail`, `Senha` (mínimo 6 caracteres), `Nome Completo` e `WhatsApp (com DDD)`. Suporte a dados automáticos e determinísticos para testes E2E.
- **RF-02 (Período de Teste Grátis):** Todo novo usuário recebe automaticamente 7 dias de acesso irrestrito a todas as funcionalidades VIP.
- **RF-03 (Login Resiliente):** Autenticação segura via Firebase Auth com sincronização para Firestore, armazenamento em cofre local (`zc_auth_vault_v1`) e contas salvas no dispositivo.
- **RF-04 (Alternador de Contas):** Interface rápida para alternar entre membros da família no mesmo aparelho sem necessidade de redigitar senhas.
- **RF-05 (Suporte Imediato):** Botão fixo "Precisa de ajuda?" direcionando para WhatsApp de suporte com mensagem pré-formatada.

#### 4.2. Onboarding e Metas Metabólicas Personalizadas
- **Passo 1:** Definição do Objetivo (Emagrecer, Cetose Profunda, Controle de Glicemia, Saúde Metabólica).
- **Passo 2:** Coleta Biométrica (Gênero, Idade, Altura, Peso Atual e Meta de Peso, Nível de Atividade).
- **Passo 3:** Escolha da Meta de Carboidratos Líquidos (0g Carnívora Estrita, 5g Flexível, 20g Cetogênica, 30g Low Carb Forte).
- **Passo 4:** Cálculo instantâneo do TDEE e divisão dos macronutrientes recomendados (Calorias, Proteínas, Gorduras e Net Carbs) e desbloqueio do Trial.

#### 4.3. Diário de Refeições & Anéis de Macronutrientes
- **RF-06 (Anéis Visuais):** Anéis dinâmicos de Carboidratos Líquidos consumidos vs Meta, Calorias, Proteínas, Gorduras e Hidratação (meta de 2.500ml/dia com botões rápidos de +250ml e +500ml).
- **RF-07 (Lançamento de Refeições):** Registro rápido por categoria (Café, Almoço, Jantar, Lanches) com cálculo de Net Carbs (Carboidratos Totais - Fibras - Polióis).
- **RF-08 (Abatimento de Treino):** Calorias gastas nos treinos semanais são deduzidas no balanço diário.

#### 4.4. Inteligência Artificial: Scanner de Produtos por Imagem
- **RF-09 (Captura & Upload):** Usuário tira foto ou carrega imagem do rótulo/tabela nutricional ou embalagem.
- **RF-10 (Análise por Visão Computacional):** Modelo Google Gemini 2.5 Flash lê a tabela nutricional e a lista de ingredientes em português brasileiro.
- **RF-11 (Veredicto Binário):**
  - Identifica se o produto possui carboidratos líquidos reais (> 0g por porção).
  - Alerta sobre açúcares e amidos disfarçados: maltodextrina, amido modificado, xarope de glicose, dextrose, polidextrose, açúcar invertido.
  - Veredicto final: *100% Zero Carb (Permitido)*, *Atenção (Contém Carboidratos)* ou *Proibido na Zero Carb*.
- **RF-12 (Registro com 1 Clique):** Permite adicionar o item escaneado diretamente ao Diário.

#### 4.5. Inteligência Artificial: Consulta Nutricional com Sugestões por Período
- **RF-13 (Busca em Linguagem Natural):** Usuário pesquisa qualquer alimento (ex: "cenoura", "queijo brie", "picanha", "aveia").
- **RF-14 (Diagnóstico Completo):**
  - Quantidade de carboidratos por 100g e por porção habitual brasileira.
  - Classificação de compatibilidade com a dieta Zero Carb.
  - Alerta de carboidratos ocultos.
  - Substitutos 100% Zero Carb recomendados.
- **RF-15 (Sugestões para os 5 Períodos de Alimentação):** Sugestões contextualizadas de como incluir ou substituir o alimento em:
  1. Café da Manhã
  2. Almoço
  3. Lanche da Tarde
  4. Jantar
  5. Ceia

#### 4.6. Treinos Semanais em Casa com Vídeos em Português
- **RF-16 (Grade Completa Segunda a Domingo):**
  - Segunda: Queima Total & Cardio HIIT em Casa (Zero Equipamentos).
  - Terça: Membros Inferiores & Glúteos Firmes.
  - Quarta: Core, Abdômen Trincado & Postura.
  - Quinta: Braços, Costas & Peitoral (Calistenia Leve).
  - Sexta: Full Body Metabólico Queima-Gordura.
  - Sábado: Mobilidade, Alongamento & Descompressão Articular.
  - Domingo: Caminhada Ativa & Descanso Regenerativo.
- **RF-17 (Vídeos Didáticos em Português):** Aulas em vídeo em língua portuguesa com instruções posturais, dicas de respiração, prevenção de erros e áudio explicativo.
- **RF-18 (Conclusão e Registro):** Botão "Concluir Treino & Abater Calorias" que lança automaticamente a queima calórica no diário.

#### 4.7. Banco de Alimentos Estritamente Zero Carb & Guia de Alimentos Ricos em Carbo
- **Alimentos 100% Zero Carb Permitidos:**
  - Carnes Bovinas: Picanha, Costela, Maminha, Alcatra, Fraldinha, Patinho, Cupim, Contrafilé.
  - Aves: Coxa e Sobrecoxa de Frango, Peito de Frango, Frango a Passarinho, Asinha.
  - Suínos: Panceta, Bacon artesanal sem açúcar, Lombo suíno, Costelinha, Bisteca.
  - Peixes e Frutos do Mar: Salmão, Tilápia, Sardinha, Atum fresco ou em azeite, Camarão.
  - Ovos: Ovo de galinha caipira, ovos de codorna, omeletes simples.
  - Queijos 0g a 1g: Parmesão curado, Queijo Canastra envelhecido, Cheddar autêntico, Gouda.
  - Presunto e Embutidos Zero: Presunto Cru / Parma (apenas carne e sal), Presunto cozido sem amido/açúcar.
  - Verduras Folhosas com traço residual quase nulo: Agrião, Rúcula, Espinafre refogado, Alface.
  - Bebidas: Água mineral, Café preto puro (ou com adoçante estévia/eritritol 100%), Chá verde/camomila sem açúcar.
- **Guia Educativo de Alimentos Ricos em Carboidrato:** Tabela de advertência com os grandes vilões (Pães, Arroz, Batata, Mandioca, Açúcar, Frutas doces, Refrigerantes, Massas) demonstrando os gramas de carboidrato e o impacto na insulina.

#### 4.8. Livro de Mais de 50 Receitas Zero Carb
- Receitas divididas por: Carnes Vermelhas, Aves, Peixes, Ovos, Petiscos & Lanches Salgados.
- Informações completas: Tempo de preparo, Rendimento, Calorias, 0g Net Carbs, Proteínas, Gorduras, Ingredientes e Passo a Passo detalhado.

#### 4.9. Acompanhamento de Peso & Medidas Semanais
- Gráficos de evolução de peso corporal.
- Tabela de medidas antropométricas semanais: Tórax/Peitoral, Cintura, Abdômen, Quadril, Coxa e Braço.
- Comparativo semanal de perda de medidas em centímetros.

#### 4.10. Protocolo Clínico de 30 Dias (Regra de Ouro)
- **Duração Máxima:** O protocolo alimentar Zero Carb estrito pode ser seguido por **no máximo 30 dias consecutivos**.
- **Pausa Obrigatória:** Após os 30 dias de ciclo, é mandatório realizar uma **pausa de no mínimo 30 dias** em dieta de manutenção balanceada com baixo carboidrato (incluindo vegetais e densidade nutricional).
- **Repetição do Ciclo:** O usuário só tem permissão para reiniciar e repetir o protocolo Zero Carb após transcorridos os mais de 30 dias de pausa.
- **Card de Acompanhamento no Dashboard:** Monitora em tempo real "Dia X de 30", barra de progresso, status do ciclo e alerta de pausa obrigatória.

#### 4.11. Galeria de Fotos da Transformação (Antes e Depois)
- Upload de fotos do Antes (início da dieta) e Depois (resultado atual) com compressão inteligente no navegador para rapidez e baixo consumo de dados.
- Registro da data da foto e peso corporal registrado no momento da imagem.
- Comparativo lado a lado com cálculo automático de quilos eliminados entre as fotos.
- Modo de visualização ampliada (zoom modal) e opção de substituição ou remoção segura.

#### 4.12. Painel Administrativo do Gestor (Admin Dashboard)
- Acesso restrito protegido por PIN confidencial (sem exibição de senhas em tela).
- Métricas em tempo real: Total de usuários cadastrados, novos cadastros no dia, total de assinantes VIP, receita mensal estimada (MRR).
- Gerenciamento de status: Liberar acesso Premium vitalício ou bloquear usuários inadimplentes com sincronização no Firestore.

---

### 5. Arquitetura Técnica e Integrações

| Camada | Tecnologia | Propósito |
| :--- | :--- | :--- |
| **Frontend** | React 19 + TypeScript + Tailwind CSS | Interface reativa, responsiva e mobile-first |
| **Componentes e Ícones** | Lucide React + Motion (Framer Motion) | Microinterações fluidas e design clean |
| **Backend API** | Node.js + Express (server.ts) | Proxies seguros para Gemini AI e endpoints de OCR |
| **Banco de Dados** | Google Cloud Firestore | Persistência na nuvem de usuários, logs diários e medidas |
| **Autenticação** | Firebase Authentication + Local Vault | Login com e-mail/senha com contingência offline |
| **Inteligência Artificial** | Google Gemini API (gemini-2.5-flash) | Scanner multimodal de rótulos e consulta de carboidratos |
| **Hospedagem** | Google Cloud Run (Container Docker) | Escalabilidade automática e alta disponibilidade |

---

### 6. Estrutura de Coleções Firestore

```json
{
  "users": {
    "{uid}": {
      "name": "Maria Silva",
      "email": "maria@email.com",
      "whatsapp": "(11) 98765-4321",
      "goal": "emagrecer",
      "currentWeight": 74.0,
      "targetWeight": 64.0,
      "targetNetCarbs": 0,
      "targetCalories": 1550,
      "trialStartDate": "2026-11-02T10:00:00Z",
      "trialEndsAt": "2026-11-09T10:00:00Z",
      "isPremium": true,
      "isSubscribed": true,
      "isOnboarded": true,
      "streakDays": 5
    }
  },
  "dailyLogs": {
    "{uid}_{YYYY-MM-DD}": {
      "userId": "{uid}",
      "date": "2026-11-02",
      "waterIntakeMl": 2000,
      "meals": [
        {
          "id": "m1",
          "name": "Picanha grelhada com sal grosso",
          "type": "almoço",
          "calories": 580,
          "netCarbs": 0,
          "protein": 48,
          "fat": 42,
          "timestamp": "12:30"
        }
      ]
    }
  },
  "weeklyMeasurements": {
    "{measurementId}": {
      "userId": "{uid}",
      "weekLabel": "Semana 1",
      "date": "2026-11-02",
      "weightKg": 73.2,
      "waistCm": 78,
      "abdomenCm": 85
    }
  }
}
```

---

### 7. Matriz de Testes e Garantia de Qualidade (E2E)

Abaixo estão descritas as especificações executáveis e detalhadas de cada fluxo de teste ponta a ponta da aplicação:

#### Login with email and password
- **Descrição:** Autentica com credenciais válidas ou seeded test accounts (`teste@zerocarb.com.br` / `123456`), persiste sessão e fecha o modal imediatamente.
- **Pré-condições:** Modal de autenticação aberto no aplicativo.
- **Passos:**
  1. No modal de autenticação, selecionar a aba "Já Tenho Conta (Login)".
  2. Informar o e-mail cadastrado `teste@zerocarb.com.br` (ou clicar em "Preencher").
  3. Informar a senha `123456`.
  4. Clicar no botão "Entrar na Minha Conta".
- **Esperado:** O modal fecha imediatamente, a sessão é autenticada e o usuário visualiza o dashboard com badge "VIP" ou "7d Grátis".

#### Create a new account with trial access
- **Descrição:** Suporta preenchimento completo com Nome Completo, WhatsApp (com DDD), e-mail e senha, ativando 7 dias de trial gratuito.
- **Pré-condições:** Modal aberto na aba "Cadastrar (7 Dias Grátis)".
- **Passos:**
  1. Informar Nome Completo ("Usuário Teste Zero Carb").
  2. Informar WhatsApp com DDD ("(11) 98765-4321").
  3. Informar e-mail válido ("novo_usuario@zerocarb.com.br").
  4. Informar senha com 6+ caracteres ("senha123").
  5. Clicar em "Criar Minha Conta Grátis".
- **Esperado:** Conta provisionada no Firebase Auth/Firestore, fechamento do modal com toast de sucesso e ativação de 7 dias grátis.

#### Continue onboarding after signup
- **Descrição:** Direciona novos usuários recém-cadastrados (`isOnboarded: false`) para o onboarding guiado em 4 passos.
- **Pré-condições:** Usuário recém-cadastrado em sessão limpa.
- **Passos:**
  1. Concluir o cadastro de novo usuário.
  2. Escolher objetivo no Passo 1 (Emagrecimento).
  3. Informar biometria no Passo 2 (idade, altura, peso atual 75kg, peso meta 68kg).
  4. Escolher limite de carboidrato no Passo 3 (0g Carnívoro Estrito).
  5. Revisar macros calculados no Passo 4 e clicar em "Começar Minha Transformação Agora".
- **Esperado:** Conclusão ordenada dos 4 passos com salvamento do perfil e exibição do dashboard principal.

#### Show login error for invalid credentials
- **Descrição:** Senhas erradas ou e-mails inexistentes mostram mensagem de erro em vermelho e mantêm o modal aberto.
- **Pré-condições:** Modal de login aberto.
- **Passos:**
  1. Inserir e-mail `teste@zerocarb.com.br`.
  2. Inserir senha inválida `wrongpassword`.
  3. Clicar em "Entrar na Minha Conta".
- **Esperado:** Rejeição do login, exibição da mensagem de erro "E-mail ou senha incorretos." e permanência na tela de autenticação.

#### Reach support contact options from the access screen
- **Descrição:** Fornece canais diretos de suporte humano via WhatsApp e e-mail no rodapé do modal de acesso.
- **Pré-condições:** Modal de autenticação visível.
- **Passos:**
  1. Localizar o card "Precisa de ajuda com o cadastro?".
  2. Clicar no botão "WhatsApp (17) 98189-7872".
- **Esperado:** Acionamento do link oficial da API do WhatsApp com mensagem de suporte pré-formatada.

#### Open the signup flow from login
- **Descrição:** Alternância fluida entre login e cadastro através das abas superiores.
- **Pré-condições:** Modal aberto em modo login.
- **Passos:**
  1. Clicar na aba "Cadastrar (7 Dias Grátis)".
  2. Confirmar a exibição dos campos de Nome e WhatsApp.
  3. Clicar na aba "Já Tenho Conta (Login)".
- **Esperado:** Alternância dinâmica de títulos e campos sem erros de renderização.

#### Várias ações
- **Descrição:** Jornada combinada abrangendo adição de refeição, scanner, busca por modalidades de treino e acesso ao perfil/Firebase.
- **Pré-condições:** Usuário autenticado.
- **Passos:**
  1. Acessar "Scanner IA" e selecionar "Presunto Cozido Magro".
  2. Adicionar ao "Almoço" e confirmar mensagem de feedback.
  3. Acessar a aba "Treinos".
  4. Buscar por "Boxe" e depois "Tai Chi", validando as aulas e instruções.
  5. Clicar no ícone de perfil no cabeçalho e verificar o status do Firebase.
- **Esperado:** Sucesso na adição ao diário, localização dos treinos de Boxe e Tai Chi, e exibição do perfil sincronizado com Firestore.

#### Cadastro e edição do perfil
- **Descrição:** Edição de dados cadastrais (nome, whatsapp, peso atual e meta) com persistência em nuvem.
- **Pré-condições:** Usuário logado.
- **Passos:**
  1. Clicar no ícone de perfil (`UserCheck`) no cabeçalho para abrir "Perfil & Integração Firebase".
  2. Alterar o nome para "Joyce Belchior Silva".
  3. Atualizar peso atual para "73.5" e meta para "65.0".
  4. Clicar no botão "Salvar no Firebase".
- **Esperado:** Exibição do toast "Perfil sincronizado com o Firebase com sucesso!" e atualização imediata do documento Firestore `/users/{uid}`.

#### Integração com Firebase
- **Descrição:** Monitoramento em tempo real do status de sincronização com o Google Cloud Firestore.
- **Pré-condições:** Aplicação em execução.
- **Passos:**
  1. Abrir o modal de perfil e verificar o card "Google Cloud Firestore".
  2. Confirmar status "200 OK" e badge "Firebase Firestore Ativo".
  3. Verificar o UID do usuário e o caminho da coleção `/users/{uid}`.
  4. Clicar em "Salvar no Firebase".
- **Esperado:** Conexão 100% ativa com Firestore e persistência de dados bidirecional.

#### Plano alimentar e nutrição
- **Descrição:** Visualização de cardápios de 1200 a 2000 kcal e geração inteligente de refeições por IA.
- **Pré-condições:** Aplicação aberta.
- **Passos:**
  1. Clicar na aba "Cardápios" na barra de navegação inferior.
  2. Selecionar entre 1200, 1500, 1800 ou 2000 kcal/dia na aba "Cardápios Prontos".
  3. Adicionar item ao Diário com o botão "Adicionar este item ao Diário de Hoje".
  4. Alternar para "Gerador de Refeições IA", digitar ingredientes disponíveis e gerar refeição com IA.
- **Esperado:** Cardápios 100% Zero Carb e receita gerada por IA com tempo, modo de preparo e macros.

#### Scanner IA de alimentos
- **Descrição:** Análise por visão computacional de rótulos e consulta de carboidratos com sugestões para 5 períodos do dia.
- **Pré-condições:** Tela principal aberta.
- **Passos:**
  1. Acessar a aba "Scanner IA".
  2. Testar o scanner com o produto de exemplo "Presunto Cozido Magro - Sadia" ou imagem de rótulo.
  3. Conferir o veredito "100% Zero Carb" e ausência de açúcares ocultos.
  4. Alternar para a aba "Consulta IA & Refeições".
  5. Pesquisar por "Filé de Frango Grelhado" ou "Tapioca" e analisar os carboidratos e sugestões para café, almoço, lanche, jantar e ceia.
- **Esperado:** Detecção precisa de carboidratos ocultos, maltodextrina e apresentação de sugestões para os 5 períodos do dia.

#### Histórico e salvamento dos dados
- **Descrição:** Registro de refeições no diário alimentar em texto livre com cálculo de macros e persistência em banco de dados.
- **Pré-condições:** Acesso ao diário.
- **Passos:**
  1. Clicar na aba "Diário" na navegação inferior.
  2. Clicar no botão "Escrever" na refeição desejada (ex: Almoço).
  3. Descrever a refeição em texto livre ou usar atalho "Picanha Grelhada (0g)".
  4. Clicar em "Salvar no Diário".
  5. Verificar a atualização do resumo diário e dos anéis de macronutrientes.
- **Esperado:** Persistência no estado local e salvamento no Firestore via `saveDailyLogToFirestore`.

#### Treinos de Tai Chi e Boxe
- **Descrição:** Pesquisa e execução dos treinos de Boxe em Casa e Tai Chi Chuan com vídeos didáticos em português.
- **Pré-condições:** Acesso à aba Treinos.
- **Passos:**
  1. Clicar na aba "Treinos".
  2. Digitar "Boxe" no campo de busca ou clicar no chip "🥊 Boxe".
  3. Iniciar o treino de Boxe com vídeo em português e cronômetro de rounds.
  4. Digitar "Tai Chi" no campo de busca ou clicar no chip "☯️ Tai Chi".
  5. Iniciar o treino de Tai Chi com orientação postural e respiração.
  6. Clicar no botão "Concluir Treino & Abater Calorias".
- **Esperado:** Ambos os treinos são encontrados, exibem vídeo-aulas em português e abatem as calorias gastas no balanço diário.

---

### 8. Roadmap de Lançamento (Próximas Fases)

- **Fase 1 (Atual - Concluída):** App completo com Scanner IA, Consulta Nutricional, Diário com Anéis, 50+ Receitas 0g, Treinos Semanais em Vídeo PT-BR, Onboarding e Autenticação.
- **Fase 2 (Q1 2027):** Aplicativo PWA instalável com suporte offline e notificações de hidratação push.
- **Fase 3 (Q2 2027):** Integração com Pix automático no checkout da assinatura via gateway Asaas / Mercado Pago.
- **Fase 4 (Q3 2027):** Desafios em comunidade com ranking de perda de medidas e grupos fechados no WhatsApp.
