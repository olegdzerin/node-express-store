const express = require('express');
const router = express.Router();
const {init} = require('../controllers/productsRoutersController');
const {
  pool
} = require('../require');

router.get('/', function(req,res){
   const user_id = req.cookies.user_id;
  const query = 'SELECT * FROM products ';
  init(res,query,undefined,user_id)
})


router.get('/women', function (req, res) {
  const user_id = req.cookies.user_id;
  const query = 'SELECT * FROM products WHERE gender = $1'
  init(res, query, ['жіноча'],user_id)
});

router.get('/men', function (req, res) {
  const user_id = req.cookies.user_id;
  const query = 'SELECT * FROM products WHERE gender = $1'
  init(res,query, ['чоловіча'], user_id )
});

router.get('/women/jacket', function (req, res) {
  const user_id = req.cookies.user_id;
  const query = 'SELECT * FROM products WHERE gender = $1  AND category = $2'
  init(res, query, ['жіноча','куртка'], user_id)
});

router.get('/men/jacket', function (req, res) {
  const user_id = req.cookies.user_id;
  const query = 'SELECT * FROM products WHERE gender = $1  AND category = $2'
  init(res, query, ['чоловіча','куртка'], user_id)
});

router.get('/women/trousers', function (req, res) {
  const user_id = req.cookies.user_id;
  const query = 'SELECT * FROM products WHERE gender = $1  AND category = $2'
  init(res,query, ['жіноча','штани'], user_id)
});

router.get('/men/trousers', function (req, res) {
  const user_id = req.cookies.user_id;
  const query = 'SELECT * FROM products WHERE gender = $1  AND category = $2'
  init(res, query, ['чоловіча','штани'],user_id)
});

router.get('/:id', function(req, res) {
  const param = req.params.id;
  const user_id = req.cookies.user_id;
  const query = 'SELECT * FROM products WHERE  id_product = $1'
  init(res, query, [param], user_id)
});


module.exports = router;