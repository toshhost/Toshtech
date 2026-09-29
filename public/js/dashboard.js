/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Criador『Tosh』༻
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
console.log('Painel Tosh Tech | Carregado');

//➪ Configurações globais
let config = {};
fetch('/api/config')
.then(resp => {
if (!resp.ok) throw new Error(`Configurações não encontradas: ${resp.status}`);
return resp.json();
})
.then(dados => {
config = dados;
console.log('[CONFIG] Todas carregadas do arquivo utils/config.json');
aplicarConfiguracoes();
aplicarLogosSistema();
})
.catch(err => {
console.error('❌ [CONFIG] Falha ao carregar:', err.message);
config = {};
aplicarConfiguracoes();
});

// ➪ Inicialização
let inicializado = false;
document.addEventListener('DOMContentLoaded', () => {
if (inicializado) return;
inicializado = true;

console.log('[INICIO] Inicializando componentes...');
configurarMenu();
configurarBotoesCopiar();
configurarIconesCabecalho();
configurarBusca();
configurarSubmenus();
verificarLogin();

const ranking = document.getElementById('listaRanking');
if (ranking) {
ranking.addEventListener('click', (e) => {
const item = e.target.closest('li');
if (item) window.location.href = `/perfil`;
});
}
});

// ➪ Verificação de sessão
function verificarLogin() {
const emailSalvo = localStorage.getItem('tosh_tech') || localStorage.getItem('emailUsuario') || '';
const emailTratado = emailSalvo.trim().toLowerCase();
console.log('[LOGIN] Verificando sessão...');

if (!emailTratado || !emailTratado.includes('@')) {
console.log('[LOGIN] Sessão inválida');
mostrarArea(false);
return;
}

console.log(`[LOGIN] Sessão válida: ${emailTratado}`);
mostrarArea(true);
carregarDadosDashboard(emailTratado);
}

function mostrarArea(logado) {
const areaProtegida = document.getElementById('areaProtegida');
const areaSemAcesso = document.getElementById('areaSemAcesso');
    
if (areaProtegida) areaProtegida.style.display = logado ? 'block' : 'none';
if (areaSemAcesso) areaSemAcesso.style.display = logado ? 'none' : 'flex';
}

// ➪ Carregar dados do painel
async function carregarDadosDashboard(emailUsuario) {
const msgArea = document.getElementById('mensagemArea');
try {
console.log(`[API] Buscando dados para: ${emailUsuario}`);
        
const res = await fetch('/api/dashboard', {
method: 'GET',
headers: { 
'Accept': 'application/json',
'tosh_tech': emailUsuario 
},
credentials: 'same-origin'
});

if (!res.ok) throw new Error(`Erro: ${res.status} ${res.statusText}`);
const r = await res.json();

if (!r.sucesso) {
console.warn(`[API] Acesso negado: ${r.erro}`);
if (msgArea) {
msgArea.className = 'dt-mensagem msg-erro';
msgArea.textContent = r.erro || '❌ Faça login novamente';
}
localStorage.removeItem('tosh_tech');
localStorage.removeItem('emailUsuario');
mostrarArea(false);
return;
}
console.log('[API] Dados carregados');
localStorage.setItem('tosh_tech', r.perfil.email.trim().toLowerCase());
            
preencherPerfil(r.perfil);
preencherPermissoes(r.perfil.cargo);
preencherRanking(r.ranking_top10 || []);

} catch (erro) {
console.error('❌ [API] Falha:', erro);
if (msgArea) {
msgArea.className = 'dt-mensagem msg-erro';
msgArea.textContent = `❌ ${erro.message || 'Erro ao carregar dados'}`;
}
}
}

//➪ Menu Com Deslizar Abrir E Fechar 
function configurarMenu() {
const botaoMenu = document.getElementById('botaoMenu');
const menuLateral = document.getElementById('menuLateral');
const fundoMenu = document.getElementById('fundoMenu');
const btnFechar = document.querySelector('.dt-btn-fechar-menu');

if (!botaoMenu || !menuLateral || !fundoMenu) {
console.log('⚠️ [MENU] Elementos não encontrados!');
return;
}
console.log('[MENU] Elementos localizados com sucesso!');

function alternarMenu() {
menuLateral.classList.toggle('aberto');
fundoMenu.classList.toggle('aberto');
document.body.style.overflow = menuLateral.classList.contains('aberto') ? 'hidden' : '';
}

function abrirMenu() {
if (!menuLateral.classList.contains('aberto')) {
menuLateral.classList.add('aberto');
fundoMenu.classList.add('aberto');
document.body.style.overflow = 'hidden';
}
}

function fecharMenu() {
menuLateral.classList.remove('aberto');
fundoMenu.classList.remove('aberto');
document.body.style.overflow = '';
}

botaoMenu.addEventListener('click', alternarMenu);
if (btnFechar) btnFechar.addEventListener('click', fecharMenu);
fundoMenu.addEventListener('click', fecharMenu);

//➪ Suporte a deslizar
let touchInicioX = 0, touchAtualX = 0, arrastando = false;
const limiteAbrir = 30;
const limiteDistancia = 60;

document.addEventListener('touchstart', e => {
touchInicioX = e.touches[0].clientX;
arrastando = true;
}, { passive: true });

document.addEventListener('touchmove', e => {
if (!arrastando) return;
touchAtualX = e.touches[0].clientX;
}, { passive: true });

document.addEventListener('touchend', () => {
if (!arrastando) return;
arrastando = false;
const distancia = touchAtualX - touchInicioX;
if (distancia > limiteDistancia && touchInicioX < limiteAbrir) abrirMenu();
else if (distancia < -limiteDistancia && menuLateral.classList.contains('aberto')) fecharMenu();
});

console.log('[MENU] Deslizar para abrir/fechar ativado!');
}

// ➪ Submenus
function configurarSubmenus() {
const botoesSubmenu = document.querySelectorAll('.dt-item-com-submenu > .dt-menu-item');
botoesSubmenu.forEach(botao => {
botao.addEventListener('click', (e) => {
e.preventDefault();
const itemPai = botao.closest('.dt-item-com-submenu');
const submenu = itemPai.querySelector('.dt-submenu');
const seta = botao.querySelector('.dt-seta-submenu');
if (submenu && seta) {
submenu.classList.toggle('aberto');
seta.classList.toggle('aberto');
}
});
});
}

//➪ Copiar chave
function configurarBotoesCopiar() {
document.querySelectorAll('.dt-btn-copiar-apiKey').forEach(botao => {
botao.addEventListener('click', async () => {
const alvoId = botao.getAttribute('data-alvo');
const texto = document.getElementById(alvoId)?.textContent;
if (!texto || texto === '—') return;
try {
if (!navigator.clipboard) {
const areaTemporaria = document.createElement('textarea');
areaTemporaria.value = texto;
document.body.appendChild(areaTemporaria);
areaTemporaria.select();
document.execCommand('copy');
document.body.removeChild(areaTemporaria);
} else {
await navigator.clipboard.writeText(texto);
}
const original = botao.innerHTML;
botao.innerHTML = `<svg class="dt-icone" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`;
botao.style.color = '#4ade80';
setTimeout(() => {
botao.innerHTML = original;
botao.style.color = '';
}, 2000);
} catch (erro) {
alert('Não foi possível copiar, selecione manualmente');
}
});
});
}

//➪ ícones cabeçalho 
function configurarIconesCabecalho() {
const btnPerfil = document.querySelector('.dt-cabecalho-dir a[href*="perfil"]');
if (btnPerfil) btnPerfil.addEventListener('click', e => {
e.preventDefault();
window.location.href = '/perfil';
});

const btnMensagens = document.getElementById('btnMensagens');
if (btnMensagens) btnMensagens.addEventListener('click', e => {
e.preventDefault();
window.location.href = "/recados";
});

const btnIA = document.querySelector('.dt-icone-cabecalho[title*="Inteligência"]');
if (btnIA) btnIA.addEventListener('click', e => {
e.preventDefault();
window.location.href = "/suporte";
});
}

//➪ Busca
function configurarBusca() {
const campoBusca = document.getElementById('campoBusca');
const btnBusca = document.querySelector('.dt-btn-busca');
if (!campoBusca || !btnBusca) return;
function executarBusca() {
const termo = campoBusca.value.trim();
if (!termo) alert('Digite algo para buscar!');
}
btnBusca.addEventListener('click', executarBusca);
campoBusca.addEventListener('keydown', e => {
if (e.key === 'Enter' || e.keyCode === 13) executarBusca();
});
}

//➪ Preencher perfil
function preencherPerfil(p) {
const msgArea = document.getElementById('mensagemArea');
if (!p) return;

const tipoContaEl = document.getElementById('tipoConta');
if (tipoContaEl) {
const cargo = String(p.cargo || 'usuario').toLowerCase();
tipoContaEl.className = 'tipo-conta';
if (cargo === 'dono') {
tipoContaEl.classList.add('tipo-dono');
tipoContaEl.textContent = '𖤍 DONO';
} else if (cargo === 'administrador' || cargo === 'adm') {
tipoContaEl.classList.add('tipo-adm');
tipoContaEl.textContent = '꒰ঌ໒꒱ ADMINISTRADOR';
} else if (cargo === 'suporte') {
tipoContaEl.classList.add('tipo-suporte');
tipoContaEl.textContent = 'ཐི༏ཋྀ SUPORTE';
} else {
tipoContaEl.classList.add('tipo-cliente');
tipoContaEl.textContent = '⚝ CLIENTE';
}
}

if (document.getElementById('nomeUsuario')) document.getElementById('nomeUsuario').textContent = p.nome || '—';
if (document.getElementById('patenteUsuario')) document.getElementById('patenteUsuario').textContent = p.patente || '—';
if (document.getElementById('cargoUsuario')) document.getElementById('cargoUsuario').textContent = `Cargo: ${(p.cargo || '—').toUpperCase()}`;
if (document.getElementById('nivelUsuario')) document.getElementById('nivelUsuario').textContent = `Nível: ${p.nivel || '—'}`;
if (document.getElementById('apiKeyUsuario')) document.getElementById('apiKeyUsuario').textContent = p.apiKey || '—';
if (document.getElementById('nomePlano')) document.getElementById('nomePlano').textContent = p.plano || '—';
if (document.getElementById('dataCadastro')) document.getElementById('dataCadastro').textContent = `${p.dataCadastro || '—'}`;

if (document.getElementById('menuNome')) document.getElementById('menuNome').textContent = p.nome || '—';
if (document.getElementById('menuCargo')) document.getElementById('menuCargo').textContent = (p.cargo || '—').toUpperCase();
if (document.getElementById('menuChave')) document.getElementById('menuChave').textContent = `Chave: ${(p.apiKey || '—').substring(0,15)}...`;

const fotoUser = p.fotoPerfil || '/logo';
if (document.getElementById('fotoPerfil')) document.getElementById('fotoPerfil').style.backgroundImage = `url('${fotoUser}')`;
if (document.getElementById('menuAvatar')) document.getElementById('menuAvatar').style.backgroundImage = `url('${fotoUser}')`;

const maxReq = {
'Criador de Tecnologias': 999999999, 'Gênio da Computação': 100000, 'Lendário da Tecnologia': 30000,
'Mestre dos Códigos': 15000, 'Arquiteto de Sistemas': 12000, 'Engenheiro de Software': 8000,
'Desenvolvedor Sênior': 5000, 'Desenvolvedor Pleno': 3500, 'Desenvolvedor Júnior': 2000,
'Estagiário': 1000, 'Aprendiz': 500, 'Iniciante': 300, 'Teste': 100
}[p.plano] || 100;

const reqRest = p.requestsRestantes || 0;
const valorParaCalculo = maxReq >= 999999999 ? 999999999 : maxReq;
const pctReq = Math.min(100, Math.round((reqRest / valorParaCalculo) * 100));

if (document.getElementById('barraReq')) document.getElementById('barraReq').style.width = `${pctReq}%`;
if (document.getElementById('reqTexto')) document.getElementById('reqTexto').textContent = maxReq >= 999999999 ? '✎ᝰ.ILIMITADO' : `${reqRest}`;

const coins = p.techCoins || 0;
const pctCoins = Math.min(100, Math.round((coins / (maxReq >= 999999999 ? 999999999 : maxReq)) * 100));
if (document.getElementById('barraCoins')) document.getElementById('barraCoins').style.width = `${pctCoins}%`;
if (document.getElementById('coinsTexto')) document.getElementById('coinsTexto').textContent = coins >= 999999999 ? '✎ᝰ.ILIMITADO' : coins.toLocaleString('pt-BR');

const valEl = document.getElementById('validadeTexto');
const ehPermanente = String(p.validadePlano || '').toUpperCase() === 'PERMANENTE';
if (valEl) {
valEl.innerHTML = ehPermanente 
? `<svg class="dt-icone" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> VALIDADE PERMANENTE` 
: `${p.validadePlano || '—'}`;
valEl.classList.toggle('dt-perm', ehPermanente);
}

if (msgArea) {
if (p.plano === 'Teste') { msgArea.className = 'dt-mensagem msg-teste'; msgArea.textContent = '⚜ Plano Teste ativo'; }
    else if (ehPermanente) { msgArea.className = 'dt-mensagem msg-permanente'; msgArea.textContent = '♛ Plano Permanente'; }
    else { msgArea.className = 'dt-mensagem msg-bemvindo'; msgArea.textContent = `✪ Bem-vindo(a), ${(p.nome || 'Usuário').split(' ')[0]}!`; }
}
}

//➪ Permissões 
function preencherPermissoes(cargo = '') {
const menu = document.getElementById('menuPermissoes');
if (!menu) return;

cargo = String(cargo).toLowerCase();
let m = '';

//➪ Ícones Padrão
const coroa = `<svg class="dt-icone" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
const escudo = `<svg class="dt-icone" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>`;
const suporteIcone = `<svg class="dt-icone" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>`;
const paletaIcone = `<svg class="dt-icone" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>`;

//➪ Itens Básicos
m += `<div class="dt-menu-separador"></div>`;
m += `<a href="/tema" class="dt-menu-item">${paletaIcone} Loja de Temas</a>`;

//➪ Somente Dono E Suporte
if (cargo === 'dono' || cargo === 'suporte') {
m += `<div class="dt-menu-separador"></div>`;
m += `<a href="/painel-suporte2" class="dt-menu-item">${suporteIcone} Painel Suporte</a>`;
}

//➪ Somente Dono E Administrador
if (cargo === 'dono' || cargo === 'adm') {
m += `<div class="dt-menu-separador"></div>`;
m += `<a href="/adm" class="dt-menu-item">${escudo} Painel Administrativo</a>`;
}

//➪ Somente Dono
if (cargo === 'dono') {
m += `<div class="dt-menu-separador"></div>`;
m += `<a href="/dono" class="dt-menu-item">${coroa} Painel do Dono</a>`;
}

menu.innerHTML = m;
}

//➪ Ranking
function preencherRanking(lista) {
const ul = document.getElementById('listaRanking');
if (!ul || !Array.isArray(lista)) return;
ul.innerHTML = '';
lista.forEach((user, i) => {
const posicao = i + 1;
const medalha = posicao === 1 ? '🥇' : posicao === 2 ? '🥈' : posicao === 3 ? '🥉' : `#${posicao}`;
const fotoRank = user.fotoPerfil || "/logo";
ul.innerHTML += `
    <li>
<span class="dt-rank-posicao">${medalha}</span>
        <div class="dt-avatar-wrapper">
          <div class="dt-aureola"></div>
          <div class="dt-asas"><div class="dt-asa dt-asa-esq"></div><div class="dt-asa dt-asa-dir"></div></div>
          <div class="dt-rank-avatar" style="background-image: url('${fotoRank}');"></div>
        </div>
        <div class="dt-rank-info">
          <div class="dt-rank-nome">${user.nome || '—'}</div>
          <div class="dt-rank-detalhes">${user.nivel || 0} • <span class="dt-rank-patente">${user.patente || '—'}</span></div>
        </div>
        <span class="dt-rank-req">${(user.techCoins || 0).toLocaleString('pt-BR')} TechCoins</span>
      </li>`;
  });
}

//➪ Logout
function sair() {
localStorage.removeItem('tosh_tech');
localStorage.removeItem('emailUsuario');
localStorage.removeItem('usuario');
sessionStorage.clear();
window.location.href = '/';
}

//➪ Configurações
function aplicarConfiguracoes() {
if (document.getElementById('titulo-pagina')) {
document.getElementById('titulo-pagina').textContent = `${config.nomeApi || 'Painel'} ${config.versao || ''}`.trim();
}
if (document.getElementById('icone-site')) document.getElementById('icone-site').href = '/logo';
const elementoCredito = document.getElementById('creditos-sistema');
if (elementoCredito) {
elementoCredito.textContent = `${config.nomeApi || 'Sistema'} v${config.versao || '2.0'} • Criado por ${config.criador || 'Desenvolvedor'}`;
}
console.log('[CONFIG] Aplicadas:', config);
}

//➪ Logos
function aplicarLogosSistema() {
const logoCabecalho = document.getElementById('logo-cabecalho');
if (logoCabecalho) logoCabecalho.src = '/logo';
const logoMenu = document.getElementById('logo-menu-lateral');
if (logoMenu) logoMenu.src = '/logo';
}
