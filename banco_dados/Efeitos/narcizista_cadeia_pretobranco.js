/*
⊰᯽⊱┈──╌❊ TOSH TECH — EFEITOS SEPARADOS ❊╌──┈⊰᯽⊱
➪ Criador『Tosh』
➪ Versão: 1.3 ✅ CADA EFEITO SEPARADO ✅
➪ ⛓️ Grade Cadeia | 💎 Narcisista com SÍMBOLO | ⬛ Preto e Branco
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

// ═══════ ⛓️ GRADE DE CADEIA — Só barras grossas ═══════
async function canvaGrade(avatarUrl) {
  const img = await loadImageBuffer(avatarUrl);
  const w = img.width, h = img.height;
  const c = createCanvas(w, h), ctx = c.getContext("2d");
  ctx.drawImage(img, 0, 0);
  const espaco = 35, largura = 10;
  ctx.fillStyle = "rgba(15,15,15,0.85)";
  for (let x = 0; x < w; x += espaco + largura) ctx.fillRect(x, 0, largura, h);
  ctx.fillRect(0, h/2 - 5, w, 10);
  return c.toBuffer();
}

// ═══════ 💎 NARCISISTA — Faixas + SÍMBOLO no centro ═══════
async function canvaNarcisista(avatarUrl) {
  const img = await loadImageBuffer(avatarUrl);
  const w = img.width, h = img.height;
  const c = createCanvas(w, h), ctx = c.getContext("2d");
  ctx.drawImage(img, 0, 0);

  // Faixa vermelha em cima
  ctx.fillStyle = "rgba(220,0,0,0.55)";
  ctx.fillRect(0, 0, w, h/2);
  // Faixa preta embaixo
  ctx.fillStyle = "rgba(0,0,0,0.55)";
  ctx.fillRect(0, h/2, w, h/2);

  // ⭐ SÍMBOLO AMARELO no centro (Estrela + Engrenagem + Foice)
  const cx = w/2, cy = h/2, tam = Math.min(w,h)*0.35;
  ctx.fillStyle = "rgba(255,220,0,0.9)";

  // Estrela
  ctx.beginPath();
  for(let i=0;i<10;i++){
    const r=i%2===0?tam*0.28:tam*0.12;
    const ang=(i*Math.PI/5)-Math.PI/2;
    const px=cx+Math.cos(ang)*r,py=cy-tam*0.15+Math.sin(ang)*r;
    i===0?ctx.moveTo(px,py):ctx.lineTo(px,py);
  }
  ctx.closePath();ctx.fill();

  // Engrenagem curva
  ctx.lineWidth=tam*0.1;ctx.lineCap="round";
  ctx.beginPath();
  ctx.arc(cx,cy-tam*0.05,tam*0.45,-Math.PI*0.75,Math.PI*0.25);
  ctx.strokeStyle="rgba(255,220,0,0.9)";ctx.stroke();

  // Foice / faca
  ctx.beginPath();
  ctx.moveTo(cx-tam*0.35,cy+tam*0.3);
  ctx.quadraticCurveTo(cx,cy-tam*0.15,cx+tam*0.35,cy+tam*0.35);
  ctx.strokeStyle="rgba(255,220,0,0.9)";
  ctx.lineWidth=tam*0.08;ctx.stroke();

  return c.toBuffer();
}

// ═══════ ⬛ PRETO E BRANCO — Só tons de cinza ═══════
async function canvaPretoBranco(avatarUrl) {
  const img = await loadImageBuffer(avatarUrl);
  const w = img.width, h = img.height;
  const c = createCanvas(w, h), ctx = c.getContext("2d");
  ctx.drawImage(img,0,0);
  const dados=ctx.getImageData(0,0,w,h);
  for(let i=0;i<dados.data.length;i+=4){
    const cinza=Math.round(dados.data[i]*0.299+dados.data[i+1]*0.587+dados.data[i+2]*0.114);
    dados.data[i]=dados.data[i+1]=dados.data[i+2]=cinza;
  }
  ctx.putImageData(dados,0,0);
  return c.toBuffer();
}

module.exports={canvaGrade,canvaNarcisista,canvaPretoBranco};
