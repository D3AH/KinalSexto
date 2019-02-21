'use strict';

var Teacher = require('../models/teacher');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
var multiparty = require('connect-multiparty');

var fs = require('fs');
var path = require('path');

function pruebas(req, res) {
    res.status(200).send({
        message: 'Test controller:teacher',
        teacher: req.teacher 
    });
}

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

    if(teacherId != req.user.sub) {
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

        var ext_explit = file_name.split('\.');
        var file_ext = ext_explit[1];

        if(
            file_ext == 'jpg' ||
            file_ext == 'jpeg' ||
            file_ext == 'png' ||
            file_ext == 'gif' ||
            file_ext == 'bmp'
        ) {
            if(teacherId != req.user.sub) {
                res.status(500).send({
                    message: 'No authorization'
                });
            } else {
                Teacher.findOneAndUpdate(
                    { _id: teacherId },
                    { image: file_name },
                    { new: true },
                    (err, teacherUpdate) => {
                        if(!teacherUpdate) {
                            res.status(404).send({ message: 'Nothing update' });
                        } else {
                            res.status(200).send({ message: 'Teacher update', image: file_name }); 
                        }
                }).catch((err) => {
                    res.status(500).send({ message: 'Error to update.' });
                });
            }
        } else {
            res.status(200).send({ message: 'Only images.' });
            fs.unlink(file_path, (err) => {
                if(err) {
                    res.status(200).send({ message: 'Extension not allow. File upload dont deleted.' });
                } else {
                    res.status(200).send({ message: 'Extension not allow. File upload and deleted.' });
                }
            });
        }
    } else {
        res.status(404).send({ message: 'File required' });
    }
}

function getImage(req, res) {
     var teacherId = req.body.id;

     Teacher.findOne({ _id: teacherId }, (err, teacher) => {
        var image = teacher.image;
        var image_path = path.format({
            dir: './uploads/teachers',
            base: image
        });
        fs.exists(image_path, function(exists) {
            if(exists) {
                res.sendFile(path.resolve(image_path));
            } else {
                res.status(404).send({ message: 'File not found.'});
            }
        })
        // res.format({
        //     'image/gif': () => {
        //         res.status(200).send(img);
        //     }
        // });
     });
}

module.exports = {
    pruebas,
    saveTeacher,
    loginTeacher,
    listTeacher,
    deleteTeacher,
    updateTeacher,
    uploadImage,
    getImage
};