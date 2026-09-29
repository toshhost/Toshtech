/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Criador『Tosh』༻
➪ Módulo Congresso 
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

//➪ Limpa Texto
function limparTexto(texto) {
if (!texto) return '';
return texto.replace(/\t/g, '').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
}

async function agendaCongresso() {
return new Promise(async (resolve, reject) => {
for (let tentativa = 1; tentativa <= CONFIG.maxTentativas; tentativa++) {
try {
const res = await axios.get('https://www.congressonacional.leg.br/', {
headers: CABECALHOS, timeout: CONFIG.timeout });
const $ = cheerio.load(res.data);
const agenda = [];
let eventosBrutos = limparTexto($.text());
const padraoDataHora = /(\d{2}\/\d{2}\/\d{4})\s*(\d{2}:\d{2})/g;
let match;
while ((match = padraoDataHora.exec(eventosBrutos)) !== null) {
const data = match[1];
const hora = match[2];
const inicio = match.index;
const fim = eventosBrutos.indexOf('Sessão Convocada', inicio + 20) !== -1 
 ? eventosBrutos.indexOf('Sessão Convocada', inicio + 20) 
 : eventosBrutos.indexOf('Mesa do Congresso', inicio + 20);
          
const trecho = eventosBrutos.slice(inicio - 80, fim !== -1 ? fim : inicio + 300).trim();
let titulo = '';
let local = '';

if (trecho.indexOf('Sessão Solene') !== -1) titulo = 'Sessão Solene';
if (trecho.indexOf('Plenário da Câmara') !== -1) local = 'Plenário da Câmara dos Deputados';
else if (trecho.indexOf('Plenário do Senado') !== -1) local = 'Plenário do Senado Federal';
else titulo = 'Evento agendado';

agenda.push({
titulo: titulo,
data: data,
hora: hora,
local: local,
orgao: 'Congresso Nacional',
descricao: trecho.slice(0, 150).trim() + '...',
link: 'https://www.congressonacional.leg.br'
});
}
//➪ Remove Repetidos
const unico = [];
const vistos = {};
for(let i=0; i<agenda.length; i++){
const item = agenda[i];
const chave = item.data + item.hora + item.titulo;
if(!vistos[chave]){
vistos[chave] = true;
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
detalhes: erro.message });
}
}
}
});
}

module.exports = { agendaCongresso };
