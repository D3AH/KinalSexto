'use strict';

var express = require('express');
var EnterpriseController = require('../controllers/enterprise');

var md_auth = require('../middlewares/authenticated');

var api = express.Router();

api.get('/report', md_auth.ensureAut, EnterpriseController.getReport);
api.get('/info/:id', md_auth.ensureAut, EnterpriseController.infoEnterprise);

api.post('/add', md_auth.ensureAut, EnterpriseController.saveEnterprise);

api.put('/update/:id', md_auth.ensureAut, EnterpriseController.updateEnterprise);

api.delete('/delete', md_auth.ensureAut, EnterpriseController.deleteEnterprise);

module.exports = api;