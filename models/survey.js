'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SurveySchema = Schema({
    title: {
        type: String,
        required: [true, 'The title is required.'],
        index: true,
        unique: true
    },
    description: {
        type: String,
        required: [true, 'The description is required.']
    },
    answers: {
        // Virtual
        type: [{
            user: { type: Schema.Types.ObjectId,  ref: 'User' },
            answer: String
        }],
    },
    author: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Survey', SurveySchema);