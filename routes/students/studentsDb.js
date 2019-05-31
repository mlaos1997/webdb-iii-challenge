const db = require('../../data/dbConfig.js');

module.exports = {
    get,
    getById,
    insert,
    update,
    remove
};

function get() {
    return db('students');
}

function getById(id) {
    return db('students')
    .where({ id })
    .first();
};

function insert(cohort) {
    return db('students')
    .insert(cohort)
    .then(ids => {
        return getById(ids[0]);
    });
}

function update(id, changes) {
    return db('students')
    .where({ id })
    .update(changes);
}

function remove(id) {
    return db('students')
    .where({ id })
    .del();
};