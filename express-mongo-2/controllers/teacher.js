'use strict';

var Teacher = require('../models/teacher');
var bcrypt = require('bcrypt-nodejs');

function saveTeacher(req, res) {
    var teacher = new Teacher();
    var params = req.body;

    
    if (params.email && params.password) {
        teacher.name = params.name;
        teacher.surname = params.surname;
        teacher.email = params.email;
        teacher.password = params.password;
        teacher.ROLE = 'ROLE_TEACHER';

        Teacher.findOne({ email: teacher.email.toLowerCase()}, (err, issetTeacher) => {
            if(err) {
                res.status(500).send({ message: 'Error'});
            } else {
                if(!issetTeacher) {
                    // ENCRYPT PASSWORD
                    bcrypt.hash(params.password, null, null, (error, hash) => {
                        teacher.password = hash;

                        teacher.save((err, teacherStored) => {
                            if(err) {
                                res.status(500).send({ message: 'Error al guardar usuario.' })
                            } else {
                                if(!teacherStored) {
                                    res.status(404).send({ message: 'No se ha podido registrar el usuario.' });
                                } else {
                                    res.status(200).send({ teacher: teacherStored })
                                }
                            }
                        });
                    });
                } else {
                    res.status(200).send('El usuario no puede registrarse.');
                }
            }
        });
    } else {
        res.status(200).send('Not accept null values.')
    }


    res.status(200);
}

function pruebas(req, res) {
    res.status(200).send({ message: 'Test controller:teacher' });
}

module.exports = {
    pruebas,
    saveTeacher
};