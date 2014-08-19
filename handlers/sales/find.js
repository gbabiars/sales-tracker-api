var _ = require('lodash');

module.exports = function(req, reply) {
    var db = req.server.app.db;
    db.collection('sales').find().toArray(function(err, sales) {
        if(err) {
            throw err;
        }

        reply({
            sales: _.map(sales, function(s) {
                s.id = s._id;
                delete s._id;
                return s;
            })
        });
    });
};