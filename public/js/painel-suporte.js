/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Criador『Tosh』༻
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
console.log('⚙️ Painel Suporte | Tosh Tech | VERSÃO CORRIGIDA');

//➪ Autenticação Padrão Do Sistema
let token = localStorage.getItem('tosh_tech') || localStorage.getItem('emailUsuario') || sessionStorage.getItem('tosh_tech') || '';
let cargo = localStorage.getItem('cargoUsuario') || sessionStorage.getItem('cargoUsuario') || '';
console.log('🔐 Sessão carregada:', { token, cargo });

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

//➪ Função Para Evitar Valores Indefinidos
function tratarValor(valor, padrao = '—') {
return valor === undefined || valor === null || valor === '' ? padrao : valor;
}

//➪ Modal De Confirmação 
async function confirmarAcao(titulo, mensagem, textoBtnConfirmar = 'CONFIRMAR', textoBtnCancelar = 'CANCELAR', corBtnConfirmar = '#c5c5c5') {
return new Promise((res) => {
const modal = document.createElement('div');
modal.style.cssText = `position:fixed;inset:0;background:rgba(0,0,0,.85);display:flex;align-items:center;justify-content:center;z-index:99999;padding:15px;`;
modal.innerHTML = `
<div style="background:#0a0a0a;border:1px solid #333;border-radius:8px;padding:20px;max-width:360px;width:100%;box-shadow:0 0 25px rgba(197,197,197,.2);">
<h3 style="color:#c5c5c5;font-size:1.1rem;margin-bottom:10px;text-transform:uppercase;border-bottom:1px solid #222;padding-bottom:8px;">${titulo}</h3>
<p style="color:#888;font-size:.85rem;margin-bottom:20px;line-height:1.5;">${mensagem}</p>
<div style="display:flex;gap:10px;justify-content:flex-end;">
<button id="btnCancelar" style="padding:8px 16px;background:transparent;border:1px solid #c5c5c5;color:#c5c5c5;border-radius:6px;font-size:.85rem;cursor:pointer;transition:.2s;">${textoBtnCancelar}</button>
<button id="btnConfirmar" style="padding:8px 16px;background:${corBtnConfirmar};color:#000;border:none;border-radius:6px;font-size:.85rem;font-weight:700;cursor:pointer;transition:.2s;">${textoBtnConfirmar}</button>
                </div>
            </div>
        `;
document.body.appendChild(modal);
modal.querySelector('#btnCancelar').onclick = () => { modal.remove(); res(false); };
modal.querySelector('#btnConfirmar').onclick = () => { modal.remove(); res(true); };
});
}

document.addEventListener('DOMContentLoaded', async () => {
criarParticulas();

//➪ Validação De Acesso
if (!token || !token.includes('@')) {
mostrarMensagem('FAÇA LOGIN PRIMEIRO!', 'erro');
setTimeout(() => window.location.href = '/', 3000);
return;
}
if (!['dono','suporte'].includes(String(cargo).toLowerCase())) {
mostrarMensagem('ACESSO PERMITIDO APENAS AO DONO E EQUIPE DE SUPORTE!', 'erro');
setTimeout(() => window.location.href = '/dashboard', 3000);
return;
}

await carregarPainel();
setInterval(carregarPainel, 300000);
});

//➪ Carregar Dados Da Api
async function carregarPainel(){
try{
mostrarMensagem('CARREGANDO INFORMAÇÕES...', 'info');
const res = await fetch('/painel-suporte', { headers: { 'tosh_tech': token.trim().toLowerCase() } });
const t = await res.json();
if(!t.sucesso) throw new Error(t.erro || 'Erro ao carregar dados');

let html = '';

//➪ Alertas De Vencimento
if(t.alertasVencimento?.length > 0){
html += `<div class="card"><h2>
<svg viewBox="0 0 24 24" fill="currentColor" style="width:20px;height:20px;margin-right:8px;"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
ALERTAS DE VENCIMENTO</h2>`;
t.alertasVencimento.forEach(item => {
const classe = item.diasRestantes <= 0 ? 'alerta-vencido' : 'alerta-vencendo';
const textoDias = item.diasRestantes < 0 
? `JÁ VENCEU HÁ ${Math.abs(item.diasRestantes)} DIAS` 
: item.diasRestantes === 0 
? 'VENCE HOJE' 
: `VENCE EM ${item.diasRestantes} DIAS`;
html += `<div class="alerta-lista ${classe}"><strong>${tratarValor(item.nome)}</strong> (${tratarValor(item.email)}) — PLANO: ${tratarValor(item.plano)} — ${textoDias}</div>`;
});
html += `</div>`;
}

//➪ Parcerias Pendentes
html += `<div class="card"><h2>
<svg viewBox="0 0 24 24" fill="currentColor" style="width:20px;height:20px;margin-right:8px;"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
PARCERIAS PENDENTES (${tratarValor(t.totalParceriasPendentes, 0)})</h2>`;
if(!t.parceriasPendentes?.length) {
html += `<p class="texto-aviso">NENHUMA SOLICITAÇÃO AGUARDANDO ANÁLISE</p>`;
} else {
html += `<p style="color:#888">${tratarValor(t.totalParceriasPendentes, 0)} SOLICITAÇÕES NA FILA</p>`;
}
html += `</div>`;

//➪ Rendimento De Vendas
const rend = t.rendimentoVendas || {};
html += `<div class="card"><h2>
<svg viewBox="0 0 24 24" fill="currentColor" style="width:20px;height:20px;margin-right:8px;"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>
RENDIMENTO DE VENDAS</h2>
<div class="grid">
<div class="grid-item"><p class="rotulo">TOTAL PAGANTES</p><p class="valor">${tratarValor(rend.totalPagantes, 0)}</p></div>
<div class="grid-item"><p class="rotulo">FAIXA BAIXA</p><p class="valor">${tratarValor(rend.baixa?.quantidade, 0)} — R$ ${tratarValor((rend.baixa?.valorTotal || 0).toFixed(2), '0.00')}</p></div>
 <div class="grid-item"><p class="rotulo">FAIXA ALTA</p><p class="valor">${tratarValor(rend.alta?.quantidade, 0)} — R$ ${tratarValor((rend.alta?.valorTotal || 0).toFixed(2), '0.00')}</p></div>
<div class="grid-item"><p class="rotulo">TOTAL GERAL</p><p class="valor">R$ ${tratarValor((rend.valorGeral || 0).toFixed(2), '0.00')}</p></div>
        </div></div>`;

//➪ Lista De Usuários
html += `<div class="card"><h2>
<svg viewBox="0 0 24 24" fill="currentColor" style="width:20px;height:20px;margin-right:8px;"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
USUÁRIOS (TOTAL: ${tratarValor(t.totalUsuarios, 0)})</h2>
<table><tr>
<th>NOME</th><th>E-MAIL</th><th>CARGO</th><th>PLANO</th><th>VALIDADE</th><th>DIAS</th><th>AÇÃO</th>
        </tr>`;
 (t.listaUsuarios || []).forEach(item => {
html += `<tr>
-<td>${tratarValor(item.nome)}</td>
<td>${tratarValor(item.email)}</td>
<td><span class="cargo ${tratarValor(item.cargo, 'usuario')}">${String(tratarValor(item.cargo, 'USUÁRIO')).toUpperCase()}</span></td>
<td>${tratarValor(item.plano)}</td>
<td>${tratarValor(item.validadePlano)}</td>
<td>${tratarValor(item.diasRestantesPlano >= 0 ? item.diasRestantesPlano : 'VENCIDO')}</td>
<td><button onclick="abrirRenovarPlano('${tratarValor(item.email, '')}','${tratarValor(item.plano, '')}')">ALTERAR</button></td>
            </tr>`;
        });
html += `</table></div>`;

//➪ Recados E Promoções 
html += `<div class="card"><h2>
<svg viewBox="0 0 24 24" fill="currentColor" style="width:20px;height:20px;margin-right:8px;"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
RECADOS E PROMOÇÕES (${tratarValor(t.recados?.length, 0)})</h2>`;
if(!t.recados?.length) {
html += `<p class="texto-aviso">Nenhum recado publicado ainda</p>`;
} else {
t.recados.forEach(r => {
const configTipo = {
promocao: { icone: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg>', classe: 'tipo-promocao' },
aviso: { icone: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>', classe: 'tipo-aviso' },
manutencao: { icone: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></svg>', classe: 'tipo-manutencao' },
novidade: { icone: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>', classe: 'tipo-novidade' },
recado: { icone: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>', classe: 'tipo-recado' }
}[tratarValor(r.tipo, 'recado')] || { icone: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>', classe: 'tipo-recado' };

html += `<div class="recado-item ${configTipo.classe}">
<div class="recado-cabecalho">
<span style="display:flex;align-items:center;gap:6px;">${configTipo.icone}<strong>${tratarValor(r.titulo)}</strong></span>
<small>${tratarValor(r.data)} • ${tratarValor(r.autor)}</small>
                    </div>
<p class="recado-texto">${tratarValor(r.mensagem)}</p>
<button class="btn-pequeno vermelho" onclick="excluirRecado(${tratarValor(r.id, 0)})">EXCLUIR</button>
                </div>`;
            });
        }
html += `</div>`;

//➪ Arquivos E Ferramentas
html += `<div class="card"><h2>
<svg viewBox="0 0 24 24" fill="currentColor" style="width:20px;height:20px;margin-right:8px;"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>
ARQUIVOS DE SUPORTE</h2>`;
if(!t.arquivosSuporte?.length) {
html += `<p class="texto-aviso">NENHUM ARQUIVO ENVIADO</p>`;
} else {
html += `<div class="arquivos">`;
t.arquivosSuporte.forEach(arq => html += `<a href="${tratarValor(arq.link, '#')}" target="_blank">${tratarValor(arq.nome)}</a>`);
html += `</div>`;
}
html += `<div style="margin-top:15px"><button class="vermelho" onclick="limparLogs()">LIMPAR LOGS</button></div></div>`;

//➪ Registros E Logs 
html += `<div class="card"><h2>
<svg viewBox="0 0 24 24" fill="currentColor" style="width:20px;height:20px;margin-right:8px;"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
REGISTROS</h2>
<div style="margin-bottom:15px">
<h3 style="font-size:.9rem;margin-bottom:8px">ACESSOS (ÚLTIMOS 15)</h3>
<div class="logs">${!t.acessosPainel?.length 
? '<p class="texto-aviso">NENHUM REGISTRO</p>' 
: t.acessosPainel.map(l => `<div class="log-item">
${tratarValor(l.data)} — ${tratarValor(l.email)} 
<span class="cargo ${tratarValor(l.cargo, 'usuario')}">${String(tratarValor(l.cargo, 'USUÁRIO')).toUpperCase()}</span> 
— IP: ${tratarValor(l.ip)}
</div>`).join('')}</div>
        </div>
        <div>
<h3 style="font-size:.9rem;margin-bottom:8px">INTERAÇÕES (ÚLTIMAS 20)</h3>
<div class="logs">${!t.logs?.length 
? '<p class="texto-aviso">NENHUM REGISTRO</p>' 
: t.logs.map(l => `<div class="log-item">${tratarValor(l)}</div>`).join('')}</div>
        </div></div>`;

document.getElementById('conteudo').innerHTML = html;
mostrarMensagem('DADOS CARREGADOS COM SUCESSO!', 'sucesso');

} catch (erro) {
console.error('ERRO NO CARREGAMENTO:', erro);
document.getElementById('conteudo').innerHTML = `<div class="card erro">${String(tratarValor(erro.message, 'Erro desconhecido')).toUpperCase()}</div>`;
mostrarMensagem(`ERRO: ${tratarValor(erro.message, 'Erro desconhecido')}`, 'erro');
}
}

// Abre Seleção De Plano Com Modal Personalizado
async function abrirRenovarPlano(email, planoAtual){
try {
const res = await fetch('/painel-suporte', { headers: { 'tosh_tech': token } });
const dados = await res.json();
const planos = dados.planos || [];
if(!planos.length) return mostrarMensagem('PLANOS NÃO CARREGADOS!', 'erro');

const modal = document.createElement('div');
modal.style.cssText = `position:fixed;inset:0;background:rgba(0,0,0,.85);display:flex;align-items:center;justify-content:center;z-index:99999;padding:15px;`;
modal.innerHTML = `
<div style="background:#0a0a0a;border:1px solid #333;border-radius:8px;padding:20px;max-width:380px;width:100%;box-shadow:0 0 25px rgba(197,197,197,.2);">
<h3 style="color:#c5c5c5;font-size:1.1rem;margin-bottom:12px;text-transform:uppercase;border-bottom:1px solid #222;padding-bottom:8px;">ALTERAR PLANO</h3>
<p style="color:#888;font-size:.85rem;margin-bottom:15px;">PLANO ATUAL: <strong style="color:#c5c5c5;">${tratarValor(planoAtual)}</strong></p>
<label style="display:block;color:#c5c5c5;font-size:.85rem;margin-bottom:6px;">SELECIONE O NOVO PLANO:</label>
<select id="novoPlanoSelect" style="width:100%;padding:10px;background:#050505;border:1px solid #333;border-radius:6px;color:#c5c5c5;font-size:.9rem;margin-bottom:18px;outline:none;">
${planos.map(p => `<option value="${tratarValor(p.nome)}" ${p.nome === planoAtual ? 'selected' : ''}>${tratarValor(p.nome)}</option>`).join('')}
                </select>
<div style="display:flex;gap:10px;justify-content:flex-end;">
<button id="btnCancelar" style="padding:8px 16px;background:transparent;border:1px solid #c5c5c5;color:#c5c5c5;border-radius:6px;font-size:.85rem;cursor:pointer;transition:.2s;">CANCELAR</button>
<button id="btnConfirmar" style="padding:8px 16px;background:#c5c5c5;color:#000;border:none;border-radius:6px;font-size:.85rem;font-weight:700;cursor:pointer;transition:.2s;">CONFIRMAR</button>
                </div>
            </div>
        `;
document.body.appendChild(modal);

modal.querySelector('#btnCancelar').onclick = () => modal.remove();
modal.querySelector('#btnConfirmar').onclick = () => {
const novoPlano = modal.querySelector('#novoPlanoSelect').value;
modal.remove();
alterarPlanoUsuario(email, novoPlano);
};
} catch (erro) {
mostrarMensagem(`ERRO AO CARREGAR PLANOS: ${tratarValor(erro.message)}`, 'erro');
}
}

//➪ Altera Plano Do Usuário
async function alterarPlanoUsuario(email, novoPlano){
try {
const res = await fetch(`/painel-suporte/usuario/${encodeURIComponent(email)}/plano`, {
method: 'PUT',
headers: { 'Content-Type': 'application/json', 'tosh_tech': token },
body: JSON.stringify({ novoPlano })
});
const dados = await res.json();
if(dados.sucesso){
mostrarMensagem(`PLANO ALTERADO PARA ${tratarValor(novoPlano)} COM SUCESSO!`, 'sucesso');
carregarPainel();
} else {
            mostrarMensagem(`${tratarValor(dados.erro, 'ERRO AO ALTERAR PLANO')}`, 'erro');
}
} catch (erro) {
mostrarMensagem(`ERRO: ${tratarValor(erro.message)}`, 'erro');
}
}

// Limpa Logs Com Modal De Confirmação
async function limparLogs(){
const confirmado = await confirmarAcao(
'LIMPAR LOGS',
'TEM CERTEZA? TODOS OS LOGS SERÃO APAGADOS PERMANENTEMENTE E NÃO PODERÃO SER RECUPERADOS!',
'SIM, LIMPAR',
'MANTER',
'#ef4444'
);
if(!confirmado) return;
try {
const res = await fetch('/painel-suporte/limpar-logs', { method: 'DELETE', headers: { 'tosh_tech': token } });
const dados = await res.json();
if(dados.sucesso){
mostrarMensagem('LOGS LIMPOS COM SUCESSO!', 'sucesso');
carregarPainel();
} else {
            mostrarMensagem(`${tratarValor(dados.erro)}`, 'erro');
}
} catch (erro) {
mostrarMensagem(`ERRO: ${tratarValor(erro.message)}`, 'erro');
}
}

//➪ Exclui Arquivo Com Modal De Confirmação
async function excluirArquivo(nomeArquivo){
const confirmado = await confirmarAcao(
'EXCLUIR ARQUIVO',
`TEM CERTEZA QUE QUER EXCLUIR O ARQUIVO "${tratarValor(nomeArquivo)}"?`,
'SIM, EXCLUIR',
'CANCELAR',
'#ef4444'
);
if(!confirmado) return;
try {
const res = await fetch(`/painel-suporte/arquivo/${encodeURIComponent(nomeArquivo)}`, {
method: 'DELETE',
headers: { 'tosh_tech': token }
});
const dados = await res.json();
        mostrarMensagem(tratarValor(dados.sucesso ? dados.mensagem : dados.erro), dados.sucesso ? 'sucesso' : 'erro');
carregarPainel();
} catch (erro) {
mostrarMensagem(`Erro: ${tratarValor(erro.message)}`, 'erro');
}
}

//➪ Publica Recado / Promoção
async function publicarRecado(){
const tipo = tratarValor(document.getElementById('tipoRecado')?.value, 'recado');
const titulo = tratarValor(document.getElementById('tituloRecado')?.value?.trim());
const mensagem = tratarValor(document.getElementById('mensagemRecado')?.value?.trim());

if(!titulo || !mensagem){
mostrarMensagem('Preencha título e mensagem!', 'erro');
  return;
}

try {
mostrarMensagem('ENVIANDO RECADO...', 'info');
const res = await fetch('/painel-suporte/recado', {
method: 'POST',
headers: { 'Content-Type': 'application/json', 'tosh_tech': token },
body: JSON.stringify({ tipo, titulo, mensagem })
});
const dados = await res.json();
  
if(dados.sucesso){
mostrarMensagem(tratarValor(dados.mensagem), 'sucesso');
document.getElementById('formRecado')?.reset();
carregarPainel();
} else {
mostrarMensagem(tratarValor(dados.erro), 'erro');
}
} catch (erro) {
mostrarMensagem(`Erro: ${tratarValor(erro.message)}`, 'erro');
}
}

//➪ Exclui Recado Com Modal De Confirmação
async function excluirRecado(id){
const confirmado = await confirmarAcao(
'EXCLUIR RECADO',
'TEM CERTEZA QUE QUER APAGAR ESSE RECADO? ELE NÃO APARECERÁ MAIS PARA OS USUÁRIOS!',
'SIM, EXCLUIR',
'CANCELAR',
'#ef4444'
);
if(!confirmado) return;
try {
const res = await fetch(`/painel-suporte/recado/${encodeURIComponent(id)}`, {
method: 'DELETE',
headers: { 'tosh_tech': token }
});
const dados = await res.json();
mostrarMensagem(tratarValor(dados.sucesso ? dados.mensagem : dados.erro), dados.sucesso ? 'sucesso' : 'erro');
carregarPainel();
} catch (erro) {
mostrarMensagem(`Erro: ${tratarValor(erro.message)}`, 'erro');
}
}

//➪ Exibe Mensagens De Alerta
function mostrarMensagem(texto, tipo = 'sucesso') {
const msg = document.getElementById('msg');
if (!msg) return;
msg.className = `alerta ${tratarValor(tipo, 'sucesso')}`;
msg.textContent = tratarValor(texto);
clearTimeout(window.timerMsg);
window.timerMsg = setTimeout(() => { msg.className = 'alerta'; msg.textContent = ''; }, 4500);
}
