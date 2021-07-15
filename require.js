const {Client, Pool} = require('pg');
const {of} = require('rxjs');
const { subscribe } = require('./routes/authRouters');

// const poolCustomers = () => {
  // const result;
  const pool = new Pool({
    user: 'dzerinoleg1',
    host: 'localhost',
    database: 'myshop',
    password: '3504',
    port: 5432,
  })
   
 
//   ;(async () => {
//     const client = await pool.connect()
//     try {
//       // const res = await client.query('SELECT * FROM users WHERE id = $1', [1])
//       // console.log(res.rows[0])
//      const  result = await client.query('SELECT * FROM users ')
//       console.log(result.rows);
//     } finally {
//       // Make sure to release the client before any error handling,
//       // just in case the error handling itself throws an error.
//       client.release();
//       return "ok"
     
//     }
// })().catch(err => console.log(`err.stack:${err.stack}`));
// console.log('what about');
// //}

  module.exports = {pool};