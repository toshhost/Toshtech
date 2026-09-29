/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Criador『Tosh』༻
➪ Módulo Notícias 
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
const axios = require('axios');

const CACHE_NOTICIAS = {};
const CONFIG = {
tempoCache: 1800000, //➪ 30min = notícias sempre atualizadas
timeout: 15000,
maxTentativas: 2
};

const CABECALHOS_SEGUROS = {
headers: {
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8',
'Accept': 'application/json' }
};

function esperar(ms) {
return new Promise(function(resolve) { setTimeout(resolve, ms); });
}

async function buscarNoticias(termo) {
let termoLimpo = '';
try {
if (!termo || typeof termo !== 'string') return [];
termoLimpo = termo.trim();
if (termoLimpo.length < 2) return [];

//➪ Cache primeiro
const chaveCache = termoLimpo.toLowerCase();
if (CACHE_NOTICIAS[chaveCache]) {
const cache = CACHE_NOTICIAS[chaveCache];
if (Date.now() - cache.tempo < CONFIG.tempoCache) {
console.log('[CACHE NOTÍCIAS]', termoLimpo);
return cache.lista;
}
}
let listaFinal = [];
let tentativa = 0;

while (tentativa <= CONFIG.maxTentativas && listaFinal.length === 0) {
try {
const url1 = 'https://api.duckduckgo.com/?q=' + encodeURIComponent(termoLimpo + " notícia brasil tecnologia") + '&format=json&no_html=1&t=tosh-tech&ia=news';
const res1 = await axios.get(url1, { ...CABECALHOS_SEGUROS, timeout: CONFIG.timeout });

if (res1 && res1.data) {
const relacionados = res1.data.RelatedTopics || [];
for (let i = 0; i < relacionados.length; i++) {
const item = relacionados[i];
if (!item || !item.Text || !item.URL) continue;
if (item.Text.toLowerCase().indexOf('notícia') === -1 && item.Text.toLowerCase().indexOf('noticia') === -1 && item.Text.toLowerCase().indexOf('lançamento') === -1) continue;

const partes = item.Text.split(' - ');
listaFinal.push({
id: item.URL.split('=').pop() || Date.now().toString() + i,
titulo: partes[0] || 'Sem título',
resumo: partes.slice(1).join(' - ') || 'Sem resumo',
fonte: item.URL.split('/')[2] || 'Fonte desconhecida',
data: 'Recente',
imagem: item.Icon && item.Icon.URL ? item.Icon.URL : '',
url: item.URL });
}
}

if (listaFinal.length === 0) {
const url2 = 'https://api.duckduckgo.com/?q=' + encodeURIComponent(termoLimpo) + '&format=json&no_html=1&t=tosh-tech';
const res2 = await axios.get(url2, { ...CABECALHOS_SEGUROS, timeout: CONFIG.timeout });
if (res2 && res2.data && res2.data.Abstract) {
listaFinal.push({
id: Date.now().toString(),
titulo: res2.data.Heading || 'Notícia relacionada',
resumo: res2.data.Abstract,
fonte: res2.data.AbstractURL ? new URL(res2.data.AbstractURL).hostname : 'Fonte',
data: 'Recente',
imagem: res2.data.Image || '',
url: res2.data.AbstractURL || ''
});
}
}
break;
} catch (e) {
tentativa++;
console.warn('[TENTATIVA NOTÍCIAS ' + tentativa + ']', e.message);
await esperar(1000 * tentativa);
}
}

listaFinal = listaFinal.slice(0, 10);
CACHE_NOTICIAS[chaveCache] = { tempo: Date.now(), lista: listaFinal };
return listaFinal;

} catch (erro) {
console.error('[ERRO NOTÍCIAS]', erro.message);
const chaveCache = termoLimpo ? termoLimpo.toLowerCase() : '';
if (chaveCache && CACHE_NOTICIAS[chaveCache]) return CACHE_NOTICIAS[chaveCache].lista;
return [];
}
}

module.exports = { buscarNoticias };
