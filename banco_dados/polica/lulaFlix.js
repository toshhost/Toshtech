/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Criador『Tosh』༻
➪ Módulo LulaFlix
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
const axios = require('axios');
const cheerio = require('cheerio');

//➪ configurações 
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

async function lulaFlix() {
return new Promise(async (resolve, reject) => {
for (let tentativa = 1; tentativa <= CONFIG.maxTentativas; tentativa++) {
try {
const res = await axios.get('https://lulaflix.com.br/', {
headers: CABECALHOS,
timeout: CONFIG.timeout
});
const $ = cheerio.load(res.data);
const noticias = [];

$('article, .post, .item').each((i, e) => {
const titulo = $(e).find('h2 a, h3 a, .post-title a').text().trim();
const link = $(e).find('h2 a, h3 a, .post-title a').attr('href');
const foto = $(e).find('img').attr('src') || $(e).find('img').attr('data-src') || '';
const desc = $(e).find('p, .excerpt, .entry-content').text().trim().slice(0, 180) + '...';
const data = $(e).find('.post-meta, .date, time').text().trim() || 'Data não informada';

if (titulo && link) {
noticias.push({ titulo, foto, descricao: desc, data: data, link });
}
});

return resolve({
status: true,
criador: 'Tosh Tech',
total: noticias.length,
resultado: noticias });

} catch (erro) {
if (tentativa < CONFIG.maxTentativas) {
await new Promise(r => setTimeout(r, CONFIG.atrasoTentativa));
} else {
return reject({
status: false,
criador: 'Tosh Tech',
erro: 'Falha após ' + CONFIG.maxTentativas + ' tentativas',
detalhes: erro.message });
}
}
}
});
}

module.exports = { lulaFlix };
