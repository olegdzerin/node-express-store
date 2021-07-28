const {
  pool
} = require('../require');

const init = (res, query, value, user_id) => {
  (async () => {
    const client = await pool.connect()
    try {
      await client.query('BEGIN');
      const result2 = await client.query(query, value);
      res.locals.products = result2.rows;  
      // console.log(result2.rows);
      res.json(result2.rows);
      await client.query('COMMIT')
    } catch (err) {
      client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  })().catch(err => {

    console.log(`err.stack:${err.stack}`)
  });
}

const getOneInit = (res, query, value, user_id) => {
  (async () => {
    const client = await pool.connect()
    try {
      await client.query('BEGIN');
      const result2 = await client.query(query, value);
   //   res.locals.products = result2.rows;  
       console.log(result2.rows);
      res.json(result2.rows);
      await client.query('COMMIT')
    } catch (err) {
      client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  })().catch(err => {

    console.log(`err.stack:${err.stack}`)
  });
}
 

module.exports = {
  init,
  getOneInit
};




//const search = (res, query, value) => {
  //   (async () => {
  //     const client = await pool.connect()
  //     try {
  //       await client.query('BEGIN');
  //       const result2 = await client.query(query, value);
  //       res.locals.products = result2.rows;
  //       res.json(result2.rows);
  //       await client.query('COMMIT')
  //     } catch (err) {
  //       client.query('ROLLBACK');
  //       throw err;
  //     } finally {
  //       client.release();
  
  
  //     }
  //   })().catch(err => {
  
  //     console.log(`err.stack:${err.stack}`)
  //   });
  // }



