const express = require('express');
const {
  pool
} = require('../require');
const router = express.Router();

const init = (res, query1,  query, value) => {
  (async () => {
    const client = await pool.connect()
    try {
      await client.query('BEGIN');
      const result = await client.query(query1);

      const result2 = await client.query(query, value);
      // res.json(result.rows.concat( result2.rows));
      // console.log(result.rows, result2.rows);
      res.render('customers', {customers: result2.rows});

      await client.query('COMMIT')

    } catch(err){
       client.query('ROLLBACK');
       throw err;
    }
    finally {
      client.release();
    }
  })().catch(err => {   
    console.log(`err.stack:${err.stack}`)
  });
}
 module.exports = {init}