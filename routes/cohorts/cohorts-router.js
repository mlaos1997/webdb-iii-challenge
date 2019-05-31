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
});

router.post('/', async(req, res) => {
    const newCohort = req.body;
    if (newCohort.name) {
        try {
            const cohort = await cohortsDb.insert(newCohort);
            res
                .status(200)
                .json(cohort);
        } catch (err) {
            res
                .status(500)
                .json({err})
        };
    } else {
        res
            .status(400)
            .json({message: 'Please provide name of cohort'})
    }
});

router.delete('/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const deleteCohort = await cohortsDb.remove(id);
        if (req.body.length > 0) {
            res
                .status(404)
                .json({message: 'cohort not found'})
        } else {
            res
                .status(201)
                .json({message: 'cohort deleted'})
        }
    } catch (err) {
        res
            .status(500)
            .json({err})
    }
});

router.put('/:id', async(req, res) => {
    const updatedCohort = req.body;
    const {id} = req.params;
    if (updatedCohort.name) {
        try {
            const cohort = await cohortsDb.update(id, updatedCohort);
            if (cohort) {
                res
                    .status(200)
                    .json(cohort);
            } else {
                res
                    .status(404)
                    .json({message: 'cohort not found in database'})
            }
        } catch (err) {
            res
                .status(500)
                .json({err});
        }
    }
});

module.exports = router;