'use strict';

function test(req, res) {
    res.status(200).send({ message: 'Test student controller' });
}

module.exports = {
    test
}