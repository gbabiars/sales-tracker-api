var ObjectID = require('mongodb').ObjectID;

module.exports = function(req, reply) {
    var db = req.server.app.db,
        id = req.params.id;
    db.collection('sales').remove({ _id: ObjectID(id) }, { w: 1 }, function(err, sale) {
        if(err) {
            throw err;
        }

        reply().code(204);
    });
};