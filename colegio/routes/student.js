'use strict';

var express = require('express');
var StudentController = require('../controllers/student');
var md_auth = require('../middlewares/authenticated');

var api = express.Router();

api.get('/student/all', [md_auth.ensureAut, md_auth.ensureAutAdmin], StudentController.listStudent);

api.post('/student/add', [md_auth.ensureAut, md_auth.ensureAutAdmin], StudentController.saveStudent);

api.put('/student/update/:id', [md_auth.ensureAut, md_auth.ensureAutAdmin], StudentController.updateStudent);

api.delete('/student/delete', [md_auth.ensureAut, md_auth.ensureAutAdmin], StudentController.deleteStudent);

module.exports = api;