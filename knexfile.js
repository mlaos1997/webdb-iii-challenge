// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/lambda.db3' // if not created, knex will create on migration
    },
    useNullAsDefault: true, // needed for sqlite3
  }
};
