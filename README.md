# Getting Started

1. Use node 14. You can install different versions of node using [nvm](https://github.com/nvm-sh/nvm)
2. Install the dependencies `npm install`
3. Create a database using a GUI or the command line. The command `psql -U<YourUserName> -c "CREATE DATABASE <YourDatabaseName>"` should do the trick.
4. Run the migrations `node db/migrations/run.js`. This will create all the tables needed by the app. Whenever you add a new table, you will need to add a migration file to `db/migrations`. See the existing file as an example.
5. Start the app: `npm start`. This already has nodemon baked in so you don't have to worry about manually restarting when code changes.
