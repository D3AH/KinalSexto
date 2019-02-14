'use strict';

// NODE JS CORS

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'aslkdjfklanfenpqwrioivhnwd';

exports.createToken = function(person) {
    var payload = {
        sub: person._id,
        name: person.name,
        surname: person.surname,
        email: person.email,
        role: person.role,
        iat: moment().unix(),
        exp: moment().add(30, 'day').unix()
    };
    return jwt.encode(payload, secret);
}