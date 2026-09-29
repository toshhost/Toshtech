/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Criador『Tosh』༻
➪ Módulo PL
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
const axios = require('axios');
const cheerio = require('cheerio');

//➪ Configurações
const CONFIG = {
timeout: 25000,
maxTentativas: 2,
atrasoTentativa: 1000
};

const CABECALHOS = {
'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
'Accept-Language': 'pt-BR,pt;q=0.8',
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
};

async function partidoLiberal() {
return new Promise(async (resolve, reject) => {
for (let tentativa = 1; tentativa <= CONFIG.maxTentativas; tentativa++) {
try {
const res = await axios.get('https://partidoliberal.org.br/', {
headers: CABECALHOS,
timeout: CONFIG.timeout });

const $ = cheerio.load(res.data);
const noticias = [];

$('li, article, .item, section').each((i, e) => {
const titulo = $(e).find('h1, h2, h3, h4, a').text().trim();
const link = $(e).find('a').attr('href');
const imagem = $(e).find('img').attr('src') || $(e).find('img').attr('data-src') || '';
          
const matchData = $(e).text().match(/\d{2}\/\d{2}\/\d{4}/);
const data = matchData ? matchData[0] : 'Data não informada';
          
const descricao = $(e).text().trim().replace(titulo, '').slice(0, 150).trim() + '...';

if (titulo && link && titulo.length > 15 && link.startsWith('http')) {
noticias.push({ titulo, imagem, data, descricao, link });
}
});

//➪ Remove Repetidos
const resultadoUnico = Array.from(new Map(noticias.map(n => [n.link, n])).values());
return resolve({
status: true,
criador: 'Tosh Tech',
total: resultadoUnico.length,
resultado: resultadoUnico
});

} catch (erro) {
if (tentativa < CONFIG.maxTentativas) {
await new Promise(r => setTimeout(r, CONFIG.atrasoTentativa));
} else {
return reject({
status: false,
criador: 'Tosh Tech',
erro: 'Falha após ' + CONFIG.maxTentativas + ' tentativas',
detalhes: erro.message
});
}
}
}
});
}

module.exports = { partidoLiberal };
