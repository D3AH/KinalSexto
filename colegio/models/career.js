'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('mongoose-type-email');

var CareerSchema = Schema({
    name: {
        type: String,
        required: [true, 'The name is required.']
    },
    students: {
        type: [Schema.Types.ObjectId], 
        ref: 'Student'
    },
    teacher: {
        type: Schema.Types.ObjectId, 
        ref: 'Teacher'
    }
});

module.exports = mongoose.model('Career', CareerSchema);