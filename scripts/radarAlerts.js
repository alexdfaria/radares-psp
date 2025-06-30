const fs = require('fs');
const path = require('path');
const { sendTelegramMessage } = require('./sendTelegram');
const { generateSchedules } = require('./generateSchedules');

const radarData = require('../data/radares.json');

async function checkAndSendRadarAlerts() {
  //const dataPath = path.join(__dirname, '../data/schedules.json');
  //const schedules = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  try {
    console.log("🔍 Executing radarAlerts.js...");

    const schedules = await generateSchedules(radarData);

    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    console.log("📅 Today:", today);

    let found = false;

    for (const { message, date } of schedules) {
        if (date === today) {
            found = true;
            console.log("📤 Sending:", message);
            await sendTelegramMessage(message);
        }
    }

    if (!found) {
      console.log("ℹ️ No scheduled radars for today.");
    }

  } catch (error) {
    console.error("❌ Error in checkAndSendRadarAlerts:", error);
    process.exit(1); // Fails for GitHub Actions
  }
}

module.exports = {
  checkAndSendRadarAlerts,
};