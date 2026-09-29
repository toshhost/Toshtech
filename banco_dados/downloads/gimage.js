/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Criador『Tosh』༻
➪ Módulo Gimage 
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
const axios = require('axios');
const https = require('https');

//➪ Configurações
const CONFIG = {
serpApiKey: "4af6e418aa12f6773a982cba49db5c1d3e0cfc44a2ceb36094d9b099e05dde22",
timeout: 20000,
maxResultados: 12,
agentes: [
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
]
};

const agenteSeguro = new https.Agent({
rejectUnauthorized: false,
keepAlive: true
});

function pegarAgente() {
return CONFIG.agentes[Math.floor(Math.random() * CONFIG.agentes.length)];
}

async function gis(searchTerm) {
return new Promise(async (resolve) => {
try {
const termoCod = encodeURIComponent(searchTerm);
//➪ Busca De Imagens Exclusiva Pela Serpapi
const url = `https://serpapi.com/search.json?engine=google_images&q=${termoCod}&api_key=${CONFIG.serpApiKey}&num=${CONFIG.maxResultados}`;

const { data } = await axios.get(url, {
timeout: CONFIG.timeout,
httpsAgent: agenteSeguro,
headers: {
'User-Agent': pegarAgente(),
'Accept-Language': 'pt-BR,pt;q=0.9'
}
});

const imagens = [];
if (data && data.images_results && Array.isArray(data.images_results)) {
for (let i = 0; i < data.images_results.length; i++) {
const item = data.images_results[i];
imagens.push({
url: item.original || item.thumbnail || "",
largura: item.original_width || 0,
altura: item.original_height || 0,
origem: item.source || "" });
}
}
resolve(imagens);
} catch (erro) {
console.error("Erro busca imagens:", erro.message);
resolve([]);
}
});
}

module.exports = { gis };
