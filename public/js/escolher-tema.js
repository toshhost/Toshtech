/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Criador『Tosh』༻
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
console.log('⚙️ Escolher Tema | Tosh Tech');

//➪ Autenticação Padrão Do Sistema
let token = localStorage.getItem('tosh_tech') || localStorage.getItem('emailUsuario') || sessionStorage.getItem('tosh_tech') || '';
console.log('🔐 Sessão carregada:', { token });

//➪ Elementos Da Página 
const lista = document.getElementById('lista');
const mostraSaldo = document.getElementById('mostraSaldo');
const avisoSalvo = document.getElementById('avisoSalvo');
const fundoConfirm = document.getElementById('fundoConfirm');
const textoConfirm = document.getElementById('textoConfirm');
const btnCancelar = document.getElementById('btnCancelar');
const btnConfirmar = document.getElementById('btnConfirmar');

//➪ Variáveis
let temasCarregados = [];
let temaParaConfirmar = null;

//➪ Inicialização
document.addEventListener('DOMContentLoaded', async () => {
  
if (!token || !token.includes('@')) {
mostrarAviso('Faça login primeiro!', false);
setTimeout(() => window.location.href = '/', 2500);
return;
}
await carregarDadosUsuario();
await carregarListaTemas();
configurarBotoesConfirmacao();
});

//➪ Carregar Dados Do Usuário
async function carregarDadosUsuario() {
try {
const res = await fetch('/api/dados-usuario', {
headers: { 'tosh_tech': token.trim().toLowerCase() }
});

if (!res.ok) throw new Error('Não foi possível carregar dados');
const dados = await res.json();
        
if (!dados.sucesso) throw new Error(dados.erro || 'Acesso negado');
mostraSaldo.innerHTML = `
<svg class="icone-pequeno" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V19h-2.82v-1.92c-1.53-.32-2.84-1.46-3.01-2.92-.24-2.01 1.11-3.78 3.42-4.24v-.83h2.82v.79c1.98.25 3.42 1.55 3.42 3.31 0 1.78-1.28 3.28-3.85 3.9z"/>
            </svg>
Saldo: ${dados.perfil.techCoins || 0} TechCoins
        `;
return dados.perfil;
} catch (erro) {
console.error('❌ Erro:', erro);
mostraSaldo.innerHTML = `
<svg class="icone-pequeno" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V19h-2.82v-1.92c-1.53-.32-2.84-1.46-3.01-2.92-.24-2.01 1.11-3.78 3.42-4.24v-.83h2.82v.79c1.98.25 3.42 1.55 3.42 3.31 0 1.78-1.28 3.28-3.85 3.9z"/>
            </svg>
Saldo: --- TechCoins
        `;
return { techCoins: 0, temasComprados: [], temaAtual: 'ToshTech' };
}
}

//➪ Carregar Catálogo De Temas
async function carregarListaTemas() {
if (!lista) return;
lista.innerHTML = `
<p class="mensagem">
<svg class="icone-grande" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
<path d="M12 2v20M2 12h20"/>
            </svg>
Carregando temas...
        </p>
    `;
try {
const [resTemas, resUsuario] = await Promise.all([
fetch('/api/listar-temas', {
headers: { 'tosh_tech': token.trim().toLowerCase() }
}),
fetch('/api/dados-usuario', {
headers: { 'tosh_tech': token.trim().toLowerCase() }
})
]);

const dadosTemas = await resTemas.json();
const dadosUsuario = await resUsuario.json();

if (!dadosTemas.sucesso || !dadosTemas.catalogo?.length) {
lista.innerHTML = `
<p class="mensagem">
<svg class="icone-grande" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
<path d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
                    </svg>
Nenhum tema disponível.
                </p>
            `;
return;
}

temasCarregados = dadosTemas.catalogo;
const perfil = dadosUsuario.perfil || {};
const temasComprados = perfil.temasComprados || [];
const temaAtual = perfil.temaAtual || 'ToshTech';

lista.innerHTML = '';
temasCarregados.forEach(tema => {
const eGratis = Number(tema.valor) <= 0;
const temEsse = temasComprados.includes(tema.id) || eGratis;
const eAtual = temaAtual === tema.id;

const card = document.createElement('div');
card.className = `card ${eAtual ? 'ativo' : ''} ${!temEsse && !eGratis ? 'bloqueado' : ''}`;
card.dataset.id = tema.id;
            
const imagem = tema.imagem || `/assets/temas/${tema.id}/preview.jpg`;
            
card.innerHTML = `
${eAtual ? `
<span class="etiqueta ativo">
<svg class="icone-pequeno" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
<path d="M20 6L9 17l-5-5"/>
                        </svg>
                        Ativo
                    </span>
                ` : ''}
${eGratis ? `
<span class="etiqueta gratis">
<svg class="icone-pequeno" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
<path d="M12 2v20M2 12h20"/>
                        </svg>
                        Gratuito
                    </span>
                ` : ''}
${!temEsse && !eGratis ? `
<span class="etiqueta padrao">
<svg class="icone-pequeno" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
<path d="M3 10h18M7 15h10M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"/>
                        </svg>
                        Comprar
                    </span>
                ` : ''}
${temEsse && !eAtual ? `
<span class="etiqueta tem">
<svg class="icone-pequeno" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
<path d="M20 7h-9M20 11h-9M20 15h-9M4 7h1v10H4z"/>
                        </svg>
                        Disponível
                    </span>
                ` : ''}
${!temEsse && !eGratis ? `
<span class="icone-cadeado">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                            <path d="M7 11V7a5 5 0 0110 0v4"/>
                        </svg>
                    </span>
                ` : ''}
                <img src="${imagem}" alt="${tema.nome}" class="img-tema" loading="lazy">
                <h3 class="nome">${tema.nome}</h3>
                <p class="preco ${eGratis ? 'gratis' : ''}">
                    ${eGratis ? 'Gratuito' : `${tema.valor} TechCoins`}
                </p>
            `;
card.addEventListener('click', () => acaoNoCard(tema, temEsse));
lista.appendChild(card);
});
} catch (erro) {
console.error('❌ Erro:', erro);
lista.innerHTML = `
            <p class="mensagem">
                <svg class="icone-grande" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
                Erro ao carregar temas.
            </p>
        `;
    }
}

//➪ Ações Dos Temas
function acaoNoCard(tema, temEsse) {
if (temEsse) {
abrirConfirmacao(`Quer ativar: <strong>${tema.nome}</strong>?`, 'ativar', tema);
} else {
abrirConfirmacao(`Quer comprar: <strong>${tema.nome}</strong><br>por <strong>${tema.valor} TechCoins</strong>?`, 'comprar', tema);
}
}

function abrirConfirmacao(texto, tipo, tema) {
if (!textoConfirm || !fundoConfirm) return;
textoConfirm.innerHTML = texto;
temaParaConfirmar = { ...tema, tipo };
fundoConfirm.classList.add('aberto');
}

function configurarBotoesConfirmacao() {
if (!btnCancelar || !btnConfirmar) return;

btnCancelar.addEventListener('click', () => {
fundoConfirm.classList.remove('aberto');
temaParaConfirmar = null;
});

btnConfirmar.addEventListener('click', async () => {
if (!temaParaConfirmar) return;
fundoConfirm.classList.remove('aberto');

if (temaParaConfirmar.tipo === 'ativar') {
await ativarTema(temaParaConfirmar.id);
} else {
await comprarTema(temaParaConfirmar.id);
}
temaParaConfirmar = null;
});
}

//➪ Ativar Tema — Tosh Tech
async function ativarTema(idTema) {
  try {
    // ✅ VALIDAÇÃO ANTES DE ENVIAR
    const token = localStorage.getItem('tosh_tech') || localStorage.getItem('emailUsuario') || '';
    if (!token.trim()) {
      mostrarAviso('Faça login primeiro para mudar o tema!', false);
      return;
    }
    if (!idTema || String(idTema).trim().length < 1) {
      mostrarAviso('Selecione um tema válido!', false);
      return;
    }

    // ✅ REQUISIÇÃO SEGURA
    const res = await fetch('/api/ativar-tema', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'tosh_tech': String(token).trim().toLowerCase()
      },
      body: JSON.stringify({ idTema: String(idTema).trim() })
    });

    const dados = await res.json();

    // ✅ EXIBE A MENSAGEM CORRETA
    mostrarAviso(dados.mensagem || dados.erro || 'Tema processado!', dados.sucesso);
        
    // ✅ RECARREGA SÓ SE DEU CERTO
    if (dados.sucesso) {
      setTimeout(() => location.reload(), 1200);
    }

  } catch (erro) {
    console.error('[ERRO ATIVAR TEMA]', erro);
    mostrarAviso('Erro de conexão — tente novamente!', false);
  }
}


async function comprarTema(idTema) {
try {
const res = await fetch('/api/comprar-tema', {
method: 'POST',
headers: { 
'Content-Type': 'application/json',
'tosh_tech': token.trim().toLowerCase()
},
body: JSON.stringify({ idTema })
});

const dados = await res.json();
const ok = dados.sucesso || false;
mostrarAviso(dados.mensagem || dados.erro || 'Erro', ok);

if (ok) setTimeout(async () => {
await carregarDadosUsuario();
await carregarListaTemas();
}, 1200);
} catch {
mostrarAviso('Erro de conexão!', false);
}
}

//➪ Mensagens
function mostrarAviso(texto, sucesso = true) {
if (!avisoSalvo) return;
avisoSalvo.innerHTML = `
<svg class="icone-pequeno" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
${sucesso ? '<path d="M20 6L9 17l-5-5"/>' : '<path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>'}
        </svg>
${texto}
    `;
avisoSalvo.style.borderColor = sucesso ? '#c85a97' : '#900020';
avisoSalvo.style.color = sucesso ? '#f8d7e8' : '#ffb6c1';
avisoSalvo.classList.add('mostrar');
    
clearTimeout(avisoSalvo.timer);
avisoSalvo.timer = setTimeout(() => avisoSalvo.classList.remove('mostrar'), 3500);
}
