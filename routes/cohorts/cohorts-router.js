const express = require('express');
const cohortsDb = require('./cohortsDb.js');

const router = express.Router();

const sendUserError = (status, message, res) => {
    res
        .status(status)
        .json({errorMessage: message});
};

// endpoints here
router.get('/', async(req, res) => {
    try {
        const cohorts = await cohortsDb.get();
        if (Object.keys(cohorts).length === 0) {
            sendUserError(400, 'Could not retrieve cohorts from database', res);
        }
        res
            .status(200)
            .json(cohorts);
    } catch (err) {
        sendUserError(500, err, res);
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
            sendUserError(400, 'Could not retrieve cohort from database', res);
        }
    } catch (err) {
        sendUserError(500, err, res);
    }
});


router.post('/', async(req, res) => {
    const {name} = req.body;
    try {
        if (!name) {
            sendUserError(400, 'Please provide name and for cohort', res);
        }
        const cohort = await cohortsDb
            .insert({name})
            .then(response => {
                res
                    .status(201)
                    .json(response);
            });
    } catch (err) {
        sendUserError(500, err, res);
    }
});

router.delete('/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const deleteCohort = await cohortsDb
            .remove(id)
            .then(response => {
                if (response === 0) {
                    sendUserError(404, 'The cohort with the specified ID does not exist', res);
                }
                res
                    .json(201)
                    .json({message: 'Cohort has been removed from database'})
            })
            // not very proficient, going to refactor
            .catch(error => {
                console.log(error);
            })
    } catch (err) {
        sendUserError(500, err, res);
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
                sendUserError(404, 'cohort not found in database', res);
            }
        } catch (err) {
            sendUserError(500, err, res);
        }
    }
});

module.exports = router;