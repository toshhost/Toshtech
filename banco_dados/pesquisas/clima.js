/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Criador『Tosh』༻
➪ Módulo Clima
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
const axios = require('axios');

const CACHE_CLIMA = {};
const CONFIG = {
tempoCache: 3600000, // 1h
timeout: 15000
};

const CABECALHOS = {
headers: {
'User-Agent': 'Mozilla/5.0 (Android 6.0; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36',
'Accept-Language': 'pt-BR,pt;q=0.9'
},
httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false })
};

async function buscarClima(cidade) {
try {
if (!cidade || String(cidade).trim().length < 2) return null;
const nomeCidade = encodeURIComponent(String(cidade).trim() + ',BR');

const chaveCache = nomeCidade.toLowerCase();
if (CACHE_CLIMA[chaveCache]) {
const cache = CACHE_CLIMA[chaveCache];
if (Date.now() - cache.tempo < CONFIG.tempoCache) return cache.dados;
}

const url = `https://api.open-meteo.com/v1/forecast?latitude=-23.5505&longitude=-46.6333&current=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=America/Sao_Paulo&lang=pt`;
const res = await axios.get(url, CABECALHOS);

if (!res || !res.data || !res.data.current) throw new Error('Sem dados');
const atual = res.data.current;
const diario = res.data.daily;

const resultado = {
cidade: String(cidade).trim(),
temperatura_atual: `${atual.temperature_2m}°C`,
sensacao_termica: `${atual.apparent_temperature}°C`,
umidade: `${atual.relativehumidity_2m}%`,
chuva: atual.precipitation > 0 ? 'Sim' : 'Não',
previsao_3dias: [
{ dia: 'Hoje', max: `${diario.temperature_2m_max[0]}°C`, min: `${diario.temperature_2m_min[0]}°C`, chuva: `${diario.precipitation_probability_max[0]}%` },
{ dia: 'Amanhã', max: `${diario.temperature_2m_max[1]}°C`, min: `${diario.temperature_2m_min[1]}°C`, chuva: `${diario.precipitation_probability_max[1]}%` },
{ dia: 'Depois', max: `${diario.temperature_2m_max[2]}°C`, min: `${diario.temperature_2m_min[2]}°C`, chuva: `${diario.precipitation_probability_max[2]}%` }
],
atualizado_em: new Date().toLocaleString('pt-BR')
};

CACHE_CLIMA[chaveCache] = { tempo: Date.now(), dados: resultado };
return resultado;

} catch (erro) {
console.warn('[CLIMA]', erro.message);
 return { erro: 'Não foi possível carregar o clima no momento' };
}
}

module.exports = { buscarClima };
