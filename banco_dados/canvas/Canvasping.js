/*
⊰᯽⊱┈──╌❊ TOSH TECH — CARTÃO DE PING PREMIUM ❊╌──┈⊰᯽⊱
༺『Módulo: Cartão de Ping • 3 TEMAS EXCLUSIVOS』༻
➪ Criador『Tosh』
➪ Versão: 2.0 ✅ 3 Temas Novos • Cores Novas • Estilo Reformulado
➪ TEMA 1: ANIMÉ — Cores vibrantes, estilo anime
➪ TEMA 2: MOTOR RACING — Carros de corrida, velocidade, fogo
➪ TEMA 3: TECH CORE — Tecnologia profunda, digital
⊰᯽⊱┈──────────────────────────────────────┈⊰᯽⊱
*/

const axios = require('axios');
const { createCanvas } = require('canvas');

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

// ➪ Retorna cor baseada no ping — PADRÃO UNIFICADO
function obterCorPing(ms) {
  if (ms <= 50) return { cor: "#00F5A0", brilho: "#00FF88", status: "PERFEITO" };
  if (ms <= 150) return { cor: "#FFE600", brilho: "#FFFF44", status: "BOM" };
  if (ms <= 300) return { cor: "#FF8A00", brilho: "#FFAA00", status: "NORMAL" };
  return { cor: "#FF2D55", brilho: "#FF5577", status: "ALTO" };
}

// ➪ Desenha partículas/flocos — estilo personalizado
function desenharParticulas(ctx, w, h, qtd, cor, estilo = "ponto") {
  for (let i = 0; i < qtd; i++) {
    const x = Math.random() * w;
    const y = Math.random() * h;
    const t = Math.random() * 2 + 0.5;
    const opacidade = Math.random() * 0.5 + 0.1;
    ctx.fillStyle = cor.includes("rgba") ? cor : `rgba(${cor}, ${opacidade})`;
    if (estilo === "ponto") {
      ctx.beginPath(); ctx.arc(x, y, t, 0, Math.PI * 2); ctx.fill();
    } else if (estilo === "linha") {
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 8, y + 8); ctx.stroke();
    } else if (estilo === "triangulo") {
      ctx.beginPath();
      ctx.moveTo(x, y - t); ctx.lineTo(x + t, y + t); ctx.lineTo(x - t, y + t); ctx.closePath(); ctx.fill();
    }
  }
}

//══════════════════════════════════════════════════
// 🎌 TEMA 1: ANIMÉ — Vibrante, cores de anime, estilo gráfico
//══════════════════════════════════════════════════
async function canvaPingAnime(pingMs, uptime = "", titulo = "SISTEMA", iconeUrl = null) {
  const w = 800, h = 500, c = createCanvas(w, h), ctx = c.getContext("2d");
  const { cor, brilho, status } = obterCorPing(pingMs);

  // Fundo — Roxo escuro + azul profundo
  const gradFundo = ctx.createLinearGradient(0, 0, w, h);
  gradFundo.addColorStop(0, "#1A103C");
  gradFundo.addColorStop(0.5, "#2D1B5E");
  gradFundo.addColorStop(1, "#120A2E");
  ctx.fillStyle = gradFundo;
  ctx.fillRect(0, 0, w, h);

  // Estrelas brilhantes
  desenharParticulas(ctx, w, h, 80, "180, 100, 255", "ponto");
  desenharParticulas(ctx, w, h, 40, "255, 200, 255", "ponto");

  // Moldura — Rosa neon estilo anime
  ctx.strokeStyle = "#FF6EF5"; ctx.lineWidth = 5; ctx.shadowColor = "#FF6EF5"; ctx.shadowBlur = 30;
  ctx.strokeRect(18, 18, w - 36, h - 36); ctx.shadowBlur = 0;
  ctx.strokeStyle = "#B84BD9"; ctx.lineWidth = 2;
  ctx.strokeRect(35, 35, w - 70, h - 70);

  // Cantos — Símbolos de brilho
  [[25,25],[w-65,25],[25,h-65],[w-65,h-65]].forEach(([cx, cy]) => {
    ctx.fillStyle = "#FF6EF5"; ctx.font = "bold 28px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("☆", cx + 20, cy + 38);
  });

  // Título
  ctx.fillStyle = "#FFD5FF"; ctx.font = "bold 26px sans-serif"; ctx.textAlign = "center";
  ctx.shadowColor = "#FF6EF5"; ctx.shadowBlur = 10;
  ctx.fillText(titulo.toUpperCase(), w/2, 75); ctx.shadowBlur = 0;

  // ⚡ PING PRINCIPAL — Gigante e vibrante
  ctx.fillStyle = cor; ctx.font = "bold 130px sans-serif";
  ctx.shadowColor = brilho; ctx.shadowBlur = 35;
  ctx.fillText(`${pingMs}`, w/2, 230); ctx.shadowBlur = 0;

  ctx.fillStyle = "#FFD5FF"; ctx.font = "bold 30px sans-serif";
  ctx.fillText("MS", w/2 + 100, 230);

  // Status — Estilo anime
  ctx.fillStyle = cor; ctx.font = "bold 36px sans-serif";
  ctx.fillText(`⋆ ${status} ⋆`, w/2, 300);

  // Uptime
  if (uptime) {
    ctx.fillStyle = "#B8A0D8"; ctx.font = "20px sans-serif";
    ctx.fillText(`TEMPO ATIVO: ${uptime}`, w/2, 350);
  }

  // Barra de progresso colorida
  const barraLargura = 320, barraAltura = 14, barraX = w/2 - barraLargura/2, barraY = 380;
  ctx.fillStyle = "#2A1A4C"; ctx.fillRect(barraX, barraY, barraLargura, barraAltura);
  const preenchimento = Math.min((pingMs / 500) * barraLargura, barraLargura);
  ctx.fillStyle = cor; ctx.shadowColor = brilho; ctx.shadowBlur = 12;
  ctx.fillRect(barraX, barraY, preenchimento, barraAltura); ctx.shadowBlur = 0;

  // Rodapé
  ctx.fillStyle = "rgba(255,110,245,0.4)"; ctx.font = "14px sans-serif"; ctx.textAlign = "right";
  ctx.fillText("TOSH TECH • ANIME STYLE", w - 30, h - 25);

  return c.toBuffer("image/png");
}

//══════════════════════════════════════════════════
// 🏎️ TEMA 2: MOTOR RACING — Carros de corrida, fogo, velocidade
//══════════════════════════════════════════════════
async function canvaPingMotor(pingMs, uptime = "", titulo = "CORRIDA", iconeUrl = null) {
  const w = 800, h = 500, c = createCanvas(w, h), ctx = c.getContext("2d");
  const { cor, brilho, status } = obterCorPing(pingMs);

  // Fundo — Preto carbono + vermelho escuro
  const gradFundo = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, w/2);
  gradFundo.addColorStop(0, "#2B0505");
  gradFundo.addColorStop(1, "#0A0A0A");
  ctx.fillStyle = gradFundo;
  ctx.fillRect(0, 0, w, h);

  // Listras de velocidade
  ctx.strokeStyle = "rgba(255,60,0,0.08)";
  ctx.lineWidth = 2;
  for (let i = -w; i < w * 2; i += 60) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i + 100, h); ctx.stroke();
  }
  desenharParticulas(ctx, w, h, 60, "255, 100, 0", "linha");

  // Moldura — Vermelho fogo
  ctx.strokeStyle = "#FF3C00"; ctx.lineWidth = 6; ctx.shadowColor = "#FF3C00"; ctx.shadowBlur = 35;
  ctx.strokeRect(15, 15, w - 30, h - 30); ctx.shadowBlur = 0;
  ctx.strokeStyle = "#FF8800"; ctx.lineWidth = 2;
  ctx.strokeRect(32, 32, w - 64, h - 64);

  // Cantos — Símbolos de velocidade
  [[20,20],[w-60,20],[20,h-60],[w-60,h-60]].forEach(([cx, cy]) => {
    ctx.fillStyle = "#FF3C00"; ctx.font = "bold 28px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("◤", cx + 20, cy + 38);
  });

  // Título
  ctx.fillStyle = "#FFCC00"; ctx.font = "bold 26px Impact, sans-serif"; ctx.textAlign = "center";
  ctx.shadowColor = "#FF3C00"; ctx.shadowBlur = 15;
  ctx.fillText(titulo.toUpperCase(), w/2, 75); ctx.shadowBlur = 0;

  // ⚡ PING PRINCIPAL — Fogo e potência
  ctx.fillStyle = cor; ctx.font = "bold 130px Impact, sans-serif";
  ctx.shadowColor = brilho; ctx.shadowBlur = 35;
  ctx.fillText(`${pingMs}`, w/2, 230); ctx.shadowBlur = 0;

  ctx.fillStyle = "#FFCC00"; ctx.font = "bold 30px Impact, sans-serif";
  ctx.fillText("MS", w/2 + 100, 230);

  // Status — Potência
  ctx.fillStyle = cor; ctx.font = "bold 36px Impact, sans-serif";
  ctx.fillText(`◤ ${status} ◥`, w/2, 300);

  // Uptime — Motor ligado
  if (uptime) {
    ctx.fillStyle = "#CC6600"; ctx.font = "20px sans-serif"; ctx.fillText(`MOTOR LIGADO: ${uptime}`, w/2, 350);
  }

  // Barra de RPM
  const barraLargura = 340, barraAltura = 16, barraX = w/2 - barraLargura/2, barraY = 380;
  ctx.fillStyle = "#1A0A00"; ctx.fillRect(barraX, barraY, barraLargura, barraAltura);
  const preenchimento = Math.min((pingMs / 500) * barraLargura, barraLargura);
  ctx.fillStyle = cor; ctx.shadowColor = brilho; ctx.shadowBlur = 15;
  ctx.fillRect(barraX, barraY, preenchimento, barraAltura); ctx.shadowBlur = 0;

  // Rodapé
  ctx.fillStyle = "rgba(255,60,0,0.5)"; ctx.font = "14px sans-serif"; ctx.textAlign = "right";
  ctx.fillText("TOSH TECH • MOTOR RACING", w - 30, h - 25);

  return c.toBuffer("image/png");
}

//══════════════════════════════════════════════════
// 💻 TEMA 3: TECH CORE — Tecnologia profunda, digital, código
//══════════════════════════════════════════════════
async function canvaPingTech(pingMs, uptime = "", titulo = "NÚCLEO", iconeUrl = null) {
  const w = 800, h = 500, c = createCanvas(w, h), ctx = c.getContext("2d");
  const { cor, brilho, status } = obterCorPing(pingMs);

  // Fundo — Preto profundo + verde digital
  const gradFundo = ctx.createLinearGradient(0, 0, w, h);
  gradFundo.addColorStop(0, "#050A08");
  gradFundo.addColorStop(0.5, "#0A1A14");
  gradFundo.addColorStop(1, "#020504");
  ctx.fillStyle = gradFundo;
  ctx.fillRect(0, 0, w, h);

  // Código binário flutuante
  ctx.fillStyle = "rgba(0,255,136,0.05)";
  ctx.font = "14px monospace";
  for (let y = 40; y < h; y += 30) {
    for (let x = 20; x < w; x += 50) {
      ctx.fillText(Math.random() > 0.5 ? "1" : "0", x, y);
    }
  }
  desenharParticulas(ctx, w, h, 70, "0, 255, 136", "ponto");

  // Moldura — Verde digital
  ctx.strokeStyle = "#00FF88"; ctx.lineWidth = 5; ctx.shadowColor = "#00FF88"; ctx.shadowBlur = 30;
  ctx.strokeRect(20, 20, w - 40, h - 40); ctx.shadowBlur = 0;
  ctx.strokeStyle = "#00AA55"; ctx.lineWidth = 1;
  ctx.strokeRect(38, 38, w - 76, h - 76);

  // Cantos — Símbolos de código
  [[25,25],[w-65,25],[25,h-65],[w-65,h-65]].forEach(([cx, cy]) => {
    ctx.fillStyle = "#00FF88"; ctx.font = "bold 26px monospace"; ctx.textAlign = "center";
    ctx.fillText("⟨⟩", cx + 20, cy + 38);
  });

  // Título
  ctx.fillStyle = "#88FFCC"; ctx.font = "bold 26px 'Courier New', monospace"; ctx.textAlign = "center";
  ctx.shadowColor = "#00FF88"; ctx.shadowBlur = 10;
  ctx.fillText(titulo.toUpperCase(), w/2, 75); ctx.shadowBlur = 0;

  // ⚡ PING PRINCIPAL — Núcleo digital
  ctx.fillStyle = cor; ctx.font = "bold 130px 'Courier New', monospace";
  ctx.shadowColor = brilho; ctx.shadowBlur = 30;
  ctx.fillText(`${pingMs}`, w/2, 230); ctx.shadowBlur = 0;

  ctx.fillStyle = "#88FFCC"; ctx.font = "bold 30px monospace";
  ctx.fillText("MS", w/2 + 100, 230);

  // Status — Sistema
  ctx.fillStyle = cor; ctx.font = "bold 36px monospace";
  ctx.fillText(`⟨ ${status} ⟩`, w/2, 300);

  // Uptime — Sistema online
  if (uptime) {
    ctx.fillStyle = "#44AA77"; ctx.font = "20px monospace";
    ctx.fillText(`SISTEMA ONLINE: ${uptime}`, w/2, 350);
  }

  // Barra de sinal digital
  const barraLargura = 300, barraAltura = 12, barraX = w/2 - barraLargura/2, barraY = 380;
  ctx.fillStyle = "#0A2015"; ctx.fillRect(barraX, barraY, barraLargura, barraAltura);
  const preenchimento = Math.min((pingMs / 500) * barraLargura, barraLargura);
  ctx.fillStyle = cor; ctx.shadowColor = brilho; ctx.shadowBlur = 10;
  ctx.fillRect(barraX, barraY, preenchimento, barraAltura); ctx.shadowBlur = 0;

  // Rodapé
  ctx.fillStyle = "rgba(0,255,136,0.4)"; ctx.font = "14px monospace"; ctx.textAlign = "right";
  ctx.fillText("TOSH TECH • TECH CORE", w - 30, h - 25);

  return c.toBuffer("image/png");
}

module.exports = { canvaPingAnime, canvaPingMotor, canvaPingTech };
