/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Criador『Tosh』༻
➪ Módulo Áudio Meme
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
const TERMOS_AUDIO_MEME = [
  "sons de memes engraçados",
  "áudios de memes virais",
  "sons de memes brasileiros",
  "efeitos sonoros de memes",
  "frases de memes em áudio",
  "áudios engraçados para rir",
  "sons famosos de memes",
  "trilhas sonoras de memes"
];

//➪ gera termo único para não repetir
function termoAudioAleatorio() {
const t = [...TERMOS_AUDIO_MEME];
for (let i = t.length - 1; i > 0; i--) {
const j = Math.floor(Math.random() * (i + 1));
    [t[i], t[j]] = [t[j], t[i]];
}
return t[0] + ' ' + Math.floor(Math.random() * 10000);
}

module.exports = { TERMOS_AUDIO_MEME, termoAudioAleatorio };
