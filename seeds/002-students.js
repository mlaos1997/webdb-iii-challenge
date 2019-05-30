
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Marcelo', cohort_id: 1},
        {name: 'Ana', cohort_id: 2},
        {name: 'Chris', cohort_id: 3}
      ]);
    });
};
