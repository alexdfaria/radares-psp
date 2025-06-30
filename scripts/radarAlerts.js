const fs = require('fs');
const path = require('path');
const { sendTelegramMessage } = require('./sendTelegram');
const { generateSchedules } = require('./generateSchedules');

const radarData = require('../data/radares.json');

function checkAndSendRadarAlerts() {
  //const dataPath = path.join(__dirname, '../data/schedules.json');
  //const schedules = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  const schedules = generateSchedules(radarData);

  const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"

  console.log("hoje: " + today)

  schedules.forEach(({ message, date }) => {
    if (date === today) {
        console.log(message + " date: " + date)
      sendTelegramMessage(message);
    }
  });
}

module.exports = {
  checkAndSendRadarAlerts,
};