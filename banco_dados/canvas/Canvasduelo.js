/*
⊰᯽⊱┈──╌❊ TOSH TECH — CARD DE DUELO PREMIUM ❊╌──┈⊰᯽⊱
༺『Módulo: Card de Duelo — 3 ESTILOS ÚNICOS • SEM EMOJIS』༻
➪ Criador『Tosh』
➪ Versão: 1.0 ✅ Sem emojis • Símbolos de texto puro ✅
➪ Card 1: CYBER DUEL — Tech futurista
➪ Card 2: ROYAL DUEL — Nobreza e glória
➪ Card 3: INFERNO DUEL — Chamas e fúria
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

// ➪ Desenha partículas/estrelas de fundo
function desenharParticulas(ctx, w, h, qtd, cor, tamMax = 3) {
  for (let i = 0; i < qtd; i++) {
    const x = Math.random() * w, y = Math.random() * h, t = Math.random() * tamMax + 1, a = Math.random() * 0.6 + 0.2;
    ctx.fillStyle = cor.replace(")", `, ${a})`).replace("rgb", "rgba");
    ctx.beginPath();
    ctx.arc(x, y, t, 0, Math.PI * 2);
    ctx.fill();
  }
}

//══════════════════════════════════════════════════
// 🟦 CARD 1 — CYBER DUEL — FUTURISTA TECNOLÓGICO
//══════════════════════════════════════════════════
async function canvaDueloCyber(avatar1Url, avatar2Url, nome1, nome2, pontos1, pontos2, titulo = "DUELO") {
  const w = 1280, h = 600, c = createCanvas(w, h), ctx = c.getContext("2d");

  // Fundo escuro futurista
  const gradFundo = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, w/2);
  gradFundo.addColorStop(0, "rgba(10,20,40,1)");
  gradFundo.addColorStop(1, "rgba(5,10,25,1)");
  ctx.fillStyle = gradFundo;
  ctx.fillRect(0, 0, w, h);

  // Grade de batalha
  ctx.strokeStyle = "rgba(0,255,255,0.06)";
  ctx.lineWidth = 1;
  for (let i = 0; i < w; i += 40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke() }
  for (let i = 0; i < h; i += 40) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(w, i); ctx.stroke() }

  desenharParticulas(ctx, w, h, 80, "rgb(0,255,255)", 2);

  // Moldura externa
  ctx.strokeStyle = "#00ffff"; ctx.lineWidth = 4; ctx.shadowColor = "#00ffff"; ctx.shadowBlur = 30;
  ctx.strokeRect(25, 25, w - 50, h - 50); ctx.shadowBlur = 0;
  ctx.strokeStyle = "rgba(0,255,255,0.2)"; ctx.lineWidth = 1;
  ctx.strokeRect(45, 45, w - 90, h - 90);

  // Cantos decorativos
  const tamCanto = 40;
  [[25,25],[w-25-tamCanto,25],[25,h-25-tamCanto],[w-25-tamCanto,h-25-tamCanto]].forEach(([cx, cy]) => {
    ctx.strokeStyle = "#00ffff"; ctx.lineWidth = 2; ctx.shadowColor = "#00ffff"; ctx.shadowBlur = 10;
    ctx.strokeRect(cx, cy, tamCanto, tamCanto);
    ctx.fillStyle = "#00ffff"; ctx.fillRect(cx + 8, cy + 8, 10, 10);
    ctx.shadowBlur = 0;
  });

  //══════════════════════════════════════════════════
  // ⚔️ SÍMBOLO VS — CENTRO
  //══════════════════════════════════════════════════
  ctx.fillStyle = "#00ffff"; ctx.font = "bold 80px 'Courier New', monospace"; ctx.textAlign = "center";
  ctx.shadowColor = "#00ffff"; ctx.shadowBlur = 25;
  ctx.fillText("◈ VS ◈", w / 2, h / 2 + 15); ctx.shadowBlur = 0;

  // Título do duelo
  ctx.fillStyle = "#ffffff"; ctx.font = "bold 36px 'Courier New', monospace";
  ctx.fillText(titulo.toUpperCase(), w / 2, 90);

  //══════════════════════════════════════════════════
  // 🥷 JOGADOR 1 — ESQUERDA
  //══════════════════════════════════════════════════
  const av1 = await loadImageBuffer(avatar1Url), tamAv = 260, av1X = 150, av1Y = 140;
  ctx.shadowColor = "#00ffff"; ctx.shadowBlur = 40; ctx.save();
  ctx.beginPath(); ctx.arc(av1X + tamAv/2, av1Y + tamAv/2, tamAv/2, 0, Math.PI * 2); ctx.clip();
  ctx.drawImage(av1, av1X, av1Y, tamAv, tamAv); ctx.restore(); ctx.shadowBlur = 0;

  // Borda avatar 1
  ctx.beginPath(); ctx.arc(av1X + tamAv/2, av1Y + tamAv/2, tamAv/2 + 10, 0, Math.PI * 2);
  ctx.strokeStyle = "#00ffff"; ctx.lineWidth = 6; ctx.shadowColor = "#00ffff"; ctx.shadowBlur = 15; ctx.stroke(); ctx.shadowBlur = 0;

  // Nome e pontos 1
  ctx.fillStyle = "#ffffff"; ctx.font = "bold 42px 'Courier New', monospace"; ctx.textAlign = "center";
  ctx.fillText(nome1.toUpperCase(), av1X + tamAv/2, av1Y + tamAv + 55);
  ctx.fillStyle = "#00ffff"; ctx.font = "bold 52px 'Courier New', monospace";
  ctx.shadowColor = "#00ffff"; ctx.shadowBlur = 12;
  ctx.fillText("" + pontos1 + " PTS", av1X + tamAv/2, av1Y + tamAv + 110); ctx.shadowBlur = 0;

  //══════════════════════════════════════════════════
  // 🥷 JOGADOR 2 — DIREITA
  //══════════════════════════════════════════════════
  const av2 = await loadImageBuffer(avatar2Url), av2X = w - 150 - tamAv, av2Y = 140;
  ctx.shadowColor = "#ff0066"; ctx.shadowBlur = 40; ctx.save();
  ctx.beginPath(); ctx.arc(av2X + tamAv/2, av2Y + tamAv/2, tamAv/2, 0, Math.PI * 2); ctx.clip();
  ctx.drawImage(av2, av2X, av2Y, tamAv, tamAv); ctx.restore(); ctx.shadowBlur = 0;

  // Borda avatar 2
  ctx.beginPath(); ctx.arc(av2X + tamAv/2, av2Y + tamAv/2, tamAv/2 + 10, 0, Math.PI * 2);
  ctx.strokeStyle = "#ff0066"; ctx.lineWidth = 6; ctx.shadowColor = "#ff0066"; ctx.shadowBlur = 15; ctx.stroke(); ctx.shadowBlur = 0;

  // Nome e pontos 2
  ctx.fillStyle = "#ffffff"; ctx.font = "bold 42px 'Courier New', monospace"; ctx.textAlign = "center";
  ctx.fillText(nome2.toUpperCase(), av2X + tamAv/2, av2Y + tamAv + 55);
  ctx.fillStyle = "#ff0066"; ctx.font = "bold 52px 'Courier New', monospace";
  ctx.shadowColor = "#ff0066"; ctx.shadowBlur = 12;
  ctx.fillText("" + pontos2 + " PTS", av2X + tamAv/2, av2Y + tamAv + 110); ctx.shadowBlur = 0;

  //══════════════════════════════════════════════════
  // 🏆 RESULTADO / VENCEDOR
  //══════════════════════════════════════════════════
  const vencedor = Number(pontos1) > Number(pontos2) ? nome1 : Number(pontos2) > Number(pontos1) ? nome2 : "EMPATE";
  const corVencedor = vencedor === "EMPATE" ? "#ffffff" : "#00ff88";
  ctx.fillStyle = corVencedor; ctx.font = "bold 32px 'Courier New', monospace"; ctx.textAlign = "center";
  ctx.shadowColor = corVencedor; ctx.shadowBlur = 15;
  ctx.fillText("VENCEDOR: " + vencedor.toUpperCase(), w / 2, h - 55); ctx.shadowBlur = 0;

  // Assinatura
  ctx.fillStyle = "rgba(0,255,255,0.4)"; ctx.font = "14px 'Courier New', monospace"; ctx.textAlign = "right";
  ctx.fillText("TOSH TECH • CYBER BATTLE", w - 30, h - 20);

  return c.toBuffer("image/png");
}

//══════════════════════════════════════════════════
// 🟡 CARD 2 — ROYAL DUEL — GLÓRIA E NOBREZA
//══════════════════════════════════════════════════
async function canvaDueloRoyal(avatar1Url, avatar2Url, nome1, nome2, pontos1, pontos2, titulo = "DUELO REAL") {
  const w = 1280, h = 600, c = createCanvas(w, h), ctx = c.getContext("2d");

  // Fundo luxuoso
  const gradFundo = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, w/2);
  gradFundo.addColorStop(0, "rgba(45,35,15,1)");
  gradFundo.addColorStop(1, "rgba(20,15,5,1)");
  ctx.fillStyle = gradFundo;
  ctx.fillRect(0, 0, w, h);

  desenharParticulas(ctx, w, h, 100, "rgb(255,215,0)", 3);

  // Moldura ornamentada
  ctx.strokeStyle = "#FFD700"; ctx.lineWidth = 5; ctx.shadowColor = "#FFD700"; ctx.shadowBlur = 35;
  ctx.strokeRect(20, 20, w - 40, h - 40); ctx.shadowBlur = 0;
  ctx.strokeStyle = "#F4E4BC"; ctx.lineWidth = 1;
  ctx.strokeRect(35, 35, w - 70, h - 70);

  // Cantos com coroas
  [[30,30],[w-90,30],[30,h-90],[w-90,h-90]].forEach(([cx, cy]) => {
    ctx.fillStyle = "#FFD700"; ctx.shadowColor = "#FFD700"; ctx.shadowBlur = 12;
    ctx.font = "bold 36px serif"; ctx.textAlign = "center";
    ctx.fillText("♛", cx + 30, cy + 45);
    ctx.shadowBlur = 0;
  });

  //══════════════════════════════════════════════════
  // ⚔️ SÍMBOLO VS — CENTRO
  //══════════════════════════════════════════════════
  ctx.fillStyle = "#FFD700"; ctx.font = "bold 80px 'Times New Roman', serif"; ctx.textAlign = "center";
  ctx.shadowColor = "#FFD700"; ctx.shadowBlur = 25;
  ctx.fillText("♛ VS ♛", w / 2, h / 2 + 15); ctx.shadowBlur = 0;

  ctx.fillStyle = "#FFF8DC"; ctx.font = "bold 36px 'Times New Roman', serif";
  ctx.fillText(titulo.toUpperCase(), w / 2, 90);

  //══════════════════════════════════════════════════
  // 👑 JOGADOR 1 — ESQUERDA
  //══════════════════════════════════════════════════
  const av1 = await loadImageBuffer(avatar1Url), tamAv = 260, av1X = 150, av1Y = 140;
  ctx.shadowColor = "#FFD700"; ctx.shadowBlur = 45; ctx.save();
  ctx.beginPath(); ctx.arc(av1X + tamAv/2, av1Y + tamAv/2, tamAv/2, 0, Math.PI * 2); ctx.clip();
  ctx.drawImage(av1, av1X, av1Y, tamAv, tamAv); ctx.restore(); ctx.shadowBlur = 0;

  // Borda dourada
  const gradBorda1 = ctx.createRadialGradient(av1X + tamAv/2, av1Y + tamAv/2, 0, av1X + tamAv/2, av1Y + tamAv/2, tamAv/2 + 12);
  gradBorda1.addColorStop(0, "#FFF8DC"); gradBorda1.addColorStop(0.5, "#FFD700"); gradBorda1.addColorStop(1, "#B8860B");
  ctx.beginPath(); ctx.arc(av1X + tamAv/2, av1Y + tamAv/2, tamAv/2 + 10, 0, Math.PI * 2);
  ctx.strokeStyle = gradBorda1; ctx.lineWidth = 7; ctx.shadowColor = "#FFD700"; ctx.shadowBlur = 15; ctx.stroke(); ctx.shadowBlur = 0;

  ctx.fillStyle = "#FFF8DC"; ctx.font = "bold 42px 'Times New Roman', serif"; ctx.textAlign = "center";
  ctx.fillText(nome1.toUpperCase(), av1X + tamAv/2, av1Y + tamAv + 55);
  ctx.fillStyle = "#FFD700"; ctx.font = "bold 52px 'Times New Roman', serif";
  ctx.shadowColor = "#FFD700"; ctx.shadowBlur = 12;
  ctx.fillText("" + pontos1 + " PONTOS", av1X + tamAv/2, av1Y + tamAv + 110); ctx.shadowBlur = 0;

  //══════════════════════════════════════════════════
  // 👑 JOGADOR 2 — DIREITA
  //══════════════════════════════════════════════════
  const av2 = await loadImageBuffer(avatar2Url), av2X = w - 150 - tamAv, av2Y = 140;
  ctx.shadowColor = "#FF6B35"; ctx.shadowBlur = 45; ctx.save();
  ctx.beginPath(); ctx.arc(av2X + tamAv/2, av2Y + tamAv/2, tamAv/2, 0, Math.PI * 2); ctx.clip();
  ctx.drawImage(av2, av2X, av2Y, tamAv, tamAv); ctx.restore(); ctx.shadowBlur = 0;

  const gradBorda2 = ctx.createRadialGradient(av2X + tamAv/2, av2Y + tamAv/2, 0, av2X + tamAv/2, av2Y + tamAv/2, tamAv/2 + 12);
  gradBorda2.addColorStop(0, "#FFE4C4"); gradBorda2.addColorStop(0.5, "#FF8C00"); gradBorda2.addColorStop(1, "#8B4513");
  ctx.beginPath(); ctx.arc(av2X + tamAv/2, av2Y + tamAv/2, tamAv/2 + 10, 0, Math.PI * 2);
  ctx.strokeStyle = gradBorda2; ctx.lineWidth = 7; ctx.shadowColor = "#FF8C00"; ctx.shadowBlur = 15; ctx.stroke(); ctx.shadowBlur = 0;

  ctx.fillStyle = "#FFF8DC"; ctx.font = "bold 42px 'Times New Roman', serif"; ctx.textAlign = "center";
  ctx.fillText(nome2.toUpperCase(), av2X + tamAv/2, av2Y + tamAv + 55);
  ctx.fillStyle = "#FF8C00"; ctx.font = "bold 52px 'Times New Roman', serif";
  ctx.shadowColor = "#FF8C00"; ctx.shadowBlur = 12;
  ctx.fillText("" + pontos2 + " PONTOS", av2X + tamAv/2, av2Y + tamAv + 110); ctx.shadowBlur = 0;

  //══════════════════════════════════════════════════
  // 🏆 RESULTADO
  //══════════════════════════════════════════════════
  const vencedor = Number(pontos1) > Number(pontos2) ? nome1 : Number(pontos2) > Number(pontos1) ? nome2 : "EMPATE";
  const corVencedor = vencedor === "EMPATE" ? "#ffffff" : "#FFD700";
  ctx.fillStyle = corVencedor; ctx.font = "bold 32px 'Times New Roman', serif"; ctx.textAlign = "center";
  ctx.shadowColor = corVencedor; ctx.shadowBlur = 15;
  ctx.fillText("♛ VENCEDOR: " + vencedor.toUpperCase() + " ♛", w / 2, h - 55); ctx.shadowBlur = 0;

  ctx.fillStyle = "rgba(255,215,0,0.4)"; ctx.font = "15px 'Times New Roman', serif"; ctx.textAlign = "right";
  ctx.fillText("TOSH TECH • ROYAL ARENA", w - 30, h - 20);

  return c.toBuffer("image/png");
}

//══════════════════════════════════════════════════
// 🔴 CARD 3 — INFERNO DUEL — FÚRIA E CHAMAS
//══════════════════════════════════════════════════
async function canvaDueloInferno(avatar1Url, avatar2Url, nome1, nome2, pontos1, pontos2, titulo = "DUELO INFERNAL") {
  const w = 1280, h = 600, c = createCanvas(w, h), ctx = c.getContext("2d");

  // Fundo de fogo
  const gradFundo = ctx.createRadialGradient(w/2, h/2, w/4, w/2, h/2, w);
  gradFundo.addColorStop(0, "rgba(60,10,5,1)");
  gradFundo.addColorStop(1, "rgba(15,2,0,1)");
  ctx.fillStyle = gradFundo;
  ctx.fillRect(0, 0, w, h);

  desenharParticulas(ctx, w, h, 150, "rgb(255,100,0)", 4);

  // Moldura flamejante
  ctx.strokeStyle = "#FF003C"; ctx.lineWidth = 5; ctx.shadowColor = "#FF003C"; ctx.shadowBlur = 35;
  ctx.strokeRect(22, 22, w - 44, h - 44); ctx.shadowBlur = 0;
  ctx.strokeStyle = "#FF6A00"; ctx.lineWidth = 2;
  ctx.strokeRect(38, 38, w - 76, h - 76);

  // Cantos com símbolos de fogo
  [[25,25],[w-75,25],[25,h-75],[w-75,h-75]].forEach(([cx, cy]) => {
    ctx.fillStyle = "#FF4400"; ctx.shadowColor = "#FF003C"; ctx.shadowBlur = 15;
    ctx.font = "bold 32px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("◤", cx + 25, cy + 40);
    ctx.shadowBlur = 0;
  });

  //══════════════════════════════════════════════════
  // ⚔️ SÍMBOLO VS — CENTRO
  //══════════════════════════════════════════════════
  ctx.fillStyle = "#FF4400"; ctx.font = "bold 80px Arial, sans-serif"; ctx.textAlign = "center";
  ctx.shadowColor = "#FF003C"; ctx.shadowBlur = 25;
  ctx.fillText("◤ VS ◥", w / 2, h / 2 + 15); ctx.shadowBlur = 0;

  ctx.fillStyle = "#ffffff"; ctx.font = "bold 36px Arial, sans-serif";
  ctx.fillText(titulo.toUpperCase(), w / 2, 90);

  //══════════════════════════════════════════════════
  // 🔥 JOGADOR 1 — ESQUERDA
  //══════════════════════════════════════════════════
  const av1 = await loadImageBuffer(avatar1Url), tamAv = 260, av1X = 150, av1Y = 140;
  ctx.shadowColor = "#FF003C"; ctx.shadowBlur = 50; ctx.save();
  ctx.beginPath(); ctx.arc(av1X + tamAv/2, av1Y + tamAv/2, tamAv/2, 0, Math.PI * 2); ctx.clip();
  ctx.drawImage(av1, av1X, av1Y, tamAv, tamAv); ctx.restore(); ctx.shadowBlur = 0;

  const gradBorda1 = ctx.createRadialGradient(av1X + tamAv/2, av1Y + tamAv/2, 0, av1X + tamAv/2, av1Y + tamAv/2, tamAv/2 + 12);
  gradBorda1.addColorStop(0, "#FF003C"); gradBorda1.addColorStop(0.4, "#FF3300"); gradBorda1.addColorStop(0.7, "#FF9900"); gradBorda1.addColorStop(1, "#FFCC00");
  ctx.beginPath(); ctx.arc(av1X + tamAv/2, av1Y + tamAv/2, tamAv/2 + 10, 0, Math.PI * 2);
  ctx.strokeStyle = gradBorda1; ctx.lineWidth = 7; ctx.shadowColor = "#FF003C"; ctx.shadowBlur = 20; ctx.stroke(); ctx.shadowBlur = 0;

  ctx.fillStyle = "#ffffff"; ctx.font = "bold 42px Arial, sans-serif"; ctx.textAlign = "center";
  ctx.fillText(nome1.toUpperCase(), av1X + tamAv/2, av1Y + tamAv + 55);
  ctx.fillStyle = "#FF4400"; ctx.font = "bold 52px Arial, sans-serif";
  ctx.shadowColor = "#FF003C"; ctx.shadowBlur = 15;
  ctx.fillText("" + pontos1 + " — FOGO", av1X + tamAv/2, av1Y + tamAv + 110); ctx.shadowBlur = 0;

  //══════════════════════════════════════════════════
  // 🔥 JOGADOR 2 — DIREITA
  //══════════════════════════════════════════════════
  const av2 = await loadImageBuffer(avatar2Url), av2X = w - 150 - tamAv, av2Y = 140;
  ctx.shadowColor = "#FFCC00"; ctx.shadowBlur = 50; ctx.save();
  ctx.beginPath(); ctx.arc(av2X + tamAv/2, av2Y + tamAv/2, tamAv/2, 0, Math.PI * 2); ctx.clip();
  ctx.drawImage(av2, av2X, av2Y, tamAv, tamAv); ctx.restore(); ctx.shadowBlur = 0;

  const gradBorda2 = ctx.createRadialGradient(av2X + tamAv/2, av2Y + tamAv/2, 0, av2X + tamAv/2, av2Y + tamAv/2, tamAv/2 + 12);
  gradBorda2.addColorStop(0, "#FFCC00"); gradBorda2.addColorStop(0.4, "#FF9900"); gradBorda2.addColorStop(0.7, "#FF3300"); gradBorda2.addColorStop(1, "#FF003C");
  ctx.beginPath(); ctx.arc(av2X + tamAv/2, av2Y + tamAv/2, tamAv/2 + 10, 0, Math.PI * 2);
  ctx.strokeStyle = gradBorda2; ctx.lineWidth = 7; ctx.shadowColor = "#FFCC00"; ctx.shadowBlur = 20; ctx.stroke(); ctx.shadowBlur = 0;

  ctx.fillStyle = "#ffffff"; ctx.font = "bold 42px Arial, sans-serif"; ctx.textAlign = "center";
  ctx.fillText(nome2.toUpperCase(), av2X + tamAv/2, av2Y + tamAv + 55);
  ctx.fillStyle = "#FFCC00"; ctx.font = "bold 52px Arial, sans-serif";
  ctx.shadowColor = "#FFCC00"; ctx.shadowBlur = 15;
  ctx.fillText("" + pontos2 + " — CHAMAS", av2X + tamAv/2, av2Y + tamAv + 110); ctx.shadowBlur = 0;

  //══════════════════════════════════════════════════
  // 🏆 RESULTADO
  //══════════════════════════════════════════════════
  const vencedor = Number(pontos1) > Number(pontos2) ? nome1 : Number(pontos2) > Number(pontos1) ? nome2 : "EMPATE";
  const corVencedor = vencedor === "EMPATE" ? "#ffffff" : "#FFCC00";
  ctx.fillStyle = corVencedor; ctx.font = "bold 32px Arial, sans-serif"; ctx.textAlign = "center";
  ctx.shadowColor = corVencedor; ctx.shadowBlur = 15;
  ctx.fillText("◤ VENCEDOR: " + vencedor.toUpperCase() + " ◥", w / 2, h - 55); ctx.shadowBlur = 0;

  ctx.fillStyle = "rgba(255,68,0,0.4)"; ctx.font = "15px Arial, sans-serif"; ctx.textAlign = "right";
  ctx.fillText("TOSH TECH • INFERNO ARENA", w - 30, h - 20);

  return c.toBuffer("image/png");
}

module.exports = { canvaDueloCyber, canvaDueloRoyal, canvaDueloInferno };
