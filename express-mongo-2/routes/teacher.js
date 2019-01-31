'use strict';

var express = require('express');
var TeacherController = require('../controllers/teacher');

var api = express.Router();

api.get('/test/controller/teacher', TeacherController.pruebas);
api.post('/test/controller/teacher/add', TeacherController.saveTeacher);
api.post('/test/controller/teacher/login', TeacherController.loginTeacher);

module.exports = api;