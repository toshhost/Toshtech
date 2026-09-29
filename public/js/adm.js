/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Criador『Tosh』༻
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
let token = localStorage.getItem('tosh_tech') || localStorage.getItem('emailUsuario') || sessionStorage.getItem('tosh_tech') || '';
let cargo = '';
let listaGeral = [];

//➪ Funções Gerais
function mostrarMensagem(texto, tipo = 'sucesso') {
const msg = document.getElementById('msg');
if (!msg) return;
msg.className = `alerta ${tipo}`;
msg.textContent = texto;
clearTimeout(window.timerMsg);
window.timerMsg = setTimeout(() => {
msg.className = 'alerta';
msg.textContent = '';
}, 4500);
}

let acaoConfirmar = null;
function confirmarAcao(texto, funcao) {
acaoConfirmar = funcao;
const m = document.getElementById('modalTema');
document.getElementById('modalTitulo').textContent = '⚠️ Atenção';
document.getElementById('modalTexto').textContent = texto;
const b = document.getElementById('btnConfirmarModal');
b.style.display = 'inline-flex';
b.textContent = 'Confirmar';
b.onclick = () => {
fecharModal();
acaoConfirmar?.();
};
m.classList.add('mostrar');
}

function fecharModal() {
document.getElementById('modalTema').classList.remove('mostrar');
}

function criarParticulas() {
for(let i = 0; i < 35; i++) {
setTimeout(() => {
const p = document.createElement('div');
p.classList.add('particula-prata');
p.style.left = Math.random() * 100 + '%';
p.style.animationDuration = (Math.random() * 7 + 5) + 's';
p.style.animationDelay = Math.random() * 4 + 's';
document.body.appendChild(p);
}, i * 180);
}
}

//➪ Inicialização E Permissões
document.addEventListener('DOMContentLoaded', async () => {
criarParticulas();
if (!token || !token.includes('@')) {
mostrarMensagem('🔒 Faça login primeiro!', 'erro');
setTimeout(() => window.location.href = '/', 3000);
return;
}
try {
mostrarMensagem('Verificando permissão...', 'info');
const resPerfil = await fetch('/api/dashboard', {
headers: { 'tosh_tech': token.trim().toLowerCase() }
});
const dadosPerfil = await resPerfil.json();
if (!dadosPerfil.sucesso) throw new Error(dadosPerfil.erro || 'Não foi possível verificar seu acesso');
cargo = String(dadosPerfil.perfil.cargo).toLowerCase();
console.log('[PERMISSÃO] Cargo detectado:', cargo);

//➪ Verifica exatamente os cargos que você usa: dono e adm
if (!['dono', 'adm'].includes(cargo)) {
mostrarMensagem('🚫 Acesso restrito a Dono e Administrador!', 'erro');
setTimeout(() => window.location.href = '/dashboard', 3000);
return;
}

//➪ Restrições para ADM Funciona só se for adm 
if (cargo === 'adm') {
const campoCargo = document.getElementById('edtCargo');
if (campoCargo) {
campoCargo.disabled = true;
campoCargo.style.opacity = '0.7';
campoCargo.style.cursor = 'not-allowed';
}
const btnExcluir = document.getElementById('btnExcluir');
if (btnExcluir) btnExcluir.style.display = 'none';
const areaBotoes = document.getElementById('areaBotoes');
if (areaBotoes) areaBotoes.style.gridTemplateColumns = '1fr';
}

//➪ Agora carrega os dados do painel
await carregarDadosPainel();
} catch (erro) {
console.error('❌ ERRO DE INICIO:', erro);
mostrarMensagem(erro.message, 'erro');
}
});

//➪ Carregar Dados Da Rota
async function carregarDadosPainel() {
try {
mostrarMensagem('Carregando dados...', 'info');
const res = await fetch('/painel-adm', {
headers: { 'tosh_tech': token.trim().toLowerCase() }
});
const dados = await res.json();

if (!dados.sucesso) throw new Error(dados.erro || 'Erro ao carregar painel');
listaGeral = dados.listaUsuarios;
document.getElementById('qtdTotal').textContent = dados.totalUsuarios;
document.getElementById('qtdParcerias').textContent = dados.totalParceriasPendentes;

renderizarParcerias(dados.parceriasPendentes);
renderizarListaUsuarios();
mostrarMensagem('✅ Dados carregados com sucesso!', 'sucesso');
} catch (erro) {
console.error('Erro:', erro);
mostrarMensagem(erro.message, 'erro');
const lista = document.getElementById('listaUsuarios');
if (lista) lista.innerHTML = `<p class="texto-aviso">${erro.message}</p>`;
}
}

//➪ Renderizar Parcerias
function renderizarParcerias(parcerias) {
const container = document.getElementById('listaParcerias');
const sessao = document.getElementById('sessaoParcerias');
if (!container || !sessao) return;

if (!parcerias || parcerias.length === 0) {
sessao.style.display = 'none';
return;
}

sessao.style.display = 'block';
container.innerHTML = '';

parcerias.forEach(item => {
const card = document.createElement('div');
card.className = 'card-parceria';
card.innerHTML = `
<div class="parceria-cabecalho">
<div class="parceria-foto" style="background-image:url('${item.fotoPerfil || '/logo'}')"></div>
<div class="parceria-dados">
<h4>${item.nome_usuario || 'Usuário sem nome'}</h4>
<p>${item.email_usuario}</p>
                </div>
            </div>
            <div class="parceria-info">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
Solicitado em: ${item.data_solicitacao ? new Date(item.data_solicitacao).toLocaleString('pt-BR') : 'Data não informada'}
            </div>
${item.nome_projeto ? `
            <div class="parceria-info">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                </svg>
${item.nome_projeto}
            </div>` : ''}
${item.descricao ? `<div class="parceria-descricao">${item.descricao}</div>` : ''}
${item.imagem ? `
<a href="${item.imagem}" target="_blank" class="link-imagem">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                </svg>
                Ver imagem
            </a>` : ''}
<div class="botoes-parceria">
<button onclick="gerenciarParceria('${item.email_usuario}', 'aprovado')" class="btn-aprovar">Aprovar</button>
<button onclick="gerenciarParceria('${item.email_usuario}', 'recusado')" class="btn-recusar">Recusar</button>
            </div>
        `;
container.appendChild(card);
});
}

async function gerenciarParceria(emailUsuario, acao) {
confirmarAcao(`Tem certeza que deseja ${acao === 'aprovado' ? 'APROVAR' : 'RECUSAR'} essa parceria?`, async () => {
try {
mostrarMensagem('Processando...', 'info');
const res = await fetch('/gerenciar-parceria', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
'tosh_tech': token.trim().toLowerCase()
},
body: JSON.stringify({ email_usuario: emailUsuario, acao })
});
const r = await res.json();
if (r.sucesso) {
mostrarMensagem('✅ Concluído!', 'sucesso');
await carregarDadosPainel();
} else {
mostrarMensagem(r.erro || 'Erro', 'erro');
}
} catch {
mostrarMensagem('Falha na conexão', 'erro');
}
});
}

//➪ Lista De Usuários
function renderizarListaUsuarios() {
const container = document.getElementById('listaUsuarios');
if (!container) return;
container.innerHTML = '';
if (listaGeral.length === 0) {
container.innerHTML = `<p class="texto-aviso">Nenhum usuário cadastrado</p>`;
return;
}
listaGeral.forEach(usuario => {
const cargoUser = String(usuario.cargo || 'cliente').toLowerCase();
const foto = usuario.fotoPerfil || '/logo';
const temParceria = usuario.parceria?.status === 'pendente';
const card = document.createElement('div');
card.className = 'card-usuario';
card.onclick = () => carregarParaEdicao(usuario);
card.innerHTML = `
<div class="perfil-mini">
<div class="foto-mini" style="background-image:url('${foto}')"></div>
<div class="dados-mini">
                    <h4>
${usuario.nome || '— Sem nome —'}
${temParceria ? `<svg style="width:16px;height:16px;color:#FBBF24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>` : ''}
                    </h4>
<span>${usuario.email || '—'} • ${usuario.plano || 'Sem plano'}</span>
                </div>
<span class="cargo-tag ${cargoUser}">${cargoUser.toUpperCase()}</span>
            </div>
        `;
container.appendChild(card);
});
}

//➪ Edição De Usuário
function carregarParaEdicao(usuario) {
const form = document.getElementById('formEditar');
if (!form) return;
form.classList.add('visivel');
    
document.getElementById('emailOriginal').value = usuario.email || '';
document.getElementById('edtNome').value = usuario.nome || '';
document.getElementById('edtEmail').value = usuario.email || '';
document.getElementById('edtCargo').value = usuario.cargo || 'cliente';
document.getElementById('edtNivel').value = usuario.nivel || usuario.patente || '';
document.getElementById('edtPlano').value = usuario.plano || '';
document.getElementById('edtValidade').value = usuario.validadePlano || '';
document.getElementById('edtTechcoins').value = usuario.techCoins || 0;
document.getElementById('edtRequests').value = usuario.requestsRestantes || 0;
document.getElementById('edtChave').value = usuario.apiKey || '';
    
window.scrollTo({ top: form.offsetTop - 20, behavior: 'smooth' });
}

async function salvarEdicao() {
const dados = {
emailOriginal: document.getElementById('emailOriginal').value,
nome: document.getElementById('edtNome').value.trim(),
email: document.getElementById('edtEmail').value.trim(),
cargo: document.getElementById('edtCargo').value,
nivel: document.getElementById('edtNivel').value.trim(),
plano: document.getElementById('edtPlano').value.trim(),
validadePlano: document.getElementById('edtValidade').value.trim(),
techCoins: Number(document.getElementById('edtTechcoins').value),
requestsRestantes: Number(document.getElementById('edtRequests').value),
apiKey: document.getElementById('edtChave').value.trim()
};

if (!dados.nome || !dados.email) return mostrarMensagem('Preencha nome e e-mail!', 'erro');

try {
mostrarMensagem('Salvando...', 'info');
const res = await fetch('/api/usuario/editar', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
'tosh_tech': token.trim().toLowerCase()
},
body: JSON.stringify(dados)
});
const r = await res.json();
if (r.sucesso) {
mostrarMensagem('✅ Salvo com sucesso!', 'sucesso');
await carregarDadosPainel();
} else {
mostrarMensagem(r.erro || 'Erro ao salvar', 'erro');
}
} catch {
mostrarMensagem('Falha na conexão', 'erro');
}
}

//➪ Exclusão Somente Dono Vê E Usa
async function confirmarExclusao() {
const email = document.getElementById('emailOriginal').value;
if (!email) return mostrarMensagem('Selecione um usuário primeiro!', 'erro');

confirmarAcao(`⚠️ EXCLUIR PERMANENTEMENTE?\nUsuário: ${email}\nEssa ação não pode ser desfeita!`, async () => {
try {
mostrarMensagem('Excluindo...', 'info');
const res = await fetch('/api/usuario/excluir', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
'tosh_tech': token.trim().toLowerCase()
},
body: JSON.stringify({ email })
});
const r = await res.json();
if (r.sucesso) {
mostrarMensagem('✅ Excluído!', 'sucesso');
document.getElementById('formEditar').classList.remove('visivel');
await carregarDadosPainel();
} else {
mostrarMensagem(r.erro || 'Erro', 'erro');
}
} catch {
mostrarMensagem('Falha na conexão', 'erro');
}
});
}
