/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Criador『Tosh』༻
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
console.log('🔐 Sistema de Login Tosh Tech | Versão 2.1 | Carregado');

//➪ Cabeçalho De Autenticação
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

async function irPara(pagina) {
  var emailSalvo = localStorage.getItem('tosh_tech') || localStorage.getItem('emailUsuario') || '';
  try {
    var res = await fetch('/paginas/' + pagina, {
      headers: { 'tosh_tech': emailSalvo.trim().toLowerCase() }
    });
    var conteudo = await res.text();
    document.open();
    document.write(conteudo);
    document.close();
  } catch (erro) {
    console.error('Erro ao navegar:', erro);
    alert('Erro ao carregar página!');
  }
}

//➪ Carrega Dados Da Api 
var config = {};
fetch('/api/config')
  .then(function(resp) { return resp.json(); })
  .then(function(dados) {
    config = dados;
    aplicarConfiguracoes(); 
    console.log('⚙️ Configurações carregadas da API:', config.NomeApi);
  })
  .catch(function(e) {
    console.warn('⚠️ Usando configurações padrão:', e.message);
    config = { NomeApi: 'TOSH TECH', Criador: 'Tosh', Versao: '2.0' };
    aplicarConfiguracoes();
  });

//➪ Título da página
function aplicarConfiguracoes() {
  if (document.getElementById('titulo-pagina')) {
    document.getElementById('titulo-pagina').textContent = (config.NomeApi || 'TOSH TECH') + ' | Acesso';
  }

  //➪ Ícone e Logo 
  var icone = document.getElementById('icone-site');
  if (icone) icone.href = '/logo?v=' + Date.now();
  var logoImg = document.querySelector('.logo-img');
  if (logoImg) logoImg.src = '/logo?v=' + Date.now();

  //➪ Nome do sistema e créditos
  var nomeSistema = document.getElementById('nomeSistema');
  if (nomeSistema) nomeSistema.textContent = config.NomeApi || 'TOSH TECH';
  var creditos = document.getElementById('creditosSistema');
  if (creditos) creditos.innerHTML = 'Criado por <span>' + (config.Criador || 'Tosh') + '</span> • Versão <span>' + (config.Versao || '2.0') + '</span>';
}

//➪ Resto Das Funções 
function alternarVisu(icone, idCampo) {
  var campo = document.getElementById(idCampo);
  if (!campo || !icone) return;
  campo.type = campo.type === 'password' ? 'text' : 'password';
  icone.innerHTML = campo.type === 'text' 
    ? '<path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16c.57-.23 1.18-.36 1.82-.36zm-10.73-.73l2.79 2.78C2.67 10.59 1.43 12.77 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l2.74 2.74 1.41-1.41L2.68 4.86 1.27 6.27zm7.72 7.72l3.72-3.72c-.16-.44-.52-.8-1-.8-2.76 0-5 2.24-5 5 0 .48.1.92.28 1.32z"/>'
    : '<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>';
}

function mudarAba(nome) {
  document.querySelectorAll('.aba').forEach(function(a) { a.classList.toggle('ativa', a.dataset.aba === nome); });
  var formLogin = document.getElementById('formLogin');
  var formRegistro = document.getElementById('formRegistro');
  if (formLogin) formLogin.classList.toggle('oculto', nome !== 'login');
  if (formRegistro) formRegistro.classList.toggle('oculto', nome !== 'registro');
  ocultarMsg();
}

function mostrarMsg(texto, tipo) {
  tipo = tipo || 'erro';
  var el = document.getElementById('msg');
  if (!el) return;
  el.className = 'alerta ' + tipo;
  el.textContent = texto;
  el.classList.remove('oculto');
  console.log('📢 Mensagem:', tipo.toUpperCase(), '-', texto);
}

function ocultarMsg() {
  var el = document.getElementById('msg');
  if (el) el.classList.add('oculto');
}

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function estadoBotao(id, desabilitar, texto) {
  var btn = document.getElementById(id);
  if (!btn) return;
  btn.disabled = desabilitar;
  if (texto) btn.innerHTML = texto;
}

//➪ Partículas
var fundoParticulas = document.getElementById('fundoParticulas');
if (fundoParticulas) {
  for(var i = 0; i < 55; i++) {
    var p = document.createElement('div');
    p.classList.add('particula');
    var tam = Math.random() * 4.5 + 1.5;
    p.style.cssText = 'width:' + tam + 'px;height:' + tam + 'px;left:' + (Math.random()*100) + '%;animation-duration:' + (Math.random()*7+9) + 's;animation-delay:' + (Math.random()*11) + 's';
    fundoParticulas.appendChild(p);
  }
}

//➪ Captcha
var CARACTERES = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', codigoLogin = '', codigoCad = '';
function gerarCaptcha() {
  codigoLogin = Array.from({length:5}, () => CARACTERES[Math.floor(Math.random()*CARACTERES.length)]).join('');
  var el = document.getElementById('captchaTexto'); if (el) el.textContent = codigoLogin;
}
function gerarCaptchaCad() {
  codigoCad = Array.from({length:5}, () => CARACTERES[Math.floor(Math.random()*CARACTERES.length)]).join('');
  var el = document.getElementById('captchaTextoCad'); if (el) el.textContent = codigoCad;
}
gerarCaptcha(); gerarCaptchaCad();

//➪ Verificação de senhas
var senhaConfirma = document.getElementById('senhaConfirma'), senhaCad = document.getElementById('senhaCad');
if (senhaConfirma) senhaConfirma.addEventListener('input', verificarSenhas);
if (senhaCad) senhaCad.addEventListener('input', verificarSenhas);
function verificarSenhas() {
  var s1 = senhaCad ? senhaCad.value : '', s2 = senhaConfirma ? senhaConfirma.value : '';
  var caixa = document.getElementById('caixaSenha2'); if (!caixa) return;
  caixa.classList.remove('valido','invalido');
  if (s2) caixa.classList.add((s1 && s1 === s2) ? 'valido' : 'invalido');
}

//➪ Login
async function fazerLogin() {
  ocultarMsg();
  var email = document.getElementById('emailLogin')?.value.trim().toLowerCase() || '';
  var senha = document.getElementById('senhaLogin')?.value || '';
  var captcha = document.getElementById('respCaptchaLogin')?.value.trim().toUpperCase() || '';
  
  if (!validarEmail(email)) return mostrarMsg('Digite um e-mail válido!');
  if (!senha) return mostrarMsg('Digite sua senha!');
  if (captcha !== codigoLogin) { mostrarMsg('Código incorreto!'); gerarCaptcha(); document.getElementById('respCaptchaLogin').value=''; return; }
  
  estadoBotao('btnLogin', true, '⏳ Entrando...');
  try {
    var res = await fetch('/login', { 
      method: 'POST', 
      headers: {'Content-Type':'application/json'}, 
      body: JSON.stringify({email, senha}) 
    });
    var dados = await res.json();
    if (!dados.sucesso) { 
      mostrarMsg(dados.erro || 'Dados incorretos!'); 
      gerarCaptcha(); 
      document.getElementById('respCaptchaLogin').value=''; 
      return; 
    }
    
    localStorage.setItem('tosh_tech', dados.email.trim().toLowerCase());
    localStorage.setItem('emailUsuario', dados.email);
    localStorage.setItem('nomeUsuario', dados.nome || 'Tosh');
    localStorage.setItem('cargoUsuario', dados.cargo || 'cliente');
    localStorage.setItem('nivelUsuario', dados.nivel || 'Beta');
    
    mostrarMsg('✅ Login efetuado! Redirecionando...', 'sucesso');
    setTimeout(() => window.location.href = '/dashboard', 1200);
  } catch (err) { 
    mostrarMsg('Erro no servidor!'); 
  } finally { 
    estadoBotao('btnLogin', false, '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg> Entrar no Sistema'); 
  }
}

//➪ Cadastro
async function fazerRegistro() {
  ocultarMsg();
  var nome = document.getElementById('nomeCad')?.value.trim() || '';
  var email = document.getElementById('emailCad')?.value.trim().toLowerCase() || '';
  var senha = document.getElementById('senhaCad')?.value || '';
  var confirma = document.getElementById('senhaConfirma')?.value || '';
  var captcha = document.getElementById('respCaptchaCad')?.value.trim().toUpperCase() || '';
  var aceitou = document.querySelector('[name="aceitou_politica"]')?.checked || false;
  
  if (nome.length < 3) return mostrarMsg('Nome com pelo menos 3 caracteres!');
  if (!validarEmail(email)) return mostrarMsg('E-mail inválido!');
  if (senha.length < 4) return mostrarMsg('Senha com pelo menos 4 caracteres!');
  if (senha !== confirma) return mostrarMsg('Senhas não coincidem!');
  if (!aceitou) return mostrarMsg('Aceite a Política de Privacidade!');
  if (captcha !== codigoCad) { mostrarMsg('Código incorreto!'); gerarCaptchaCad(); document.getElementById('respCaptchaCad').value=''; return; }
  
  estadoBotao('btnCadastro', true, '⏳ Criando conta...');
  try {
    var res = await fetch('/registro', { 
      method: 'POST', 
      headers: {'Content-Type':'application/json'}, 
      body: JSON.stringify({nome, email, senha, aceitou_politica: aceitou}) 
    });
    var dados = await res.json();
    if (!dados.sucesso) { 
      mostrarMsg(dados.erro || 'Erro ao cadastrar!'); 
      gerarCaptchaCad(); 
      document.getElementById('respCaptchaCad').value=''; 
      return; 
    }
    
    mostrarMsg('✅ Conta criada! Verifique seu e-mail para confirmar.', 'sucesso');
    setTimeout(() => mudarAba('login'), 3000);
  } catch (err) { 
    mostrarMsg('Erro no servidor!'); 
  } finally { 
    estadoBotao('btnCadastro', false, '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg> Criar Conta'); 
  }
}