const express = require('express');
const {
  pool
} = require('../require');
const router = express.Router();
const {init} = require('../controllers/customersRoutersController');

router.get('/', function (req, res) {
  const query1 = '';
  const query = `SELECT * FROM customers `;
  init( res, query1, query);
})

router.get('/create', function (req, res) {
  const customersParam1 = 'oleg1';
  const  customersParam2 = 'oleg1@gmail.com';
  const customersParam3 = '111111';
  const query1 = '';
  const query = `insert into customers (
    name, email, password)
    values($1, $2, $3)`;
  init(res, query1, query, [customersParam1, customersParam2, customersParam3]);
});
router.get('/:id', function (req, res) {
  const query1 = '';
  const query = `SELECT * FROM customers WHERE id = $1`;
  init(res, query1, query, [req.params.id]);
});





module.exports = router;