'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var helmet = require('helmet');

var app = express();

// Import routes
var teacher_routes = require('./routes/teacher');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Deactive in dev
// app.use(helmet());

// Add routes
app.use('/v1/', teacher_routes);

// Check if is live
app.get('/live', (req, res) => {
    res.status(200).send({ message: 'Server on!' });
})

module.exports = app;