const {
    pool
  } = require('../require');
   
  const init = ( res, query, value, user_id) => {
    (async () => {
      const client = await pool.connect()
      try {
        await client.query('BEGIN');  
        const result2 = await client.query(query, value);
        res.locals.products = result2.rows;
        res.render('products'
       // , { user_id: user_id}
        );   
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


  module.exports = {init};