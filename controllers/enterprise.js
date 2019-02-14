'use strict';

var Enterprise = require('../models/enterprise');

function saveEnterprise(req, res) {
    var enterprise = new Enterprise(req.body);
    enterprise.legalAgent = req.person.sub;

    // Validate enterprise!
    if(!enterprise.validateSync()) {
        enterprise.save()
            .then((enterpriseStored) => {
                res.status(200).send({ enterprise: enterpriseStored });
            })
            .catch((error) => {
                res.status(500).send({ message: 'ERROR enterprise not save' });
            });
    } else {
        res.status(502).send(enterprise.validateSync().message);
    }
}

function updateEnterprise(req, res) {
    var enterpriseId = req.params.id;
    var update = req.body;

    Enterprise.findOneAndUpdate({ _id: enterpriseId, legalAgent: req.person.sub }, update, { new: true }, (err, personUpdate) => {
        if(!personUpdate) {
            res.status(404).send({
                message: 'No update. Not found enterprise or not have permissions.'
            });
        } else {
            res.status(200).send({
                person: personUpdate
            });
        }
    }).catch((err) => {
        res.status(500).send({
            message: 'ERROR UPDATE',
            error: err
        });
    })
}

function infoEnterprise(req, res) {
    var enterpriseId = req.params.id;

    Enterprise.find({ _id: enterpriseId, legalAgent: req.person.sub }, (err, enterprise) => {
        if(!enterprise) {
            res.status(404).send({
                message: 'ERROR. Not found enterprise or not have permissions.'
            });
        } else {
            res.status(200).send({
                person: enterprise
            });
        }
    }).catch((err) => {
        res.status(500).send({
            message: 'ERROR UPDATE',
            error: err
        });
    })
}

function deleteEnterprise(req, res) {
    var id  = req.body.id;
    Enterprise.findOneAndDelete({ _id: id, legalAgent: req.person.sub }, (err, enterprise) => {
        if(!enterprise) {
            res.status(404).send({ message: 'Enterprise not found.' });
        } else {
            res.status(200).send(enterprise);
        }
    }).catch((err) => {
        logger.error(err);
        res.status(500).send({ message: 'ERROR deleting person.' })
    })
}

function getReport(req, res) {
    if (req.person.role === 'ADMIN') {
        var category = req.query.category;
        if (category == null) {
            Enterprise.find({/* All */}, (err, enterprise) => {
                res.status(200).send(enterprise);
            }).catch((err) => {
                res.status(500).send({ message: 'ERROR listing enterprise.' })
            })
        } else {
            Enterprise.find({ category: category }, (err, enterprise) => {
                enterprise.length ? res.status(200).send(enterprise) : res.status(400).send({ message: 'Not found enterprise with category ' + category });
            }).catch((err) => {
                res.status(500).send({ message: 'ERROR listing enterprise.' })
            })
        }
    } else {
        res.status(500).send({ message: 'Need be a admin.' })
    }
}

module.exports = {
    saveEnterprise,
    updateEnterprise,
    deleteEnterprise,
    getReport,
    infoEnterprise
}