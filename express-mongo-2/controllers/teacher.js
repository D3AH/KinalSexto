'use strict';

var Teacher = require('../models/teacher');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');

function saveTeacher(req, res) {
    var params = req.body;
    var teacher = new Teacher(params);
    teacher.role = 'ROLE_TEACHER';
    teacher.image = null;

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
                if(check) {
                    params.gettoken ? res.status(200).send({ token: jwt.createToken(teacher) }) : res.status(200).send(teacher);
                } else {
                    res.status(500).send({ message: 'Incorrect authentication.' });
                }
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
    res.status(200).send({
        message: 'Test controller:teacher',
        teacher: req.teacher 
    });
}

function deleteTeacher(req, res) {
    var id  = req.body.id;
    Teacher.findOneAndDelete({ _id: id }, (err, teacher) => {
        if(!teacher) {
            res.status(404).send({ message: 'Teacher not found.' });
        } else {
            res.status(200).send(teacher);
        }
    }).catch((err) => {
        logger.error(err);
        res.status(500).send({ message: 'ERROR deleting teacher.' })
    })
}

function updateTeacher(req, res) {
    var teacherId = req.params.id;
    var update = req.body;

    if(teacherId != req.teacher.sub) {
        console.log(teacherId);
        // console.log(req.teacher);
        res.status(500).send({
            messagge: 'No permission to update.'
        });
    } else {
        Teacher.findOneAndUpdate({ _id: teacherId }, update, { new: true }, (err, teacherUpdate) => {
            if(!teacherUpdate) {
                res.status(404).send({
                    message: 'No update.'
                });
            } else {
                res.status(200).send({
                    teacher: teacherUpdate
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

function uploadImage(req, res) {
    var teacherId = req.params.id;

    if(req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];
    }
    res.status(200).send({
        message: file_name
    });
}

module.exports = {
    pruebas,
    saveTeacher,
    loginTeacher,
    listTeacher,
    deleteTeacher,
    updateTeacher,
    uploadImage
};