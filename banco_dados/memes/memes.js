/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Criador『Tosh』༻
➪ Módulo Vídeo Meme
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
const TERMOS_BUSCA = [
  "melhores memes em vídeo",
  "vídeos de memes engraçados",
  "memes brasileiros vídeo",
  "clipes de memes virais",
  "vídeos curtos de memes",
  "memes engraçados para rir",
  "vídeos de memes novos",
  "memes virais do Brasil",
  "curtos vídeos de memes",
  "memes famosos em vídeo",
  "memes hilários vídeo",
  "vídeos engraçados de memes"
];

//➪ embaralha a lista e pega um aleatório
function termoAleatorio() {
const t = [...TERMOS_BUSCA];
for (let i = t.length - 1; i > 0; i--) {
const j = Math.floor(Math.random() * (i + 1));
    [t[i], t[j]] = [t[j], t[i]];
}
return t[0] + ' ' + Math.floor(Math.random() * 10000); 
}

module.exports = { TERMOS_BUSCA, termoAleatorio };
