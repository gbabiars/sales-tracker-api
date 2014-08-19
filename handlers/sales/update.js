var ObjectID = require('mongodb').ObjectID;

module.exports = function(req, reply) {
    var db = req.server.app.db,
        id = req.params.id,
        sale = req.payload.sale;

    delete sale.id;

    db.collection('sales').update({ _id: ObjectID(id) }, sale, { w: 1 }, function(err) {
        if(err) {
            throw err;
        }

        sale.id = id;

        reply({ sale: sale });
    });
};