'use strict';

/*
    Authenticate a request in routes.
*/

var jwt = require('jwt-simple');
var moment = require('moment');

var secret = 'aslkdjfklanfenpqwrioivhnwd';

exports.ensureAut = function(req, res, next) {
    if(!req.headers.authorization) {
        return res.status(400).send({ message: 'La petición no tiene autenticación.' })
    }

    var token = req.headers.authorization.replace(/['"]+/g, '');
    try {
        var payload = jwt.decode(token, secret);
        if(payload.exp <= moment().unix()) {
            return res.status(404).send({
                message: 'El token ha expirado.'
            });
        }
    } catch(exp) {
        return res.status(404).send({
            message: 'El token no es valido.'
        });
    }
    req.person = payload;
    next();
}

