const { fetchRadares } = require('./scripts/scraper');
const { sendTelegramMessage } = require('./scripts/sendTelegram');
const { generateSchedules } = require('./scripts/generateSchedules');

const { checkAndSendRadarAlerts } = require('./scripts/radarAlerts');

(async () => {
    //await fetchRadares();
    //await generateSchedules(radarData);

    await checkAndSendRadarAlerts();

  //process.exit(0);
})();