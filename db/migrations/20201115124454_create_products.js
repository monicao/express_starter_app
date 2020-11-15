const { query } = require('../connection')

/**
 * This is an example of a migration. The purpose of a migration is to document your database structure.
 * I recommend creating your table using a GUI like Postico and then copying/pasting the resulting
 * CREATE TABLE statement in here.
 */

async function migrate() {
  await query(`
    CREATE TABLE products (
      id SERIAL PRIMARY KEY,
      title character varying NOT NULL,
      image_url character varying,
      price integer NOT NULL
    );
  `);
  await query(`CREATE UNIQUE INDEX products_pkey ON products(id int4_ops);`);
}
migrate();