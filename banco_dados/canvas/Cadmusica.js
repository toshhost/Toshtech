/*
⊰᯽⊱┈──╌❊ TOSH TECH — 3 CARDS MUSIC ❊╌──┈⊰᯽⊱
༺『Módulo: Music Cards — TRÊS ESTILOS ÚNICOS』༻
➪ Criador『Tosh』
➪ Versão: 4.0 ✅ SEM DUPLICATAS • ZERO ERROS • REUTILIZA FUNÇÕES ✅
➪ 🎵 Card 1 — Neon Cyber (Futurista)
➪ 🎧 Card 2 — Glassmorphism Premium (Elegante Vidro)
➪ 🎤 Card 3 — Minimalista Pro (Cinematográfico)
⊰᯽⊱┈──────────────────────────────────────┈⊰᯽⊱
*/

const axios = require('axios');
const { createCanvas, loadImage } = require('canvas');

// ➪ DECODE INTELIGENTE — LIMPA %20, %C3%8 etc. SEM ERROS ✅
function limparTextoUrl(texto) {
  if (!texto) return "";
  let resultado = texto;
  try {
    for (let i = 0; i < 3; i++) {
      if (!/%[0-9A-F]{2}/i.test(resultado)) break;
      const decodificado = decodeURIComponent(resultado);
      if (decodificado === resultado) break;
      resultado = decodificado;
    }
  } catch {
    resultado = resultado
      .replace(/%20/g, ' ')
      .replace(/%2F/g, '/')
      .replace(/%3A/g, ':')
      .replace(/%C3%A1/g, 'á')
      .replace(/%C3%A9/g, 'é')
      .replace(/%C3%AD/g, 'í')
      .replace(/%C3%B3/g, 'ó')
      .replace(/%C3%BA/g, 'ú')
      .replace(/%C3%A7/g, 'ç')
      .replace(/%C3%A3/g, 'ã')
      .replace(/%C3%B5/g, 'õ');
  }
  return resultado.trim();
}

// ➪ COR ANIMADA — CICLO DE CORES ✨
function corAnimada(progresso, saturacao = 100, luminosidade = 55) {
  const h = (progresso * 360) % 360;
  return `hsl(${h}, ${saturacao}%, ${luminosidade}%)`;
}

// ➪ BAIXA IMAGEM DA URL — REUTILIZADA ✅
async function loadImageBuffer2(url) {
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

// ➪ TEXTO COM CONTORNO — REUTILIZADA ✅
function desenharTextoComContorno(ctx, texto, x, y, tamanhoFonte, corTexto, corContorno, espessura = 6) {
  ctx.font = `bold ${tamanhoFonte}px Sans, Arial, Helvetica`;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.strokeStyle = corContorno;
  ctx.lineWidth = espessura;
  ctx.lineJoin = "round";
  ctx.miterLimit = 2;
  ctx.strokeText(texto, x, y);
  ctx.fillStyle = corTexto;
  ctx.fillText(texto, x, y);
}

// ➪ CORTAR TEXTO SE ULTRAPASSAR LARGURA MÁXIMA ✅
function cortarTexto(ctx, texto, larguraMax) {
  if (!texto) return "";
  let medida = ctx.measureText(texto);
  while (medida.width > larguraMax && texto.length > 0) {
    texto = texto.slice(0, -1) + "...";
    medida = ctx.measureText(texto);
  }
  return texto;
}

// ➪ FORMATAR TEMPO EM MM:SS ✅
function formatarTempo(seg) {
  const m = Math.floor(seg / 60);
  const s = seg % 60;
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

/* ════════════════════════════════════════════════════
   🎵 CARD 1 — NEON CYBER • FUTURISTA
   Layout: Avatar esquerdo, info direito • Borda neon
   ════════════════════════════════════════════════════ */
async function canvaMusicCard(avatarUrl, artistName, time, name, faseCor = 0) {
  const width = 980;
  const height = 340;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  name = limparTextoUrl(name) || "Música Desconhecida";
  artistName = limparTextoUrl(artistName) || "Artista Desconhecido";

  const corPrimaria = corAnimada(faseCor);
  const corSecundaria = corAnimada((faseCor + 0.15) % 1);
  const corTerciaria = corAnimada((faseCor + 0.3) % 1);
  const brilhoCor = corAnimada(faseCor, 100, 60);

  // Fundo
  const gradienteFundo = ctx.createLinearGradient(0, 0, width, height);
  gradienteFundo.addColorStop(0, "#000000");
  gradienteFundo.addColorStop(1, "#0f2027");
  ctx.fillStyle = gradienteFundo;
  ctx.fillRect(0, 0, width, height);

  // Borda iluminada
  const bordaGrad = ctx.createLinearGradient(0, 0, width, height);
  bordaGrad.addColorStop(0, corPrimaria);
  bordaGrad.addColorStop(0.33, corSecundaria);
  bordaGrad.addColorStop(0.66, corTerciaria);
  bordaGrad.addColorStop(1, corPrimaria);
  ctx.strokeStyle = bordaGrad;
  ctx.lineWidth = 4;
  ctx.shadowColor = brilhoCor;
  ctx.shadowBlur = 20;
  ctx.strokeRect(2, 2, width - 4, height - 4);
  ctx.shadowBlur = 0;

  // Linhas decorativas
  ctx.strokeStyle = `${corPrimaria}10`;
  ctx.lineWidth = 1;
  for (let i = 0; i < width; i += 25) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, height);
    ctx.stroke();
  }

  // Avatar
  const avatar = await loadImageBuffer2(avatarUrl);
  const avatarSize = 230;
  const avatarX = 35;
  const avatarY = height / 2 - avatarSize / 2;

  ctx.shadowColor = brilhoCor;
  ctx.shadowBlur = 25;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(avatarX + 12, avatarY);
  ctx.lineTo(avatarX + avatarSize - 12, avatarY);
  ctx.quadraticCurveTo(avatarX + avatarSize, avatarY, avatarX + avatarSize, avatarY + 12);
  ctx.lineTo(avatarX + avatarSize, avatarY + avatarSize - 12);
  ctx.quadraticCurveTo(avatarX + avatarSize, avatarY + avatarSize, avatarX + avatarSize - 12, avatarY + avatarSize);
  ctx.lineTo(avatarX + 12, avatarY + avatarSize);
  ctx.quadraticCurveTo(avatarX, avatarY + avatarSize, avatarX, avatarY + avatarSize - 12);
  ctx.lineTo(avatarX, avatarY + 12);
  ctx.quadraticCurveTo(avatarX, avatarY, avatarX + 12, avatarY);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(avatar, avatarX, avatarY, avatarSize, avatarSize);
  ctx.restore();
  ctx.shadowBlur = 0;

  ctx.beginPath();
  ctx.moveTo(avatarX + 12, avatarY);
  ctx.lineTo(avatarX + avatarSize - 12, avatarY);
  ctx.quadraticCurveTo(avatarX + avatarSize, avatarY, avatarX + avatarSize, avatarY + 12);
  ctx.lineTo(avatarX + avatarSize, avatarY + avatarSize - 12);
  ctx.quadraticCurveTo(avatarX + avatarSize, avatarY + avatarSize, avatarX + avatarSize - 12, avatarY + avatarSize);
  ctx.lineTo(avatarX + 12, avatarY + avatarSize);
  ctx.quadraticCurveTo(avatarX, avatarY + avatarSize, avatarX, avatarY + avatarSize - 12);
  ctx.lineTo(avatarX, avatarY + 12);
  ctx.quadraticCurveTo(avatarX, avatarY, avatarX + 12, avatarY);
  ctx.closePath();
  ctx.strokeStyle = corPrimaria;
  ctx.lineWidth = 3;
  ctx.shadowColor = brilhoCor;
  ctx.shadowBlur = 10;
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Textos
  const textoInicioX = 300;
  const larguraMaxTexto = 520;

  desenharTextoComContorno(ctx, cortarTexto(ctx, name, larguraMaxTexto), textoInicioX, 40, 42, "#ffffff", "#000000", 4);
  desenharTextoComContorno(ctx, cortarTexto(ctx, artistName, larguraMaxTexto), textoInicioX, 100, 30, corSecundaria, "#000000", 3);

  // Duração
  const totalSegundos = Math.max(parseInt(time) || 180, 1);
  const decorridoSegundos = Math.floor(Math.random() * totalSegundos);
  const tempoTexto = `${formatarTempo(decorridoSegundos)} / ${formatarTempo(totalSegundos)}`;
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 28px Sans, Arial, Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.shadowColor = corPrimaria;
  ctx.shadowBlur = 10;
  ctx.fillText(tempoTexto, textoInicioX, 155);
  ctx.shadowBlur = 0;

  // Barra de progresso
  const barraX = textoInicioX;
  const barraY = 200;
  const barraLarguraLocal = 480;
  const barraAltura = 12;
  const progresso = Math.max(0, Math.min(1, decorridoSegundos / totalSegundos));
  const progressoLargura = barraLarguraLocal * progresso;

  ctx.fillStyle = "#1a1a1a";
  ctx.fillRect(barraX, barraY, barraLarguraLocal, barraAltura);
  const gradienteBarra = ctx.createLinearGradient(barraX, 0, barraX + barraLarguraLocal, 0);
  gradienteBarra.addColorStop(0, corPrimaria);
  gradienteBarra.addColorStop(1, corSecundaria);
  ctx.shadowColor = brilhoCor;
  ctx.shadowBlur = 12;
  ctx.fillStyle = gradienteBarra;
  ctx.fillRect(barraX, barraY, progressoLargura, barraAltura);
  ctx.shadowBlur = 0;

  ctx.beginPath();
  ctx.arc(barraX + progressoLargura, barraY + barraAltura / 2, 8, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.shadowColor = brilhoCor;
  ctx.shadowBlur = 15;
  ctx.fill();
  ctx.shadowBlur = 0;

  // Equalizador
  const eqX = textoInicioX;
  const eqY = 260;
  const eqBarras = 20;
  for (let i = 0; i < eqBarras; i++) {
    const altura = Math.max(12, Math.floor(Math.random() * 35) + 12);
    ctx.fillStyle = i % 2 === 0 ? corPrimaria : corSecundaria;
    ctx.shadowColor = brilhoCor;
    ctx.shadowBlur = 5;
    ctx.fillRect(eqX + i * 16, eqY - altura, 8, altura);
  }
  ctx.shadowBlur = 0;

  // Botão Play
  const botaoBaseX = 830;
  const botaoBaseY = 260;
  ctx.beginPath();
  ctx.arc(botaoBaseX, botaoBaseY, 32, 0, Math.PI * 2);
  ctx.fillStyle = `${corPrimaria}30`;
  ctx.fill();
  ctx.strokeStyle = corPrimaria;
  ctx.lineWidth = 3;
  ctx.shadowColor = brilhoCor;
  ctx.shadowBlur = 15;
  ctx.stroke();
  ctx.shadowBlur = 0;

  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.moveTo(botaoBaseX - 10, botaoBaseY - 16);
  ctx.lineTo(botaoBaseX + 16, botaoBaseY);
  ctx.lineTo(botaoBaseX - 10, botaoBaseY + 16);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = corSecundaria;
  ctx.fillRect(botaoBaseX + 55, botaoBaseY - 15, 6, 30);
  ctx.fillRect(botaoBaseX + 70, botaoBaseY - 15, 6, 30);

  ctx.fillStyle = "#ff004c";
  ctx.beginPath();
  ctx.arc(botaoBaseX + 110, botaoBaseY, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(botaoBaseX + 103, botaoBaseY - 8, 4, 16);
  ctx.fillRect(botaoBaseX + 110, botaoBaseY - 10, 4, 20);
  ctx.fillRect(botaoBaseX + 117, botaoBaseY - 12, 4, 24);

  // Rodapé
  ctx.globalAlpha = 0.4;
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 14px Sans, Arial, Helvetica";
  ctx.textAlign = "right";
  ctx.fillText("Tosh Tech • Music Card", width - 25, height - 22);
  ctx.globalAlpha = 1;

  return canvas.toBuffer("image/png");
}

/* ════════════════════════════════════════════════════
   🎧 CARD 2 — GLASSMORPHISM PREMIUM • VIDRO ELEGANTE
   Layout: Topo circular com onda, centralizado • Dourado
   ════════════════════════════════════════════════════ */
async function canvaMusicCard2(avatarUrl, artistName, time, name, faseCor = 0.08) {
  const width = 800;
  const height = 400;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  name = limparTextoUrl(name) || "Música Desconhecida";
  artistName = limparTextoUrl(artistName) || "Artista Desconhecido";

  // Paleta: DOURADO, BRANCO, VIDRO
  const dourado = "#D4AF37";
  const douradoClaro = "#F4E4BC";
  const fundoVidro = "rgba(10, 8, 5, 0.85)";

  // Fundo escuro com brilho dourado
  const gradienteFundo = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width/2);
  gradienteFundo.addColorStop(0, "#1a1508");
  gradienteFundo.addColorStop(1, "#050402");
  ctx.fillStyle = gradienteFundo;
  ctx.fillRect(0, 0, width, height);

  // Borda dourada brilhante
  ctx.strokeStyle = dourado;
  ctx.lineWidth = 3;
  ctx.shadowColor = dourado;
  ctx.shadowBlur = 25;
  ctx.strokeRect(6, 6, width - 12, height - 12);
  ctx.shadowBlur = 0;

  // Painel vidro central
  ctx.fillStyle = fundoVidro;
  ctx.fillRect(20, 20, width - 40, height - 40);
  ctx.strokeStyle = "rgba(212,175,55,0.3)";
  ctx.lineWidth = 1;
  ctx.strokeRect(20, 20, width - 40, height - 40);

  // Onda visual no topo
  ctx.strokeStyle = dourado;
  ctx.lineWidth = 2;
  ctx.shadowColor = dourado;
  ctx.shadowBlur = 10;
  ctx.beginPath();
  ctx.moveTo(60, 120);
  for (let x = 60; x < width - 60; x += 15) {
    const y = 120 + Math.sin((x + faseCor * 100) * 0.05) * 15;
    ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Avatar circular grande — TOPO
  const avatar = await loadImageBuffer2(avatarUrl);
  const avatarSize = 160;
  const avatarX = width / 2 - avatarSize / 2;
  const avatarY = 40;

  ctx.shadowColor = dourado;
  ctx.shadowBlur = 30;
  ctx.save();
  ctx.beginPath();
  ctx.arc(width / 2, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2);
  ctx.clip();
  ctx.drawImage(avatar, avatarX, avatarY, avatarSize, avatarSize);
  ctx.restore();
  ctx.shadowBlur = 0;

  // Borda dourada no avatar
  ctx.beginPath();
  ctx.arc(width / 2, avatarY + avatarSize / 2, avatarSize / 2 + 4, 0, Math.PI * 2);
  ctx.strokeStyle = dourado;
  ctx.lineWidth = 3;
  ctx.shadowColor = dourado;
  ctx.shadowBlur = 15;
  ctx.stroke();
  ctx.shadowBlur = 0;

  // 🎵 Nome da Música — CENTRALIZADO, GRANDE, BRANCO
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 38px Sans, Arial, Helvetica";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.shadowColor = dourado;
  ctx.shadowBlur = 8;
  const nomeMusica = cortarTexto(ctx, name, width - 100);
  ctx.fillText(nomeMusica, width / 2, 220);
  ctx.shadowBlur = 0;

  // 🎤 Artista — DOURADO
  ctx.fillStyle = douradoClaro;
  ctx.font = "26px Sans, Arial, Helvetica";
  ctx.textAlign = "center";
  const nomeArtista = cortarTexto(ctx, artistName, width - 150);
  ctx.fillText(nomeArtista, width / 2, 270);

  // ⏱️ Duração — GRANDE E NÍTIDA
  const totalSegundos = Math.max(parseInt(time) || 180, 1);
  const decorridoSegundos = Math.floor(Math.random() * totalSegundos);
  const tempoTexto = `${formatarTempo(decorridoSegundos)} / ${formatarTempo(totalSegundos)}`;
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 32px Sans, Arial, Helvetica";
  ctx.textAlign = "center";
  ctx.shadowColor = dourado;
  ctx.shadowBlur = 10;
  ctx.fillText(tempoTexto, width / 2, 315);
  ctx.shadowBlur = 0;

  // Barra de progresso DOURADA
  const barraLarguraLocal = 400;
  const barraAltura = 8;
  const barraX = width / 2 - barraLarguraLocal / 2;
  const barraY = 360;
  const progresso = Math.max(0, Math.min(1, decorridoSegundos / totalSegundos));
  const progressoLargura = barraLarguraLocal * progresso;

  ctx.fillStyle = "rgba(212,175,55,0.2)";
  ctx.fillRect(barraX, barraY, barraLarguraLocal, barraAltura);
  ctx.fillStyle = dourado;
  ctx.shadowColor = dourado;
  ctx.shadowBlur = 10;
  ctx.fillRect(barraX, barraY, progressoLargura, barraAltura);
  ctx.shadowBlur = 0;

  // Botão Play GRANDE — CENTRO INFERIOR
  const botaoPlayX = width / 2 + 280;
  const botaoPlayY = 355;
  ctx.beginPath();
  ctx.arc(botaoPlayX, botaoPlayY, 35, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(212,175,55,0.2)";
  ctx.fill();
  ctx.strokeStyle = dourado;
  ctx.lineWidth = 3;
  ctx.shadowColor = dourado;
  ctx.shadowBlur = 15;
  ctx.stroke();
  ctx.shadowBlur = 0;

  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.moveTo(botaoPlayX - 12, botaoPlayY - 18);
  ctx.lineTo(botaoPlayX + 18, botaoPlayY);
  ctx.lineTo(botaoPlayX - 12, botaoPlayY + 18);
  ctx.closePath();
  ctx.fill();

  // Rodapé
  ctx.globalAlpha = 0.5;
  ctx.fillStyle = dourado;
  ctx.font = "bold 13px Sans, Arial, Helvetica";
  ctx.textAlign = "center";
  ctx.fillText("Tosh Tech • Premium Glass", width / 2, height - 15);
  ctx.globalAlpha = 1;

  return canvas.toBuffer("image/png");
}

/* ════════════════════════════════════════════════════
   🎤 CARD 3 — MINIMALISTA PRO • CINEMATOGRÁFICO
   Layout: Barra lateral esquerda, info direita • Vinheta
   ════════════════════════════════════════════════════ */
async function canvaMusicCard3(avatarUrl, artistName, time, name, faseCor = 0) {
  const width = 900;
  const height = 380;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  name = limparTextoUrl(name) || "Música Desconhecida";
  artistName = limparTextoUrl(artistName) || "Artista Desconhecido";

  // Paleta: VERMELHO CINEMA, BRANCO, CINZA
  const vermelho = "#E50914";
  const cinza = "#222222";

  // Fundo com vinheta escura
  const gradienteFundo = ctx.createRadialGradient(width/2, height/2, width/3, width/2, height/2, width);
  gradienteFundo.addColorStop(0, "#1a1a1a");
  gradienteFundo.addColorStop(1, "#000000");
  ctx.fillStyle = gradienteFundo;
  ctx.fillRect(0, 0, width, height);

  // Vinheta cinematográfica (bordas escuras)
  const vinheta = ctx.createRadialGradient(width/2, height/2, height/4, width/2, height/2, Math.max(width, height));
  vinheta.addColorStop(0, "rgba(0,0,0,0)");
  vinheta.addColorStop(1, "rgba(0,0,0,0.8)");
  ctx.fillStyle = vinheta;
  ctx.fillRect(0, 0, width, height);

  // Borda vermelha fina
  ctx.strokeStyle = vermelho;
  ctx.lineWidth = 2;
  ctx.shadowColor = vermelho;
  ctx.shadowBlur = 8;
  ctx.strokeRect(4, 4, width - 8, height - 8);
  ctx.shadowBlur = 0;

  // ⬅️ BARRA LATERAL ESQUERDA — SÓ VERMELHO E PRETO
  const barraLargura = 200;
  ctx.fillStyle = cinza;
  ctx.fillRect(0, 0, barraLargura, height);
  ctx.fillStyle = vermelho;
  ctx.fillRect(0, 0, 5, height);

  // Avatar — DENTRO DA BARRA LATERAL
  const avatar = await loadImageBuffer2(avatarUrl);
  const avatarSize = 160;
  const avatarX = barraLargura / 2 - avatarSize / 2;
  const avatarY = 40;

  ctx.shadowColor = vermelho;
  ctx.shadowBlur = 15;
  ctx.save();
  ctx.beginPath();
  ctx.arc(barraLargura / 2, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2);
  ctx.clip();
  ctx.drawImage(avatar, avatarX, avatarY, avatarSize, avatarSize);
  ctx.restore();
  ctx.shadowBlur = 0;

  ctx.beginPath();
  ctx.arc(barraLargura / 2, avatarY + avatarSize / 2, avatarSize / 2 + 3, 0, Math.PI * 2);
  ctx.strokeStyle = vermelho;
  ctx.lineWidth = 3;
  ctx.stroke();

  // Medidor circular de áudio — embaixo do avatar
  const medidorX = barraLargura / 2;
  const medidorY = 280;
  ctx.lineWidth = 6;
  ctx.lineCap = "round";
  const progressoMedidor = Math.random() * 0.7 + 0.3;
  ctx.beginPath();
  ctx.arc(medidorX, medidorY, 35, 0, Math.PI * 2);
  ctx.strokeStyle = "#333";
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(medidorX, medidorY, 35, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * progressoMedidor);
  ctx.strokeStyle = vermelho;
  ctx.shadowColor = vermelho;
  ctx.shadowBlur = 10;
  ctx.stroke();
  ctx.shadowBlur = 0;

  // ➡️ ÁREA DE CONTEÚDO — LADO DIREITO
  const conteudoX = barraLargura + 40;
  const larguraConteudo = width - barraLargura - 60;

  // 🎵 Nome da Música — GRANDE, BRANCO, ESQUERDO
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 44px Sans, Arial, Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  const nomeMusica = cortarTexto(ctx, name, larguraConteudo);
  ctx.fillText(nomeMusica, conteudoX, 50);

  // 🎤 Artista — VERMELHO, DESTAQUE
  ctx.fillStyle = vermelho;
  ctx.font = "bold 28px Sans, Arial, Helvetica";
  ctx.shadowColor = vermelho;
  ctx.shadowBlur = 5;
  const nomeArtista = cortarTexto(ctx, artistName, larguraConteudo);
  ctx.fillText(nomeArtista, conteudoX, 115);
  ctx.shadowBlur = 0;

  // ⏱️ Duração — GIGANTE E NÍTIDA
  const totalSegundos = Math.max(parseInt(time) || 180, 1);
  const decorridoSegundos = Math.floor(Math.random() * totalSegundos);
  const tempoTexto = `${formatarTempo(decorridoSegundos)} / ${formatarTempo(totalSegundos)}`;
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 48px Sans, Arial, Helvetica";
  ctx.shadowColor = "rgba(255,255,255,0.3)";
  ctx.shadowBlur = 8;
  ctx.fillText(tempoTexto, conteudoX, 170);
  ctx.shadowBlur = 0;

  // Barra de progresso — estilo cinema
  const barraX = conteudoX;
  const barraY = 250;
  const barraLarguraLocal = larguraConteudo;
  const barraAltura = 6;
  const progresso = Math.max(0, Math.min(1, decorridoSegundos / totalSegundos));
  const progressoLargura = barraLarguraLocal * progresso;

  ctx.fillStyle = "#333";
  ctx.fillRect(barraX, barraY, barraLarguraLocal, barraAltura);
  ctx.fillStyle = vermelho;
  ctx.shadowColor = vermelho;
  ctx.shadowBlur = 8;
  ctx.fillRect(barraX, barraY, progressoLargura, barraAltura);
  ctx.shadowBlur = 0;

  // Medidor de áudio — barras horizontais
  const medidorX2 = conteudoX;
  const medidorY2 = 290;
  const qtdBarras = 30;
  for (let i = 0; i < qtdBarras; i++) {
    const altura = Math.max(4, Math.floor(Math.random() * 25) + 4);
    ctx.fillStyle = i / qtdBarras < progresso ? vermelho : "#333";
    ctx.fillRect(medidorX2 + i * 12, medidorY2 - altura, 8, altura);
  }

  // Botões de controle — alinhados à direita
  const botaoBaseX = width - 80;
  const botaoBaseY = 320;

  // ▶️ Botão Play — VERMELHO
  ctx.beginPath();
  ctx.arc(botaoBaseX, botaoBaseY, 30, 0, Math.PI * 2);
  ctx.fillStyle = vermelho;
  ctx.shadowColor = vermelho;
  ctx.shadowBlur = 20;
  ctx.fill();
  ctx.shadowBlur = 0;

  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.moveTo(botaoBaseX - 10, botaoBaseY - 15);
  ctx.lineTo(botaoBaseX + 15, botaoBaseY);
  ctx.lineTo(botaoBaseX - 10, botaoBaseY + 15);
  ctx.closePath();
  ctx.fill();

  // Rodapé
  ctx.globalAlpha = 0.4;
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 13px Sans, Arial, Helvetica";
  ctx.textAlign = "right";
  ctx.fillText("Tosh Tech • Cinema Pro", width - 20, height - 12);
  ctx.globalAlpha = 1;

  return canvas.toBuffer("image/png");
}

module.exports = {
  canvaMusicCard,      // 🎵 Neon Cyber
  canvaMusicCard2,     // 🎧 Glassmorphism Premium
  canvaMusicCard3,     // 🎤 Minimalista Pro
  limparTextoUrl,
  corAnimada,
  loadImageBuffer2,
  desenharTextoComContorno,
  cortarTexto,
  formatarTempo
};
