const axios = require("axios");
const fs = require('fs/promises');
const cheerio = require('cheerio');
const path = require('path');

const { cleanText, parseDate } = require('./dataProcessor');

async function fetchRadares() {
  const url = "https://www.psp.pt/Pages/noticias/noticias.aspx";

  let results = [];

  try {
    //const { data : htmlContent } = await axios.get(url);

    // save html
/*     try {
      await fs.writeFile('pagina.html', htmlContent);
      console.log('Ficheiro guardado com sucesso!');
    } catch (err) {
      console.error('Erro:', err);
    } */

/*       const html = `
<table>
  <tr><td>AVEIRO</td><td>4/jun/25</td><td>08h00/12h00</td><td>Avenida da Universidade</td></tr>
</table>
`;

const $ = cheerio.load(html);

$('tr').each((i, row) => {
  const cols = $(row).find('td');

  if (cols.length === 4) {
    const col0 = $(cols[0]).text().trim();
    const col1 = $(cols[1]).text().trim();
    const col2 = $(cols[2]).text().trim();
    const col3 = $(cols[3]).text().trim();

    console.log({ col0, col1, col2, col3 });
  }
}); */


      try {
        const filePath = path.join(__dirname, '../pagina.html');
        const html = await fs.readFile(filePath, 'utf8');
        const $ = cheerio.load(html);

        console.log('N.º de <tr> encontrados:', $('table.ms-rteTable-default tr').length);

        let distritoAtual;
        let dataiso;

        $('table.ms-rteTable-default tr').each((i, row) => {
          const cols = $(row).find('td');

          if (cols.length === 4) {
            const col0 = cleanText($(cols[0]).text());
            const col1 = cleanText($(cols[1]).text());
            const col2 = cleanText($(cols[2]).text());
            const col3 = cleanText($(cols[3]).text());

            // se não estiver vazio
            if (col0 !== '') {
              distritoAtual = col0.toUpperCase(); // padroniza para evitar erros de maiúsculas
            }

            // Only saves if is distrito is MADEIRA
            if (distritoAtual === 'MADEIRA') {
              results.push({
                district: distritoAtual,
                date: col1,
                dateiso: parseDate(col1),
                hour: col2,
                local: col3,
              });
            }
          }
        });

      } catch (err) {
        console.log("error mehh");
             
      }


      //fs.writeFileSync('./data/radares_aveiro.json', JSON.stringify(results, null, 2));
      //console.log(`✅ Guardados ${results.length} radares de AVEIRO`);
    
    // Encontra o link mais recente com “Quem o avisa”
/*     const artigo = $('a')
      .filter((_, el) => $(el).text().toLowerCase().includes('quem o avisa'))
      .first()
      .attr('href');

    if (!artigo) {
      throw new Error('Artigo com os radares não encontrado.');
    }

    const artigoUrl = `https://www.aquelamaquina.pt${artigo}`;
    const { data: artigoHtml } = await axios.get(artigoUrl);
    const $$ = cheerio.load(artigoHtml);

    const texto = $$('.article__content p').text();

    // Regex simples para encontrar linhas como "Lisboa – 05/06 – Av. da Liberdade"
    const regex = /([A-Za-zÀ-ÿ\s]+)\s+–\s+(\d{1,2}\/\d{1,2})\s+–\s+(.+)/g;

    let match, results = [];
    while ((match = regex.exec(texto)) !== null) {
      results.push({
        distrito: match[1].trim(),
        data: match[2],
        local: match[3].trim()
      });
    }

    // Gravar ficheiro
    fs.writeFileSync('./radares.json', JSON.stringify(results, null, 2)); */
    //console.log(`✅ Radares guardados com sucesso. Total: ${results.length}`);
    fs.writeFile('./data/radares.json', JSON.stringify(results, null, 2));
    console.log(`✅ Radares guardados com sucesso.`);
  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
}

module.exports = {
  fetchRadares,
  parseDate,
};