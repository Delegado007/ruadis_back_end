const { client } = require('pg');
const { Client } = require('pg/lib');

async function getConnection() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'franco',
    password: 'admin123',
    database: 'my_storage',
  });
  await client.connect();
  return client;
}

module.exports = getConnection;
