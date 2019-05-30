const express = require('express');
const studentsDb = require('../students/studentsDb.js');

const router = express.Router();

// endpoints here
router.get('/', async(req, res) => {
    try {
        const students = await studentsDb.get();
        if(Object.keys(students) === 0) {
            res.status(404).json({ message: 'Could not retrieve students from database' })
        }
        res.status(200).json(students);
    } catch(err) {
        res.status(500).json({ err });
    };
});

module.exports = router;