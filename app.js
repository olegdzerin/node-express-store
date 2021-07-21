const express = require('express');
const ejs = require('ejs');
var authRouters = require('./routes/authRouters');
var homeRouters = require('./routes/homeRouters');
var productsRouters = require('./routes/productsRouters');

var ordersRouters = require('./routes/ordersRouters');
var customersRouters = require('./routes/customersRouters');
const path = require('path')

const cookieParser = require('cookie-parser')
const {
  requireAuth,
  checkUser
} = require('./middleware/authMiddleware');


const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser())
app.set('view engine', 'ejs');
// const dbURI = require('./env');


const {
  pool
} = require('./require');

pool.connect()
  .then(() => {
    app.listen(3000),
      console.log('Connection has been established successfully');

  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  })

app.get('*', checkUser);

app.get('/', (req, res) => res.redirect('/home'))
app.use('/home', homeRouters)
app.use('/products', requireAuth, productsRouters);
app.use('/orders', requireAuth, ordersRouters);
app.use('/customers', requireAuth, customersRouters);
app.use(authRouters);
app.get('*', (req, res) => {
  console.log(__dirname);
   res.sendFile(path.join(__dirname, 'public/notFind.html'));
 
})
