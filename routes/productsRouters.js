const express = require('express');
const router = express.Router();
const {
  productsModel
} = require('../models/Product');

var newData1;

const init = ( res, select) => {
  (async () => {
        newData1 = await productsModel().findAll({
         where:select,
           raw: true
         });
    res.json(newData1)
     })();
}

router.get('/women', function (req, res) {
 init(res, {gender: 'жіноча'});
});

router.get('/men', function (req, res) {
  init(res,{gender: 'чоловіча'});
});

router.get('/women/jacket', function (req, res) {
  init(res, {gender: 'жіноча',category: 'куртка' },);
});

router.get('/men/jacket', function (req, res) {
  init(res, {gender: 'чоловіча',category: 'куртка' },);
});

router.get('/women/trousers', function (req, res) {
  init(res, {gender: 'жіноча',category: 'штани' },);
});

router.get('/men/trousers', function (req, res) {
  init(res, {gender: 'чоловіча',category: 'штани' },);
});

router.get('/:id', function(req, res) {
  const params = req.params.id;
   init(res, { id: params })
});


module.exports = router;