const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'bitcoinData',
  password: '1234',
  port: 5432,
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '/views')));

// Fetch data from the API and store it in the database
app.get('/fetch-and-store', async (req, res) => {
  try {
    const apiResponse = await axios.get('https://api.wazirx.com/api/v2/tickers');
    const top10Results = Object.values(apiResponse.data).slice(0, 10);

    const client = await pool.connect();

    top10Results.forEach(async (result) => {
      const { name, last, buy, sell, volume, base_unit } = result;

      await client.query(
        'INSERT INTO crypto_data(name, last, buy, sell, volume, base_unit) VALUES($1, $2, $3, $4, $5, $6)',
        [name, last, buy, sell, volume, base_unit]
      );
    });

    client.release();
    res.status(200).send('Data fetched and stored successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to get data from the database
app.get('/get-data', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM crypto_data');
    client.release();
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
