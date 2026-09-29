/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Criador『Tosh』༻
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
console.log('Painel Tosh Tech | Carregado');

//➪ Autenticação
let token = localStorage.getItem('tosh_tech') || localStorage.getItem('emailUsuario') || sessionStorage.getItem('tosh_tech') || '';
let cargo = localStorage.getItem('cargoUsuario') || sessionStorage.getItem('cargoUsuario') || '';
console.log('🔐 Dados da sessão:', { token, cargo });

//➪ Configurações
var config = {};
fetch('/api/config')
.then(resp => resp.json())
.then(dados => { config = dados; })
.catch(() => { config = { NomeApi: 'TOSH TECH', Versao: '2.0' }; });

//➪ Efeito De Partículas
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

let listaGeral = [];

document.addEventListener('DOMContentLoaded', async () => {
criarParticulas();

//➪ Validação de sessão
if (!token || !token.includes('@')) {
mostrarMensagem('🔒 Faça login primeiro!', 'erro');
setTimeout(() => window.location.href = '/', 3000);
return;
}
if (String(cargo).toLowerCase() !== 'dono') {
mostrarMensagem('🚫 Acesso restrito ao Dono!', 'erro');
setTimeout(() => window.location.href = '/dashboard', 3000);
return;
}
await carregarTodosUsuarios();
});

//➪ CARREGAR TODOS OS USUÁRIOS
async function carregarTodosUsuarios() {
try {
mostrarMensagem('Carregando dados...', 'info');
const res = await fetch('/api/userinfo', {
credentials: 'same-origin',
headers: { 
'Accept': 'application/json',
'tosh_tech': token.trim().toLowerCase() 
}
});
const dados = await res.json();
if (!dados.sucesso) throw new Error(dados.erro || 'Erro ao listar usuários');
        
listaGeral = dados.dados || [];
document.getElementById('qtdTotal').textContent = listaGeral.length;

renderizarParcerias();
renderizarListaUsuarios();
        
mostrarMensagem('✅ Dados carregados com sucesso!', 'sucesso');
} catch (erro) {
console.error('❌ Erro no carregamento:', erro);
mostrarMensagem(erro.message, 'erro');
document.getElementById('listaUsuarios').innerHTML = `<p class="texto-aviso">${erro.message}</p>`;
}
}

//➪ Renderizar Parcerias 
function renderizarParcerias() {
const container = document.getElementById('listaParcerias');
const sessaoParcerias = document.getElementById('sessaoParcerias');
    
if (!container || !sessaoParcerias) return;

const parceriasPendentes = listaGeral.filter(u => u.parceria?.status === 'pendente');
document.getElementById('qtdParcerias').textContent = parceriasPendentes.length;

if (parceriasPendentes.length === 0) {
sessaoParcerias.style.display = 'none';
return;
}

sessaoParcerias.style.display = 'block';
container.innerHTML = '';

parceriasPendentes.forEach(usuario => {
const parceria = usuario.parceria;
const card = document.createElement('div');
card.className = 'card-parceria';
card.innerHTML = `
<div class="parceria-cabecalho">
<div class="parceria-foto" style="background-image:url('${usuario.fotoPerfil || '/logo'}')"></div>
<div class="parceria-dados">
<h4>${usuario.nome || 'Usuário sem nome'}</h4>
<p>${usuario.email}</p>
                </div>
            </div>

            <div class="parceria-info">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
Solicitado em: ${new Date(parceria.data_solicitacao || Date.now()).toLocaleString('pt-BR')}
            </div>

${parceria.nome_empresa ? `
<div class="parceria-info">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9,22 9,12 15,12 15,22"/>
                </svg>
${parceria.nome_empresa}
            </div>` : ''}

${parceria.descricao ? `<div class="parceria-descricao">${parceria.descricao}</div>` : ''}

${parceria.imagem ? `
<a href="${parceria.imagem}" target="_blank" class="link-imagem">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21,15 16,10 5,21"/>
                </svg>
                Ver arte/imagem
            </a>` : ''}

            <div class="botoes-parceria">
                <button onclick="gerenciarParceria('${usuario.email}', 'aprovado')" class="btn-aprovar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20,6 9,17 4,12"/>
                    </svg>
                    Aprovar
                </button>
                <button onclick="gerenciarParceria('${usuario.email}', 'recusado')" class="btn-recusar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                    Recusar
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

//➪ Ação De Aprovar/recusar Parceria
async function gerenciarParceria(emailUsuario, acao) {
if (!confirm(`Tem certeza que deseja ${acao === 'aprovado' ? 'APROVAR' : 'RECUSAR'} essa parceria?`)) return;

try {
mostrarMensagem('Processando solicitação...', 'info');
const res = await fetch('/gerenciar-parceria', {
method: 'POST',
credentials: 'same-origin',
headers: {
'Content-Type': 'application/json',
'tosh_tech': token.trim().toLowerCase()
},
body: JSON.stringify({ email_usuario: emailUsuario, acao })
});
const r = await res.json();
        
if (r.sucesso) {
mostrarMensagem(r.mensagem || '✅ Operação concluída!', 'sucesso');
await carregarTodosUsuarios();
} else {
mostrarMensagem(r.erro || 'Erro ao processar', 'erro');
}
} catch {
mostrarMensagem('Falha na conexão com o servidor', 'erro');
}
}

//➪ Renderizar Lista De Usuários 
function renderizarListaUsuarios() {
const container = document.getElementById('listaUsuarios');
container.innerHTML = '';

if (listaGeral.length === 0) {
container.innerHTML = `<p class="texto-aviso">Nenhum usuário cadastrado no sistema</p>`;
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
                        ${temParceria ? `
                        <svg style="width:16px;height:16px;color:#FBBF24;vertical-align:middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                            <rect x="8" y="2" width="8" height="4" rx="1"/>
                        </svg>` : ''}
                    </h4>
                    <span>${usuario.email || '—'} • ${usuario.plano || 'Sem plano'}</span>
                </div>
                <span class="cargo-tag ${cargoUser}">${cargoUser.toUpperCase()}</span>
            </div>
        `;
container.appendChild(card);
});
}

//➪ Carregar Dados Para Edição
function carregarParaEdicao(usuario) {
document.getElementById('formEditar').classList.add('visivel');
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

window.scrollTo({ top: document.getElementById('formEditar').offsetTop - 20, behavior: 'smooth' });
}

//➪ Salvar Edição
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

if (!dados.nome || !dados.email) return mostrarMensagem('Preencha nome e e-mail corretamente!', 'erro');

try {
mostrarMensagem('Salvando alterações...', 'info');
const res = await fetch('/api/usuario/editar', {
method: 'POST',
credentials: 'same-origin',
headers: { 
'Content-Type': 'application/json', 
'tosh_tech': token.trim().toLowerCase() 
},
body: JSON.stringify(dados)
});
const r = await res.json();
if (r.sucesso) {
mostrarMensagem('✅ Alterações salvas!', 'sucesso');
await carregarTodosUsuarios();
} else {
mostrarMensagem(r.erro || 'Erro ao salvar', 'erro');
}
} catch {
mostrarMensagem('Falha na conexão', 'erro');
}
}

//➪ Excluir Usuário
async function confirmarExclusao() {
const email = document.getElementById('emailOriginal').value;
if (!email) return mostrarMensagem('Selecione um usuário primeiro!', 'erro');
if (!confirm(`⚠️ EXCLUIR PERMANENTEMENTE?\nUsuário: ${email}\nEssa ação não pode ser desfeita!`)) return;

try {
mostrarMensagem('Excluindo usuário...', 'info');
const res = await fetch('/api/usuario/excluir', {
method: 'POST',
credentials: 'same-origin',
headers: { 
'Content-Type': 'application/json', 
'tosh_tech': token.trim().toLowerCase() 
},
body: JSON.stringify({ email })
});
const r = await res.json();
if (r.sucesso) {
mostrarMensagem('✅ Usuário excluído com sucesso!', 'sucesso');
document.getElementById('formEditar').classList.remove('visivel');
await carregarTodosUsuarios();
} else {
mostrarMensagem(r.erro || 'Erro ao excluir', 'erro');
}
} catch {
mostrarMensagem('Falha na conexão', 'erro');
}
}

//➪ Função De Mensagens
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
