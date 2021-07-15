const express = require('express');

const router = express.Router();
const {
  pool
} = require('../require');
const {initCreate, initDelete, initShow} = require('../controllers/ordersRoutersController');

router.get('/', function(req,res){
  const query1 = 'SELECT * FROM orders ';
  const query = ''
  init( res, query1,query)
})
router.get('/create/:customerId/:productId', function(req,res){
  const customerId = req.cookies.user_id
  const query = `insert into orders 
  (customer_id, product_id) values 
  ($1,$2);`
  initCreate(res,query, [req.params.customerId,req.params.productId], customerId)


})

// router.get('/:id', function(req, res) {
//   const param = req.params.id;
//   const query1 = '';
//   const query = 'SELECT * FROM orders WHERE  orders.id_order = $1  '
//   init( res, query, [param])
// });

//get all orders that ordered customer use join
router.get('/customers/:customerId', function(req, res) {
  const query1 = '';
  const query = `SELECT *
                FROM orders ,customers, products
                 WHERE orders.customer_id = customers.id
                 AND orders.customer_id = 41
                 AND orders.product_id = products.id_product
     ` 
    //  INNER JOIN  customers ON orders.customer_id = customers.id AND orders.customer_id = 1
    //  INNER JOIN  products ON orders.product_id = products.id_produc
                
   initShow( res, query, [req.params.customerId])
  //initShow( res, query)
});
// delete order
router.get('/delete/:id_order', function(req, res) {
  const paramIdOrder = req.params.id_order;
  const query1 = '';
  const query = 'DELETE FROM orders WHERE  orders.id_order = $1  '
  initDelete( res,query, [paramIdOrder])
});





module.exports = router;
