/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Criador『Tosh』
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
const API = window.location.origin;

let playlist = [];
let indiceAtual = 0;
let elementoVideo = null;
let promptInstalacao = null;
let ultimoTituloUsado = ''; //➪ Para garantir que é sempre diferente ✅

//➪ Controle De Desfazer
let ultimoItemRemovido = null;
let temporizadorDesfazer = null;

//➪ Limpar Nome Do Arquivo
function limparNomeArquivo(texto){
  if(!texto) return 'video';
  return texto
    .replace(/[<>:"/\\|?*]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 80);
}

//➪ Mostrar Mensagem Flutuante
function mostrarMensagem(texto){
  const msg = document.getElementById('msgFlutuante');
  msg.textContent = texto;
  msg.classList.add('mostrar');
  setTimeout(() => msg.classList.remove('mostrar'), 3000);
}

//➪ Abrir Logo
function abrirLogo(){ window.open('/toshstream', '_blank'); }

//➪ Formatação De Visualizações
function formatarViews(num){
  if(!num && num !== 0) return '';
  if(typeof num === 'string') num = parseInt(num.replace(/\D/g,''),10);
  if(!num || isNaN(num)) return '';
  if(num >= 1000000000) return (num/1000000000).toFixed(1).replace(/\.0$/,'') + ' bi';
  if(num >= 1000000) return (num/1000000).toFixed(1).replace(/\.0$/,'') + ' mi';
  if(num >= 1000) return (num/1000).toFixed(1).replace(/\.0$/,'') + ' mil';
  return num.toString();
}

//➪ Formatação De Duração
function formatarDuracao(segundos){
  if(!segundos) return '';
  if(typeof segundos === 'string'){
    const partes = segundos.split(':');
    if(partes.length === 2 || partes.length === 3) return segundos;
    return '';
  }
  if(isNaN(segundos) || segundos <= 0) return '';
  const h = Math.floor(segundos / 3600);
  const m = Math.floor((segundos % 3600) / 60);
  const s = Math.floor(segundos % 60);
  if(h > 0) return `${h}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
  return `${m}:${s.toString().padStart(2,'0')}`;
}

//══════════════════════════════════════════════════════════
//➪ ✅ INSTALAR COMO APP — PWA CORRIGIDO E FUNCIONAL!
//══════════════════════════════════════════════════════════
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  promptInstalacao = e;
  console.log('📱 PWA disponível para instalação');
  const btn = document.getElementById('btnInstalar');
  if (btn) btn.style.display = 'flex';
});

//➪ Botão de instalar — só funciona após DOM carregado
document.addEventListener('DOMContentLoaded', () => {
  const btnInstalar = document.getElementById('btnInstalar');
  if (btnInstalar) {
    btnInstalar.addEventListener('click', async () => {
      if (!promptInstalacao) {
        mostrarMensagem("Já está instalado ou indisponível");
        return;
      }
      const { outcome } = await promptInstalacao.userChoice;
      if (outcome === 'accepted') {
        mostrarMensagem("✅ Instalado com sucesso!");
        btnInstalar.style.display = 'none';
      } else {
        mostrarMensagem("Instalação cancelada");
      }
      promptInstalacao = null;
    });
  }
});

//➪ Confirma quando o app foi instalado com sucesso
window.addEventListener('appinstalled', () => {
  mostrarMensagem("🎉 ToshStream instalado como App!");
  promptInstalacao = null;
  const btn = document.getElementById('btnInstalar');
  if (btn) btn.style.display = 'none';
});

// ➪ Todos Os Botões Na notificação de mídia
function registrarAcoesMidia() {
  if (!('mediaSession' in navigator)) return;

  navigator.mediaSession.setActionHandler('previoustrack', () => {
    videoAnterior();
  });

  navigator.mediaSession.setActionHandler('nexttrack', () => {
    proximoVideo();
  });

  navigator.mediaSession.setActionHandler('pause', () => {
    if (elementoVideo) elementoVideo.pause();
  });

  navigator.mediaSession.setActionHandler('play', () => {
    if (elementoVideo) elementoVideo.play();
  });

  navigator.mediaSession.setActionHandler('stop', () => {
    if (elementoVideo) {
      elementoVideo.pause();
      elementoVideo.currentTime = 0;
    }
  });

  navigator.mediaSession.setActionHandler('seekbackward', (details) => {
    if (elementoVideo) elementoVideo.currentTime -= (details.seekOffset || 10);
  });

  navigator.mediaSession.setActionHandler('seekforward', (details) => {
    if (elementoVideo) elementoVideo.currentTime += (details.seekOffset || 10);
  });
}

//➪ Buscar Vídeos
async function buscarVideo(){
  const termo = document.getElementById('campoBusca').value.trim();
  if(!termo) return mostrarMensagem("Digite a pesquisa");
  try {
    mostrarMensagem("Buscando, aguarde...");
    const res = await fetch(`${API}/api/pesquisa/youtube1?nome=${encodeURIComponent(termo)}`);
    
    // ✅ Verifica se é JSON antes de parsear
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      throw new Error('Servidor retornou erro — verifique a API');
    }
    
    const dados = await res.json();
    if(!dados.status || !dados.resultado || !Array.isArray(dados.resultado) || dados.resultado.length === 0){
      return mostrarMensagem("Não foi possível encontrar sua pesquisa");
    }
    playlist = dados.resultado;
    indiceAtual = 0;
    
    //➪ Garante que SEMPRE reproduz um vídeo diferente ✅
    let videoParaReproduzir = playlist[indiceAtual];
    const tentarMaximo = Math.min(playlist.length, 5);
    for(let i = 0; i < tentarMaximo; i++){
      if(playlist[i].title !== ultimoTituloUsado){
        videoParaReproduzir = playlist[i];
        indiceAtual = i;
        break;
      }
    }
    
    reproduzirVideo(videoParaReproduzir);
    mostrarMensagem(`${playlist.length} encontrado(s)`);
  } catch (erro) { 
    mostrarMensagem("Erro: " + erro.message); 
  }
}

//➪ Reproduzir Vídeo 
function reproduzirVideo(video){
  const titulo = video.title || video.titulo || 'Sem título';
  const capa = video.thumbnail || video.capa || '/toshstream';
  const urlMp4 = `${API}/api/download/playvd31?nome=${encodeURIComponent(video.url)}`;
  const urlMp3 = `${API}/api/download/playv21?url=${encodeURIComponent(video.url)}`;
  
  ultimoTituloUsado = titulo; //➪ Salva para não repetir ✅
  const nomeArquivo = limparNomeArquivo(titulo); //➪ Nome do arquivo limpo ✅
  
  renderizarPlayer(titulo, urlMp4, urlMp3, capa, nomeArquivo);
  salvarNoHistorico({
    ...video,
    title: titulo,
    thumbnail: capa,
    views: video.views || video.visualizacoes,
    duration: video.duration || video.duracao
  });
  renderizarHistorico();
  window.scrollTo({top:0, behavior:'smooth'});
}

//══════════════════════════════════════════════════════════
// ➪ Renderizar Player Com Download Com Nome Correto 
function renderizarPlayer(titulo, urlMp4, urlMp3, capa, nomeArquivo){
  const area = document.getElementById('areaPlayer');
  area.innerHTML = `
    <div class="player-card">
      <video id="videoPrincipal" controls autoplay playsinline preload="auto" crossorigin="anonymous">
        <source src="${urlMp4}" type="video/mp4">
      </video>
      <h2 class="titulo-principal">${escaparHtml(titulo)}</h2>
      <div class="area-botoes-principais">
        <a href="${urlMp4}" class="btn-tosh" download="${nomeArquivo}.mp4" target="_blank" title="Baixar MP4">
          <i class="fas fa-download"></i><span>Baixar MP4</span>
        </a>
        <a href="${urlMp3}" class="btn-tosh" download="${nomeArquivo}.mp3" target="_blank" title="Baixar MP3">
          <i class="fas fa-music"></i><span>Baixar MP3</span>
        </a>
        <button class="btn-tosh" onclick="videoAnterior()" title="Vídeo Anterior">
          <i class="fas fa-backward-step"></i><span>Anterior</span>
        </button>
        <button class="btn-tosh" onclick="repetirVideo()" title="Repetir">
          <i class="fas fa-rotate-right"></i><span>Repetir</span>
        </button>
        <button class="btn-tosh" onclick="proximoVideo()" title="Próximo Vídeo">
          <i class="fas fa-forward-step"></i><span>Próximo</span>
        </button>
      </div>
    </div>
  `;
  elementoVideo = document.getElementById('videoPrincipal');
  elementoVideo.onended = proximoVideo;

  //➪ Notificação De Mídia 
  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: titulo,
      artist: 'TOSHSTREAM',
      album: '',
      artwork: [
        { src: '/toshstream', sizes: '96x96', type: 'image/jpeg' },
        { src: '/toshstream', sizes: '128x128', type: 'image/jpeg' },
        { src: '/toshstream', sizes: '192x192', type: 'image/jpeg' },
        { src: '/toshstream', sizes: '256x256', type: 'image/jpeg' },
        { src: '/toshstream', sizes: '384x384', type: 'image/jpeg' },
        { src: '/toshstream', sizes: '512x512', type: 'image/jpeg' }
      ]
    });
  }

  registrarAcoesMidia();
}

function proximoVideo(){
  if(indiceAtual < playlist.length - 1){
    indiceAtual++;
    //➪ Pula o mesmo vídeo se for o último reproduzido 
    if(playlist[indiceAtual].title === ultimoTituloUsado && indiceAtual < playlist.length - 1){
      indiceAtual++;
    }
    reproduzirVideo(playlist[indiceAtual]);
  } else {
    mostrarMensagem("Fim da lista!");
  }
}

function videoAnterior(){
  if(indiceAtual > 0){
    indiceAtual--;
    //➪ Pula o mesmo vídeo se for o último reproduzido
    if(playlist[indiceAtual].title === ultimoTituloUsado && indiceAtual > 0){
      indiceAtual--;
    }
    reproduzirVideo(playlist[indiceAtual]);
  } else {
    mostrarMensagem("Começo da lista");
  }
}

function repetirVideo(){
  if(elementoVideo){ 
    elementoVideo.currentTime = 0; 
    elementoVideo.play(); 
  }
}

//➪ Salvar No Histórico
function salvarNoHistorico(video){
  let historico = JSON.parse(localStorage.getItem('toshstream_hist')) || {};
  const titulo = video.title || video.titulo || 'Sem título';
  const capa = video.thumbnail || video.capa || '/toshstream';
  const views = video.views || video.visualizacoes;
  const duracao = video.duration || video.duracao;

  if(!historico[video.url]){
    historico[video.url] = {
      url: video.url,
      title: titulo,
      thumbnail: capa,
      count: 1,
      views: views,
      duration: duracao
    };
  } else {
    historico[video.url].count++;
    historico[video.url].title = titulo;
    historico[video.url].thumbnail = capa;
    historico[video.url].views = views;
    historico[video.url].duration = duracao;
  }
  localStorage.setItem('toshstream_hist', JSON.stringify(historico));
}

//➪ Excluir Item com deslizar + desfazer
function excluirItem(url, titulo){
  let historico = JSON.parse(localStorage.getItem('toshstream_hist')) || {};
  if(!historico[url]) return;

  ultimoItemRemovido = { url, item: { ...historico[url] } };
  delete historico[url];
  localStorage.setItem('toshstream_hist', JSON.stringify(historico));
  renderizarHistorico();

  const barra = document.getElementById('barraDesfazer');
  document.getElementById('textoDesfazer').textContent = `"${titulo.substring(0,25)}..." removido`;
  barra.classList.add('mostrar');

  clearTimeout(temporizadorDesfazer);
  temporizadorDesfazer = setTimeout(() => {
    barra.classList.remove('mostrar');
    ultimoItemRemovido = null;
  }, 5000);
}

//➪ Desfazer Exclusão
function desfazerExclusao(){
  if(!ultimoItemRemovido) return;
  let historico = JSON.parse(localStorage.getItem('toshstream_hist')) || {};
  historico[ultimoItemRemovido.url] = ultimoItemRemovido.item;
  localStorage.setItem('toshstream_hist', JSON.stringify(historico));
  document.getElementById('barraDesfazer').classList.remove('mostrar');
  ultimoItemRemovido = null;
  clearTimeout(temporizadorDesfazer);
  renderizarHistorico();
  mostrarMensagem("Restaurado com sucesso!");
}

//➪ Renderizar Histórico com efeito de vídeo na capa ao passar o mouse
function renderizarHistorico(){
  const lista = document.getElementById('listaHistorico');
  const historico = JSON.parse(localStorage.getItem('toshstream_hist')) || {};
  const itens = Object.values(historico).sort((a, b) => b.count - a.count);

  if(!itens.length){
    lista.innerHTML = `<p style="color:var(--prata);text-align:center;padding:40px;">Nenhum vídeo assistido ainda. Faça uma busca para começar!</p>`;
    return;
  }

  lista.innerHTML = '';
  itens.forEach(video => {
    const titulo = video.title || video.titulo || 'Sem título';
    const capa = video.thumbnail || video.capa || '/toshstream';
    const views = formatarViews(video.views);
    const duracao = formatarDuracao(video.duration);

    lista.innerHTML += `
      <div class="item-wrapper" data-url="${escaparHtml(video.url)}" data-titulo="${escaparHtml(titulo)}">
        <div class="fundo-apagar"><i class="fas fa-trash"></i></div>
        <div class="item-video" onclick="reproduzirDoHistorico('${escaparHtml(video.url)}')">
          <div class="capa-container">
            <div class="capa-fallback"></div>
            <img class="capa-img" src="${capa}" alt="${escaparHtml(titulo)}" loading="lazy" onerror="this.src='/toshstream';this.style.opacity='.7'">
            <video class="capa-video" muted loop playsinline preload="metadata">
              <source src="${API}/api/download/playvd31?nome=${encodeURIComponent(video.url)}" type="video/mp4">
            </video>
          </div>
          <div class="info-capa">
            <div class="titulo-capa">${escaparHtml(titulo)}</div>
            <div class="estatisticas">
              ${views ? `<div class="est-item"><i class="fas fa-eye"></i>${views}</div>` : ''}
              ${duracao ? `<div class="est-item"><i class="fas fa-clock"></i>${duracao}</div>` : ''}
              <div class="est-item"><i class="fas fa-history"></i>${video.count}x</div>
            </div>
          </div>
        </div>
      </div>`;
  });

  //➪ Arraste para excluir + vídeo hover
  document.querySelectorAll('.item-wrapper').forEach(wrapper => {
    const item = wrapper.querySelector('.item-video');
    const url = wrapper.dataset.url;
    const titulo = wrapper.dataset.titulo;
    let inicioX = 0, atualX = 0, arrastando = false;
    const LIMITE = -80;

    const inicioArraste = (e) => {
      if(e.target.closest('button') || e.target.closest('a')) return;
      inicioX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      arrastando = true;
      item.classList.add('arrastando');
    };
    const arraste = (e) => {
      if(!arrastando) return;
      const x = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      atualX = x - inicioX;
      if(atualX > 0) atualX = 0;
      item.style.transform = `translateX(${atualX}px)`;
    };
    const fimArraste = () => {
      if(!arrastando) return;
      arrastando = false;
      item.classList.remove('arrastando');

      if(atualX <= LIMITE){
        item.style.transform = 'translateX(-100%)';
        item.style.opacity = '0';
        setTimeout(() => excluirItem(url, titulo), 250);
      } else {
        item.style.transform = 'translateX(0)';
      }
      atualX = 0;
    };

    item.addEventListener('touchstart', inicioArraste, { passive: true });
    item.addEventListener('touchmove', arraste, { passive: true });
    item.addEventListener('touchend', fimArraste);
    item.addEventListener('mousedown', inicioArraste);
    document.addEventListener('mousemove', arraste);
    document.addEventListener('mouseup', fimArraste);

    //➪ Reproduz vídeo na capa ao passar o mouse / tocar
    const miniVid = item.querySelector('.capa-video');
    if(miniVid){
      item.addEventListener('mouseenter', () => { 
        miniVid.currentTime = 0; 
        miniVid.play().catch(()=>{}); 
      });
      item.addEventListener('mouseleave', () => { 
        miniVid.pause(); 
        miniVid.currentTime = 0; 
      });
      item.addEventListener('touchstart', () => { 
        miniVid.currentTime = 0; 
        miniVid.play().catch(()=>{}); 
      });
      item.addEventListener('touchend', () => { 
        setTimeout(() => { 
          miniVid.pause(); 
          miniVid.currentTime = 0; 
        }, 2000); 
      });
    }
  });
}

//➪ Reproduzir Do Histórico com verificação de JSON
async function reproduzirDoHistorico(url){
  try {
    mostrarMensagem("Carregando...");
    const res = await fetch(`${API}/api/pesquisa/youtube1?nome=${encodeURIComponent(url)}`);
    
    // ✅ Verifica se é JSON antes de parsear
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      throw new Error('Rota de pesquisa indisponível');
    }
    
    const dados = await res.json();
    if(!dados.status || !dados.resultado || !Array.isArray(dados.resultado)) {
      return mostrarMensagem("Vídeo não encontrado");
    }
    playlist = dados.resultado;
    indiceAtual = 0;
    reproduzirVideo(playlist[0]);
  } catch (erro) { 
    mostrarMensagem("Erro: " + erro.message); 
  }
}

//➪ Escapar Html — seguro contra injeção
function escaparHtml(texto){
  if(!texto) return '';
  const div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}

//➪ Inicializar
document.addEventListener('DOMContentLoaded', () => {
  renderizarHistorico();
});

//➪ Buscar com Enter
document.getElementById('campoBusca').addEventListener('keydown', (e) => {
  if(e.key === 'Enter') buscarVideo();
});
