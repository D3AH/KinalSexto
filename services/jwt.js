'use strict';

// NODE JS CORS

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'aslkdjfklanfenpqwrioivhnwd';

exports.createToken = function(user) {
    var payload = {
        id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(30, 'day').unix()
    };
    return jwt.encode(payload, secret);
}