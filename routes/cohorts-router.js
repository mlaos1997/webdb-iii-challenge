const express = require('express');
const knex = require('knex');

const router = express.Router();

const knexConfig = {
    client: 'sqlite3',
    connection: {
        filename: './data/lambda.sqlite3' // path from root folder
    },
    useNullAsDefault: true
};

const db = knex(knexConfig);

// endpoints here