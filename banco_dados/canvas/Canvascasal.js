/*
⊰᯽⊱┈──╌❊ TOSH TECH — CARTÃO DE CASAL PREMIUM ❊╌──┈⊰᯽⊱
༺『Módulo: Cartão de Casal — 3 ESTILOS ÚNICOS • SEM EMOJIS』༻
➪ Criador『Tosh』
➪ Versão: 1.0 ✅ Sem emojis • Símbolos de texto puro ✅
➪ Card 1: ETERNAL LOVE — Rosa suave, corações, elegante
➪ Card 2: GOLDEN BOND — Dourado, luxo, compromisso real
➪ Card 3: PASSION FIRE — Vermelho intenso, paixão, chamas
⊰᯽⊱┈──────────────────────────────────────┈⊰᯽⊱
*/

const axios = require('axios');
const { createCanvas, loadImage } = require('canvas');

// ➪ Baixa imagem — REUTILIZADA ✅
async function loadImageBuffer(url) {
  const res = await axios.get(url, { 
    responseType: "arraybuffer",
    timeout: 30000,
    maxRedirects: 10,
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
    }
  });
  return await loadImage(Buffer.from(res.data));
}

// ➪ Desenha corações/partículas de fundo
function desenharCoracoes(ctx, w, h, qtd, cor, tamMax = 4) {
  for (let i = 0; i < qtd; i++) {
    const x = Math.random() * w, y = Math.random() * h, t = Math.random() * tamMax + 1, a = Math.random() * 0.5 + 0.2;
    ctx.fillStyle = cor.replace(")", `, ${a})`).replace("rgb", "rgba");
    ctx.font = `${t * 6}px serif`;
    ctx.fillText("♥", x, y);
  }
}

//══════════════════════════════════════════════════
// 🩷 CARD 1 — ETERNAL LOVE — ROMÂNTICO E SUAVE
//══════════════════════════════════════════════════
async function canvaCasalEterno(avatar1Url, avatar2Url, nome1, nome2, diasJuntos, dataInicio, frase = "PARA SEMPRE") {
  const w = 1280, h = 720, c = createCanvas(w, h), ctx = c.getContext("2d");

  // Fundo gradiente rosa suave
  const gradFundo = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, w/2);
  gradFundo.addColorStop(0, "rgba(45,15,30,1)");
  gradFundo.addColorStop(0.5, "rgba(35,10,25,1)");
  gradFundo.addColorStop(1, "rgba(20,5,15,1)");
  ctx.fillStyle = gradFundo;
  ctx.fillRect(0, 0, w, h);

  desenharCoracoes(ctx, w, h, 80, "rgb(255,150,180)", 4);

  // Moldura rosa brilhante
  ctx.strokeStyle = "#FF69B4"; ctx.lineWidth = 5; ctx.shadowColor = "#FF69B4"; ctx.shadowBlur = 30;
  ctx.strokeRect(25, 25, w - 50, h - 50); ctx.shadowBlur = 0;
  ctx.strokeStyle = "rgba(255,105,180,0.3)"; ctx.lineWidth = 2;
  ctx.strokeRect(45, 45, w - 90, h - 90);

  // Cantos com corações
  [[30,30],[w-80,30],[30,h-80],[w-80,h-80]].forEach(([cx, cy]) => {
    ctx.fillStyle = "#FF69B4"; ctx.shadowColor = "#FF69B4"; ctx.shadowBlur = 12;
    ctx.font = "bold 32px serif"; ctx.textAlign = "center";
    ctx.fillText("♥", cx + 25, cy + 38);
    ctx.shadowBlur = 0;
  });

  //══════════════════════════════════════════════════
  // ♥ CORAÇÃO GRANDE NO CENTRO
  //══════════════════════════════════════════════════
  ctx.fillStyle = "#FF69B4"; ctx.font = "bold 100px serif"; ctx.textAlign = "center";
  ctx.shadowColor = "#FF1493"; ctx.shadowBlur = 30;
  ctx.fillText("♥ ♥ ♥", w / 2, 130); ctx.shadowBlur = 0;

  ctx.fillStyle = "#FFB6C1"; ctx.font = "bold 32px 'Times New Roman', serif";
  ctx.fillText(frase.toUpperCase(), w / 2, 180);

  //══════════════════════════════════════════════════
  // 🩷 PESSOA 1 — ESQUERDA
  //══════════════════════════════════════════════════
  const av1 = await loadImageBuffer(avatar1Url), tamAv = 280, av1X = 140, av1Y = 220;
  ctx.shadowColor = "#FF69B4"; ctx.shadowBlur = 40; ctx.save();
  ctx.beginPath(); ctx.arc(av1X + tamAv/2, av1Y + tamAv/2, tamAv/2, 0, Math.PI * 2); ctx.clip();
  ctx.drawImage(av1, av1X, av1Y, tamAv, tamAv); ctx.restore(); ctx.shadowBlur = 0;

  // Borda rosa gradiente
  const gradBorda1 = ctx.createRadialGradient(av1X + tamAv/2, av1Y + tamAv/2, 0, av1X + tamAv/2, av1Y + tamAv/2, tamAv/2 + 15);
  gradBorda1.addColorStop(0, "#FFFFFF"); gradBorda1.addColorStop(0.4, "#FFB6C1"); gradBorda1.addColorStop(0.7, "#FF69B4"); gradBorda1.addColorStop(1, "#FF1493");
  ctx.beginPath(); ctx.arc(av1X + tamAv/2, av1Y + tamAv/2, tamAv/2 + 12, 0, Math.PI * 2);
  ctx.strokeStyle = gradBorda1; ctx.lineWidth = 8; ctx.shadowColor = "#FF69B4"; ctx.shadowBlur = 20; ctx.stroke(); ctx.shadowBlur = 0;

  ctx.fillStyle = "#FFFFFF"; ctx.font = "bold 44px 'Times New Roman', serif"; ctx.textAlign = "center";
  ctx.fillText(nome1.toUpperCase(), av1X + tamAv/2, av1Y + tamAv + 60);

  //══════════════════════════════════════════════════
  // 💍 SÍMBOLO DE AMOR NO MEIO
  //══════════════════════════════════════════════════
  ctx.fillStyle = "#FFD700"; ctx.font = "bold 60px serif"; ctx.textAlign = "center";
  ctx.shadowColor = "#FFD700"; ctx.shadowBlur = 20;
  ctx.fillText("♡ ♥ ♡", w / 2, 400); ctx.shadowBlur = 0;

  //══════════════════════════════════════════════════
  // 🩷 PESSOA 2 — DIREITA
  //══════════════════════════════════════════════════
  const av2 = await loadImageBuffer(avatar2Url), av2X = w - 140 - tamAv, av2Y = 220;
  ctx.shadowColor = "#FF1493"; ctx.shadowBlur = 40; ctx.save();
  ctx.beginPath(); ctx.arc(av2X + tamAv/2, av2Y + tamAv/2, tamAv/2, 0, Math.PI * 2); ctx.clip();
  ctx.drawImage(av2, av2X, av2Y, tamAv, tamAv); ctx.restore(); ctx.shadowBlur = 0;

  const gradBorda2 = ctx.createRadialGradient(av2X + tamAv/2, av2Y + tamAv/2, 0, av2X + tamAv/2, av2Y + tamAv/2, tamAv/2 + 15);
  gradBorda2.addColorStop(0, "#FF1493"); gradBorda2.addColorStop(0.4, "#FF69B4"); gradBorda2.addColorStop(0.7, "#FFB6C1"); gradBorda2.addColorStop(1, "#FFFFFF");
  ctx.beginPath(); ctx.arc(av2X + tamAv/2, av2Y + tamAv/2, tamAv/2 + 12, 0, Math.PI * 2);
  ctx.strokeStyle = gradBorda2; ctx.lineWidth = 8; ctx.shadowColor = "#FF1493"; ctx.shadowBlur = 20; ctx.stroke(); ctx.shadowBlur = 0;

  ctx.fillStyle = "#FFFFFF"; ctx.font = "bold 44px 'Times New Roman', serif"; ctx.textAlign = "center";
  ctx.fillText(nome2.toUpperCase(), av2X + tamAv/2, av2Y + tamAv + 60);

  //══════════════════════════════════════════════════
  // 📊 CONTADOR DE TEMPO JUNTOS
  //══════════════════════════════════════════════════
  ctx.fillStyle = "#FFB6C1"; ctx.font = "bold 38px 'Times New Roman', serif"; ctx.textAlign = "center";
  ctx.shadowColor = "#FF69B4"; ctx.shadowBlur = 15;
  ctx.fillText("♥ " + diasJuntos + " DIAS JUNTOS ♥", w / 2, 580); ctx.shadowBlur = 0;

  ctx.fillStyle = "#FF69B4"; ctx.font = "24px 'Times New Roman', serif";
  ctx.fillText("DESDE: " + dataInicio, w / 2, 625);

  ctx.fillStyle = "rgba(255,182,193,0.5)"; ctx.font = "16px 'Times New Roman', serif"; ctx.textAlign = "right";
  ctx.fillText("TOSH TECH • ETERNAL LOVE", w - 35, h - 25);

  return c.toBuffer("image/png");
}

//══════════════════════════════════════════════════
// 🟡 CARD 2 — GOLDEN BOND — AMOR REAL E ETERNO
//══════════════════════════════════════════════════
async function canvaCasalDourado(avatar1Url, avatar2Url, nome1, nome2, diasJuntos, dataInicio, frase = "AMOR ETERNO") {
  const w = 1280, h = 720, c = createCanvas(w, h), ctx = c.getContext("2d");

  // Fundo luxuoso dourado
  const gradFundo = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, w/2);
  gradFundo.addColorStop(0, "rgba(45,35,15,1)");
  gradFundo.addColorStop(1, "rgba(15,12,5,1)");
  ctx.fillStyle = gradFundo;
  ctx.fillRect(0, 0, w, h);

  desenharCoracoes(ctx, w, h, 100, "rgb(255,223,0)", 4);

  // Moldura dourada
  ctx.strokeStyle = "#FFD700"; ctx.lineWidth = 6; ctx.shadowColor = "#FFD700"; ctx.shadowBlur = 35;
  ctx.strokeRect(20, 20, w - 40, h - 40); ctx.shadowBlur = 0;
  ctx.strokeStyle = "#F4E4BC"; ctx.lineWidth = 2;
  ctx.strokeRect(38, 38, w - 76, h - 76);

  // Cantos com coroas
  [[25,25],[w-85,25],[25,h-85],[w-85,h-85]].forEach(([cx, cy]) => {
    ctx.fillStyle = "#FFD700"; ctx.shadowColor = "#FFD700"; ctx.shadowBlur = 15;
    ctx.font = "bold 36px serif"; ctx.textAlign = "center";
    ctx.fillText("♛", cx + 28, cy + 42);
    ctx.shadowBlur = 0;
  });

  //══════════════════════════════════════════════════
  // ♛ SÍMBOLO REAL NO CENTRO
  //══════════════════════════════════════════════════
  ctx.fillStyle = "#FFD700"; ctx.font = "bold 90px serif"; ctx.textAlign = "center";
  ctx.shadowColor = "#FFD700"; ctx.shadowBlur = 25;
  ctx.fillText("♛ ♥ ♛", w / 2, 125); ctx.shadowBlur = 0;

  ctx.fillStyle = "#FFF8DC"; ctx.font = "bold 32px 'Times New Roman', serif";
  ctx.fillText(frase.toUpperCase(), w / 2, 175);

  //══════════════════════════════════════════════════
  // 👤 PESSOA 1 — ESQUERDA
  //══════════════════════════════════════════════════
  const av1 = await loadImageBuffer(avatar1Url), tamAv = 280, av1X = 140, av1Y = 220;
  ctx.shadowColor = "#FFD700"; ctx.shadowBlur = 45; ctx.save();
  ctx.beginPath(); ctx.arc(av1X + tamAv/2, av1Y + tamAv/2, tamAv/2, 0, Math.PI * 2); ctx.clip();
  ctx.drawImage(av1, av1X, av1Y, tamAv, tamAv); ctx.restore(); ctx.shadowBlur = 0;

  const gradBorda1 = ctx.createRadialGradient(av1X + tamAv/2, av1Y + tamAv/2, 0, av1X + tamAv/2, av1Y + tamAv/2, tamAv/2 + 15);
  gradBorda1.addColorStop(0, "#FFFFFF"); gradBorda1.addColorStop(0.3, "#FFF8DC"); gradBorda1.addColorStop(0.6, "#FFD700"); gradBorda1.addColorStop(1, "#B8860B");
  ctx.beginPath(); ctx.arc(av1X + tamAv/2, av1Y + tamAv/2, tamAv/2 + 12, 0, Math.PI * 2);
  ctx.strokeStyle = gradBorda1; ctx.lineWidth = 8; ctx.shadowColor = "#FFD700"; ctx.shadowBlur = 20; ctx.stroke(); ctx.shadowBlur = 0;

  ctx.fillStyle = "#FFF8DC"; ctx.font = "bold 44px 'Times New Roman', serif"; ctx.textAlign = "center";
  ctx.fillText(nome1.toUpperCase(), av1X + tamAv/2, av1Y + tamAv + 60);

  //══════════════════════════════════════════════════
  // 💍 ANÉIS NO MEIO
  //══════════════════════════════════════════════════
  ctx.fillStyle = "#FFD700"; ctx.font = "bold 60px serif"; ctx.textAlign = "center";
  ctx.shadowColor = "#FFD700"; ctx.shadowBlur = 20;
  ctx.fillText("♢ ♥ ♢", w / 2, 400); ctx.shadowBlur = 0;

  //══════════════════════════════════════════════════
  // 👤 PESSOA 2 — DIREITA
  //══════════════════════════════════════════════════
  const av2 = await loadImageBuffer(avatar2Url), av2X = w - 140 - tamAv, av2Y = 220;
  ctx.shadowColor = "#B8860B"; ctx.shadowBlur = 45; ctx.save();
  ctx.beginPath(); ctx.arc(av2X + tamAv/2, av2Y + tamAv/2, tamAv/2, 0, Math.PI * 2); ctx.clip();
  ctx.drawImage(av2, av2X, av2Y, tamAv, tamAv); ctx.restore(); ctx.shadowBlur = 0;

  const gradBorda2 = ctx.createRadialGradient(av2X + tamAv/2, av2Y + tamAv/2, 0, av2X + tamAv/2, av2Y + tamAv/2, tamAv/2 + 15);
  gradBorda2.addColorStop(0, "#B8860B"); gradBorda2.addColorStop(0.3, "#FFD700"); gradBorda2.addColorStop(0.6, "#FFF8DC"); gradBorda2.addColorStop(1, "#FFFFFF");
  ctx.beginPath(); ctx.arc(av2X + tamAv/2, av2Y + tamAv/2, tamAv/2 + 12, 0, Math.PI * 2);
  ctx.strokeStyle = gradBorda2; ctx.lineWidth = 8; ctx.shadowColor = "#B8860B"; ctx.shadowBlur = 20; ctx.stroke(); ctx.shadowBlur = 0;

  ctx.fillStyle = "#FFF8DC"; ctx.font = "bold 44px 'Times New Roman', serif"; ctx.textAlign = "center";
  ctx.fillText(nome2.toUpperCase(), av2X + tamAv/2, av2Y + tamAv + 60);

  //══════════════════════════════════════════════════
  // 📊 CONTADOR DE TEMPO
  //══════════════════════════════════════════════════
  ctx.fillStyle = "#FFD700"; ctx.font = "bold 38px 'Times New Roman', serif"; ctx.textAlign = "center";
  ctx.shadowColor = "#FFD700"; ctx.shadowBlur = 15;
  ctx.fillText("♛ " + diasJuntos + " DIAS DE AMOR ♛", w / 2, 580); ctx.shadowBlur = 0;

  ctx.fillStyle = "#F4E4BC"; ctx.font = "24px 'Times New Roman', serif";
  ctx.fillText("UNIDOS DESDE: " + dataInicio, w / 2, 625);

  ctx.fillStyle = "rgba(255,215,0,0.4)"; ctx.font = "16px 'Times New Roman', serif"; ctx.textAlign = "right";
  ctx.fillText("TOSH TECH • GOLDEN BOND", w - 35, h - 25);

  return c.toBuffer("image/png");
}

//══════════════════════════════════════════════════
// 🔴 CARD 3 — PASSION FIRE — PAIXÃO INTENSA
//══════════════════════════════════════════════════
async function canvaCasalPaixao(avatar1Url, avatar2Url, nome1, nome2, diasJuntos, dataInicio, frase = "PAIXÃO ETERNA") {
  const w = 1280, h = 720, c = createCanvas(w, h), ctx = c.getContext("2d");

  // Fundo vermelho escuro chamas
  const gradFundo = ctx.createRadialGradient(w/2, h/2, w/4, w/2, h/2, w);
  gradFundo.addColorStop(0, "rgba(60,10,15,1)");
  gradFundo.addColorStop(1, "rgba(20,2,5,1)");
  ctx.fillStyle = gradFundo;
  ctx.fillRect(0, 0, w, h);

  desenharCoracoes(ctx, w, h, 120, "rgb(255,60,100)", 5);

  // Moldura vermelha brilhante
  ctx.strokeStyle = "#FF003C"; ctx.lineWidth = 6; ctx.shadowColor = "#FF003C"; ctx.shadowBlur = 35;
  ctx.strokeRect(22, 22, w - 44, h - 44); ctx.shadowBlur = 0;
  ctx.strokeStyle = "#FF4444"; ctx.lineWidth = 2;
  ctx.strokeRect(40, 40, w - 80, h - 80);

  // Cantos com chamas de amor
  [[25,25],[w-75,25],[25,h-75],[w-75,h-75]].forEach(([cx, cy]) => {
    ctx.fillStyle = "#FF003C"; ctx.shadowColor = "#FF003C"; ctx.shadowBlur = 15;
    ctx.font = "bold 32px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("◤♥◥", cx + 25, cy + 40);
    ctx.shadowBlur = 0;
  });

  //══════════════════════════════════════════════════
  // ♥ CORAÇÃO EM CHAMAS NO CENTRO
  //══════════════════════════════════════════════════
  ctx.fillStyle = "#FF003C"; ctx.font = "bold 100px sans-serif"; ctx.textAlign = "center";
  ctx.shadowColor = "#FF003C"; ctx.shadowBlur = 30;
  ctx.fillText("◤♥◥", w / 2, 130); ctx.shadowBlur = 0;

  ctx.fillStyle = "#FF6688"; ctx.font = "bold 32px Arial, sans-serif";
  ctx.fillText(frase.toUpperCase(), w / 2, 180);

  //══════════════════════════════════════════════════
  // 🔥 PESSOA 1 — ESQUERDA
  //══════════════════════════════════════════════════
  const av1 = await loadImageBuffer(avatar1Url), tamAv = 280, av1X = 140, av1Y = 220;
  ctx.shadowColor = "#FF003C"; ctx.shadowBlur = 50; ctx.save();
  ctx.beginPath(); ctx.arc(av1X + tamAv/2, av1Y + tamAv/2, tamAv/2, 0, Math.PI * 2); ctx.clip();
  ctx.drawImage(av1, av1X, av1Y, tamAv, tamAv); ctx.restore(); ctx.shadowBlur = 0;

  const gradBorda1 = ctx.createRadialGradient(av1X + tamAv/2, av1Y + tamAv/2, 0, av1X + tamAv/2, av1Y + tamAv/2, tamAv/2 + 15);
  gradBorda1.addColorStop(0, "#FF003C"); gradBorda1.addColorStop(0.4, "#FF3355"); gradBorda1.addColorStop(0.7, "#FF6688"); gradBorda1.addColorStop(1, "#FF99AA");
  ctx.beginPath(); ctx.arc(av1X + tamAv/2, av1Y + tamAv/2, tamAv/2 + 12, 0, Math.PI * 2);
  ctx.strokeStyle = gradBorda1; ctx.lineWidth = 8; ctx.shadowColor = "#FF003C"; ctx.shadowBlur = 20; ctx.stroke(); ctx.shadowBlur = 0;

  ctx.fillStyle = "#FFFFFF"; ctx.font = "bold 44px Arial, sans-serif"; ctx.textAlign = "center";
  ctx.fillText(nome1.toUpperCase(), av1X + tamAv/2, av1Y + tamAv + 60);

  //══════════════════════════════════════════════════
  // ❤️ CORAÇÃO UNIÃO NO MEIO
  //══════════════════════════════════════════════════
  ctx.fillStyle = "#FF3355"; ctx.font = "bold 60px sans-serif"; ctx.textAlign = "center";
  ctx.shadowColor = "#FF003C"; ctx.shadowBlur = 20;
  ctx.fillText("♥ ♥ ♥", w / 2, 400); ctx.shadowBlur = 0;

  //══════════════════════════════════════════════════
  // 🔥 PESSOA 2 — DIREITA
  //══════════════════════════════════════════════════
  const av2 = await loadImageBuffer(avatar2Url), av2X = w - 140 - tamAv, av2Y = 220;
  ctx.shadowColor = "#FF6688"; ctx.shadowBlur = 50; ctx.save();
  ctx.beginPath(); ctx.arc(av2X + tamAv/2, av2Y + tamAv/2, tamAv/2, 0, Math.PI * 2); ctx.clip();
  ctx.drawImage(av2, av2X, av2Y, tamAv, tamAv); ctx.restore(); ctx.shadowBlur = 0;

  const gradBorda2 = ctx.createRadialGradient(av2X + tamAv/2, av2Y + tamAv/2, 0, av2X + tamAv/2, av2Y + tamAv/2, tamAv/2 + 15);
  gradBorda2.addColorStop(0, "#FF99AA"); gradBorda2.addColorStop(0.4, "#FF6688"); gradBorda2.addColorStop(0.7, "#FF3355"); gradBorda2.addColorStop(1, "#FF003C");
  ctx.beginPath(); ctx.arc(av2X + tamAv/2, av2Y + tamAv/2, tamAv/2 + 12, 0, Math.PI * 2);
  ctx.strokeStyle = gradBorda2; ctx.lineWidth = 8; ctx.shadowColor = "#FF6688"; ctx.shadowBlur = 20; ctx.stroke(); ctx.shadowBlur = 0;

  ctx.fillStyle = "#FFFFFF"; ctx.font = "bold 44px Arial, sans-serif"; ctx.textAlign = "center";
  ctx.fillText(nome2.toUpperCase(), av2X + tamAv/2, av2Y + tamAv + 60);

  //══════════════════════════════════════════════════
  // 📊 CONTADOR DE PAIXÃO
  //══════════════════════════════════════════════════
  ctx.fillStyle = "#FF6688"; ctx.font = "bold 38px Arial, sans-serif"; ctx.textAlign = "center";
  ctx.shadowColor = "#FF003C"; ctx.shadowBlur = 15;
  ctx.fillText("♥ " + diasJuntos + " DIAS DE PAIXÃO ♥", w / 2, 580); ctx.shadowBlur = 0;

  ctx.fillStyle = "#FF99AA"; ctx.font = "24px Arial, sans-serif";
  ctx.fillText("ACESO DESDE: " + dataInicio, w / 2, 625);

  ctx.fillStyle = "rgba(255,0,60,0.4)"; ctx.font = "16px Arial, sans-serif"; ctx.textAlign = "right";
  ctx.fillText("TOSH TECH • PASSION FIRE", w - 35, h - 25);

  return c.toBuffer("image/png");
}

module.exports = { canvaCasalEterno, canvaCasalDourado, canvaCasalPaixao };
