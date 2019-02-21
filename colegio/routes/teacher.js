'use strict';

var express = require('express');
var TeacherController = require('../controllers/teacher');
var md_auth = require('../middlewares/authenticated');
var multiparty = require('connect-multiparty');

var md_upload = multiparty({ uploadDir: './uploads/teachers' });

var api = express.Router();

api.get('/teacher/all', [md_auth.ensureAut, md_auth.ensureAutAdmin], TeacherController.listTeacher);
api.get('/teacher/students', [md_auth.ensureAut, md_auth.ensureAutAdmin], TeacherController.listMyStudents);

api.post('/teacher/add', [md_auth.ensureAut, md_auth.ensureAutAdmin], TeacherController.saveTeacher);
api.post('/teacher/login', [md_auth.ensureAut, md_auth.ensureAutAdmin], TeacherController.loginTeacher);

api.put('/teacher/update/:id', [md_auth.ensureAut, md_auth.ensureAutAdmin], TeacherController.updateTeacher);

api.delete('/teacher/delete', [md_auth.ensureAut, md_auth.ensureAutAdmin], TeacherController.deleteTeacher);

api.post('/upload/activity/:id', [md_auth.ensureAut, md_upload],TeacherController.uploadActivity);

module.exports = api;