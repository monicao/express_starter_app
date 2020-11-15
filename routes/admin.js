var express = require('express');
var router = express.Router();

/* GET /admin - admin landing page. */
router.get('/', function(req, res, next) {
  // DISCUSS3: Rendering ejs views
  res.render('admin/index');
});

/* GET /admin/products - list of products */
router.get('/products', function(req, res, next) {
  res.render('admin/products/index');
});

/* GET /admin/products/new - form to create new product */
router.get('/products/new', function(req, res, next) {
  res.render('admin/products/new');
});

/* POST /admin/products - create a new product */
router.post('/products', function(req, res, next) {
  console.log("Data from form", req.body)

  // TODO: Write the product to the database
  
  res.send('respond with a resource');
});

module.exports = router;
