/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Criador『Tosh』༻
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
console.log('👤 Perfil Tosh Tech | Lógica IDÊNTICA ao Login');

// ➪ Interceptador Global 
window.addEventListener('fetch', function(e) {
var emailSalvo = localStorage.getItem('tosh_tech') || localStorage.getItem('emailUsuario') || '';
if (emailSalvo) {
var novaReq = new Request(e.request, {
headers: new Headers(e.request.headers, { 'tosh_tech': emailSalvo.trim().toLowerCase() })
});
e.preventDefault();
e.response = fetch(novaReq);
}
});

//➪ Carregamento automático do tema
async function carregarTemaGlobal() {
try {
const res = await fetch('/tema-atual');
const dados = await res.json();
if (dados.sucesso && dados.tema) {
document.getElementById('temaEstilo').href = `/assets/temas/${dados.tema}/perfil.css`;
}
} catch (e) {
console.log('⚠️ Tema padrão carregado');
}
}
carregarTemaGlobal();

//➪ Variáveis globais
let cropper = null;
let cropperParceria = null;
let inicializado = false;
let timerSalvar = null;
let timerParceria = null;

//➪ Inicialização
document.addEventListener('DOMContentLoaded', () => {
if (inicializado) return;
inicializado = true;

console.log('[INICIO] Verificando sessão igual ao Login...');
verificarLogin();
configurarCamposFoto();
configurarRecorteParceria();
configurarNomeArquivo(); //➪ Exibe nome do arquivo no botão
});

// ➪ Verificação De Sessão
function verificarLogin() {
const emailSalvo = localStorage.getItem('tosh_tech') || localStorage.getItem('emailUsuario') || '';
const emailTratado = emailSalvo.trim().toLowerCase();
console.log('[LOGIN PERFIL] Email salvo:', emailTratado);

if (!emailTratado || !emailTratado.includes('@')) {
console.log('[LOGIN PERFIL] Sessão inválida');
mostrarArea(false);
return;
}

console.log('[LOGIN PERFIL] Sessão válida:', emailTratado);
mostrarArea(true);
carregarDadosPerfil(emailTratado);
}

//➪ Exibição das telas
function mostrarArea(logado) {
const areaProtegida = document.getElementById('areaProtegida');
const areaSemAcesso = document.getElementById('areaSemAcesso');
    
if (areaProtegida) areaProtegida.classList.toggle('exibir', logado);
if (areaSemAcesso) areaSemAcesso.style.display = logado ? 'none' : 'block';
}

//➪ Carregar dados do perfil
async function carregarDadosPerfil(emailUsuario) {
try {
console.log(`[API] Buscando perfil para: ${emailUsuario}`);
        
const res = await fetch('/api/perfil', {
method: 'GET',
 headers: { 'Accept': 'application/json' },
credentials: 'same-origin'
});

if (!res.ok) throw new Error(`Erro: ${res.status} ${res.statusText}`);
const r = await res.json();

if (!r.sucesso) {
console.warn(`[API] Acesso negado: ${r.erro}`);
mostrarMensagem(r.erro || 'Faça login novamente', 'erro');
localStorage.removeItem('tosh_tech');
localStorage.removeItem('emailUsuario');
mostrarArea(false);
return;
}

console.log('[API] Perfil carregado com sucesso');
localStorage.setItem('tosh_tech', r.perfil.email.trim().toLowerCase());
            
preencherDadosPerfil(r.perfil);

} catch (erro) {
console.error('❌ [API] Falha ao carregar perfil:', erro);
mostrarMensagem(`Erro ao carregar dados: ${erro.message}`, 'erro');
}
}

//➪ Preencher todos os campos da tela + Ícone de parceria
function preencherDadosPerfil(p) {
if (!p) return;

const infoEl = document.getElementById('infoUsuario');
if (infoEl) infoEl.textContent = '';

const nomeEl = document.getElementById('nomeUsuario');
if (nomeEl) {
nomeEl.innerHTML = `
<svg class="icone icone-grande" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
<path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8 5.8 21.3l2.4-7.4L2 9.4h7.6L12 2z"/>
      </svg>
${p.nome || 'Usuário'}
    `;
}

if (document.getElementById('patenteUsuario')) {
document.getElementById('patenteUsuario').textContent = p.patente || '—';
}

const tipoContaEl = document.getElementById('tipoConta');
if (tipoContaEl) {
const cargo = String(p.cargo || 'usuario').toLowerCase();
if (cargo === 'dono') {
tipoContaEl.className = 'tipo-conta tipo-dono';
tipoContaEl.textContent = 'Dono';
} else if (cargo === 'administrador' || cargo === 'adm') {
tipoContaEl.className = 'tipo-conta tipo-adm';
tipoContaEl.textContent = 'Adm';
} else {
tipoContaEl.className = 'tipo-conta tipo-cliente';
tipoContaEl.textContent = 'Cliente';
}
}

if (infoEl) {
infoEl.innerHTML = `
<strong>E-mail:</strong> ${p.email || '—'}<br>
<strong>Chave API:</strong> ${(p.apiKey || '—').substring(0,20)}...<br>
<strong>Cadastrado em:</strong> ${p.dataCadastro || '—'}
    `;
}

if (document.getElementById('inputNome')) document.getElementById('inputNome').value = p.nome || '';
if (document.getElementById('inputEmail')) document.getElementById('inputEmail').value = p.email || '';
if (document.getElementById('inputApikey')) document.getElementById('inputApikey').value = p.apiKey || '';

const fotoUser = p.fotoPerfil || '/logo';
if (document.getElementById('fotoPerfil')) {
document.getElementById('fotoPerfil').style.backgroundImage = `url('${fotoUser}')`;
}

//➪ Lógica Do Ícone De Notificação
const iconeNotif = document.getElementById('iconeNotificacao');
const balaoStatus = document.getElementById('balaoStatus');
if (!iconeNotif || !balaoStatus) return;

iconeNotif.replaceWith(iconeNotif.cloneNode(true));
const novoIcone = document.getElementById('iconeNotificacao');

if (p.parceria) {
novoIcone.style.display = 'block';

if (p.parceria.status === 'pendente') {
novoIcone.classList.add('piscando');
novoIcone.querySelector('svg').setAttribute('stroke', '#fbbf24');
balaoStatus.className = 'balao-status pendente';
balaoStatus.innerHTML = 'Solicitação de parceria enviada. Aguardando análise da equipe Tosh Tech.';
} else if (p.parceria.status === 'aprovado') {
novoIcone.classList.remove('piscando');
novoIcone.querySelector('svg').setAttribute('stroke', '#22c55e');
balaoStatus.className = 'balao-status aprovado';
balaoStatus.innerHTML = 'Parceria aprovada! Seu projeto já está disponível na página pública.';
}

novoIcone.addEventListener('click', (e) => {
e.stopPropagation();
balaoStatus.classList.toggle('visivel');
});

const fecharFora = () => balaoStatus.classList.remove('visivel');
document.addEventListener('click', fecharFora);
balaoStatus.addEventListener('click', (e) => e.stopPropagation());
} else {
novoIcone.style.display = 'none';
novoIcone.classList.remove('piscando');
balaoStatus.classList.remove('visivel');
}
}

//➪ Exibe Nome Do Arquivo No Botão
function configurarNomeArquivo() {
const inputPerfil = document.getElementById('novaFoto');
const inputProjeto = document.getElementById('imagemProjeto');
const nomeProjeto = document.getElementById('nomeArquivoProjeto');

if (inputProjeto && nomeProjeto) {
inputProjeto.addEventListener('change', e => {
const arq = e.target.files[0];
nomeProjeto.textContent = arq ? (arq.name.length > 22 ? arq.name.substring(0,22)+'...' : arq.name) : 'Nenhum arquivo selecionado';
});
}
}

//➪ Configurar recorte da FOTO DE PERFIL
function configurarCamposFoto() {
const inputArquivo = document.getElementById('novaFoto');
const inputLink = document.getElementById('linkFoto');
const imgRecorte = document.getElementById('imagemParaRecortar');
const containerRecorte = document.getElementById('recorteContainer');

if (!inputArquivo || !inputLink || !imgRecorte || !containerRecorte) return;

inputArquivo.addEventListener('change', (e) => {
const arquivo = e.target.files[0];
if (!arquivo) return;
const leitor = new FileReader();
leitor.onload = (ev) => prepararRecorte(ev.target.result);
leitor.readAsDataURL(arquivo);
});

inputLink.addEventListener('change', (e) => {
const link = e.target.value.trim();
if (!link) return;
if (!link.startsWith('https://')) {
mostrarMensagem('Use um link seguro (HTTPS)', 'erro');
return;
}
prepararRecorte(link);
});
}

//➪ Inicializar Cropper do Perfil
function prepararRecorte(fonteImagem) {
const imgRecorte = document.getElementById('imagemParaRecortar');
const containerRecorte = document.getElementById('recorteContainer');

if (cropper) cropper.destroy();
if (timerSalvar) clearTimeout(timerSalvar);

imgRecorte.src = fonteImagem;
containerRecorte.style.display = 'block';

imgRecorte.onload = () => {
cropper = new Cropper(imgRecorte, {
aspectRatio: 1,
viewMode: 1,
autoCropArea: 0.9,
dragMode: 'move',
cropend: () => {
if (timerSalvar) clearTimeout(timerSalvar);
timerSalvar = setTimeout(() => salvarFotoRecortada(), 800);
}
});
};
}

//➪ Salvar foto recortada do Perfil
async function salvarFotoRecortada() {
  if (!cropper) return;

  try {
    mostrarMensagem('Salvando foto...', 'info');
    
    const imagemBase64 = cropper.getCroppedCanvas({
      width: 384,
      height: 384,
      imageSmoothingEnabled: true,
      imageSmoothingQuality: 'high'
    }).toDataURL('image/png', 0.9);

    const res = await fetch('/api/perfil/foto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({ foto: imagemBase64 })
    });

    const r = await res.json();
    if (r.sucesso) {
      mostrarMensagem(r.mensagem || 'Foto atualizada!', 'sucesso');
      const fotoPerfil = document.getElementById('fotoPerfil');
      if (fotoPerfil) {
        fotoPerfil.style.backgroundImage = `url('${r.novaFoto}?v=${Date.now()}')`;
      }
      const containerRecorte = document.getElementById('recorteContainer');
      if (containerRecorte) containerRecorte.style.display = 'none';
      if (cropper) cropper.destroy();
    } else {
      mostrarMensagem(r.erro || 'Erro ao salvar foto', 'erro');
    }
  } catch (e) {
    console.error('[ERRO FOTO]', e);
    mostrarMensagem('Falha ao enviar foto', 'erro');
  }
}

// ==============================================
// ✅ SISTEMA DE RECORTE PARA IMAGEM DA PARCERIA
// ==============================================
function configurarRecorteParceria() {
  const inputArquivo = document.getElementById('imagemProjeto');
  const imgRecorte = document.getElementById('imgRecorteParceria');
  const containerRecorte = document.getElementById('containerRecorteParceria');
  const btnCancelar = document.getElementById('cancelarRecorteParceria');

  if (!inputArquivo || !imgRecorte || !containerRecorte) return;

  inputArquivo.addEventListener('change', (e) => {
    const arquivo = e.target.files[0];
    if (!arquivo) return;
    const leitor = new FileReader();
    leitor.onload = (ev) => abrirRecorteParceria(ev.target.result);
    leitor.readAsDataURL(arquivo);
  });

  if (btnCancelar) {
    btnCancelar.addEventListener('click', () => {
      if (cropperParceria) cropperParceria.destroy();
      containerRecorte.style.display = 'none';
      inputArquivo.value = '';
      if (document.getElementById('nomeArquivoProjeto')) {
        document.getElementById('nomeArquivoProjeto').textContent = 'Nenhum arquivo selecionado';
      }
    });
  }
}

function abrirRecorteParceria(fonteImagem) {
  const imgRecorte = document.getElementById('imgRecorteParceria');
  const containerRecorte = document.getElementById('containerRecorteParceria');

  if (cropperParceria) cropperParceria.destroy();
  if (timerParceria) clearTimeout(timerParceria);

  imgRecorte.src = fonteImagem;
  containerRecorte.style.display = 'block';

  imgRecorte.onload = () => {
    cropperParceria = new Cropper(imgRecorte, {
      aspectRatio: 16 / 9,
      viewMode: 1,
      autoCropArea: 0.9,
      dragMode: 'move',
      cropend: () => {
        if (timerParceria) clearTimeout(timerParceria);
        timerParceria = setTimeout(() => exportarImagemParceria(), 800);
      }
    });
  };
}

async function exportarImagemParceria() {
  if (!cropperParceria) return;

  try {
    const canvas = cropperParceria.getCroppedCanvas({
      width: 960,
      height: 540,
      imageSmoothingEnabled: true,
      imageSmoothingQuality: 'high'
    });

    canvas.toBlob(async (blob) => {
      window.imagemParceriaFinal = new File([blob], `projeto-${Date.now()}.jpg`, { type: 'image/jpeg', lastModified: Date.now() });
    }, 'image/jpeg', 0.9);

  } catch (e) {
    console.error('[ERRO CORTE PARCERIA]', e);
    mostrarMensagem('Problema no corte da imagem', 'erro');
  }
}

// ➪ SALVAR DADOS DO PERFIL
async function salvarDadosPerfil() {
  const nome = document.getElementById('inputNome')?.value.trim();
  const novoEmail = document.getElementById('inputEmail')?.value.trim();
  const apikey = document.getElementById('inputApikey')?.value.trim();
  const senha = document.getElementById('inputNovaSenha')?.value.trim();
  const confirmaSenha = document.getElementById('inputConfirmarSenha')?.value.trim();

  if (!nome || !novoEmail) {
    mostrarMensagem('Preencha nome e e-mail', 'erro');
    return;
  }
  if (senha && senha.length < 4) {
    mostrarMensagem('Senha deve ter no mínimo 4 caracteres', 'erro');
    return;
  }
  if (senha && senha !== confirmaSenha) {
    mostrarMensagem('As senhas não coincidem', 'erro');
    return;
  }

  try {
    mostrarMensagem('Salvando alterações...', 'info');
    const res = await fetch('/api/perfil/atualizar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({ nome, email: novoEmail, apikey, senha: senha || undefined })
    });

    const r = await res.json();
    if (r.sucesso) {
      mostrarMensagem(r.mensagem || 'Dados atualizados!', 'sucesso');
      localStorage.setItem('tosh_tech', (r.novoEmail || novoEmail).toLowerCase());
      localStorage.setItem('emailUsuario', r.novoEmail || novoEmail);
      setTimeout(() => window.location.reload(), 1500);
    } else {
      mostrarMensagem(r.erro || 'Erro ao atualizar', 'erro');
    }
  } catch (e) {
    console.error('[ERRO SALVAR]', e);
    mostrarMensagem('Falha na conexão', 'erro');
  }
}

// ➪ ENVIAR SOLICITAÇÃO DE PARCERIA
async function enviarSolicitacaoParceria() {
  const formParceria = document.getElementById('formParceria');
  if (!formParceria) return;

  const nomeProjeto = document.getElementById('nomeProjeto')?.value.trim();
  const descricao = document.getElementById('descricaoProjeto')?.value.trim();
  const contato = document.getElementById('contatoProjeto')?.value.trim();
  const referencia = document.getElementById('referenciaProjeto')?.value.trim();

  if (!nomeProjeto || !descricao || !contato || !referencia) {
    mostrarMensagem('Preencha todos os campos obrigatórios', 'erro');
    return;
  }

  try {
    mostrarMensagem('Enviando solicitação...', 'info');
    
    const formData = new FormData();
    formData.append('nome_projeto', nomeProjeto);
    formData.append('descricao', descricao);
    formData.append('contato', contato);
    formData.append('referencia', referencia);

    if (window.imagemParceriaFinal) {
      formData.append('imagem_projeto', window.imagemParceriaFinal);
    } else {
      const arquivoOriginal = document.getElementById('imagemProjeto')?.files[0];
      if (arquivoOriginal) formData.append('imagem_projeto', arquivoOriginal);
    }

    const res = await fetch('/api/perfil/parceria', {
      method: 'POST',
      credentials: 'same-origin',
      body: formData
    });

    const r = await res.json();
    if (r.sucesso) {
      mostrarMensagem(r.mensagem, 'sucesso');
      formParceria.reset();
      window.imagemParceriaFinal = null;
      const containerRecorte = document.getElementById('containerRecorteParceria');
      if (containerRecorte) containerRecorte.style.display = 'none';
      if (cropperParceria) cropperParceria.destroy();
      if (document.getElementById('nomeArquivoProjeto')) {
        document.getElementById('nomeArquivoProjeto').textContent = 'Nenhum arquivo selecionado';
      }
      setTimeout(() => carregarDadosPerfil(localStorage.getItem('tosh_tech')), 1000);
    } else {
      mostrarMensagem(r.erro || 'Erro ao enviar solicitação', 'erro');
    }
  } catch (e) {
    console.error('[ERRO PARCERIA]', e);
    mostrarMensagem('Falha ao enviar solicitação', 'erro');
  }
}

// ➪ Mostrar mensagens
function mostrarMensagem(texto, tipo = 'sucesso') {
  const msgEl = document.getElementById('msg');
  if (!msgEl) return;

  msgEl.className = `alerta ${tipo}`;
  msgEl.textContent = texto;

  clearTimeout(window.timerMsg);
  window.timerMsg = setTimeout(() => {
    msgEl.className = 'alerta';
  }, 4000);
}

// ➪ INICIALIZAÇÃO DE BOTÕES
document.addEventListener('DOMContentLoaded', () => {
  const btnParceria = document.getElementById('btnEnviarParceria');
  if (btnParceria) {
    btnParceria.addEventListener('click', enviarSolicitacaoParceria);
  }
});
