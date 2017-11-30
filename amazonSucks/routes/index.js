var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = mongoose.model('Product');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('shopper.html', { root: 'public' });
});

router.get('/admin', function(req, res, next) {
  res.sendFile('admin.html', { root: 'public' })
});

router.get('/products', function(req,res,next) {
  Product.find(function(err, products) {
    if (err) return next(err);
    console.log(products);
    res.json(products);
  })
});

router.param('product', function(req, res, next, id) {
  var query = Product.findById(id);
  query.exec(function(err, product) {
    if (err) return next(err);
    if (!product) return next(new Error("Can't find product"));
    req.product = product;
    console.log('product found');
    return next()
  });
});

router.post('/product', function(req, res, next) {
  var product = new Product({
    name: req.body.name,
    orders: 0,
    price: req.body.price,
    imageUrl: req.body.imageUrl
  });
  product.save(function(err, product) {
    if (err) return next(err);
    console.log('new product saved');
    res.json(product)
  });
});

router.put('/:product/order', function(req, res, next) {
  //upvote a candidate
  req.product.order(function(err, product) {
    if (err) return next(err);
    res.json(product);
  });
});

router.delete('/:product', function(req, res, next) {
  //delete a candidate
  Product.remove({_id:req.product._id}, function(err) {
    if (err) return next(err);
    res.sendStatus(200);
  })
});

module.exports = router;
