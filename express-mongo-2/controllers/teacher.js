'use strict';

var Teacher = require('../models/teacher');
var bcrypt = require('bcrypt-nodejs');

function saveTeacher(req, res) {
    var params = req.body;
    var teacher = new Teacher(params);
    teacher.role = 'ROLE_TEACHER';

    // Check if it contains errors.
    if (!teacher.validateSync()) {
        Teacher.findOne({ email: teacher.email.toLowerCase()}, (err, issetTeacher) => {
            if(!issetTeacher) {
                // ENCRYPT PASSWORD
                bcrypt.hash(params.password, null, null, (error, hash) => {
                    teacher.password = hash;
                    teacher.save()
                        .then((teacherStored) => {
                            res.status(200).send({ teacher: teacherStored });
                        })
                        .catch((error) => {
                            res.status(404).send({ message: 'No se ha podido registrar el usuario.' });
                        });
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
        console.log(teacher.validateSync().message);
        res.status(502).send('Not accept null values. ' + teacher.validateSync().message);
    }

    res.status(200);
}

function loginTeacher(req, res) {
    var params = req.body;
    var email = params.email;
    var password = params.password;

    Teacher.findOne({ email: email.toLowerCase() }, (err, teacher) => {
        if(teacher) {
            bcrypt.compare(password, teacher.password, (err, check) => {
                check ? res.status(200).send(teacher) : res.status(500).send({ message: 'Incorrect authentication.' });
            });
        } else {
            console.log(teacher);
            res.status(500).send({ message: 'User not exist.' });
        }
    })
    .catch((err) => {
        res.status(500).send({ message: 'ERROR in login.' })
    })
}

function listTeacher(req, res) {
    Teacher.find({/* All */}, (err, teachers) => {
        res.status(200).send(teachers);
    }).catch((err) => {
        res.status(500).send({ message: 'ERROR listing teachers.' })
    })
}

function pruebas(req, res) {
    res.status(200).send({ message: 'Test controller:teacher' });
}

module.exports = {
    pruebas,
    saveTeacher,
    loginTeacher,
    listTeacher
};