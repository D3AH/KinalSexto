'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EnterpriseSchema = Schema({
    title: {
        type: String,
        required: [true, 'The title is required.']
    },
    description: {
        type: String,
        required: [true, 'The description is required.']
    },
    category: {
        type: String,
        required: [true, 'The category is required.']
    },
    legalAgent: {
        type: Schema.Types.ObjectId, 
        ref: 'Person'
    }
});

module.exports = mongoose.model('Enterprise', EnterpriseSchema);