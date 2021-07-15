const jwt = require('jsonwebtoken');
const {initSignUp, initLogIn} = require('../controllers/authRouterControl');

//const maxAge = 3 * 24 * 60 * 68
// const createToken = (id) => {
//     return jwt.sign({
//         id
//     }, 'nodelogin secret', {
//         expiresIn: maxAge
//     })
// }

module.exports.signup_get = (req, res) => {
   // console.log('login:;:'+ res.locals.user);
    res.render('signup',{people:'block'});
}
module.exports.login_get = (req, res) => {
   // console.log('login:;:'+ res.locals.user);
    res.render('login', {user_exist: ''});
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', {
        maxAge: 1
    });
    res.redirect('/')
}

module.exports.signup_post = (req,res) => {
    const {
        name,
        email,
        password
    } = req.body;
    const query = `INSERT INTO customers (name,email,password)
    values ($1, $2, $3)`;
    initSignUp(res, query, [name, email, password]);
}

module.exports.login_post =  (req, res) => {
    const {
        name,
        email,
        password
    } = req.body;
    const query1 = `SELECT COUNT(*) FROM customers 
    where customers.name = $1 
    and customers.email =  $2
    and customers.password = $3`;
    const query2 = `SELECT * FROM customers 
    where customers.name = $1 
    and customers.email =  $2
    and customers.password = $3`;
    initLogIn(res, query1, query2, [name, email, password]);
 }



