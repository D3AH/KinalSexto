'use strict';

var express = require('express');
var SurveyController = require('../controllers/survey');
var md_auth = require('../middlewares/authenticated');


var api = express.Router();

/**
 * GET
 */
api.get('/survey/all',
    md_auth.ensureAut,
    SurveyController.listSurveys);

/**
 * POST
 */
api.post('/survey/add',
    md_auth.ensureAut,
    SurveyController.addSurvey);

/**
 * PUT
 */
api.put('/survey/update/:id',
    md_auth.ensureAut,
    SurveyController.updateSurvey);

/**
 * DELETE
 */
api.delete('/survey/delete/:id',
    md_auth.ensureAut,
    SurveyController.removeSurvey);

module.exports = api;