'use strict';

var express = require('express');
var TeacherController = require('../controllers/teacher');
var md_auth = require('../middlewares/authenticated');
var multiparty = require('connect-multiparty');

var md_upload = multiparty({ uploadDir: './uploads/teachers' });

var api = express.Router();

api.get('/controller/teacher', md_auth.ensureAut ,TeacherController.pruebas);
api.get('/controller/teacher/all', TeacherController.listTeacher);
api.get('/controller/teacher/image', TeacherController.getImage);

api.post('/controller/teacher/add', TeacherController.saveTeacher);
api.post('/controller/teacher/login', TeacherController.loginTeacher);

api.put('/controller/teacher/update/:id', md_auth.ensureAut, TeacherController.updateTeacher);

api.delete('/controller/teacher/delete', TeacherController.deleteTeacher);

api.post('/upload/image/:id', [md_auth.ensureAut, md_upload],TeacherController.uploadImage);

module.exports = api;