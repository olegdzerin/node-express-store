const {
    pool
  } = require('../require');
  const jwt = require('jsonwebtoken');
  const message = 'Такого користувача не існує'
   
  const initSignUp = ( res, queryText, value) => {
    (async () => {
      const client = await pool.connect()
      try {
        await client.query('BEGIN');  
        const result2 = await client.query(queryText, value);
        res.redirect('/login');
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

  const initLogIn = ( res, queryText, queryCustomerName, value) => {
    (async () => {
      const client = await pool.connect()
      try {
        await client.query('BEGIN');  
        const result1 = await client.query(queryText, value); 
         
        if (result1.rows[0].count === '1') {
          
          const result2 = await client.query(queryCustomerName, value);
          console.log(result2.rows[0]); 
          const token = jwt.sign({id: result2.rows[0].id}, 'secret');
           res.cookie('jwt', token);
          res.cookie('user_name',  result2.rows[0].name);
           res.cookie('user_id',  result2.rows[0].id);
           res.redirect('/home');
        }else{
          res.render('login', {user_name: true,user: true,
            user_exist: message});
        }
         client.query('COMMIT')
      } catch(err){
         client.query('ROLLBACK');
         throw err;
      }
      finally {
        client.release()
       // console.log(pool.a + 'final');
      }
    })().catch(err => {
     
      console.log(`err.stack:${err.stack}`)
    });
  }


  module.exports = {initSignUp, initLogIn};