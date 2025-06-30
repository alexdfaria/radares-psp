const { sendTelegramMessage } = require('./sendTelegram');

async function main() {
  await sendTelegramMessage("✅ Test from GitHub Actions!");
}

main();