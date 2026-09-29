/*
⊰᯽⊱┈──╌❊ TOSH TECH — EFEITOS AJUSTADOS ❊╌──┈⊰᯽⊱
➪ Criador『Tosh』
➪ Versão: 3.5 ✅ Anime = Desenho | Pixel + Suave ✅
➪ 🏳️‍🌈 Orgulho | 🎮 Pixel | 🎨 Anime
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

// ⭐ 🏳️‍🌈 ORGULHO — Cores sobre a imagem
async function canvaOrgulho(avatarUrl) {
  const img = await loadImageBuffer(avatarUrl);
  const w = img.width, h = img.height;
  const c = createCanvas(w, h), ctx = c.getContext("2d");
  ctx.drawImage(img, 0, 0);
  const cores = ["#FF0018","#FF8C00","#FFD800","#008018","#0044FF","#730088"];
  const fh = h / cores.length;
  cores.forEach((cor, i) => { ctx.fillStyle = cor; ctx.globalAlpha = 0.30; ctx.fillRect(0, i * fh, w, fh); });
  ctx.globalAlpha = 1;
  return c.toBuffer();
}

// ⭐ 🎮 PIXEL — Mais suave (blocos menores)
async function canvaPixel(avatarUrl) {
  const img = await loadImageBuffer(avatarUrl);
  const w = img.width, h = img.height;
  const c = createCanvas(w, h), ctx = c.getContext("2d");
  const tamanhoPixel = Math.max(4, Math.floor(Math.min(w, h) / 160)); // ✅ Menor = mais suave
  const wPxl = Math.ceil(w / tamanhoPixel);
  const hPxl = Math.ceil(h / tamanhoPixel);
  const temp = createCanvas(wPxl, hPxl);
  const tctx = temp.getContext("2d");
  tctx.imageSmoothingEnabled = false;
  tctx.drawImage(img, 0, 0, wPxl, hPxl);
  const dados = tctx.getImageData(0, 0, wPxl, hPxl).data;
  ctx.imageSmoothingEnabled = false;
  for (let y = 0; y < hPxl; y++) {
    for (let x = 0; x < wPxl; x++) {
      const i = (y * wPxl + x) * 4;
      ctx.fillStyle = `rgb(${dados[i]},${dados[i+1]},${dados[i+2]})`;
      ctx.fillRect(x * tamanhoPixel, y * tamanhoPixel, tamanhoPixel, tamanhoPixel);
    }
  }
  return c.toBuffer();
}

// ⭐ 🎨 ANIME — Aparência de DESENHO!
async function canvaAnime(avatarUrl) {
  const img = await loadImageBuffer(avatarUrl);
  const w = img.width, h = img.height;
  const c = createCanvas(w, h), ctx = c.getContext("2d");
  ctx.drawImage(img, 0, 0);

  // ✅ Aumenta cores e contraste — estilo anime
  const temp = createCanvas(w, h);
  const tctx = temp.getContext("2d");
  tctx.filter = "saturate(1.8) contrast(1.4) brightness(1.1)";
  tctx.drawImage(img, 0, 0);

  // ✅ Suaviza tons e realça bordas — parece desenho
  const dados = tctx.getImageData(0, 0, w, h);
  const saida = ctx.createImageData(w, h);
  for (let i = 0; i < dados.data.length; i += 4) {
    let r = dados.data[i], g = dados.data[i+1], b = dados.data[i+2];
    // Reduz tons intermediários = cores mais "chapadas" de desenho
    r = r > 127 ? Math.min(255, r * 1.1) : Math.max(0, r * 0.9);
    g = g > 127 ? Math.min(255, g * 1.1) : Math.max(0, g * 0.9);
    b = b > 127 ? Math.min(255, b * 1.1) : Math.max(0, b * 0.9);
    saida.data[i] = r; saida.data[i+1] = g; saida.data[i+2] = b; saida.data[i+3] = 255;
  }
  ctx.putImageData(saida, 0, 0);
  return c.toBuffer();
}

module.exports = { canvaOrgulho, canvaPixel, canvaAnime };
