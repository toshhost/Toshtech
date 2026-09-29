/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Criador『Tosh』༻
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
//➪ Inicializa partículas de fundo
const container = document.getElementById('particulas');
for(let i = 0; i < 70; i++){
const p = document.createElement('div');
p.classList.add('particula');
const t = Math.random() * 3 + 1;
p.style.width = `${t}px`;
p.style.height = `${t}px`;
p.style.left = `${Math.random() * 100}%`;
const d = Math.random() * 12 + 8;
p.style.animationDuration = `${d}s`;
p.style.animationDelay = `${Math.random() * d}s`;
container.appendChild(p);
}

//➪ Carrega dados da API
async function carregarDados(){
try{
const a = await fetch('/api/config');
const c = await a.json();
document.getElementById('infoApi').textContent = `${c.NomeApi} • Criador: ${c.Criador}`;
}catch(e){
document.getElementById('infoApi').textContent = 'TOSH TECH • Criador: Tosh';
}
}

//➪ Contador de visitas
async function carregarContador(){
try{
const a = await fetch('/api/visitas');
const c = await a.json();
document.getElementById('total-geral').textContent = c.total || 1251;
}catch(e){
let v = localStorage.getItem('visitas_tosh') || 1251;
v = Number(v) + 1;
localStorage.setItem('visitas_tosh', v);
document.getElementById('total-geral').textContent = v;
}
}

//➪ Funções de visualização de imagem
function abrirImagem(c){
const m = document.getElementById('modalFoto');
const i = document.getElementById('fotoGrande');
i.src = c;
m.classList.add('aberto');
document.body.style.overflow = 'hidden';
}

function fecharImagem(){
const m = document.getElementById('modalFoto');
m.classList.remove('aberto');
document.body.style.overflow = 'auto';
}
document.addEventListener('keydown', e => {
if(e.key === 'Escape') fecharImagem();
});

//➪ PWA — Detecta se pode instalar e avisa
let promptInstalacao;
window.addEventListener('beforeinstallprompt', (e) => {
e.preventDefault();
promptInstalacao = e;
console.log('📲 PWA disponível — pode instalar como aplicativo!');
});

//➪ Inicialização
carregarDados();
carregarContador();

document.addEventListener('DOMContentLoaded', () => {
const aceito = localStorage.getItem('tosh_cookies_aceitos');
if (!aceito) {
document.getElementById('avisoCookies').style.display = 'block';
}
});

function aceitarCookies() {
localStorage.setItem('tosh_cookies_aceitos', 'true');
document.getElementById('avisoCookies').style.display = 'none';
}