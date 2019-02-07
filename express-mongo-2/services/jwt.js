'use strict';

// NODE JS CORS

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'aslkdjfklanfenpqwrioivhnwd';

exports.createToken = function(teacher) {
    var payload = {
        sub: teacher._id,
        name: teacher.name,
        surname: teacher.surname,
        email: teacher.email,
        role: teacher.role,
        image: teacher.image,
        iat: moment().unix(),
        exp: moment().add(30, 'day').unix()
    };
    return jwt.encode(payload, secret);
}