const { query } = require('../connection')

// This script creates sample data that is useful to help a developer get up and running.
// Run with
//   node db/migrations/sample_data.js


const products = [
  {title: 'Fabric Flower Pots', image_url: '/images/fabric-flower-pots.jpg', price: 1200},
  {title: 'Ceramic Flower Pots', image_url: '/images/ceramic-flower-pots.jpg', price: 1599},
]

products.forEach(async (product) => {
  try {
    await query(`
      INSERT INTO products (title, image_url, price)
      VALUES($1, $2, $3, NOW())
    `, [product.title, product.image_url, product.price]);
  } catch (error) { console.error(error) }
})