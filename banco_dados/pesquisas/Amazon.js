/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Criador『Tosh』༻
➪ Módulo Amazon
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
const axios = require('axios');
const cheerio = require('cheerio');
const https = require('https');

const CONFIG = {
timeout: 30000,
maxTentativas: 3,
atrasoTentativa: 1200
};

const LISTA_CABECALHOS = [
{
'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
'Referer': 'https://www.amazon.com.br/',
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
},
{
'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
'Accept-Language': 'pt-BR,pt;q=0.8',
'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
}
];

async function amazonSearch(query) {
return new Promise(async (resolve, reject) => {
let tentativa = 0;
while (tentativa < CONFIG.maxTentativas) {
try {
const cabecalho = LISTA_CABECALHOS[tentativa % LISTA_CABECALHOS.length];
const resposta = await axios.get(
`https://www.amazon.com.br/s?k=${encodeURIComponent(query)}`,
{
headers: cabecalho,
timeout: CONFIG.timeout,
httpsAgent: new https.Agent({ rejectUnauthorized: false })
});

const dados = [];
const $ = cheerio.load(resposta.data);

//➪ Seletores 
$('div[data-asin]').each((i, elemento) => {
const asin = $(elemento).attr('data-asin');
if (!asin || asin.length === 0) return true;

let titulo = '';
titulo = $(elemento).find('h2 a span').text().trim();
if (!titulo) titulo = $(elemento).find('h2 span').text().trim();
if (!titulo) titulo = $(elemento).find('.a-size-medium').text().trim();
if (!titulo) titulo = $(elemento).find('.a-text-normal').first().text().trim();

let preco = '';
preco = $(elemento).find('.a-price .a-offscreen').first().text().trim();
if (!preco) preco = $(elemento).find('.a-price-whole').text().trim() + ',' + $(elemento).find('.a-price-fraction').text().trim();
if (!preco) preco = 'Indisponível';

const imagem = $(elemento).find('img.s-image').attr('src') || '';
const linkRelativo = $(elemento).find('h2 a').attr('href') || $(elemento).find('a.a-link-normal').attr('href') || '';
const link = linkRelativo ? ('https://www.amazon.com.br' + linkRelativo.split('?')[0]) : '';

if (titulo) {
dados.push({
titulo: titulo,
preco: preco,
imagem: imagem,
link: link });
}});

return resolve({
status: true,
criador: 'Tosh Tech',
total: dados.length,
resultado: dados });

} catch (erro) {
tentativa++;
if (tentativa >= CONFIG.maxTentativas) {
return reject(new Error(`Falha após ${tentativa} tentativas: ${erro.message}`));
}
await new Promise(pausa => setTimeout(pausa, CONFIG.atrasoTentativa));
}
}
});
}

module.exports = { amazonSearch };
