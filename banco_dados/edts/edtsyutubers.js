/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Criador『Tosh』༻
➪ Módulo Edts Yutubers
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
const TERMOS_YOUTUBER_EDIT = [
  "edits de youtubers brasileiros",
  "melhores edits de youtubers",
  "clipes de youtubers famosos",
  "melhores momentos youtubers br",
  "vídeos curtos de youtubers",
  "edits de canais brasileiros",
  "destaques youtubers engraçados",
  "vídeos de youtubers para editar",
  "edits criativos de youtubers",
  "melhores cortes de youtubers"
];

//➪ Gera Termo Único 
function termoYoutuberAleatorio() {
const t = [...TERMOS_YOUTUBER_EDIT];
for (let i = t.length - 1; i > 0; i--) {
const j = Math.floor(Math.random() * (i + 1));
    [t[i], t[j]] = [t[j], t[i]];
}
return t[0] + ' ' + Math.floor(Math.random() * 10000);
}

module.exports = { TERMOS_YOUTUBER_EDIT, termoYoutuberAleatorio };
