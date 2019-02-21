'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Import routes
var teacher_routes = require('./routes/teacher');
var student_routes = require('./routes/student');
var career_routes = require('./routes/career');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Add routes
app.use('/v1/', teacher_routes);
app.use('/v1/', student_routes);
app.use('/v1/', career_routes);

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Check if is live
app.get('/live', (req, res) => {
    res.status(200).send({ message: 'Server on!' });
})

module.exports = app;