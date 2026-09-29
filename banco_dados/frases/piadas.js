/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Criador『Tosh』༻
➪ Módulo Frases piadas
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
const CONFIG = {
maxTentativas: 2,
atrasoTentativa: 500
};

//➪ Piadas Selecionadas
const LISTA_PIADAS = [
  { frase: "O que o zero disse para o oito? — Belo cinto!" },
  { frase: "Por que o livro de matemática se suicidou? — Porque tinha muitos problemas." },
  { frase: "Qual é o peixe que não nada? — O peixe de pedra." },
  { frase: "O que a galinha disse para o pinto? — Não nasça que o mundo é uma loucura." },
  { frase: "Por que o gato não gosta de celular? — Porque ele prefere miar mensagem." },
  { frase: "Qual é o café mais perigoso do mundo? — O ex-presso." },
  { frase: "O que o tomate foi fazer no banco? — Tirar um extrato." },
  { frase: "Por que a mulher do Hulk nunca fica brava? — Porque ela tem muita paciência." },
  { frase: "Qual é o contrário de volátil? — Vem cá til." },
  { frase: "O que um raio disse para o outro? — Nada, ele só deu um relâmpago." },
  { frase: "Por que o cachorro entrou na igreja? — Para latir missa." },
  { frase: "Qual é o rei da floresta que não existe? — O rei-não." },
  { frase: "O que o lápis disse para a borracha? — Não chore, eu errei e você apaga tudo." },
  { frase: "Por que o esqueleto não brigou com ninguém? — Porque ele não tem coragem." },
  { frase: "Qual é o doce que todo mundo odeia? — O doce de leite com ameaça." },
  { frase: "O que a água disse para o óleo? — Se você se separar, eu te boto pra correr." },
  { frase: "Por que a galinha atravessou a rua? — Para chegar do outro lado." },
  { frase: "Qual é o carro que ninguém pode dirigir? — O carro-pá." },
  { frase: "O que o advogado do boi disse? — O meu cliente é vitima de acusações infundadas, ele só é boi de aparência." },
  { frase: "Por que o computador foi ao médico? — Porque ele tinha um vírus." },
  { frase: "Qual é a fruta que nunca chega atrasada? — A maçã." },
  { frase: "O que o peixe disse para o pescador? — Me larga que eu estou passando mal." },
  { frase: "Por que o relógio foi preso? — Porque ele deu as pancadas." },
  { frase: "Qual é o número que se vira e fica outro? — O 6 vira 9." },
  { frase: "O que a vela disse para o fogo? — Você é o meu calor, mas se exagerar eu derreto." },
  { frase: "Por que o sapo não lava o pé? — Porque ele mora no brejo." },
  { frase: "Qual é o planeta que todo mundo quer visitar? — O Planeta da Fé." },
  { frase: "O que o celular disse para a bateria? — Você me deixa na mão na hora que eu mais preciso." },
  { frase: "Por que a cobra não tem perna? — Porque se tivesse seria um pé de cobra." },
  { frase: "Qual é o café que não acorda ninguém? — O café frio." },
  { frase: "O que o caderno disse para o lápis? — Vamos escrever nossa história juntos." },
  { frase: "Por que o vento foi expulso da escola? — Porque ele só dava sopro na orelha dos outros." },
  { frase: "Qual é o inseto que sempre está atrasado? — O gafanhoto." },
  { frase: "O que o pão disse para a manteiga? — Você me completa." },
  { frase: "Por que o sol nunca falta ao trabalho? — Porque ele é brilhante." },
  { frase: "Qual é o animal que sabe contar? — O gato, porque ele tem sete vidas." },
  { frase: "O que a porta disse para a fechadura? — Você me tranca, mas nunca me abandona." },
  { frase: "Por que o carro comeu o documento? — Porque ele queria ter fome de papel." },
  { frase: "Qual é o mar que não tem água? — O mar de pessoas." },
  { frase: "O que o livro disse para o leitor? — Descubra o final você mesmo." },
  { frase: "Por que a bola ficou doente? — Porque ela levou um chute na barriga." },
  { frase: "Qual é a cidade que nunca dorme? — A cidade dos sonhos." },
  { frase: "O que o fio disse para a tomada? — Vamos ficar conectados." },
  { frase: "Por que o gato olha para o prato vazio? — Porque ele espera um milagre." },
  { frase: "Qual é o número mais feliz? — O 7, porque ele é sortudo." },
  { frase: "O que a flor disse para o jardineiro? — Me cuida bem que eu te dou beleza." },
  { frase: "Por que o passarinho não voa de noite? — Porque ele tem medo de bater a asa." },
  { frase: "Qual é o objeto que sempre cai? — O tombo." },
  { frase: "O que o relógio disse para o tempo? — Você passa rápido demais." }
];

async function piada() {
return new Promise(async (resolve) => {
let tentativa = 0;
while (tentativa < CONFIG.maxTentativas) {
try {
const total = LISTA_PIADAS.length;
const indice = Math.floor(Math.random() * total);
const piadaEscolhida = LISTA_PIADAS[indice];

return resolve({
status: true,
criador: 'Tosh Tech',
total: total,
resultado: [piadaEscolhida]
});
} catch (erro) {
tentativa++;
await new Promise(pausa => setTimeout(pausa, CONFIG.atrasoTentativa));
}
}
resolve({
status: false,
criador: 'Tosh Tech',
erro: 'Nenhuma piada disponível no momento',
total: 0,
resultado: []
});
});
}

module.exports = { piada };
