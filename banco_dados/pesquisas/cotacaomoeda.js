/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Criador『Tosh』༻
➪ Módulo Conversor De Moedas
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
const axios = require('axios');
const https = require('https');

const CACHE_MOEDAS = {};
const CONFIG = {
tempoCache: 1800000,
timeout: 10000
};

const AGENTE_SEGURO = new https.Agent({ rejectUnauthorized: false });
const CABECALHOS = {
headers: {
'User-Agent': 'Mozilla/5.0 (Android 6.0; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36',
'Accept-Language': 'pt-BR,pt;q=0.9'
},
httpsAgent: AGENTE_SEGURO
};

//➪ Função De Conversão 
async function converterMoeda(valor, moedaOrigem = 'BRL', moedaDestino = 'USD') {
try {
valor = Number(valor) || 1;
moedaOrigem = String(moedaOrigem || 'BRL').toUpperCase().trim();
moedaDestino = String(moedaDestino || 'USD').toUpperCase().trim();

const chaveCache = `${moedaOrigem}-${moedaDestino}`;
if (CACHE_MOEDAS[chaveCache]) {
const cache = CACHE_MOEDAS[chaveCache];
if (Date.now() - cache.tempo < CONFIG.tempoCache) return cache.dados;
}

const url = `https://economia.awesomeapi.com.br/json/last/${moedaOrigem}-${moedaDestino}`;
const res = await axios.get(url, CABECALHOS);

if (!res || !res.data) throw new Error('Sem resposta da API');
const chaveDados = `${moedaOrigem}${moedaDestino}`;
const dados = res.data[chaveDados];
if (!dados) throw new Error('Moeda não suportada');

const resultado = {
valor_entrada: Number(valor.toFixed(2)),
moeda_origem: moedaOrigem,
moeda_destino: moedaDestino,
cotacao: Number(dados.bid),
valor_convertido: Number((valor * dados.bid).toFixed(2)),
variacao: Number(dados.var || 0),
atualizado_em: new Date(Number(dados.timestamp) * 1000).toLocaleString('pt-BR')
};

CACHE_MOEDAS[chaveCache] = { tempo: Date.now(), dados: resultado };
return resultado;

} catch (erro) {
console.warn('[CONVERSOR] Usando valores de referência:', erro.message);
const cotacoesPadrao = {
'BRLUSD': 5.40, 'USDBRL': 0.185,
'BRLEUR': 6.10, 'EURBRL': 0.164,
'BRLBTC': 0.000015, 'BTCBRL': 66000
};
const chavePadrao = `${moedaOrigem}${moedaDestino}`;
const cotacao = cotacoesPadrao[chavePadrao] || 1;

return {
valor_entrada: Number(valor.toFixed(2)),
moeda_origem: moedaOrigem,
moeda_destino: moedaDestino,
cotacao: cotacao,
valor_convertido: Number((valor * cotacao).toFixed(2)),
variacao: 0,
aviso: 'Valores de referência' };
}
}


module.exports = { converterMoeda };
