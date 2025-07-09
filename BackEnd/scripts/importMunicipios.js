const fs = require('fs');
const path = require('path');
const { Client } = require('pg');
const csv = require('csv-parser');

// Path to your CSV file
const csvPath = path.resolve(__dirname, '../data/municipios.csv');

// PostgreSQL LOCAL connection config
// const client = new Client({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'municipios_db',
//   password: '123',
//   port: 5432,
// });

// PostgreSQL NEON connection config
const client = new Client({
  user: 'neondb_owner',
  host: 'ep-ancient-fog-acrk065z-pooler.sa-east-1.aws.neon.tech',
  database: 'neondb',
  password: 'npg_hHTDPCst7L2d',
  port: 5432,
  ssl: { rejectUnauthorized: false }
});

async function createTableIfNotExists() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS municipios (
      codigo_municipio INTEGER PRIMARY KEY,
      nome TEXT NOT NULL,
      estado TEXT NOT NULL,
      codigo_estado INTEGER NOT NULL,
      capital BOOLEAN NOT NULL,
      populacao INTEGER NOT NULL
    );
  `;

  await client.query(createTableQuery);
}

function mapHeaders({ header }) {
  return header.trim();
}

async function importCSV() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL');

    await createTableIfNotExists();
    console.log('Checked/created table "municipios"');

    const results = [];

  fs.createReadStream(csvPath, { encoding: 'utf8' })
    .pipe(csv({ separator: ';', mapHeaders }))
    .on('data', (row) => {
      // Remove all empty keys caused by trailing semicolons
      Object.keys(row).forEach(key => {
        if (key.trim() === '') delete row[key];
      });
      results.push(row);
    })
    .on('end', async () => {
      for (const row of results) {
        // Only check for required fields
        if (!row['COD. MUNIC'] || !row['NOME DO MUNICÍPIO']) {
          console.warn('Skipping row due to missing fields:', row);
          continue;
        }
        const estado = row['UF'];
        const codigoEstado = parseInt(row['COD. UF']);
        const codigoMunicipio = parseInt(row['COD. MUNIC']);
        const nome = row['NOME DO MUNICÍPIO'];
        const capital = row['Capital de Estado'] && row['Capital de Estado'].toLowerCase().trim() === 'sim';
        const populacao = parseInt((row['POPULAÇÃO'] || '').replace(/\D/g, '') || '0');
        if (!codigoMunicipio || !nome || isNaN(populacao)) continue;

        await client.query(
          `INSERT INTO municipios (codigo_municipio, nome, estado, codigo_estado, capital, populacao)
          VALUES ($1, $2, $3, $4, $5, $6)
          ON CONFLICT (codigo_municipio) DO NOTHING`,
          [codigoMunicipio, nome, estado, codigoEstado, capital, populacao]
        );
      }

      console.log(`Import complete! ${results.length} rows processed.`);
      await client.end();
    });

  } catch (error) {
    console.error('Error during import:', error);
    await client.end();
  }
}

importCSV();