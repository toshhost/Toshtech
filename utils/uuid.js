const crypto = require('crypto');

function gerarIdToshTech() {
//➪ Gera 8 bytes aleatórios seguros
const bytes = crypto.randomBytes(8);
  
//➪ Converte para base64 
const base64 = bytes.toString('base64');
  
//➪ Transforma em letras maiúsculas e remove qualquer caractere especial
const parteAleatoria = base64
.toUpperCase()
.replace(/[^A-Z0-9]/g, '');

//➪ Retorna no formato exato que você quer
return `toshtech-${parteAleatoria}`;
}

module.exports = gerarIdToshTech;