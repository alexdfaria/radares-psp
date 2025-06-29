function cleanText(text) {
  return text.replace(/[\u200B-\u200D\uFEFF]/g, '').trim();
}

function parseDate(dateStr) {
  const months = {
    jan: '01', fev: '02', mar: '03', abr: '04', mai: '05', jun: '06',
    jul: '07', ago: '08', set: '09', out: '10', nov: '11', dez: '12'
  };

  // E.g "4/jun/25"
  const parts = dateStr.toLowerCase().split('/'); // ["4", "jun", "25"]

  let day = parts[0].padStart(2, '0'); // 4 => "04"
  let month = months[parts[1]];
  let year = parts[2];

  // Adjust year "25" to "2025"
  year = year.length === 2 ? `20${year}` : year;

  return `${year}-${month}-${day}`.toString();
}


module.exports = {
  cleanText,
  parseDate,
};