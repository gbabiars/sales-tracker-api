var ObjectID = require('mongodb').ObjectID;

module.exports = function(req, reply) {
    var db = req.server.app.db,
        id = req.params.id;
    db.collection('sales').findOne({ _id: ObjectID(id) }, function(err, sale) {
        if(err) {
            throw err;
        }

        sale.id = sale._id;
        delete sale._id;

        reply({ sale: sale });
    });
};