const {Client, Pool} = require('pg');

const pool = new Pool({
    user: 'dzerinoleg1',
    host: 'localhost',
    database: 'myshop',
    password: '3504',
    port: 3211,
  })