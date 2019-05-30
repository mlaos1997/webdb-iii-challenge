const express = require('express');
const cohortsDb = require('../cohorts/cohortsDb.js');

const router = express.Router();

// endpoints here
router.get('/', async(req, res) => {
    try {
        const cohorts = await cohortsDb.get();
        if (Object.keys(cohorts) === 0) {
            res
                .status(400)
                .json({message: 'Could not retrieve cohorts from database'})
        }
        res
            .status(200)
            .json(cohorts);
    } catch (err) {
        res
            .status(500)
            .json({err});
    };
});

router.get('/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const cohort = await cohortsDb.getById(id);
        if (cohort) {
            res
                .status(200)
                .json(cohort);
        } else {
            res
                .status(404)
                .json({message: 'The cohort with the specified id could not be found'});
        }
    } catch (err) {
        res
            .status(500)
            .json({err});
    }
})

module.exports = router;