/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Criador『Tosh』༻
➪ Módulo Projeto de Lei 
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

//➪ Limpa Texto
function limparTexto(texto) {
if (!texto) return '';
return texto.replace(/\t/g, '').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
}

async function projetosLeis() {
return new Promise(async (resolve, reject) => {
for (let tentativa = 1; tentativa <= CONFIG.maxTentativas; tentativa++) {
try {
        
const res = await axios.get('https://www.camara.leg.br/', {
headers: CABECALHOS, timeout: CONFIG.timeout });
const $ = cheerio.load(res.data);
const projetos = [];

$('li, .proposta, .resultado-item, ul li').each((i, e) => {
let textoCompleto = limparTexto($(e).text());
let link = $(e).find('a').attr('href') || '';
          
if (link && textoCompleto.indexOf('PL') !== -1) {
let numero = '';
let ementa = '';
            
const matchNumero = textoCompleto.match(/(PL\s*\d+\/\d+|PLP\s*\d+\/\d+)/i);
if (matchNumero) {
numero = matchNumero[0].toUpperCase();
ementa = textoCompleto.replace(numero, '').trim();
} else {
numero = textoCompleto.slice(0, 30);
ementa = textoCompleto.slice(30).trim();
}

if(link && link.indexOf('http') !== 0) link = 'https://www.camara.leg.br' + link;

if(numero && ementa && ementa.length > 20) {
projetos.push({ 
numero: numero, 
ementa: ementa, 
autor: 'Não informado', 
data: 'Não informada', 
situacao: 'Disponível', 
link: link 
});
}
}
});

const resultado = projetos.slice(0, 10);
return resolve({
status: true, 
criador: 'Tosh Tech', 
total: resultado.length, 
resultado: resultado
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

module.exports = { projetosLeis };
