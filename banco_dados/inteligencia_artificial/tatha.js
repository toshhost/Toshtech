/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Criador『Tosh』༻
➪ Módulo Tahta
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const __path = process.cwd();
const tmp = path.join(__path, 'tmp');
if (!fs.existsSync(tmp)) fs.mkdirSync(tmp, { recursive: true });

//➪ caminho exato da fonte
const caminhoFonte = path.join(__dirname, 'Roboto_SemiCondensed-ExtraLightItalic.ttf');

//➪ converte cor para formato válido
function corValida(cor) {
if (!cor) return "black";
cor = cor.trim().toLowerCase();

//➪ Mapeamento Completo: Português Nome Válido FFmpeg
//➪ Cores principais
const mapaCores = {
    "azul": "blue",
    "vermelho": "red",
    "verde": "green",
    "amarelo": "yellow",
    "roxo": "purple",
    "rosa": "pink",
    "laranja": "orange",
    "branco": "white",
    "preto": "black",
    "cinza": "gray",
    "prata": "silver",
    "dourado": "gold",
    "marrom": "brown",
    "ciano": "cyan",
    "magenta": "magenta",
    "azul escuro": "darkblue",
    "vermelho escuro": "darkred",
    "verde escuro": "darkgreen",
    "roxo escuro": "darkpurple",
    "amarelo escuro": "goldenrod",
    "cinza escuro": "darkgray",
    "laranja escuro": "chocolate",
    "rosa escuro": "deeppink",
    "darkrblue": "darkblue",
    "azul-escuro": "darkblue",
    "vermelho-escuro": "darkred",
    "verde-escuro": "darkgreen",
    "roxo-escuro": "darkpurple",
    "dourado": "gold",
    "prata": "silver"
};
if (mapaCores[cor]) return mapaCores[cor];

//➪ Se não estiver na lista, usa direto se for nome válido ou código hex
return cor;
}

async function tahta(options = {}) {
return new Promise(async (resolve, reject) => {
const saida = path.join(tmp, `tahta_${Date.now()}.png`);
try {
if (!fs.existsSync(caminhoFonte)) {
throw new Error("Fonte não encontrada: " + caminhoFonte);
}

const w = options.width || 1024;
const h = options.height || 1024;
const texto = options.text || 'TAHTA';
const corTexto = corValida(options.color) || 'gold';
const corFundo = corValida(options.bgColor) || 'darkred';
const tamanhoFonte = options.fontSize || 120;

//➪ Trata Texto Para Não Quebrar Com Aspas
const textoSeguro = texto.replace(/'/g, "\\'");

//➪ comando valido
const args = [
        '-y',
        '-f', 'lavfi',
        '-i', `color=${corFundo}:size=${w}x${h}`,
        '-vf', `drawtext=text='HARTA':fontfile='${caminhoFonte}':fontsize=${tamanhoFonte}:fontcolor=${corTexto}:x=(w-text_w)/2:y=(h-text_h)/2 - ${tamanhoFonte * 1.2},drawtext=text='TAHTA':fontfile='${caminhoFonte}':fontsize=${tamanhoFonte}:fontcolor=${corTexto}:x=(w-text_w)/2:y=(h-text_h)/2,drawtext=text='${textoSeguro}':fontfile='${caminhoFonte}':fontsize=${tamanhoFonte}:fontcolor=${corTexto}:x=(w-text_w)/2:y=(h-text_h)/2 + ${tamanhoFonte * 1.2}`,
        '-frames:v', '1',
        saida
];

const ffmpeg = spawn('ffmpeg', args);
let logErro = '';

ffmpeg.stderr.on('data', (d) => { logErro += d.toString(); });

ffmpeg.on('close', (cod) => {
try {
if (cod !== 0) {
console.error("FFmpeg:", logErro);
throw new Error("Falha ao gerar imagem");
}
const buffer = fs.readFileSync(saida);
resolve(buffer);
} catch (e) {
reject(e);
} finally {
if (fs.existsSync(saida)) fs.unlinkSync(saida);
}
});

} catch (err) {
reject(err);
}
});
}

module.exports = { tahta };
