const express = require('express');
const router = express.Router();
const { createProduct, allProducts } = require('../db/products');

/* GET /admin - admin landing page. */
router.get('/', function(req, res, next) {
  // DISCUSS3: Rendering ejs views
  res.render('admin/index');
});

/* GET /admin/products - list of products */
router.get('/products', async function(req, res, next) {
  const {rows} = await allProducts({order: 'newest first'})
  const message = req.params.message
  res.render('admin/products/index', {products: rows, message});
});

/* GET /admin/products/new - form to create new product */
router.get('/products/new', function(req, res, next) {
  res.render('admin/products/new', {product: {}});
});

/* POST /admin/products - create a new product */
router.post('/products', async function(req, res, next) {
  console.log('Data from form', req.body)
  // TODO: Do validation here first to make sure the product info is correct

  try {
    // Write the product to the database
    await createProduct({
      title: req.body.title,
      imageUrl: req.body.imageUrl, // Notice that the parameter is imageUrl, because that's what the name="imageUrl" attribute has on the <input> element
                                    // But in the database the column is called image_url, so it's the job of the db/products.js file to use the right column name.
      price: req.body.price,
    })
    res.redirect('/admin/products?message=' + encodeURIComponent("Product save successfully."))
  } catch(e) {
    const message = "Could not save product."
    // Show the product form page and display an error message
    res.render('admin/products/new', {message, product: req.body})
  }

});

module.exports = router;
