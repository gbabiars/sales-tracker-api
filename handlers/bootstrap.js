var bootstrap = require('../bootstrap');

module.exports = function(req, reply) {
    bootstrap(req.server.app.db, function() {
        reply('Success');
    });
};