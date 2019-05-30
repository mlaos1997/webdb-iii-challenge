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
    return db('students');
};

const getById = id => {
    return db('students')
    .where({ id })
    .first();
};

const insert = cohort => {
    return db('students')
    .insert(cohort)
    .then(ids => {
        return getById(ids[0]);
    });
}

const update = (id, changes) => {
    return db('students')
    .where({ id })
    .update(changes);
}

const remove = id => {
    return db('students')
    .where({ id })
    .del();
};