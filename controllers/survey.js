'use strict';

/**
 * Survey controller
 * @module controller/survey
 */

const Survey = require('../models/survey');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');
const fs = require('fs');
const path = require('path');

/**
 * Adds a survey.
 *
 * @param      {Object}  req     The request
 * @param      {Object}  res     The response
 * @return     {Object}  Status error message || survey saved.
 */
function addSurvey(req, res) {
    var tempSurvey = new Survey(req.body);
    var validate = tempSurvey.validateSync();

    if(!validate) {
        Survey.find({ code: tempSurvey.code }, (err, surveys) => {
            surveys && surveys.length ? res.status(500).send({ message: 'There is already a survey with that code.' }) : tempSurvey
            .save()
            .then((surveySaved) => {
                surveySaved ? res.status(200).send({ survey: surveySaved }) : res.status(400).send({ message: 'Unexpected error.' });
            })
            .catch((err) => res.status(500).send({ err }));
        });
    } else {
        res.status(400).send({ message: validate.message });
    }
}

/**
 * Removes a survey.
 *
 * @param      {Object}  req     The request
 * @param      {Object}  res     The response
 * @return      {String|Object}     Status error message || survey deleted.
 */
function removeSurvey(req, res) {
    Survey.findByIdAndDelete(req.params.id, (err, survey) => {
        survey ? res.status(200).send({ message: 'Survey successfully deleted.', survey }) : res.status(400).send({ message: 'Unexpected error. Maybe survey don\'t exist.' });
    })
    .catch((err) => res.status(500).send({ err }));
}

/**
 * Update a survey.
 *
 * @param {Object} req     The request
 * @param {Object} res     The response
 * @returns     {String|Object}     Status error message || survey updated.
 */
function updateSurvey(req, res) {
    Survey.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, survey) => {
        survey ? res.status(200).send({ survey }) : res.status(500).send({ message: 'Survey dont found.' });
    })
    .catch((err) => res.status(500).send({ err }));
}

/**
 * Search surveys.
 *
 * @param {Object} req The request
 * @param {Object} res The response
 * @return String|Object|Array}     Status error message || survey searched.
 */
function searchSurvey(req, res) {
    /**
     * @TODO create a more complex search with multiple query params.
     */
    Survey.find({ name: new RegExp('.*'+req.query.name+'*.', 'i') }, (err, surveys) => {
        surveys ? res.status(200).send({ surveys }) : res.status(500).send({ message: 'Survey dont found.' });
    })
    .catch((err) => res.status(500).send({ err }));
}

/**
 * List surveys.
 *
 * @param {Object} req The request
 * @param {Object} res The response
 */
function listSurveys(req, res) {
    Survey.find({/* All */ }, (err, surveys) => {
        res.status(200).send({ surveys });
    })
    .catch((err) => res.status(500).send({ err }));
}

module.exports = {
    addSurvey,
    removeSurvey,
    updateSurvey,
    searchSurvey,
    listSurveys
}