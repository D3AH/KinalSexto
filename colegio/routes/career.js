'use strict';

var express = require('express');
var CareerController = require('../controllers/career');
var md_auth = require('../middlewares/authenticated');

var api = express.Router();

api.get('/career/all', CareerController.listCareer);

api.post('/career/add', CareerController.saveCareer);

api.put('/career/update/:id', md_auth.ensureAut, CareerController.updateCareer);

api.delete('/career/delete', CareerController.deleteCareer);

module.exports = api;