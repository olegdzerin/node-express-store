const  {Router} = require('express');
const router = Router();
const ejs = require('ejs');
const people1 = ['geddy', 'neil', 'alex'];
   
const html = ejs.render('<%= people.join(", "); %>', {people: people1});


router.get('/', (req, res) =>  res.render('home',{html}));


module.exports = router;

