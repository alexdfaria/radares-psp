const axios = require("axios");

require('dotenv').config();

async function sendTelegramMessage(texto) {
  const token = process.env.TELEGRAM_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const futureTime = Math.floor(Date.now() / 1000) + (60 * 60) + 120; // 1 hora fuso horario + 2 minutos no futuro

  if (!token || !chatId) {
    throw new Error('⚠️ TELEGRAM_TOKEN ou TELEGRAM_CHAT_ID não estão definidos');
  }

  try {
    const res = await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
      chat_id: chatId,
      text: texto,
      schedule_date: futureTime,
    });

    console.log('✅ Resposta da API:', res.data);

    if (!res.data.ok) {
      console.error('❌ Erro ao enviar mensagem:', res.data);
    }
  } catch (err) {
    console.info(token + "     " + chatId)
    console.error('❌ Erro no envio para Telegram:', err.message);
  }
}

module.exports = {
  sendTelegramMessage
};