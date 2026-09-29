/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Criador『Tosh』༻
➪ Módulo Youtube Pesquisa
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
const axios = require('axios');

//➪ Proteção Adicional
const CACHE_BUSCAS = {};
const CONFIG_PROTECAO = {
tempoCache: 180000, //➪ 3min de cache = menos requisições
maxTentativas: 2,
atrasoEntreTentativas: 1500
};

const CABECALHOS = {
headers: {
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8',
'Referer': 'https://www.youtube.com/',
'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
'Sec-Fetch-Mode': 'navigate',
'Sec-Fetch-Site': 'same-origin',
'Sec-Fetch-Dest': 'document',
'Cache-Control': 'no-cache',
'Pragma': 'no-cache'
},
timeout: 30000,
maxRedirects: 10,
validateStatus: function (status) {
return status >= 200 && status < 400;
}
};

function esperar(ms) {
return new Promise(function(resolve) {
return setTimeout(resolve, ms);
});
}

async function ytSearch(termo) {
try {
if (!termo || typeof termo !== 'string') return [];
const termoLimpo = termo.trim();
if (termoLimpo.length < 2) return [];

//➪ Verifica Cache Primeiro 
const chaveCache = termoLimpo.toLowerCase();
if (CACHE_BUSCAS[chaveCache]) {
const dadosCache = CACHE_BUSCAS[chaveCache];
if (Date.now() - dadosCache.tempo < CONFIG_PROTECAO.tempoCache) {
console.log('[CACHE] Usando resultado salvo:', termoLimpo);
return dadosCache.lista;
}
}

//➪ Retentativa Se Falhar 
let resposta = null;
let tentativa = 0;
while (tentativa <= CONFIG_PROTECAO.maxTentativas) {
try {
const urlBusca = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(termoLimpo);
resposta = await axios.get(urlBusca, CABECALHOS);
break;
} catch (erroReq) {
tentativa++;
console.warn('[TENTATIVA ' + tentativa + '] Falha na busca:', erroReq.message);
if (tentativa > CONFIG_PROTECAO.maxTentativas) throw erroReq;
await esperar(CONFIG_PROTECAO.atrasoEntreTentativas);
}
}

if (!resposta || !resposta.data || typeof resposta.data !== 'string') return [];

const jsonMatch = resposta.data.match(/var ytInitialData = (\{.*?\});<\/script>/s);
if (!jsonMatch || !jsonMatch[1]) return [];

const dados = JSON.parse(jsonMatch[1]);
if (!dados || !dados.contents) return [];

let itens = [];
let secaoPrincipal = null;

if (dados.contents.twoColumnSearchResultsRenderer) {
secaoPrincipal = dados.contents.twoColumnSearchResultsRenderer.primaryContents;
} else if (dados.contents.richGridRenderer) {
secaoPrincipal = dados.contents.richGridRenderer;
} else if (dados.contents.sectionListRenderer) {
secaoPrincipal = dados.contents.sectionListRenderer;
}

if (secaoPrincipal) {
if (secaoPrincipal.sectionListRenderer) {
const listaSecoes = secaoPrincipal.sectionListRenderer.contents;
if (listaSecoes && Array.isArray(listaSecoes)) {
for (let s = 0; s < listaSecoes.length; s++) {
const secao = listaSecoes[s];
if (secao.itemSectionRenderer && secao.itemSectionRenderer.contents && Array.isArray(secao.itemSectionRenderer.contents)) {
itens = secao.itemSectionRenderer.contents;
break;
}
}
}
} else if (secaoPrincipal.contents && Array.isArray(secaoPrincipal.contents)) {
itens = secaoPrincipal.contents;
}
}

if (itens.length === 0) return [];

const videos = [];
for (let i = 0; i < itens.length; i++) {
const item = itens[i];
if (!item) continue;

const video = item.videoRenderer || item.gridVideoRenderer || item.channelVideoRenderer;
if (!video) continue;

const id = video.videoId;
if (!id || typeof id !== 'string' || id.length !== 11) continue;

let titulo = 'Sem título';
if (video.title) {
if (video.title.simpleText) {
titulo = video.title.simpleText.trim();
} else if (video.title.runs && Array.isArray(video.title.runs) && video.title.runs[0]) {
titulo = video.title.runs[0].text.trim();
}
}

let capa = '';
if (video.thumbnail && video.thumbnail.thumbnails && Array.isArray(video.thumbnail.thumbnails)) {
let capaAlta = null;
for (let t = 0; t < video.thumbnail.thumbnails.length; t++) {
if (video.thumbnail.thumbnails[t].height >= 720) {
capaAlta = video.thumbnail.thumbnails[t];
break;
}
}
if (!capaAlta) {
capaAlta = video.thumbnail.thumbnails[video.thumbnail.thumbnails.length - 1];
}
if (capaAlta && capaAlta.url) {
capa = capaAlta.url.trim();
}
}

let canal = 'Canal desconhecido';
if (video.ownerText) {
if (video.ownerText.simpleText) {
canal = video.ownerText.simpleText.trim();
} else if (video.ownerText.runs && Array.isArray(video.ownerText.runs) && video.ownerText.runs[0]) {
canal = video.ownerText.runs[0].text.trim();
}
}

let duracao = '0:00';
if (video.lengthText) {
if (video.lengthText.simpleText) {
duracao = video.lengthText.simpleText.trim();
} else if (video.lengthText.runs && Array.isArray(video.lengthText.runs) && video.lengthText.runs[0]) {
duracao = video.lengthText.runs[0].text.trim();
}
}

let visualizacoes = 'Desconhecido';
if (video.viewCountText) {
if (video.viewCountText.simpleText) {
visualizacoes = video.viewCountText.simpleText.trim();
} else if (video.viewCountText.runs && Array.isArray(video.viewCountText.runs) && video.viewCountText.runs[0]) {
visualizacoes = video.viewCountText.runs[0].text.trim();
}
}

let publicado = 'Desconhecido';
if (video.publishedTimeText) {
if (video.publishedTimeText.simpleText) {
publicado = video.publishedTimeText.simpleText.trim();
} else if (video.publishedTimeText.runs && Array.isArray(video.publishedTimeText.runs) && video.publishedTimeText.runs[0]) {
publicado = video.publishedTimeText.runs[0].text.trim();
}
}

videos.push({
id: id,
titulo: titulo,
url: 'https://www.youtube.com/watch?v=' + id,
capa: capa,
canal: canal,
duracao: duracao,
visualizacoes: visualizacoes,
publicado: publicado
});
}

const resultadoFinal = videos.slice(0, 10);
    
//➪ Salva No Cache Para Não Repetir Requisição
CACHE_BUSCAS[chaveCache] = {
tempo: Date.now(),
lista: resultadoFinal
};

return resultadoFinal;
} catch (erro) {
console.error('[BUSCA YOUTUBE ERRO]', erro.message);
    
//➪ Se Der Erro, Retorna Cache Salvo Se Existir
const chaveCache = termoLimpo ? termoLimpo.toLowerCase() : '';
if (chaveCache && CACHE_BUSCAS[chaveCache]) {
console.log('[ALERTA] Usando cache de segurança');
return CACHE_BUSCAS[chaveCache].lista;
}
return [];
}
}

module.exports = { ytSearch };
