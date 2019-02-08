'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Teacher = require('./teacher');

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
    identity: {
        type: String,
        required: [true, 'The surname is required.']
    },
    career: {
        type: String,
        required: [true, 'The career is required.']
    },
    image: String,
    teacher: {
        type: Schema.Types.ObjectId, 
        ref: 'Teacher'
    }
});

module.exports = mongoose.model('Student', TeacherSchema);