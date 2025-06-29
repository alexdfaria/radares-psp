const { fetchRadares, parseDate } = require('./scripts/scraper');
const { sendTelegramMessage } = require('./scripts/sendTelegram');

const radarData = require('./data/radares.json');
const { generateSchedules } = require('./scripts/generateSchedules');

(async () => {
    const mensagem = "📢 Radar agendado em Aveiro: 4/jun/25 - 08h00/12h00 - Avenida da Universidade";

    //await sendTelegramMessage(mensagem);

    //console.log(parseDate("4/jun/25")); // "2025-06-04"
    await fetchRadares();
    await generateSchedules(radarData);

  //process.exit(0);
})();