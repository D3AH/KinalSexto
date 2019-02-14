'use strict';

var Person = require('../models/person');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');

var fs = require('fs');
var path = require('path');

function savePerson(req, res) {
    var params = req.body;
    var person = new Person(params);
    person.role = 'ROLE_PERSON';
    person.image = null;

    // Check if it contains errors.
    if (!person.validateSync()) {
        Person.findOne({ email: person.email.toLowerCase()}, (err, issetPerson) => {
            if(!issetPerson) {
                // ENCRYPT PASSWORD
                bcrypt.hash(params.password, null, null, (error, hash) => {
                    person.password = hash;
                    person.save()
                        .then((personStored) => {
                            res.status(200).send({ person: personStored });
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
        console.log(person.validateSync().message);
        res.status(502).send('Not accept null values. ' + person.validateSync().message);
    }

    res.status(200);
}

function loginPerson(req, res) {
    var params = req.body;
    var email = params.email;
    var password = params.password;

    Person.findOne({ email: email.toLowerCase() }, (err, person) => {
        if(person) {
            bcrypt.compare(password, person.password, (err, check) => {
                if(check) {
                    params.gettoken ? res.status(200).send({ token: jwt.createToken(person) }) : res.status(200).send(person);
                } else {
                    res.status(500).send({ message: 'Incorrect authentication.' });
                }
            });
        } else {
            console.log(person);
            res.status(500).send({ message: 'User not exist.' });
        }
    })
    .catch((err) => {
        res.status(500).send({ message: 'ERROR in login.' })
    })
}

function deletePerson(req, res) {
    var id  = req.body.id;
    Person.findOneAndDelete({ _id: id }, (err, person) => {
        if(!person) {
            res.status(404).send({ message: 'Person not found.' });
        } else {
            res.status(200).send(person);
        }
    }).catch((err) => {
        logger.error(err);
        res.status(500).send({ message: 'ERROR deleting person.' })
    })
}

module.exports = {
    savePerson,
    loginPerson,
    deletePerson
};