/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Criador『Tosh』༻
➪ Módulo Dicionário 
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
const axios = require('axios');

const CACHE_DIC = {};
const CONFIG = {
tempoCache: 2592000000 // 30 dias
};

//➪ Dicionário Completo Base 
const DICIONARIO_TOSH = {
"tecnologia": {
classe: "Substantivo feminino",
significados: [
"Conjunto de conhecimentos, técnicas e processos aplicados na produção de bens e serviços.",
"Uso de conhecimentos científicos para criar soluções e facilitar atividades.",
"Conjunto de ferramentas e recursos de um ramo específico."
],
origem: "Grego: techne (arte/ofício) + logia (estudo)"
},
"programacao": {
classe: "Substantivo feminino",
significados: [
"Processo de escrever códigos que instruem computadores a executar tarefas.",
"Elaboração de sequências lógicas e comandos para sistemas.",
"Planejamento de atividades ou eventos."
],
origem: "Latim: programmare (escrever programa)"
},
"javascript": {
classe: "Substantivo masculino",
significados: [
"Linguagem de programação leve e interpretada, usada em sites e servidores.",
"Permite adicionar interatividade e dinamismo às aplicações web."
],
origem: "Criada pela Netscape (1995), originalmente chamada LiveScript"
},
"node": {
classe: "Substantivo masculino",
significados: [
"Ambiente que executa JavaScript fora do navegador, usado para criar APIs.",
"Ponto de conexão em uma rede de computadores.",
"Elemento básico de estruturas de dados em árvore."
],
origem: "Inglês: node (nó)"
},
"api": {
classe: "Substantivo feminino",
significados: [
"Interface que permite comunicação entre diferentes sistemas ou programas.",
"Conjunto de regras e formatos para solicitar e receber dados.",
"Exemplo: API de conversão de moedas, API de busca YouTube."
],
origem: "Inglês: Application Programming Interface"
},
"servidor": {
classe: "Substantivo masculino",
significados: [
"Computador ou sistema que fornece serviços, dados ou recursos a outros dispositivos.",
"Software que responde a requisições de clientes."
],
origem: "Latim: servire (servir)"
},
"banco de dados": {
classe: "Expressão substantiva",
significados: [
"Conjunto organizado de dados armazenados para acesso rápido e uso compartilhado.",
"Sistema que gerencia informações como usuários, planos e configurações."
],
origem: "Combinação de termos: banco (depósito) + dados (informações)"
},
"protocolo": {
classe: "Substantivo masculino",
significados: [
"Conjunto de regras que definem como dados são trocados entre sistemas.",
"Exemplo: HTTP, HTTPS, TCP/IP."
],
origem: "Grego: protokollon (primeira página de registro)"
},
"seguranca": {
classe: "Substantivo feminino",
significados: [
"Conjunto de medidas para proteger dados, sistemas e acessos.",
"Garantia de que apenas pessoas autorizadas usam recursos."
],
origem: "Latim: securitas (calmo, sem perigo)"
},

//➪ Termos Gerais E Comuns
"desenvolvedor": {
classe: "Substantivo masculino/feminino",
significados: [
"Profissional que cria, projeta e mantém softwares e sistemas.",
"Pessoa que desenvolve ideias, projetos ou soluções."
],
origem: "Latim: desevolvere (desenrolar, ampliar)"
},
"sistema": {
classe: "Substantivo masculino",
significados: [
"Conjunto de partes que trabalham juntas para um objetivo comum.",
"Conjunto de regras e processos organizados."
],
origem: "Grego: systema (organização)"
},
"usuario": {
classe: "Substantivo masculino/feminino",
significados: [
"Pessoa que usa um serviço, sistema ou ferramenta.",
"Conta cadastrada na plataforma com permissões específicas."
],
origem: "Latim: usus (uso)"
},
"dado": {
classe: "Substantivo masculino",
significados: [
"Informação bruta que serve como base para raciocínio ou cálculos.",
"Valor armazenado e processado por sistemas."
],
origem: "Latim: datum (o que é dado)"
},
"codigo": {
classe: "Substantivo masculino",
significados: [
"Conjunto de instruções escritas em linguagem compreensível por computadores.",
"Sistema de sinais ou símbolos para comunicar informações."
],
origem: "Latim: codex (livro, código)"
},
"funcao": {
classe: "Substantivo feminino",
significados: [
"Trecho de código que executa uma tarefa específica e pode ser reutilizado.",
"Objetivo ou finalidade de algo."
],
origem: "Latim: functio (execução, desempenho)"
},
"variavel": {
classe: "Substantivo feminino",
significados: [
"Espaço na memória para armazenar valores que podem mudar.",
"Elemento que sofre variação ou alteração."
],
origem: "Latim: variabilis (que pode mudar)"
},
"segurança": {
classe: "Substantivo feminino",
significados: [
"Proteção contra riscos, danos ou acessos não autorizados.",
"Medidas para garantir a integridade de dados e sistemas."
],
origem: "Latim: securitas"
},
"internet": {
classe: "Substantivo feminino",
significados: [
"Rede mundial de computadores conectados que trocam informações.",
"Infraestrutura que permite acesso a serviços e conteúdo global."
],
origem: "Inglês: inter (entre) + net (rede)"
},
"aplicativo": {
classe: "Substantivo masculino",
significados: [
"Programa projetado para usuários executarem tarefas específicas.",
"Software que roda em celulares, computadores ou servidores."
],
origem: "Latim: applicare (aplicar)"
},
"autenticacao": {
classe: "Substantivo feminino",
significados: [
"Processo de verificar se uma pessoa ou sistema é quem diz ser.",
"Confirmação de identidade antes de liberar acesso."
],
origem: "Grego: authentikós (próprio, original)"
},
"autorizacao": {
classe: "Substantivo feminino",
significados: [
"Permissão concedida para acessar ou usar recursos.",
"Verificação se o usuário tem direito a uma ação."
],
origem: "Latim: auctorizare (autorizar)"
},
"criptografia": {
classe: "Substantivo feminino",
significados: [
"Técnica de transformar dados para que só pessoas autorizadas entendam.",
"Método de proteger informações confidenciais."
],
origem: "Grego: kryptós (oculto) + graphein (escrita)"
},
"hospedagem": {
classe: "Substantivo feminino",
significados: [
"Serviço de armazenar sites, APIs ou sistemas em servidores conectados.",
"Local onde arquivos e dados ficam disponíveis na internet."
],
origem: "Latim: hospitare (hospedar)"
},
"plataforma": {
classe: "Substantivo feminino",
significados: [
"Ambiente ou sistema onde outros serviços ou aplicações funcionam.",
"Exemplo: Plataforma Tosh Tech, Plataforma de Hospedagem."
],
origem: "Grego: platys (plano, largo)"
},
"acessibilidade": { classe: "Substantivo feminino", significados: ["Capacidade de sistemas serem usados por todas as pessoas, incluindo aquelas com deficiências.", "Conjunto de adaptações para facilitar o uso de ferramentas digitais."], origem: "Latim: accessibilitas" },
  "acesso": { classe: "Substantivo masculino", significados: ["Permissão para entrar, usar ou consultar algo.", "Caminho ou meio de chegar a um recurso."], origem: "Latim: accessus" },
  "adaptador": { classe: "Substantivo masculino", significados: ["Dispositivo que permite conectar equipamentos diferentes.", "Software que ajusta dados entre sistemas."], origem: "Latim: adaptare" },
  "endereco ip": { classe: "Expressão substantiva", significados: ["Número único que identifica cada dispositivo em uma rede.", "Exemplo: 192.168.0.1"], origem: "Inglês: Internet Protocol Address" },
  "ipv4": { classe: "Substantivo masculino", significados: ["Versão antiga do protocolo IP, com 4 blocos de números.", "Mais usado atualmente, mas com endereços limitados."], origem: "Inglês: Internet Protocol version 4" },
  "ipv6": { classe: "Substantivo masculino", significados: ["Nova versão do IP, com muito mais endereços disponíveis.", "Usa letras e números para identificar dispositivos."], origem: "Inglês: Internet Protocol version 6" },
  "wifi": { classe: "Substantivo masculino", significados: ["Tecnologia que conecta dispositivos sem fios.", "Marca que certifica compatibilidade de redes sem fio."], origem: "Inglês: Wireless Fidelity" },
  "bluetooth": { classe: "Substantivo masculino", significados: ["Conexão sem fio curta distância entre celulares, fones e acessórios.", "Padrão de comunicação de baixa potência."], origem: "Rei Harald Bluetooth" },
  "roteador": { classe: "Substantivo masculino", significados: ["Equipamento que distribui internet para vários dispositivos.", "Direciona dados entre redes diferentes."], origem: "Latim: rota" },
  "modem": { classe: "Substantivo masculino", significados: ["Dispositivo que converte sinais digitais em analógicos para internet.", "Meio de conexão com a operadora."], origem: "Inglês: Modulator Demodulator" },
  "processador": { classe: "Substantivo masculino", significados: ["Cérebro do computador, executa cálculos e comandos.", "Componente principal que define a velocidade do sistema."], origem: "Latim: processus" },
  "memoria ram": { classe: "Expressão substantiva", significados: ["Memória temporária que armazena dados em uso.", "Quanto mais RAM, mais programas abertos ao mesmo tempo."], origem: "Inglês: Random Access Memory" },
  "hd": { classe: "Substantivo masculino", significados: ["Disco rígido, armazena arquivos, fotos e sistemas permanentemente.", "Tecnologia antiga com partes móveis."], origem: "Inglês: Hard Disk" },
  "ssd": { classe: "Substantivo masculino", significados: ["Armazenamento rápido sem partes móveis.", "Deixa o computador muito mais ágil que o HD."], origem: "Inglês: Solid State Drive" },
  "placa de video": { classe: "Substantivo feminino", significados: ["Componente que processa imagens e vídeos.", "Essencial para jogos e edição de gráficos."], origem: "Português: placa + vídeo" },
  "placa mae": { classe: "Substantivo feminino", significados: ["Placa principal onde todos os componentes se conectam.", "Define quais peças são compatíveis com o equipamento."], origem: "Português: placa + mãe" },
  "fonte de energia": { classe: "Expressão substantiva", significados: ["Equipamento que fornece eletricidade estável para o computador.", "Converte energia da tomada para os componentes."], origem: "Português: fonte + energia" },
  "sistema operacional": { classe: "Expressão substantiva", significados: ["Software que gerencia o computador e permite rodar programas.", "Exemplos: Windows, Android, Linux, macOS."], origem: "Latim: systema + operare" },
  "windows": { classe: "Substantivo masculino", significados: ["Sistema operacional da Microsoft para computadores.", "Mais usado no mundo todo."], origem: "Inglês: janelas" },
  "linux": { classe: "Substantivo masculino", significados: ["Sistema gratuito e aberto, muito usado em servidores.", "Existem versões como Ubuntu, Fedora e Debian."], origem: "Nome do criador: Linus Torvalds" },
  "android": { classe: "Substantivo masculino", significados: ["Sistema operacional para celulares e tablets.", "Desenvolvido pelo Google, baseado no Linux."], origem: "Grego: androide (forma humana)" },
  "ios": { classe: "Substantivo masculino", significados: ["Sistema exclusivo para celulares e tablets da Apple.", "Fechado e otimizado para os dispositivos da marca."], origem: "Inglês: iPhone Operating System" },
  "navegador": { classe: "Substantivo masculino", significados: ["Programa usado para acessar sites na internet.", "Exemplos: Chrome, Firefox, Edge, Safari."], origem: "Latim: navigare" },
  "site": { classe: "Substantivo masculino", significados: ["Conjunto de páginas acessíveis pela internet.", "Pode ser informativo, comercial ou de serviços."], origem: "Inglês: sítio/local" },
  "dominio": { classe: "Substantivo masculino", significados: ["Endereço principal de um site, ex: tosh-tech.com.br.", "Nome que identifica sua marca na rede."], origem: "Latim: dominium" },
  "hospedagem": { classe: "Substantivo feminino", significados: ["Serviço que guarda os arquivos do site para ficar online.", "Aluguel de espaço em servidor conectado 24h."], origem: "Latim: hospitare" },
  "url": { classe: "Substantivo feminino", significados: ["Endereço completo de uma página ou arquivo.", "Exemplo: https://tosh-tech.com.br/sobre"], origem: "Inglês: Uniform Resource Locator" },
  "protocolo http": { classe: "Expressão substantiva", significados: ["Regra básica de troca de dados entre navegador e site.", "Versão sem segurança."], origem: "Inglês: Hypertext Transfer Protocol" },
  "protocolo https": { classe: "Expressão substantiva", significados: ["Versão segura do HTTP, com dados criptografados.", "Símbolo do cadeado na barra de endereço."], origem: "Inglês: Hypertext Transfer Protocol Secure" },
  "certificado ssl": { classe: "Expressão substantiva", significados: ["Documento que confirma a identidade do site e ativa a segurança.", "Necessário para funcionar com HTTPS."], origem: "Inglês: Secure Sockets Layer" },
  "firewall": { classe: "Substantivo masculino", significados: ["Sistema que bloqueia acessos perigosos ao servidor.", "Filtra dados que entram e saem da rede."], origem: "Inglês: parede contra fogo" },
  "antivirus": { classe: "Substantivo masculino", significados: ["Programa que detecta e remove vírus e ameaças.", "Protege arquivos e o sistema."], origem: "Português: anti + vírus" },
  "malware": { classe: "Substantivo masculino", significados: ["Nome geral para qualquer software daninho.", "Inclui vírus, trojans e spyware."], origem: "Inglês: Malicious Software" },
  "virus": { classe: "Substantivo masculino", significados: ["Programa que se espalha e danifica arquivos ou sistemas.", "Precisa de ação do usuário para se espalhar."], origem: "Latim: veneno" },
  "ransomware": { classe: "Substantivo masculino", significados: ["Vírus que tranca arquivos e pede resgate para liberar.", "Um dos tipos mais perigosos de ameaça."], origem: "Inglês: resgate + software" },
  "phishing": { classe: "Substantivo masculino", significados: ["Golpe que engana para roubar senhas e dados pessoais.", "Usa páginas falsas parecidas com as oficiais."], origem: "Inglês: pescar dados" },
  "backup": { classe: "Substantivo masculino", significados: ["Cópia de segurança dos seus arquivos importantes.", "Salva em outro local para recuperar se perder."], origem: "Inglês: cópia de segurança" },
  "nuvem": { classe: "Substantivo feminino", significados: ["Armazenamento de arquivos na internet, não no seu aparelho.", "Acessa de qualquer lugar conectado."], origem: "Inglês: cloud" },
  "login": { classe: "Substantivo masculino", significados: ["Ação de entrar na conta com usuário e senha.", "Processo de identificação no sistema."], origem: "Inglês: entrar no sistema" },
  "logout": { classe: "Substantivo masculino", significados: ["Ação de sair da conta para proteger o acesso.", "Encerramento da sessão."], origem: "Inglês: sair do sistema" },
  "senha": { classe: "Substantivo feminino", significados: ["Sequência secreta que garante que só você entra na conta.", "Deve ser forte e não compartilhada."], origem: "Latim: signum" },
  "autenticacao dois fatores": { classe: "Expressão substantiva", significados: ["Segurança extra: além da senha, pede um código temporário.", "Muito mais seguro que só senha."], origem: "Português: autenticação + dois fatores" },
  "criptografia": { classe: "Substantivo feminino", significados: ["Transformar dados em código para só quem tem a chave entenda.", "Essencial para senhas e pagamentos."], origem: "Grego: kryptos + graphein" },
  "chave publica": { classe: "Expressão substantiva", significados: ["Código aberto usado para criptografar dados.", "Funciona junto com uma chave privada secreta."], origem: "Português: chave + pública" },
  "chave privada": { classe: "Expressão substantiva", significados: ["Código secreto que só você tem, usado para decifrar dados.", "Nunca deve ser compartilhada."], origem: "Português: chave + privada" },
  "cookie": { classe: "Substantivo masculino", significados: ["Pequeno dado que o site salva no seu navegador.", "Lembra preferências e sessão de login."], origem: "Inglês: biscoito" },
  "cache": { classe: "Substantivo masculino", significados: ["Armazenamento temporário de dados para carregar mais rápido.", "Evita baixar informações repetidas."], origem: "Inglês: esconderijo" },
  "bug": { classe: "Substantivo masculino", significados: ["Erro ou falha no funcionamento de um programa.", "Impede que funcione como deveria."], origem: "Inglês: inseto" },
  "correcao": { classe: "Substantivo feminino", significados: ["Ajuste feito para resolver um erro ou falha.", "Melhoria no código."], origem: "Latim: corrigere" },
  "atualizacao": { classe: "Substantivo feminino", significados: ["Nova versão com correções e funções novas.", "Deixa o sistema mais seguro e completo."], origem: "Latim: actualis" },
  "versao": { classe: "Substantivo feminino", significados: ["Número que identifica a edição do programa.", "Exemplo: Tosh Tech v2.5.0"], origem: "Latim: versio" },
  "beta": { classe: "Substantivo masculino", significados: ["Versão de teste antes do lançamento oficial.", "Pode ter erros que serão corrigidos depois."], origem: "Grego: segunda letra do alfabeto" },
  "estavel": { classe: "Adjetivo", significados: ["Versão que já foi testada e funciona sem falhas graves.", "Recomendada para uso diário."], origem: "Latim: stabilis" },
  "desenvolvimento": { classe: "Substantivo masculino", significados: ["Fase de criação e teste de novas funções.", "Alterações frequentes e instáveis."], origem: "Latim: desevolvere" },
  "codigo aberto": { classe: "Expressão substantiva", significados: ["Programa onde todo o código é visível e pode ser modificado.", "Exemplo: Linux, Node.js."], origem: "Português: código + aberto" },
  "licenca": { classe: "Substantivo feminino", significados: ["Regras que definem como você pode usar o software.", "Pode ser gratuito ou pago."], origem: "Latim: licentia" },
  "direitos autorais": { classe: "Expressão substantiva", significados: ["Lei que protege a criação original do desenvolvedor.", "Proíbe cópias não autorizadas."], origem: "Português: direitos + autor" },
  "plano gratuito": { classe: "Expressão substantiva", significados: ["Serviço sem custo, com funções limitadas.", "Ideal para testar antes de contratar."], origem: "Português: plano + gratuito" },
  "plano pago": { classe: "Expressão substantiva", significados: ["Serviço com custo mensal ou anual, funções completas.", "Sem limites e com suporte prioritário."], origem: "Português: plano + pago" },
  "assinatura": { classe: "Substantivo feminino", significados: ["Pagamento recorrente para manter acesso ao serviço.", "Renova automaticamente até cancelar."], origem: "Latim: subscribere" },
  "vencimento": { classe: "Substantivo masculino", significados: ["Data final do acesso ao plano ou serviço.", "Após essa data, funções extras são bloqueadas."], origem: "Latim: vincere" },
  "suporte": { classe: "Substantivo masculino", significados: ["Ajuda para resolver problemas ou tirar dúvidas.", "Pode ser por chat, email ou telefone."], origem: "Latim: supportare" },
  "tutorial": { classe: "Substantivo masculino", significados: ["Guia passo a passo para ensinar a usar algo.", "Vídeo ou texto explicativo."], origem: "Inglês: ensinar" },
  "documentacao": { classe: "Substantivo feminino", significados: ["Texto oficial com todas as regras e funções da ferramenta.", "Referência completa para desenvolvedores."], origem: "Latim: documentum" },
  "manual": { classe: "Substantivo masculino", significados: ["Guia simples de uso para usuários.", "Explica como usar as funções básicas."], origem: "Latim: manus" },
  "comunidade": { classe: "Substantivo feminino", significados: ["Grupo de pessoas que usam e ajudam a melhorar o projeto.", "Troca de dicas e soluções entre usuários."], origem: "Latim: communitas" },
  "forum": { classe: "Substantivo masculino", significados: ["Espaço online para discussões e perguntas.", "Perguntas antigas ficam salvas para consulta."], origem: "Latim: foro público" },
  "github": { classe: "Substantivo masculino", significados: ["Plataforma para guardar código e trabalhar em equipe.", "Usado por quase todos os projetos de tecnologia."], origem: "Inglês: repositório Git" },
  "repositorio": { classe: "Substantivo masculino", significados: ["Pasta onde ficam todos os arquivos do projeto.", "Salva cada alteração feita no código."], origem: "Latim: repositorium" },
  "versao de controle": { classe: "Expressão substantiva", significados: ["Sistema que salva todas as alterações feitas no código.", "Permite voltar para versões antigas se precisar."], origem: "Português: versão + controle" },
  "git": { classe: "Substantivo masculino", significados: ["Ferramenta mais usada para controle de versões.", "Funciona junto com o GitHub."], origem: "Inglês: troca de dados" },
  "branch": { classe: "Substantivo feminino", significados: ["Linha separada de desenvolvimento para testar novidades.", "Não afeta o código principal até ser aprovado."], origem: "Inglês: ramo" },
  "merge": { classe: "Substantivo masculino", significados: ["Juntar as alterações de uma branch com o código principal.", "Unir as melhorias testadas."], origem: "Inglês: juntar" },
  "erro 404": { classe: "Expressão substantiva", significados: ["Página não encontrada: o endereço não existe ou foi movido.", "Código de resposta do servidor."], origem: "Inglês: código de resposta HTTP" },
  "erro 500": { classe: "Expressão substantiva", significados: ["Erro interno no servidor: problema no código ou configuração.", "Precisa de ajuste da equipe de desenvolvimento."], origem: "Inglês: código de resposta HTTP" },
  "requisicao": { classe: "Substantivo feminino", significados: ["Pedido que o navegador ou app envia para o servidor.", "Exemplo: pedir para baixar um vídeo."], origem: "Latim: requirere" },
  "resposta": { classe: "Substantivo feminino", significados: ["Dados que o servidor envia de volta após a requisição.", "Pode ser sucesso ou mensagem de erro."], origem: "Latim: respondere" },
  "limite de requisicoes": { classe: "Expressão substantiva", significados: ["Quantas vezes você pode chamar a API por minuto/dia.", "Controla o uso para não sobrecarregar o sistema."], origem: "Português: limite + requisições" },
  "consumo": { classe: "Substantivo masculino", significados: ["Quantidade de recursos usados: dados, processador ou requisições.", "Controle do que cada plano permite."], origem: "Latim: consumere" },
  "disco": { classe: "Substantivo masculino", significados: ["Espaço de armazenamento usado no servidor.", "Arquivos, logs e dados salvos."], origem: "Latim: discus" },
  "largura de banda": { classe: "Expressão substantiva", significados: ["Quantidade de dados que pode ser enviada por segundo.", "Define a velocidade de download e upload."], origem: "Português: largura + banda" },
  "latencia": { classe: "Substantivo feminino", significados: ["Tempo que leva para um dado ir até o servidor e voltar.", "Quanto menor, mais rápido funciona."], origem: "Latim: latens" },
  "tempo de atividade": { classe: "Expressão substantiva", significados: ["Tempo percentual que o servidor fica online.", "Bons serviços garantem 99,9% de atividade."], origem: "Português: tempo + atividade" },
  "manutencao": { classe: "Substantivo feminino", significados: ["Período de ajustes e melhorias no sistema.", "Pode ficar temporariamente indisponível."], origem: "Latim: manutenere" },
  "backup automatico": { classe: "Expressão substantiva", significados: ["Cópia de segurança feita sozinha em horários definidos.", "Protege contra perda acidental."], origem: "Português: backup + automático" },
  "restaurar": { classe: "Verbo", significados: ["Voltar os dados para como estavam em uma cópia de segurança.", "Resolver problema de perda ou erro."], origem: "Latim: restaurare" },
  "migracao": { classe: "Substantivo feminino", significados: ["Mover dados e arquivos de um servidor para outro.", "Mudar de hospedagem sem perder nada."], origem: "Latim: migrare" },
  "dominio proprio": { classe: "Expressão substantiva", significados: ["Endereço personalizado com a sua marca, ex: app.tosh-tech.com.br.", "Passa mais profissionalismo e confiança."], origem: "Português: domínio + próprio" },
  "subdominio": { classe: "Substantivo masculino", significados: ["Endereço secundário do seu domínio principal.", "Exemplo: api.tosh-tech.com.br"], origem: "Português: sub + domínio" },
  "redirecionamento": { classe: "Substantivo masculino", significados: ["Mandar quem acessa um endereço antigo para o novo.", "Não perde visitas nem links salvos."], origem: "Latim: dirigere" },
  "seo": { classe: "Substantivo masculino", significados: ["Técnicas para aparecer melhor nas buscas do Google.", "Faz mais pessoas encontrarem seu site."], origem: "Inglês: Search Engine Optimization" },
  "palavra chave": { classe: "Expressão substantiva", significados: ["Termos que as pessoas buscam para encontrar seu serviço.", "Base da otimização para buscas."], origem: "Português: palavra + chave" },
  "analitica": { classe: "Substantivo feminino", significados: ["Dados sobre quem visita e como usa o sistema.", "Mostra o que está funcionando melhor."], origem: "Grego: analitikos" },
  "estatistica": { classe: "Substantivo feminino", significados: ["Números e resumos do uso da plataforma.", "Ajuda a tomar decisões com dados reais."], origem: "Grego: statistikós" },
  "grafico": { classe: "Substantivo masculino", significados: ["Visualização simples dos dados, como barras ou linhas.", "Facilita entender as informações rapidamente."], origem: "Grego: graphikos" },
  "painel": { classe: "Substantivo masculino", significados: ["Tela principal com resumo e acesso rápido às funções.", "Exemplo: Painel Administrativo Tosh Tech."], origem: "Latim: pannus" },
  "interface": { classe: "Substantivo feminino", significados: ["Parte visual que o usuário vê e usa.", "Deve ser simples e fácil de entender."], origem: "Grego: inter + facere" },
  "design": { classe: "Substantivo masculino", significados: ["Aparência, cores e organização visual.", "Identidade visual da marca Tosh Tech."], origem: "Inglês: projeto" },
  "usabilidade": { classe: "Substantivo feminino", significados: ["Quão fácil e intuitivo é usar o sistema.", "Sistemas bons tem alta usabilidade."], origem: "Inglês: facilidade de uso" }
};

//➪ Função De Busca Completa
async function buscarSignificado(palavra) {
try {
if (!palavra || typeof palavra !== 'string') return null;
    
//➪ Limpa caracteres inválidos e formata
let termoLimpo = palavra.trim().toLowerCase();
termoLimpo = termoLimpo.replace(/^[^a-záàâãéèêíïóôõöúçñ]/, '');
termoLimpo = termoLimpo.replace(/[^a-záàâãéèêíïóôõöúçñ\s]/g, '');
    
if (termoLimpo.length < 2) return null;

const chaveCache = termoLimpo;
if (CACHE_DIC[chaveCache]) {
const cache = CACHE_DIC[chaveCache];
if (Date.now() - cache.tempo < CONFIG.tempoCache) return cache.dados;
}

//➪ Busca exata primeiro
if (DICIONARIO_TOSH[termoLimpo]) {
const dados = DICIONARIO_TOSH[termoLimpo];
const resultado = {
palavra: termoLimpo,
classe: dados.classe,
significados: dados.significados,
origem: dados.origem,
fonte: 'Dicionário Tosh Tech',
busca_completa: `https://www.dicio.com.br/${encodeURIComponent(termoLimpo)}/`
};
CACHE_DIC[chaveCache] = { tempo: Date.now(), dados: resultado };
return resultado;
}

//➪ Busca parcial se não encontrar exato
let encontrados = [];
for (const termo in DICIONARIO_TOSH) {
if (termo.includes(termoLimpo)) {
encontrados.push({
termo: termo,
classe: DICIONARIO_TOSH[termo].classe,
significado_principal: DICIONARIO_TOSH[termo].significados[0]
});
}
}

if (encontrados.length > 0) {
return {
palavra: termoLimpo,
aviso: "Palavra não encontrada exatamente, veja termos relacionados:",
relacionados: encontrados.slice(0, 3),
busca_completa: `https://www.dicio.com.br/${encodeURIComponent(termoLimpo)}/`
};
}

//➪ Retorno genérico com links
return {
palavra: termoLimpo,
aviso: "Palavra não cadastrada no dicionário interno.",
busca_completa: `https://www.dicio.com.br/${encodeURIComponent(termoLimpo)}/`,
significado_geral: "Consulte o link acima para ver o significado completo em dicionário oficial." };
} catch (erro) {
console.warn('[DICIONÁRIO]', erro.message);
return {
palavra: String(palavra || '').trim(),
erro: 'Não foi possível processar a busca' };
}
}

module.exports = { buscarSignificado };
