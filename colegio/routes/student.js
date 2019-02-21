'use strict';

var express = require('express');
var StudentController = require('../controllers/student');
var md_auth = require('../middlewares/authenticated');

var api = express.Router();

api.get('/student/all', StudentController.listStudent);

api.post('/student/add', StudentController.saveStudent);

api.put('/student/update/:id', md_auth.ensureAut, StudentController.updateStudent);

api.delete('/student/delete', StudentController.deleteStudent);

module.exports = api;