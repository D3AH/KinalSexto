'use strict';

var Career = require('../models/career');

function saveCareer(req, res) {
    var params = req.body;
    var career = new Career(params);

    if(career.students === '') {
        career.students = [];
    }

    // Check if it contains errors.
    if (!career.validateSync()) {
        Career.findOne({ name: career.name.toLowerCase()}, (err, issetCareer) => {
            if(!issetCareer) {
                career.save()
                    .then((careerStored) => {
                        res.status(200).send({ career: careerStored });
                    })
                    .catch((error) => {
                        res.status(404).send({ message: 'No se ha podido registrar la carrera.' });
                    });
            } else {
                res.status(200).send('La carrera no puede registrarse.');
            }
        })
        .catch((err) => {
            console.log(err);
        });
    } else {
        // In case of validation error
        console.log(career.validateSync().message);
        res.status(502).send('Not accept null values. ' + career.validateSync().message);
    }

    res.status(200);
}

function listCareer(req, res) {
    Career.find({/* All */}, (err, careers) => {
        res.status(200).send(careers);
    }).catch((err) => {
        res.status(500).send({ message: 'ERROR listing careers.' })
    })
}

function deleteCareer(req, res) {
    var id  = req.params.id;
    Career.findOneAndDelete({ _id: id }, (err, career) => {
        if(!career) {
            res.status(404).send({ message: 'Career not found.' });
        } else {
            res.status(200).send(career);
        }
    }).catch((err) => {
        logger.error(err);
        res.status(500).send({ message: 'ERROR deleting career.' })
    })
}

function updateCareer(req, res) {
    var careerId = req.params.id;
    console.log(careerId);
    var update = req.body;

    Career.findOneAndUpdate({ _id: careerId }, update, { new: true }, (err, careerUpdate) => {
        if(!careerUpdate && !err) {
            res.status(404).send({
                message: 'No update.'
            });
        } else {
            res.status(200).send({
                career: careerUpdate
            });
        }
    }).catch((err) => {
        res.status(500).send({
            message: 'ERROR UPDATE',
            error: err
        });
    })
}

module.exports = {
    saveCareer,
    listCareer,
    deleteCareer,
    updateCareer,
};