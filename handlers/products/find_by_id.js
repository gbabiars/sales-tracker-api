var ObjectID = require('mongodb').ObjectID;

module.exports = function(req, reply) {
    var db = req.server.app.db,
        id = req.params.id;
    db.collection('products').findOne({ _id: ObjectID(id) }, function(err, product) {
        if(err) {
            throw err;
        }

        product.id = product._id;
        delete product._id;

        reply({ product: product });
    });
};