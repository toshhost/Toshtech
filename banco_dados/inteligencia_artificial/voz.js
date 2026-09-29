/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Criador『Tosh』༻
➪ Módulo Google Translate  
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');
const https = require('https');

//➪ Configurações
const CONFIG = {
pastaTemporaria: path.join(__dirname, 'temp_audio'),
velocidade: 0.90
};

//➪ Cria pasta temporária
if (!fs.existsSync(CONFIG.pastaTemporaria)) {
fs.mkdirSync(CONFIG.pastaTemporaria, { recursive: true });
}

//➪ Função Principal
async function gerarVoz(texto) {
return new Promise(async (resolve, reject) => {
const id = Date.now();
const caminhoBruto = path.join(CONFIG.pastaTemporaria, `bruto_${id}.mp3`);
const caminhoSaida = path.join(CONFIG.pastaTemporaria, `voz_tosh_${id}.mp3`);
try {
const textoCod = encodeURIComponent(texto);
const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${textoCod}&tl=pt-br&client=tw-ob`;
const opcoes = {
rejectUnauthorized: false,
timeout: 25000,
headers: {
"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
}
};

const fluxo = fs.createWriteStream(caminhoBruto);
https.get(url, opcoes, (resp) => {
if (resp.statusCode !== 200) {
fs.unlink(caminhoBruto, () => {});
return reject(new Error("Falha ao acessar fonte de voz"));
}

resp.pipe(fluxo);
fluxo.on('finish', () => {
fluxo.close();

if (fs.statSync(caminhoBruto).size < 1000) {
fs.unlink(caminhoBruto, () => {});
return reject(new Error("Áudio incompleto"));
}

//➪ Ajusta velocidade
ffmpeg(caminhoBruto)
.audioFilters([
`atempo=${CONFIG.velocidade}`
])
.on('end', () => {
fs.unlink(caminhoBruto, () => {});
if (!fs.existsSync(caminhoSaida)) return reject(new Error("Falha ao finalizar áudio"));

const buffer = fs.readFileSync(caminhoSaida);
fs.unlink(caminhoSaida, () => {});

resolve({
status: true,
criador: "Tosh Tech",
fonte: "Google Translate TTS",
idioma: "Português do Brasil",
textoFalado: texto,
formato: "mp3",
audioBuffer: buffer });
})
.on('error', e => {
fs.unlink(caminhoBruto, () => {});
reject(new Error("Erro processamento: " + e.message));
})
.save(caminhoSaida);
});
}).on('error', e => reject(new Error("Erro requisição: " + e.message)));

} catch (e) {
if (fs.existsSync(caminhoBruto)) fs.unlinkSync(caminhoBruto);
reject(e);
}
});
}

module.exports = { gerarVoz };
