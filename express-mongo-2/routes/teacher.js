'use strict';

var express = require('express');
var TeacherController = require('../controllers/teacher');

var api = express.Router();

api.get('/teacher', TeacherController.pruebas);
api.get('/teacher/all', TeacherController.listTeacher);

api.post('/teacher/add', TeacherController.saveTeacher);
api.post('/teacher/login', TeacherController.loginTeacher);

module.exports = api;