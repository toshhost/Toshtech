/*
⊰᯽⊱┈──╌❊ TOSH TECH — PROCURADO + TV REALISTAS ❊╌──┈⊰᯽⊱
➪ Criador『Tosh』
➪ Versão: 2.0 ✅ MÁXIMO REALISMO • TUDO ALINHADO ✅
➪ 📜 Cartaz Procurado Envelhecido | 📺 TV Cenário Realista
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

// ═══════ 📜 CARTAZ PROCURADO — ENVELHECIDO E PRECISO ═══════
async function canvaProcurado(avatarUrl, nomeRecompensa = "MATADOR", valor = "999.999.999.999") {
  const w = 420, h = 620;
  const c = createCanvas(w, h), ctx = c.getContext("2d");

  // ✅ Papel envelhecido com textura e manchas
  const fundo = ctx.createLinearGradient(0,0,w,h);
  fundo.addColorStop(0,"#e6d4a8");
  fundo.addColorStop(0.3,"#e0c990");
  fundo.addColorStop(0.7,"#d4b870");
  fundo.addColorStop(1,"#c4a050");
  ctx.fillStyle = fundo;
  ctx.fillRect(0,0,w,h);
  // Manchas de envelhecimento
  ctx.fillStyle = "rgba(139,90,20,0.06)";
  for(let i=0;i<8;i++){
    const x=Math.random()*w,y=Math.random()*h,r=30+Math.random()*70;
    ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();
  }

  // ✅ Borda dupla com sombra
  ctx.shadowColor = "rgba(0,0,0,0.2)";
  ctx.shadowBlur = 4;
  ctx.shadowOffsetY = 2;
  ctx.strokeStyle = "#6b3810";
  ctx.lineWidth = 5;
  ctx.strokeRect(10,10,w-20,h-20);
  ctx.shadowBlur = 0;
  ctx.strokeStyle = "#9a5a20";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(18,18,w-36,h-36);

  // ✅ Título WANTED — posicionado com precisão
  ctx.fillStyle = "#1a0f05";
  ctx.font = "bold 56px 'Georgia', 'Times New Roman', serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText("WANTED", w/2, 22);
  ctx.fillRect(70,78,w-140,3);

  // ✅ Área da foto — proporção e moldura perfeita
  const fotoX = 45, fotoY = 92, fotoW = w-90, fotoH = 300;
  ctx.fillStyle = "#111";
  ctx.fillRect(fotoX-3,fotoY-3,fotoW+6,fotoH+6);
  ctx.fillStyle = "#f5e6c8";
  ctx.fillRect(fotoX,fotoY,fotoW,fotoH);

  // ✅ Avatar encaixado perfeitamente
  const avatar = await loadImageBuffer(avatarUrl);
  ctx.save();
  ctx.beginPath();
  ctx.rect(fotoX,fotoY,fotoW,fotoH);
  ctx.clip();
  ctx.drawImage(avatar,fotoX,fotoY,fotoW,fotoH);
  ctx.restore();

  // ✅ Textos centralizados e alinhados
  ctx.fillStyle = "#2b1810";
  ctx.font = "italic 22px Georgia, serif";
  ctx.fillText("DEAD OR ALIVE", w/2, fotoY + fotoH + 18);

  ctx.font = "bold 44px Georgia, serif";
  ctx.fillText(nomeRecompensa.toUpperCase(), w/2, fotoY + fotoH + 52);

  ctx.font = "bold 28px Georgia, serif";
  ctx.fillText(`฿ ${valor}`, w/2, fotoY + fotoH + 95);

  ctx.font = "14px Georgia, serif";
  ctx.fillText("Autoridade Mundial • Vivo ou Morto", w/2, h - 35);

  return c.toBuffer();
}

// ═══════ 📺 TV — CENÁRIO REALISTA 16:9 ═══════
async function canvaNaTV(avatarUrl) {
  const w = 800, h = 550;
  const c = createCanvas(w, h), ctx = c.getContext("2d");

  // ✅ Parede texturizada com iluminação natural
  const parede = ctx.createLinearGradient(0,0,w,h);
  parede.addColorStop(0,"#e0d5c5");
  parede.addColorStop(0.4,"#d4c4b0");
  parede.addColorStop(1,"#b8a895");
  ctx.fillStyle = parede;
  ctx.fillRect(0,0,w,h);

  // ✅ Sombra suave do teto
  const teto = ctx.createLinearGradient(0,0,w,100);
  teto.addColorStop(0,"rgba(0,0,0,0.18)");
  teto.addColorStop(1,"rgba(0,0,0,0)");
  ctx.fillStyle = teto;
  ctx.fillRect(0,0,w,100);

  // ✅ Móvel com profundidade e sombra projetada
  const movX = 410, movY = 340, movW = 360, movH = 170;
  ctx.fillStyle = "rgba(0,0,0,0.1)";
  ctx.beginPath();
  ctx.moveTo(movX-5, movY+movH);
  ctx.lineTo(movX+movW+5, movY+movH);
  ctx.lineTo(movX+movW+15, h);
  ctx.lineTo(movX-15, h);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#4a3828";
  ctx.fillRect(movX, movY, movW, movH);
  ctx.fillStyle = "#654a35";
  ctx.fillRect(movX-8, movY-6, movW+16, 14);

  // ✅ TV proporção 16:9 perfeita com sombra real
  const tvX = 440, tvY = 90, tvW = 304, tvH = 171;
  ctx.shadowColor = "rgba(0,0,0,0.35)";
  ctx.shadowBlur = 28;
  ctx.shadowOffsetX = 8;
  ctx.shadowOffsetY = 12;
  ctx.fillStyle = "#121212";
  ctx.fillRect(tvX-6, tvY-5, tvW+12, tvH+10);
  ctx.shadowBlur = 0;
  ctx.fillStyle = "#000";
  ctx.fillRect(tvX, tvY, tvW, tvH);

  // ✅ Avatar encaixado com margem uniforme
  const avatar = await loadImageBuffer(avatarUrl);
  ctx.save();
  ctx.beginPath();
  ctx.rect(tvX+4, tvY+4, tvW-8, tvH-8);
  ctx.clip();
  ctx.drawImage(avatar, tvX+4, tvY+4, tvW-8, tvH-8);
  ctx.restore();

  // ✅ Reflexo de tela brilhante — realismo total
  const brilho = ctx.createLinearGradient(tvX, tvY, tvX, tvY+tvH);
  brilho.addColorStop(0, "rgba(255,255,255,0.06)");
  brilho.addColorStop(0.4, "rgba(255,255,255,0.02)");
  brilho.addColorStop(1, "rgba(0,0,0,0.03)");
  ctx.fillStyle = brilho;
  ctx.fillRect(tvX+4, tvY+4, tvW-8, tvH-8);

  return c.toBuffer();
}

module.exports = { canvaProcurado, canvaNaTV };
