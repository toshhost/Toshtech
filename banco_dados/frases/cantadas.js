/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Criador『Tosh』༻
➪ Módulo Frases cantadas 
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
const CONFIG = {
maxTentativas: 2,
atrasoTentativa: 500
};

//➪ Trechos De Músicas Famosas
const LISTA_FRASES = [
  { frase: "A vida é um palco e nós somos os artistas. — Raul Seixas" },
  { frase: "É preciso amar as pessoas como se não houvesse amanhã. — Renato Russo" },
  { frase: "Palco, luz e cenário, e o mundo é assim. — Marisa Monte" },
  { frase: "A gente quer ver o sol nascer na praia. — Tim Maia" },
  { frase: "Caminhos e caminhos, eu sigo o meu. — Legião Urbana" },
  { frase: "Eu sei que vou te amar, por toda a minha vida eu vou te amar. — Tom Jobim e Vinicius de Moraes" },
  { frase: "Como é grande o meu amor por você. — Roberto Carlos" },
  { frase: "Aquarela do Brasil, céu, rio e mar. — Ary Barroso" },
  { frase: "Samba da benção, é melhor ser alegre que ser triste. — Vinicius de Moraes e Baden Powell" },
  { frase: "Fica comigo, que o mundo é pequeno e o amor é grande. — Roupa Nova" },
  { frase: "Quando eu te vi, eu já sabia que ia te amar. — Luan Santana" },
  { frase: "A vida é feita de escolhas, eu escolhi ser feliz. — Jorge e Mateus" },
  { frase: "Você é a razão do meu viver, o motivo do meu sorriso. — Zezé di Camargo e Luciano" },
  { frase: "Coração de capoeira, que bate forte e não cansa. — Various" },
  { frase: "Só pra contrariar o destino, eu vou te amar. — Marília Mendonça" },
  { frase: "A gente briga, mas se ama, e não vive separado. — Cristiano Araújo" },
  { frase: "Se eu pudesse, eu trazia você de volta pro meu coração. — Gusttavo Lima" },
  { frase: "Meu lugar é ao seu lado, onde quer que você esteja. — Bruno e Marrone" },
  { frase: "O amor é fogo que arde sem se ver. — Luís de Camões / versão em música" },
  { frase: "Vida de viajante, céu e estrada, coração distante. — Almir Sater" },
  { frase: "Eu não sou cachorro, não, pra viver tão humilhado. — Tim Maia" },
  { frase: "O sol nasce pra todos, mas brilha mais pra quem merece. — Belo" },
  { frase: "A saudade bate forte, mas o amor é mais forte ainda. — Chitãozinho e Xororó" },
  { frase: "Se você for embora, eu vou sofrer, mas vou sobreviver. — Marília Mendonça" },
  { frase: "Tem coisas na vida que só o tempo explica. — Victor e Leo" },
  { frase: "Eu te amo mais que tudo, mais que a vida, mais que o ar. — Roupa Nova" },
  { frase: "Coração não tem idade, só tem vontade de amar. — Edson e Hudson" },
  { frase: "A estrada é longa, mas a fé é maior. — Rionegro e Solimões" },
  { frase: "Você apareceu e mudou a minha vida, deu cor ao meu mundo. — Lucas Lucco" },
  { frase: "Amor e fé, duas forças que movem o universo. — Fernandinho" },
  { frase: "Quando a tempestade chegar, eu vou estar ao seu lado. — Aline Barros" },
  { frase: "Deus é amor, e o amor vence tudo. — Gabriela Rocha" },
  { frase: "A música é a linguagem da alma. — Milton Nascimento" },
  { frase: "Samba é alegria, é vida, é coração. — Cartola" },
  { frase: "A noite é uma criança, e nós somos os sonhadores. — Erasmo Carlos" },
  { frase: "Eu quero ver você sorrir, cantar e ser feliz. — Exaltasamba" },
  { frase: "O amor não tem fronteiras, não tem barreiras, não tem fim. — Skank" },
  { frase: "Vem me satisfazer, vem me fazer feliz. — Paralamas do Sucesso" },
  { frase: "A vida é um sopro, o amor é eterno. — CPM 22" },
  { frase: "Eu vou te levar pra onde o sol brilha mais forte. — Capital Inicial" },
  { frase: "Sonhar não custa nada, e lutar vale a pena. — Charlie Brown Jr." },
  { frase: "A paz que eu quero é a paz do seu abraço. — Tiago Iorc" },
  { frase: "Se for pra ser, que seja intenso, verdadeiro e sem fim. — Anavitória" },
  { frase: "O amor chega quando menos se espera, e fica pra sempre. — Marisa Monte" },
  { frase: "Cada canção é um pedaço da nossa história. — Toquinho" },
  { frase: "A alegria de viver é um dom divino. — Fafá de Belém" },
  { frase: "Eu não existo sem você, meu amor, minha vida. — Tom Jobim" },
  { frase: "Saudades de quem amamos é o jeito que o coração diz que ama. — Nando Reis" },
  { frase: "O tempo passa, mas o amor verdadeiro fica. — Os Paralamas do Sucesso" }
];

async function fraseCantada() {
return new Promise(async (resolve) => {
let tentativa = 0;
while (tentativa < CONFIG.maxTentativas) {
try {
const total = LISTA_FRASES.length;
const indice = Math.floor(Math.random() * total);
const fraseEscolhida = LISTA_FRASES[indice];

return resolve({
status: true,
criador: 'Tosh Tech',
total: total,
resultado: [fraseEscolhida]
});
} catch (erro) {
tentativa++;
await new Promise(pausa => setTimeout(pausa, CONFIG.atrasoTentativa));
}
}
resolve({
status: false,
criador: 'Tosh Tech',
erro: 'Nenhuma frase disponível no momento',
total: 0,
resultado: []
});
});
}

module.exports = { fraseCantada };
