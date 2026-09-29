const EMAIL_USUARIO = localStorage.getItem('tosh_tech')||localStorage.getItem('emailUsuario')||'';
let arquivoSelecionado=null,previewTemp=null,FOTO_USUARIO='/logo',balaoCarregando=null;

document.addEventListener('DOMContentLoaded',function(){
const btnEnviar=document.getElementById('btnEnviar'),
      campoMensagem=document.getElementById('campoMensagem'),
      listaMensagens=document.getElementById('listaMinhasMensagens'),
      btnAnexar=document.getElementById('btnAnexar'),
      arquivoMidia=document.getElementById('arquivoMidia'),
      btnVoltar=document.getElementById('btnVoltar'),
      avatarUsuario=document.getElementById('avatarUsuario'),
      btnApagarConversa=document.getElementById('btnApagarConversa');

if(!EMAIL_USUARIO||!EMAIL_USUARIO.includes('@')){
  setTimeout(()=>window.location.href='/',2000);
  return
}

async function carregarPerfilUsuario(){
  if(!avatarUsuario)return;
  try{
    const res=await fetch('/api/meus-dados',{headers:{'tosh_tech':EMAIL_USUARIO.trim().toLowerCase()}});
    const dados=await res.json();
    if(dados.sucesso&&dados.fotoPerfil){
      FOTO_USUARIO=dados.fotoPerfil;
      avatarUsuario.src=FOTO_USUARIO
    }
  }catch{
    FOTO_USUARIO=localStorage.getItem('fotoPerfil')||'/assets/icones/usuario-padrao.png';
    avatarUsuario.src=FOTO_USUARIO
  }
}

function rolarParaFim() {
  setTimeout(() => {
    listaMensagens.scrollTop = listaMensagens.scrollHeight + 50; // 🔥 Empurra mais um pouco para garantir
  }, 15);
}

window.abrirFotoAmpliada=function(s){
  const j=document.getElementById('visualizarFoto'),i=document.getElementById('fotoAmpliada');
  if(j&&i){i.src=s;j.style.display='flex'}
};
window.fecharFotoAmpliada=function(){
  const j=document.getElementById('visualizarFoto');
  if(j)j.style.display='none'
};

if(avatarUsuario)avatarUsuario.addEventListener('click',()=>abrirFotoAmpliada(FOTO_USUARIO));

function criarBalaoMensagem(conteudo, tipo = 'usuario') {
  const d = document.createElement('div');
  d.className = `mensagem ${tipo}`;
  const f = tipo === 'sistema' ? '/logo' : FOTO_USUARIO;
  
  function processarConteudo(texto) {
    if (!texto) return '';
    let html = texto;

    // ✅ CORRIGE CAMINHO RELATIVO ANTES DE TUDO
    html = html.replace(/(!\[.*?\])\((\/upload\/[^)]+)\)/g, '$1(https://tosh-tech.onrender.com$2)');

    // ✅ CONVERTE IMAGEM COM LINK COMPLETO
    html = html.replace(/!\[([^\]]*)\]\((http[^)]+)\)/g, (match, alt, link) => {
      return `<div class="container-midia" style="margin:8px 0; border-radius:8px; overflow:hidden;">
        <img src="${link}" alt="${alt}" loading="lazy" style="width:100%; max-width:260px; cursor:pointer;" onclick="abrirFotoAmpliada('${link}')" onerror="this.style.display='none'">
      </div>`;
    });

    // ✅ FORMATAÇÃO DE TEXTO
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/`([^`]+)`/g, '<code style="background:rgba(255,255,255,0.1); padding:2px 6px; border-radius:4px;">$1</code>');
    html = html.replace(/\n/g, '<br>');
    return html;
  }

  // ✅ GARANTE QUE USA innerHTML, NÃO TEXTO
  d.innerHTML = `
    <div class="avatar-mensagem" onclick="abrirFotoAmpliada('${f}')">
      <img src="${f}" alt="${tipo === 'sistema' ? 'IA Tosh Tech' : 'Meu perfil'}" loading="lazy" onerror="this.src='/assets/icones/logo-padrao.png'">
    </div>
    <div class="conteudo-balao">${processarConteudo(conteudo)}</div>
  `;
  return d;
}


function mostrarCarregando(){
  balaoCarregando=criarBalaoMensagem(`<p><span style="opacity:0.7">Digitando...</span><span style="animation: piscar 1.2s infinite">●</span></p>`,'sistema');
  listaMensagens.appendChild(balaoCarregando);
  rolarParaFim();
}

function removerCarregando(){
  if(balaoCarregando){balaoCarregando.remove();balaoCarregando=null}
}

function removerPreviewTemp(){
  if(previewTemp){previewTemp.remove();previewTemp=null}
}

function confirmarAcao(t,m){
  return new Promise(r=>{
    const d=document.createElement('div');
    d.className='fundo-confirmar';
    d.innerHTML=`<div class="card-confirmar"><h3>${t}</h3><p>${m}</p><div class="grupo-botoes"><button class="btn-card" id="btnCancelar">Cancelar</button><button class="btn-card primario" id="btnConfirmar">OK</button></div></div>`;
    d.querySelector('#btnCancelar').onclick=()=>{d.remove();r(false)};
    d.querySelector('#btnConfirmar').onclick=()=>{d.remove();r(true)};
    document.body.appendChild(d)
  })
}

async function apagarTodaConversa(){
  if(!await confirmarAcao('Apagar Conversa','🗑️ Apagar toda a conversa? Essa ação não pode ser desfeita.'))return;
  listaMensagens.innerHTML='';
  removerPreviewTemp();
  arquivoSelecionado=null;
  arquivoMidia.value='';
  campoMensagem.innerText='';
  listaMensagens.appendChild(criarBalaoMensagem('<p>Suporte IA Tosh Tech</p>','sistema'));
  rolarParaFim();
}

window.abrirMenuAnexo=()=>{
  const d=document.createElement('div');
  d.className='fundo-menu-anexo';
  d.innerHTML=`<div class="card-menu-anexo"><h3 class="titulo-menu">Escolha uma opção</h3><div class="lista-opcoes"><div class="item-opcao" onclick="selecionarTipo('camera')"><div class="icone-opcao"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg></div><span class="texto-opcao">Câmera</span></div><div class="item-opcao" onclick="selecionarTipo('video')"><div class="icone-opcao"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M10 9l6 3-6 3V9z"/></svg></div><span class="texto-opcao">Vídeo</span></div><div class="item-opcao" onclick="selecionarTipo('fotos')"><div class="icone-opcao"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg></div><span class="texto-opcao">Fotos</span></div><div class="item-opcao" onclick="selecionarTipo('arquivos')"><div class="icone-opcao"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg></div><span class="texto-opcao">Arquivos</span></div><div class="item-opcao" onclick="selecionarTipo('documentos')"><div class="icone-opcao"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg></div><span class="texto-opcao">Docs</span></div><div class="item-opcao" onclick="selecionarTipo('audio')"><div class="icone-opcao"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg></div><span class="texto-opcao">Áudio</span></div><div class="item-opcao" onclick="selecionarTipo('localizacao')"><div class="icone-opcao"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div><span class="texto-opcao">Local</span></div><div class="item-opcao" onclick="selecionarTipo('contato')"><div class="icone-opcao"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div><span class="texto-opcao">Contato</span></div></div></div><button class="btn-fechar-menu" onclick="fecharMenuAnexo()">Cancelar</button>`;
  document.body.appendChild(d)
};

window.fecharMenuAnexo=()=>{document.querySelector('.fundo-menu-anexo')?.remove()};

window.selecionarTipo=t=>{
  fecharMenuAnexo();
  arquivoMidia.removeAttribute('capture');
  arquivoMidia.removeAttribute('webkitdirectory');
  arquivoMidia.removeAttribute('multiple');
  arquivoMidia.removeAttribute('accept');
  switch(t){
    case'camera':arquivoMidia.setAttribute('accept','image/*');break;
    case'video':arquivoMidia.setAttribute('accept','video/*');break;
    case'fotos':arquivoMidia.setAttribute('accept','image/*');break;
    case'arquivos':arquivoMidia.setAttribute('accept','*/*');break;
    case'documentos':arquivoMidia.setAttribute('accept','.pdf,.doc,.docx,.txt,.xlsx,.zip');break;
    case'audio':arquivoMidia.setAttribute('accept','.mp3,.wav,.ogg,.m4a,audio/*');break;
    case'localizacao':alert('Localização em desenvolvimento!');return;
    case'contato':alert('Contato em desenvolvimento!');return;
  }
  arquivoMidia.click()
};

btnAnexar.onclick=()=>abrirMenuAnexo();

arquivoMidia.onchange=e=>{
  removerPreviewTemp();
  const a=e.target.files;
  if(!a||!a.length)return;
  arquivoSelecionado=a[0];
  const n=arquivoSelecionado.name.toLowerCase(),
        s=(arquivoSelecionado.size/1024/1024).toFixed(1);
  let i='📎';
  if(n.endsWith('.mp3')||n.endsWith('.wav')||n.endsWith('.ogg')||n.endsWith('.m4a'))i='🎵';
  else if(n.endsWith('.mp4')||n.endsWith('.mkv')||n.endsWith('.avi'))i='🎬';
  else if(n.endsWith('.jpg')||n.endsWith('.png')||n.endsWith('.gif'))i='🖼️';
  else if(n.endsWith('.pdf')||n.endsWith('.doc')||n.endsWith('.docx'))i='📄';
  const p=document.createElement('div');
  p.style.cssText='position:fixed;bottom:75px;left:10px;right:10px;z-index:85;padding:10px 14px;border:1px solid var(--borda-prata);border-radius:12px;background:var(--fundo-input);display:flex;align-items:center;gap:10px;';
  p.innerHTML=`<span style="font-size:1.2rem;">${i}</span><div><div style="font-size:0.85rem;color:var(--texto);">${arquivoSelecionado.name.substring(0,30)}${arquivoSelecionado.name.length>30?'...':''}</div><div style="font-size:0.75rem;color:var(--texto-sec);">${s} MB • clique em enviar</div></div>`;
  document.querySelector('.bloco-form').before(p);
  previewTemp=p
};

async function enviarMensagem(){
  const t=campoMensagem.innerText.trim();
  if(!t&&!arquivoSelecionado)return;
  removerPreviewTemp();
  let c='',l=null;
  btnEnviar.disabled=true;
  btnEnviar.style.opacity='0.6';
  if(arquivoSelecionado){
    const u=URL.createObjectURL(arquivoSelecionado);
    if(arquivoSelecionado.type.startsWith('image/'))c+=`<div class="container-midia" id="midia-envio"><img src="${u}" style="border-radius:8px;cursor:pointer;" onclick="abrirFotoAmpliada(this.src)"></div>`;
    else if(arquivoSelecionado.type.startsWith('video/'))c+=`<div class="container-midia" id="midia-envio"><video controls preload="metadata" style="border-radius:8px;"><source src="${u}" type="${arquivoSelecionado.type}">Vídeo não suportado</video></div>`;
    else c+=`<p>📎 ${arquivoSelecionado.name}</p>`
  }
  if(t)c+=`<p>${t}</p>`;
  listaMensagens.appendChild(criarBalaoMensagem(c,'usuario'));
  rolarParaFim();
  campoMensagem.innerText='';
  try{
    const m=document.getElementById('midia-envio');
    if(m)m.innerHTML+=`<div class="carregando-envio"></div>`;
    if(arquivoSelecionado){
      const f=new FormData();
      f.append('arquivo',arquivoSelecionado);
      f.append('email',EMAIL_USUARIO);
      const r=await fetch('/api/upload-suporte',{method:'POST',body:f,headers:{'tosh_tech':EMAIL_USUARIO.trim().toLowerCase()}});
      const d=await r.json();
      if(d.sucesso)l=d.link
    }
    if(m)m.querySelector('.carregando-envio')?.remove();
    mostrarCarregando();
    const r=await fetch('/api/ia/suporte',{method:'POST',headers:{'Content-Type':'application/json','tosh_tech':EMAIL_USUARIO.trim().toLowerCase()},body:JSON.stringify({pergunta:t,emailUsuario:EMAIL_USUARIO,linkMidia:l})});
    const d=await r.json();
    removerCarregando();
    let f='';
    if(l){
      f+=`<p>✅ Arquivo enviado com sucesso!<br>🔗 Link: <a href="${l}" target="_blank" style="color:#b8b8b8;text-decoration:underline;">${l}</a></p>`;
      if(d.resposta)f+=`<br><p>${d.resposta}</p>`
    }else f=d.resposta?`<p>${d.resposta}</p>`:'<p>✅ Mensagem recebida!</p>';
    listaMensagens.appendChild(criarBalaoMensagem(f,'sistema'));
    rolarParaFim();
  }catch(e){
    removerCarregando();
    listaMensagens.appendChild(criarBalaoMensagem(`<p>⚠️ Erro: ${e.message}</p>`,'sistema'));
    rolarParaFim();
  }finally{
    arquivoSelecionado=null;
    arquivoMidia.value='';
    btnEnviar.disabled=false;
    btnEnviar.style.opacity='1'
  }
}

btnEnviar.onclick=enviarMensagem;
campoMensagem.onkeydown=e=>{
  if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();enviarMensagem()}
};
if(btnApagarConversa)btnApagarConversa.onclick=apagarTodaConversa;
btnVoltar.onclick=()=>history.back();
carregarPerfilUsuario()
});









