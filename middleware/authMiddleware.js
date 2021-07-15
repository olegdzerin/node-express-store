const jwt = require('jsonwebtoken');
const { endsWith } = require('../env');
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    // check jwt exist & is verified
    if (token) {
        jwt.verify(token, 'secret', (err, decodedToken) => {
            if (err) {
                console.log("errr"+err.message);
                res.redirect('/login');
            } else {             
                next();
            }
        })
    } else {
        res.redirect('/home')
    }
}

//check curret user
const checkUser = (req, res, next) => {
   // for test
    //    const tokenRandom = Math.random();
    //  tokenRandom <= 1 ? res.cookie('jwt', '111'):console.log('111');
   const token = req.cookies.jwt;
    console.log(`checkUser: ${token}`);
    res.locals.user_name = ''

    if (token) {
        jwt.verify(token, 'secret', async (err, decodedToken) => {
            
            if (err) {
                console.log(`err.message:${err.message}`);
                res.locals.user = true;
                res.render('login',{user_exist:''});
               
            } else {
                res.locals.user = false;  
                if (!req.cookies.user_name) {
                    res.locals.user_name = '';
                }else{
                    res.locals.user_name = req.cookies.user_name;
                    res.locals.user_id = req.cookies.user_id;
                }
                next();
            }
        })
    } else {    
        res.locals.user = true; 
        res.locals.user_name = '';
        next();
    }
};
module.exports = {
    requireAuth,
    checkUser
};
