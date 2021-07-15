const {
    pool
  } = require('../require');

const initCreate = ( res,  query, value, customer_id) => {
    (async () => {
      const client = await pool.connect()
      try {
        await client.query('BEGIN');
  
        const result2 = await client.query(query, value);
       
          res.render('orders', {id_order: result2,
          id: customer_id});
        await client.query('COMMIT')
  
      } catch(err){
         client.query('ROLLBACK');
         throw err;
      }
      finally {
        client.release();
  
        console.log(pool.a + 'final');
      }
    })().catch(err => {
     
      console.log(`err.stack:${err.stack}`)
    });
  }
  
  const initShow = ( res,  query, value) => {
    (async () => {
      const client = await pool.connect()
      try {
        await client.query('BEGIN');
        const result2 = await client.query(query, value);
        console.log(result2.rows);
        res.render('orders-show', {products: result2.rows});
        await client.query('COMMIT')
  
      } catch(err){
         client.query('ROLLBACK');
         throw err;
      }
      finally {
        client.release();
        console.log(pool.a + 'final');
      }
    })().catch(err => {   
      console.log(`err.stack:${err.stack}`)
    });
  }
  
  const initDelete = ( res,  query, value) => {
    (async () => {
      const client = await pool.connect()
      try {
        await client.query('BEGIN');
        const result2 = await client.query(query, value);     
          res.render('orders');
        await client.query('COMMIT')
      } catch(err){
         client.query('ROLLBACK');
         throw err;
      }
      finally {
        client.release();
        console.log(pool.a + 'final');
      }
    })().catch(err => {   
      console.log(`err.stack:${err.stack}`)
    });
  }

  module.exports = {initCreate, initDelete, initShow};