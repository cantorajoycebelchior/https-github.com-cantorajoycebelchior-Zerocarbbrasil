# Testes de Ponta a Ponta (End-to-End Test Suite)
## Zero Carb Brasil • Especificação Executável dos Fluxos de Usuário

Este documento contém os passos detalhados, pré-condições, ações de interface e asserções esperadas para a execução automatizada da suíte E2E do aplicativo Zero Carb Brasil.

---

### Login with email and password
**Descrição:** Verifica a autenticação bem-sucedida de um usuário existente utilizando e-mail e senha válidos, fechamento do modal e persistência do estado conectado.
**Pré-condições:** Aplicação carregada na tela inicial com o modal de autenticação visível ou aberto pelo botão "Login".
**Passos:**
1. No modal de autenticação, clicar na aba "Já Tenho Conta (Login)".
2. Inserir o e-mail de teste `teste@zerocarb.com.br` no campo de e-mail (ou clicar no botão rápido "Preencher").
3. Inserir a senha `123456` no campo de senha.
4. Clicar no botão "Entrar na Minha Conta".
5. Aguardar a validação e processamento de sessão.
**Esperado:** 
- O modal de autenticação é fechado automaticamente.
- A sessão autenticada é estabelecida e o perfil do usuário é carregado.
- O cabeçalho exibe o status de usuário conectado com badge "VIP" ou "7d Grátis".

---

### Create a new account with trial access
**Descrição:** Valida o cadastro de uma nova conta de usuário com dados determinísticos únicos e concessão imediata de 7 dias de acesso gratuito de teste (Trial).
**Pré-condições:** Modal de cadastro aberto na aba "Cadastrar (7 Dias Grátis)".
**Passos:**
1. Preencher o campo "Nome Completo" com "Usuário Teste Zero Carb".
2. Preencher o campo "WhatsApp (com DDD)" com "(11) 98765-4321".
3. Inserir um e-mail válido `novo_usuario@zerocarb.com.br`.
4. Inserir uma senha com no mínimo 6 caracteres `senha123`.
5. Clicar no botão "Criar Minha Conta Grátis".
**Esperado:**
- A nova conta é provisionada no Firebase Auth e salva na coleção Firestore `/users/{uid}`.
- O modal fecha exibindo toast "Conta criada com sucesso! 7 dias grátis ativados.".
- O usuário recebe 7 dias de acesso irrestrito ao aplicativo.

---

### Continue onboarding after signup
**Descrição:** Garante que um usuário recém-cadastrado seja direcionado para o fluxo guiado de 4 passos de onboarding para configuração de metas nutricionais e biometria.
**Pré-condições:** Conta recém-criada com `isOnboarded: false` a partir de uma sessão limpa.
**Passos:**
1. Concluir o cadastro de um novo usuário.
2. Na abertura do modal de Onboarding, selecionar o objetivo no Passo 1 (ex: "Emagrecimento Rápido").
3. No Passo 2, preencher dados biométricos: gênero, idade (30), altura (170cm), peso atual (75kg) e peso meta (68kg).
4. No Passo 3, selecionar a meta de carboidratos líquidos ("0g Estrito Carnívoro").
5. No Passo 4, verificar o resumo metabólico com cálculo do TDEE e clicar em "Começar Minha Transformação Agora".
**Esperado:**
- O modal de Onboarding avança ordenadamente pelos 4 passos sem sobreposições.
- Ao concluir, o perfil é atualizado no Firestore com `isOnboarded: true` e a tela principal do dashboard é exibida.

---

### Show login error for invalid credentials
**Descrição:** Garante que tentativas de autenticação com senhas incorretas ou e-mails inválidos/inexistentes sejam rejeitadas com mensagem de erro clara, mantendo o usuário na tela de login.
**Pré-condições:** Modal de autenticação aberto na aba "Já Tenho Conta (Login)".
**Passos:**
1. Preencher o campo de e-mail com `teste@zerocarb.com.br`.
2. Preencher o campo de senha com uma credencial incorreta `wrongpassword`.
3. Clicar no botão "Entrar na Minha Conta".
**Esperado:**
- A tentativa de autenticação é rejeitada pelo validador.
- Uma mensagem de alerta vermelha "E-mail ou senha incorretos." é exibida na tela.
- O modal de login permanece visível, sem navegação para a área interna.

---

### Reach support contact options from the access screen
**Descrição:** Confirma que o usuário pode acessar facilmente as opções de suporte humano via WhatsApp ou e-mail a partir da tela de login/cadastro.
**Pré-condições:** Modal de autenticação visível na interface.
**Passos:**
1. Rolar até o bloco inferior "Precisa de ajuda com o cadastro?".
2. Verificar a presença do botão "WhatsApp (17) 98189-7872" e do link de suporte por e-mail.
3. Clicar no botão de WhatsApp para suporte.
**Esperado:**
- O link para a API do WhatsApp `https://wa.me/5517981897872` é acionado com mensagem pré-formatada.
- Os canais de atendimento oficial permanecem disponíveis sem interrupção do app.

---

### Open the signup flow from login
**Descrição:** Verifica a alternância fluida entre as abas de Login e Cadastro sem travamento ou perda de estado dos componentes.
**Pré-condições:** Modal de autenticação aberto na aba "Já Tenho Conta (Login)".
**Passos:**
1. Clicar na aba "Cadastrar (7 Dias Grátis)".
2. Verificar a exibição dos campos adicionais: "Nome Completo" e "WhatsApp (com DDD)".
3. Clicar novamente na aba "Já Tenho Conta (Login)".
**Esperado:**
- A interface alterna dinamicamente o título, subtítulo e campos exibidos.
- Os botões de submissão refletem o modo selecionado ("Criar Minha Conta Grátis" vs "Entrar na Minha Conta").

---

### Várias ações
**Descrição:** Fluxo combinado ponta a ponta validando adição de refeição, consulta no scanner, busca de treinos específicos (Boxe e Tai Chi), e acesso ao perfil/Firebase.
**Pré-condições:** Usuário com sessão iniciada no aplicativo.
**Passos:**
1. Acessar a aba "Scanner IA" e selecionar o produto de exemplo "Presunto Cozido Magro".
2. Clicar no botão "Adicionar ao Diário" escolhendo a refeição "Almoço".
3. Confirmar a notificação "Adicionado ao ALMOÇO com sucesso!".
4. Navegar até a aba "Treinos" na barra inferior.
5. Utilizar o campo de busca de treinos ou os chips de filtro para buscar por "Boxe" e depois "Tai Chi".
6. Confirmar que as fichas de treino de Boxe e Tai Chi são carregadas com vídeos didáticos em português.
7. Clicar no ícone de perfil no cabeçalho para abrir o modal de Perfil e Integração com Firebase.
**Esperado:**
- A refeição é adicionada com sucesso ao diário.
- A busca por Boxe e Tai Chi localiza os treinos com sucesso.
- O modal de perfil e status de conexão com Firebase Firestore é acessado e validado.

---

### Cadastro e edição do perfil
**Descrição:** Validação completa da edição de dados pessoais (nome, whatsapp, peso atual e meta) do usuário com sincronização imediata no banco de dados.
**Pré-condições:** Usuário autenticado na aplicação.
**Passos:**
1. No cabeçalho da aplicação, clicar no botão de perfil (ícone com `UserCheck`).
2. No modal "Perfil & Integração Firebase", localizar os campos editáveis.
3. Modificar o campo "Nome Completo" para um novo valor (ex: "Joyce Belchior Silva").
4. Modificar o campo "Peso Atual (kg)" para "73.5".
5. Modificar o campo "Meta de Peso (kg)" para "65.0".
6. Clicar no botão "Salvar no Firebase".
**Esperado:**
- O sistema exibe o toast de confirmação: "Perfil sincronizado com o Firebase com sucesso!".
- As alterações são persistidas no documento do Firestore `/users/{uid}` e no estado local.
- O cabeçalho passa a exibir o nome atualizado do usuário.

---

### Integração com Firebase
**Descrição:** Validação do status de conectividade em tempo real com o Google Cloud Firestore e persistência de dados no documento `/users/{uid}`.
**Pré-condições:** Aplicação em execução com configuração do projeto Firebase inicializada.
**Passos:**
1. Clicar no botão de perfil no cabeçalho para abrir o modal "Perfil & Integração Firebase".
2. Localizar o cartão de status "Google Cloud Firestore".
3. Verificar a indicação "Status: 200 OK" e badge "Firebase Firestore Ativo".
4. Confirmar a exibição do identificador único (UID) e do caminho da coleção `/users/{uid}`.
5. Clicar no botão "Salvar no Firebase" para disparar uma gravação remota (`setDoc`).
**Esperado:**
- O status de integração do Firebase permanece ativo e funcional com código de sucesso 200.
- A sincronização na nuvem conclui com mensagem de êxito sem exceções de rede.

---

### Plano alimentar e nutrição
**Descrição:** Acesso aos cardápios estruturados estritamente zero carboidrato (1200 a 2000 kcal) e teste do gerador de refeições inteligentes por IA.
**Pré-condições:** Aplicação na tela inicial ou com barra de navegação visível.
**Passos:**
1. Clicar na aba "Cardápios" na barra de navegação inferior.
2. Na aba "Cardápios Prontos", alternar entre os calibres calóricos: "1200", "1500", "1800" e "2000" kcal/dia.
3. Observar as 4 refeições diárias (Café da Manhã, Almoço, Jantar e Lanche/Ceia) com 0g a 5g de carboidratos líquidos.
4. Clicar no botão "Adicionar este item ao Diário de Hoje" em uma das refeições.
5. Clicar na aba superior "Gerador de Refeições IA".
6. Inserir ingredientes permitidos (ex: "Ovos, Peito de Frango, Manteiga") e clicar em "Gerar Refeição com IA".
**Esperado:**
- Os cardápios exibem contagens precisas de macros (0g net carbs) adequadas à cetose.
- O item selecionado é lançado instantaneamente no diário de refeições.
- O gerador de IA retorna uma receita completa com tempo de preparo, ingredientes e passo a passo.

---

### Scanner IA de alimentos
**Descrição:** Reconhecimento multimodal e análise por visão computacional de rótulos, tabelas nutricionais e produtos do mercado brasileiro.
**Pré-condições:** Aplicação na tela principal.
**Passos:**
1. Clicar na aba "Scanner IA" na navegação inferior.
2. Na aba "Scanner com Câmera", selecionar um dos produtos de demonstração do mercado brasileiro (ex: "Presunto Cozido Magro - Sadia" ou "Queijo Prato Fatiado").
3. Aguardar a análise da IA multimodal.
4. Conferir o cartão de resultado com veredito "100% Zero Carb", quantidade de carboidratos líquidos (0g), proteína e calorias.
5. Alternar para a aba "Consulta IA & Refeições".
6. Digitar "Filé de Frango Grelhado" ou clicar em um dos chips de busca rápida e clicar em "Consultar".
7. Verificar a resposta com diagnóstico de carboidratos e sugestões para Café da Manhã, Almoço, Lanche, Jantar e Ceia.
**Esperado:**
- O scanner identifica a presença ou ausência de açúcares ocultos e maltodextrina.
- O veredito binário informa com clareza se o alimento é permitido na dieta Zero Carb.
- A consulta nutricional apresenta orientações para todos os 5 períodos alimentares do dia.

---

### Histórico e salvamento dos dados
**Descrição:** Registro de refeições em texto livre no diário alimentar, estimativa automática de macros e persistência no histórico diário do usuário.
**Pré-condições:** Dashboard aberto.
**Passos:**
1. Clicar na aba "Diário" na navegação inferior.
2. No bloco de uma categoria de refeição (ex: "Almoço"), clicar no botão "Escrever".
3. No modal que se abre, digitar o que consumiu (ex: "200g de picanha grelhada com sal grosso e 1 ovo frito na banha").
4. Clicar em "Estimar Macros com IA" ou selecionar o atalho rápido "Picanha Grelhada (0g)".
5. Clicar no botão "Salvar no Diário".
6. Verificar o resumo diário atualizado com o total de carboidratos líquidos, calorias e número de refeições.
**Esperado:**
- O lançamento é registrado com data, horário e discriminação dos macronutrientes.
- Os anéis de macronutrientes do dashboard refletem o novo consumo.
- O histórico é salvo no armazenamento local e sincronizado no Firestore via `saveDailyLogToFirestore`.

---

### Treinos de Tai Chi e Boxe
**Descrição:** Localização, reprodução de vídeo-aulas didáticas em português e conclusão dos treinos especiais de Boxe Queima Total e Tai Chi Chuan & Equilíbrio Mental.
**Pré-condições:** Navegação na seção de Treinos.
**Passos:**
1. Clicar na aba "Treinos" na barra de navegação inferior.
2. Na barra de busca de treinos, digitar "Boxe" ou clicar no chip com ícone "🥊 Boxe".
3. Confirmar a abertura da sessão "Treino de Boxe em Casa: Queima Intensa & Agilidade".
4. Verificar os exercícios guiados (Jab, Direto, Esquiva, Combos) e clicar no botão de assistir aula em vídeo com áudio em português.
5. Limpar a busca e digitar "Tai Chi" ou clicar no chip com ícone "☯️ Tai Chi".
6. Confirmar a abertura da sessão "Tai Chi Chuan: Serenidade, Postura & Equilíbrio Metabólico".
7. Visualizar as instruções posturais e respiração diafragmática.
8. Clicar no botão "Concluir Treino & Abater Calorias".
**Esperado:**
- Os treinos de Boxe e Tai Chi são encontrados com sucesso pela busca e pelos chips de filtro.
- Ambos os treinos oferecem vídeos didáticos em língua portuguesa e orientação por voz.
- A conclusão do treino registra as calorias gastas e atualiza a contagem semanal de treinos concluídos.
