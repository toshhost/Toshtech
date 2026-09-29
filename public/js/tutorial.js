/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Criador『Tosh』
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
async function carregarDadosSistema(){
try{
const resposta = await fetch("/api/config");
const dados = await resposta.json();
document.getElementById("nomeSistema").textContent = (dados.NomeApi || "Tosh Tech").toUpperCase();
document.getElementById("infoCriador").textContent = `CRIADO POR ${(dados.Criador || "Tosh").toUpperCase()} • VERSÃO 2.0`;
document.getElementById("textoRodape").innerHTML = `<span class="destaque">${(dados.NomeApi || "Tosh Tech").toUpperCase()}</span> • TODOS OS DIREITOS RESERVADOS`;
}catch(erro){
console.log("Usando dados padrão");
}
}
document.addEventListener("DOMContentLoaded", carregarDadosSistema);