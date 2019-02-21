'use strict';

var Student = require('../models/student');

var fs = require('fs');
var path = require('path');

function saveStudent(req, res) {
    var params = req.body;
    var student = new Student(params);
    student.role = 'ROLE_STUDENT';

    // Check if it contains errors.
    if (!student.validateSync()) {
        Student.findOne({ email: student.email.toLowerCase()}, (err, issetStudent) => {
            if(!issetStudent) {
                student.save()
                    .then((studentStored) => {
                        res.status(200).send({ student: studentStored });
                    })
                    .catch((error) => {
                        res.status(404).send({ message: 'No se ha podido registrar el usuario.' });
                    });
            } else {
                res.status(200).send('El usuario no puede registrarse.');
            }
        })
        .catch((err) => {
            console.log(err);
        });
    } else {
        // In case of validation error
        console.log(student.validateSync().message);
        res.status(502).send('Not accept null values. ' + student.validateSync().message);
    }

    res.status(200);
}

function listStudent(req, res) {
    Student.find({/* All */}, (err, students) => {
        res.status(200).send(students);
    }).catch((err) => {
        res.status(500).send({ message: 'ERROR listing students.' })
    })
}

function deleteStudent(req, res) {
    var id  = req.body.id;
    Student.findOneAndDelete({ _id: id }, (err, student) => {
        if(!student) {
            res.status(404).send({ message: 'Student not found.' });
        } else {
            res.status(200).send(student);
        }
    }).catch((err) => {
        logger.error(err);
        res.status(500).send({ message: 'ERROR deleting student.' })
    })
}

function updateStudent(req, res) {
    var studentId = req.params.id;
    var update = req.body;

    if(studentId != req.user.sub) {
        console.log(studentId);
        // console.log(req.student);
        res.status(500).send({
            messagge: 'No permission to update.'
        });
    } else {
        Student.findOneAndUpdate({ _id: studentId }, update, { new: true }, (err, studentUpdate) => {
            if(!studentUpdate) {
                res.status(404).send({
                    message: 'No update.'
                });
            } else {
                res.status(200).send({
                    student: studentUpdate
                });
            }
        }).catch((err) => {
            res.status(500).send({
                message: 'ERROR UPDATE',
                error: err
            });
        })
    }
}

module.exports = {
    saveStudent,
    listStudent,
    deleteStudent,
    updateStudent,
};