/*
⊰᯽⊱┈──╌❊ TOSH TECH — 3 CARDS LEVEL PREMIUM ❊╌──┈⊰᯽⊱
༺『Módulo: Level Cards — SEM EMOJIS • SÓ TEXTO PURO』༻
➪ Criador『Tosh』
➪ Versão: 2.1 ✅ ZERO emojis! Símbolos que o Canvas entende ✅
➪ Card 1: CYBER NEON • Card 2: ROYAL GOLD • Card 3: INFERNO FIRE
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

// ➪ Estrelas de fundo
function desenharEstrelas(ctx, w, h, qtd, cor, tamMax = 3) {
  for (let i = 0; i < qtd; i++) {
    const x = Math.random() * w, y = Math.random() * h, t = Math.random() * tamMax + 1, a = Math.random() * 0.6 + 0.2;
    ctx.fillStyle = cor.replace(")", `, ${a})`).replace("rgb", "rgba");
    ctx.beginPath();
    ctx.arc(x, y, t, 0, Math.PI * 2);
    ctx.fill();
  }
}

//══════════════════════════════════════════════════
// 🟦 CARD 1 — CYBER NEON — SÓ SÍMBOLOS DE TEXTO!
//══════════════════════════════════════════════════
async function canvaLevel(avatarUrl, fundoUrl, nome, level1, level2) {
  const w = 1280, h = 420, c = createCanvas(w, h), ctx = c.getContext("2d");
  const fundo = await loadImageBuffer(fundoUrl);
  ctx.drawImage(fundo, 0, 0, w, h);

  // Fundo escuro futurista
  const gradFundo = ctx.createLinearGradient(0, 0, w, h);
  gradFundo.addColorStop(0, "rgba(5,15,25,0.95)");
  gradFundo.addColorStop(0.5, "rgba(10,30,50,0.90)");
  gradFundo.addColorStop(1, "rgba(5,20,40,0.95)");
  ctx.fillStyle = gradFundo;
  ctx.fillRect(0, 0, w, h);

  // Grade de linhas
  ctx.strokeStyle = "rgba(0,255,255,0.08)";
  ctx.lineWidth = 1;
  for (let i = 0; i < w; i += 50) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke() }
  for (let i = 0; i < h; i += 50) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(w, i); ctx.stroke() }

  desenharEstrelas(ctx, w, h, 60, "rgb(0,255,255)", 2);

  // Moldura DUPLA
  ctx.strokeStyle = "#00ffff"; ctx.lineWidth = 3; ctx.shadowColor = "#00ffff"; ctx.shadowBlur = 25;
  ctx.strokeRect(20, 20, w - 40, h - 40); ctx.shadowBlur = 0;
  ctx.strokeStyle = "rgba(0,255,255,0.25)"; ctx.lineWidth = 1;
  ctx.strokeRect(35, 35, w - 70, h - 70);

  // Cantos — QUADRADOS PEQUENOS (sem emoji!)
  const tamCanto = 30;
  [[20,20],[w-20-tamCanto,20],[20,h-20-tamCanto],[w-20-tamCanto,h-20-tamCanto]].forEach(([cx, cy]) => {
    ctx.strokeStyle = "#00ffff"; ctx.lineWidth = 2; ctx.shadowColor = "#00ffff"; ctx.shadowBlur = 10;
    ctx.strokeRect(cx, cy, tamCanto, tamCanto);
    ctx.fillStyle = "#00ffff"; ctx.fillRect(cx + 5, cy + 5, 8, 8);
    ctx.shadowBlur = 0;
  });

  // Avatar
  const av = await loadImageBuffer(avatarUrl), tamAv = 240, ax = 70, ay = h / 2 - tamAv / 2;
  ctx.shadowColor = "#00ffff"; ctx.shadowBlur = 40; ctx.save();
  ctx.beginPath(); ctx.arc(ax + tamAv / 2, ay + tamAv / 2, tamAv / 2, 0, Math.PI * 2); ctx.clip();
  ctx.drawImage(av, ax, ay, tamAv, tamAv); ctx.restore(); ctx.shadowBlur = 0;

  // Borda do avatar
  const gradBorda = ctx.createLinearGradient(ax, ay, ax + tamAv, ay + tamAv);
  gradBorda.addColorStop(0, "#00ffff"); gradBorda.addColorStop(1, "#00ccff");
  ctx.beginPath(); ctx.arc(ax + tamAv / 2, ay + tamAv / 2, tamAv / 2 + 8, 0, Math.PI * 2);
  ctx.strokeStyle = gradBorda; ctx.lineWidth = 6; ctx.shadowColor = "#00ffff"; ctx.shadowBlur = 20; ctx.stroke();
  ctx.beginPath(); ctx.arc(ax + tamAv / 2, ay + tamAv / 2, tamAv / 2 + 15, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(0,255,255,0.3)"; ctx.lineWidth = 2; ctx.stroke();

  //══════════════════════════════════════════════════
  // 📝 TEXTOS — SÓ SÍMBOLOS DE TEXTO PURO!
  //══════════════════════════════════════════════════
  const tx = 360;

  ctx.fillStyle = "#ffffff"; ctx.font = "bold 58px 'Courier New', monospace"; ctx.textAlign = "left";
  ctx.shadowColor = "#00ffff"; ctx.shadowBlur = 10;
  ctx.fillText(nome, tx, 85); ctx.shadowBlur = 0;

  ctx.fillStyle = "#80ffff"; ctx.font = "24px 'Courier New', monospace";
  ctx.fillText("SISTEMA ATIVADO • USUARIO REGISTRADO", tx, 130);

  ctx.fillStyle = "#ffffff"; ctx.font = "bold 48px 'Courier New', monospace";
  ctx.shadowColor = "#00ffff"; ctx.shadowBlur = 15;
  ctx.fillText("◈ NIVEL " + level1 + " ◈", tx, 190); ctx.shadowBlur = 0;

  //══════════════════════════════════════════════════
  // 📊 BARRA DE PROGRESSO
  //══════════════════════════════════════════════════
  const bx = tx, by = 225, bw = 820, bh = 60;
  const progresso = Math.max(0, Math.min(1, Number(level1) / Number(level2)));
  const porcentagem = Math.round(progresso * 100);
  const faltam = Math.max(0, Number(level2) - Number(level1));

  ctx.fillStyle = "rgba(0,20,40,0.8)";
  ctx.fillRect(bx, by, bw, bh);
  ctx.strokeStyle = "#00ffff"; ctx.lineWidth = 2; ctx.shadowColor = "#00ffff"; ctx.shadowBlur = 8;
  ctx.strokeRect(bx, by, bw, bh); ctx.shadowBlur = 0;

  const gradBarra = ctx.createLinearGradient(bx, 0, bx + bw, 0);
  gradBarra.addColorStop(0, "#00ffff"); gradBarra.addColorStop(0.5, "#00e5ff"); gradBarra.addColorStop(1, "#00ccff");
  ctx.shadowColor = "#00ffff"; ctx.shadowBlur = 15; ctx.fillStyle = gradBarra;
  ctx.fillRect(bx + 3, by + 3, (bw - 6) * progresso, bh - 6); ctx.shadowBlur = 0;

  ctx.fillStyle = "#ffffff"; ctx.font = "bold 22px 'Courier New', monospace"; ctx.textAlign = "center";
  ctx.fillText(level1 + " / " + level2 + " — " + porcentagem + "%", bx + bw / 2, by + bh / 2 + 8);

  ctx.textAlign = "left"; ctx.fillStyle = "#00ccff"; ctx.font = "18px 'Courier New', monospace";
  ctx.fillText("PROXIMO MARCO EM " + faltam + " NIVEIS", bx, by + bh + 35);

  ctx.textAlign = "right"; ctx.fillStyle = "rgba(0,255,255,0.5)"; ctx.font = "14px 'Courier New', monospace";
  ctx.fillText("TOSH TECH • CYBER SYSTEM", w - 25, h - 15);

  return c.toBuffer("image/png");
}

//══════════════════════════════════════════════════
// 🟡 CARD 2 — ROYAL GOLD — SEM EMOJIS!
//══════════════════════════════════════════════════
async function canvaLevelGold(avatarUrl, fundoUrl, nome, level1, level2) {
  const w = 1280, h = 420, c = createCanvas(w, h), ctx = c.getContext("2d");
  const fundo = await loadImageBuffer(fundoUrl);
  ctx.drawImage(fundo, 0, 0, w, h);

  const gradFundo = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w);
  gradFundo.addColorStop(0, "rgba(35,25,5,0.92)");
  gradFundo.addColorStop(1, "rgba(12,8,2,0.98)");
  ctx.fillStyle = gradFundo;
  ctx.fillRect(0, 0, w, h);

  desenharEstrelas(ctx, w, h, 90, "rgb(255,215,0)", 3);

  ctx.strokeStyle = "#FFD700"; ctx.lineWidth = 5; ctx.shadowColor = "#FFD700"; ctx.shadowBlur = 30;
  ctx.strokeRect(15, 15, w - 30, h - 30); ctx.shadowBlur = 0;
  ctx.strokeStyle = "#F4E4BC"; ctx.lineWidth = 1;
  ctx.strokeRect(28, 28, w - 56, h - 56);

  // Cantos — SÍMBOLO DE COROA TEXTO (sem emoji!)
  [[25,25],[w-100,25],[25,h-100],[w-100,h-100]].forEach(([cx, cy]) => {
    ctx.fillStyle = "#FFD700"; ctx.shadowColor = "#FFD700"; ctx.shadowBlur = 12;
    ctx.font = "bold 28px serif"; ctx.textAlign = "center";
    ctx.fillText("♛", cx + 25, cy + 35);
    ctx.shadowBlur = 0;
  });

  const av = await loadImageBuffer(avatarUrl), tamAv = 230, ax = 65, ay = h / 2 - tamAv / 2;
  ctx.shadowColor = "#FFD700"; ctx.shadowBlur = 45; ctx.save();
  ctx.beginPath(); ctx.arc(ax + tamAv / 2, ay + tamAv / 2, tamAv / 2, 0, Math.PI * 2); ctx.clip();
  ctx.drawImage(av, ax, ay, tamAv, tamAv); ctx.restore(); ctx.shadowBlur = 0;

  const gradBorda = ctx.createRadialGradient(ax + tamAv / 2, ay + tamAv / 2, 0, ax + tamAv / 2, ay + tamAv / 2, tamAv / 2 + 15);
  gradBorda.addColorStop(0, "#FFF8DC"); gradBorda.addColorStop(0.3, "#FFD700");
  gradBorda.addColorStop(0.7, "#B8860B"); gradBorda.addColorStop(1, "#8B4513");
  ctx.beginPath(); ctx.arc(ax + tamAv / 2, ay + tamAv / 2, tamAv / 2 + 8, 0, Math.PI * 2);
  ctx.strokeStyle = gradBorda; ctx.lineWidth = 7; ctx.shadowColor = "#FFD700"; ctx.shadowBlur = 20; ctx.stroke(); ctx.shadowBlur = 0;

  //══════════════════════════════════════════════════
  const tx = 350;

  ctx.fillStyle = "#FFF8DC"; ctx.font = "bold 60px 'Times New Roman', Georgia, serif"; ctx.textAlign = "left";
  ctx.shadowColor = "#FFD700"; ctx.shadowBlur = 12;
  ctx.fillText(nome, tx, 80); ctx.shadowBlur = 0;

  ctx.fillStyle = "#FFD700"; ctx.font = "italic 28px 'Times New Roman', serif";
  ctx.fillText("✦ MEMBRO DA CASA REAL ✦", tx, 135);

  ctx.fillStyle = "#FFF8DC"; ctx.font = "bold 44px 'Times New Roman', serif";
  ctx.shadowColor = "#FFD700"; ctx.shadowBlur = 15;
  ctx.fillText("♛ NIVEL " + level1 + " ♛", tx, 195); ctx.shadowBlur = 0;

  //══════════════════════════════════════════════════
  const bx = tx, by = 235, bw = 830, bh = 55;
  const progresso = Math.max(0, Math.min(1, Number(level1) / Number(level2)));
  const porcentagem = Math.round(progresso * 100);
  const faltam = Math.max(0, Number(level2) - Number(level1));

  ctx.fillStyle = "rgba(30,20,5,0.85)";
  ctx.fillRect(bx, by, bw, bh);
  ctx.strokeStyle = "#FFD700"; ctx.lineWidth = 3; ctx.shadowColor = "#FFD700"; ctx.shadowBlur = 10;
  ctx.strokeRect(bx, by, bw, bh); ctx.shadowBlur = 0;

  const gradBarra = ctx.createLinearGradient(bx, 0, bx + bw, 0);
  gradBarra.addColorStop(0, "#B8860B"); gradBarra.addColorStop(0.3, "#FFD700");
  gradBarra.addColorStop(0.5, "#FFF8DC"); gradBarra.addColorStop(0.7, "#FFD700"); gradBarra.addColorStop(1, "#B8860B");
  ctx.shadowColor = "#FFD700"; ctx.shadowBlur = 12; ctx.fillStyle = gradBarra;
  ctx.fillRect(bx + 2, by + 2, (bw - 4) * progresso, bh - 4); ctx.shadowBlur = 0;

  ctx.fillStyle = "rgba(255,255,255,0.3)";
  ctx.fillRect(bx + 2, by + 2, (bw - 4) * progresso, (bh - 4) / 3);

  ctx.fillStyle = "#FFFFFF"; ctx.font = "bold 22px 'Times New Roman', serif"; ctx.textAlign = "center";
  ctx.fillText(level1 + " / " + level2 + " — " + porcentagem + "%", bx + bw / 2, by + bh / 2 + 8);

  ctx.textAlign = "left"; ctx.fillStyle = "#F4E4BC"; ctx.font = "20px 'Times New Roman', serif";
  ctx.fillText("PROXIMO TITULO EM " + faltam + " NIVEIS", bx, by + bh + 32);

  ctx.textAlign = "right"; ctx.fillStyle = "rgba(255,215,0,0.4)"; ctx.font = "15px 'Times New Roman', serif";
  ctx.fillText("TOSH TECH • ROYAL DIAMOND", w - 25, h - 18);

  return c.toBuffer("image/png");
}

//══════════════════════════════════════════════════
// 🔴 CARD 3 — INFERNO FIRE — SEM EMOJIS!
//══════════════════════════════════════════════════
async function canvaLevelFire(avatarUrl, fundoUrl, nome, level1, level2) {
  const w = 1280, h = 420, c = createCanvas(w, h), ctx = c.getContext("2d");
  const fundo = await loadImageBuffer(fundoUrl);
  ctx.drawImage(fundo, 0, 0, w, h);

  const gradFundo = ctx.createRadialGradient(w / 2, h / 2, w / 5, w / 2, h / 2, w);
  gradFundo.addColorStop(0, "rgba(50,8,5,0.9)");
  gradFundo.addColorStop(1, "rgba(15,2,0,0.98)");
  ctx.fillStyle = gradFundo;
  ctx.fillRect(0, 0, w, h);

  desenharEstrelas(ctx, w, h, 130, "rgb(255,110,0)", 4);

  ctx.strokeStyle = "#FF003C"; ctx.lineWidth = 4; ctx.shadowColor = "#FF003C"; ctx.shadowBlur = 30;
  ctx.strokeRect(18, 18, w - 36, h - 36); ctx.shadowBlur = 0;
  ctx.strokeStyle = "#FF6A00"; ctx.lineWidth = 1;
  ctx.strokeRect(30, 30, w - 60, h - 60);

  // Cantos — SÍMBOLO DE CHAMA TEXTO (sem emoji!)
  [[20,20],[w-70,20],[20,h-70],[w-70,h-70]].forEach(([cx, cy]) => {
    ctx.fillStyle = "#FF4400"; ctx.shadowColor = "#FF003C"; ctx.shadowBlur = 15;
    ctx.font = "bold 32px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("🔥", cx + 25, cy + 35); // ⚠️ Se ainda der problema, troque por "◤"
    ctx.shadowBlur = 0;
  });

  const av = await loadImageBuffer(avatarUrl), tamAv = 220, ax = 65, ay = h / 2 - tamAv / 2;
  ctx.shadowColor = "#FF003C"; ctx.shadowBlur = 50; ctx.save();
  ctx.beginPath(); ctx.arc(ax + tamAv / 2, ay + tamAv / 2, tamAv / 2, 0, Math.PI * 2); ctx.clip();
  ctx.drawImage(av, ax, ay, tamAv, tamAv); ctx.restore(); ctx.shadowBlur = 0;

  const gradBorda = ctx.createRadialGradient(ax + tamAv / 2, ay + tamAv / 2, 0, ax + tamAv / 2, ay + tamAv / 2, tamAv / 2 + 15);
  gradBorda.addColorStop(0, "#FF003C"); gradBorda.addColorStop(0.3, "#FF3300");
  gradBorda.addColorStop(0.6, "#FF9900"); gradBorda.addColorStop(1, "#FFCC00");
  ctx.beginPath(); ctx.arc(ax + tamAv / 2, ay + tamAv / 2, tamAv / 2 + 8, 0, Math.PI * 2);
  ctx.strokeStyle = gradBorda; ctx.lineWidth = 7; ctx.shadowColor = "#FF003C"; ctx.shadowBlur = 25; ctx.stroke(); ctx.shadowBlur = 0;

  //══════════════════════════════════════════════════
  const tx = 350;

  ctx.fillStyle = "#FFFFFF"; ctx.font = "bold 58px Arial, sans-serif"; ctx.textAlign = "left";
  ctx.shadowColor = "#FF003C"; ctx.shadowBlur = 20;
  ctx.fillText(nome, tx, 78); ctx.shadowBlur = 0;

  ctx.fillStyle = "#FF9900"; ctx.font = "24px Arial, sans-serif";
  ctx.fillText("FORCA EM ASCENSAO", tx, 128);

  ctx.fillStyle = "#FFFFFF"; ctx.font = "bold 46px Arial, sans-serif";
  ctx.shadowColor = "#FF003C"; ctx.shadowBlur = 18;
  ctx.fillText("◤ NIVEL " + level1 + " ◥", tx, 185); ctx.shadowBlur = 0;

  //══════════════════════════════════════════════════
  const bx = tx, by = 225, bw = 830, bh = 58;
  const progresso = Math.max(0, Math.min(1, Number(level1) / Number(level2)));
  const porcentagem = Math.round(progresso * 100);
  const faltam = Math.max(0, Number(level2) - Number(level1));

  ctx.fillStyle = "rgba(25,5,5,0.85)";
  ctx.fillRect(bx, by, bw, bh);
  ctx.strokeStyle = "#FF003C"; ctx.lineWidth = 2; ctx.shadowColor = "#FF003C"; ctx.shadowBlur = 12;
  ctx.strokeRect(bx, by, bw, bh); ctx.shadowBlur = 0;
  ctx.strokeStyle = "#FF6A00"; ctx.lineWidth = 1;
  ctx.strokeRect(bx + 2, by + 2, bw - 4, bh - 4);

  const gradBarra = ctx.createLinearGradient(bx, 0, bx + bw, 0);
  gradBarra.addColorStop(0, "#990024"); gradBarra.addColorStop(0.25, "#FF003C");
  gradBarra.addColorStop(0.5, "#FF4400"); gradBarra.addColorStop(0.75, "#FF8800"); gradBarra.addColorStop(1, "#FFCC00");
  ctx.shadowColor = "#FF003C"; ctx.shadowBlur = 15; ctx.fillStyle = gradBarra;
  ctx.fillRect(bx + 3, by + 3, (bw - 6) * progresso, bh - 6); ctx.shadowBlur = 0;

  for (let i = 0; i < 20; i++) {
    const px = bx + 3 + Math.random() * ((bw - 6) * progresso);
    const py = by + 3 + Math.random() * (bh - 6);
    const tam = Math.random() * 4 + 1;
    ctx.fillStyle = i % 2 === 0 ? "#FF6600" : "#FFCC00";
    ctx.globalAlpha = 0.4 + Math.random() * 0.4;
    ctx.beginPath(); ctx.arc(px, py, tam, 0, Math.PI * 2); ctx.fill();
  }
  ctx.globalAlpha = 1;

  ctx.fillStyle = "#FFFFFF"; ctx.font = "bold 22px Arial, sans-serif"; ctx.textAlign = "center";
  ctx.fillText(level1 + " / " + level2 + " — " + porcentagem + "%", bx + bw / 2, by + bh / 2 + 8);

  ctx.textAlign = "left"; ctx.fillStyle = "#FF9988"; ctx.font = "20px Arial, sans-serif";
  ctx.fillText("CHAMAS CRESCENTES — " + faltam + " NIVEIS", bx, by + bh + 32);

  ctx.textAlign = "right"; ctx.fillStyle = "rgba(255,68,0,0.4)"; ctx.font = "15px Arial, sans-serif";
  ctx.fillText("TOSH TECH • INFERNO FLAME", w - 25, h - 18);

  return c.toBuffer("image/png");
}

module.exports = { canvaLevel, canvaLevelGold, canvaLevelFire };
