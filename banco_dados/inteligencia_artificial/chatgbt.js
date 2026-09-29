//➪ MÓDULO CHAT IA - TOSH TECH
//➪ Sem chave | Endpoint oficial | Tratamento de erros

const axios = require('axios');

//➪ CONFIGURAÇÕES
const CONFIG = {
  timeout: 45000,
  maxTentativas: 2,
  atrasoTentativa: 2000,
  modelo: "openai",
  temperatura: 0.7,
  maxRequisicoesMinuto: 10,
  atrasoEntreRequisicoes: 1500
};

const CABECALHOS = {
  "Content-Type": "application/json",
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
};

//➪ CONTROLE DE CARGA
let contadorRequisicoes = 0;
let ultimoReset = Date.now();

async function controlarCarga() {
  const agora = Date.now();
  if (agora - ultimoReset > 60000) {
    contadorRequisicoes = 0;
    ultimoReset = agora;
  }
  if (contadorRequisicoes >= CONFIG.maxRequisicoesMinuto) {
    await new Promise(resolve => setTimeout(resolve, 4000));
    return controlarCarga();
  }
  contadorRequisicoes = contadorRequisicoes + 1;
  await new Promise(resolve => setTimeout(resolve, CONFIG.atrasoEntreRequisicoes));
}

//➪ FUNÇÃO DE TENTATIVA
async function tentarExecutar(funcao) {
  let ultimoErro = null;
  let tentativa = 1;
  while (tentativa <= CONFIG.maxTentativas) {
    try {
      return await funcao();
    } catch (erro) {
      ultimoErro = erro;
      tentativa = tentativa + 1;
      await new Promise(resolve => setTimeout(resolve, CONFIG.atrasoTentativa));
    }
  }
  throw ultimoErro;
}

//➪ FUNÇÃO PRINCIPAL
async function chatIA(pergunta) {
  return tentarExecutar(async () => {
    await controlarCarga();

    const resposta = await axios.post(
      "https://text.pollinations.ai/openai",
      {
        model: CONFIG.modelo,
        temperature: CONFIG.temperatura,
        messages: [
          { role: "system", content: "Responda sempre em português de forma clara, educada e objetiva." },
          { role: "user", content: pergunta }
        ]
      },
      { headers: CABECALHOS, timeout: CONFIG.timeout }
    );

    if (!resposta.data || !resposta.data.choices || !resposta.data.choices[0] || !resposta.data.choices[0].message || !resposta.data.choices[0].message.content) {
      throw new Error("Resposta vazia ou formato inválido");
    }

    return {
      status: true,
      criador: "Tosh Tech",
      modelo: CONFIG.modelo,
      resposta: resposta.data.choices[0].message.content.trim()
    };
  });
}

module.exports = { chatIA };
