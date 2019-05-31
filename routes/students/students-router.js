const express = require('express');
const studentsDb = require('./studentsDb.js');

const router = express.Router();

const sendUserError = (status, message, res) => {
    res
        .status(status)
        .json({errorMessage: message});
};

// endpoints here
router.get('/', async(req, res) => {
    try {
        const students = await studentsDb.get();
        if (Object.keys(students) === 0) {
            sendUserError(400, 'Could not retrieve students from database', res);
        }
        res
            .status(200)
            .json(students);
    } catch (err) {
        sendUserError(500, err, res);
    };
});

router.get('/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const student = await studentsDb.getById(id);
        if (Object.keys(student).length === 0) {
            sendUserError(400, 'Could not retrieve student from database', res);
        }
        res
            .status(200)
            .json(student);
    } catch (err) {
        sendUserError(500, err, res);
    }
});

router.post('/', async(req, res) => {
    const {name, cohort_id} = req.body;
    try {
        if (!name || !cohort_id) {
            sendUserError(400, 'Please provide name and cohort_id for student', res);
        }
        const student = await studentsDb
            .insert({name, cohort_id})
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
        const deleteStudent = await studentsDb
            .remove(id)
            .then(response => {
                if (response === 0) {
                    sendUserError(404, 'The student with the specified ID does not exist', res);
                }
                res
                    .json(201)
                    .json({message: 'Student has been removed from database'})
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
    const updatedStudent = req.body;
    const {id} = req.params;
    const { name, cohort_id} = req.body;
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
});

module.exports = router;