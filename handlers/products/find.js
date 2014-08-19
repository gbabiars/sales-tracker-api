var _ = require('lodash');

module.exports = function(req, reply) {
    var db = req.server.app.db;
    db.collection('products').find().toArray(function(err, products) {
        if(err) {
            throw err;
        }

        reply({
            products: _.map(products, function(p) {
                p.id = p._id;
                delete p._id;
                return p;
            })
        });
    });
};