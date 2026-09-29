/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Criador『Tosh』༻
➪ Módulo Frases de Amor
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
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
};

async function fraseAmor() {
return new Promise(async (resolve, reject) => {
let tentativa = 0;
while (tentativa < CONFIG.maxTentativas) {
try {
const pagina = Math.floor(Math.random() * 10) + 1;
const url = `https://www.pensador.com/frases_de_amor/${pagina}/`;

const resposta = await axios.get(url, {
headers: CABECALHOS,
timeout: CONFIG.timeout,
httpsAgent: new https.Agent({ rejectUnauthorized: false })
});

const frases = [];
const autores = [];
const $ = cheerio.load(resposta.data);

$('p.frase.fr').each((i, elemento) => {
const texto = $(elemento).text().trim();
if (texto && texto.length > 10) {
frases.push(texto);
}
});

$('span.autor').each((i, elemento) => {
const nome = $(elemento).text().trim();
if (nome) {
autores.push(nome);
}
});

if (frases.length === 0) {
tentativa++;
await new Promise(pausa => setTimeout(pausa, CONFIG.atrasoTentativa));
continue;
}

const indice = Math.floor(Math.random() * frases.length);
resolve({
status: true,
criador: 'Tosh Tech',
frase: frases[indice],
autor: autores[indice] || 'Desconhecido'
});
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

module.exports = { fraseAmor };
