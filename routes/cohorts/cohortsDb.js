const knex = require('knex');
knexConfig = require('../../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
    find,
    findById,
    insert,
    update,
    remove
};

const find = () => {
    return db('cohorts');
};

const getById = id => {
    return db('cohorts')
    .where({ id })
    .first();
};

const insert = cohort => {
    return db('cohorts')
    .insert(cohort)
    .then(ids => {
        return getById(ids[0]);
    });
}

const update = (id, changes) => {
    return db('cohorts')
    .where({ id })
    .update(changes);
}

const remove = id => {
    return db('cohorts')
    .where({ id })
    .del();
};