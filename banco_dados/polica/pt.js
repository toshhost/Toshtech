/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Criador『Tosh』༻
➪ Módulo PT
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

function limparTexto(texto) {
if (!texto) return '';
return texto
.replace(/\t/g, '') // Remove tabulações
.replace(/\n/g, ' ') // Remove quebras de linha
.replace(/\s+/g, ' ') // Troca vários espaços por um só
.trim(); // Remove espaços no início e fim
}

async function partidoDosTrabalhadores() {
return new Promise(async (resolve, reject) => {
for (let tentativa = 1; tentativa <= CONFIG.maxTentativas; tentativa++) {
try {
const res = await axios.get('https://pt.org.br/', {
headers: CABECALHOS,
timeout: CONFIG.timeout
});

const $ = cheerio.load(res.data);
const noticias = [];

$('article, .post, .item, .noticia, section').each((i, e) => {
let titulo = limparTexto($(e).find('h1, h2, h3, h4, a').text());
let link = $(e).find('a').attr('href') || '';
const imagem = $(e).find('img').attr('src') || $(e).find('img').attr('data-src') || '';
          
const matchData = $(e).text().match(/\d{2}\/\d{2}\/\d{4}/);
const data = matchData ? matchData[0] : 'Data não informada';
          
let descricao = limparTexto($(e).text());
descricao = descricao.replace(titulo, '').slice(0, 150).trim() + '...';

if (titulo && link 
&& titulo.length > 15 
&& link.indexOf('http') === 0 
&& link.indexOf('facebook.com') === -1) {
noticias.push({ titulo, imagem, data, descricao, link });
}
});

const unico = [];
const linksVistos = {};
for (let i = 0; i < noticias.length; i++) {
const item = noticias[i];
if (!linksVistos[item.link]) {
linksVistos[item.link] = true;
unico.push(item);
}
}

return resolve({
status: true,
criador: 'Tosh Tech',
total: unico.length,
resultado: unico
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

module.exports = { partidoDosTrabalhadores };
