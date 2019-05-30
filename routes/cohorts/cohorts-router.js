const express = require('express');
const cohortsDb = require('../cohorts/cohortsDb.js');

const router = express.Router();

// endpoints here
router.get('/', async(req, res) => {
    try {
        const cohorts = await cohortsDb.get();
        if(Object.keys(cohorts) === 0) {
            res.status(400).json({ message: 'Could not retrieve cohorts from database' })
        }
        res.status(200).json(cohorts);
    } catch(err) {
        res.status(500).json({ err });
    };
});

module.exports = router;