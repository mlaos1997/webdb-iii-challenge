
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').truncate() // deletes all records and resets ids on table
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {id: 1, name: 'Marcelo'},
        {id: 2, name: 'Ana'},
        {id: 3, name: 'Chris'}
      ]);
    });
};
