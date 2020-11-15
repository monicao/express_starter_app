const { query } = require('./connection')

module.exports = {
  createProduct: ({title, imageUrl, price}) => {
    return query(`
      INSERT INTO products
        (title, image_url, price, created_at)
        VALUES ($1, $2, $3, NOW())
    `, [title, imageUrl, price]);
  },
  allProducts: ({order}) => {
    const orderBy = order === 'newest first' ? "ORDER BY created_at DESC" : "ORDER BY created_at ASC"
    // DISCUSSION7: orderBy is being interpolated in the string directly instead of using safeParams.
    //   But in this case, this does not pose a security risk. Why?
    return query(`
      SELECT * from products ${orderBy};
    `)
  },
  deleteProduct: (id) => {
    return query(`
      DELETE FROM products WHERE id=$1
    `, [id]);
  }
}