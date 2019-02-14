'use strict';

var mongoose = require('mongoose');
var app = require('./app');

// APP PORT
var port = process.env.PORT || 3789;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/controlDeEmpresa', { useNewUrlParser: true })
    // Connected to mongo
    .then((err, res) => {
        console.log('Connected to mongo.');
        // Init server
        app.listen(port, () => {
            console.log('Server init. http://localhost:3789');
        });
    })
    // Error in conection
    .catch(err => console.log(err));