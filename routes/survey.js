'use strict';

var express = require('express');
var SurveyController = require('../controllers/survey');
var md_auth = require('../middlewares/authenticated');


var api = express.Router();

/**
 * GET
 */
api.get('/all',
    md_auth.ensureAut,
    SurveyController.listSurveys);

/**
 * POST
 */
api.post('/add',
    md_auth.ensureAut,
    SurveyController.addSurvey);

/**
 * PUT
 */
api.put('/update/:id',
    md_auth.ensureAut,
    SurveyController.updateSurvey);

/**
 * PUT
 */
api.put('/addAnswer/:id',
    md_auth.ensureAut,
    SurveyController.addAnswerSurvey);

/**
 * DELETE
 */
api.delete('/delete/:id',
    md_auth.ensureAut,
    SurveyController.removeSurvey);

module.exports = api;