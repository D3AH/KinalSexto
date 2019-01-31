'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Middleware - body parser

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Initialize router

var teacher_routes = require('./routes/teacher');

// Rutas body parser

app.get('/', (req, res) => {
    res.status(200).send({ message: 'Probando nuestro servidor' })
});

// Router

app.use('/api/v1', teacher_routes);

module.exports = app;