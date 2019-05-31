exports.up = function (knex, Promise) {
    return knex
        .schema
        .createTable('students', tbl => {
            // primary key called id, integer, auto-increment
            tbl.increments();
            // string, varchar 128, not null
            tbl
                .string('name', 128)
                .notNullable();
            // Foreign key
            tbl
                .integer('cohort_id')
                .unsigned()
                .references('id')
                .inTable('cohorts');
            // createdAt, updatedAt
            tbl.timestamps(true, true);
        });
};

exports.down = function (knex, Promise) {
    return knex
        .schema
        .dropTableIfExists('cohorts');
};
