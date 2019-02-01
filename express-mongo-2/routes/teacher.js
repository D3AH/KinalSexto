'use strict';

var express = require('express');
var TeacherController = require('../controllers/teacher');

var api = express.Router();

api.get('/test/controller/teacher', TeacherController.pruebas);
api.get('/test/controller/teacher/all', TeacherController.listTeacher);

api.post('/test/controller/teacher/add', TeacherController.saveTeacher);
api.post('/test/controller/teacher/login', TeacherController.loginTeacher);

module.exports = api;