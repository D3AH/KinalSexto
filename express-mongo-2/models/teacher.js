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
        type: mongoose.SchemaTypes.Email,
        index: true
    },
    password: {
        type: String,
        required: [true, 'The password is required.']
    },
    role: String
}, { collation: { locale: 'es', strength: 2 } });

TeacherSchema.index({ email: 1 });

module.exports = mongoose.model('Teacher', TeacherSchema);
