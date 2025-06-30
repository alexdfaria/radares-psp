const fs = require('fs');
const path = require('path');
const { formatDateToDMY } = require('./dataProcessor');

/**
 * Converts an ISO date (YYYY-MM-DD) to a UNIX timestamp for 07:00 AM in Portugal (UTC+1)
 * Assumes daylight saving time is in effect (UTC+1).
 * @param {string} isoDate - ISO format date (e.g., "2025-06-06")
 * @returns {number} UNIX timestamp in seconds
 */
function getPortugal7amTimestamp(isoDate) {
  const localDate = new Date(`${isoDate}T07:00:00`);
  const utcTimestamp = Math.floor(localDate.getTime() / 1000);
  return utcTimestamp;
}

/**
 * Generates scheduled messages from radar data
 * @param {Array} radarData - Array of radar entries (from Madeira)
 * @returns {Array} Schedule entries with message text and timestamp
 */
function generateSchedules(radarData) {
  const schedules = radarData.map((r) => {
    const message = `🚨🚓 ALERTA Radar 🚓🚨\n\n📢 Agendado para <b>HOJE</b> (${formatDateToDMY(r.dateiso)})\n\n<b>Horário:</b> ${r.hour}\n<b>Local: </b>${r.local}`;
    //const timestamp = getPortugal7amTimestamp(r.dateiso);
    const date = r.dateiso;
    return { message, date };
  });

  // Write to file
/*   fs.writeFileSync(
    path.join(__dirname, '../data/schedules.json'),
    JSON.stringify(schedules, null, 2),
    'utf8'
  ); */

  console.log('✅ Schedules generated successfully!');

  return schedules;
}

module.exports = {
  generateSchedules,
};