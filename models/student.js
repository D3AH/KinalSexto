'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Teacher = require('./teacher');

require('mongoose-type-email');

var StudentSchema = Schema({
    name: {
        type: String,
        required: [true, 'The name is required.']
    },
    surname: {
        type: String,
        required: [true, 'The surname is required.']
    },
    identity: {
        type: Number,
        required: [true, 'The surname is required.']
    },
    role: {
        type: String
    },
    image: String,
    teacher: {
        type: Schema.Types.ObjectId, 
        ref: 'Teacher'
    }
});

module.exports = mongoose.model('Student', StudentSchema);