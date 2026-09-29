/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Criador『Tosh』༻
➪ Módulo Gerardor de Imagem 
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
const axios = require('axios');

//➪ Configurações De Proteção
const CONFIG = {
timeout: 30000,
maxTentativas: 2,
atrasoTentativa: 1200
};

const CABECALHOS = {
"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
  "Accept": "*/*"
};

//➪ Função auxiliar de nova tentativa
async function tentarExecutar(funcao) {
let ultimoErro = null;
let tentativa = 1;

while (tentativa <= CONFIG.maxTentativas) {
try {
return await funcao();
} catch (erro) {
ultimoErro = erro;
tentativa = tentativa + 1;
await new Promise(resolve => setTimeout(resolve, CONFIG.atrasoTentativa));
}
}
throw ultimoErro;
}

//➪ Gerar Imagem Normal
async function imagemAi(texto) {
return tentarExecutar(async () => {
const prompt = encodeURIComponent(texto);
const url = `https://image.pollinations.ai/prompt/${prompt}?width=1024&height=1024&nologo=true`;

await axios.get(url, { headers: CABECALHOS, timeout: CONFIG.timeout });

return {
status: true,
criador: "Tosh Tech",
resultado: {
imagem: url }
};
});
}

//➪ Gerar Figurinha No Formato Webp
async function stickAi(texto) {
return tentarExecutar(async () => {
const prompt = encodeURIComponent(texto);
//➪ Tamanho ideal + formato webp
const url = `https://image.pollinations.ai/prompt/${prompt}?width=512&height=512&nologo=true&format=webp`;

await axios.get(url, { headers: CABECALHOS, timeout: CONFIG.timeout });

return {
status: true,
criador: "Tosh Tech",
imagem: [url] };
});
}

module.exports = { imagemAi, stickAi };
