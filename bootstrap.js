var moment = require('moment');

var PRODUCTS = [
    {
        name: 'Apple iPhone 5',
        description: 'A popular phone from Apple which means it is super innovative even if other phones already have the features.'
    },
    {
        name: 'Samsung Galaxy S5',
        description: 'It is an Android and so much better than those other phones.'
    },
    {
        name: 'Nokia Lumia 1020',
        description: 'I know these exist, but do people actually use them?'
    }
];

var SALES = [
    {
        volume: 1000,
        price: 50000,
        date: moment().startOf('day').toDate()
    },
    {
        volume: 200,
        price: 8000,
        date: moment().startOf('day').toDate()
    },
    {
        id: 3,
        volume: 200,
        price: 10000,
        date: moment().startOf('day').toDate()
    },
    {
        volume: 2,
        price: 500,
        date: moment().startOf('day').toDate()
    }
];

module.exports = function(db, cb) {

    db.dropDatabase(function() {
        db.createCollection('products', function(err, products) {
            products.insert(PRODUCTS, { w: 1 }, function(err, productDocs) {
                db.createCollection('sales', function(err, sales) {
                    SALES[0].product = productDocs[0]._id;
                    SALES[1].product = productDocs[1]._id;
                    SALES[2].product = productDocs[0]._id;
                    SALES[3].product = productDocs[2]._id;

                    sales.insert(SALES, { w: 1 }, function() {
                        cb()
                    });
                });
            });
        });
    });
};

