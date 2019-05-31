exports.up = function (knex, Promise) {
    return knex
        .schema
        .createTable('cohorts', tbl => {
            //   primary key called id, integer, auto-increment
            tbl.increments();
            // string, carchar 128, not null
            tbl
                .string('name', 128)
                .notNullable();
            // createdAt, updatedAt
            tbl.timestamps(true, true);
        });
}

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('cohorts');
};
