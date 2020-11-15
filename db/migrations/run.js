/**
 * Runs all the migration files in this folder.
 * Migration files must start with a number. In order to prevent conflicts when more than
 * one developer is working on the app we use a timestamp as the number.
 * Ex: 20201115130000 -> A migration that was created On Nov 15th, 2020 at 13:00 hours.
 */

require('fs')
  .readdirSync(__dirname)
  .filter((file) => file.match(STARTS_WITH_NUMBER))
  .sort()
  .forEach((file) => {
    console.log('--> Running migration', file);
    require('./' + file);;
  });
