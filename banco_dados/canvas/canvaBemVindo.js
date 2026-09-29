/*
⊰᯽⊱┈──╌❊ TOSH TECH — CANVA PREMIUM ❊╌──┈⊰᯽⊱
༺『Módulo: Canva Bem-Vindo 1 & 2』༻
➪ Criador『Tosh』
➪ Versão: 2.0 ✅ REUTILIZA FUNÇÕES • SEM REPETIR CÓDIGO ✅
➪ BemVindo = circular anime | BemVindo2 = quadrado profissional ✅
⊰᯽⊱┈──────────────────────────────────────┈⊰᯽⊱
*/

// ➪ Baixa imagem direto da URL — REUTILIZADA ✅
const axios = require('axios');
const { createCanvas, loadImage } = require('canvas');

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

// ➪ Texto com contorno — REUTILIZADA ✅
function desenharTextoComContorno(ctx, texto, x, y, tamanhoFonte, corTexto, corContorno, espessura = 10) {
  ctx.font = `bold ${tamanhoFonte}px Sans, Arial, Helvetica`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.strokeStyle = corContorno;
  ctx.lineWidth = espessura;
  ctx.lineJoin = "round";
  ctx.miterLimit = 2;
  ctx.strokeText(texto, x, y);
  ctx.fillStyle = corTexto;
  ctx.fillText(texto, x, y);
}

// ⭐ FUNÇÃO 1 — BEM-VINDO ORIGINAL (circular anime) ✅
async function canvaBemVindo(nome, avatarUrl, fundoUrl, titulo, desc) {
  const width = 1280;
  const height = 720;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  const raioArredondamento = 60;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(raioArredondamento, 0);
  ctx.lineTo(width - raioArredondamento, 0);
  ctx.quadraticCurveTo(width, 0, width, raioArredondamento);
  ctx.lineTo(width, height - raioArredondamento);
  ctx.quadraticCurveTo(width, height, width - raioArredondamento, height);
  ctx.lineTo(raioArredondamento, height);
  ctx.quadraticCurveTo(0, height, 0, height - raioArredondamento);
  ctx.lineTo(0, raioArredondamento);
  ctx.quadraticCurveTo(0, 0, raioArredondamento, 0);
  ctx.closePath();
  ctx.clip();

  const fundo = await loadImageBuffer(fundoUrl);
  ctx.drawImage(fundo, 0, 0, width, height);
  const gradienteBrilho = ctx.createLinearGradient(0, 0, 0, height);
  gradienteBrilho.addColorStop(0, "rgba(255,255,255,0.12)");
  gradienteBrilho.addColorStop(0.5, "rgba(255,255,255,0)");
  gradienteBrilho.addColorStop(1, "rgba(0,0,0,0.1)");
  ctx.fillStyle = gradienteBrilho;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();

  ctx.beginPath();
  ctx.moveTo(raioArredondamento, 0);
  ctx.lineTo(width - raioArredondamento, 0);
  ctx.quadraticCurveTo(width, 0, width, raioArredondamento);
  ctx.lineTo(width, height - raioArredondamento);
  ctx.quadraticCurveTo(width, height, width - raioArredondamento, height);
  ctx.lineTo(raioArredondamento, height);
  ctx.quadraticCurveTo(0, height, 0, height - raioArredondamento);
  ctx.lineTo(0, raioArredondamento);
  ctx.quadraticCurveTo(0, 0, raioArredondamento, 0);
  ctx.closePath();
  
  const gradienteBorda = ctx.createLinearGradient(0, 0, width, height);
  gradienteBorda.addColorStop(0, "#00ffff");
  gradienteBorda.addColorStop(0.25, "#ff00ff");
  gradienteBorda.addColorStop(0.5, "#ffff00");
  gradienteBorda.addColorStop(0.75, "#ff00ff");
  gradienteBorda.addColorStop(1, "#00ffff");
  
  ctx.shadowBlur = 25;
  ctx.shadowColor = "#ffffff";
  ctx.strokeStyle = gradienteBorda;
  ctx.lineWidth = 15;
  ctx.stroke();
  ctx.shadowBlur = 0;

  const avatar = await loadImageBuffer(avatarUrl);
  const size = 280;
  const centerX = width / 2;
  const centerY = 180;

  ctx.save();
  ctx.shadowBlur = 35;
  ctx.shadowColor = "#ffffff";
  ctx.beginPath();
  ctx.arc(centerX, centerY, size / 2 + 10, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255,255,255,0.2)";
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.beginPath();
  ctx.arc(centerX, centerY, size / 2, 0, Math.PI * 2);
  ctx.clip();
  ctx.drawImage(avatar, centerX - size / 2, centerY - size / 2, size, size);
  ctx.restore();

  const cores = ["#ff0000", "#00ff00", "#00ffff", "#ff00ff", "#ffff00", "#00ccff", "#ff6600", "#66ff66"];
  const corBorda = cores[Math.floor(Math.random() * cores.length)];
  
  ctx.save();
  ctx.shadowBlur = 25;
  ctx.shadowColor = corBorda;
  ctx.beginPath();
  ctx.arc(centerX, centerY, size / 2 + 8, 0, Math.PI * 2);
  ctx.strokeStyle = corBorda;
  ctx.lineWidth = 8;
  ctx.stroke();
  ctx.restore();

  desenharTextoComContorno(ctx, titulo || "BEM-VINDO", centerX, 470, 88, "#ffffff", "#000000", 12);
  desenharTextoComContorno(ctx, nome || "Usuário", centerX, 570, 72, corBorda, "#000000", 12);
  desenharTextoComContorno(ctx, desc || "Seja bem-vindo!", centerX, 650, 42, "#ffffff", "#000000", 8);

  return canvas.toBuffer();
}

// ⭐ FUNÇÃO 2 — BEM-VINDO 2 ✨ FINAL ✅
async function canvaBemVindo2(nome, avatarUrl, fundoUrl, titulo, desc) {
  const width = 1280;
  const height = 720;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // ⭐ 1️⃣ BORDA PRETA DO CARD ✅
  const raioArredondamento = 20;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(raioArredondamento, 0);
  ctx.lineTo(width - raioArredondamento, 0);
  ctx.quadraticCurveTo(width, 0, width, raioArredondamento);
  ctx.lineTo(width, height - raioArredondamento);
  ctx.quadraticCurveTo(width, height, width - raioArredondamento, height);
  ctx.lineTo(raioArredondamento, height);
  ctx.quadraticCurveTo(0, height, 0, height - raioArredondamento);
  ctx.lineTo(0, raioArredondamento);
  ctx.quadraticCurveTo(0, 0, raioArredondamento, 0);
  ctx.closePath();
  ctx.clip();

  // ⭐ 2️⃣ FUNDO — 100% ORIGINAL NATURAL ✅ SEM SOMBRA, SEM ESCURECER! ✨
  const fundo = await loadImageBuffer(fundoUrl);
  ctx.drawImage(fundo, 0, 0, width, height);
  ctx.restore();
  // ❌ REMOVIDO: ctx.fillStyle = "rgba(0,0,0,0.5)" — sem sombra, sem filtro! ✅

  // ⭐ 3️⃣ BORDA EXTERIOR — PRETA ✅
  ctx.beginPath();
  ctx.moveTo(raioArredondamento, 0);
  ctx.lineTo(width - raioArredondamento, 0);
  ctx.quadraticCurveTo(width, 0, width, raioArredondamento);
  ctx.lineTo(width, height - raioArredondamento);
  ctx.quadraticCurveTo(width, height, width - raioArredondamento, height);
  ctx.lineTo(raioArredondamento, height);
  ctx.quadraticCurveTo(0, height, 0, height - raioArredondamento);
  ctx.lineTo(0, raioArredondamento);
  ctx.quadraticCurveTo(0, 0, raioArredondamento, 0);
  ctx.closePath();
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 12;
  ctx.stroke();

  // ⭐ 4️⃣ AVATAR QUADRADO — LADO ESQUERDO + BORDA VERMELHA ✅
  const avatar = await loadImageBuffer(avatarUrl);
  const avatarSize = 320;
  const avatarX = 80;
  const avatarY = 200;
  const avatarRadius = 12;

  // ✅ BORDA VERMELHA DO AVATAR ✅
  ctx.save();
  ctx.shadowBlur = 20;
  ctx.shadowColor = "#ff0000";
  ctx.beginPath();
  ctx.moveTo(avatarX - avatarRadius - 8, avatarY - avatarRadius - 8);
  ctx.lineTo(avatarX + avatarSize + avatarRadius + 8, avatarY - avatarRadius - 8);
  ctx.lineTo(avatarX + avatarSize + avatarRadius + 8, avatarY + avatarSize + avatarRadius + 8);
  ctx.lineTo(avatarX - avatarRadius - 8, avatarY + avatarSize + avatarRadius + 8);
  ctx.closePath();
  ctx.strokeStyle = "#ff0000";
  ctx.lineWidth = 8;
  ctx.stroke();
  ctx.restore();

  // ✅ AVATAR QUADRADO ✅
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(avatarX + avatarRadius, avatarY);
  ctx.lineTo(avatarX + avatarSize - avatarRadius, avatarY);
  ctx.quadraticCurveTo(avatarX + avatarSize, avatarY, avatarX + avatarSize, avatarY + avatarRadius);
  ctx.lineTo(avatarX + avatarSize, avatarY + avatarSize - avatarRadius);
  ctx.quadraticCurveTo(avatarX + avatarSize, avatarY + avatarSize, avatarX + avatarSize - avatarRadius, avatarY + avatarSize);
  ctx.lineTo(avatarX + avatarRadius, avatarY + avatarSize);
  ctx.quadraticCurveTo(avatarX, avatarY + avatarSize, avatarX, avatarY + avatarSize - avatarRadius);
  ctx.lineTo(avatarX, avatarY + avatarRadius);
  ctx.quadraticCurveTo(avatarX, avatarY, avatarX + avatarRadius, avatarY);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(avatar, avatarX, avatarY, avatarSize, avatarSize);
  ctx.restore();

  // ⭐ 5️⃣ TÍTULO — ABAIXO DO AVATAR, BRANCO ✅
  const centroAvatar = avatarX + avatarSize / 2;
  desenharTextoComContorno(
    ctx, 
    titulo || "BEM-VINDO", 
    centroAvatar, avatarY + avatarSize + 55, 
    60, "#ffffff", "#000000", 10
  );

  // ⭐ 6️⃣ NOME — LADO DIREITO, TOTALMENTE VERMELHO ✅
  const ladoDireitoX = avatarX + avatarSize + 60;
  desenharTextoComContorno(
    ctx, 
    nome || "Usuário", 
    ladoDireitoX, 320, 
    72, "#ff0000", "#000000", 12
  );

  // ⭐ 7️⃣ DESCRIÇÃO — LADO DIREITO ABAIXO DO NOME, BRANCO ✅
  desenharTextoComContorno(
    ctx, 
    desc || "Seja bem-vindo!", 
    ladoDireitoX, 420, 
    40, "#ffffff", "#000000", 8
  );

  return canvas.toBuffer();
}


// ⭐ Fora da estrela = fundoUrl • Dentro da estrela = avatarUrl • Sem branco ❌🤍
async function canvaBemVindo3(nome, avatarUrl, fundoUrl, titulo, desc) {
  const width = 1280;
  const height = 720;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // ⭐ 1️⃣ PRIMEIRO — DESENHA O FUNDO COMPLETO (fora da estrela) ✅
  const imagemDeFundo = await loadImageBuffer(fundoUrl); // ✅ Usa fundoUrl!
  ctx.drawImage(imagemDeFundo, 0, 0, width, height); // ✅ Preenche TUDO com a imagem de fundo

  // ⭐ 2️⃣ DESENHA A ESTRELA E PREENCHE COM A IMAGEM DO AVATAR ✅
  const centerX = width / 2;
  const centerY = height / 2;
  const raioExterno = Math.min(width, height) / 2 - 30;
  const raioInterno = raioExterno * 0.4;

  ctx.save();
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const raio = i % 2 === 0 ? raioExterno : raioInterno;
    const angulo = (Math.PI / 5) * i - Math.PI / 2;
    const x = centerX + raio * Math.cos(angulo);
    const y = centerY + raio * Math.sin(angulo);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.clip();

  // ✅ DENTRO da estrela = imagem do AVATAR ❤️
  const imagemDoAvatar = await loadImageBuffer(avatarUrl);
  ctx.drawImage(imagemDoAvatar, 0, 0, width, height);
  ctx.restore();

  // ⭐ 3️⃣ BORDA BRANCA FINA AO REDOR DA ESTRELA ✅
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const raio = i % 2 === 0 ? raioExterno : raioInterno;
    const angulo = (Math.PI / 5) * i - Math.PI / 2;
    const x = centerX + raio * Math.cos(angulo);
    const y = centerY + raio * Math.sin(angulo);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 3;
  ctx.stroke();

  // ⭐ 4️⃣ AVATAR CIRCULAR NO CENTRO ✅
  const avatar = await loadImageBuffer(avatarUrl);
  const avatarSize = 240;
  const avatarCentroY = centerY - 30;

  ctx.save();
  ctx.beginPath();
  ctx.arc(centerX, avatarCentroY, avatarSize / 2, 0, Math.PI * 2);
  ctx.clip();
  ctx.drawImage(avatar, centerX - avatarSize / 2, avatarCentroY - avatarSize / 2, avatarSize, avatarSize);
  ctx.restore();

  // ✅ BORDA BRANCA NO AVATAR ✅
  ctx.beginPath();
  ctx.arc(centerX, avatarCentroY, avatarSize / 2 + 3, 0, Math.PI * 2);
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  ctx.stroke();

  // ⭐ 5️⃣ TEXTOS — TODOS BRANCOS, CENTRALIZADOS ✅
  desenharTextoComContorno(
    ctx, 
    titulo || "BEM-VINDO", 
    centerX, avatarCentroY + avatarSize / 2 + 55, 
    56, "#ffffff", "#000000", 8
  );

  desenharTextoComContorno(
    ctx, 
    nome || "Usuário", 
    centerX, avatarCentroY + avatarSize / 2 + 125, 
    64, "#ffffff", "#000000", 10
  );

  desenharTextoComContorno(
    ctx, 
    desc || "Seja bem-vindo!", 
    centerX, avatarCentroY + avatarSize / 2 + 195, 
    36, "#ffffff", "#000000", 6
  );

  return canvas.toBuffer();
}

module.exports = { canvaBemVindo, canvaBemVindo2, canvaBemVindo3 };
