'use strict';

var express = require('express');
var CareerController = require('../controllers/career');
var md_auth = require('../middlewares/authenticated');

var api = express.Router();

api.get('/career/all', [md_auth.ensureAut, md_auth.ensureAutAdmin], CareerController.listCareer);

api.post('/career/add', [md_auth.ensureAut, md_auth.ensureAutAdmin], CareerController.saveCareer);

api.put('/career/update/:id', [md_auth.ensureAut, md_auth.ensureAutAdmin], CareerController.updateCareer);

api.delete('/career/delete/:id', [md_auth.ensureAut, md_auth.ensureAutAdmin], CareerController.deleteCareer);

module.exports = api;