module.exports = function(req, reply) {
    var db = req.server.app.db,
        sale = req.payload.sale;

    db.collection('sales').insert(sale, { w: 1 }, function(err) {
        if(err) {
            throw err;
        }

        sale.id = sale._id;
        delete sale._id;

        reply({ sale: sale });
    });
};