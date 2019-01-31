'use strict'

var app = require('./app');
var mongose = require('mongoose');

var port = process.env.PORT || 3689;

mongose.Promise = global.Promise;
mongose.connect('mongodb://localhost:27017/Ejemplo1', { useNewUrlParser: true })

.then((err, res) => {
    console.log('Realizando conexión');

    app.listen(port, () => {
        console.log('Node: on \nExpress: on');
    })
})

.catch(err => console.log(err));