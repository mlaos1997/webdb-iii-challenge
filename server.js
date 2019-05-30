const express = require('express');
const knex = require('knex');
const server = express();

const cohortsRouter = require('./routes/cohorts-router');
const studentsRouter = require('./routes/students-router');

server.use(express.json());
server.use('/api/cohorts', cohortsRouter);
server.use('./api/students', studentsRouter);

server.get('/', (req, res) => {
    res.send(
        `<h2>WEB DB III Challenge</h2>`
    );
});

module.exports = server;

