/*
⊰᯽⊱┈──╌❊ TOSH TECH — 3 EFEITOS CORRIGIDOS ❊╌──┈⊰᯽⊱
➪ Criador『Tosh』
➪ Versão: 3.0 ✅ FIÉIS • COMPLETOS • SEM ERROS ✅
➪ 💬 WhatsApp | 📘 Facebook | 📰 Jornal
⊰᯽⊱┈──────────────────────────────────────┈⊰᯽⊱
*/

const axios = require('axios');
const { createCanvas, loadImage } = require('canvas');

async function loadImageBuffer(url) {
  const res = await axios.get(url, { 
    responseType: "arraybuffer", timeout: 30000, maxRedirects: 10,
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/128.0.0.0 Safari/537.36" }
  });
  return await loadImage(Buffer.from(res.data));
}

// ═══════ 💬 WHATSAPP — COMPLETO E FIEL ═══════
async function canvaWhatsApp(avatarUrl, mensagem = "Tema top aí sim 😎🔥", nome = "Tosh Tech", hora = "21:24") {
  const w = 720, h = 1000;
  const c = createCanvas(w, h), ctx = c.getContext("2d");

  // Fundo
  ctx.fillStyle = "#0b141a";
  ctx.fillRect(0, 0, w, h);

  // Barra superior
  ctx.fillStyle = "#202c33";
  ctx.fillRect(0, 0, w, 110);

  // Botão voltar
  ctx.fillStyle = "#e9edef";
  ctx.beginPath();
  ctx.moveTo(35, 55); ctx.lineTo(65, 35); ctx.lineTo(65, 75); ctx.closePath(); ctx.fill();

  // Avatar
  const avatar = await loadImageBuffer(avatarUrl);
  ctx.save(); ctx.beginPath(); ctx.arc(110, 55, 35, 0, Math.PI*2); ctx.clip();
  ctx.drawImage(avatar, 75, 20, 70, 70); ctx.restore();

  // Nome e status
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 26px sans-serif";
  ctx.fillText(nome, 160, 45);
  ctx.fillStyle = "#8696a0";
  ctx.font = "19px sans-serif";
  ctx.fillText(`visto por último hoje às ${hora}`, 160, 75);

  // Balão mensagem
  const bx = 120, by = 180, bw = w - 160;
  ctx.fillStyle = "#202c33";
  ctx.beginPath();
  ctx.moveTo(bx, by + 12);
  ctx.lineTo(bx + 10, by);
  ctx.lineTo(bx + bw - 10, by);
  ctx.quadraticCurveTo(bx + bw, by, bx + bw, by + 12);
  ctx.lineTo(bx + bw, by + 100);
  ctx.quadraticCurveTo(bx + bw, by + 112, bx + bw - 12, by + 112);
  ctx.lineTo(bx + 20, by + 112);
  ctx.quadraticCurveTo(bx + 10, by + 112, bx + 8, by + 100);
  ctx.lineTo(bx, by + 22);
  ctx.quadraticCurveTo(bx - 3, by + 12, bx + 8, by + 15);
  ctx.closePath();
  ctx.fill();

  // Texto
  ctx.fillStyle = "#e9edef";
  ctx.font = "24px sans-serif";
  ctx.fillText(mensagem, bx + 20, by + 45, bw - 40);

  // Hora
  ctx.fillStyle = "#8696a0";
  ctx.font = "15px sans-serif";
  ctx.fillText(`${hora} ✅✅`, bx + bw - 85, by + 105);

  return c.toBuffer();
}

// ═══════ 📘 FACEBOOK — COMPLETO E FIEL ═══════
async function canvaFacebook(avatarUrl, nome = "Tosh Tech", mensagem = "Eu fiz uma música tá geral compartilhando kkkk 😂🎵", tempo = "1 h") {
  const w = 480, h = 780;
  const c = createCanvas(w, h), ctx = c.getContext("2d");

  // Fundo
  ctx.fillStyle = "#18191a";
  ctx.fillRect(0, 0, w, h);

  // Cabeçalho
  ctx.fillStyle = "#242526";
  ctx.fillRect(0, 0, w, 100);

  // Avatar
  const avatar = await loadImageBuffer(avatarUrl);
  ctx.save(); ctx.beginPath(); ctx.arc(50, 50, 30, 0, Math.PI*2); ctx.clip();
  ctx.drawImage(avatar, 20, 20, 60, 60); ctx.restore();

  // Nome e tempo
  ctx.fillStyle = "#e4e6eb";
  ctx.font = "bold 22px sans-serif";
  ctx.fillText(nome, 95, 40);
  ctx.fillStyle = "#b0b3b8";
  ctx.font = "16px sans-serif";
  ctx.fillText(`${tempo} · 🌎`, 95, 68);

  // Texto
  ctx.fillStyle = "#e4e6eb";
  ctx.font = "20px sans-serif";
  ctx.fillText(mensagem, 20, 130, w - 40);

  // Foto
  const fotoY = 180;
  ctx.fillStyle = "#3a3b3c";
  ctx.fillRect(0, fotoY, w, 380);
  ctx.drawImage(avatar, 0, fotoY, w, 380);

  // Rodapé
  const rodapeY = fotoY + 380;
  ctx.fillStyle = "#242526";
  ctx.fillRect(0, rodapeY, w, 60);
  ctx.fillStyle = "#b0b3b8";
  ctx.font = "18px sans-serif";
  ctx.fillText("👍 Curtir · 💬 Comentar · ↗️ Compartilhar", 20, rodapeY + 38);

  return c.toBuffer();
}

// ═══════ 📰 JORNAL — PROFISSIONAL COMPLETO ═══════
async function canvaJornal(avatarUrl, titulo = "NOTÍCIA EXPLOSIVA", subtitulo = "O acontecimento que todo mundo está comentando", data = "14 de Agosto de 2026") {
  const w = 600, h = 800;
  const c = createCanvas(w, h), ctx = c.getContext("2d");

  // Fundo papel
  ctx.fillStyle = "#f5f0e1";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "#b8a88c";
  ctx.lineWidth = 3;
  ctx.strokeRect(15, 15, w - 30, h - 30);

  // Cabeçalho
  ctx.fillStyle = "#8b0000";
  ctx.font = "bold 48px serif";
  ctx.textAlign = "center";
  ctx.fillText("TOSH NEWS", w / 2, 60);
  ctx.fillStyle = "#333";
  ctx.font = "15px serif";
  ctx.fillText(`${data} · Ano 1 · Nº 001`, w / 2, 88);
  ctx.fillStyle = "#000";
  ctx.fillRect(40, 100, w - 80, 3);

  // Título
  ctx.fillStyle = "#000";
  ctx.font = "bold 38px serif";
  ctx.fillText(titulo.toUpperCase(), w / 2, 150);
  ctx.font = "italic 18px serif";
  ctx.fillText(subtitulo, w / 2, 180);

  // Foto
  const fotoX = 40, fotoY = 200, fotoW = w - 80, fotoH = 320;
  ctx.fillStyle = "#222";
  ctx.fillRect(fotoX - 3, fotoY - 3, fotoW + 6, fotoH + 6);
  const avatar = await loadImageBuffer(avatarUrl);
  ctx.drawImage(avatar, fotoX, fotoY, fotoW, fotoH);

  // Texto
  ctx.fillStyle = "#222";
  ctx.font = "16px serif";
  const texto = `Esta notícia chamou a atenção de todos e virou assunto em todo lugar. O fato se espalhou rapidamente e já é destaque nos quatro cantos. Tudo indica que este é apenas o começo de uma grande história que promete marcar época. A repercussão é enorme e as consequências serão sentidas por muito tempo.`;
  ctx.fillText(texto, 45, fotoY + fotoH + 35, w - 90);

  return c.toBuffer();
}

module.exports = { canvaWhatsApp, canvaFacebook, canvaJornal };
