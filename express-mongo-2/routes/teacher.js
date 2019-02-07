'use strict';

var express = require('express');
var TeacherController = require('../controllers/teacher');
var md_auth = require('../middlewares/authenticated');

var api = express.Router();

api.get('/controller/teacher', md_auth.ensureAut ,TeacherController.pruebas);
api.get('/controller/teacher/all', TeacherController.listTeacher);

api.post('/controller/teacher/add', TeacherController.saveTeacher);
api.post('/controller/teacher/login', TeacherController.loginTeacher);

api.put('/controller/teacher/update/:id', md_auth.ensureAut, TeacherController.updateTeacher);

api.delete('/controller/teacher/delete', TeacherController.deleteTeacher);

module.exports = api;