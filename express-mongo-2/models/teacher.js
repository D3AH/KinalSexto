'use strict';

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var TeacherSchema = Schema({
    name: {
        type: String,
        required: [true, 'The name is required.']
    },
    surname: {
        type: String,
        required: [true, 'The surname is required.']
    },
    email: {
        type: String,
        required: [true, 'The email is required.']
    },
    password: {
        type: String,
        required: [true, 'The password is required.']
    },
    role: String
});

module.exports = mongoose.model('Teacher', TeacherSchema);