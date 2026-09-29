/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Criador『Tosh』༻
➪ Módulo Frases da Bíblia 
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
const CONFIG = {
maxTentativas: 2,
atrasoTentativa: 500
};

//➪ Versículos Selecionados Da Bíblia
const LISTA_FRASES = [
  { frase: "Deus é amor, e todo aquele que ama nasceu de Deus e conhece a Deus. — 1 João 4:8" },
  { frase: "Porque Deus amou o mundo de tal maneira que deu o seu Filho Unigênito, para que todo aquele que nele crer não pereça, mas tenha a vida eterna. — João 3:16" },
  { frase: "Eu vos fiz amigos, porque tudo o que ouvi de meu Pai vos dei a conhecer. — João 15:15" },
  { frase: "O Senhor é o meu pastor, nada me faltará. — Salmos 23:1" },
  { frase: "Posso todas as coisas naquele que me fortalece. — Filipenses 4:13" },
  { frase: "Entrega o teu caminho ao Senhor; confia nele, e ele tudo fará. — Salmos 37:5" },
  { frase: "Mas a esperança que se demora amarga o coração, mas o desejo cumprido é árvore de vida. — Provérbios 13:12" },
  { frase: "Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus; eu te fortaleço, e te ajudo, e te sustento com a destra da minha justiça. — Isaías 41:10" },
  { frase: "Bem-aventurados os pobres de espírito, porque deles é o reino dos céus. — Mateus 5:3" },
  { frase: "Bem-aventurados os que choram, porque eles serão consolados. — Mateus 5:4" },
  { frase: "Bem-aventurados os mansos, porque eles herdarão a terra. — Mateus 5:5" },
  { frase: "Bem-aventurados os que têm fome e sede de justiça, porque eles serão fartos. — Mateus 5:6" },
  { frase: "Bem-aventurados os misericordiosos, porque eles alcançarão misericórdia. — Mateus 5:7" },
  { frase: "Bem-aventurados os puros de coração, porque eles verão a Deus. — Mateus 5:8" },
  { frase: "Bem-aventurados os pacificadores, porque eles serão chamados filhos de Deus. — Mateus 5:9" },
  { frase: "Bem-aventurados os perseguidos por causa da justiça, porque deles é o reino dos céus. — Mateus 5:10" },
  { frase: "Pedi, e dar-se-vos-á; buscai, e achareis; batei, e abrir-se-vos-á. — Mateus 7:7" },
  { frase: "Tudo o que quiserdes que os homens vos façam, fazei-lhes vós também. — Mateus 7:12" },
  { frase: "Amarás o Senhor teu Deus de todo o teu coração, de toda a tua alma e de todo o teu entendimento. — Mateus 22:37" },
  { frase: "Amarás o teu próximo como a ti mesmo. — Mateus 22:39" },
  { frase: "O Senhor está perto dos que têm o coração quebrantado e salva os que têm o espírito contrito. — Salmos 34:18" },
  { frase: "Alegrai-vos sempre no Senhor; outra vez digo: alegrai-vos. — Filipenses 4:4" },
  { frase: "Não andeis ansiosos por coisa alguma; mas, em tudo, pela oração e súplica, com ação de graças, apresentai os vossos pedidos a Deus. — Filipenses 4:6" },
  { frase: "E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e as vossas mentes em Cristo Jesus. — Filipenses 4:7" },
  { frase: "Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento. — Provérbios 3:5" },
  { frase: "Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas. — Provérbios 3:6" },
  { frase: "O nome do Senhor é torre forte; o justo corre para ela e fica em segurança. — Provérbios 18:10" },
  { frase: "O amor é sofredor, é benigno; o amor não é invejoso; o amor não se vangloria, não se orgulha. — 1 Coríntios 13:4" },
  { frase: "O amor não se conduz inconvenientemente, não procura os seus próprios interesses, não se exaspera, não se ressente do mal. — 1 Coríntios 13:5" },
  { frase: "O amor não se alegra com a iniquidade, mas alegra-se com a verdade. — 1 Coríntios 13:6" },
  { frase: "Tudo sofre, tudo crê, tudo espera, tudo suporta. O amor nunca acaba. — 1 Coríntios 13:7-8" },
  { frase: "Mas agora permanecem a fé, a esperança e o amor, estes três; mas o maior deles é o amor. — 1 Coríntios 13:13" },
  { frase: "Se Deus é por nós, quem será contra nós? — Romanos 8:31" },
  { frase: "E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito. — Romanos 8:28" },
  { frase: "Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz e não de mal, para vos dar o fim que esperais. — Jeremias 29:11" },
  { frase: "Então me invocareis, e irei e orarei por vós, e eu vos ouvirei. — Jeremias 29:12" },
  { frase: "Buscar-me-eis e me achareis, quando me buscardes de todo o vosso coração. — Jeremias 29:13" },
  { frase: "O Senhor é a minha força e o meu escudo; nele o meu coração confiou, e fui socorrido; por isso o meu coração exulta, e com o meu canto o louvarei. — Salmos 28:7" },
  { frase: "A luz nasce para o justo, e a alegria para os retos de coração. — Salmos 97:11" },
  { frase: "Dai graças ao Senhor, porque ele é bom; porque a sua benignidade dura para sempre. — Salmos 107:1" },
  { frase: "O Senhor é bom para todos, e as suas misericórdias estão sobre todas as suas obras. — Salmos 145:9" },
  { frase: "Filho meu, não te esqueças da minha lei, e o teu coração guarde os meus mandamentos. — Provérbios 3:1" },
  { frase: "Porque o comprimento dos dias, e os anos da vida, e a paz te acrescentarão. — Provérbios 3:2" },
  { frase: "A humildade e o temor do Senhor são a riqueza, a honra e a vida. — Provérbios 22:4" },
  { frase: "Não te glories do dia de amanhã, porque não sabes o que trará o mesmo dia. — Provérbios 27:1" },
  { frase: "O amigo ama em todo o tempo, e na angústia se faz irmão. — Provérbios 17:17" },
  { frase: "Deus nos deu o Espírito de poder, de amor e de moderação. — 2 Timóteo 1:7" },
  { frase: "Se confessarmos os nossos pecados, ele é fiel e justo para nos perdoar os pecados e nos purificar de toda a iniqüidade. — 1 João 1:9" },
  { frase: "Quem vencer herdará todas as coisas; e eu lhe serei Deus, e ele me será filho. — Apocalipse 21:7" },
  { frase: "E Deus limpará dos seus olhos toda a lágrima; e não haverá mais morte, nem pranto, nem clamor, nem dor; porque as primeiras coisas já passaram. — Apocalipse 21:4" }
];

async function fraseBiblia() {
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

module.exports = { fraseBiblia };
