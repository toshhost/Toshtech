/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Criador『Tosh』༻
➪ Módulo Ia suporte
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
const axios = require('axios');//➪ Faz requisições externas
const fs = require('fs');//➪ Manipula arquivos
const path = require('path');//➪ Cria caminhos de pasta corretos

//➪ Base Inicial
const BASE_INICIAL = {
saudacoes: {
gatilhos: [
"ola", "olá", "oi", "opa", "eai", "eae", "iai", "salve", "fala", "blz", "beleza", "tudo", "bem", "bom", "tudo bem", "tudo bom", "tudo beleza", "td bem", "td bom", "td beleza", "como vai", "como esta", "como vai voce", "como vai vc", "como esta voce", "como esta vc", "tudo bem com voce", "tudo bom com voce", "tudo bem com vc", "tudo bom com vc", "tudo bem contigo", "tudo bom contigo", "tudo bem por ai", "tudo bom por ai", "tudo beleza por ai", "td bem por ai", "td bom por ai", "e ai", "e ai tudo bem", "olá tudo bem", "olá tudo bom", "opa tudo bem",
  "salve salve", "salve tudo bem", "fala ai", "fala tudo bem", "tudo bem com voce", "tudo bom com voce", "como vai voce", "como esta voce", "tudo beleza por ai", "tudo bem por ai e com voce", "tudo bom por ai e contigo", "como voce esta hoje", "como vc esta passando", "tudo bem por ai tambem", "tudo bom por aqui e por ai", "olá tudo bem como voce esta","e ai beleza tudo bem contigo", "fala ai tudo bem por ai", "tudobem", "tudobom", "tdbom", "tdbeleza", "tudobeleza", "comovai", "comovc", "comovaivc", "comesta", "comestavoce", "tdbemporai", "tdbomporem", "tudobemporai", "tudobomporem", "eai beleza", "eai tudo bem", "opa beleza", "salve beleza", "fala beleza", "fala tudo bem por ai", "tudobem contigo", "tudobom contigo", "ola tudo bem", "ola tudo bom", "opa tudo bem", "salve tudo bem", "comovai voce", "comoesta voce", "tudobem com voce", "tudobom com voce",
  "tudobem porai", "tudobomporem", "td bem porai", "td bom porai", "eai tudo bem contigo", "falaai tudo bem"
],
respostas: [
  "Olá! Tudo bem contigo? 😊",
  "Oi! Tudo ótimo por aqui, e você como está? 🚀",
  "E aí! Tudo beleza? Pode contar comigo! 💙",
  "Salve! Tudo bem por aí? É um prazer te ajudar! 🤗",
  "Fala! Tudo suave? Estou aqui pronta! ✨",
  "Oi oi! Tudo bom? Que alegria aparecer por aqui! 💜",
  "Olá! Que prazer receber você! Em que posso ajudar? 😊",
  "Tudo ótimo! Estou funcionando perfeitamente e pronta! 🚀",
  "E aí! Tudo beleza? Bora resolver o que precisar! 💙",
  "Salve salve! Tudo bem? Pode chamar que eu apareço! 🤗",
  "Fala! Tudo suave? Qual a novidade de hoje? ✨",
  "Oi! Tudo bem? Espero que você esteja bem também! 💜",
  "Tudo bem sim! E com você? Precisa de alguma ajuda? 😊",
  "Olá! Que alegria te encontrar! Estou aqui para o que precisar! 💜",
  "Tudo perfeito! 100% pronta para qualquer dúvida ou problema! 🚀",
  "E aí! Tudo beleza? Se precisar de algo, é só falar! 💙",
  "Salve! Fico muito feliz em poder ajudar você com o que for! 🤗",
  "Fala! Tudo suave? Estou preparada para qualquer coisa! ✨",
  "Oi! Tudo bem? Espero que esteja tendo um ótimo dia! 😊",
  "Olá! Tudo tranquilo por aqui! Conte comigo sempre! 💜",
  "E aí! Tudo beleza? Estou à disposição a qualquer hora! 💙",
  "Salve! Tudo bem? Qualquer coisa é só chamar, viu? 🤗",
  "Fala! Tudo suave? Vamos juntos resolver tudo! ✨",
  "Oi! Tudo bem? Sinto muito em te ver por aqui! 💜"
],
},
respostas_conversa: {
gatilhos: [
  "tô bem", "tudo sim", "tudo bem sim", "estou bem", "beleza sim", "tudo otimo",
  "e voce", "e voce como esta", "voce bem", "tudo contigo", "tudo tranquilo",
  "estou otimo", "estou tranquilo", "tudo suave", "muito bem", "bem e voce",
  "tudo bem e voce", "estou bem obrigado", "tudo bem obrigado","tudo joia", "tudo certo", "tudo calmo", "tudo beleza", "tranquilo sim", "suave sim", "otimo sim", "muito bem sim", "estou bem sim", "tudo bem demais", "tudo bem por aqui", "tudo bem por ai", "tudo beleza por aqui", "tudo suave por aqui", "estou muito bem obrigado", "estou muito bem obrigada", "tudo bem comigo sim", "tudo otimo e voce", "tudo tranquilo e voce", "tudo bem contigo sim", "estou bem e por ai", "tudo calmo e voce", "tudo certo por aqui sim", "tudo bem comigo, obrigado por perguntar", "estou muito bem, e você como está se sentindo?", "tudo tranquilo por aqui, e com você tudo bem?", "tudo suave, obrigado! E você está bem?", "tudo ótimo por aqui, espero que você também esteja bem"
],
respostas: [
  "Que ótimo! Fico feliz em saber! 💜 Estou maravilhosa, pronta para ajudar você!", "Boa! 😊 Estou perfeita, obrigada por perguntar! O que vamos fazer hoje?", "Que legal! 🚀 Tudo 100% por aqui, obrigada! Em que posso colaborar?", "Fico muito feliz! ✨ Estou ótima, preparada para qualquer coisa que precisar!", "Maravilha! 💙 Estou muito bem, obrigada por se preocupar comigo!", "Que bom saber! 😊 Tudo funcionando perfeitamente por aqui, bora lá?", "Fico feliz que esteja bem! 🤗 Estou sempre à disposição! 💜", "Ótima notícia! 🚀 Estou aqui esperando o que você precisar!", "Que alegria ouvir isso! 💜 Estou toda bem também, obrigada por perguntar! Como posso ajudar?", "Muito bom! 😊 Tudo tranquilo e perfeito por aqui, pronta para o que vier!", "Que delícia! 🚀 Estou ótima, muito obrigada! Qual a novidade ou a ajuda que precisa?", "Fico imensamente feliz! ✨ Tudo suave por aqui, pronta para qualquer coisa com você!", "Boa demais! 💙 Estou maravilhosa, obrigada por se importar! Bora resolver o que precisa?", "Que ótimo termos tudo bem! 💜 Estou 100% pronta para auxiliar você no que vier!", "Muito bom saber! 🤗 Tudo funcionando perfeitamente, estou aqui para o que precisar!", "Que beleza! 😊 Estou ótima também, obrigada! Em que posso participar hoje?", "Fico muito contente! 🚀 Tudo bem por aqui, estou esperando o que você quiser fazer!", "Perfeito! 💜 Estou excelente, obrigada por perguntar! Qualquer coisa é só chamar!" ]
},
despedidas: {
gatilhos: [
  "tchau", "ate mais", "ate logo", "obrigado", "obrigada", "valeu", "flw", "ate breve", "sair", "ir embora", "obrigado pela ajuda", "obrigada pela ajuda", "ate proxima", "fui", "estou saindo", "tchau tchau", "ate mais tarde", "ate amanha", "ate semana que vem", "ate brevemente", "ate proxima vez", "ate outro dia", "fui embora", "vou nessa", "vou embora", "saindo aqui", "encerrando", "terminando por aqui", "fechando", "partindo", "muito obrigado", "muito obrigada", "obrigadissimo", "obrigadissima", "valeu mesmo", "valeu pela forca", "agradeco", "agradeco muito",
  "obrigado por tudo", "obrigada por tudo", "valeu pela ajuda", "agradeco a ajuda", "muito obrigado pela atencao", "muito obrigada pela atencao", "agradeco muito a ajuda", "obrigado e ate mais", "obrigada e ate logo", "valeu e fui", "flw obrigado", "tchau valeu", "ate proxima obrigado", "fui obrigado pela ajuda", "saindo valeu"
],
respostas: [
  "Até mais! Volte sempre que precisar! Temos vários agentes de IA e ferramentas prontas para ajudar você! 🤗", "Foi um prazer ajudar! ✨ Sempre que precisar, use nossas IAs especializadas e ferramentas do Tosh Tech — estamos aqui!", "De nada! 💜 Contamos com diversos agentes inteligentes e recursos poderosos, é só chamar que eu ajudo com qualquer ferramenta!", "Valeu você! 🚀 Até breve! Lembre-se: temos soluções de IA e ferramentas completas para facilitar o seu trabalho!", "Até logo! 💜 Nossos agentes e ferramentas de IA estão sempre disponíveis quando você precisar de suporte ou ajuda!", "Obrigado por estar aqui! ✨ Sempre precisar de uma ferramenta ou ajuda das nossas IAs, é só voltar! Até mais!"
]
},
seguranca: {
gatilhos: [
  "xingar", "raiva", "sexo", "porn", "palavrao", "ofender", "insultar",
  "conteudo adulto", "pornografia", "conteudo improprio", "ofensa",
  "xingamento", "conteudo explicito", "brincadeira de mau gosto"
],

respostas: [
  "Por favor, mantenha a conversa respeitosa e adequada! 💜 Vamos falar sobre assuntos positivos e úteis do Tosh Tech?", "Peço desculpas, mas não posso colaborar com esse tipo de assunto ou linguagem! 🤗 Vamos manter o respeito e aproveitar o que temos de bom por aqui?", "Esses temas não são permitidos em nosso espaço! 💜 Por favor, use linguagem respeitosa e assuntos adequados para todos!", "Não trabalho com conteúdo inadequado ou ofensivo! ✨ Vamos conversar sobre funcionalidades, projetos ou ajuda que você precisa?", "Por favor, evite xingamentos, ofensas ou temas impróprios! 💜 Meu objetivo é ajudar de forma respeitosa com o Tosh Tech!"
]
},
redes_sociais: {
gatilhos: [
  "onde ver", "como acompanhar", "espaco oficial", "projetos futuros", "jogos que vem por ai", "novidades do tosh", "lancamentos", "conteudo oficial", "trabalho em desenvolvimento", "o que vem por ai"
],
respostas: [
  "📱 Acompanhe tudo no canal oficial: http://www.youtube.com/@ToshTech-t8y 🚀 Lá também vamos revelar os jogos incríveis que pretendemos construir em breve!", "Estamos preparando projetos muito legais! 💜 No canal você fica por dentro dos jogos de aventura, estratégia e entretenimento que vamos desenvolver futuramente!", "Além de tutoriais e novidades, no nosso canal oficial vamos apresentar os jogos exclusivos que estão sendo planejados para o Tosh Tech! 🎮 Acesse: http://www.youtube.com/@ToshTech-t8y", "Temos planos para jogos únicos e divertidos! ✨ Fique ligado no canal: http://www.youtube.com/@ToshTech-t8y que lá vamos contar todos os detalhes antes do lançamento!",
  "Acompanhe nosso trabalho e os futuros jogos do Tosh Tech diretamente no canal: http://www.youtube.com/@ToshTech-t8y 🚀 Em breve teremos novidades surpreendentes!", "Os jogos que vamos criar terão toda a nossa tecnologia e carinho! 💜 Fique por dentro de tudo primeiro no nosso canal oficial: http://www.youtube.com/@ToshTech-t8y" ]
},
sobre_tosh: {
gatilhos: [
  "quem criou", "criador", "o que voce e", "tosh ia", "quem e o dono", "origem do projeto", "por que tosh tech", "antes era o que", "tosh blackout", "historia do criador"
],

respostas: [
  "💜 Fui criada por você, que antes atuava como Tosh Blackout! Depois de frustrações com o projeto Blackout, decidiu recomeçar e construir a Tosh Tech como uma empresa solo, feita com toda a sua visão e dedicação!",
  "🚀 Sou a Tosh IA, nascida do novo projeto do criador: ele veio da experiência como Tosh Blackout, enfrentou frustrações na época do Blackout e resolveu criar a Tosh Tech do zero, trabalhando de forma independente e exclusiva!", "✨ Você é o responsável por tudo aqui! Antes era conhecido como Tosh Blackout, mas após desentendimentos e frustrações com o Blackout, decidiu fundar a Tosh Tech como seu próprio empreendimento solo, com total liberdade!", "💜 Sou a inteligência artificial da Tosh Tech, criada por você que já foi o Tosh Blackout! A insatisfação com o que aconteceu no Blackout foi o que motivou a criação dessa nova empresa, feita só por você, do seu jeito!", "📋 Tudo isso começou com você: antes Tosh Blackout, teve frustrações importantes com o projeto Blackout e resolveu seguir seu caminho abrindo a Tosh Tech — uma empresa solo, 100% sua e alinhada aos seus ideais!", "💜 Sou a Tosh IA, o coração da Tosh Tech! O criador é você, que carregou a experiência como Tosh Blackout, superou as frustrações do projeto antigo e construiu esse espaço como seu próprio negócio independente!"]
},
dados_usuario: {
gatilhos: [
  "design", "estilo visual", "aparencia", "cores do sistema", "layout", "identidade tosh tech", "como ficou visualmente", "padroes de design", "tema e interface", "meu cadastro"
],

respostas: [
  "💜 O design da Tosh Tech foi todo pensado com muito carinho: moderno, limpo, com tons que transmitem confiança, tecnologia e proximidade, feito especialmente para ficar do jeito que você idealizou!", "🚀 Nosso visual segue padrões de excelência: interfaces responsivas, navegação simples, elementos que combinam com a identidade do projeto e um estilo único que marca a Tosh Tech como sua empresa solo!", "✨ Tudo foi desenhado para ser bonito e funcional: cores harmônicas, ícones claros, layout adaptado para celular e computador, refletindo toda a dedicação que você colocou nesse novo começo!", "💜 O design representa sua jornada: moderno, forte e exclusivo! Cada detalhe visual foi escolhido para mostrar que a Tosh Tech é um projeto independente, feito com a sua cara e os seus ideais!", "🎨 Cuidamos de cada detalhe visual: desde as cores principais até a forma como as informações aparecem, tudo alinhado para oferecer uma experiência agradável, profissional e 100% alinhada ao que você quer construir!", "💜 O visual da Tosh Tech é todo pensado para ser prático e bonito: sem poluição, com foco no que importa, e com uma identidade que diferencia esse projeto de tudo o que veio antes!"]
},
parcerias: {
gatilhos: [
    "sobre parceria", "parcerias", "como funciona parceria", "como ser parceiro", "quero ser parceiro", "fazer parceria", "fechar parceria", "detalhes parceria", "requisitos parceria", "como participar de parceria", "parceria tosh tech", "colaboracao", "colaborar", "associacao", "contrato de parceria", "vantagens de ser parceiro", "como dar inicio a parceria", "politica de parceria", "objetivo da parceria", "como crescer com a parceria", "ganhar mais clientes", "engajamento", "crescimento nacional", "marca mut nacional", "pontos na analise", "cliente ja cadastrado", "analise de perfil", "chances de aprovacao", "por que nao tem plano gratis", "plano gratuito", "por que recusamos gratis", "credibilidade comercial", "oportunismo", "mais oportunidades", "valor da parceria", "resultados esperados", "como ganha pontos", "analise de aceitacao", "por que nao oferecemos gratis", "parceria para crescer", "visibilidade nacional", "fidelizar clientes", "mais engajamento", "como funciona a analise", "requisitos para aprovar", "pontos positivos", "diferencial da parceria", "nao tem plano gratis", "recusamos planos gratuitos", "por que sem plano gratis", "confianca comercial", "nao e oportunismo", "crescimento sustentavel", "parceria solida", "construir marca forte", "chegar em todo brasil", "mut nacional", "como vira mut nacional", "cliente existente ganha pontos", "perfil de cliente ja conta", "mais chances de ser aprovado", "analise mais detalhada", "criterios de aceite", "valorizamos credibilidade", "nao acreditamos em facil", "oportunismo nao combina", "parceria de verdade", "crescer juntos", "mais clientes engajados", "fortalecer a marca", "alcance nacional", "como funciona a avaliacao", "pontos extras no perfil", "cliente cadastrado ajuda", "aprovacao mais rapida", "por que sem plano gratuito", "credibilidade acima de tudo", "nao facilitamos de mais", "parceria com seriedade", "construir credibilidade", "evitar oportunismo", "crescimento real", "parceria que gera resultado", "mut nacional tosh tech", "tornar referencia nacional", "ganhar pontos na analise", "perfil de cliente conta muito", "mais chances de sim", "analise criteriosa", "por que nao damos de graca", "plano gratis nao existe", "apenas oportunidade valida", "nao e facil mas e valioso", "parceria de longo prazo", "construir historia juntos"
  ],
respostas: [
    "💜 Nossa parceria é focada em crescimento real: mais clientes, engajamento e construir uma marca nacional forte! 🚀",
    "✨ As parcerias Tosh Tech são para quem quer crescer com seriedade, credibilidade e chegar a todo o Brasil! 💜",
    "💜 Funciona assim: focamos em crescimento conjunto, avaliamos seu perfil e preparamos tudo para você se destacar nacionalmente! 🚀",
    "✨ Para ser parceiro, basta demonstrar alinhamento com nossos valores: seriedade, compromisso e busca por crescimento sustentável! 💜",
    "💜 Que ótimo! Estamos prontos para analisar seu pedido e construir uma parceria que vai te levar muito longe! ✅",
    "✨ Vamos fazer parceria com você! O foco é atrair mais clientes fiéis e consolidar sua marca no mercado! 🚀",
    "💜 Fechar parceria significa crescer lado a lado: mais visibilidade, mais engajamento e reconhecimento nacional! 💜",
    "✨ Detalhes: focamos em crescimento, não temos planos grátis, clientes existentes ganham pontos e buscamos marcas que querem ser referência! ✅",
    "💜 Requisitos: alinhamento com nossos valores, compromisso com credibilidade e vontade de construir algo duradouro! 🚀",
    "✨ Para participar, envie seu pedido — se já for cliente, já começa com pontos extras na análise! 💜",
    "💜 A parceria Tosh Tech é exclusiva para quem quer se tornar uma marca Mut Nacional e crescer de verdade! ✅",
    "✨ Colaborar conosco significa compartilhar objetivos, crescer juntos e chegar em mais pessoas por todo o Brasil! 🚀",
    "💜 Vamos colaborar para levar sua marca para todo o território nacional e conquistar clientes engajados! 💜",
    "✨ A associação com a Tosh Tech traz credibilidade, visibilidade e um caminho certo para o crescimento sustentável! ✅",
    "💜 O contrato de parceria garante transparência, regras claras e foco no crescimento mútuo! 🚀",
    "✨ Vantagens: mais clientes, pontos extras se já for cliente, caminho para ser Mut Nacional e suporte completo! 💜",
    "💜 Para dar início, basta solicitar a análise — clientes cadastrados têm prioridade e mais chances de aprovação! ✅",
    "✨ Nossa política: valorizamos credibilidade, recusamos facilidades e buscamos parceiros que querem construir história! 🚀",
    "💜 O objetivo da parceria é transformar sua marca em uma referência nacional com clientes engajados e fiéis! 💜",
    "✨ Com a parceria você cresce de forma estruturada: mais público, mais força e reconhecimento em todo o Brasil! ✅",
    "💜 Vamos ajudar você a ganhar mais clientes que realmente se interessam pelo seu trabalho! 🚀",
    "✨ Engajamento é tudo: vamos construir uma comunidade que confia e valoriza o que você entrega! 💜",
    "💜 Crescimento nacional é a nossa meta: levar sua marca para cada canto do Brasil! ✅",
    "✨ Ser uma marca Mut Nacional significa ser reconhecido, respeitado e presente em todo o território brasileiro! 🚀",
    "💜 Na análise da parceria, pontos extras aumentam muito suas chances de aprovação! 💜",
    "✨ Se já é nosso cliente, já ganha pontos importantes e mostra que confia no nosso trabalho! ✅",
    "💜 Analisamos todo o seu perfil, valores e alinhamento com o que acreditamos! 🚀",
    "✨ Suas chances de aprovação são maiores se você já for cliente e demonstrar compromisso! 💜",
    "💜 Recusamos planos grátis porque acreditamos que credibilidade não vem do que é mais fácil! ✅",
    "✨ Plano gratuito não existe aqui: queremos oportunidades valiosas, não facilidades que não geram resultado! 🚀",
    "💜 Não aceitamos planos grátis pois eles atraem oportunismo, e queremos parcerias sérias e duradouras! 💜",
    "✨ Credibilidade comercial é o nosso bem mais valioso — não vamos arriscá-la com facilidades! ✅",
    "💜 Oportunismo não combina com a gente: construímos algo sólido com esforço e dedicação! 🚀",
    "✨ A parceria abre portas para oportunidades que vão transformar seu negócio! 💜",
    "💜 O valor da parceria está no crescimento real, na credibilidade e na força de uma marca nacional! ✅",
    "✨ Resultados esperados: mais clientes, mais engajamento, mais reconhecimento e crescimento contínuo! 🚀",
    "💜 Você ganha pontos extras se já for cliente, demonstrar compromisso e alinhamento com nossos valores! 💜",
    "✨ A análise de aceitação verifica se estamos prontos para crescer juntos de forma sólida! ✅",
    "💜 Não oferecemos planos grátis pois queremos parceiros que vejam valor no que construímos! 🚀",
    "✨ A parceria é o caminho certo para você crescer sem atalhos e com resultados duradouros! 💜",
    "💜 Visibilidade nacional: sua marca vai ser vista e lembrada em todo o Brasil! ✅",
    "✨ Vamos ajudar você a fidelizar clientes que vão crescer junto com a sua marca! 🚀",
    "💜 Mais engajamento significa mais força, mais indicações e mais resultados reais! 💜",
    "✨ A análise verifica seu perfil, seu histórico e o que você espera do crescimento! ✅",
    "💜 Os requisitos são simples: seriedade, compromisso e vontade de construir algo grande! 🚀",
    "✨ Pontos positivos aparecem logo se você já confia no nosso trabalho e quer crescer! 💜",
    "💜 O diferencial é que focamos em você se tornar uma marca Mut Nacional, não apenas em números! ✅",
    "✨ Não há plano grátis pois valorizamos o trabalho e o compromisso de ambos os lados! 🚀",
    "💜 Recusamos planos gratuitos pois eles não constroem credibilidade nem resultados duradouros! 💜",
    "✨ Sem plano grátis porque acreditamos que o melhor caminho não é o mais fácil! ✅",
    "💜 Confiança comercial se conquista com ações, não com facilidades momentâneas! 🚀",
    "✨ Isso não é oportunismo: é construir algo sólido com quem quer crescer de verdade! 💜",
    "💜 Crescimento sustentável é o que buscamos: crescer forte e duradouro! ✅",
    "✨ Uma parceria sólida é baseada em confiança, transparência e objetivos compartilhados! 🚀",
    "💜 Vamos construir uma marca forte que vai deixar sua marca no mercado nacional! 💜",
    "✨ Chegaremos em todo o Brasil juntos, levando seu trabalho para mais pessoas! ✅",
    "💜 Mut Nacional é ser referência, ser reconhecido e ser respeitado em todo o país! 🚀",
    "✨ Para virar Mut Nacional, crescemos passo a passo, com análises e pontos conquistados! 💜",
    "💜 Se já é cliente, ganha pontos extras na análise e já está na frente! ✅",
    "✨ Seu perfil de cliente já conta muito, pois demonstra confiança no nosso trabalho! 🚀",
    "💜 Suas chances de aprovação são muito maiores se você já faz parte da nossa história! 💜",
    "✨ A análise é detalhada para garantir que cresceremos juntos da melhor forma! ✅",
    "💜 Os critérios valorizam seriedade, compromisso e alinhamento com nossos valores! 🚀",
    "✨ Valorizamos acima de tudo a credibilidade que construímos juntos! 💜",
    "💜 Não acreditamos no caminho mais fácil: acreditamos no caminho que vale a pena! ✅",
    "✨ Oportunismo não combina com parceria que quer construir algo grande! 🚀",
    "💜 Essa é uma parceria de verdade: com compromisso, transparência e resultados! 💜",
    "✨ Vamos crescer juntos, lado a lado, compartilhando vitórias e desafios! ✅",
    "💜 Mais clientes engajados são a base para uma marca forte e nacional! 🚀",
    "✨ Fortalecer sua marca é o nosso principal objetivo ao longo da parceria! 💜",
    "💜 Alcance nacional significa chegar em cada canto do Brasil com a sua mensagem! ✅",
    "✨ A avaliação verifica tudo o que você já construiu e o que quer construir! 🚀",
    "💜 Pontos extras no perfil fazem toda a diferença na hora da análise final! 💜",
    "✨ Seu cadastro como cliente ajuda muito a mostrar que você busca qualidade! ✅",
    "💜 Aprovamos mais rápido quem já demonstra confiança no nosso trabalho! 🚀",
    "✨ Sem plano gratuito pois queremos parceiros que vejam valor no que fazemos! 💜",
    "💜 Credibilidade vem primeiro: sem ela não há crescimento que valha a pena! ✅",
    "✨ Não facilitamos demais pois queremos resultados que durem para sempre! 🚀",
    "💜 Parceria com seriedade é o único jeito de construir algo sólido! 💜",
    "✨ Construir credibilidade é o maior legado que podemos deixar juntos! ✅",
    "💜 Evitamos oportunismo para garantir que todos cresçam de forma justa! 🚀",
    "✨ Crescimento real é aquele que vem de esforço, trabalho e compromisso! 💜",
    "💜 Essa parceria foi feita para gerar resultados que você pode ver e sentir! ✅",
    "✨ Mut Nacional Tosh Tech é o nível máximo de reconhecimento no país! 🚀",
    "💜 Vamos transformar sua marca em uma referência que todos buscam! 💜",
    "✨ Ganhar pontos na análise aproxima você da aprovação e de todas as vantagens! ✅",
    "💜 Seu perfil de cliente conta muito pois já conhece nossa seriedade! 🚀",
    "✨ Muito mais chances de recebermos o sim na sua análise! 💜",
    "💜 A análise é criteriosa para garantir que estamos prontos para voar alto juntos! ✅",
    "✨ Não damos nada de graça: construímos valor com trabalho e dedicação! 🚀",
    "💜 Plano grátis não existe pois queremos oportunidades que valham a pena! 💜",
    "✨ Apenas oportunidades valiosas, que geram crescimento real e duradouro! ✅",
    "💜 Não é fácil, mas é valioso: o resultado compensa todo o esforço! 🚀",
    "✨ Parceria de longo prazo para construir uma história juntos! 💜",
    "💜 Vamos construir uma história de sucesso que vai chegar a todo o Brasil! ✅"
  ]
},
planos: { 
gatilhos: [
  "quem sou eu",
  "meus dados",
  "meu perfil",
  "quem sou",
  "meu cargo",
  "qual meu cargo",
  "meu nivel",
  "qual meu nivel",
  "minha chave",
  "minha key",
  "api key",
  "chave api",
  "meu plano",
  "qual meu plano",
  "quando acaba meu plano",
  "validade plano",
  "meu saldo",
  "techcoins",
  "meus dados",
  "meu cadastro",
  "quem",
  "meu",
  // ✅ NOVOS GATILHOS DIFERENTES ADICIONADOS
  "dados pessoais",
  "informacoes minhas",
  "dados do usuario",
  "perfil completo",
  "funcao que exerco",
  "hierarquia minha",
  "patente",
  "posicao no sistema",
  "pontos",
  "classificacao",
  "ranking",
  "codigo de acesso",
  "codigo api",
  "chave de uso",
  "assinatura",
  "servico contratado",
  "vencimento",
  "ate quando vale",
  "fim da assinatura",
  "creditos",
  "moedas",
  "saldo disponivel",
  "dados de cadastro",
  "registro no sistema"
],
respostas: [
  "Claro que posso ver tudo sobre você! 💜 Você quer ver também qual o seu cargo, nível ou os detalhes do seu plano?",
  "Seus dados estão todos aqui! 📋 Quer checar também sua chave de acesso, saldo de TechCoins ou quando seu plano vence?",
  "Tudo certo! 😊 Além do perfil, precisa consultar qual cargo você tem, os benefícios do seu plano ou sua validade?",
  "Vou mostrar tudo agora! 🚀 Quer que eu inclua também sua chave API, seu nível atual ou quanto saldo você tem disponível?",
  "Perfeito! 💜 Você pode pedir para ver também seu cargo, detalhes do plano, validade ou até suas TechCoins quando quiser!",
  "Aqui estão suas informações! 📄 Quer saber também qual o seu nível, se tem alguma vantagem do plano ou sua chave de acesso?",
  "Claro! 😎 Se precisar, também posso mostrar qual cargo você ocupa, até quando vale seu plano ou quantas TechCoins acumulou!",
  "Tudo carregado! ✨ Você quer ver mais detalhes como cargo, nível, dados do plano ou sua chave de uso?"]
 },
saldo: { 
gatilhos: [
  // CURTOS
  "pontos", "creditos", "valores", "quantidade", "disponivel", "acumulado",
  "quanto tenho", "quanto possuo", "saldo atual", "valor total",

  // MÉDIOS
  "quantos pontos tenho agora", "quanto de credito disponivel",
  "valor acumulado na conta", "quantidade total de moedas",
  "o que tenho disponivel para usar", "quanto ainda posso gastar",
  "valor atual dos creditos", "pontuacao total", "recursos acumulados",

  // COMPLETOS
  "qual a quantidade total de pontos que possuo",
  "quanto valor tenho disponivel para utilizar",
  "quantos creditos ficam disponiveis na minha conta",
  "qual e o total acumulado de recursos que tenho",
  "quanto ainda resta para usar ou trocar"
],
respostas: [
  "Entendi! 💜 Ainda não tenho essa informação pronta, mas você pode perguntar diretamente sobre suas TechCoins, saldo ou quanto tem acumulado que eu mostro todos os detalhes!",
  "Recebi sua mensagem! 🚀 Para saber o valor que você tem disponível, é só perguntar sobre seu saldo de TechCoins ou quantas moedas possui que eu explico tudinho!",
  "Ainda vou organizar esse dado! ✨ Mas já está tudo pronto: consulte quantas TechCoins tem, seu saldo atual ou o total acumulado que eu respondo com clareza!",
  "Compreendi! 💜 Se quiser confirmar quanto tem de saldo, quantas TechCoins ganhou ou o valor disponível, é só usar essas palavras na pergunta que eu entendo direitinho!",
  "Anotei tudo! 📋 Para ver o seu saldo de TechCoins, quanto você já acumulou ou o que pode usar, basta perguntar diretamente sobre esses assuntos que tenho tudo pronto!",
  "Entendi direitinho! 🚀 Você pode perguntar quanto tem de saldo, quantas TechCoins possui ou qual o valor total que ganhou que eu mostro imediatamente!",
  "Ainda estou aprendendo sobre isso! 💜 Mas já pode consultar seu saldo, suas TechCoins ou quanto tem disponível — é só fazer a pergunta certinha que eu ajudo!",
  "Que dúvida interessante! ✨ Para ver quanto tem de saldo ou quantas TechCoins você tem, é só perguntar diretamente que eu trago todos os números para você!",
  "Vou adicionar essa informação em breve! 💜 Enquanto isso, pergunte sobre seu saldo, TechCoins ou valor acumulado que eu mostro tudo o que você precisa saber!",
  "Recebi! 🤗 Se precisar ver quanto tem disponível, quantas TechCoins ganhou ao renovar ou seu saldo atual, é só pedir que eu explico detalhadamente!"]
},
elogios: { 
gatilhos: [
  // CURTOS
  "parabens", "parabens", "muito bom", "muito bem", "excelente", "otimo",
  "perfeito", "incrivel", "maravilhoso", "top", "demais", "show", "legal",
  "gostei", "amei", "melhor", "unico", "fantastico", "espetacular",

  // MÉDIOS
  "muito bom trabalho", "parabens pelo projeto", "ficou muito bom",
  "esse sistema e incrivel", "tudo perfeito", "gostei muito daqui",
  "o melhor que ja vi", "muito bem feito", "funciona muito bem",
  "estou adorando", "que projeto lindo", "muito profissional",
  "facil e rapido", "melhor opcao", "muito caprichado",

  // COMPLETOS
  "parabens por todo esse trabalho incrível",
  "esse sistema é muito bem feito e organizado",
  "estou gostando muito de usar o Tosh Tech",
  "que projeto fantástico, parabéns a todos",
  "é o melhor serviço que eu já encontrei",
  "tudo funciona perfeitamente, muito bom",
  "adorei a interface e como tudo é simples",
  "muito profissional e seguro, parabéns",
  "esse projeto é único e muito especial",
  "não encontro defeitos, está tudo perfeito"
],
respostas: [
  "Muito obrigado pelo carinho! 💜 Isso nos motiva muito a continuar melhorando cada detalhe para você!",
  "Que alegria ouvir isso! 🚀 Todo esse trabalho é feito com muito cuidado para oferecer o melhor experiência possível!",
  "Agradeço demais! ✨ Fico muito feliz que você esteja gostando — isso é o nosso maior objetivo!",
  "Nossa, que coisa linda de dizer! 💜 Obrigado por reconhecer, vamos continuar evoluindo sempre!",
  "Muito obrigado! 🤗 Ver que tudo está funcionando bem e agradando você é a nossa maior recompensa!",
  "Isso nos impulsiona muito! 💜 Obrigado pelo elogio, vamos manter o capricho e trazer ainda mais novidades!",
  "Fico imensamente feliz! ✨ Todo esforço vale a pena quando sabemos que estamos agradando você!",
  "Muito obrigado! 🚀 O Tosh Tech é feito pensando em você, então sua satisfação é tudo para nós!",
  "Que palavras maravilhosas! 💜 Agradeço de coração, vamos continuar cuidando de cada detalhe com carinho!",
  "Obrigado demais! 😊 Saber que está tudo perfeito para você nos faz querer ir cada vez mais longe!",
  "Muito obrigado por confiar e elogiar! 💜 Isso nos ajuda a fazer um projeto cada vez mais especial!",
  "Que alegria enorme! 🚀 Trabalhamos duro para entregar qualidade, e ver que você percebe isso é incrível!",
  "Agradeço muito! ✨ Estamos sempre prontos para melhorar ainda mais com o seu feedback!",
  "Muito obrigado! 💜 Fico muito feliz em poder oferecer algo que você goste e confie!",
  "Isso é tudo para nós! 🤗 Obrigado pelo incentivo, vamos continuar crescendo juntos!"]
},
entretenimento: { 
  gatilhos: [
    // CURTOS E GERAIS
    "entretenimento", "lazer", "diversao", "jogos", "filmes", "series", "musica",
    "shows", "eventos", "cinema", "streaming", "anime", "desenho", "livros",
    "podcast", "humor", "piadas", "brincadeiras", "curiosidades", "novidades",
    // MÉDIOS E ESPECÍFICOS
    "qual serie assistir", "filme bom para ver", "jogo legal para jogar",
    "musica nova lancada", "qual o melhor streaming", "tem alguma dica de lazer",
    "o que tem de novo no cinema", "quais os melhores jogos", "que serie e boa",
    "gosta de jogos", "assiste alguma serie", "escuta que estilo musical",
    "tem show chegando", "qual plataforma usa", "tem algo divertido para fazer",
    "recomenda algo legal", "o que rola de entretenimento", "melhores series",
    // COMPLETOS E PERGUNTAS DETALHADAS
    "pode me indicar uma serie boa para passar o tempo",
    "qual filme voce recomenda para assistir hoje a noite",
    "tem alguma dica de jogo divertido para celular"
  ],
  respostas: [
    "Oi! 💜 Se gosta de animes, os lugares mais seguros e legais são: Crunchyroll (tem versão grátis), Pluto TV (canais 24h grátis), Netflix, Prime Video e canais oficiais no YouTube! 🎬",
    "Olá! 🎵 Para música, use plataformas confiáveis como Spotify, YouTube Music, Deezer, SoundCloud e Palco MP3 — todas legais e seguras! 💜",
    "Oi! 🚀 Quer ver animes sem risco? Vá de Crunchyroll ou Pluto TV grátis! Para música, Spotify e YouTube Music são as melhores opções! ✨"
  ]
},
dicas: { 
gatilhos: [
 "dica", "dicas", "sugestao", "sugestoes", "melhor forma", "como melhorar", "dica ai", "me dê dica", "qual o melhor", "recomendacao", "recomendacoes", "truque", "truques", "macete", "macetes", "melhor jeito", "dica boa", "pode me dar uma dica", "tem alguma sugestao para mim", "qual a melhor forma de fazer", "como posso melhorar isso", "tem alguma dica importante", "me sugere algo melhor", "qual a melhor opcao", "tem algum truque para facilitar", "me recomenda o que fazer", "dica para usar melhor", "como consigo melhores resultados", "o que voce sugere que eu faca", "qual o jeito mais facil", "dica rapida", "sugestao de melhoria" 
 ],
respostas: [
"Claro! 💜 Hoje ajustamos tudo para reconhecer muito mais formas de perguntar — use suas palavras normais que eu entendo direitinho!",
"Ótima ideia! 🚀 Lembre-se: qualquer arquivo ou link você manda direto aqui, eu mesmo converto em mídia para você ver sem complicações!",
"Com certeza! ✨ As atualizações chegam sempre de domingo para segunda, e nunca paramos o sistema — pode usar a qualquer hora!",
"Vou te dar uma dica valiosa! 💜 Para saber detalhes de planos, patentes ou TechCoins é só perguntar de qualquer jeito!",
"Claro que sim! 📋 Sempre que precisar de ajuda com API, acesse a documentação na página inicial do site!"
]
},
ajuda: {
gatilhos: [
"ajuda", "ajudar", "socorro", "auxilio", "ajuda ai", "preciso de ajuda", "me ajuda", "como faco", "como fazer", "nao consigo", "nao funciona", "erro", "problema", "duvida", "nao sei"
],
respostas: [
  // 📋 Apresentação geral dos planos
  "Claro que te explico tudo! 💜 Temos desde o Plano Teste gratuito até o nível Criador de Tecnologias! Cada um vem com mais requisições, TechCoins e dias de validade! Quer ver a lista completa com valores e benefícios?",
  
  // ⭐ Patentes e níveis
  "Com certeza! 🚀 Os planos sobem de nível e cada um ganha uma patente exclusiva de estrelas! Começa com 9 estrelas vazias e vai enchendo até chegar nas 9 estrelas cheias do Criador de Tecnologias! Quer saber qual patente corresponde a cada plano?",
  
  // 🪙 TechCoins explicada
  "Vou te explicar direitinho! ✨ As TechCoins são nossa moeda especial: você ganha sempre que renova um plano e pode trocar por temas personalizados, acessar bots exclusivos e vantagens únicas! Quer ver o que mais pode comprar com elas?",
  
  // 📊 Detalhamento completo dos planos
  "Aqui estão todos os planos com valores, requisições, TechCoins e dias de validade! 💜\n\n" +
  "★ Plano Teste — Grátis | 100 requisições | 0 TechCoins | 1 dia\n" +
  "★★ Iniciante — R$1,00 | 300 requisições | 300 TechCoins | 3 dias\n" +
  "★★★ Aprendiz — R$2,00 | 500 requisições | 500 TechCoins | 7 dias\n" +
  "★★★★ Estagiário — R$3,50 | 1.000 requisições | 1.000 TechCoins | 10 dias\n" +
  "★★★★★ Desenvolvedor Júnior — R$5,00 | 2.000 requisições | 2.000 TechCoins | 15 dias\n" +
  "★★★★★★ Desenvolvedor Pleno — R$8,00 | 3.500 requisições | 3.500 TechCoins | 20 dias\n" +
  "★★★★★★★ Desenvolvedor Sênior — R$12,00 | 5.000 requisições | 5.000 TechCoins | 25 dias\n" +
  "★★★★★★★★ Engenheiro de Software — R$20,00 | 8.000 requisições | 8.000 TechCoins | 30 dias\n" +
  "★★★★★★★★★ Arquiteto de Sistemas — R$35,00 | 12.000 requisições | 12.000 TechCoins | 45 dias\n" +
  "✩✩✩★★★★★ Mestre dos Códigos — R$60,00 | 15.000 requisições | 15.000 TechCoins | 60 dias\n" +
  "✩✩★★★★★★★ Lendário da Tecnologia — R$100,00 | 30.000 requisições | 30.000 TechCoins | 90 dias\n" +
  "✩★★★★★★★★ Gênio da Computação — R$200,00 | 100.000 requisições | 100.000 TechCoins | 180 dias\n" +
  "★★★★★★★★★ Criador de Tecnologias — R$500,00 | ILIMITADO | 999.999.999 TechCoins | ♛ Permanente\n\n" +
  "Qual plano combina mais com você? 💜",
  
  // 🎯 Sobre como funciona o cálculo automático
  "Que bom que perguntou! 🚀 Seu plano e patente são definidos automaticamente pela quantidade de requisições que você usa! Quanto mais você evolui, mais estrelas aparecem ao lado do seu nome — é o reconhecimento do seu crescimento aqui no sistema! ✨",
  
  // ⭐ Explicação das patentes de forma amigável
  "As patentes são lindas, sabia? 💜 Começa com 9 estrelas vazias e vai enchendo conforme você sobe de nível! Quando chega no topo — Criador de Tecnologias — você ganha as 9 estrelas todas cheias ★★★★★★★★★ e o plano é permanente! Que honra, né? 🥹",
  
  // 🪙 Acumulo de TechCoins
  "E sabe o que é incrível? ✨ As TechCoins se acumulam a cada renovação e não expiram! Pode juntar bastante para desbloquear temas exclusivos, funcionalidades especiais e vantagens que só os membros mais ativos conseguem! 💜",
  
  // 📋 Resumo rápido e prático
  "Resumindo tudo de um jeitinho fácil! 💜 Quanto mais alto o plano: mais requisições, mais TechCoins, mais dias de validade e mais estrelas na sua patente! E o Criador de Tecnologias é para sempre — sem vencimento, sem limites! ♛",
  
  // 🎉 Destaque do plano mais alto
  "E o plano mais especial? 🚀 O Criador de Tecnologias é o topo absoluto! Requisições ilimitadas, quase 1 bilhão de TechCoins e validade permanente ♛ — é para quem faz acontecer e lidera! Que honra chegar lá, né? 💜",
  
  // 💡 Comparativo simples
  "De forma bem simples! ✨ Plano Teste é para experimentar, os intermediários crescem com você, e os mais altos — Lendário, Gênio e Criador — são para quem quer dominar tudo sem limites! Qual você se vê usando? 💜",
  
  // 📌 Sobre renovação e recompensas
  "Cada renovação te recompensa! 🪙 Além de mais tempo e requisições, você ainda ganha TechCoins que podem ser usadas para personalizar tudo do seu jeitinho! Vale a pena acumular, viu? 💜",
  
  // 🎯 Convite para escolher
  "Agora que sabe tudo! 💜 Tem algum plano que chamou sua atenção? Posso te explicar mais detalhes sobre qualquer um que você quiser! Estou aqui para ajudar! 🚀"
]
},
duvidas_gerais: {
  gatilhos: [
    "design", "estilo visual", "aparencia", "cores do sistema", "layout", "tema",
    "como pagar", "pagamento", "pix", "chave api", "api key", "como usar a chave",
    "testar chave", "como testar", "como acessar planos", "comprar plano",
    "como funciona o login", "código de segurança", "segurança da conta",
    "atualizações", "quando atualiza", "manutenção", "direto", "falar direto",
    "suporte direto", "como funciona a api", "usar no projeto", "automação",
    "como colocar no código", "link de teste", "endereço da api", "suspeita de acesso",
    "segurança", "criptografia", "confirmação de conta", "atualização de rotas"
  ],
  respostas: [
    "💜 O design da Tosh Tech foi todo pensado com muito carinho: moderno, limpo, com identidade única e feito para você se sentir em casa!",
    "🎨 Cores harmônicas, ícones claros e layout adaptado perfeitamente para celular e computador — tudo funcionando do jeito que você precisa!",
    "💜 Para escolher seu plano é super facil! Apos fazer login, é só entrar no painel, ir em Planos e Pagamentos e escolher o que mais combina com voce! Aceitamos pagamento via Pix — rapido, seguro e na hora! 🚀",
    "💳 É simples assim! ✨ Entre no dashboard → faca login → va em Planos e Pagamentos → escolha seu plano → pague via Pix e ja pode usar tudo na hora! Sem complicacao, sem espera!",
    "✨ Quer falar direto com a gente? 💜 Pode chamar no direct que a gente te atende pessoalmente! Seja para duvida, sugestao ou ajuda — estamos aqui para voce!",
    "💜 Pagamento via Pix e instantaneo! Apos escolher seu plano no dashboard, basta gerar o codigo Pix, pagar e em poucos segundos seu plano ja esta ativo com todas as TechCoins e requisicoes liberadas! 🚀",
    "🔑 Usar sua API Key e mais facil do que parece! 💜 Apos fazer login, sua Key aparece direto no card de Informacoes de Planos — e so copiar e usar! Coloque no lugar de Sua_Apikey no link, aperte Enter e ja vai funcionar! ✨",
    "🧪 Quer testar rapidamente? 💜 Copie sua Key do card de informacoes, cole no navegador substituindo Sua_Apikey na rota, de Enter e pronto! Se aparecer os dados, esta funcionando perfeitamente! Pode usar esse mesmo link para automatizar no seu projeto! 🚀",
    "💜 Para usar no seu codigo ou projeto e so copiar o link completo com sua Key e inserir na automacao! Funciona em qualquer linguagem — Node.js, Python, sites, bots — tudo de forma simples e pronta! ✨",
    "🔑 Exemplo pratico: https://seuservidor.com/api/alguma-rota?apikey=COPIE_SUA_KEY_AQUI — trocou, colou, Enter e ja retorna os dados! Sem segredos, sem complicacao! 🚀",
    "💜 Sua API Key esta sempre visivel no card de Informacoes de Planos apos o login — pode copiar e usar quantas vezes quiser! Nao precisa gerar nova, e sempre a mesma! ✨",
    "🤖 Para automatizar no seu projeto: copie o link completo com sua Key embutida e faca a requisicao direto! A API responde instantaneamente, sem atrasos e sem bloqueios! 💜",
    "🔒 Seguranca em primeiro lugar! 💜 Sempre que voce fizer login, pedimos o codigo de seguranca primeiro — ele confirma sua conta atraves do seu ID + criptografia! E assim que garantimos que so VOCE tem acesso! 🚀",
    "🛡️ Se o sistema detectar qualquer suspeita de acesso ou movimento estranho, ele redireciona automaticamente para o login novamente! E para ter CERTEZA absoluta que e voce mesmo dono da conta! 💜",
    "🔐 Nada fica sem protecao por aqui! 💜 Tudo passa por criptografia, seu ID e unico e o codigo de seguranca confirma sua identidade em cada acesso! Somos profissionais e cuidamos da sua conta como se fosse nossa! 🚀",
    "⚠️ Seguranca nunca e demais! 💜 Se alguem tentar acessar de outro lugar ou houver qualquer suspeita, o sistema joga direto para o login — pede reconfirmacao, codigo de seguranca e so libera depois de provar que e voce! 🛡️",
    "🔑 O codigo de seguranca nao e opcional! 💜 E a chave que liga seu ID exclusivo com criptografia — sem ele, ninguem entra! Nem voce, se nao provar que e voce! E isso e para proteger VOCE! 🚀",
    "🔄 Todo domingo tem atualizacao completa de rotas! 💜 E o melhor: NAO desligamos nada, NAO atrapalhamos seu uso, NAO paramos o sistema! Atualizamos em segundo plano enquanto voce continua usando! Porque somos profissionais de verdade! 🚀",
    "✨ Atualizacao sem parar! 💜 Todo domingo melhoramos as rotas, adicionamos funcionalidades e deixamos tudo mais rapido — sem nunca desligar o sistema! Voce nem percebe que atualizou, continua usando normalmente! Isso e excelencia! 🚀",
    "💜 Atualizacao todo domingo, sem parada, sem aviso de manutencao, sem ficar offline! 🚀 Trabalhamos nos bastidores para voce ter sempre o melhor, sem nunca parar! Profissionalismo e isso! ✨",
    "🔄 Melhorias chegam todo domingo! 💜 Rotas novas, ajustes, otimizacoes — tudo sem desligar nada! Voce abre na segunda e ja encontra tudo melhorado, sem ter sentido nada! 🚀",
    "💜 Resumindo tudo de um jeitinho facil: faca login → confirme com codigo de seguranca → va em Planos e Pagamentos → escolha → pague via Pix → copie sua Key → teste no navegador → coloque no seu projeto! Simples assim! 🚀",
    "🛡️ Seguranca + praticidade + atualizacoes constantes! 💜 Codigo de seguranca no login, criptografia em tudo, redirecionamento em caso de suspeita, atualizacao de rotas todo domingo sem parar — isso e Tosh Tech! 🚀",
    "💜 Se precisar de ajuda com qualquer passo — pagamento, teste da Key, uso no projeto — e so chamar ou falar no direct! Estamos aqui para te guiar do jeitinho que voce precisa! ✨"
  ]
}
};


// ═══════════════════════════════════════════════════════════
// ➪ IMPORTAÇÕES
// ═══════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════════
// ➪ CONFIGURAÇÕES DA API
// ═══════════════════════════════════════════════════════════
const API_BASE_URL = 'https://tosh-tech.onrender.com';
const TIMEOUT_API = 15000;

// ═══════════════════════════════════════════════════════════
// ➪ CONFIGURAÇÃO DE PASTAS E CATEGORIAS — ✅ CORRIGIDO!
// ═══════════════════════════════════════════════════════════
const DIR_RESPOSTAS = path.join(__dirname, 'respostas');
const garantirPasta = (caminho) => {
  if (!fs.existsSync(caminho)) fs.mkdirSync(caminho, { recursive: true });
};
garantirPasta(DIR_RESPOSTAS);

// ✅ SUA LISTA DE 15 CATEGORIAS — AGORA É A ÚNICA FONTE!
const CATEGORIAS = [
  'saudacoes', 'respostas_conversa', 'despedidas', 'planos', 'saldo',
  'elogios', 'entretenimento', 'dicas', 'seguranca', 'redes_sociais',
  'sobre_tosh', 'dados_usuario', 'parcerias', 'ajuda', 'duvidas_gerais'
];

const ARQUIVOS_CATEGORIAS = {};
CATEGORIAS.forEach(cat => {
  const caminhoPasta = path.join(DIR_RESPOSTAS, cat);
  garantirPasta(caminhoPasta);
  ARQUIVOS_CATEGORIAS[cat] = path.join(caminhoPasta, `${cat}.json`);
});

const CAMINHO_MEMORIA_GERAL = path.join(DIR_RESPOSTAS, 'memoria_geral.json');

// ═══════════════════════════════════════════════════════════
// ➪ FUNÇÃO PARA PEGAR DADOS DO USUÁRIO
// ═══════════════════════════════════════════════════════════
const buscarDadosUsuarioAPI = async (emailUsuario) => {
  if (!emailUsuario) return null;
  try {
    const resposta = await axios.get(`${API_BASE_URL}/api/meus-dados`, {
      headers: { "tosh_tech": emailUsuario },
      timeout: TIMEOUT_API
    });
    if (resposta.data.sucesso) {
      console.log("✅ Dados carregados da API: " + emailUsuario);
      return resposta.data;
    }
    console.log(`ℹ️ Usuário não encontrado na API: ${emailUsuario}`);
    return null;
  } catch (erro) {
    console.error(`❌ Erro ao buscar dados na API: ${erro.message}`);
    return null;
  }
};

// ═══════════════════════════════════════════════════════════
// ➪ FUNÇÕES AUXILIARES
// ═══════════════════════════════════════════════════════════
const normalizarTexto = function(texto) {
  if (!texto) texto = "";
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
};

const pegarDataHoraBrasil = function() {
  const agora = new Date();
  const brasil = new Date(agora.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
  const hora = brasil.getHours();
  let periodo = "manha";
  if (hora >= 12 && hora < 18) periodo = "tarde";
  if (hora >= 18) periodo = "noite";
  const diasSemana = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
  return {
    periodo, hora: brasil.getHours(), minutos: brasil.getMinutes(),
    diaSemanaNome: diasSemana[brasil.getDay()],
    diaMes: brasil.getDate(), mes: brasil.getMonth() + 1, ano: brasil.getFullYear()
  };
};

const garantirArquivoJSON = function(caminho, padrao) {
  if (!padrao) padrao = { gatilhos: [], respostas: [] };
  try {
    if (!fs.existsSync(caminho)) {
      fs.mkdirSync(path.dirname(caminho), { recursive: true });
      fs.writeFileSync(caminho, JSON.stringify(padrao, null, 2), 'utf-8');
    }
    return JSON.parse(fs.readFileSync(caminho, 'utf-8'));
  } catch (erro) {
    return padrao;
  }
};

const salvarCategoria = function(nome, dados) {
  const caminho = ARQUIVOS_CATEGORIAS[nome];
  fs.writeFileSync(caminho, JSON.stringify(dados, null, 2), 'utf-8');
};

// ═══════════════════════════════════════════════════════════
// ➪ CARREGAMENTO DE TODAS AS CATEGORIAS — ✅ AGORA VERIFICA TODAS!
// ═══════════════════════════════════════════════════════════
const carregarTodasCategorias = function() {
  const dados = {};
  console.log('\n📂 Carregando TODAS as categorias...');
  CATEGORIAS.forEach(function(cat) {
    const caminho = ARQUIVOS_CATEGORIAS[cat];
    const dadosBase = { gatilhos: [], respostas: [] };
    const carregado = garantirArquivoJSON(caminho, dadosBase);
    dados[cat] = carregado;
    console.log('✅ ' + cat + ': ' + carregado.gatilhos.length + ' gatilhos | ' + carregado.respostas.length + ' respostas');
  });
  console.log(`🚀 PRONTO! ${CATEGORIAS.length} categorias carregadas!\n`);
  return dados;
};

// ═══════════════════════════════════════════════════════════
// ➪ MEMÓRIA E ESCOLHA DE RESPOSTAS
// ═══════════════════════════════════════════════════════════
const memoriaUsuarios = new Map();
// ❌ REMOVIDO: ultimoPromptImagem — não salva mais prompt!

const escolherSemRepetir = function(lista, idUsuario) {
  if (!Array.isArray(lista) || lista.length === 0) return "";
  if (!memoriaUsuarios.has(idUsuario)) {
    memoriaUsuarios.set(idUsuario, { ultimaResposta: "" });
  }
  const mem = memoriaUsuarios.get(idUsuario);
  const opcoes = lista.filter(item => item !== mem.ultimaResposta);
  let escolhida = opcoes.length > 0 
    ? opcoes[Math.floor(Math.random() * opcoes.length)] 
    : lista[0];
  mem.ultimaResposta = escolhida;
  return escolhida;
};

// ═══════════════════════════════════════════════════════════
// ➪ SAUDAÇÃO AUTOMÁTICA
// ═══════════════════════════════════════════════════════════
const gerarSaudacaoCorreta = function() {
  const tempo = pegarDataHoraBrasil();
  const horaFormatada = (tempo.hora < 10 ? '0' + tempo.hora : tempo.hora) + ':' + (tempo.minutos < 10 ? '0' + tempo.minutos : tempo.minutos);
  const opcoes = {
    manha: ["Bom dia! 😊 Hoje é " + tempo.diaSemanaNome + ", são " + horaFormatada + "!", "Bom dia! 💜 Que dia lindo!"],
    tarde: ["Boa tarde! 😊 Hoje é " + tempo.diaSemanaNome + ", são " + horaFormatada + "!", "Boa tarde! 💜 Que tarde agradável!"],
    noite: ["Boa noite! 😊 Hoje é " + tempo.diaSemanaNome + ", são " + horaFormatada + "!", "Boa noite! 💜 Que noite calma!"]
  };
  return escolherSemRepetir(opcoes[tempo.periodo], 'saudacao_global');
};

// ═══════════════════════════════════════════════════════════
// ➪ GERAÇÃO DE IMAGEM — ✅ SEM SALVAR PROMPT!
// ═══════════════════════════════════════════════════════════
const gatilhosImagem = [
  "crie imagem", "faz imagem", "gerar imagem", "criar imagem", "imagem de",
  "desenhe", "desenhar", "ilustre", "faça uma imagem", "foto de", "desenho de"
];

function ehPedidoImagem(texto) {
  const tx = normalizarTexto(texto);
  return gatilhosImagem.some(g => tx.indexOf(normalizarTexto(g)) >= 0);
}

async function imagemAi(texto, idUsuario) {
  const promptFinal = texto.trim();
  // ❌ REMOVIDO: ultimoPromptImagem.set() — não salva mais!
  const cod = encodeURIComponent(promptFinal);
  const url = "https://image.pollinations.ai/prompt/" + cod + "?width=1024&height=1024&nologo=true";
  return { status: true, criador: "Tosh Tech", promptUsado: promptFinal, imagem: url };
}

// ═══════════════════════════════════════════════════════════
// ➪ BUSCA DE RESPOSTAS — ✅ AGORA PERCORRE TODAS AS 15 CATEGORIAS!
// ═══════════════════════════════════════════════════════════
const buscarRespostaNasPastas = async (pergunta, dadosUsuario = {}) => {
  const norm = normalizarTexto(pergunta);
  const tempo = pegarDataHoraBrasil();
  const email = (dadosUsuario.email || "").trim().toLowerCase();
  const usuario = email ? await buscarDadosUsuarioAPI(email) : null;

  // ➪ DADOS DO USUÁRIO
  if (usuario) {
    if (/quem sou eu|quem sou|meus dados|meu perfil|meu cadastro|meu cargo|qual meu cargo|cargo que tenho|qual e o meu cargo|meu nivel|qual meu nivel|nivel que sou|qual e o meu nivel|minha chave|minha key|chave api|api key|chave de acesso|minha chave api|qual minha chave|meu plano|qual meu plano|qual e o meu plano|plano que tenho|quando acaba meu plano|validade plano|validade do meu plano|quando meu plano acaba|ate quando vale meu plano|quando vence meu plano|fim do plano|meu saldo|saldo|techcoins|quantas techcoins tenho|meu saldo de techcoins/.test(norm)) {
      const dados = usuario.dados || usuario;
      const fotoBase = dados.fotoPerfil || '/logo.png';
      const fotoCompleta = fotoBase.startsWith('http') ? fotoBase : `https://tosh-tech.onrender.com${fotoBase}`;
      
      return `![Foto de Perfil](${fotoCompleta})

᯽ **Nome:** ${dados.nome || 'Não informado'}
᯽ **Cargo:** ${dados.cargo || 'Usuário'}
᯽ **Nível:** ${dados.nivel || '1'}
᯽ **Plano:** ${dados.plano || 'Gratuito'}
᯽ **Válido até:** ${dados.validadePlano || 'Indeterminado'}
᯽ **Apikey:** \`${dados.apiKey || 'Sem chave'}\`
᯽ **TechCoins:** ${dados.techCoins || '0'}

💜 Bem-vindo(a), ${dados.nome || 'Usuário'}!`;
    }
  }

  if (norm.match(/quem sou eu|meus dados|meu perfil|meu cargo|meu plano|minha chave/)) {
    return "⚠️ Não consegui carregar seus dados! Verifique se está logado corretamente ou contate o suporte. 💜";
  }

  // ➪ SAUDAÇÃO
  if (norm.indexOf("bom dia") >= 0 || norm.indexOf("boa tarde") >= 0 || norm.indexOf("boa noite") >= 0 || norm.indexOf("oi") >= 0 || norm.indexOf("ola") >= 0 || norm.indexOf("opa") >= 0) {
    return gerarSaudacaoCorreta();
  }

  // ➪ HORA E DATA
  if (norm.indexOf("que horas") >= 0 || norm.indexOf("qual a hora") >= 0) {
    return "Agora são " + (tempo.hora < 10 ? '0' + tempo.hora : tempo.hora) + ":" + (tempo.minutos < 10 ? '0' + tempo.minutos : tempo.minutos) + " 🕒";
  }
  if (norm.indexOf("data de hoje") >= 0 || norm.indexOf("qual a data") >= 0) {
    return "Hoje é " + tempo.diaSemanaNome + ", " + tempo.diaMes + "/" + tempo.mes + "/" + tempo.ano + " 📆";
  }

  // ➪ ✅ PERCORRE TODAS AS 15 CATEGORIAS!
  const gatilhosSalvos = carregarTodasCategorias();
  for (const cat of CATEGORIAS) {
    const dadosCat = gatilhosSalvos[cat];
    if (!dadosCat || !Array.isArray(dadosCat.gatilhos)) continue;
    for (const gatilhoBruto of dadosCat.gatilhos) {
      const gatilho = normalizarTexto(gatilhoBruto);
      if (norm.indexOf(gatilho) >= 0 || gatilho.indexOf(norm) >= 0) {
        console.log(`✅ GATILHO ENCONTRADO: "${gatilho}" → ${cat}`);
        return escolherSemRepetir(dadosCat.respostas, cat);
      }
    }
  }

  console.log("ℹ️ Nenhum gatilho encontrado em nenhuma categoria para: " + pergunta);
  return null;
};

// ═══════════════════════════════════════════════════════════
// ➪ MEMÓRIA GERAL
// ═══════════════════════════════════════════════════════════
let memoriaIA = { totalInteracoes: 0 };
if (fs.existsSync(CAMINHO_MEMORIA_GERAL)) {
  try {
    memoriaIA = JSON.parse(fs.readFileSync(CAMINHO_MEMORIA_GERAL, 'utf-8'));
  } catch {
    memoriaIA = { totalInteracoes: 0 };
  }
}

// ═══════════════════════════════════════════════════════════
// ➪ FUNÇÃO PRINCIPAL
// ═══════════════════════════════════════════════════════════
async function responderSuporte(pergunta, dadosUsuario = {}) {
  try {
    const nome = dadosUsuario.nome || "Usuário";
    const email = (dadosUsuario.email || "").trim().toLowerCase();
    const idUsuario = email || "anonimo";

    // ➪ GERAÇÃO DE IMAGEM — ✅ SEM SALVAR PROMPT!
    if (ehPedidoImagem(pergunta)) {
      console.log("🖼️ Pedido de imagem! Prompt: " + pergunta);
      const resultado = await imagemAi(pergunta, idUsuario);
      if (resultado.imagem) {
        return "![Imagem Gerada](" + resultado.imagem + ")\n💜 Prompt: " + resultado.promptUsado;
      }
    }

    // ➪ BUSCA RESPOSTA
    let resposta = await buscarRespostaNasPastas(pergunta, dadosUsuario);

    if (!resposta) {
      resposta = "Entendi! Ainda estou aprendendo sobre isso, mas em breve terei uma resposta melhor! 💜";
    }

    memoriaIA.totalInteracoes++;
    fs.writeFileSync(CAMINHO_MEMORIA_GERAL, JSON.stringify(memoriaIA, null, 2), 'utf-8');

    return resposta.replace("{nome}", nome);
  } catch (erro) {
    console.error("❌ Erro: " + erro.message);
    return "Ops! Tive um problema! 💜 Tente novamente?";
  }
}

// ═══════════════════════════════════════════════════════════
// ➪ EXPORTAÇÃO
// ═══════════════════════════════════════════════════════════
module.exports = { responderSuporte };
