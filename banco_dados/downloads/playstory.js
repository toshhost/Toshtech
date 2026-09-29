/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Criador『Tosh』༻
➪ Módulo Play story 
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
const axios = require('axios');
const cheerio = require('cheerio');
const https = require('https');

const CONFIG = {
timeout: 25000,
maxTentativas: 2,
atrasoTentativa: 1000
};

const CABECALHOS = {
'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
'Accept-Language': 'pt-BR,pt;q=0.8',
'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
};

//➪ Extrai Link Da Imagem Do Srcset
function extrairImagem(srcset) {
if (!srcset || typeof srcset !== 'string') return '';
const listaLinks = srcset.split(',').map(item => item.trim().split(' ')[0]);
return listaLinks[listaLinks.length - 1] || '';
}

async function playStoreSearch(query) {
return new Promise(async (resolve, reject) => {
if (!query || query.trim().length === 0) {
return resolve({
status: false,
criador: 'Tosh Tech',
erro: 'Termo de busca vazio',
total: 0,
resultado: []
});
}

let tentativa = 0;
while (tentativa < CONFIG.maxTentativas) {
try {
const termo = encodeURIComponent(query.trim());
const url = `https://play.google.com/store/search?q=${termo}&c=apps`;

const resposta = await axios.get(url, {
headers: CABECALHOS,
timeout: CONFIG.timeout,
httpsAgent: new https.Agent({ rejectUnauthorized: false })
});

const dados = [];
const $ = cheerio.load(resposta.data);

$('.VfPpkd-aGsRMb').each((i, elemento) => {
const nome = $(elemento).find('.DdYX5:first').text().trim();
const srcsetImg = $(elemento).find('img:first').attr('srcset') || '';
const imagem = extrairImagem(srcsetImg);
const desenvolvedor = $(elemento).find('.wMUdtb:first').text().trim();
const estrelas = $(elemento).find('.w2kbF:first').text().trim();
const caminhoLink = $(elemento).find('a:first').attr('href') || '';
const link = caminhoLink ? `https://play.google.com${caminhoLink}` : '';

if (nome && link) {
dados.push({
nome: nome,
imagem: imagem,
desenvolvedor: desenvolvedor,
estrelas: estrelas,
link: link });
}
});

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

module.exports = { playStoreSearch };
