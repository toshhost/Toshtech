/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Criador『Tosh』༻
➪ Site Tosh Tech 
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
//➪ pacotes
const fs = require('fs');//➪ Manipula arquivos
const path = require('path');//➪ Cria caminhos de pasta corretos
const express = require('express');//➪ Cria o servidor web
const axios = require('axios');//➪ Faz requisições externas
const fetch = require('node-fetch');//➪ Outra forma de fazer requisições
const multer = require('multer');//➪ para upload de arquivo 
const cors = require('cors');//➪ Libera acesso de origens diferentes 
const session = require('express-session');//➪ Lembra da sessão import sem precisar do navegador  
const bcrypt = require('bcryptjs');//➪ Criptografa json
const cookieParser = require('cookie-parser');//➪ salva cokies por um ano no navegador 
const crypto = require('crypto');//➪ Gera códigos únicos para nomes curtos e sem duplicatas
const { createProxyMiddleware } = require('http-proxy-middleware');//➪ Proxy Tosh Tech
const url = require('url');//➪ Serve para trabalhar com endereço de site 
const http = require('http');//➪ Manipula requisições http
const https = require('https');//➪ Manipula requisições seguras https
const { pipeline } = require('stream');//➪ Transmite dados sem salvar arquivos temporários
const ytdl = require('ytdl-core');//➪ Baixa dados diretamente do YouTube
const { exec } = require('child_process');//➪ Caminho do conversor de mídia
const ffmpeg = require('fluent-ffmpeg');//➪ Interface para usar o conversor
const { MercadoPagoConfig, Payment } = require('mercadopago');//➪ Receber Pagamentos
const mongoose = require('mongoose');


//➪ Início app
const app = express();

//➪ Porta do site 
const PORTA = 2031;

//➪ Cabeçalho Proxy
app.set('trust proxy', true);

//➪ Configurações básicas
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors());
app.use(cookieParser());

app.use(session({
secret: 'tosh_tech_segredo_exclusivo_2026',
resave: false,
saveUninitialized: true,
name: 'tosh_session',
cookie: {
secure: process.env.NODE_ENV === 'production',//➪ Automático: true 
httpOnly: true,
sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', 
maxAge: 7 * 24 * 60 * 60 * 1000//➪  7 dias
},
rolling: true,
unset: 'keep'
}));

app.use((req, res, next) => {
res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Headers', 'Content-Type, tosh_tech');
res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
if (req.method === 'OPTIONS') return res.sendStatus(200);
next();
});

//➪ Statics
app.use('/assets', express.static(path.join(__dirname, 'public', 'assets')));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/static', express.static(path.join(__dirname, 'static')));

//➪ Arquivos
app.get("/logo", (req, res) => {
const TechLogo = path.join(__dirname, 'static', 'logo', 'tech.jpg');
res.sendFile(TechLogo);
});

app.get("/avatar1", (req, res) => {
const Techbord = path.join(__dirname, 'static', 'logo', 'avatar1.jpg');
res.sendFile(Techbord);
});

app.get("/avatar2", (req, res) => {
const Techbord = path.join(__dirname, 'static', 'logo', 'avatar2.jpg');
res.sendFile(Techbord);
});

app.get("/docbord", (req, res) => {
const Techbord = path.join(__dirname, 'static', 'logo', 'tech.mp4');
res.sendFile(Techbord);
});

//➪ Uploads 
app.use('/upload', express.static(path.join(__dirname, 'upload')));

app.use('/upload/perfil', express.static(path.join(__dirname, 'upload', 'perfil')));

app.use('/upload/parcerias', express.static(path.join(__dirname, 'upload', 'parcerias')));

//➪ Confirmação de dono 
const Donoconfig = path.join(__dirname, 'utils', 'config.json');
const configDados = require(Donoconfig);
app.get('/api/config', (req, res) => res.json(configDados));

//➪ Documentação
app.get("/tutorial1", (req, res) => {
const Techbord = path.join(__dirname, 'static', 'logo', 'login.mp4');
res.sendFile(Techbord);
});

app.get("/tutorial2", (req, res) => {
const Techbord = path.join(__dirname, 'static', 'logo', 'cadastro.mp4');
res.sendFile(Techbord);
});

app.get("/tutorial3", (req, res) => {
const Techbord = path.join(__dirname, 'static', 'logo', 'opcao.jpg');
res.sendFile(Techbord);
});

app.get("/tutorial4", (req, res) => {
const Techbord = path.join(__dirname, 'static', 'logo', 'analise.jpg');
res.sendFile(Techbord);
});

app.get("/tutorial5", (req, res) => {
const Techbord = path.join(__dirname, 'static', 'logo', 'analise2.jpg');
res.sendFile(Techbord);
});

app.get("/tutorial6", (req, res) => {
const Techbord = path.join(__dirname, 'static', 'logo', 'aprovado.jpg');
res.sendFile(Techbord);
});

app.get("/tutorial7", (req, res) => {
const Techbord = path.join(__dirname, 'static', 'logo', 'logoperfil.mp4');
res.sendFile(Techbord);
});

app.get("/tutorial8", (req, res) => {
const Techbord = path.join(__dirname, 'static', 'logo', 'key.mp4');
res.sendFile(Techbord);
});

app.get("/meuqr", (req, res) => {
const Techbord = path.join(__dirname, 'static', 'logo', 'ConversaTosh.jpg');
res.sendFile(Techbord);
});

app.get("/paginast", (req, res) => {
const Techbord = path.join(__dirname, 'static', 'logo', 'paginast.jpg');
res.sendFile(Techbord);
});

app.get("/agentestest", (req, res) => {
const Techbord = path.join(__dirname, 'static', 'logo', 'agentestest.jpg');
res.sendFile(Techbord);
});

app.get("/tosh", (req, res) => {
const Techbord = path.join(__dirname, 'static', 'logo', 'meuperfil.jpg');
res.sendFile(Techbord);
});

app.get('/toshstream', (req, res) => {
  const Techbord = path.join(__dirname, 'static', 'logo', 'logostream.jpg');
  res.sendFile(Techbord);
});

//➪ visitantes 
const pastaUtils = path.join(__dirname, 'utils');
const arquivoVisitas = path.join(pastaUtils, 'visitas.json');
if (!fs.existsSync(pastaUtils)) {
try {
fs.mkdirSync(pastaUtils, { recursive: true });
console.log('Pasta "utils" criada automaticamente!');
} catch (erro) {
console.error('Erro ao criar pasta utils:', erro);
}}

//➪ Recados 
const CAMINHO_RECADOS = path.join(__dirname, 'utils', 'recados.json');

//➪ Função auxiliar para carregar recados
const carregarRecados = () => {
try {
if(!fs.existsSync(CAMINHO_RECADOS)) {
fs.writeFileSync(CAMINHO_RECADOS, JSON.stringify({lista:[]}, null, 2));
return {lista:[]};
}
return JSON.parse(fs.readFileSync(CAMINHO_RECADOS, 'utf-8'));
} catch { return {lista:[]}; }
};

//➪ Função Para Ler O Total Salvo
function lerVisitas() {
try {
if (fs.existsSync(arquivoVisitas)) {
const dados = fs.readFileSync(arquivoVisitas, 'utf8');
return JSON.parse(dados).total || 1251; 
}
salvarVisitas(1251);
return 1251;
} catch {
salvarVisitas(1251);
return 1251;
}}
function salvarVisitas(total) {
try {
fs.writeFileSync(arquivoVisitas, JSON.stringify({ total }, null, 2), 'utf8');
} catch (erro) {
console.error('Erro ao salvar visitas:', erro);
}}
app.get('/api/visitas', (req, res) => {
let total = lerVisitas();
total++; //➪ Aumenta 1 para cada novo acesso
salvarVisitas(total);
res.json({ total });
});

//➪ Função para pegar buffer de imagem
async function getBuffer(url) {
const resposta = await axios.get(url, { responseType: 'arraybuffer' });
return Buffer.from(resposta.data, 'binary');
}

//➪ Remove qualquer tag HTML
function limparLink(linkSujo) {
if (!linkSujo || typeof linkSujo !== 'string') return '';
let limpo = linkSujo.replace(/<[^>]*>/g, '');
const match = limpo.match(/https?:\/\/[^\s"'<>]+/);
return match ? match[0] : '';
}

//➪ Configurações do GitHub (Utiliza o token da variável de ambiente ou o padrão informado)
const GITHUB_REPO = 'toshhost/Toshtech';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

//➪ Caminhos globais
global.Raiz_Tech = process.cwd();

//➪ caminho  do banco de dados 
const TechMembros = path.join(Raiz_Tech, 'Dono', 'membros.json');

//➪ caminho  de pedidos 
const PEDIDOS_FILE = path.join(Raiz_Tech, 'Dono', 'pedidos.json');

//➪ caminho  dos temas 
const pastaTemas = path.join(Raiz_Tech, 'public', 'assets', 'temas');

//➪ caminho  das logs console 
const pastaLogs = path.join(Raiz_Tech, 'Dono', 'console.json');

//➪ caminho  das logs de segurança 
const ARQUIVO_LOGS = path.join(Raiz_Tech, 'Dono', 'logs.json');

//➪ caminho  da IA
const caminhoSuporte = path.join(Raiz_Tech, 'utils', 'suporte');
const { responderSuporte } = require(caminhoSuporte); // ⬅️ USA DEPOIS ✅

//➪ Enviar email 
const enviarConfirmacao = path.join(Raiz_Tech, 'utils', 'enviarconfirmacao');
/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Módulos『Pesquisa』༻
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
const caminhoytpesquisa = path.join(Raiz_Tech, 'banco_dados', 'pesquisas',  'ytpesquisa');
const { ytSearch } = require(caminhoytpesquisa);

const caminhoFilmes = path.join(Raiz_Tech, 'banco_dados', 'pesquisas',  'filmeseseries');
const { buscarFilmes } = require(caminhoFilmes);

const caminhoNoticias = path.join(Raiz_Tech, 'banco_dados', 'pesquisas',  'noticias');
const { buscarNoticias } = require(caminhoNoticias)

const caminhoCotacaomoeda = path.join(Raiz_Tech, 'banco_dados', 'pesquisas',  'cotacaomoeda');
const { converterMoeda } = require(caminhoCotacaomoeda)

const caminhoDicionario = path.join(Raiz_Tech, 'banco_dados', 'pesquisas',  'dicionario');
const { buscarSignificado } = require(caminhoDicionario)

const caminhoClima = path.join(Raiz_Tech, 'banco_dados', 'pesquisas',  'clima');
const { buscarClima } = require(caminhoClima)

const caminhoAmazon = path.join(Raiz_Tech, 'banco_dados', 'pesquisas',  'Amazon');
const { amazonSearch } = require(caminhoAmazon)
/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Módulos『frases』༻
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
const caminhoFrasesamor = path.join(Raiz_Tech, 'banco_dados', 'frases',  'frasesamor');
const { fraseAmor } = require(caminhoFrasesamor)

const caminhoPensador = path.join(Raiz_Tech, 'banco_dados', 'frases',  'pensador');
const { pensadorSearch } = require(caminhoPensador)

const caminhoBebe = path.join(Raiz_Tech, 'banco_dados', 'frases',  'bebe');
const { fraseBebe } = require(caminhoBebe)

const caminhoBiblia = path.join(Raiz_Tech, 'banco_dados', 'frases',  'biblia');
const { fraseBiblia } = require(caminhoBiblia)

const caminhoCantadas = path.join(Raiz_Tech, 'banco_dados', 'frases',  'cantadas');
const { fraseCantada } = require(caminhoCantadas)

const caminhoPiadas = path.join(Raiz_Tech, 'banco_dados', 'frases',  'piadas');
const { piada } = require(caminhoPiadas)
/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Módulos『Downloads』༻
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
const caminhoYoutube = path.join(Raiz_Tech, 'banco_dados', 'downloads',  'youtube');
const { ytMp3, ytMp4 } = require(caminhoYoutube);

const caminhoPinterest = path.join(Raiz_Tech, 'banco_dados', 'downloads',  'pinterest');
const { buscarPinterest } = require(caminhoPinterest);

const caminhoMediafire = path.join(Raiz_Tech, 'banco_dados', 'downloads',  'mediafire');
const { mediafireDl } = require(caminhoMediafire);

const caminhoGimage = path.join(Raiz_Tech, 'banco_dados', 'downloads',  'gimage');
const { gis } = require(caminhoGimage);

const caminhoPlayStore = path.join(Raiz_Tech, 'banco_dados', 'downloads',  'playstory');
const { playStoreSearch } = require(caminhoPlayStore);
/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Módulos『Inteligência artificial』༻
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
const caminhostreamImagem = path.join(Raiz_Tech, 'banco_dados', 'inteligencia_artificial',  'imagem');
const { imagemAi, stickAi } = require(caminhostreamImagem);

const caminhoschatgbt = path.join(Raiz_Tech, 'banco_dados', 'inteligencia_artificial',  'chatgbt');
const { chatIA } = require(caminhoschatgbt);

const caminhostreamVoz = path.join(Raiz_Tech, 'banco_dados', 'inteligencia_artificial',  'voz');
const { gerarVoz } = require(caminhostreamVoz);

const caminhoTahta = path.join(Raiz_Tech, 'banco_dados', 'inteligencia_artificial',  'tatha');
const { tahta } = require(caminhoTahta);
/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Módulos『Polical』༻
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
const caminhopolitica = path.join(Raiz_Tech, 'banco_dados', 'polica',  'lulaFlix');
const { lulaFlix } = require(caminhopolitica);

const caminhoPl = path.join(Raiz_Tech, 'banco_dados', 'polica',  'pl');
const { partidoLiberal } = require(caminhoPl);

const caminhoPT = path.join(Raiz_Tech, 'banco_dados', 'polica',  'pt');
const { partidoDosTrabalhadores } = require(caminhoPT);

const caminhoCongresso = path.join(Raiz_Tech, 'banco_dados', 'polica',  'agenda_congresso');
const { agendaCongresso } = require(caminhoCongresso);

const caminhoLeis = path.join(Raiz_Tech, 'banco_dados', 'polica',  'projetos_leis');
const { projetosLeis } = require(caminhoLeis);
/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Módulos『Memes』༻
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
const caminhoMeme = path.join(Raiz_Tech, 'banco_dados', 'memes',  'animememe.json');
const { animememe } = require(caminhoMeme);

const caminhoMemevid = path.join(Raiz_Tech, 'banco_dados', 'memes',  'memes');
const { TERMOS_BUSCA, termoAleatorio } = require(caminhoMemevid);

const caminhoMemeaud = path.join(Raiz_Tech, 'banco_dados', 'memes',  'audiomemes');
const { TERMOS_AUDIO_MEME, termoAudioAleatorio } = require(caminhoMemeaud);
/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Módulos『Edts』༻
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
const caminhoEditsyt = path.join(Raiz_Tech, 'banco_dados', 'edts',  'edtsyutubers');
const { TERMOS_YOUTUBER_EDIT, termoYoutuberAleatorio } = require(caminhoEditsyt);

const caminhoEdits = path.join(Raiz_Tech, 'banco_dados', 'edts',  'edits.json');
const { edts } = require(caminhoEdits);

const caminhoEditsff = path.join(Raiz_Tech, 'banco_dados', 'edts',  'freefire.json');
const { freefire } = require(caminhoEditsff);

const caminhoEditsjujst = path.join(Raiz_Tech, 'banco_dados', 'edts',  'editsjujutsu.json');
const { editsjujutsu } = require(caminhoEditsjujst);

const caminhoEditsnaruto = path.join(Raiz_Tech, 'banco_dados', 'edts',  'editsnaruto.json');
const { editsnaruto } = require(caminhoEditsnaruto);
/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Módulos『Canvas』༻
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
//➪ Caminho — igual ao seu exemplo
const caminhoCanvaBemVindo = path.join(Raiz_Tech, 'banco_dados', 'canvas', 'canvaBemVindo');
const { canvaBemVindo, canvaBemVindo2,
 canvaBemVindo3, loadImageBuffer } = require(caminhoCanvaBemVindo);
 
 //➪ Caminho — igual ao seu exemplo
const caminhoCardMusica = path.join(Raiz_Tech, 'banco_dados', 'canvas', 'Cadmusica');
const { canvaMusicCard, canvaMusicCard2, canvaMusicCard3, loadImageBuffer2, desenharTextoComContorno, cortarTexto  } = require(caminhoCardMusica);

 //➪ Caminho — igual ao seu exemplo
const caminhoCardLevel = path.join(Raiz_Tech, 'banco_dados', 'canvas', 'Canvaslevel');
const { canvaLevel,canvaLevelGold,canvaLevelFire } = require(caminhoCardLevel);

 //➪ Caminho — igual ao seu exemplo
const caminhoCardDuelo = path.join(Raiz_Tech, 'banco_dados', 'canvas', 'Canvasduelo');
const { canvaDueloCyber, canvaDueloRoyal, canvaDueloInferno } = require(caminhoCardDuelo);

 //➪ Caminho — igual ao seu exemplo
const caminhoCardCasal = path.join(Raiz_Tech, 'banco_dados', 'canvas', 'Canvascasal');
const { canvaCasalEterno, canvaCasalDourado, canvaCasalPaixao } = require(caminhoCardCasal);

 //➪ Caminho — igual ao seu exemplo
const caminhoCardPing = path.join(Raiz_Tech, 'banco_dados', 'canvas', 'Canvasping');
const { canvaPingAnime, canvaPingMotor, canvaPingTech } = require(caminhoCardPing);
/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Módulos『Efeitos』༻
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
const caminhoEfeitos = path.join(Raiz_Tech, 'banco_dados', 'Efeitos', 'lgbt_pixels_anime');
const { canvaOrgulho, canvaPixel, canvaAnime  } = require(caminhoEfeitos);

const caminhoEfeito = path.join(Raiz_Tech, 'banco_dados', 'Efeitos', 'narcizista_cadeia_pretobranco');
const { canvaGrade, canvaNarcisista, canvaPretoBranco } = require(caminhoEfeito);

const caminhoEfeitoss = path.join(Raiz_Tech, 'banco_dados', 'Efeitos', 'tv_matador');
const { canvaProcurado, canvaNaTV } = require(caminhoEfeitoss);

const caminhoEfeitosss = path.join(Raiz_Tech, 'banco_dados', 'Efeitos', 'Facebook_whats_jornal');
const { canvaWhatsApp, canvaFacebook, canvaJornal } = require(caminhoEfeitosss);

//➪ Constantes de cargos
global.CARGOS = Object.freeze({
DONO: 'dono',
ADM: 'adm',
SUPORTE: 'suporte',
USUARIO: 'cliente'
});

//➪ Ler e criar pasta tema 
const temasDisponiveis = fs.existsSync(pastaTemas) ? fs.readdirSync(pastaTemas).filter(nome => fs.statSync(path.join(pastaTemas, nome)).isDirectory()) : [];

//➪ Mapas
const temaUsuario = new Map();
const chavesGeradas = new Set();

//➪ Temas 
const TEMAS = [
{ id: "ToshTech", nome: "Tema ToshTech", valor: 0 },
{ id: "TemaClaro", nome: "Tema ToshTech Claro", valor: 5000 },
{ id: "Freefire", nome: "Tema Free Fire Pink", valor: 8000 }
];

//➪ Limpar 
const TEMPO_LIMPEZA = 5 * 60 * 1000;

//➪ Gera Id Único 
function gerarIdPedido() {
const agora = Date.now().toString(36).toUpperCase();
const aleatorio = Math.random().toString(36).substr(2, 9).toUpperCase();
return `Tosh-Tech${agora}-${aleatorio}`;
}

//➪ Planos e Patentes 
const PLANOS = [
  { nome: "Teste", valor: 0, minReq: 0, maxReq: 100, techCoins: 0, dias: 1 },
  { nome: "Iniciante", valor: 1.00, minReq: 101, maxReq: 300, techCoins: 300, dias: 3 },
  { nome: "Aprendiz", valor: 2.00, minReq: 301, maxReq: 500, techCoins: 500, dias: 7 },
  { nome: "Estagiário", valor: 3.50, minReq: 501, maxReq: 1000, techCoins: 1000, dias: 10 },
  { nome: "Desenvolvedor Júnior", valor: 5.00, minReq: 1001, maxReq: 2000, techCoins: 2000, dias: 15 },
  { nome: "Desenvolvedor Pleno", valor: 8.00, minReq: 2001, maxReq: 3500, techCoins: 3500, dias: 20 },
  { nome: "Desenvolvedor Sênior", valor: 12.00, minReq: 3501, maxReq: 5000, techCoins: 5000, dias: 25 },
  { nome: "Engenheiro de Software", valor: 20.00, minReq: 5001, maxReq: 8000, techCoins: 8000, dias: 30 },
  { nome: "Arquiteto de Sistemas", valor: 35.00, minReq: 8001, maxReq: 12000, techCoins: 12000, dias: 45 },
  { nome: "Mestre dos Códigos", valor: 60.00, minReq: 12001, maxReq: 15000, techCoins: 15000, dias: 60 },
  { nome: "Lendário da Tecnologia", valor: 100.00, minReq: 15001, maxReq: 30000, techCoins: 30000, dias: 90 },
  { nome: "Gênio da Computação", valor: 200.00, minReq: 30001, maxReq: 100000, techCoins: 100000, dias: 180 },
  { nome: "Criador de Tecnologias", valor: 500.00, minReq: 100001, maxReq: 999999999, techCoins: 999999999, dias: "♛ Plano Permanente" }
];

//➪ Encontra o plano correto pelo limite de requisições do usuário
function definirPlanoPorRequests(qtdRequests) {
qtdRequests = Number(qtdRequests) || 0;

//➪ Busca o plano onde o valor de requests se encaixa entre minReq e maxReq
const planoEncontrado = PLANOS.find(p => qtdRequests >= p.minReq && qtdRequests <= p.maxReq);
  
return planoEncontrado || PLANOS[0];
}

//➪ Calcula nível e patente na ordem exata e progressiva
function calcularNivelEPatente(qtdRequests) {
qtdRequests = Number(qtdRequests) || 0;
  
//➪ Obtém o plano atual
const plano = definirPlanoPorRequests(qtdRequests);
const nivel = plano.nome;

//➪ Mapeamento exato de Patente por Plano
let patente;
switch (nivel) {
case "Teste":
case "Beta":
patente = "⚝⚝⚝⚝"; //➪ Retorna a patente 'Beta' no plano Teste
break;
case "Iniciante":
patente = "✩✩✩✩✩✩✩✩✩";
break;
case "Aprendiz":
patente = "✩✩✩✩✩✩✩✩★";
break;
case "Estagiário":
patente = "✩✩✩✩✩✩✩★★";
break;
case "Desenvolvedor Júnior":
patente = "✩✩✩✩✩✩★★★";
break;
case "Desenvolvedor Pleno":
patente = "✩✩✩✩✩★★★★";
break;
case "Desenvolvedor Sênior":
patente = "✩✩✩✩★★★★★";
break;
case "Engenheiro de Software":
patente = "✩✩✩★★★★★★";
break;
case "Arquiteto de Sistemas":
patente = "✩✩★★★★★★★";
break;
case "Mestre dos Códigos":
patente = "✩★★★★★★★★";
break;
case "Lendário da Tecnologia":
patente = "★★★★★★★★★";
break;
case "Gênio da Computação":
patente = "♛♛♛♛♛♛♛♛♛";
break;
case "Criador de Tecnologias":
patente = "𖤍𖤍𖤍𖤍𖤍𖤍𖤍𖤍𖤍";
break;
default:
patente = "⚝⚝⚝⚝";
}
return { nivel, patente };
}

//➪ Encontra o plano correto pela quantidade de requisições
function definirPlanoPorRequests(qtdRequests) {
qtdRequests = Number(qtdRequests) || 0;
for (let i = PLANOS.length - 1; i >= 0; i--) {
if (qtdRequests >= PLANOS[i].minReq) return PLANOS[i];
}
return PLANOS[0];
}

function lerPedidos() {
try {
if (!fs.existsSync(PEDIDOS_FILE)) fs.writeFileSync(PEDIDOS_FILE, '[]', 'utf8');
return JSON.parse(fs.readFileSync(PEDIDOS_FILE, 'utf8'));
} catch { return []; }
}

function salvarPedido(dados) {
const lista = lerPedidos();
lista.push(dados);
fs.writeFileSync(PEDIDOS_FILE, JSON.stringify(lista, null, 2), 'utf8');
}

//➪ Configuração Mercado Pago
const MP_TOKEN = 'APP_USR-623263653633140-072516-5628edfadbf2a078d9a18b77564df46f-316332563';
const MP_URL = 'https://api.mercadopago.com/v1/payments';

//➪ Funções auxiliares
function limparEntrada(texto, isEmail = false) {
if (typeof texto !== 'string') return texto;
let limpo = texto.trim().replace(/[\x00-\x1F\x7F<>{}()$;`'"\\]/g, '').replace(/\r?\n|\r/g, ' ').substring(0, 150);
return isEmail ? limpo.toLowerCase() : limpo;
}

//➪ Proxy Sem Restrições
const configProxyPadrao = {
changeOrigin: true,//➪Altera origem para não ser bloqueado
secure: false,//➪ Aceita certificados autoassinados
followRedirects: true,//➪ Segue redirecionamentos automaticamente
timeout: 120000,//➪ Tempo limite de 2min para requisições lentas
proxyTimeout: 120000,
headers: {//➪ Simula navegador real, evita bloqueios de Google/Facebook/TikTok
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8'
}
};

//➪ Proxy Universal Acessa Qualquer Site/url
app.use('/proxy', (req, res, next) => {
try {
const partes = req.originalUrl.split('/proxy/');
const urlDestino = partes.length > 1 ? decodeURIComponent(partes[1]).trim() : '';

if (!urlDestino || !urlDestino.startsWith('http')) {
return res.status(400).json({
sucesso: false,
erro: 'Uso correto: /proxy/https://site.com.br/pagina' });
}

//➪ não quebra links com barras
createProxyMiddleware({
...configProxyPadrao,
target: urlDestino,
pathRewrite: { [`^/proxy/${encodeURIComponent(urlDestino)}`]: '' }
})(req, res, next);
} catch (erro) {
console.error('[PROXY UNIVERSAL] Erro:', erro.message);
res.status(500).json({ sucesso: false, erro: 'Falha ao processar solicitação' });
}
});

//➪ Cdn Livre Carrega Arquivos Estáticos Sem Bloqueio
app.use('/cdn-livre', (req, res, next) => {
try {
const partes = req.originalUrl.split('/cdn-livre/');
const urlDestino = partes.length > 1 ? decodeURIComponent(partes[1]).trim() : '';

if (!urlDestino || !urlDestino.startsWith('http')) {
return res.status(400).json({
sucesso: false,
erro: 'Uso correto: /cdn-livre/https://cdn.site.com/arquivo.css' });
}

createProxyMiddleware({
...configProxyPadrao,
target: urlDestino
})(req, res, next);
} catch (erro) {
console.error('[CDN LIVRE] Erro:', erro.message);
res.status(500).json({ sucesso: false, erro: 'Falha ao carregar arquivo' });
}
});

//➪ Api Livre — Acessa Rotas Externas
app.use('/api-livre', (req, res, next) => {
try {
const partes = req.originalUrl.split('/api-livre/');
const urlDestino = partes.length > 1 ? decodeURIComponent(partes[1]).trim() : '';
if (!urlDestino || !urlDestino.startsWith('http')) {
return res.status(400).json({
sucesso: false,
erro: 'Uso correto: /api-livre/https://api.site.com/rota' });
}

createProxyMiddleware({
...configProxyPadrao,
target: urlDestino
})(req, res, next);
} catch (erro) {
console.error('[API LIVRE] Erro:', erro.message);
res.status(500).json({ sucesso: false, erro: 'Falha ao acessar API' });
}
});

//➪ Função Pegar Ip Real Completa E Corrigida
function pegarIPReal(req) {
if (!req) return 'IP NÃO DETECTADO';

const cabecalhos = [
req.headers['cf-connecting-ip'],
req.headers['x-forwarded-for'],
req.headers['x-real-ip'],
req.headers['forwarded']
];

for (const valor of cabecalhos) {
if (valor) {
const ip = valor.split(',')[0].trim();
if (ip && ip !== '::1' && ip !== '::ffff:127.0.0.1') return ip;
}
}

//➪ Fallback seguro para Node 12+
const ipDireto = (req.socket && req.socket.remoteAddress) || (req.connection && req.connection.remoteAddress) || 'IP NÃO DETECTADO';
  
//➪ Trata IP local para ficar mais legível
if (ipDireto === '::1' || ipDireto === '::ffff:127.0.0.1') return '127.0.0.1 (Local)';
  
return ipDireto.replace(/^::ffff:/, '');
}

//➪ Middleware: Sobrescreve Ip Automaticamente Em Todas Rotas
app.use((req, res, next) => {
req.ip = pegarIPReal(req);
next();
});

//➪ Função De Registro De Logs 
function registrarLog(tipo = 'GERAL', mensagem = 'Sem mensagem', dados = {}) {
try {
if (!fs.existsSync(pastaLogs)) fs.mkdirSync(pastaLogs, { recursive: true });
const horario = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
const ipReal = dados.ip || 'IP NÃO DETECTADO';
const logTexto = `[${horario}] [${tipo}] ${mensagem} | IP: ${ipReal} | ${JSON.stringify(dados)}`;
console.log(`📝 ${logTexto}`);
const arquivoDiario = path.join(pastaLogs, `acessos_${new Date().toISOString().split('T')[0]}.log`);
fs.appendFileSync(arquivoDiario, logTexto + '\n', 'utf8');
let dadosJson = { logs: [], acessosPainel: [] };
if (fs.existsSync(ARQUIVO_LOGS)) {
try {
const lido = JSON.parse(fs.readFileSync(ARQUIVO_LOGS, 'utf8'));
dadosJson.logs = Array.isArray(lido.logs) ? lido.logs : [];
dadosJson.acessosPainel = Array.isArray(lido.acessosPainel) ? lido.acessosPainel : [];
} catch { 
dadosJson = { logs: [], acessosPainel: [] }; 
}}
dadosJson.logs.push(`[${horario}] [${tipo}] ${mensagem} | IP: ${ipReal}`);
if (tipo === 'ACESSO' && mensagem.includes('/painel')) {
const novoAcesso = {
data: horario,
email: limparEntrada(dados.usuario || 'ANÔNIMO'),
cargo: limparEntrada(dados.cargo || 'USUÁRIO'),
ip: ipReal
};
const jaExiste = dadosJson.acessosPainel.some(a => a.data === novoAcesso.data && a.email === novoAcesso.email);
if (!jaExiste) dadosJson.acessosPainel.push(novoAcesso);
}
fs.writeFileSync(ARQUIVO_LOGS, JSON.stringify(dadosJson, null, 2), 'utf8');
} catch (erro) { 
console.error('[❌ ERRO LOG]', erro.message); 
}
}

//➪ Leitura E Salvamento De Arquivos
function lerArquivo(caminho = TechMembros) {
try {
if (!fs.existsSync(caminho)) {
const pasta = path.dirname(caminho);
if (!fs.existsSync(pasta)) fs.mkdirSync(pasta, { recursive: true });
fs.writeFileSync(caminho, '{}', 'utf8');
return {};
}
return JSON.parse(fs.readFileSync(caminho, 'utf8'));
} catch (erro) {
console.error('[ARQUIVO] Erro leitura:', erro.message);
if (typeof registrarLog === 'function') {
registrarLog('ERRO', `Falha leitura: ${caminho}`, { erro: erro.message });
}
return {};
}
}

function salvarArquivo(dados, caminho = TechMembros) {
try {
if (typeof dados !== 'object' || dados === null) throw new Error('Dados inválidos');

//➪ Salva no disco local imediatamente
fs.writeFileSync(caminho, JSON.stringify(dados, null, 2), 'utf8');

//➪. Sincroniza em segundo plano com o GitHub sem travar a execução
if (caminho === TechMembros) {
(async () => {
try {
const caminhoRelativo = path.relative(global.Raiz_Tech || process.cwd(), caminho).replace(/\\/g, '/');
const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${caminhoRelativo}`;

const headers = {
'Authorization': `Bearer ${GITHUB_TOKEN}`,
'Accept': 'application/vnd.github.v3+json',
'User-Agent': 'ToshTech-API'
};

//➪ Obtém o SHA atual do arquivo no GitHub para atualizar
let sha = 'gardineyhenrique';
try {
const resGet = await axios.get(url, { headers });
sha = resGet.data.sha;
} catch (e) {}

//➪ Converte os dados em Base64 para envio
const contentBase64 = Buffer.from(JSON.stringify(dados, null, 2)).toString('base64');

//➪ Faz o commit automático
await axios.put(url, {
message: '🤖 [BOT] Atualização automática do banco membros.json',
content: contentBase64,
sha: sha || undefined
}, { headers });

console.log('[GITHUB] membros.json sincronizado com sucesso!');
} catch (erroGit) {
console.error('[GITHUB] Erro ao sincronizar:', erroGit.response ? erroGit.response.data.message : erroGit.message);
}
})();
}

return true;
} catch (erro) {
console.error('[ARQUIVO] Erro salvamento:', erro.message);
if (typeof registrarLog === 'function') {
registrarLog('ERRO', `Falha salvamento: ${caminho}`, { erro: erro.message });
}
return false;
}
}

//➪ Busca De Usuários
function buscarUsuario(email) {
const dados = lerArquivo(TechMembros);
return dados[String(email || '').toLowerCase().trim()] || null;
}

//➪ Busca Usuário Pela Api Key
function buscarUsuarioPorApiKey(apikey) {
try {
const todos = lerArquivo(TechMembros);
const chaveLimpa = String(apikey || '').trim();
if (!chaveLimpa) return 'API Key é necessária';
for (const email in todos) {
const usuario = todos[email];
if (String(usuario.apiKey || '').trim() === chaveLimpa) {
//➪ Valida Data Exata Só Avisa Se Venceu
const validade = usuario.validadePlano || '01/01/2100 23:59:59';
//➪ Separa Data E Hora
const [dataParte, horaParte] = validade.split(' ');
const [dia, mes, ano] = dataParte.split('/').map(Number);
const [hora, minuto, segundo] = (horaParte || '23:59:59').split(':').map(Number);
//➪ Cria As Datas Com Horário Exato
const dataValidade = new Date(ano, mes - 1, dia, hora, minuto, segundo);
const hoje = new Date();
//➪ Compara Data E Hora Completa
if (dataValidade <= hoje) {
return 'Plano expirado, utilize a página de planos para renovar';
}
//➪ Se Tudo Ok — Não Retorna Nada
return;
}
}
return 'API Key inválida';
} catch (erro) {
console.error('[VALIDAÇÃO]', erro.message);
return 'Erro ao verificar chave';
}
}

//➪ Utilitários
function calcularDiasCadastro(dataCadastro) {
if (!dataCadastro) return 0;
try {
const [data, hora] = dataCadastro.split(' ');
const [dia, mes, ano] = data.split('/');
const dt = new Date(`${ano}-${mes}-${dia}T${hora}`);
return isNaN(dt.getTime()) ? 0 : Math.floor((Date.now() - dt) / 86400000);
} catch { return 0; }
}

function gerarCaracteresAleatorios(n) {
const c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
return Array.from({ length: n }, () => c[Math.floor(Math.random() * c.length)]).join('');
}

function gerarApiKey() {
while (true) {
const apiKey = 'tosh-tech-' + Date.now().toString(36).toUpperCase() + '-' + gerarCaracteresAleatorios(8).toUpperCase();
if (!chavesGeradas.has(apiKey)) {
chavesGeradas.add(apiKey);
return apiKey;
}
}
}

setInterval(() => chavesGeradas.clear(), TEMPO_LIMPEZA);

//➪ Verificação De Validade E Plano COM Zeragem Adicionada
function verificarValidadePlano(emailUsuario) {
const emailLimpo = String(emailUsuario || '').toLowerCase().trim();
const todos = lerArquivo(TechMembros);
if (!todos[emailLimpo]) return false;
const usuario = todos[emailLimpo];
//➪ Ignora Validade E Limite Para O Plano Criador De Tecnologias
if (usuario.plano === "Criador de Tecnologias") {
console.log(`♛ Criador de Tecnologias: ${emailUsuario} — Permanente e Ilimitado!`);
return false; //➪ Nunca expira nem zera nada
}
if (!usuario.validadePlano) return false;
try {
const [parteData, parteHora] = usuario.validadePlano.split(' ');
const [dia, mes, ano] = parteData.split('/');
const dataValidade = new Date(`${ano}-${mes}-${dia}T${parteHora}`);
if (Date.now() > dataValidade.getTime()) {
todos[emailLimpo].requestsRestantes = 0;
todos[emailLimpo].techCoins = 0;
todos[emailLimpo].plano = "Expirado";
const salvou = salvarArquivo(todos);
const todosUsuarios = lerArquivo(TechMembros);
todosUsuarios[emailUsuario.toLowerCase().trim()] = usuario;
salvarArquivo(todosUsuarios);
console.log(`⏰ Plano expirado: ${emailUsuario} | Requisições e TechCoins zeradas`);
return true;
}
return false;
} catch (erro) {
console.error("Erro ao checar validade:", erro);
return false;
}
}

async function podeUsarSistema(emailUsuario, res) {
verificarValidadePlano(emailUsuario);

const usuario = buscarUsuario(emailUsuario);
if (!usuario) {
res.json({ erro: "Usuário não encontrado!" });
return false;
}
//➪ Libera Acesso Total Para O Plano Criador De Tecnologias
if (usuario.plano === "Criador de Tecnologias") {
return usuario;//➪ Sem limites, sem bloqueios
}
if (usuario.requestsRestantes <= 0) {
res.json({ erro: "Seu plano expirou ou acabaram as requisições! Renove para continuar." });
return false;
}
return usuario;
}

const criador = "Tosh Tech";

global.verificarCargo = function(email, cargoExato, req) {
if (!email) return false;
const dados = lerArquivo();
const usuario = dados[String(email).toLowerCase().trim()];
if (!usuario) return false;
const ok = usuario.cargo === cargoExato;
registrarLog('PERMISSÃO', `${email} | ${cargoExato} → ${ok}`, { ip: req.ip || 'servidor' });
return ok;
};

//➪ Uploads
const configurarPasta = p => { if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true }); };
configurarPasta(path.join(__dirname, 'upload', 'perfil'));
configurarPasta(path.join(__dirname, 'upload', 'parcerias'));
configurarPasta(path.join(__dirname, 'upload', 'uploads'));
// ➪ Suporte upload 
configurarPasta(path.join(__dirname, 'upload', 'suporte'));
app.use('/tosh-tech', express.static(path.join(__dirname, 'upload', 'suporte'), {
maxAge: '1d',
index: false
}));

// ➪ Middleware de Proteção — Tosh Tech ✅
app.use((req, res, next) => {
  // ⭐ PULA proteção para imagens e Canva — LIVRE ✅
  if (req.path.startsWith('/tosh-tech/') || req.path.startsWith('/api/canva/')) {
    return next();
  }
  // ⭐ Demais rotas seguem normalmente ✅
  next();
});


//➪ Função De Nome Curto 6 caracteres únicos e compatível
function gerarNomeCurto() {
return crypto.randomBytes(3)
.toString('base64')//➪ Compatível com todas versões do Node
.replace(/\+/g, '-')//➪ Ajusta caracterís 
.replace(/\//g, '_')
.replace(/=/g, '');
}

const uploadFotoPerfil = multer({
storage: multer.diskStorage({
destination: path.join(__dirname, 'upload', 'perfil'),
filename: (req, f, cb) => cb(null, `${(req.body.email_atual || 'usr').replace(/[^a-z0-9]/gi, '').toLowerCase()}-${Date.now()}.jpg`)
}),
limits: { fileSize: 52428800 },
fileFilter: (req, f, cb) => cb(null, f.mimetype.startsWith('image/'))
});

const uploadParceria = multer({
storage: multer.diskStorage({
destination: path.join(__dirname, 'upload', 'parcerias'),
 filename: (req, f, cb) => cb(null, `${(req.body.email_atual || 'usr').replace(/[^a-z0-9]/gi, '').toLowerCase()}-${Date.now()}.jpg`)
}),
limits: { fileSize: 52428800 },
fileFilter: (req, f, cb) => cb(null, f.mimetype.startsWith('image/'))
});

const upload = multer({
storage: multer.diskStorage({
destination: path.join(__dirname, 'upload', 'uploads'),
filename: (req, f, cb) => cb(null, `${limparEntrada(req.body.email || 'usr').toLowerCase().replace(/[^a-z0-9]/g, '')}-${Date.now()}${path.extname(f.originalname).toLowerCase()}`)
}),
limits: { fileSize: 5242880 },
fileFilter: (req, f, cb) => cb(null, ['image/jpeg','image/png','image/webp','image/gif'].includes(f.mimetype))
});

//➪ Configuração do multer Suporte 
const uploadSuporte = multer({
storage: multer.diskStorage({
destination: (req, arquivo, cb) => {
cb(null, path.join(__dirname, 'upload', 'suporte'));
},
filename: (req, arquivo, cb) => {
const nomeCurto = gerarNomeCurto();//➪ Reutiliza a função pronta
const ext = path.extname(arquivo.originalname).toLowerCase();
cb(null, `${nomeCurto}${ext}`);
}
}),
limits: { fileSize: 20 * 1024 * 1024 },//➪ 20MB
fileFilter: (req, arquivo, cb) => {
const permitidos = ['image/jpeg','image/png','image/webp','image/gif','video/mp4','video/webm','audio/mpeg','audio/wav','audio/ogg'];
cb(null, permitidos.includes(arquivo.mimetype));
}
});

//➪ Middleware de autenticação
function verificarLogin(req, res, next) {
try {
const rotasPublicas = ['/login','/cadastro','/politica-privacidade','/confirmar-email','/aceitar-cookies','/recuperar-senha','/static','/paginas/login','/paginas/cadastro','/paginas/politica-privacidade','/favicon.ico',"/logo",'/tema-atual','/api/publico','/portifolio', '/toshstream/pagina','api/download/playv21','api/download/playvd31','api/pesquisa/youtube1','manifest.json','/api/canva/bemVindo'];
if (rotasPublicas.some(r => req.path.startsWith(r))) return next();

const todos = lerArquivo();
let usuario = null, email = '';
for (const apiKey of ['tosh_tech','tosh_sessao','token']) {
const v = (req.cookies[apiKey] || '').trim().toLowerCase();
if (v && todos[v]) { usuario = todos[v]; email = v; break; }
}
if (!usuario) {
const h = (req.headers['tosh_tech'] || '').trim().toLowerCase();
if (h && todos[h]) { usuario = todos[h]; email = h; }
}
if (!usuario) return res.redirect('/login?erro=precisa_logar');
if (!usuario.emailConfirmado) return res.redirect('/login?erro=email_nao_confirmado');
if (!usuario.aceitouPoliticaPrivacidade) return res.redirect('/login?erro=aceitar_politica');

req.usuario = {
email: usuario.email, nome: usuario.nome, cargo: usuario.cargo || CARGOS.USUARIO,
nivel: usuario.nivel || 'Iniciante', patente: usuario.patente || '—',
fotoPerfil: usuario.fotoPerfil || "/logo", plano: usuario.plano || 'Iniciante',
techCoins: usuario.techCoins || 0, temas: usuario.temas || 'padrao'
};
registrarLog('ACESSO', `Autorizado: ${email} → ${req.path}`, { ip: req.ip, cargo: req.usuario.cargo });
return next();
} catch (erro) {
registrarLog('ERRO', `Falha autenticação: ${erro.message}`, { ip: req.ip });
return res.redirect('/login?erro=sistema');
}
}

//➪ Rotas Públicas
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'docs.html')));
app.get('/tutorial', (req, res) => {
const paginaDocs = path.join(__dirname, 'public', 'tutorial.html');
res.sendFile(paginaDocs);
});
app.get('/login', (req, res) => {
const paginaDocs = path.join(__dirname, 'public', 'login.html');
res.sendFile(paginaDocs);
});
app.get('/politica-privacidade', (req, res) => res.send(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Política de Privacidade - Tosh Tech</title>
<link rel="icon" href="/logo">
<style>
*{margin:0;padding:0;box-sizing:border-box;font-family:'Courier New',monospace;font-weight:700;letter-spacing:.5px}
body{background:#000;color:#c5c5c5;min-height:100vh;padding:40px 15px}
.container{max-width:800px;margin:0 auto}
.caixa{background:#0a0a0a;padding:30px;border-radius:12px;border:2px solid #c5c5c5;box-shadow:0 0 20px rgba(197,197,197,.2)}
.logo{display:block;width:110px;height:110px;border-radius:50%;margin:0 auto 20px;border:2px solid #c5c5c5;box-shadow:0 0 15px rgba(197,197,197,.3)}
h1{font-size:1.9rem;color:#c5c5c5;text-align:center;margin-bottom:8px;text-transform:uppercase;text-shadow:0 0 12px rgba(197,197,197,.4)}
.subtitulo-topo{text-align:center;font-size:1rem;color:#888;margin-bottom:30px}
h2{font-size:1.2rem;color:#c5c5c5;margin:25px 0 12px;padding-left:10px;border-left:3px solid #c5c5c5;text-transform:uppercase}
p{font-size:.95rem;line-height:1.7;color:#c5c5c5;margin-bottom:15px;font-weight:500}
.botao-voltar{display:block;width:fit-content;margin:35px auto 0;padding:12px 25px;background:transparent;border:2px solid #c5c5c5;color:#c5c5c5;font-size:1rem;text-transform:uppercase;border-radius:8px;text-decoration:none;transition:.3s ease;text-align:center}
.botao-voltar:hover{background:#c5c5c5;color:#000;box-shadow:0 0 15px rgba(197,197,197,.5)}
</style>
</head>
<body>
<div class="container">
<div class="caixa">
<img src="/logo" alt="Logo Tosh Tech" class="logo">
<h1>TOSH TECH</h1>
<div class="subtitulo-topo">Política de Privacidade • Conforme LGPD 13.709/2018</div>

<h2>1. Dados Coletados</h2>
<p>Coletamos apenas os dados necessários para funcionamento e segurança do sistema: nome completo, e-mail válido, senha criptografada, dados da conta, endereço IP, registros de acesso e o aceite desta política.</p>

<h2>2. Uso e Finalidade</h2>
<p>Seus dados são usados exclusivamente para: autenticação de acesso, validação de identidade, geração do identificador IP protegido, comunicação oficial, melhoria do serviço e prevenção de fraudes. Não compartilhamos, vendemos ou cedemos seus dados a terceiros.</p>

<h2>3. Segurança e Proteção</h2>
<p>Todas as informações são armazenadas com criptografia de alto nível. O acesso aos dados é restrito e controlado, com validação por código de segurança obrigatório antes do login para garantir que só você tenha acesso à sua conta.</p>

<h2>4. Validação de Conta</h2>
<p>Para confirmar que a conta pertence a você e que não se trata de um robô, enviamos um e-mail de verificação. Após confirmação, seu IP é associado de forma segura ao seu cadastro.</p>

<h2>5. Seus Direitos (LGPD)</h2>
<p>Você pode solicitar a qualquer momento: confirmação de existência do cadastro, acesso aos dados, correção de informações, exclusão total ou parcial, além de outras solicitações previstas na Lei Geral de Proteção de Dados.</p>

<h2>6. Contato</h2>
<p>Dúvidas ou solicitações relacionadas a dados pessoais devem ser feitas pelo suporte interno do sistema Tosh Tech.</p>

<a href="/login" class="botao-voltar">VOLTAR</a>
</div>
</div>
</body>
</html>
`))

app.post('/aceitar-cookies', (req, res) => {
res.cookie('aceitouCookies', 'true', { maxAge: 31536000000, httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' });
res.json({ sucesso: true });
});

//➪ PWA — Manifesto para instalar como App
app.get('/manifest.json', (req, res) => {
res.setHeader('Content-Type', 'application/json');
res.setHeader('Cache-Control', 'public, max-age=3600');
res.sendFile(path.join(__dirname, 'public', 'manifest.json'));
});


app.get('/portifolio', (req, res) => {
const paginaDocs = path.join(__dirname, 'public', 'portifolio.html');
res.sendFile(paginaDocs);
});

app.get('/toshstream/pagina', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'toshstream.html'));
});

app.get('/desenvolvedores', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'desenvolvedores.html'));
});

//➪ Registro 
app.post('/registro', async (req, res) => {
try {
const nome = limparEntrada(req.body.nome);
const email = limparEntrada(req.body.email, true).trim().toLowerCase();
const senhaDigitada = limparEntrada(req.body.senha);
const aceitou = req.body.aceitou_politica === 'on' || req.body.aceitou_politica === true;
if (!nome || !email || !senhaDigitada || !email.includes('@') || !aceitou) {
return res.status(400).json({ erro: 'Dados inválidos ou política não aceita' });
}
//➪ Lê o arquivo JSON de membros
const todosMembros = lerArquivo(TechMembros);
//➪ Verifica se o usuário já existe no arquivo
const usuarioExiste = todosMembros[email];
if (usuarioExiste) {
//➪ Se a conta existe mas o e-mail não foi confirmado, tenta re-enviar
if (!usuarioExiste.emailConfirmado) {
try {
const emailRes = await enviarConfirmacao(email, usuarioExiste.nome || nome);
usuarioExiste.tokenConfirmacao = emailRes.token;
usuarioExiste.expiracaoToken = new Date(Date.now() + 86400000).toISOString();
todosMembros[email] = usuarioExiste;
salvarArquivo(todosMembros, TechMembros);
return res.status(200).json({ 
sucesso: true, 
mensagem: 'E-mail de confirmação reenviado! Verifique sua caixa de entrada.' 
});
} catch (eEmail) {
if (typeof registrarLog === 'function') {
registrarLog('ERRO', 'Falha ao reenviar e-mail de confirmação', { email, erro: eEmail.message });
}
return res.status(500).json({ erro: `Falha ao enviar e-mail: ${eEmail.message}` });
}
}
return res.status(400).json({ erro: 'E-mail já cadastrado' });
}
//➪ Criptografa a senha com bcrypt
const senhaHash = await bcrypt.hash(senhaDigitada, 10);
//➪ Prepara o plano Teste e dados do novo membro
const planoTeste = PLANOS.find(p => p.nome === "Teste") || PLANOS[0];
const { nivel, patente } = calcularNivelEPatente(planoTeste.maxReq);
const dataAtual = new Date();
const dataValidadePlano = new Date(Date.now() + (planoTeste.dias * 86400000));
//➪ Adiciona o novo membro ao objeto JSON (salva ANTES do envio)
todosMembros[email] = {
nome,
email,
senha: senhaHash,
apiKey: gerarApiKey(),
cargo: (typeof CARGOS !== 'undefined' && CARGOS.USUARIO) ? CARGOS.USUARIO : "cliente",
nivel,
patente,
fotoPerfil: "/logo",
dataCadastro: dataAtual.toLocaleString('pt-BR'),
plano: planoTeste.nome,
requestsRestantes: planoTeste.maxReq,
techCoins: planoTeste.techCoins,
validadePlano: dataValidadePlano.toLocaleString('pt-BR'),
emailConfirmado: false,
tokenConfirmacao: null,
expiracaoToken: null,
aceitouPoliticaPrivacidade: true,
dataAceitePolitica: dataAtual.toLocaleString('pt-BR')
};
//➪ Tenta disparar o e-mail de confirmação
let emailEnviadoComSucesso = false;
try {
const emailRes = await enviarConfirmacao(email, nome);
todosMembros[email].tokenConfirmacao = emailRes.token;
todosMembros[email].expiracaoToken = new Date(Date.now() + 86400000).toISOString();
emailEnviadoComSucesso = true;
} catch (eEmail) {
console.error(`⚠️ [CADASTRO] Conta criada para ${email}, mas falhou o envio do e-mail:`, eEmail.message);
if (typeof registrarLog === 'function') {
registrarLog('ERRO', 'Falha ao enviar e-mail no cadastro', { email, erro: eEmail.message });
}
}
//➪ Grava a alteração no arquivo JSON local e envia para o GitHub
salvarArquivo(todosMembros, TechMembros);
if (typeof registrarLog === 'function') {
registrarLog('CADASTRO', `Conta criada: ${email}`, { ip: req.ip });
}
//➪ Resposta baseada no status do envio do e-mail
if (emailEnviadoComSucesso) {
return res.status(201).json({ 
sucesso: true, 
mensagem: 'Conta criada com sucesso! Verifique seu e-mail para confirmar o cadastro.' 
});
} else {
return res.status(201).json({ 
sucesso: true, 
mensagem: 'Conta cadastrada no sistema! Houve uma instabilidade no envio do e-mail de confirmação, tente fazer login para reenviar.' 
});
}
} catch (erro) {
console.error('Erro no cadastro:', erro);
if (typeof registrarLog === 'function') {
registrarLog('ERRO', 'Falha interna no cadastro', { erro: erro.message });
}
return res.status(500).json({ erro: 'Erro interno no cadastro' });
}
});

// ➪ Login 
app.post('/login', async (req, res) => {
try {
if (!req.body || !req.body.email || !req.body.senha) {
return res.json({ erro: 'Preencha o e-mail e a senha' });
}
const email = limparEntrada(req.body.email, true).trim().toLowerCase();
const senhaDigitada = limparEntrada(req.body.senha);
const usuario = buscarUsuario(email);
if (!usuario) {
return res.json({ erro: 'Dados incorretos' });
}
const senhaBate = await bcrypt.compare(senhaDigitada, usuario.senha);
if (!senhaBate) {
return res.json({ erro: 'Dados incorretos' });
}
if (!usuario.emailConfirmado) {
return res.json({ erro: 'Confirme seu e-mail primeiro' });
}
if (!usuario.aceitouPoliticaPrivacidade) {
return res.json({ erro: 'Aceite a política de privacidade' });
}
verificarValidadePlano(email);
req.session.email = email;
req.session.usuario = {
nome: usuario.nome,
email: usuario.email,
cargo: usuario.cargo,
nivel: usuario.nivel,
techCoins: usuario.techCoins
};
const cookieOptions = {
maxAge: 2592000000, // 30 dias
httpOnly: true,
sameSite: 'strict',
secure: process.env.NODE_ENV === 'production'
};
res.cookie('tosh_tech', email, cookieOptions);
res.cookie('tosh_sessao', email, cookieOptions);
if (typeof registrarLog === 'function') {
registrarLog('LOGIN', `Login efetuado com sucesso: ${email}`, { ip: req.ip || 'servidor' });
}
return res.json({
sucesso: true,
nome: usuario.nome,
email: usuario.email,
cargo: usuario.cargo,
nivel: usuario.nivel,
patente: usuario.patente,
fotoPerfil: usuario.fotoPerfil
});
} catch (erro) {
console.error('Erro no login:', erro);
if (typeof registrarLog === 'function') {
registrarLog('ERRO', `Falha no login: ${req.body ? req.body.email : 'desconhecido'}`, { erro: erro.message });
}
return res.json({ erro: 'Erro interno no login' });
}
});


//➪ Confirmar e-mail 
app.get('/confirmar-email', async (req, res) => {
  try {
    const token = limparEntrada(req.query.token || '');

    // ⚠️ Token vazio = inválido
    if (!token || token.length < 10) {
      return res.send(`
<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Confirmação - Tosh Tech</title><link rel="icon" href="/logo"><style>*{margin:0;padding:0;box-sizing:border-box}body{background:#000;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:25px;font-family:'Courier New',monospace}.caixa{background:#111;padding:35px 25px;border-radius:12px;border:2px solid #ff4d4d;text-align:center;max-width:420px;width:100%}.logo{width:110px;height:110px;border-radius:50%;margin:0 auto 20px;display:block}.titulo{font-size:1.4rem;color:#ff4d4d;margin-bottom:10px;font-weight:700;text-transform:uppercase}.subtexto{font-size:1rem;color:#c5c5c5;opacity:.85}.botao{display:inline-block;margin-top:25px;padding:10px 22px;background:transparent;border:2px solid #c5c5c5;color:#c5c5c5;font-size:.9rem;text-transform:uppercase;border-radius:6px;text-decoration:none;transition:.3s}.botao:hover{background:#c5c5c5;color:#000}</style></head><body><div class="caixa"><img src="/logo" alt="Tosh Tech" class="logo"><div class="titulo">LINK INVÁLIDO OU EXPIRADO</div><div class="subtexto">Código não existe ou já utilizado.</div><a href="/login" class="botao">VOLTAR AO LOGIN</a></div></body></html>`);
    }

    //➪ Busca o usuário diretamente pelo token no MongoDB
    const usuario = await Usuario.findOne({ tokenConfirmacao: token });

    if (!usuario) {
      return res.send(`
<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Confirmação - Tosh Tech</title><link rel="icon" href="/logo"><style>*{margin:0;padding:0;box-sizing:border-box}body{background:#000;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:25px;font-family:'Courier New',monospace}.caixa{background:#111;padding:35px 25px;border-radius:12px;border:2px solid #ff4d4d;text-align:center;max-width:420px;width:100%}.logo{width:110px;height:110px;border-radius:50%;margin:0 auto 20px;display:block}.titulo{font-size:1.4rem;color:#ff4d4d;margin-bottom:10px;font-weight:700;text-transform:uppercase}.subtexto{font-size:1rem;color:#c5c5c5;opacity:.85}.botao{display:inline-block;margin-top:25px;padding:10px 22px;background:transparent;border:2px solid #c5c5c5;color:#c5c5c5;font-size:.9rem;text-transform:uppercase;border-radius:6px;text-decoration:none;transition:.3s}.botao:hover{background:#c5c5c5;color:#000}</style></head><body><div class="caixa"><img src="/logo" alt="Tosh Tech" class="logo"><div class="titulo">LINK INVÁLIDO OU EXPIRADO</div><div class="subtexto">Código não existe ou já utilizado.</div><a href="/login" class="botao">VOLTAR AO LOGIN</a></div></body></html>`);
    }

    // ⏰ VERIFICA SE O TOKEN JÁ EXPIROU
    if (usuario.expiracaoToken) {
      const dataExpira = new Date(usuario.expiracaoToken);
      const agora = new Date();
      if (agora > dataExpira) {
        // Token expirado → apaga e rejeita
        usuario.tokenConfirmacao = null;
        usuario.expiracaoToken = null;
        await usuario.save();
        return res.send(`
<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Confirmação - Tosh Tech</title><link rel="icon" href="/logo"><style>*{margin:0;padding:0;box-sizing:border-box}body{background:#000;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:25px;font-family:'Courier New',monospace}.caixa{background:#111;padding:35px 25px;border-radius:12px;border:2px solid #ff4d4d;text-align:center;max-width:420px;width:100%}.logo{width:110px;height:110px;border-radius:50%;margin:0 auto 20px;display:block}.titulo{font-size:1.4rem;color:#ff4d4d;margin-bottom:10px;font-weight:700;text-transform:uppercase}.subtexto{font-size:1rem;color:#c5c5c5;opacity:.85}.botao{display:inline-block;margin-top:25px;padding:10px 22px;background:transparent;border:2px solid #c5c5c5;color:#c5c5c5;font-size:.9rem;text-transform:uppercase;border-radius:6px;text-decoration:none;transition:.3s}.botao:hover{background:#c5c5c5;color:#000}</style></head><body><div class="caixa"><img src="/logo" alt="Tosh Tech" class="logo"><div class="titulo">LINK EXPIRADO</div><div class="subtexto">O código expirou. Solicite um novo reenviando a confirmação.</div><a href="/login" class="botao">VOLTAR AO LOGIN</a></div></body></html>`);
      }
    }

    // ✅ TOKEN VÁLIDO → CONFIRMA A CONTA
    usuario.emailConfirmado = true;
    usuario.tokenConfirmacao = null;
    usuario.expiracaoToken = null;

    // 🔐 Criptografa a senha se ainda não estiver hashada
    if (usuario.senha && !usuario.senha.startsWith('$2b$') && !usuario.senha.startsWith('$2a$')) {
      usuario.senha = bcrypt.hashSync(usuario.senha, 10);
    }

    // ➪ Atualiza os dados do usuário no MongoDB
    await usuario.save();

    return res.send(`
<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Confirmação - Tosh Tech</title><link rel="icon" href="/logo"><style>*{margin:0;padding:0;box-sizing:border-box}body{background:#000;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:25px;font-family:'Courier New',monospace}.caixa{background:#111;padding:35px 25px;border-radius:12px;border:2px solid #4dff88;text-align:center;max-width:420px;width:100%}.logo{width:110px;height:110px;border-radius:50%;margin:0 auto 20px;display:block}.titulo{font-size:1.4rem;color:#4dff88;margin-bottom:10px;font-weight:700;text-transform:uppercase}.subtexto{font-size:1rem;color:#c5c5c5;opacity:.85}.botao{display:inline-block;margin-top:25px;padding:10px 22px;background:transparent;border:2px solid #c5c5c5;color:#c5c5c5;font-size:.9rem;text-transform:uppercase;border-radius:6px;text-decoration:none;transition:.3s}.botao:hover{background:#c5c5c5;color:#000}</style></head><body><div class="caixa"><img src="/logo" alt="Tosh Tech" class="logo"><div class="titulo">E-MAIL CONFIRMADO ✅</div><div class="subtexto">Senha protegida! Sua conta está ativa. Acesse agora.</div><a href="/login" class="botao">IR PARA LOGIN</a></div></body></html>`);

  } catch (erro) {
    console.error('❌ ERRO NA CONFIRMAÇÃO:', erro);
    return res.send(`
<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Confirmação - Tosh Tech</title><link rel="icon" href="/logo"><style>*{margin:0;padding:0;box-sizing:border-box}body{background:#000;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:25px;font-family:'Courier New',monospace}.caixa{background:#111;padding:35px 25px;border-radius:12px;border:2px solid #ff4d4d;text-align:center;max-width:420px;width:100%}.logo{width:110px;height:110px;border-radius:50%;margin:0 auto 20px;display:block}.titulo{font-size:1.4rem;color:#ff4d4d;margin-bottom:10px;font-weight:700;text-transform:uppercase}.subtexto{font-size:1rem;color:#c5c5c5;opacity:.85}</style></head><body><div class="caixa"><img src="/logo" alt="Tosh Tech" class="logo"><div class="titulo">ERRO INTERNO</div><div class="subtexto">Tente novamente mais tarde.</div></div></body></html>`);
  }
});


//➪ Play Mp4 Por Nome — SEM KEY
app.get('/api/download/playvd31', async (req, res, next) => {
const nome = req.query.nome;
if (!nome) return res.json({ status: false, resultado: 'Cadê o parâmetro nome??', criador: 'Tosh Tech' });
try {
const api = await ytSearch(nome);
if (!api || !api[0] || !api[0].url) throw new Error('Nenhum vídeo encontrado');
const dadosVideo = await ytMp4(api[0].url);
const linkBruto = typeof dadosVideo.link === 'function' ? dadosVideo.link() : dadosVideo.link;
const linkVideo = limparLink(linkBruto);
if (!linkVideo) throw new Error('Link do vídeo não pôde ser obtido');
res.setHeader('Content-Type', 'video/mp4');
res.setHeader('Content-Disposition', 'inline');
const url = new URL(linkVideo);
const protocolo = url.protocol === 'https:' ? https : http;
protocolo.get(linkVideo, (stream) => {
pipeline(stream, res, (erroStream) => {
if (erroStream && !res.headersSent) {
res.json({ status: false, codigo: 500, criador: 'Tosh Tech', resultado: "Erro ao transmitir o vídeo" });
}
});
}).on('error', (e) => {
if (!res.headersSent) {
res.json({ status: false, codigo: 400, criador: 'Tosh Tech', resultado: "Deu erro ao solicitar seu vídeo...." });
}
console.log(e);
});
} catch (e) {
if (!res.headersSent) {
res.json({ status: false, codigo: 400, criador: 'Tosh Tech', resultado: "Deu erro ao solicitar seu vídeo...." });
}
console.log(e);
}
});

//➪ Play Mp3 Por Url — SEM KEY
app.get('/api/download/playv21', async (req, res) => {
const { url } = req.query;
if (!url) return res.json({ status: false, resultado: 'Cadê o parâmetro url??', criador: 'Tosh Tech' });
try {
const mp3Url = await ytMp3(url);
if (!mp3Url || !mp3Url.startsWith('http')) {
return res.json({ status: false, resultado: 'Link MP3 inválido.', criador: 'Tosh Tech' });
}
const response = await axios({
method: 'get',
url: mp3Url,
responseType: 'stream'
});
res.setHeader('Content-Type', 'audio/mpeg');
res.setHeader('Content-Disposition', 'inline');
res.setHeader('Transfer-Encoding', 'chunked');
response.data.pipe(res);
} catch (e) {
console.error(e);
res.json({ status: false, resultado: 'Ocorreu um erro ao processar o áudio.', criador: 'Tosh Tech' });
}
});

//➪ Pesquisa YouTube — SEM KEY — ToshStream
app.get('/api/pesquisa/youtube1', async (req, res) => {
  const nome = req.query.nome;

  //➪ Validação do parâmetro
  if (!nome || nome.trim() === '') {
    return res.json({ 
      status: false, 
      resultado: 'Cadê o parâmetro nome??', 
      criador: 'Tosh Tech' 
    });
  }

  try {
    //➪ Busca vídeos
    const listaVideos = await ytSearch(nome.trim());

    //➪ Validação do resultado
    if (!listaVideos || !Array.isArray(listaVideos) || listaVideos.length === 0) {
      return res.json({ 
        status: false, 
        resultado: 'Nenhum vídeo encontrado', 
        criador: 'Tosh Tech' 
      });
    }

    //➪ RETORNO CORRIGIDO — SEM DUPLICATA! ✅
    res.json({
      status: true,
      criador: 'Tosh Tech',
      mensagem: `${listaVideos.length} vídeos encontrados`, // ✅ Renomeado para mensagem
      quantidade: listaVideos.length,
      //➪ Formato que o ToshStream espera — title, url, thumbnail, views, duration
      resultado: listaVideos.map(video => ({
        title: video.title || video.titulo || 'Sem título',
        url: video.url || '',
        thumbnail: video.thumbnail || video.capa || '',
        views: video.views || video.visualizacoes || 0,
        duration: video.duration || video.duracao || 0,
        //➪ Mantém nomes originais para compatibilidade
        titulo: video.title || video.titulo || 'Sem título',
        capa: video.thumbnail || video.capa || '',
        visualizacoes: video.views || video.visualizacoes || 0,
        duracao: video.duration || video.duracao || 0
      }))
    });

  } catch (e) {
    console.error('[ERRO PESQUISA YOUTUBE1]', e.message);
    return res.json({ 
      status: false, 
      resultado: 'Erro na pesquisa', 
      erro: e.message, 
      criador: 'Tosh Tech' 
    });
  }
});


/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Rotas『apikey』༻
// ➪  A PARTIR DAQUI ROTAS PROTEGIDAS
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
// ➪ PROTEÇÃO DUPLO — Tosh Tech ✅
app.use((req, res, next) => {
  // ⭐ PULA COMPLETAMENTE as imagens — SEMPRE, sem exceção! ✅
  if (req.path.startsWith('/tosh-tech/')) {
    return next(); // ✅ NÃO passa pela proteção, NÃO redireciona ✅
  }

  const apikey = req.query.apikey || req.headers['x-api-key'] || req.body.apikey;
  if (apikey && !buscarUsuarioPorApiKey(apikey, "Protecao")) return next();
  verificarLogin(req, res, next);
});

// ➪ A PARTIR DAQUI ROTAS PROTEGIDAS ✅


app.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, 'public', 'dashboard.html')));
app.get("/dono", (req, res) => res.sendFile(path.join(__dirname, 'public', 'dono.html')));
app.get('/perfil', (req, res) => res.sendFile(path.join(__dirname, 'public', 'perfil.html')));
app.get('/adm', (req, res) => res.sendFile(path.join(__dirname, 'public', 'adm.html')));
app.get('/tema', (req, res) => res.sendFile(path.join(__dirname, 'public', 'escolher-tema.html')));
app.get("/suporte", (req, res) => res.sendFile(path.join(__dirname, 'public', 'suporte.html')));

app.get("/painel-suporte2", (req, res) => res.sendFile(path.join(__dirname, 'public', 'painel-suporte.html')));

app.get("/recados", (req, res) => res.sendFile(path.join(__dirname, 'public', 'recado.html')));

app.get("/parcerias", (req, res) => res.sendFile(path.join(__dirname, 'public', 'parcerias.html')));

app.get("/renovarplano", (req, res) => res.sendFile(path.join(__dirname, 'public', 'pagamento.html')));

app.post('/ver-logs', (req, res) => {
try {
const email = limparEntrada(req.body.email || '').toLowerCase();
const usuario = buscarUsuario(email);
if (!usuario || usuario.cargo !== 'dono') return res.json({ erro: 'Apenas o dono pode ver logs' });
const logs = lerArquivo(ARQUIVO_LOGS);
res.json({ sucesso: true, logs: Object.values(logs).reverse() });
} catch (erro) { res.json({ erro: 'Erro ao carregar logs' }); }
});

//➪ Dashboard
app.get('/api/dashboard', (req, res) => {
try {
 const email = req.headers.tosh_tech || req.session.email;
if (!email) {
return res.json({ sucesso: false, erro: 'Sessão não encontrada' });
}
const todos = lerArquivo();
const usuario = todos[email.trim().toLowerCase()];
if (!usuario) {
return res.json({ sucesso: false, erro: 'Usuário não localizado' });
}
const ranking_top10 = Object.values(todos)
.map(u => ({
nome: u.nome,
fotoPerfil: u.fotoPerfil || "/logo",
 nivel: u.nivel,
patente: u.patente,
techCoins: u.techCoins || 0
}))
.sort((a, b) => b.techCoins - a.techCoins)
.slice(0, 10);
res.json({
sucesso: true,
perfil: {
email: usuario.email,
nome: usuario.nome,
cargo: usuario.cargo,
nivel: usuario.nivel,
patente: usuario.patente,
fotoPerfil: usuario.fotoPerfil,
plano: usuario.plano,
apiKey: usuario.apiKey,
dataCadastro: usuario.dataCadastro,
validadePlano: usuario.validadePlano,
requestsRestantes: usuario.requestsRestantes,
techCoins: usuario.techCoins
},
ranking_top10: ranking_top10
});
} catch (erro) {
console.error('[ERRO API DASHBOARD]', erro);
res.json({ sucesso: false, erro: 'Erro ao carregar painel' });
}
});

//➪ Perfil 
app.get('/api/perfil', (req, res) => {
try {
const email = req.headers.tosh_tech || req.session.email;
if (!email) {
return res.json({ sucesso: false, erro: 'Sessão não encontrada' });
}
const todos = lerArquivo();
const usuario = todos[email.trim().toLowerCase()];
if (!usuario) {
return res.json({ sucesso: false, erro: 'Usuário não localizado' });
}
res.json({
sucesso: true,
perfil: {
email: usuario.email,
nome: usuario.nome,
cargo: usuario.cargo,
nivel: usuario.nivel,
patente: usuario.patente,
fotoPerfil: usuario.fotoPerfil || "/logo",
plano: usuario.plano,
apiKey: usuario.apiKey,
dataCadastro: usuario.dataCadastro,
validadePlano: usuario.validadePlano,
requestsRestantes: usuario.requestsRestantes,
techCoins: usuario.techCoins || 0,
parceria: usuario.parceria ? {
status: usuario.parceria.status,
nome_projeto: usuario.parceria.nome_projeto,
data_solicitacao: usuario.parceria.data_solicitacao,
data_aprovacao: usuario.parceria.data_aprovacao || null
} : null
}});
} catch (erro) {
console.error('[ERRO API PERFIL]', erro);
res.json({ sucesso: false, erro: 'Erro ao carregar perfil' });
}
});

//➪ Editar dados do perfil 
app.post('/api/perfil/atualizar', (req, res) => {
try {
const emailAtual = (req.headers.tosh_tech || req.session.email || '').trim().toLowerCase();
if (!emailAtual) return res.json({ sucesso: false, erro: 'Sessão não encontrada' });
const todos = lerArquivo();
const usuario = todos[emailAtual];
if (!usuario) return res.json({ sucesso: false, erro: 'Usuário não localizado' });
if (req.body.nome && req.body.nome.trim()) {
usuario.nome = limparEntrada(req.body.nome);
}
if (req.body.senha && req.body.senha.trim()) {
const senhaLimpa = limparEntrada(req.body.senha);
if (senhaLimpa.length < 4) {
return res.json({ sucesso: false, erro: 'Senha deve ter no mínimo 4 caracteres' });
}
usuario.senha = bcrypt.hashSync(senhaLimpa, 10);
}
if (req.body.apikey !== undefined) {
usuario.apiKey = limparEntrada(req.body.apikey || '');
}
const emailRecebido = req.body.email.trim().toLowerCase();
if (emailRecebido && emailRecebido !== emailAtual) {
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailRecebido)) {
return res.json({ sucesso: false, erro: 'E-mail inválido' });
}
if (todos[emailRecebido]) {
return res.json({ sucesso: false, erro: 'Este e-mail já está cadastrado' });
}
delete todos[emailAtual];
usuario.email = emailRecebido;
todos[emailRecebido] = usuario;
if (req.session) req.session.email = emailRecebido;
} else {
todos[emailAtual] = usuario;
}
salvarArquivo(todos);
res.json({ 
sucesso: true, 
mensagem: '✅ Dados atualizados com sucesso!',
novoEmail: emailRecebido || emailAtual
});
} catch (erro) { 
console.error('[ERRO ATUALIZAR PERFIL]', erro);
res.json({ sucesso: false, erro: 'Erro interno ao salvar alterações' }); 
}
});

//➪ Alterar foto do perfil 
app.post('/api/perfil/foto', async (req, res) => {
try {
const email = (req.headers.tosh_tech || req.session.email || '').trim().toLowerCase();
if (!email) return res.json({ sucesso: false, erro: 'Sessão não encontrada' });
const todos = lerArquivo();
const usuario = todos[email];
if (!usuario) return res.json({ sucesso: false, erro: 'Usuário não localizado' });
if (req.body.foto.startsWith('data:image/')) {
const base64Data = req.body.foto.replace(/^data:image\/\w+;base64,/, '');
const buffer = Buffer.from(base64Data, 'base64');
const nomeArquivo = `perfil-${Date.now()}-${Math.random().toString(36).substr(2, 9)}.png`;
const caminho = path.join(__dirname, 'upload', 'perfil', nomeArquivo);
fs.writeFileSync(caminho, buffer);
if (usuario.fotoPerfil.startsWith('/upload/')) {
try { fs.unlinkSync(path.join(__dirname, usuario.fotoPerfil)); } catch {}
}
usuario.fotoPerfil = `/upload/perfil/${nomeArquivo}`;
salvarArquivo(todos);
return res.json({ sucesso: true, mensagem: '✅ Foto atualizada!', novaFoto: usuario.fotoPerfil });
}
if (req.body.foto.startsWith('http://') || req.body.foto.startsWith('https://')) {
if (!req.body.foto.startsWith('https://')) {
return res.json({ sucesso: false, erro: 'Use um link seguro (HTTPS)' });
}
usuario.fotoPerfil = req.body.foto;
salvarArquivo(todos);
return res.json({ sucesso: true, mensagem: '✅ Foto atualizada!', novaFoto: usuario.fotoPerfil });
}
uploadFotoPerfil.single('foto')(req, res, (erro) => {
if (erro || !req.file) {
return res.json({ sucesso: false, erro: 'Formato inválido. Use arquivo, link HTTPS ou recorte.' });
}
if (usuario.fotoPerfil.startsWith('/upload/')) {
try { fs.unlinkSync(path.join(__dirname, usuario.fotoPerfil)); } catch {}
}
usuario.fotoPerfil = `/upload/perfil/${req.file.filename}`;
salvarArquivo(todos);
return res.json({ sucesso: true, mensagem: '✅ Foto atualizada!', novaFoto: usuario.fotoPerfil });
});
} catch (erro) {
console.error('[ERRO FOTO]', erro);
res.json({ sucesso: false, erro: 'Erro ao salvar foto' });
}
});

//➪ Pedir parceria 
app.post('/api/perfil/parceria', (req, res, next) => {
const uploadUnico = uploadParceria.single('imagem_projeto');
uploadUnico(req, res, (erroUpload) => {
if (erroUpload) {
if (req.file) fs.unlinkSync(req.file.path);
return res.json({ 
sucesso: false, 
erro: 'Arquivo inválido! Use apenas imagens (JPG, PNG, GIF, WebP) até 50MB' 
});
}
next();
});
}, async (req, res) => {
try {
const email = (req.headers.tosh_tech || req.session.email || '').trim().toLowerCase();
if (!email) {
if (req.file) fs.unlinkSync(req.file.path);
return res.json({ sucesso: false, erro: 'Sessão não encontrada' });
}
const todos = lerArquivo();
const usuario = todos[email];
if (!usuario) { 
if (req.file) fs.unlinkSync(req.file.path); 
return res.json({ sucesso: false, erro: 'Usuário não localizado' }); 
}
const SALDO_MINIMO = 5000;
if ((usuario.techCoins || 0) < SALDO_MINIMO) {
 if (req.file) fs.unlinkSync(req.file.path);
return res.json({ 
sucesso: false, 
erro: `É necessário ter no mínimo ${SALDO_MINIMO.toLocaleString('pt-BR')} TechCoins para solicitar parceria` 
});
}
const { nome_projeto, descricao, contato, referencia } = req.body;
if (!nome_projeto || !descricao || !contato || !referencia) {
if (req.file) fs.unlinkSync(req.file.path);
return res.json({ sucesso: false, erro: 'Preencha todos os campos: nome do projeto, descrição, contato e referência' });
}
const contatoLimpo = limparEntrada(contato).toLowerCase();
const temEmail = /[^\s@]+@[^\s@]+\.[^\s@]+/.test(contatoLimpo);
const temNumero = /(\d{2,3})?\s?\d{4,5}[- ]?\d{4}/.test(contatoLimpo.replace(/\D/g, ''));
if (!temEmail && !temNumero) {
if (req.file) fs.unlinkSync(req.file.path);
return res.json({ 
sucesso: false, 
erro: 'Contato inválido! Informe um e-mail ou número de telefone/WhatsApp com DDD' 
});
}
let imagemAntiga = null;
let statusAtual = 'pendente';
if (usuario.parceria && typeof usuario.parceria === 'object') {
if (usuario.parceria.imagem) {
imagemAntiga = usuario.parceria.imagem;
const caminhoAntigo = `./public${imagemAntiga}`;
if (fs.existsSync(caminhoAntigo)) {
try {
fs.unlinkSync(caminhoAntigo);
console.log(`🗑️ Imagem antiga apagada: ${imagemAntiga}`);
} catch (erroApagar) {
console.warn(`⚠️ Não foi possível apagar imagem antiga: ${erroApagar.message}`);
}}}
if (usuario.parceria.status) {
statusAtual = usuario.parceria.status;
}}
usuario.parceria = {
nome_projeto: limparEntrada(nome_projeto),
descricao: limparEntrada(descricao),
contato: contatoLimpo,
referencia: limparEntrada(referencia),
imagem: req.file ? `/upload/parcerias/${req.file.filename}` : imagemAntiga,
data_solicitacao: new Date().toISOString(),
status: statusAtual
};
salvarArquivo(todos);
res.json({ 
sucesso: true, 
mensagem: statusAtual === 'pendente' 
? '✅ Solicitação enviada! Aguardando análise.' 
: '✅ Publicação atualizada com sucesso!' 
});
} catch (erro) { 
console.error('[ERRO PARCERIA]', erro);
if (req.file) fs.unlinkSync(req.file.path);
res.json({ sucesso: false, erro: 'Erro ao processar solicitação' }); 
}
});

//➪ parceria do usuário 
app.get('/api/perfil/minha-parceria', async (req, res) => {
try {
const email = (req.headers.tosh_tech || req.session.email || '').trim().toLowerCase();
if (!email) return res.json({ sucesso: false, erro: 'Sessão não encontrada' });
const todos = lerArquivo();
const usuario = todos[email];
if (!usuario) return res.json({ sucesso: false, erro: 'Usuário não localizado' });
let parceriaAjustada = usuario.parceria;
if (parceriaAjustada.imagem) {
parceriaAjustada.imagem = parceriaAjustada.imagem.startsWith('/upload/parcerias/')
? parceriaAjustada.imagem
: `/upload/parcerias/${parceriaAjustada.imagem.split('/').pop()}`;
}
res.json({ sucesso: true, nome: usuario.nome, email, parceria: parceriaAjustada || null });
} catch (erro) {
console.error('[ERRO MINHA PARCERIA]', erro);
res.json({ sucesso: false, erro: 'Erro ao buscar solicitação' });
}
});

//➪ Gerencia parcerias
app.post('/gerenciar-parceria', (req, res) => {
try {
const emailDono = (req.headers.tosh_tech || req.session.email || '').trim().toLowerCase();
if (!emailDono) return res.json({ sucesso: false, erro: 'Sessão não encontrada' });
const todos = lerArquivo();
const dono = todos[emailDono];
if (!dono || dono.cargo !== 'dono') return res.json({ sucesso: false, erro: 'Acesso negado' });
const { email_usuario, acao } = req.body;
if (!email_usuario || !['aprovado', 'recusado'].includes(acao)) {
return res.json({ sucesso: false, erro: 'Dados inválidos' });
}
const usuario = todos[email_usuario.toLowerCase()];
if (!usuario.parceria) return res.json({ sucesso: false, erro: 'Solicitação não encontrada' });
if (acao === 'recusado') {
if (usuario.parceria.imagem) {
const fs = require('fs'), path = require('path');
const nomeArquivo = usuario.parceria.imagem.split('/').pop();
const caminho = path.join(__dirname, 'public', 'upload', 'parcerias', nomeArquivo);
if (fs.existsSync(caminho)) fs.unlinkSync(caminho);
}
delete usuario.parceria;
salvarArquivo(todos);
return res.json({ sucesso: true, mensagem: '✅ Parceria recusada!' });
}
usuario.parceria.status = 'aprovado';
usuario.parceria.data_aprovacao = new Date().toISOString();
salvarArquivo(todos);
res.json({ sucesso: true, mensagem: '✅ Parceria aprovada!' });
} catch (erro) {
console.error('[ERRO GERENCIAR PARCERIA]', erro);
res.json({ sucesso: false, erro: 'Erro ao processar' });
}
});

//➪ Lista parceria 
app.get('/api/parcerias', async (req, res) => {
try {
const todos = lerArquivo();
const parceriasAprovadas = [];
Object.values(todos).forEach(usuario => {
if (usuario.parceria && usuario.parceria.status === 'aprovado') {
let referencia = usuario.parceria.referencia || '#';
if (!referencia.startsWith('http://') && !referencia.startsWith('https://')) {
if (referencia.toLowerCase() === 'youtube') {
referencia = 'https://www.youtube.com/@ToshTech-t8y';
} 
else if (referencia.startsWith('/')) {
referencia = 'https:' + referencia;
} else {
referencia = 'https://' + referencia;
}
}
parceriasAprovadas.push({
nome_projeto: usuario.parceria.nome_projeto || 'Projeto sem nome',
descricao: usuario.parceria.descricao || 'Sem descrição',
referencia: referencia,
imagem: usuario.parceria.imagem || '/logo-parceria.png',
autor: usuario.nome || 'Autor desconhecido'
});
}
});
res.json({
sucesso: true,
total: parceriasAprovadas.length,
parcerias: parceriasAprovadas
});
} catch (erro) {
console.error('[ERRO LISTA PARCERIAS]', erro);
res.json({ sucesso: false, erro: 'Erro ao carregar projetos' });
}
});

//➪ Listar Usuários 
app.get('/api/userinfo', async (req, res) => {
try {
const email = (req.headers.tosh_tech || req.session.email || '').trim().toLowerCase();
if (!email) {
return res.json({ sucesso: false, erro: 'Sessão não encontrada — faça login novamente' });
}
const todos = lerArquivo();
const dono = todos[email];
if (!dono || String(dono.cargo).toLowerCase() !== 'dono') {
return res.json({ sucesso: false, erro: 'Acesso restrito apenas ao Dono do sistema' });
}
const listaUsuarios = Object.values(todos).map(usuario => ({
nome: usuario.nome || '— Sem nome —',
email: usuario.email,
cargo: usuario.cargo || 'cliente',
plano: usuario.plano || 'Sem plano',
fotoPerfil: usuario.fotoPerfil || '/logo',
parceria: usuario.parceria || null,
nivel: usuario.nivel || usuario.patente || '',
validadePlano: usuario.validadePlano || '',
techCoins: usuario.techCoins || 0,
requestsRestantes: usuario.requestsRestantes || 0,
apiKey: usuario.apiKey || ''
}));
return res.json({
sucesso: true,
total: listaUsuarios.length,
dados: listaUsuarios
});
} catch (erro) {
console.error('[ERRO CRÍTICO /api/userinfo]', erro);
return res.json({ sucesso: false, erro: 'Erro interno no servidor: ' + erro.message });
}
});

//➪ Painel dono 
app.get('/painel-dono', (req, res) => {
try {
const email = (req.headers.tosh_tech || req.session.email || '').trim().toLowerCase();
if (!email) {
return res.json({ sucesso: false, erro: 'Sessão não encontrada' });
}
const todos = lerArquivo();
const usuario = todos[email];
if (!usuario || usuario.cargo !== 'dono') {
return res.json({ sucesso: false, erro: 'Acesso negado: apenas o Dono do sistema pode acessar essa área' });
}
const listaUsuarios = Object.values(todos).map(({ senha, ...dadosUsuario }) => dadosUsuario);
const parceriasPendentes = Object.values(todos)
.filter(u => u.parceria && u.parceria.status === 'pendente')
.map(u => ({
id_usuario: u.email,
nome_usuario: u.nome,
email_usuario: u.email,
patente_usuario: u.patente,
techcoins_usuario: u.techCoins || 0,
...u.parceria 
}));
res.json({
sucesso: true,
totalUsuarios: Object.keys(todos).length,
totalParceriasPendentes: parceriasPendentes.length,
listaUsuarios: listaUsuarios,
parceriasPendentes: parceriasPendentes
});
} catch (erro) {
console.error('[ERRO PAINEL DONO]', erro);
res.json({ sucesso: false, erro: 'Erro ao carregar painel administrativo' });
}
});

//➪ Painel adm
app.get('/painel-adm', (req, res) => {
try {
const email = (req.headers.tosh_tech || req.session.email || '').trim().toLowerCase();
if (!email) return res.json({ sucesso: false, erro: 'Sessão não encontrada' });
const todos = lerArquivo();
const usuario = todos[email];
if (!usuario || (usuario.cargo !== 'dono' && usuario.cargo !== 'adm')) {
return res.json({ sucesso: false, erro: 'Acesso negado: apenas Dono e Administrador' });
}
const listaUsuarios = Object.values(todos).map(({ senha, ...dadosUsuario }) => dadosUsuario);
const parceriasPendentes = Object.values(todos)
.filter(u => u.parceria && u.parceria.status === 'pendente')
.map(u => ({
id_usuario: u.email,
nome_usuario: u.nome,
email_usuario: u.email,
patente_usuario: u.patente,
techcoins_usuario: u.techCoins || 0,
...u.parceria 
}));
res.json({
sucesso: true,
totalUsuarios: Object.keys(todos).length,
totalParceriasPendentes: parceriasPendentes.length,
listaUsuarios,
parceriasPendentes
});
} catch (erro) {
console.error('ERRO PAINEL-ADM:', erro);
res.json({ sucesso: false, erro: 'Erro ao carregar painel: ' + erro.message });
}
});

//➪ Salvar Alterações Do Usuário
app.post('/api/usuario/editar', (req, res) => {
try {
const emailAdmin = (req.headers.tosh_tech || req.session.email || '').trim().toLowerCase();
const todos = lerArquivo();
const admin = todos[emailAdmin];
if (!admin || admin.cargo !== 'dono') {
return res.json({ sucesso: false, erro: 'Acesso negado' });
}
const { emailOriginal, ...dadosNovos } = req.body;
if (!emailOriginal || !todos[emailOriginal]) {
return res.json({ sucesso: false, erro: 'Usuário não encontrado' });
}
todos[emailOriginal] = { ...todos[emailOriginal], ...dadosNovos };
salvarArquivo(todos); 
res.json({ sucesso: true, mensagem: 'Usuário atualizado com sucesso' });
} catch (erro) {
console.error('[ERRO EDITAR]', erro);
res.json({ sucesso: false, erro: 'Falha ao editar' });
}
});

//➪ Excluir usuário
app.post('/api/usuario/excluir', (req, res) => {
try {
const emailAdmin = (req.headers.tosh_tech || req.session.email || '').trim().toLowerCase();
const todos = lerArquivo();
const admin = todos[emailAdmin];
if (!admin || admin.cargo !== 'dono') {
return res.json({ sucesso: false, erro: 'Acesso negado: apenas o Dono pode excluir usuários' });
}
const { email } = req.body;
if (!email || !todos[email]) return res.json({ sucesso: false, erro: 'Usuário não encontrado' });
if (email === emailAdmin) return res.json({ sucesso: false, erro: 'Não pode excluir a própria conta' });
delete todos[email];
salvarArquivo(todos);
res.json({ sucesso: true, mensagem: 'Usuário excluído com sucesso' });
} catch (erro) {
res.json({ sucesso: false, erro: 'Erro ao excluir' });
}
});

//➪ Painel Suporte humano
app.get('/painel-suporte', (req, res) => {
try {
const email = (req.headers.tosh_tech || req.session.email || '').trim().toLowerCase();
if (!email) return res.json({ sucesso: false, erro: 'Sessão não encontrada' });
const todos = lerArquivo();
const usuario = todos[email];
if (!usuario || (usuario.cargo !== 'dono' && usuario.cargo !== 'suporte')) {
return res.json({ sucesso: false, erro: 'Acesso negado: apenas Dono e Equipe de Suporte' });
}
const listaUsuarios = Object.values(todos).map(({ senha, ...dadosUsuario }) => dadosUsuario);
const parceriasPendentes = Object.values(todos)
.filter(u => u.parceria && u.parceria.status === 'pendente')
.map(u => ({
id_usuario: u.email,
nome_usuario: u.nome,
email_usuario: u.email,
patente_usuario: u.patente || '—',
techcoins_usuario: u.techCoins || 0,
...u.parceria
}));
const agora = new Date();
const listaUsuariosCompleta = listaUsuarios.map(u => {
let diasRestantes = 0;
if (u.validadePlano) {
const partes = u.validadePlano.split('/');
if (partes.length === 3) {
const dt = new Date(`${partes[2]}-${partes[1]}-${partes[0]}`);
diasRestantes = Math.ceil((dt - agora) / 86400000);
}}
return { ...u, diasRestantesPlano: diasRestantes > 0 ? diasRestantes : 0 };
});
const alertasVencimento = listaUsuariosCompleta
.filter(u => u.validadePlano)
.map(u => ({
...u,
diasRestantes: u.diasRestantesPlano,
status: u.diasRestantesPlano <= 0 ? 'vencido' : u.diasRestantesPlano <= 3 ? 'vencendo' : 'ok'
}))
.filter(a => a.status !== 'ok')
.sort((a, b) => a.diasRestantes - b.diasRestantes);
const usuariosPagantes = Object.values(todos).filter(u => {
const plano = PLANOS.find(p => p.nome === u.plano);
return plano && plano.valor > 0;
});
const vendasBaixa = usuariosPagantes.filter(u => {
const plano = PLANOS.find(p => p.nome === u.plano);
return plano && plano.valor >= 1 && plano.valor <= 5;
});
const vendasAlta = usuariosPagantes.filter(u => {
const plano = PLANOS.find(p => p.nome === u.plano);
return plano && plano.valor > 5;
});
const valorTotalBaixa = vendasBaixa.reduce((s, u) => {
const v = PLANOS.find(p => p.nome === u.plano).valor || 0;
return s + v;
}, 0);
const valorTotalAlta = vendasAlta.reduce((s, u) => {
const v = PLANOS.find(p => p.nome === u.plano).valor || 0;
return s + v;
}, 0);
const CAMINHO_RECADOS = path.join(__dirname, 'utils', 'recados.json');
const recadosPainel = fs.existsSync(CAMINHO_RECADOS) 
  ? JSON.parse(fs.readFileSync(CAMINHO_RECADOS, 'utf-8')).lista.sort((a, b) => new Date(b.data) - new Date(a.data)) 
: [];
const CAMINHO_SUPORTE = path.join(__dirname, 'upload', 'suporte');
const arquivosSuporte = fs.existsSync(CAMINHO_SUPORTE) 
? fs.readdirSync(CAMINHO_SUPORTE).map(a => ({
nome: a,
link: `/tosh-tech/${encodeURIComponent(a)}` })) 
: [];
let dadosLogs = registrarLog() || { logs: [], acessosPainel: [] };
dadosLogs.logs = dadosLogs.logs || [];
dadosLogs.acessosPainel = dadosLogs.acessosPainel || [];
dadosLogs.acessosPainel.push({
data: new Date().toLocaleString('pt-BR'),
email,
ip: req.ip,
cargo: usuario.cargo
});
fs.writeFileSync(ARQUIVO_LOGS, JSON.stringify(dadosLogs, null, 2), 'utf-8');
res.json({
sucesso: true,
totalUsuarios: Object.keys(todos).length,
totalParceriasPendentes: parceriasPendentes.length,
listaUsuarios: listaUsuariosCompleta,
parceriasPendentes,
alertasVencimento,
rendimentoVendas: {
totalPagantes: usuariosPagantes.length,
baixa: { quantidade: vendasBaixa.length, valorTotal: Number(valorTotalBaixa.toFixed(2)) },
alta: { quantidade: vendasAlta.length, valorTotal: Number(valorTotalAlta.toFixed(2)) },
valorGeral: Number((valorTotalBaixa + valorTotalAlta).toFixed(2))
},
recados: recadosPainel,
arquivosSuporte,
logs: dadosLogs.logs.slice(-20),
acessosPainel: dadosLogs.acessosPainel.slice(-15),
planos: PLANOS || []
});
} catch (erro) {
console.error('ERRO PAINEL-SUPORTE:', erro);
res.json({ sucesso: false, erro: 'Erro ao carregar painel: ' + erro.message });
}
});

//➪ Limpar Logs
app.delete('/painel-suporte/limpar-logs', (req, res) => {
try {
const email = (req.headers.tosh_tech || req.session.email || '').trim().toLowerCase();
const todos = lerArquivo();
const usuario = todos[email];
if (!usuario || (usuario.cargo !== 'dono' && usuario.cargo !== 'suporte')) {
return res.json({ sucesso: false, erro: 'Acesso negado: apenas Dono e Suporte podem limpar logs' });
}
const logsVazios = {
logs: [],
acessosPainel: []
};
fs.writeFileSync(ARQUIVO_LOGS, JSON.stringify(logsVazios, null, 2), 'utf-8');
res.json({ 
sucesso: true, 
mensagem: '✅ Todos os logs foram limpos com sucesso!',
dados: logsVazios });
} catch (erro) {
console.error('[ERRO AO LIMPAR LOGS]', erro);
res.json({ 
sucesso: false, 
erro: `Não foi possível limpar: ${erro.message}` 
});
}
});

//➪ Alterar Plano do Usuário
app.put('/painel-suporte/usuario/:email/plano', (req, res) => {
try {
const emailSup = (req.headers.tosh_tech || req.session.email || '').trim().toLowerCase();
const todos = lerArquivo();
const responsavel = todos[emailSup];
if (!responsavel || (responsavel.cargo !== 'dono' && responsavel.cargo !== 'suporte')) {
return res.json({ sucesso: false, erro: 'Acesso negado' });
}
const usuario = todos[req.params.email.trim().toLowerCase()];
if (!usuario) return res.json({ sucesso: false, erro: 'Usuário não encontrado' });
const plano = PLANOS.find(p => p.nome === req.body.novoPlano);
if (plano) {
usuario.plano = plano.nome;
usuario.requestsRestantes = plano.maxReq;
usuario.techCoins = (usuario.techCoins || 0) + plano.techCoins;
const dt = new Date();
dt.setDate(dt.getDate() + plano.dias);
usuario.validadePlano = dt.toLocaleDateString('pt-BR');
}
salvarArquivo(todos);
res.json({ sucesso: true, mensagem: 'Plano alterado com sucesso', usuario });
} catch (erro) {
console.error('[ERRO ALTERAR PLANO]', erro);
res.json({ sucesso: false, erro: 'Falha ao alterar plano: ' + erro.message });
}
});

//➪ Excluir Arquivo de Suporte
app.delete('/painel-suporte/arquivo/:nome', (req, res) => {
try {
const email = (req.headers.tosh_tech || req.session.email || '').trim().toLowerCase();
const todos = lerArquivo();
const usuario = todos[email];
if (!usuario || (usuario.cargo !== 'dono' && usuario.cargo !== 'suporte')) {
return res.json({ sucesso: false, erro: 'Acesso negado' });
}
const CAMINHO_SUPORTE = path.join(__dirname, 'upload', 'suporte');
const caminho = path.join(CAMINHO_SUPORTE, req.params.nome);
if (fs.existsSync(caminho)) fs.unlinkSync(caminho);
res.json({ sucesso: true, mensagem: 'Arquivo excluído com sucesso' });
} catch (erro) {
console.error('[ERRO EXCLUIR ARQUIVO]', erro);
res.json({ sucesso: false, erro: 'Erro ao excluir arquivo: ' + erro.message });
}
});

//➪ Publicar Recado
app.post('/painel-suporte/recado', (req, res) => {
try {
const email = (req.headers.tosh_tech || req.session.email || '').trim().toLowerCase();
const todos = lerArquivo();
const usuario = todos[email];
if (!usuario || (usuario.cargo !== 'dono' && usuario.cargo !== 'suporte')) {
return res.json({ sucesso: false, erro: 'Acesso negado' });
}
const { titulo, mensagem, tipo = 'recado' } = req.body;
if (!titulo || !mensagem) return res.json({ sucesso: false, erro: 'Preencha título e mensagem' });
const dados = carregarRecados();
dados.lista.unshift({
id: Date.now(),
titulo,
mensagem,
tipo,
autor: usuario.nome,
data: new Date().toLocaleString('pt-BR')
});
fs.writeFileSync(CAMINHO_RECADOS, JSON.stringify(dados, null, 2));
res.json({ sucesso: true, mensagem: 'Recado publicado!' });
} catch (erro) {
console.error('[ERRO PUBLICAR RECADO]', erro);
res.json({ sucesso: false, erro: 'Erro ao publicar recado' });
}
});

//➪ Excluir Recado
app.delete('/painel-suporte/recado/:id', (req, res) => {
try {
const email = (req.headers.tosh_tech || req.session.email || '').trim().toLowerCase();
const todos = lerArquivo();
const usuario = todos[email];
if (!usuario || (usuario.cargo !== 'dono' && usuario.cargo !== 'suporte')) {
return res.json({ sucesso: false, erro: 'Acesso negado' });
}

const dados = carregarRecados();
dados.lista = dados.lista.filter(r => r.id !== Number(req.params.id));
fs.writeFileSync(CAMINHO_RECADOS, JSON.stringify(dados, null, 2));
res.json({ sucesso: true, mensagem: 'Recado removido' });

} catch (erro) {
console.error('[ERRO EXCLUIR RECADO]', erro);
res.json({ sucesso: false, erro: 'Erro ao remover recado' });
}
});

//➪ Recados e Promoções
app.get('/recados-promocoes', (req, res) => {
try {
const dados = carregarRecados();
res.json({ sucesso: true, recados: dados.lista.sort((a, b) => new Date(b.data) - new Date(a.data)) });
} catch (erro) {
console.error('[ERRO RECADOS]', erro);
res.json({ sucesso: false, erro: 'Erro ao carregar recados' });
}
});

//➪ Ia de suporte 
app.post('/api/ia/suporte', async (req, res) => {
try {
const email = req.headers.tosh_tech || req.session.email;
if (!email) {
return res.json({ sucesso: false, erro: 'Sessão não encontrada — faça login novamente' });
}
const todos = lerArquivo();
const emailNormalizado = email.trim().toLowerCase();
const dadosUsuario = todos[emailNormalizado] || null;
const { pergunta } = req.body;
if (!pergunta || pergunta.trim().length < 2) {
return res.json({ sucesso: false, erro: 'Digite sua mensagem para o suporte!' });
}
const resposta = await responderSuporte(pergunta, dadosUsuario);
return res.json({
sucesso: true,
status: true,
resposta: resposta,
usuario: dadosUsuario ? {
email: dadosUsuario.email,
nome: dadosUsuario.nome,
cargo: dadosUsuario.cargo,
plano: dadosUsuario.plano
} : { nome: 'Usuário', email: emailNormalizado }
});
} catch (erro) {
console.error('[ERRO /api/ia/suporte]', erro);
return res.json({
sucesso: false,
status: false,
erro: 'Erro interno: ' + erro.message
});
}
});

//➪ rota para pegar dados do usuário logado 
app.get('/api/meus-dados', async (req, res) => {
try {
const email = (req.headers.tosh_tech || req.body.emailUsuario || '').trim().toLowerCase();
if (!email) return res.json({ sucesso: false, erro: 'Sem identificação' });
const todos = lerArquivo();
const usuario = todos[email];
if (!usuario) return res.json({ sucesso: false, erro: 'Usuário não encontrado' });
res.json({
sucesso: true,
fotoPerfil: usuario.fotoPerfil || '/logo',
nome: usuario.nome || 'Usuário',
cargo: usuario.cargo || '—',
nivel: usuario.nivel || '—',
plano: usuario.plano || '—',
validadePlano: usuario.validadePlano || '—',
apiKey: usuario.apiKey || '—',
techCoins: usuario.techCoins || '0'
});
} catch (erro) {
console.error('[ERRO /api/meus-dados]', erro);
res.json({ sucesso: false, erro: erro.message, fotoPerfil: '/logo' });
}
});

//➪ Rota de upload Suporte 
//➪ Rota de Upload Suporte — Tosh Tech ✅
app.post('/api/upload-suporte', uploadSuporte.single('arquivo'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ status: false, erro: 'Nenhum arquivo enviado', criador: 'Tosh Tech' });
    const dominio = process.env.DOMINIO_SITE || 'tosh-tech-86dr.onrender.com';
    const protocolo = dominio.includes('onrender.com') ? 'https' : 'http';
    const linkArquivo = `${protocolo}://${dominio}/tosh-tech/${req.file.filename}`;
    return res.json({ sucesso: true, status: true, link: linkArquivo, nome: req.file.filename, tamanho: req.file.size, criador: 'Tosh Tech' });
  } catch (erro) {
    return res.status(500).json({ status: false, erro: 'Erro ao fazer upload: ' + erro.message, criador: 'Tosh Tech' });
  }
});


//➪  Dados Do Usuário Tema
app.get('/api/dados-usuario', (req, res) => {
try {
const email = (req.headers.tosh_tech || req.session.email || '').trim().toLowerCase();
if (!email) return res.json({ sucesso: false, erro: 'Sessão não encontrada' });
const todos = lerArquivo();
const usuario = todos[email];
if (!usuario) return res.json({ sucesso: false, erro: 'Usuário não encontrado' });
res.json({
sucesso: true,
perfil: {
email: usuario.email,
nome: usuario.nome,
cargo: usuario.cargo,
techCoins: usuario.techCoins || 0,
temasComprados: usuario.temasComprados || [],
temaAtual: usuario.temaAtual || 'ToshTech'
}
});
} catch (erro) {
console.error('[ERRO /api/dados-usuario]', erro);
res.json({ sucesso: false, erro: 'Erro ao carregar dados' });
}
});

//➪ Tema Atual
app.get('/tema-atual', (req, res) => {
try {
const email = (req.headers.tosh_tech || req.query.email || req.session.email || '').trim().toLowerCase();
const caminhoConfig = path.join(__dirname, 'config.json');
let temaFinal = 'ToshTech';
if (email) {
const todos = lerArquivo();
if (todos[email].temaAtual) {
temaFinal = todos[email].temaAtual;
}
}
if (temaFinal === 'ToshTech' && fs.existsSync(caminhoConfig)) {
const config = JSON.parse(fs.readFileSync(caminhoConfig, 'utf8'));
temaFinal = config.temaPadrao || 'ToshTech';
}
const pastaTema = path.join(__dirname, 'public', 'assets', 'temas', temaFinal);
if (!fs.existsSync(pastaTema)) temaFinal = 'ToshTech';
res.json({ sucesso: true, tema: temaFinal });
} catch (erro) {
console.warn('[TEMA] Usando padrão:', erro.message);
res.json({ sucesso: true, tema: 'ToshTech' });
}
});


//➪ Listar Temas 
app.get('/api/listar-temas', (req, res) => {
try {
const email = (req.headers['tosh_tech'] || req.headers.tosh_tech || req.session.email || '').trim().toLowerCase();
if (!email || !email.includes('@')) return res.json({ sucesso: false, erro: 'Sessão não encontrada' });
const todos = lerArquivo();
if (!todos[email]) return res.json({ sucesso: false, erro: 'Usuário não encontrado' });
//➪ Temas 
const TEMAS = [
{ id: "ToshTech", nome: "Tema ToshTech", valor: 0 },
{ id: "TemaClaro", nome: "Tema ToshTech Claro", valor: 5000 },
{ id: "Freefire", nome: "Tema Free Fire Pink", valor: 8000 }
];
res.json({ sucesso: true, catalogo: TEMAS });
} catch (erro) {
console.error('[ERRO /api/listar-temas]', erro);
res.json({ sucesso: false, erro: 'Erro ao carregar catálogo' });
}
});

//➪ Comprar Tema
app.post('/api/comprar-tema', (req, res) => {
try {
const email = (req.headers.tosh_tech || req.session.email || '').trim().toLowerCase();
const { idTema } = req.body;
if (!email || !idTema) return res.json({ sucesso: false, erro: 'Dados incompletos' });
const todos = lerArquivo();
const usuario = todos[email];
if (!usuario) return res.json({ sucesso: false, erro: 'Usuário não encontrado' });
//➪ Temas 
const TEMAS = [
{ id: "ToshTech", nome: "Tema ToshTech", valor: 0 },
{ id: "TemaClaro", nome: "Tema ToshTech Claro", valor: 5000 },
{ id: "Freefire", nome: "Tema Free Fire Pink", valor: 8000 }
];
const tema = TEMAS.find(t => t.id === idTema);
if (!tema) return res.json({ sucesso: false, erro: 'Tema não existe' });
const saldo = usuario.techCoins || 0;
const temasComprados = usuario.temasComprados || [];
if (temasComprados.includes(idTema)) return res.json({ sucesso: false, aviso: 'Já tem esse tema! Ative na lista.' });
if (saldo < tema.valor) return res.json({ sucesso: false, erro: `Saldo insuficiente! Precisa de ${tema.valor} TechCoins.` });
usuario.techCoins = saldo - tema.valor;
usuario.temasComprados = [...temasComprados, idTema];
salvarArquivo(todos);
res.json({ sucesso: true, mensagem: '✅ Comprado! Agora ative o tema.' });
} catch (erro) {
console.error('[ERRO COMPRAR]', erro);
res.json({ sucesso: false, erro: 'Erro na compra' });
}
});

//➪ Ativar Tema 
app.post('/api/ativar-tema', async (req, res) => {
try {
const email = String(req.headers.tosh_tech || req.session.email || '').trim().toLowerCase();
const { idTema } = req.body;
if (!email) return res.status(400).json({ sucesso: false, erro: 'Sessão não identificada' });
if (!idTema) return res.status(400).json({ sucesso: false, erro: 'Informe o tema que deseja ativar' });
const todos = lerArquivo();
const usuario = todos[email];
if (!usuario) return res.status(404).json({ sucesso: false, erro: 'Usuário não localizado' });
const temasComprados = Array.isArray(usuario.temasComprados) ? usuario.temasComprados : [];
const temasGratis = ['ToshTech']; // Adicione outros temas gratuitos aqui
const temPermissao = temasComprados.includes(idTema) || temasGratis.includes(idTema);
if (!temPermissao) {
return res.status(403).json({ sucesso: false, erro: 'Sem permissão para usar esse tema. Adquira na loja!' });
}
usuario.temaAtual = idTema;
salvarArquivo(todos);
res.json({
sucesso: true,
criador,
mensagem: '✅ Tema ativado com sucesso!',
temaAtivado: idTema
});
} catch (erro) {
console.error('[ERRO ATIVAR TEMA]', erro.message);
res.status(500).json({
sucesso: false,
criador,
erro: 'Falha ao ativar tema — tente novamente em instantes' });
}
});

//➪ Pix altomatico 
app.get('/api/pix/gerar', async (req, res) => {
try {
const email = req.headers.tosh_tech || req.session.email;
if (!email) return res.status(401).json({ sucesso: false, erro: 'Sessão não encontrada' });
const { nomePlano } = req.query;
if (!nomePlano) return res.status(400).json({ sucesso: false, erro: 'Informe o nome do plano' });
const todos = lerArquivo();
const emailLimpo = email.trim().toLowerCase();
const usuario = todos[emailLimpo];
if (!usuario) return res.status(403).json({ sucesso: false, erro: 'Usuário não localizado' });
const plano = PLANOS.find(p => p.nome === nomePlano);
if (!plano) return res.status(404).json({ sucesso: false, erro: 'Plano não encontrado' });
if (plano.valor === 0) return res.status(400).json({ sucesso: false, erro: 'Plano Teste é gratuito' });
const idPedido = gerarIdPedido();
const resposta = await axios.post(MP_URL, {
transaction_amount: plano.valor,
description: `Plano ${plano.nome} - Tosh Tech`,
payment_method_id: 'pix',
payer: { email: usuario.email },
external_reference: `${idPedido}|${usuario.email}|${plano.nome}`,
notification_url: 'https://tosh-tech-86dr.onrender.com/api/pix/webhook'
}, {
headers: {
Authorization: `Bearer ${MP_TOKEN}`,
'X-Idempotency-Key': idPedido
},
timeout: 20000
});
const pagamento = resposta.data;
salvarPedido({
id: idPedido,
email: usuario.email,
plano: nomePlano,
valor: plano.valor,
status: 'pendente',
data: new Date().toLocaleString('pt-BR')
});
res.json({
sucesso: true,
criador,
resultado: 'Pix gerado com sucesso!',
dados: {
plano: plano.nome,
valor: `R$ ${plano.valor.toFixed(2)}`,
copia_cola: pagamento.point_of_interaction.transaction_data.qr_code,
qrcode_base64: pagamento.point_of_interaction.transaction_data.qr_code_base64,
idPedido: idPedido
}
});
} catch (erro) {
console.error('[PIX GERAR] Erro:', erro.response.data || erro.message);
res.status(500).json({ 
sucesso: false, 
erro: 'Falha ao gerar Pix: ' + (erro.response.data.message || erro.message) 
});
}
});

//➪ Webhook Ativa Plano Automaticamente
app.post('/api/pix/webhook', async (req, res) => {
try {
const { type, data } = req.body;
if (type !== 'payment') return res.sendStatus(200);
const pagamento = await pagamentoServico.get(data.id);
const status = pagamento.status;
const referencia = pagamento.external_reference;
if (status !== 'approved') return res.sendStatus(200);
if (!referencia) return res.sendStatus(200);
const [idPedido, emailUsuario, nomePlano] = referencia.split('|');
const pedidos = lerPedidos();
const pedido = pedidos.find(p => p.id === idPedido && p.status === 'pendente');
if (!pedido) return res.sendStatus(200);
const todos = lerArquivo();
const usuario = todos[emailUsuario];
const plano = PLANOS.find(p => p.nome === nomePlano);
if (!usuario || !plano) return res.sendStatus(200);
let novaValidade;
if (plano.dias === "♛ Plano Permanente") {
novaValidade = "01/01/2100 23:59:59";
} else {
const dataAtual = new Date();
dataAtual.setDate(dataAtual.getDate() + plano.dias);
novaValidade = `${String(dataAtual.getDate()).padStart(2,'0')}/${String(dataAtual.getMonth()+1).padStart(2,'0')}/${dataAtual.getFullYear()} 23:59:59`;
}
usuario.validadePlano = novaValidade;
usuario.techCoins = (Number(usuario.techCoins) || 0) + plano.techCoins;
usuario.requestsRestantes = plano.maxReq;
const { nivel, patente } = calcularNivelEPatente(usuario.requestsRestantes);
usuario.nivel = nivel;
usuario.patente = patente;
todos[emailUsuario] = usuario;
salvarArquivo(todos);
pedido.status = 'pago';
fs.writeFileSync(PEDIDOS_FILE, JSON.stringify(pedidos, null, 2), 'utf8');
console.log(`✅ PAGAMENTO CONFIRMADO! Plano ${plano.nome} ativado para ${emailUsuario}`);
res.sendStatus(200);
} catch (erro) {
console.error('[WEBHOOK] Erro:', erro.message);
res.sendStatus(500);
}
});




/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Rotas『apikey』༻
// ➪ ROTAS PESQUISAS
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
//➪ pesquisa do YouTube 
app.get('/api/pesquisa/yutubeSearch', async (req, res) => {
const { apikey, nome } = req.query;
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erroAuth = await buscarUsuarioPorApiKey(apikey);
if (erroAuth) return res.status(403).json({ erro: erroAuth });
if (!nome) return res.status(400).json({ status: false, resultado: 'Informe o nome ou link do vídeo' });
try {
const listaVideos = await ytSearch(nome.trim());
if (!listaVideos || !Array.isArray(listaVideos) || listaVideos.length === 0) {
throw new Error('Nenhum vídeo encontrado');
}
res.json({
status: true,
criador,
verificado: true,
resultado: `${listaVideos.length} vídeos encontrados`,
quantidade: listaVideos.length,
videos: listaVideos.map(video => ({
titulo: video.titulo || 'Sem título',
canal: video.canal || 'Canal desconhecido',
url: video.url || '',
capa: video.capa || '',
duracao: video.duracao || '0:00',
publicado: video.publicado || 'Desconhecido',
visualizacoes: video.visualizacoes || 'Desconhecido' }))
});
} catch (e) {
console.error('[ERRO PESQUISA]', e.message);
return res.status(400).json({
status: false,
criador,
resultado: e.message || 'Erro ao buscar vídeos' });
}
});

//➪ pesquisa de Filmes e séries 
app.get('/api/pesquisa/filmes', async (req, res) => {
const { apikey, nome } = req.query;
if (!apikey) return res.status(400).json({ erro: 'API Key obrigatória' });
const auth = await buscarUsuarioPorApiKey(apikey);
if (auth) return res.status(403).json({ erro: auth });
const resultado = await buscarFilmes(nome);
res.json({ status: true, criador, quantidade: resultado.length, dados: resultado });
});

//➪ pesquisa de notícias
app.get('/api/pesquisa/noticias', async (req, res) => {
const { apikey, nome } = req.query;
if (!apikey) return res.status(400).json({ erro: 'API Key obrigatória' });
const auth = await buscarUsuarioPorApiKey(apikey);
if (auth) return res.status(403).json({ erro: auth });
const dados = await buscarNoticias(nome);
res.json({ status: true, criador, quantidade: dados.length, dados: dados });
});

//➪ pesquisa conversao de moedas 
app.get('/api/pesquisa/conversor', async (req, res) => {
try {
const { apikey, valor, origem, destino } = req.query;
if (!apikey) return res.status(400).json({ erro: 'API Key é obrigatória' });
const auth = await buscarUsuarioPorApiKey(apikey);
if (auth) return res.status(403).json({ erro: auth });
const dados = await converterMoeda(valor, origem, destino);
res.json({ status: true, criador, dados });
} catch (erroRota) {
console.error('[ROTA CONVERSOR] Erro:', erroRota.message);
res.status(500).json({ erro: 'Falha ao processar conversão' });
}
});

//➪ pesquisa do clima 
app.get('/api/pesquisa/clima', async (req, res) => {
const { apikey, cidade } = req.query;
if (!apikey) return res.status(400).json({ erro: 'API Key obrigatória' });
const auth = await buscarUsuarioPorApiKey(apikey);
if (auth) return res.status(403).json({ erro: auth });
const dados = await buscarClima(cidade);
res.json({ status: true, criador, dados });
});

//➪ pesquisa dicionário 
app.get('/api/pesquisa/dicionario', async (req, res) => {
const { apikey, palavra } = req.query;
if (!apikey) return res.status(400).json({ erro: 'API Key obrigatória' });
const auth = await buscarUsuarioPorApiKey(apikey);
if (auth) return res.status(403).json({ erro: auth });
const dados = await buscarSignificado(palavra);
res.json({ status: true, criador, dados });
});

//➪ Pesquisa Produtos Amazon
app.get('/api/pesquisa/amazon', async (req, res) => {
const { apikey, busca } = req.query;
if (!apikey) return res.status(400).json({ erro: 'Parâmetro apikey é obrigatório' });
if (!busca) return res.status(400).json({ erro: 'Parâmetro busca é obrigatório' });
const erro = await buscarUsuarioPorApiKey(apikey, 'pesquisaAmazon');
if (erro) return res.status(403).json({ erro });
try {
const resultado = await amazonSearch(busca);
res.json(resultado);
} catch (e) {
res.status(500).json({
status: false,
criador,
erro: 'Falha ao buscar produtos',
detalhes: e.message });
}
});

/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Rotas『apikey』༻
// ➪ ROTAS FRASES
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
//➪ Frases De Amor 
app.get('/api/frases/amor', async (req, res) => {
const { apikey } = req.query;
if (!apikey) return res.status(400).json({ erro: 'Parâmetro apikey é obrigatório' });
const erro = await buscarUsuarioPorApiKey(apikey, 'frasesamor');
if (erro) return res.status(403).json({ erro });
try {
const resultado = await fraseAmor();
res.json(resultado);
} catch (e) {
res.status(500).json({
status: false,
criador,
erro: 'Falha ao buscar frase',
detalhes: e.message });
}
});

//➪ Frases Pensador 
app.get('/api/frases/pensador', async (req, res) => {
const { apikey, q } = req.query;
if (!apikey) return res.status(400).json({ erro: 'Parâmetro apikey é obrigatório' });
if (!q) return res.status(400).json({ erro: 'Parâmetro q é obrigatório' });
const erro = await buscarUsuarioPorApiKey(apikey, 'frasesbusca');
if (erro) return res.status(403).json({ erro });
try {
const resultado = await pensadorSearch(q);
res.json(resultado);
} catch (e) {
res.status(500).json({
status: false,
criador,
erro: 'Falha ao buscar frases',
detalhes: e.message });
}
});

//➪ Frases Para Bebê 
app.get('/api/frases/bebe', async (req, res) => {
const { apikey } = req.query;
if (!apikey) return res.status(400).json({ erro: 'Parâmetro apikey é obrigatório' });
const erro = await buscarUsuarioPorApiKey(apikey, 'frasesbebe');
if (erro) return res.status(403).json({ erro });
try {
const resultado = await fraseBebe();
res.json(resultado);
} catch (e) {
res.status(500).json({
status: false,
criador,
erro: 'Falha ao buscar frases',
detalhes: e.message });
}
});

//➪ Frases Versículos Da Bíblia 
app.get('/api/frases/biblia', async (req, res) => {
const { apikey } = req.query;
if (!apikey) return res.status(400).json({ erro: 'Parâmetro apikey é obrigatório' });
const erro = await buscarUsuarioPorApiKey(apikey, 'frasesbiblia');
if (erro) return res.status(403).json({ erro });
try {
const resultado = await fraseBiblia();
res.json(resultado);
} catch (e) {
res.status(500).json({
status: false,
criador,
erro: 'Falha ao buscar versículo',
detalhes: e.message });
}
});

//➪ Frases Cantadas 
app.get('/api/frases/cantadas', async (req, res) => {
const { apikey } = req.query;
if (!apikey) return res.status(400).json({ erro: 'Parâmetro apikey é obrigatório' });
const erro = await buscarUsuarioPorApiKey(apikey, 'frasescantadas');
if (erro) return res.status(403).json({ erro });
try {
const resultado = await fraseCantada();
res.json(resultado);
} catch (e) {
res.status(500).json({
status: false,
criador,
erro: 'Falha ao buscar frase',
detalhes: e.message });
}
});

//➪ Frases Piadas
app.get('/api/frases/piadas', async (req, res) => {
const { apikey } = req.query;
if (!apikey) return res.status(400).json({ erro: 'Parâmetro apikey é obrigatório' });
const erro = await buscarUsuarioPorApiKey(apikey, 'piadas');
if (erro) return res.status(403).json({ erro });
try {
const resultado = await piada();
res.json(resultado);
} catch (e) {
res.status(500).json({
status: false,
criador,
erro: 'Falha ao buscar piada',
detalhes: e.message });
}
});
/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Rotas『apikey』༻
// ➪ ROTAS DOWNLOADS
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
//➪ Rota Play Mp3 Por Nome res.json
app.get('/api/download/play', async (req, res) => {
const { apikey, nome } = req.query;
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erroAuth = await buscarUsuarioPorApiKey(apikey);
if (erroAuth) return res.status(403).json({ erro: erroAuth });
if (!nome) return res.status(400).json({ status: false, resultado: 'Informe o nome ou link do vídeo' });
try {
const listaVideos = await ytSearch(nome);
if (!listaVideos || !listaVideos.length) throw new Error('Nenhum vídeo encontrado');
const videoEscolhido = listaVideos[0];
if (!videoEscolhido.url) throw new Error('Vídeo sem link válido');
const dadosMp3 = await ytMp3(videoEscolhido.url);
const linkBruto = typeof dadosMp3.link === 'function' ? dadosMp3.link() : dadosMp3.link;
const linkLimpo = limparLink(linkBruto);
if (!linkLimpo || !linkLimpo.startsWith('http')) {
throw new Error('Áudio não disponível');
}
let bitrateReal = null;
if (dadosMp3.bitrate && Number(dadosMp3.bitrate) > 0) {
bitrateReal = Number(dadosMp3.bitrate);
}
let qualidadeTexto = 'MP3';
let infoBitrate = '';
if (bitrateReal) {
if (bitrateReal >= 256) qualidadeTexto = 'MP3 Alta Qualidade';
else if (bitrateReal >= 192) qualidadeTexto = 'MP3 Boa Qualidade';
else if (bitrateReal >= 128) qualidadeTexto = 'MP3 Qualidade Padrão';
else qualidadeTexto = 'MP3 Qualidade Baixa';
infoBitrate = ' (' + bitrateReal + ' kbps)';
}
res.json({
status: true,
criador: 'Tosh Tech',
verificado: true,
resultado: 'Áudio MP3 verificado e disponível',
qualidade: qualidadeTexto + infoBitrate,
dados: {
titulo: videoEscolhido.titulo || dadosMp3.titulo || 'Sem título',
capa: videoEscolhido.capa || dadosMp3.capa || '',
canal: videoEscolhido.canal || dadosMp3.canal || 'Canal desconhecido',
title: videoEscolhido.titulo || dadosMp3.titulo || 'Sem título',
url: videoEscolhido.url,
image: videoEscolhido.capa || dadosMp3.capa || '',
thumbnail: videoEscolhido.capa || dadosMp3.capa || '',
timestamp: dadosMp3.duracao || videoEscolhido.duracao || '0:00',
duration: dadosMp3.duracao || videoEscolhido.duracao || '0:00',
author: { name: videoEscolhido.canal || dadosMp3.canal || 'Canal desconhecido' },
ago: dadosMp3.publicado || videoEscolhido.publicado || 'Desconhecido',
views: dadosMp3.visualizacoes || videoEscolhido.visualizacoes || 'Desconhecido'
}
});
} catch (e) {
console.error('[ERRO]', e.message);
return res.status(400).json({
status: false,
criador,
resultado: e.message || 'Áudio não encontrado'
});
}
});

//➪ Downloads Play Mp3 Por Url
app.get('/api/download/playv2', async (req, res) => {
const { apikey, url } = req.query;
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await buscarUsuarioPorApiKey(apikey);
if (erro) return res.status(403).json({ erro });
  
if (!url) return res.json({ status: false, resultado: 'cadê o parâmetro url??' });
try {
const mp3Url = await ytMp3(url);
if (!mp3Url || !mp3Url.startsWith('http')) {
return res.json({ status: false, resultado: 'Link MP3 inválido.' });
}
const response = await axios({
method: 'get',
url: mp3Url,
responseType: 'stream'
});
res.setHeader('Content-Type', 'audio/mpeg');
res.setHeader('Content-Disposition', 'inline');
res.setHeader('Transfer-Encoding', 'chunked');
response.data.pipe(res);
} catch (e) {
console.error(e);
res.json({ status: false, resultado: 'ocorreu um erro ao processar o áudio.' });
}
});

//➪ Downloads Play Mp3 Por Nome
app.get('/api/download/playv3', async (req, res) => {
const { apikey, nome } = req.query;
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await buscarUsuarioPorApiKey(apikey);
if (erro) return res.status(403).json({ erro });
if (!nome) return res.status(400).json({ status: false, resultado: 'Cade o parametro nome??' });
try {
const api = await ytSearch(nome);
const mp3Url = await ytMp3(api[0].url);
if (!mp3Url || !mp3Url.startsWith('http')) {
return res.status(500).json({ status: false, resultado: 'Link MP3 inválido.' });
}
const parsedUrl = url.parse(mp3Url);
const protocol = parsedUrl.protocol === 'https:' ? https : http;
res.setHeader('Content-Type', 'audio/mpeg');
protocol.get(mp3Url, (audioStream) => {
if (audioStream.statusCode !== 200) {
return res.status(502).json({ status: false, resultado: 'Erro ao acessar o áudio.' });
}
pipeline(audioStream, res, (err) => {
if (err) {
console.error('Erro no streaming:', err);
if (!res.headersSent) res.status(500).end('Erro ao fazer streaming do áudio');
}
});
}).on('error', (err) => {
console.error('Erro na requisição do MP3:', err);
if (!res.headersSent) res.status(500).json({ status: false, resultado: 'Erro ao acessar o link do MP3.' });
});
} catch (e) {
console.error('Erro geral:', e);
return res.status(500).json({
status: false,
criador,
resultado: "Erro ao processar o áudio."
});
}
});

//➪ Downloads Play Mp3 Por Nome
app.get('/api/download/play4', async (req, res) => {
const { apikey, nome } = req.query;
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await buscarUsuarioPorApiKey(apikey);
if (erro) return res.status(403).json({ erro });
if (!nome) return res.status(400).json({ status: false, resultado: 'Cade o parametro nome??' });
try {
const api = await ytSearch(nome);
const mp3Url = await ytMp3(api[0].url);
if (!mp3Url || !mp3Url.startsWith('http')) {
return res.status(500).json({ status: false, resultado: 'Link MP3 inválido.' });
}
const parsedUrl = url.parse(mp3Url);
const protocol = parsedUrl.protocol === 'https:' ? https : http;
res.setHeader('Content-Type', 'audio/mpeg');
protocol.get(mp3Url, (audioStream) => {
if (audioStream.statusCode !== 200) {
return res.status(502).json({ status: false, resultado: 'Erro ao acessar o áudio.' });
}
pipeline(audioStream, res, (err) => {
if (err) {
console.error('Erro no streaming:', err);
if (!res.headersSent) res.status(500).end('Erro ao fazer streaming do áudio');
}
});
}).on('error', (err) => {
console.error('Erro na requisição do MP3:', err);
if (!res.headersSent) res.status(500).json({ status: false, resultado: 'Erro ao acessar o link do MP3.' });
});
} catch (e) {
console.error('Erro geral:', e);
return res.status(500).json({
status: false,
criador,
resultado: "Erro ao processar o áudio."
});
}
});

//➪ Downloads Play Mp4 Por Nome
app.get('/api/download/playvd', async (req, res) => {
const { apikey, nome } = req.query;
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erroAuth = await buscarUsuarioPorApiKey(apikey);
if (erroAuth) return res.status(403).json({ erro: erroAuth });
if (!nome) return res.status(400).json({ status: false, resultado: 'Informe o nome ou link do vídeo' });
try {
const listaVideos = await ytSearch(nome);
if (!listaVideos || !listaVideos.length) throw new Error('Nenhum vídeo encontrado');
const videoEscolhido = listaVideos[0];
if (!videoEscolhido.url) throw new Error('Vídeo sem link válido');
const dadosVideo = await ytMp4(videoEscolhido.url);
 const linkBruto = typeof dadosVideo.link === 'function' ? dadosVideo.link() : dadosVideo.link;
const linkLimpo = limparLink(linkBruto);
if (!linkLimpo || !linkLimpo.startsWith('http')) {
throw new Error('Vídeo não disponível');
}
let resolucaoReal = null;
let qualidadeTexto = 'MP4';
let infoQualidade = '';
if (dadosVideo.resolucao && dadosVideo.resolucao !== 'unknown') {
resolucaoReal = dadosVideo.resolucao;
const altura = Number(resolucaoReal.replace('p', ''));
if (altura >= 2160) qualidadeTexto = 'MP4 4K Ultra HD';
else if (altura >= 1080) qualidadeTexto = 'MP4 Full HD';
else if (altura >= 720) qualidadeTexto = 'MP4 HD';
else if (altura >= 480) qualidadeTexto = 'MP4 SD';
else qualidadeTexto = 'MP4 Qualidade Baixa';
infoQualidade = ` (${resolucaoReal})`;
}
res.json({
status: true,
criador: 'Tosh Tech',
verificado: true,
resultado: 'Vídeo MP4 verificado e disponível',
qualidade: qualidadeTexto + infoQualidade,
dados: {
titulo: videoEscolhido.titulo || dadosVideo.titulo || 'Sem título',
capa: videoEscolhido.capa || dadosVideo.capa || '',
canal: videoEscolhido.canal || dadosVideo.canal || 'Canal desconhecido',
title: videoEscolhido.titulo || dadosVideo.titulo || 'Sem título',
url: videoEscolhido.url,
image: videoEscolhido.capa || dadosVideo.capa || '',
thumbnail: videoEscolhido.capa || dadosVideo.capa || '',
timestamp: dadosVideo.duracao || videoEscolhido.duracao || '0:00',
duration: dadosVideo.duracao || videoEscolhido.duracao || '0:00',
author: { name: videoEscolhido.canal || dadosVideo.canal || 'Canal desconhecido' },
ago: dadosVideo.publicado || videoEscolhido.publicado || 'Desconhecido',
views: dadosVideo.visualizacoes || videoEscolhido.visualizacoes || 'Desconhecido'
}
});
} catch (e) {
console.error('[ERRO]', e.message);
return res.status(400).json({
status: false,
criador: 'Tosh Tech',
resultado: e.message || 'Vídeo não encontrado'
});
}
});

//➪ Downloads Play Mp4 Por Url
app.get('/api/download/playvdv2', async (req, res, next) => {
const { apikey, url } = req.query;  
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await buscarUsuarioPorApiKey(apikey);
if (erro) return res.status(403).json({ erro });
if (!url) return res.json({ status: false, resultado: 'Cadê o parâmetro url??' });
try {
const dadosVideo = await ytMp4(url);
const linkBruto = typeof dadosVideo.link === 'function' ? dadosVideo.link() : dadosVideo.link;
const linkVideo = limparLink(linkBruto);
 if (!linkVideo) throw new Error('Link do vídeo não pôde ser obtido');
res.setHeader('Content-Type', 'video/mp4');
res.setHeader('Content-Disposition', 'inline');
const urlDestino = new URL(linkVideo);
const protocolo = urlDestino.protocol === 'https:' ? https : http;
protocolo.get(linkVideo, (stream) => {
pipeline(stream, res, (erroStream) => {
if (erroStream && !res.headersSent) {
res.json({ status: false, codigo: 500, criador, resultado: "Erro ao transmitir o vídeo" });
}
});
}).on('error', (e) => {
if (!res.headersSent) {
res.json({ status: false, codigo: 400, criador, resultado: "Deu erro ao solicitar seu vídeo...." });
}
console.log(e);
});
} catch (e) {
if (!res.headersSent) {
res.json({ status: false, codigo: 400, criador, resultado: "Deu erro ao solicitar seu vídeo...." });
}
console.log(e);
}
});

//➪ Downloads Play Mp4 Por Nome
app.get('/api/download/playvd3', async (req, res, next) => {
const { apikey } = req.query;  
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await buscarUsuarioPorApiKey(apikey);
if (erro) return res.status(403).json({ erro });
const nome = req.query.nome;
if (!nome) return res.json({ status: false, resultado: 'Cade o parametro nome??' });
try {
const api = await ytSearch(nome);
if (!api || !api[0] || !api[0].url) throw new Error('Nenhum vídeo encontrado');
 const dadosVideo = await ytMp4(api[0].url);
const linkBruto = typeof dadosVideo.link === 'function' ? dadosVideo.link() : dadosVideo.link;
const linkVideo = limparLink(linkBruto);
if (!linkVideo) throw new Error('Link do vídeo não pôde ser obtido');
res.setHeader('Content-Type', 'video/mp4');
res.setHeader('Content-Disposition', 'inline');
const url = new URL(linkVideo);
const protocolo = url.protocol === 'https:' ? https : http;
protocolo.get(linkVideo, (stream) => {
pipeline(stream, res, (erroStream) => {
if (erroStream && !res.headersSent) {
res.json({ status: false, codigo: 500, criador, resultado: "Erro ao transmitir o vídeo" });
}
});
}).on('error', (e) => {
if (!res.headersSent) {
res.json({ status: false, codigo: 400, criador, resultado: "Deu erro ao solicitar seu vídeo...." });
}
console.log(e);
});
} catch (e) {
if (!res.headersSent) {
res.json({ status: false, codigo: 400, criador, resultado: "Deu erro ao solicitar seu vídeo...." });
}
console.log(e);
}
});

//➪ Downloads Tik Tok Por Nome
app.get('/api/download/tiktok1', async (req, res) => {
const { apikey, nome } = req.query;
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
  if (typeof buscarUsuarioPorApiKey === 'function') {
const erro = await buscarUsuarioPorApiKey(apikey);
if (erro) return res.status(403).json({ erro });
}
if (!nome) return res.json({ status: false, resultado: 'Cadê o parâmetro nome??' });

try {
const serpApiKey = "4af6e418aa12f6773a982cba49db5c1d3e0cfc44a2ceb36094d9b099e05dde22";
const url = `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(`site:tiktok.com ${nome}`)}&api_key=${serpApiKey}&gl=br&hl=pt-BR&tbm=vid&num=10`;
const resposta = await axios.get(url, { timeout: 35000 });
const videos = resposta.data.video_results || resposta.data.organic_results || [];
if (!Array.isArray(videos) || videos.length === 0) {
return res.json({ status: false, mensagem: "Nenhum vídeo encontrado", resultado: [] });
}
const resultado = [];
for (let i = 0; i < videos.length; i++) {
const v = videos[i];
const linkVideo = v.link || "";
let canal = "Desconhecido";
let canalUrl = "";
const matchCanal = linkVideo.match(/@([a-zA-Z0-9._-]+)/);
if (matchCanal && matchCanal[1]) {
canal = "@" + matchCanal[1];
canalUrl = "https://www.tiktok.com/" + canal;
}
resultado.push({
titulo: v.title || "Sem título",
url: linkVideo,
canal: canal,
canal_url: canalUrl,
visualizacoes: v.views || "N/A",
publicado: v.published_date || v.date || "N/A",
duracao: v.duration || "N/A",
thumbnail: v.thumbnail || v.thumbnail_src || "" });
}
return res.json({
status: true,
criador,
tiktok: nome,
quantidade: resultado.length,
resultado: resultado
});
} catch (erro) {
console.error("[ERRO GERAL]", erro.message);
return res.json({
status: false,
mensagem: erro.message || "Erro ao buscar vídeos"});
} 
});

//➪ Downloads Pinterest Por Nome
app.get('/api/download/pinterest', async (req, res) => {
const { apikey, nome } = req.query;
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await buscarUsuarioPorApiKey(apikey);
if (erro) return res.status(403).json({ erro });
if (!nome) return res.status(400).json({ status: false, resultado: 'Cade o parametro nome??' });
try {
const lista = await buscarPinterest(nome);
res.json({
status: true,
criador,
quantidade: lista.length,
dados: lista
});
} catch (e) {
res.status(500).json({ status: false, erro: 'Falha na busca' });
}
});

//➪ Downloads Pinterestgf Por Nome
app.get('/api/download/pinterestgif', async (req, res) => {
const { apikey, nome } = req.query;
if (!apikey)
return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await buscarUsuarioPorApiKey(apikey, 'youtube');
if (erro)
return res.status(403).json({ erro });
if (!nome)
 return res.json({ status: false, resultado: 'cadê o parâmetro nome??' });
try {
 const giphyKey = "hSzfe7K4FzfFoh6NCNeq1ccEVkPIg4R1";
 const url = `https://api.giphy.com/v1/gifs/search?api_key=${giphyKey}&q=${encodeURIComponent(nome)}&limit=5&rating=g`;
 const response = await axios.get(url);
 const gifs = response.data.data;
if (!gifs.length) {
return res.json({ status: false, mensagem: "Nenhum GIF encontrado", resultado: [] });
}

const resultado = gifs.map(gif => ({ titulo: gif.title || "Sem título",
url_gif: gif.images.original.url, url_mp4: gif.images.original.mp4,
preview: gif.images.fixed_height_small.url  }));
return res.json({ status: true, resultado });
} catch (error) {
console.error("Erro na API Giphy:", error.message);
return res.json({ status: false, mensagem: error.message || "Erro desconhecido", detalhes: error.response.data || null   });
}
});

//➪ Downloads Download Mediafire
app.get("/api/download/mediafire", async (req, res) => {
const { url, apikey } = req.query;
if (!apikey) {
return res.status(400).json({
status: false,
criador: criador,
erro: "Parâmetro 'apikey' obrigatório"
});
}
if (!url) {
return res.status(400).json({
status: false,
criador: criador,
erro: "Parâmetro 'url' obrigatório"
});
}
const erro = await buscarUsuarioPorApiKey(apikey, 'mediafire');
if (erro) {
return res.status(403).json({ erro });
}
try {
const resultado = await mediafireDl(url);
if (!resultado.status) {
return res.status(400).json({
status: false,
criador: criador,
erro: resultado.erro || "Falha ao obter dados",
detalhes: resultado.detalhes || ""
});
}
res.json({
status: true,
criador: criador,
resultado: resultado
});
} catch (err) {
console.error("[ERRO MEDIAFIRE]", err.message);
res.status(500).json({
status: false,
criador: criador,
erro: "Erro interno no servidor",
detalhes: err.message
});
}
});

//➪ Downloads gimage Por Nome
app.get("/api/download/gimage", async (req, res) => {
const { apikey, nome } = req.query;
if (!apikey) return res.status(400).json({ erro: "API Key obrigatória" });
const erro = await buscarUsuarioPorApiKey(apikey, 'gimage');
if (erro) return res.status(403).json({ erro });
if (!nome) return res.status(400).json({ erro: "Parâmetro 'nome' obrigatório" });
try {
const resultado = await gis(nome);
if (!resultado || resultado.length === 0) {
return res.status(404).json({
status: false,
criador,
erro: "Nenhuma imagem encontrada" });
}
const urlImagem = resultado[0].url;
const resposta = await axios.get(urlImagem, {
responseType: 'stream',
timeout: 20000,
maxRedirects: 5,
httpsAgent: new https.Agent({ rejectUnauthorized: false }),
headers: {
"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
"Referer": "https://www.google.com/",
"Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
"Accept-Language": "pt-BR,pt;q=0.9" }
});
res.setHeader("Content-Type", resposta.headers["content-type"] || "image/jpeg");
res.setHeader("Content-Length", resposta.headers["content-length"] || "");
res.setHeader("Cache-Control", "public, max-age=86400");
res.setHeader("Content-Disposition", `inline; filename="imagem_tosh_tech.jpg"`);
res.removeHeader("Content-Security-Policy");
res.removeHeader("X-Frame-Options");
resposta.data.pipe(res);
} catch (e) {
res.status(500).json({
status: false,
criador,
erro: e.message || "Falha ao carregar imagem" });
}
});

//➪ Downloads Play Store
app.get('/api/download/playstore', async (req, res) => {
const { apikey, q } = req.query;
if (!apikey) return res.status(400).json({ erro: 'Parâmetro apikey é obrigatório' });
if (!q) return res.status(400).json({ erro: 'Parâmetro q é obrigatório' });
const erro = await buscarUsuarioPorApiKey(apikey, 'playstore_search');
if (erro) return res.status(403).json({ erro });
try {
const resultado = await playStoreSearch(q);
res.json(resultado);
} catch (e) {
res.status(500).json({
status: false,
criador,
erro: 'Falha ao buscar aplicativos',
detalhes: e.message });
}
});
/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Rotas『apikey』༻
// ➪ ROTAS INTELIGÊNCIA ARTIFICIAL 
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
//➪ Inteligência Stick AI
app.get("/api/inteligencia/stickAi", async (req, res) => {
const { apikey, query } = req.query;
if (!apikey) return res.status(400).json({ erro: "Parâmetro 'apikey' é obrigatório" });
if (!query) return res.status(400).json({ erro: "Parâmetro 'query' é obrigatório" });
const erro = await buscarUsuarioPorApiKey(apikey, 'figurunha');
if (erro) return res.status(403).json({ erro });
try {
const data = await stickAi(query);
let imgUrl = "";
if (data && data.imagem && Array.isArray(data.imagem) && data.imagem.length > 0) {
imgUrl = data.imagem[0];
}
if (!imgUrl) return res.status(404).json({ erro: "Nenhuma imagem retornada" });
const resposta = await axios.get(imgUrl, { responseType: "arraybuffer" });
res.setHeader("Content-Type", "image/webp");
res.send(resposta.data);
} catch (e) {
console.error(e);
res.status(500).json({ 
status: "offline", 
criador,
erro: "Erro ao gerar a figurinha"  });
}
});

//➪ Inteligência Imagem IA
app.get("/api/inteligencia/imagemAi", async (req, res) => {
const { apikey, query } = req.query;
if (!apikey) return res.status(400).json({ erro: "Parâmetro 'apikey' é obrigatório" });
if (!query) return res.status(400).json({ erro: "Parâmetro 'query' é obrigatório" });
const erro = await buscarUsuarioPorApiKey(apikey, 'NOME');
if (erro) return res.status(403).json({ erro });
try {
const result = await imagemAi(query);
console.log(result);
let urlImagem = "";
if (result && result.resultado && result.resultado.imagem) {
urlImagem = result.resultado.imagem;
}
if (!urlImagem) return res.status(404).json({ erro: "Imagem não encontrada" });
const response = await axios.get(urlImagem, { responseType: "arraybuffer" });
res.setHeader("Content-Type", response.headers["content-type"]);
res.send(response.data);
} catch (e) {
console.error(e);
res.status(500).json({
status: "offline",
criador,
erro: "Deu erro na sua solicitação" });
}
});

//➪ Inteligência Google voz feminina 
app.get("/api/inteligencia/audio/feminino", async (req, res) => {
const { apikey, texto } = req.query;
if (!apikey) return res.status(400).json({ erro: "Parâmetro 'apikey' é obrigatório" });
if (!texto) return res.status(400).json({ erro: "Parâmetro 'texto' é obrigatório" });
const erro = await buscarUsuarioPorApiKey(apikey, 'gerar_voz');
if (erro) return res.status(403).json({ erro });
try {
const resultado = await gerarVoz(texto);
res.setHeader("Content-Type", "audio/mpeg");
res.setHeader("Content-Disposition", "inline; filename=voz_tosh_exclusiva.mp3");
res.send(resultado.audioBuffer);
} catch (e) {
console.error(e);
res.status(500).json({ status: false, criador: "Tosh Tech", erro: e.message });
}
});

//➪ Inteligência chatgbt Ia 
app.get("/api/inteligencia/chatgbt", async (req, res) => {
const { apikey, texto } = req.query;
if (!apikey) return res.status(400).json({ erro: "Parâmetro 'apikey' é obrigatório" });
if (!texto) return res.status(400).json({ erro: "Parâmetro 'texto' é obrigatório" });
const erro = await buscarUsuarioPorApiKey(apikey, 'chatgbt');
if (erro) return res.status(403).json({ erro });
try {
const resultado = await chatIA(texto);
res.json(resultado);
} catch (e) {
console.error(e);
res.status(500).json({
status: false,
criador,
erro: "Erro ao consultar a inteligência artificial. Tente novamente em instantes." });
}
});

//➪ Inteligência Tahta
app.get("/api/inteligencia/tahta", async (req, res) => {
const { apikey, texto, cor_texto, cor_fundo } = req.query;
if (!apikey) return res.status(400).json({ erro: "Parâmetro 'apikey' é obrigatório" });
if (!texto) return res.status(400).json({ erro: "Parâmetro 'texto' é obrigatório" });
const erro = await buscarUsuarioPorApiKey(apikey, 'tahta');
if (erro) return res.status(403).json({ erro });
try {
const config = {
text: texto,
color: cor_texto || "white",
bgColor: cor_fundo || "black"
};
const bufferImagem = await tahta(config);
res.setHeader("Content-Type", "image/png");
res.setHeader("Cache-Control", "public, max-age=86400");
res.send(bufferImagem);
} catch (e) {
console.error("Erro Tahta:", e.message);
res.status(500).json({
status: false,
criador: "Tosh Tech",
erro: "Falha ao gerar imagem Tahta" });
}
});
/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Rotas『apikey』༻
// ➪ ROTAS FIGURINHAS 
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
//➪ Figurinhas de emoji 
app.all('/sticker/figu_emoji', async (req, res) => {
try {
const { apikey } = req.query;  
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await buscarUsuarioPorApiKey(apikey, 'figurunhasemoji');
if (erro) return res.status(403).json({ erro });
const { figurinhasemoji } = require('./banco_dados/figurinhas/pack_emoji.json');
if (!Array.isArray(figurinhasemoji) || figurinhasemoji.length === 0) {
return res.status(404).json({ erro: 'Nenhuma figurinha disponível no pack_emoji.json' });
}
const indiceAleatorio = Math.floor(Math.random() * figurinhasemoji.length);
const urlFigurinha = figurinhasemoji[indiceAleatorio];
const buffer = await getBuffer(urlFigurinha);
res.setHeader('Content-Type', 'image/webp');
res.send(buffer);
} catch (error) {
console.error('Erro no endpoint /sticker/figu_emoji:', error);
res.status(500).json({ 
status: false,
mensagem: 'Erro interno ao processar a solicitação.' });
}
});

//➪ Figurinhas Aleatórias
app.all('/sticker/figu_random', async (req, res) => {
try {
const { apikey } = req.query;
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await buscarUsuarioPorApiKey(apikey, 'figurunhasAleatorias');
if (erro) return res.status(403).json({ erro });
const packs = [
require('./banco_dados/figurinhas/pack_anime.json'),
require('./banco_dados/figurinhas/pack_emoji.json'),
require('./banco_dados/figurinhas/pack_coreanas.json'),
require('./banco_dados/figurinhas/pack_desenho.json'),
require('./banco_dados/figurinhas/pack_bebe.json'),
require('./banco_dados/figurinhas/pack_aleatorio.json')
];
const packEscolhido = packs[Math.floor(Math.random() * packs.length)];
const listaFigurinhas = packEscolhido.figurinhas || packEscolhido.figurinhasemoji;
if (!Array.isArray(listaFigurinhas) || listaFigurinhas.length === 0) {
return res.status(404).json({ erro: 'Nenhuma figurinha disponível nos packs locais' });
}
const indiceAleatorio = Math.floor(Math.random() * listaFigurinhas.length);
const urlFigurinha = listaFigurinhas[indiceAleatorio];
const buffer = await getBuffer(urlFigurinha);
res.setHeader('Content-Type', 'image/webp');
res.send(buffer);
} catch (error) {
console.error('Erro no endpoint /sticker/figu_random:', error);
res.status(500).json({  
status: false,
mensagem: 'Erro interno ao processar a solicitação.'
});
}
});

//➪ Figurinhas Desenho / Flork
app.all('/sticker/figu_desenho2', async (req, res) => {
try {
const { apikey } = req.query;  
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await buscarUsuarioPorApiKey(apikey, 'figurunhasDesenho');
if (erro) return res.status(403).json({ erro });
try {
const numeroAleatorio = Math.floor(Math.random() * 102);
const urlFigurinha = `https://raw.githubusercontent.com/Scheyot2/anya-bot/master/Figurinhas/figu_flork/${numeroAleatorio}.webp`;
res.setHeader('Content-Type', 'image/webp');
res.send(await getBuffer(urlFigurinha));
} catch (e) {
console.error('Erro ao carregar figurinha:', e);
return res.send(msgApi.error || { erro: 'Falha ao carregar figurinha' });
}
} catch (error) {
console.error('Erro no endpoint /sticker/figu_desenho2:', error);
res.status(500).json({ 
status: false, 
mensagem: "Erro interno ao processar a solicitação." });
}
})

//➪ Figurinhas Aleatórias 
app.all('/sticker/figu_aleatori', async (req, res) => {
try {
const { apikey } = req.query;
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await buscarUsuarioPorApiKey(apikey, 'figurunhasAleatorias2');
if (erro) return res.status(403).json({ erro });
const { figurinhas } = require('./banco_dados/figurinha/pack_aleatorio.json');
if (!Array.isArray(figurinhas) || figurinhas.length === 0) {
return res.status(404).json({ erro: 'Nenhuma figurinha disponível no pack_aleatorio.json' });
}
const indiceAleatorio = Math.floor(Math.random() * figurinhas.length);
const urlFigurinha = figurinhas[indiceAleatorio];
const buffer = await getBuffer(urlFigurinha);
res.setHeader('Content-Type', 'image/webp');
res.send(buffer);
} catch (error) {
console.error('Erro no endpoint /sticker/figu_aleatori:', error);
res.status(500).json({
status: false,
mensagem: 'Erro interno ao processar a solicitação.' 
});
}
});

//➪ Figurinhas Memes
app.all('/sticker/figu_memes', async (req, res) => {
try {
const { apikey } = req.query;  
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await buscarUsuarioPorApiKey(apikey, 'figurunhasMemes');
if (erro) return res.status(403).json({ erro });
try {
const numeroAleatorio = Math.floor(Math.random() * 109);
const url = `https://raw.githubusercontent.com/Scheyot2/sakura-botv6/master/FIGURINHAS/Figurinha-memes/${numeroAleatorio}.webp`;
res.setHeader('Content-Type', 'image/webp');
res.send(await getBuffer(url));
} catch (e) {
console.error('Erro ao carregar figurinha de meme:', e);
res.send(msgApi.error || { erro: 'Falha ao carregar figurinha' });
}
} catch (error) {
console.error('Erro no endpoint /sticker/figu_memes:', error);
res.status(500).json({ 
status: false, 
mensagem: "Erro interno ao processar a solicitação." });
}
})

//➪ Figurinhas Animes
app.all('/sticker/figu_anime', async (req, res) => {
try {
const { apikey } = req.query;
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await buscarUsuarioPorApiKey(apikey, 'figurunhasAnimes');
if (erro) return res.status(403).json({ erro });
const { figurinhas } = require('./banco_dados/figurinhas/pack_anime.json');
if (!Array.isArray(figurinhas) || figurinhas.length === 0) {
return res.status(404).json({ erro: 'Nenhuma figurinha disponível no pack_anime.json' });
}
const randomIndex = Math.floor(Math.random() * figurinhas.length);
const figurinha = figurinhas[randomIndex];
const buffer = await getBuffer(figurinha);
res.setHeader('Content-Type', 'image/webp');
res.send(buffer);
} catch (error) {
console.error('Erro no endpoint /sticker/figu_anime:', error);
res.status(500).json({ status: false,
mensagem: 'Erro interno ao processar a solicitação.' });
}
});

//➪ Figurinhas Coreanas
app.all('/sticker/figu_coreana', async (req, res) => {
try {
const { apikey } = req.query;
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await buscarUsuarioPorApiKey(apikey, 'figurunhasCoreanas');
if (erro) return res.status(403).json({ erro });
const { figurinhas } = require('./banco_dados/figurinhas/pack_coreanas.json');
if (!Array.isArray(figurinhas) || figurinhas.length === 0) {
return res.status(404).json({ erro: 'Nenhuma figurinha disponível no pack_coreanas.json' });
}
const indiceAleatorio = Math.floor(Math.random() * figurinhas.length);
const urlFigurinha = figurinhas[indiceAleatorio];
const buffer = await getBuffer(urlFigurinha);
res.setHeader('Content-Type', 'image/webp');
res.send(buffer);
} catch (error) {
console.error('Erro no endpoint /sticker/figu_coreana:', error);
res.status(500).json({ 
status: false,
mensagem: 'Erro interno ao processar a solicitação.' });
}
});

//➪ Figurinhas Desenho
app.all('/sticker/figu_desenho', async (req, res) => {
try {
const { apikey } = req.query;
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await buscarUsuarioPorApiKey(apikey, 'figurunhasDesenho');
if (erro) return res.status(403).json({ erro });
const { figurinhas } = require('./banco_dados/figurinhas/pack_desenho.json');
if (!Array.isArray(figurinhas) || figurinhas.length === 0) {
return res.status(404).json({ erro: 'Nenhuma figurinha disponível no pack_desenho.json' });
}
const indiceAleatorio = Math.floor(Math.random() * figurinhas.length);
const urlFigurinha = figurinhas[indiceAleatorio];
const buffer = await getBuffer(urlFigurinha);
res.setHeader('Content-Type', 'image/webp');
res.send(buffer);
} catch (error) {
console.error('Erro no endpoint /sticker/figu_desenho:', error);
res.status(500).json({ 
  status: false,
  mensagem: 'Erro interno ao processar a solicitação.' });
}
});

//➪ Figurinhas Animais
app.all('/sticker/figu_animais', async (req, res) => {
try {
const { apikey } = req.query;
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await buscarUsuarioPorApiKey(apikey, 'figurunhasAnimais');
if (erro) return res.status(403).json({ erro });
const { figurinhas } = require('./banco_dados/figurinhas/pack_animais.json');
if (!Array.isArray(figurinhas) || figurinhas.length === 0) {
return res.status(404).json({ erro: 'Nenhuma figurinha disponível no pack_animais.json' });
}
const indiceAleatorio = Math.floor(Math.random() * figurinhas.length);
const urlFigurinha = figurinhas[indiceAleatorio];
const buffer = await getBuffer(urlFigurinha);
res.setHeader('Content-Type', 'image/webp');
res.send(buffer);
} catch (error) {
console.error('Erro no endpoint /sticker/figu_animais:', error);
res.status(500).json({ 
status: false,
mensagem: 'Erro interno ao processar a solicitação.' });
}
});

//➪ Figurinhas Raiva
app.all('/sticker/figu_raiva', async (req, res) => {
try {
const { apikey } = req.query;
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await buscarUsuarioPorApiKey(apikey, 'figurunhasRaiva');
if (erro) return res.status(403).json({ erro });
const { figurinhas } = require('./banco_dados/figurinhas/pack_figu_raiva.json');
if (!Array.isArray(figurinhas) || figurinhas.length === 0) {
return res.status(404).json({ erro: 'Nenhuma figurinha disponível no pack_figu_raiva.json' });
}
const indiceAleatorio = Math.floor(Math.random() * figurinhas.length);
const urlFigurinha = figurinhas[indiceAleatorio];
const buffer = await getBuffer(urlFigurinha);
res.setHeader('Content-Type', 'image/webp');
res.send(buffer);
} catch (error) {
console.error('Erro no endpoint /sticker/figu_raiva:', error);
res.status(500).json({ 
status: false,
mensagem: 'Erro interno ao processar a solicitação.' });
}
});

//➪ Figurinhas Roblox
app.all('/sticker/figu_roblox', async (req, res) => {
try {
const { apikey } = req.query;
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await buscarUsuarioPorApiKey(apikey, 'figurunhasRoblox');
if (erro) return res.status(403).json({ erro });
const { figurinhas } = require('./banco_dados/figurinhas/pack_figu_roblox.json');
if (!Array.isArray(figurinhas) || figurinhas.length === 0) {
return res.status(404).json({ erro: 'Nenhuma figurinha disponível no pack_figu_roblox.json' });
}
const indiceAleatorio = Math.floor(Math.random() * figurinhas.length);
const urlFigurinha = figurinhas[indiceAleatorio];
const buffer = await getBuffer(urlFigurinha);
res.setHeader('Content-Type', 'image/webp');
res.send(buffer);
} catch (error) {
console.error('Erro no endpoint /sticker/figu_roblox:', error);
res.status(500).json({ 
  status: false,
  mensagem: 'Erro interno ao processar a solicitação.' });
}
});

//➪ Figurinhas Ides
app.all('/sticker/:nomesFigu', async (req, res) => {
try {
const { nomesFigu } = req.params;
const { apikey } = req.query;  
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await buscarUsuarioPorApiKey(apikey, 'figurunhasIds');
if (erro) { return res.status(403).json({ erro }); }
   try {
const config = {
'figu_m18': { pastaName: '+18', NomeFig: 'figurinhas', max: 89 },
figu_memes2: { pastaName: 'memes', NomeFig: 'figurinhas', max: 49 },
figu_anime2: { pastaName: 'animes', NomeFig: 'figurinhas', max: 220 },
figu_coreanas2: { pastaName: 'coreanas', NomeFig: 'figurinhas', max: 73 },
figu_gatos: { pastaName: 'gatos', NomeFig: 'figurinhas', max: 108 },
};
if (!config[nomesFigu]) return res.status(400).json({ erro: 'Tipo de figurinha inválido' });
const { pastaName, NomeFig, max } = config[nomesFigu];
res.type('png')
var numero = Math.floor(Math.random() * max)
res.send(await getBuffer(`https://pedrozz13755.github.io/Arquivos_web/figurinhas/${pastaName}/${NomeFig}${numero}.webp`))
} catch (e) {
console.error('Erro interno na rota:', e) 
res.send(msgApi.error || { erro: 'Erro ao carregar figurinha' })
}
} catch (error) {
console.error('Erro no endpoint:', error); 
res.status(500).json({ status: false, mensagem: "Erro interno ao processar a solicitação." });
}
})
/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Rotas『apikey』༻
// ➪ ROTAS POLÍTICA 
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
//➪ Política lula Flix
app.get("/api/politica/lulaflix", async (req, res) => {
const { apikey } = req.query;
if (!apikey) return res.status(400).json({ erro: "Parâmetro 'apikey' é obrigatório" });
const erro = await buscarUsuarioPorApiKey(apikey, 'lulaflix');
if (erro) return res.status(403).json({ erro });
try {
const resposta = await lulaFlix();
res.json(resposta);
} catch (e) {
res.status(500).json({
status: false,
criador,
erro: 'Erro ao buscar notícias',
detalhes: e.message });
}
});

//➪ Política partido liberal pl
app.get("/api/politica/partidoliberal", async (req, res) => {
const { apikey } = req.query;
if (!apikey) return res.status(400).json({ erro: "Parâmetro 'apikey' é obrigatório" });
const erro = await buscarUsuarioPorApiKey(apikey, 'partidoliberal');
if (erro) return res.status(403).json({ erro });
try {
const resposta = await partidoLiberal();
res.json(resposta);
} catch (e) {
res.status(500).json({
status: false,
criador,
erro: 'Erro ao buscar notícias do PL',
detalhes: e.message });
}
});

//➪ Política Partido Dos Trabalhadores
app.get("/api/politica/pt", async (req, res) => {
const { apikey } = req.query;
if (!apikey) return res.status(400).json({ erro: "Parâmetro 'apikey' é obrigatório" });
const erro = await buscarUsuarioPorApiKey(apikey, 'partidotrabalhadores');
if (erro) return res.status(403).json({ erro });
try {
const resposta = await partidoDosTrabalhadores();
res.json(resposta);
} catch (e) {
res.status(500).json({
status: false,
criador,
erro: 'Erro ao buscar notícias do PT',
detalhes: e.message });
}
});

//➪ Política Agenda Do Congresso
app.get("/api/politica/agenda-congresso", async (req, res) => {
const { apikey } = req.query;
if (!apikey) return res.status(400).json({ erro: "Parâmetro 'apikey' é obrigatório" });
const erro = await buscarUsuarioPorApiKey(apikey, 'agenda_congresso');
if (erro) return res.status(403).json({ erro });
try {
res.json(await agendaCongresso());
} catch (e) {
res.status(500).json({ status: false, criador, erro: 'Erro ao carregar agenda', detalhes: e.message });
}
});

//➪ Política Projetos De Lei
app.get("/api/politica/projetos-leis", async (req, res) => {
const { apikey } = req.query;
if (!apikey) return res.status(400).json({ erro: "Parâmetro 'apikey' é obrigatório" });
const erro = await buscarUsuarioPorApiKey(apikey, 'projetos_leis');
if (erro) return res.status(403).json({ erro });
try {
res.json(await projetosLeis());
} catch (e) {
res.status(500).json({ status: false, criador, erro: 'Erro ao carregar projetos', detalhes: e.message });
}
});
/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Rotas『apikey』༻
// ➪ ROTAS MEMES 
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
//➪ memes anime memes
app.get('/api/imagem/animememe', async (req, res) => {
const { apikey } = req.query;
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await buscarUsuarioPorApiKey(apikey, 'animememe');
if (erro) return res.status(403).json({ erro });
try {
const link = animememe[Math.floor(Math.random() * animememe.length)];
const resposta = await axios.get(link, { responseType: 'stream' });
res.setHeader('Content-Type', resposta.headers['content-type']);
resposta.data.pipe(res); 
} catch (e) {
res.status(500).json({
status: false,
criador,
erro: 'Erro ao carregar memes',
detalhes: e.message });
}
});

//➪ memes vídeo de memes
app.get('/api/memes/video', async (req, res, next) => {
const { apikey } = req.query;
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await buscarUsuarioPorApiKey(apikey);
if (erro) return res.status(403).json({ erro });
try {
const termo = termoAleatorio();
const api = await ytSearch(termo);
if (!api || !api[0] || !api[0].url) throw new Error('Nenhum vídeo encontrado');
const indiceAleatorio = Math.floor(Math.random() * api.length);
const videoEscolhido = api[indiceAleatorio];
const dadosVideo = await ytMp4(videoEscolhido.url);
const linkBruto = typeof dadosVideo.link === 'function' ? dadosVideo.link() : dadosVideo.link;
const linkVideo = limparLink(linkBruto);
if (!linkVideo) throw new Error('Link do vídeo não pôde ser obtido');
res.setHeader('Content-Type', 'video/mp4');
res.setHeader('Content-Disposition', 'inline');
const url = new URL(linkVideo);
const protocolo = url.protocol === 'https:' ? https : http;
protocolo.get(linkVideo, (stream) => {
pipeline(stream, res, (erroStream) => {
if (erroStream && !res.headersSent) {
res.json({ status: false, codigo: 500, criador, resultado: "Erro ao transmitir o vídeo" });
}});
}).on('error', (e) => {
if (!res.headersSent) {
res.json({ status: false, codigo: 400, criador, resultado: "Deu erro ao solicitar seu vídeo...." });
}
console.log(e);
});
} catch (e) {
if (!res.headersSent) {
res.json({ status: false, codigo: 400, criador, resultado: "Deu erro ao solicitar seu vídeo...." });
}
console.log(e);
}
});

//➪ memes áudio de meme 
app.get('/api/memes/audio', async (req, res) => {
const { apikey } = req.query;
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await buscarUsuarioPorApiKey(apikey);
if (erro) return res.status(403).json({ erro });
try {
const termo = termoAudioAleatorio();
const api = await ytSearch(termo);
if (!api || !api.length) {
return res.json({ status: false, resultado: 'Nenhum áudio encontrado.' });
}
const indice = Math.floor(Math.random() * api.length);
const urlVideo = api[indice].url;
const mp3Url = await ytMp3(urlVideo);
if (!mp3Url || !mp3Url.startsWith('http')) {
return res.json({ status: false, resultado: 'Link MP3 inválido.' });
}
const response = await axios({
method: 'get',
url: mp3Url,
responseType: 'stream'
});
res.setHeader('Content-Type', 'audio/mpeg');
res.setHeader('Content-Disposition', 'inline');
res.setHeader('Transfer-Encoding', 'chunked');
response.data.pipe(res);
} catch (e) {
console.error(e);
res.json({ status: false, resultado: 'Ocorreu um erro ao processar o áudio.' });
}
});
/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Rotas『apikey』༻
// ➪ ROTAS EDTS
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
//➪ edit youtuber
app.get('/api/edits/youtuber', async (req, res, next) => {
const { apikey } = req.query;
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await buscarUsuarioPorApiKey(apikey);
if (erro) return res.status(403).json({ erro });
try {
const termo = termoYoutuberAleatorio();
const api = await ytSearch(termo);
if (!api || !api.length) throw new Error('Nenhum vídeo encontrado');
const indice = Math.floor(Math.random() * api.length);
const videoEscolhido = api[indice];
const dadosVideo = await ytMp4(videoEscolhido.url);
const linkBruto = typeof dadosVideo.link === 'function' ? dadosVideo.link() : dadosVideo.link;
const linkVideo = limparLink(linkBruto);
if (!linkVideo) throw new Error('Link do vídeo não pôde ser obtido');
res.setHeader('Content-Type', 'video/mp4');
res.setHeader('Content-Disposition', 'inline');
const url = new URL(linkVideo);
const protocolo = url.protocol === 'https:' ? https : http;
protocolo.get(linkVideo, (stream) => {
pipeline(stream, res, (erroStream) => {
if (erroStream && !res.headersSent) {
res.json({ status: false, codigo: 500, criador, resultado: "Erro ao transmitir o vídeo" });
}
});
}).on('error', (e) => {
if (!res.headersSent) {
res.json({ status: false, codigo: 400, criador, resultado: "Deu erro ao solicitar seu vídeo...." });
}
console.log(e);
});
} catch (e) {
if (!res.headersSent) {
res.json({ status: false, codigo: 400, criador, resultado: "Deu erro ao solicitar seu vídeo...." });
}
console.log(e);
}
});

//➪ Edits Aleatórios
app.get('/api/video/edts', async (req, res) => {
const { apikey } = req.query;
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await buscarUsuarioPorApiKey(apikey, 'edts');
if (erro) return res.status(403).json({ erro });
try {
const link = edts[Math.floor(Math.random() * edts.length)];
const response = await axios.get(link, {
responseType: 'stream',
headers: { 'User-Agent': 'Mozilla/5.0' } 
});
res.setHeader('Content-Type', 'video/mp4');
response.data.pipe(res);
} catch (e) { 
consoleErro(e);
res.status(500).json({ status: false, resultado: "ocorreu um erro ao buscar vídeo editado." });
}
});

//➪ Edits Jujutsu Kaisen
app.get('/api/video/editsjujutsu', async (req, res) => {
const { apikey } = req.query;
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await buscarUsuarioPorApiKey(apikey, 'editsjujutsu');
if (erro) return res.status(403).json({ erro });
try {
const link = editsjujutsu[Math.floor(Math.random() * editsjujutsu.length)];
const response = await axios.get(link, {
responseType: 'stream',
headers: { 'User-Agent': 'Mozilla/5.0' }
});
res.setHeader('Content-Type', 'video/mp4');
response.data.pipe(res);
} catch (e) { 
consoleErro(e);
res.status(500).json({ status: false, resultado: "ocorreu um erro ao buscar edits de Jujutsu." });
}
});

//➪ Edits Naruto
app.get('/api/video/editsnaruto', async (req, res) => {
const { apikey } = req.query;
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await buscarUsuarioPorApiKey(apikey, 'editsnaruto');
if (erro) return res.status(403).json({ erro });
try {
const link = editsnaruto[Math.floor(Math.random() * editsnaruto.length)];
const response = await axios.get(link, { responseType: 'stream' });
res.setHeader('Content-Type', response.headers['content-type']);
response.data.pipe(res);
} catch (e) { 
consoleErro(e);
res.status(500).json({ status: false, resultado: "ocorreu um erro ao buscar editsnaruto." });
}
});

//➪ Edits Free Fire
app.get('/api/video/freefire', async (req, res) => {
const { apikey } = req.query;
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await buscarUsuarioPorApiKey(apikey, 'freefire');
if (erro) return res.status(403).json({ erro });
try {
const link = freefire[Math.floor(Math.random() * freefire.length)];
const response = await axios.get(link, { responseType: 'stream' });
res.setHeader('Content-Type', response.headers['content-type']);
response.data.pipe(res);
} catch (e) { 
consoleErro(e);
res.status(500).json({ status: false, resultado: "ocorreu um erro ao buscar freefire." });
}
});

/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Rotas『apikey』༻
// ➪ ROTAS Canvas
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
//➪ Canvas Bem-Vindo
app.get("/api/canva/bemVindo", async (req, res) => {
const { titulo, avatar, fundo, desc, nome } = req.query
if (!titulo || !avatar || !fundo || !desc || !nome) {
return res.status(500).send("Parâmetro titulo, avatar, fundo, desc, nome são obrigatórios")
}
const apikey = req.query.apikey;
if (!apikey) {
return res.status(500).send("Parâmetro apikey é obrigatório")
}
const erro = await buscarUsuarioPorApiKey(apikey, "bemVindo");
if (erro) {
return res.status(403).json({ erro });
}
try {
const buffer = await canvaBemVindo(nome, avatar, fundo, titulo, desc)
res.setHeader("Content-Type", "image/png")
res.send(buffer)
} catch (e) {
console.log("ERRO REAL:", e)
res.json({
status: "false",
criador: "Tosh Tech",
erro: e.message })
}
})

//➪ Canvas Bem-Vindo2
app.get("/api/canva/bemVindo2", async (req, res) => {
const { titulo, avatar, fundo, desc, nome } = req.query
if (!titulo || !avatar || !fundo || !desc || !nome) {
return res.status(500).send("Parâmetro titulo, avatar, fundo, desc, nome são obrigatórios")
}
const apikey = req.query.apikey;
if (!apikey) {
return res.status(500).send("Parâmetro apikey é obrigatório")
}
const erro = await buscarUsuarioPorApiKey(apikey, "bemVindo2");
if (erro) {
return res.status(403).json({ erro });
}
try {
const buffer = await canvaBemVindo2(nome, avatar, fundo, titulo, desc)
res.setHeader("Content-Type", "image/png")
res.send(buffer)
} catch (e) {
console.log("ERRO REAL:", e)
res.json({
status: "false",
criador: "Tosh Tech",
erro: e.message })
}
})

//➪ Canvas Bem-Vindo3
app.get("/api/canva/bemVindo3", async (req, res) => {
const { titulo, avatar, fundo, desc, nome } = req.query
if (!titulo || !avatar || !fundo || !desc || !nome) {
return res.status(500).send("Parâmetro titulo, avatar, fundo, desc, nome são obrigatórios")
}
const apikey = req.query.apikey;
if (!apikey) {
return res.status(500).send("Parâmetro apikey é obrigatório")
}
const erro = await buscarUsuarioPorApiKey(apikey, "bemVindo3");
if (erro) {
return res.status(403).json({ erro });
}
try {
const buffer = await canvaBemVindo3(nome, avatar, fundo, titulo, desc)
res.setHeader("Content-Type", "image/png")
res.send(buffer)
} catch (e) {
console.log("ERRO REAL:", e)
res.json({
status: "false",
criador: "Tosh Tech",
erro: e.message })
}
})

//➪ Canvas musicCard
app.get("/api/canva/musicCard", async (req, res) => {
const { avatar, artistName, time, name } = req.query;
if (!avatar || !artistName || !time || !name) {
return res.status(400).json({ 
status: false, 
criador: "Tosh Tech",
erro: "Parâmetros avatar, artistName, time e name são obrigatórios" 
});
}
const apikey = req.query.apikey;
if (!apikey) {
return res.status(400).json({ 
status: false, 
criador: "Tosh Tech",
erro: "Parâmetro apikey é obrigatório" 
});
}
const erro = await buscarUsuarioPorApiKey(apikey, "musicCard");
if (erro) {
return res.status(403).json({ status: false, criador: "Tosh Tech", erro });
}
try {
const buffer = await canvaMusicCard(avatar, artistName, time, name);
res.setHeader("Content-Type", "image/png");
res.send(buffer);
} catch (e) {
console.log("ERRO MusicCard:", e);
res.json({
status: false,
criador: "Tosh Tech",
erro: `Falha ao gerar cartão: ${e.message}`
});
}
});

//➪ Canvas musicCard2
app.get("/api/canva/musicCard2", async (req, res) => {
const { avatar, artistName, time, name } = req.query;
if (!avatar || !artistName || !time || !name) {
return res.status(400).json({ 
status: false, 
criador: "Tosh Tech",
erro: "Parâmetros avatar, artistName, time e name são obrigatórios" 
});
}
const apikey = req.query.apikey;
if (!apikey) {
return res.status(400).json({ 
status: false, 
criador: "Tosh Tech",
erro: "Parâmetro apikey é obrigatório" 
});
}
const erro = await buscarUsuarioPorApiKey(apikey, "musicCard2");
if (erro) {
return res.status(403).json({ status: false, criador: "Tosh Tech", erro });
}
try {
const buffer = await canvaMusicCard2(avatar, artistName, time, name);
res.setHeader("Content-Type", "image/png");
res.send(buffer);
} catch (e) {
console.log("ERRO MusicCard2:", e);
res.json({
status: false,
criador: "Tosh Tech",
erro: `Falha ao gerar cartão: ${e.message}`
});
}
});

//➪ Canvas musicCard3
app.get("/api/canva/musicCard3", async (req, res) => {
const { avatar, artistName, time, name } = req.query;
if (!avatar || !artistName || !time || !name) {
return res.status(400).json({ 
status: false, 
criador: "Tosh Tech",
erro: "Parâmetros avatar, artistName, time e name são obrigatórios" 
});
}
const apikey = req.query.apikey;
if (!apikey) {
return res.status(400).json({ 
status: false, 
criador: "Tosh Tech",
erro: "Parâmetro apikey é obrigatório" 
});
}
const erro = await buscarUsuarioPorApiKey(apikey, "musicCard3");
if (erro) {
return res.status(403).json({ status: false, criador: "Tosh Tech", erro });
}
try {
const buffer = await canvaMusicCard3(avatar, artistName, time, name);
res.setHeader("Content-Type", "image/png");
res.send(buffer);
} catch (e) {
console.log("ERRO MusicCard3:", e);
res.json({
status: false,
criador: "Tosh Tech",
erro: `Falha ao gerar cartão: ${e.message}`
});
}
});

//➪ Canvas card level Cyber Aqua Neon
app.get("/api/canva/level", async (req, res) => {
const { avatar, fundo, nome, level1, level2 } = req.query;
if (!nome || !avatar || !fundo || !level1 || !level2) return res.status(400).json({status:false,criador:"Tosh Tech",erro:"Parâmetros nome, avatar, fundo, level1 e level2 são obrigatórios"});
const apikey = req.query.apikey;
if (!apikey) return res.status(400).json({status:false,criador:"Tosh Tech",erro:"Parâmetro apikey é obrigatório"});
const erro = await buscarUsuarioPorApiKey(apikey, "level");
if (erro) return res.status(403).json({status:false,criador:"Tosh Tech",erro});
try {
const buffer = await canvaLevel(avatar, fundo, nome, level1, level2);
res.setHeader("Content-Type", "image/png");
res.send(buffer);
} catch (e) {
console.log("ERRO CANVA LEVEL:", e);
res.json({status:false,criador:"Tosh Tech",erro:`Falha ao gerar cartão: ${e.message}`});
}
});

//➪ Canvas card level Royal Gold Diamond
app.get("/api/canva/level-gold", async (req, res) => {
const { avatar, fundo, nome, level1, level2 } = req.query;
if (!nome || !avatar || !fundo || !level1 || !level2) return res.status(400).json({status:false,criador:"Tosh Tech",erro:"Parâmetros nome, avatar, fundo, level1 e level2 são obrigatórios"});
const apikey = req.query.apikey;
if (!apikey) return res.status(400).json({status:false,criador:"Tosh Tech",erro:"Parâmetro apikey é obrigatório"});
const erro = await buscarUsuarioPorApiKey(apikey, "level-gold");
if (erro) return res.status(403).json({status:false,criador:"Tosh Tech",erro});
try {
const buffer = await canvaLevelGold(avatar, fundo, nome, level1, level2);
res.setHeader("Content-Type", "image/png");
res.send(buffer);
} catch (e) {
console.log("ERRO CANVA LEVEL GOLD:", e);
res.json({status:false,criador:"Tosh Tech",erro:`Falha ao gerar cartão: ${e.message}`});
}
});

//➪ Canvas card level Inferno Crimson Flame
app.get("/api/canva/level-fire", async (req, res) => {
const { avatar, fundo, nome, level1, level2 } = req.query;
if (!nome || !avatar || !fundo || !level1 || !level2) return res.status(400).json({status:false,criador:"Tosh Tech",erro:"Parâmetros nome, avatar, fundo, level1 e level2 são obrigatórios"});
const apikey = req.query.apikey;
if (!apikey) return res.status(400).json({status:false,criador:"Tosh Tech",erro:"Parâmetro apikey é obrigatório"});
const erro = await buscarUsuarioPorApiKey(apikey, "level-fire");
if (erro) return res.status(403).json({status:false,criador:"Tosh Tech",erro});
try {
const buffer = await canvaLevelFire(avatar, fundo, nome, level1, level2);
res.setHeader("Content-Type", "image/png");
res.send(buffer);
} catch (e) {
console.log("ERRO CANVA LEVEL FIRE:", e);
res.json({status:false,criador:"Tosh Tech",erro:`Falha ao gerar cartão: ${e.message}`});
}
});

//➪ Canvas card duelo Cyber Duelo
app.get("/api/canva/duelo/cyber", async (req, res) => {
const { avatar1, avatar2, nome1, nome2, pontos1, pontos2, titulo, apikey } = req.query;
if (!apikey) return res.status(400).json({ erro: "API Key obrigatória" });
  const erro = await buscarUsuarioPorApiKey(apikey, "Duelo");
if (erro) return res.status(403).json({ erro });
const cartao = await canvaDueloCyber(
avatar1, avatar2, 
nome1 || "JOGADOR 1", nome2 || "JOGADOR 2",
pontos1 || 0, pontos2 || 0,
titulo
);
res.setHeader("Content-Type", "image/png");
res.send(cartao);
});

//➪ Canvas card duelo Royal Duelo
app.get("/api/canva/duelo/royal", async (req, res) => {
const { avatar1, avatar2, nome1, nome2, pontos1, pontos2, titulo, apikey } = req.query;
if (!apikey) return res.status(400).json({ erro: "API Key obrigatória" });
const erro = await buscarUsuarioPorApiKey(apikey, "Duelo");
if (erro) return res.status(403).json({ erro });
const cartao = await canvaDueloRoyal(avatar1, avatar2, nome1, nome2, pontos1, pontos2, titulo);
res.setHeader("Content-Type", "image/png");
res.send(cartao);
});

//➪ Canvas card duelo Inferno Duelo
app.get("/api/canva/duelo/inferno", async (req, res) => {
const { avatar1, avatar2, nome1, nome2, pontos1, pontos2, titulo, apikey } = req.query;
if (!apikey) return res.status(400).json({ erro: "API Key obrigatória" });
const erro = await buscarUsuarioPorApiKey(apikey, "Duelo");
if (erro) return res.status(403).json({ erro });
const cartao = await canvaDueloInferno(avatar1, avatar2, nome1, nome2, pontos1, pontos2, titulo);
  res.setHeader("Content-Type", "image/png");
res.send(cartao);
});

//➪ Canvas card Casal Eternal Love 
app.get("/api/canva/casal/eterno", async (req, res) => {
const { avatar1, avatar2, nome1, nome2, dias, data, frase, apikey } = req.query;
if (!apikey) return res.status(400).json({ erro: "API Key obrigatória" });
const erro = await buscarUsuarioPorApiKey(apikey, "Casal");
if (erro) return res.status(403).json({ erro });
const cartao = await canvaCasalEterno(
avatar1, avatar2, nome1, nome2,
dias || "0", data || "01/01/2026", frase
);
res.setHeader("Content-Type", "image/png");
res.send(cartao);
});

//➪ Canvas card Casal golden bond
app.get("/api/canva/casal/dourado", async (req, res) => {
const { avatar1, avatar2, nome1, nome2, dias, data, frase, apikey } = req.query;
if (!apikey) return res.status(400).json({ erro: "API Key obrigatória" });
const erro = await buscarUsuarioPorApiKey(apikey, "Casal");
if (erro) return res.status(403).json({ erro });
const cartao = await canvaCasalDourado(avatar1, avatar2, nome1, nome2, dias, data, frase);
res.setHeader("Content-Type", "image/png");
res.send(cartao);
});

//➪ Canvas card Casal Passion Fire 
app.get("/api/canva/casal/paixao", async (req, res) => {
const { avatar1, avatar2, nome1, nome2, dias, data, frase, apikey } = req.query;
if (!apikey) return res.status(400).json({ erro: "API Key obrigatória" });
const erro = await buscarUsuarioPorApiKey(apikey, "Casal");
if (erro) return res.status(403).json({ erro });
const cartao = await canvaCasalPaixao(avatar1, avatar2, nome1, nome2, dias, data, frase);
res.setHeader("Content-Type", "image/png");
res.send(cartao);
});

//➪ Canvas card Ping animé
app.get("/api/canva/ping/anime", async (req, res) => {
const { ms, uptime, titulo, apikey } = req.query;
if (!apikey) return res.status(400).json({ erro: "API Key obrigatória" });
const erro = await buscarUsuarioPorApiKey(apikey, "Ping");
if (erro) return res.status(403).json({ erro });
if (!ms) return res.status(400).json({ erro: "Parâmetro ms é obrigatório" });
const cartao = await canvaPingAnime(Number(ms), uptime, titulo);
res.setHeader("Content-Type", "image/png");
res.send(cartao);
});

//➪ Canvas card Ping motor racing
app.get("/api/canva/ping/motor", async (req, res) => {
const { ms, uptime, titulo, apikey } = req.query;
if (!apikey) return res.status(400).json({ erro: "API Key obrigatória" });
const erro = await buscarUsuarioPorApiKey(apikey, "Ping");
if (erro) return res.status(403).json({ erro });
if (!ms) return res.status(400).json({ erro: "Parâmetro ms é obrigatório" });
const cartao = await canvaPingMotor(Number(ms), uptime, titulo);
res.setHeader("Content-Type", "image/png");
res.send(cartao);
});

//➪ Canvas card tech core
app.get("/api/canva/ping/tech", async (req, res) => {
const { ms, uptime, titulo, apikey } = req.query;
if (!apikey) return res.status(400).json({ erro: "API Key obrigatória" });
const erro = await buscarUsuarioPorApiKey(apikey, "Ping");
if (erro) return res.status(403).json({ erro });
if (!ms) return res.status(400).json({ erro: "Parâmetro ms é obrigatório" });
const cartao = await canvaPingTech(Number(ms), uptime, titulo);
res.setHeader("Content-Type", "image/png");
res.send(cartao);
});
/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Rotas『apikey』༻
// ➪ ROTAS Efeitos
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
//➪ Efeitos pixels
app.get("/api/efeitos/pixels",async(req,res)=>{
const {avatar,Apikey}=req.query;
if(!avatar)return res.status(400).json({erro:"Parâmetro avatar obrigatório",criador:"Tosh Tech"});
if(!Apikey)return res.status(403).json({erro:"Apikey obrigatória",criador:"Tosh Tech"});
const e=await buscarUsuarioPorApiKey(Apikey,"pixels");if(e)return res.status(403).json({erro:e,criador:"Tosh Tech"});
try{const img=await canvaPixel(avatar);res.type("png").send(img);}
catch(e){res.status(500).json({erro:"Falha ao gerar",detalhe:e.message,criador:"Tosh Tech"});}
});

//➪ Efeitos lgbt
app.get("/api/efeitos/lgbt",async(req,res)=>{
const {avatar,Apikey}=req.query;
if(!avatar)return res.status(400).json({erro:"Parâmetro avatar obrigatório",criador:"Tosh Tech"});
if(!Apikey)return res.status(403).json({erro:"Apikey obrigatória",criador:"Tosh Tech"});
const e=await buscarUsuarioPorApiKey(Apikey,"lgbt");if(e)return res.status(403).json({erro:e,criador:"Tosh Tech"});
try{const img=await canvaOrgulho(avatar);res.type("png").send(img);}
catch(e){res.status(500).json({erro:"Falha ao gerar",detalhe:e.message,criador:"Tosh Tech"});}
});

//➪ Efeitos anime
app.get("/api/efeitos/anime",async(req,res)=>{
const {avatar,Apikey}=req.query;
if(!avatar)return res.status(400).json({erro:"Parâmetro avatar obrigatório",criador:"Tosh Tech"});
if(!Apikey)return res.status(403).json({erro:"Apikey obrigatória",criador:"Tosh Tech"});
const e=await buscarUsuarioPorApiKey(Apikey,"anime");if(e)return res.status(403).json({erro:e,criador:"Tosh Tech"});
try{const img=await canvaAnime(avatar);res.type("png").send(img);}
catch(e){res.status(500).json({erro:"Falha ao gerar",detalhe:e.message,criador:"Tosh Tech"});}
});

//➪ Efeitos Grade
app.get("/api/efeitos/grade",async(req,res)=>{
const {avatar,Apikey}=req.query;
if(!avatar)return res.status(400).json({erro:"Avatar obrigatório",criador:"Tosh Tech"});
if(!Apikey)return res.status(403).json({erro:"Apikey obrigatória",criador:"Tosh Tech"});
const e=await buscarUsuarioPorApiKey(Apikey,"grade");if(e)return res.status(403).json({erro:e,criador:"Tosh Tech"});
try{res.type("png").send(await canvaGrade(avatar));}
catch(e){res.status(500).json({erro:"Falha ao gerar",criador:"Tosh Tech"});}
});

//➪ Efeitos Narcisista
app.get("/api/efeitos/narcisista",async(req,res)=>{
const {avatar,Apikey}=req.query;
if(!avatar)return res.status(400).json({erro:"Avatar obrigatório",criador:"Tosh Tech"});
if(!Apikey)return res.status(403).json({erro:"Apikey obrigatória",criador:"Tosh Tech"});
const e=await buscarUsuarioPorApiKey(Apikey,"narcisista");if(e)return res.status(403).json({erro:e,criador:"Tosh Tech"});
try{res.type("png").send(await canvaNarcisista(avatar));}
catch(e){res.status(500).json({erro:"Falha ao gerar",criador:"Tosh Tech"});}
});

//➪ Efeitos Preto E Branco
app.get("/api/efeitos/pretobranco",async(req,res)=>{
const {avatar,Apikey}=req.query;
if(!avatar)return res.status(400).json({erro:"Avatar obrigatório",criador:"Tosh Tech"});
if(!Apikey)return res.status(403).json({erro:"Apikey obrigatória",criador:"Tosh Tech"});
const e=await buscarUsuarioPorApiKey(Apikey,"pretobranco");if(e)return res.status(403).json({erro:e,criador:"Tosh Tech"});
try{res.type("png").send(await canvaPretoBranco(avatar));}
catch(e){res.status(500).json({erro:"Falha ao gerar",criador:"Tosh Tech"});}
});

//➪ Efeitos Cartaz Procurado
app.get("/api/efeitos/procurado",async(req,res)=>{
  const {avatar,nome,valor,Apikey}=req.query;
  if(!avatar)return res.status(400).json({erro:"Avatar obrigatório",criador:"Tosh Tech"});
  if(!Apikey)return res.status(403).json({erro:"Apikey obrigatória",criador:"Tosh Tech"});
  const e=await buscarUsuarioPorApiKey(Apikey,"procurado");if(e)return res.status(403).json({erro:e,criador:"Tosh Tech"});
  try{res.type("png").send(await canvaProcurado(avatar,nome||"MATADOR",valor||"999.999.999.999"));}
  catch(e){res.status(500).json({erro:"Falha ao gerar",criador:"Tosh Tech"});}
});

//➪ Efeitos Na Tv
app.get("/api/efeitos/natv",async(req,res)=>{
  const {avatar,Apikey}=req.query;
  if(!avatar)return res.status(400).json({erro:"Avatar obrigatório",criador:"Tosh Tech"});
  if(!Apikey)return res.status(403).json({erro:"Apikey obrigatória",criador:"Tosh Tech"});
  const e=await buscarUsuarioPorApiKey(Apikey,"natv");if(e)return res.status(403).json({erro:e,criador:"Tosh Tech"});
  try{res.type("png").send(await canvaNaTV(avatar));}
  catch(e){res.status(500).json({erro:"Falha ao gerar",criador:"Tosh Tech"});}
});

//➪ Efeitos Whatsapp
app.get("/api/efeitos/whatsapp", async (req, res) => {
const { avatar, nome, mensagem, hora, Apikey } = req.query;
if (!avatar) return res.status(400).json({ erro: "Avatar obrigatório", criador: "Tosh Tech" });
if (!Apikey) return res.status(403).json({ erro: "Apikey obrigatória", criador: "Tosh Tech" });
const erro = await buscarUsuarioPorApiKey(Apikey, "whatsapp");
if (erro) return res.status(403).json({ erro, criador: "Tosh Tech" });
try {
const buffer = await canvaWhatsApp(avatar, mensagem || "Tema top aí sim", nome || "Tosh Tech", hora || "21:24");
res.type("png").send(buffer);
} catch (e) {
res.status(500).json({ erro: "Falha ao gerar WhatsApp", criador: "Tosh Tech" });
}
});

//➪ Efeitos Facebook
app.get("/api/efeitos/facebook", async (req, res) => {
const { avatar, nome, mensagem, hora, Apikey } = req.query;
if (!avatar) return res.status(400).json({ erro: "Avatar obrigatório", criador: "Tosh Tech" });
if (!Apikey) return res.status(403).json({ erro: "Apikey obrigatória", criador: "Tosh Tech" });
const erro = await buscarUsuarioPorApiKey(Apikey, "facebook");
if (erro) return res.status(403).json({ erro, criador: "Tosh Tech" });
try {
const buffer = await canvaFacebook(avatar, nome || "Tosh Tech", mensagem || "Eu fiz uma música tá geral compartilhando kkkk", hora || "1h");
res.type("png").send(buffer);
} catch (e) {
res.status(500).json({ erro: "Falha ao gerar Facebook", criador: "Tosh Tech" });
}
});

//➪ Efeitos Manchete Jornal
app.get("/api/efeitos/jornal", async (req, res) => {
const { avatar, titulo, subtitulo, data, Apikey } = req.query;
if (!avatar) return res.status(400).json({ erro: "Avatar obrigatório", criador: "Tosh Tech" });
if (!Apikey) return res.status(403).json({ erro: "Apikey obrigatória", criador: "Tosh Tech" });
const erro = await buscarUsuarioPorApiKey(Apikey, "jornal");
if (erro) return res.status(403).json({ erro, criador: "Tosh Tech" });
try {
const buffer = await canvaJornal(avatar, titulo || "NOTÍCIA EXPLOSIVA", subtitulo || "O acontecimento que todo mundo está falando", data || "14 de Agosto de 2026");
res.type("png").send(buffer);
} catch (e) {
res.status(500).json({ erro: "Falha ao gerar Jornal", criador: "Tosh Tech" });
}
});
















const TOSH_SITE = 'https://tosh-tech.onrender.com';
//➪ Configurações Sistema De Ping
const PING_INTERVALO_PRINCIPAL = 13 * 60 * 1000;   // 🔁 A cada 13min
const PING_INTERVALO_SEGURANCA = 10 * 60 * 1000;   // 🔁 A cada 10min
const LIMPEZA_INTERVALO = 24 * 60 * 60 * 1000;     // 🧹 Uma vez por dia

//➪ Ping Principal — Mantém servidor acordado
async function manterAcordado() {
try {
const res = await fetch(TOSH_SITE, {
timeout: 10000,
headers: { 'User-Agent': 'ToshTech-Ping/2.1' }
});
console.log(`Ping Principal — Servidor ativo! Status: ${res.status} 🦅`);
} catch (erro) {
console.log(`⚠️ Ping Principal — Retentando em 1min... 🦅`);
setTimeout(manterAcordado, 60000);
}
}

//➪ Ping de Segurança
async function pingSeguranca() {
try {
await fetch(`${TOSH_SITE}/api/status`, {
method: 'HEAD',
timeout: 8000,
headers: { 'User-Agent': 'ToshTech-Seguranca/2.1' }
});
} catch {}
}

//➪ Limpeza automática de arquivos inativos
async function limparArquivosInativos() {
try {
console.log(`🧹 Iniciando limpeza de arquivos inativos... 🦅`);
console.log(`✅ Limpeza concluída 🦅`);
} catch (erro) {
console.log(`⚠️ Erro na limpeza: ${erro.message} 🦅`);
}
}

//➪ Inicializa Tudo
setInterval(manterAcordado, PING_INTERVALO_PRINCIPAL);
manterAcordado();
setInterval(pingSeguranca, PING_INTERVALO_SEGURANCA);
pingSeguranca();
setInterval(limparArquivosInativos, LIMPEZA_INTERVALO);
limparArquivosInativos();

console.log(`✅ SISTEMA DE PING ATIVO — Principal: 13min | Segurança: 10min 🦅`);

//➪ Inicialização do Servidor
global.DadosMembros = lerArquivo();
console.log(`🚀 Servidor Tosh Tech rodando na porta ${PORTA} 🦅`);
app.listen(PORTA);

module.exports = { verificarLogin, lerArquivo, salvarArquivo, buscarUsuario };




/*app.get('/api/userinfo2', (req, res) => {
  try {
    const dados = lerArquivo();
    res.json({ status: true, total: Object.keys(dados).length, dados: Object.values(dados).map(({senha, ...r}) => r) });
  } catch (erro) { res.status(500).json({ status: false, erro: 'Erro ao ler dados' }); }
});
*/


