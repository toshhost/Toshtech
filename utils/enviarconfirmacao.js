const nodemailer = require('nodemailer');
const crypto = require('crypto');

function gerarId() {
  return crypto.randomBytes(32).toString('hex');
}

const EMAIL_PADRAO = 'toshblackout664@gmail.com';
const SENHA_APP = process.env.SMTP_PASS || 'wqzo kidl facc fgwy'; // Atualize se gerou uma nova

// ➪ Configuração SMTP ajustada para funcionar perfeitamente no Render
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // usa STARTTLS na porta 587
  auth: {
    user: process.env.SMTP_USER || EMAIL_PADRAO,
    pass: SENHA_APP
  },
  tls: {
    rejectUnauthorized: false // Evita bloqueio de certificado SSL no container do Render
  }
});

async function enviarConfirmacao(email, nomeUsuario) {
  const token = gerarId();
  const baseUrl = process.env.BASE_URL || 'https://tosh-tech.onrender.com';
  const link = `${baseUrl}/confirmar-email?token=${token}`;
  const remetente = process.env.SMTP_USER || EMAIL_PADRAO;

  console.log(`📤 [SMTP] Tentando enviar e-mail para: ${email}`);

  const info = await transporter.sendMail({
    from: `"Tosh Tech" <${remetente}>`,
    to: email,
    subject: `✩ Olá ${nomeUsuario}! Confirme seu cadastro na Tosh Tech`,
    html: `
    <!DOCTYPE html>
    <html>
    <head><meta charset="UTF-8"></head>
    <body style="background-color: #050505; margin: 0; padding: 40px 10px; font-family: Arial, sans-serif; color: #f8f8f8; text-align: center;">
      <div style="max-width: 480px; margin: 0 auto;">
        <h1 style="color: #c0c0c0;">TOSH TECH</h1>
        <p>Olá, <b>${nomeUsuario}</b>!</p>
        <p>Clique no botão abaixo para confirmar seu e-mail:</p>
        <a href="${link}" style="display: inline-block; padding: 12px 28px; background: #222; border: 1px solid #c0c0c0; color: #fff; text-decoration: none; font-weight: bold; margin: 20px 0;">CONFIRMAR E-MAIL</a>
        <p style="font-size: 11px; color: #888;">Se o botão não funcionar, acesse: <br>${link}</p>
      </div>
    </body>
    </html>
    `
  });

  console.log(`✅ [SMTP] Enviado com sucesso | ID: ${info.messageId}`);
  return { token };
}

module.exports = enviarConfirmacao;