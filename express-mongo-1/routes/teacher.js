'use strict'

var express = require('express');
var TeacherController = require('../controllers/teacher');

var api = express.Router();

api.get('/pruebas', TeacherController.pruebas);

module.exports = api;