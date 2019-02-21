'use strict';

var Student = require('../models/student');

function test(req, res) {
    Student.find({/* All */}, (error, students) => {
        res.status(200).send({ students });
    }).cath((err) => {
        res.status(500).send({ message: 'Students internal error' });
    });
}

module.exports = {
    test
}