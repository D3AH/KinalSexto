'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-type-email');

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
        type: mongoose.SchemaTypes.Email
    },
    password: {
        type: String,
        required: [true, 'The password is required.']
    },
    role: String
});

module.exports = mongoose.model('Teacher', TeacherSchema);