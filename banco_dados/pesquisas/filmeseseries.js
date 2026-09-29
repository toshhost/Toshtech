/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Criador『Tosh』༻
➪ Módulo Filmes e Séries 
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
const axios = require('axios');

const CACHE_FILMES = {};
const CONFIG = {
tempoCache: 7200000, // 2h de cache
timeout: 20000,
maxTentativas: 2
};

const CABECALHOS_SEGUROS = {
headers: {
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8',
'Referer': 'https://duckduckgo.com/',
'Accept': 'application/json'
}
};

function esperar(ms) {
return new Promise(function(resolve) { setTimeout(resolve, ms); });
}

//➪ Função Auxiliar: Verifica Se É Realmente Filme Ou Série
function ehProducaoValida(titulo, texto) {
const conteudo = (titulo + ' ' + texto).toLowerCase();
  const palavrasChave = ['filme', 'série', 'serie', 'temporada', 'episódio', 'episodio', 'cinema', 'televisão', 'tv', 'elenco', 'diretor', 'lançamento', 'produção'];
  const proibidas = ['cantor', 'cantora', 'músico', 'musico', 'artista', 'pessoa', 'biografia', 'político', 'autor', 'escritor'];
  
//➪ Se tem palavra proibida e NÃO tem nenhuma de produção, descarta
for (let p = 0; p < proibidas.length; p++) {
if (conteudo.indexOf(proibidas[p]) !== -1) {
let temProducao = false;
for (let c = 0; c < palavrasChave.length; c++) {
if (conteudo.indexOf(palavrasChave[c]) !== -1) {
temProducao = true;
break;
}
}
if (!temProducao) return false;
}
}

//➪ Se tem pelo menos uma palavra de produção, aceita
for (let c = 0; c < palavrasChave.length; c++) {
if (conteudo.indexOf(palavrasChave[c]) !== -1) return true;
}

//➪ Se for exatamente o termo buscado, aceita mesmo sem palavras extras
const termoBusca = conteudo.trim();
if (termoBusca.length > 3) return true;

return false;
}

async function buscarFilmes(termo) {
let termoLimpo = '';
try {
if (!termo || typeof termo !== 'string') return [];
termoLimpo = termo.trim();
if (termoLimpo.length < 2) return [];

//➪ Cache primeiro
const chaveCache = termoLimpo.toLowerCase();
if (CACHE_FILMES[chaveCache]) {
const cache = CACHE_FILMES[chaveCache];
if (Date.now() - cache.tempo < CONFIG.tempoCache) {
console.log('[CACHE FILMES]', termoLimpo);
return cache.lista;
}
}

let listaFinal = [];
let tentativa = 0;

while (tentativa <= CONFIG.maxTentativas && listaFinal.length === 0) {
try {
//➪ Fonte Principal: Duckduckgo Com Filtro Exato
const urlBusca = 'https://api.duckduckgo.com/?q=' + encodeURIComponent('"' + termoLimpo + '" série ou filme') + '&format=json&no_html=1&skip_disambig=0&t=tosh-tech';
const res = await axios.get(urlBusca, { ...CABECALHOS_SEGUROS, timeout: CONFIG.timeout });

if (res && res.data) {
//➪ Resultado principal
if (res.data.Heading && res.data.AbstractURL) {
const titulo = res.data.Heading;
const sinopse = res.data.Abstract || '';
if (ehProducaoValida(titulo, sinopse)) {
const ehSerie = sinopse.toLowerCase().indexOf('série') !== -1 || sinopse.toLowerCase().indexOf('temporada') !== -1;
listaFinal.push({
id: res.data.AbstractURL.split('/').pop() || Date.now().toString(),
tipo: ehSerie ? 'Série' : 'Filme',
titulo: titulo,
ano: 'Desconhecido',
poster: res.data.Image || '',
sinopse: sinopse.length > 300 ? sinopse.substr(0, 300) + '...' : sinopse,
nota: 'Sem nota',
url: res.data.AbstractURL });
}
}

//➪ Resultados relacionados — filtrados
const relacionados = res.data.RelatedTopics || [];
for (let i = 0; i < relacionados.length; i++) {
const item = relacionados[i];
if (!item || !item.Text || !item.URL) continue;
const partes = item.Text.split(' - ');
const tituloItem = partes[0] || 'Sem título';
const descricao = partes.slice(1).join(' - ') || '';

if (!ehProducaoValida(tituloItem, descricao)) continue;

const ehSerie = descricao.toLowerCase().indexOf('série') !== -1;
listaFinal.push({
id: item.URL.split('/').pop() || Date.now().toString() + i,
tipo: ehSerie ? 'Série' : 'Filme',
titulo: tituloItem,
ano: 'Desconhecido',
poster: item.Icon && item.Icon.URL ? item.Icon.URL : '',
sinopse: descricao.length > 250 ? descricao.substr(0, 250) + '...' : descricao,
nota: 'Sem nota',
url: item.URL });
}
}

//➪ Se Não Achou, Busca Direto Na Wikipédia Com Filtro De Categoria
if (listaFinal.length === 0) {
const urlWiki = 'https://pt.wikipedia.org/w/api.php?action=query&list=search&srsearch=' + encodeURIComponent(termoLimpo + ' filme série televisão') + '&format=json&srlimit=10&srprop=snippet|categorysnippet&origin=*';
const resWiki = await axios.get(urlWiki, { ...CABECALHOS_SEGUROS, timeout: CONFIG.timeout });

if (resWiki && resWiki.data && resWiki.data.query && resWiki.data.query.search) {
for (let j = 0; j < resWiki.data.query.search.length; j++) {
const wiki = resWiki.data.query.search[j];
const titulo = wiki.title || '';
const snippet = wiki.snippet.replace(/<[^>]*>/g, ' ').trim() || '';

if (!ehProducaoValida(titulo, snippet)) continue;

const ehSerie = titulo.toLowerCase().indexOf('série') !== -1 || snippet.toLowerCase().indexOf('série') !== -1;
listaFinal.push({
id: String(wiki.pageid || Date.now() + j),
tipo: ehSerie ? 'Série' : 'Filme',
titulo: titulo,
ano: 'Desconhecido',
poster: '',
sinopse: snippet.length > 250 ? snippet.substr(0, 250) + '...' : snippet,
nota: 'Sem nota',
url: 'https://pt.wikipedia.org/wiki/' + encodeURIComponent(titulo.replace(/ /g, '_'))
});
}
}
}
break;
} catch (erroFonte) {
tentativa++;
console.warn('[TENTATIVA FILMES ' + tentativa + ']', erroFonte.message);
await esperar(1200 * tentativa);
}
}

//➪ Remove Duplicatas E Pega Os Melhores
const unicos = [];
const idsVistos = {};
for (let k = 0; k < listaFinal.length; k++) {
const item = listaFinal[k];
if (!idsVistos[item.id]) {
idsVistos[item.id] = true;
unicos.push(item);
}
}
const resultadoFinal = unicos.slice(0, 10);
CACHE_FILMES[chaveCache] = { tempo: Date.now(), lista: resultadoFinal };
return resultadoFinal;

} catch (erroGeral) {
console.error('[ERRO GERAL FILMES]', erroGeral.message);
const chaveCache = termoLimpo ? termoLimpo.toLowerCase() : '';
if (chaveCache && CACHE_FILMES[chaveCache]) return CACHE_FILMES[chaveCache].lista;
return [];
}
}

module.exports = { buscarFilmes };
