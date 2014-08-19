var Hapi = require('Hapi'),
    MongoClient = require('mongodb').MongoClient;


var port = parseInt(process.env.PORT) || 8000;
var host = '0.0.0.0';

var server = new Hapi.Server(host, port, { cors: true });

var connectionString = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sales';

MongoClient.connect(connectionString, function(err, db) {
    if(err) {
        console.log(err);
        throw err;
    }

    server.app.db = db;
    console.log('Connected to Mongo');

    server.start(function() {
        console.log('Server running at: ' + server.info.uri);
    });


});

server.route({
    method: 'GET',
    path: '/',
    handler: function(req, reply) {
        reply('Hello');
    }
});

server.route({
    method: 'GET',
    path: '/api/bootstrap',
    handler: require('./handlers/bootstrap')
});

server.route({
    method: 'GET',
    path: '/api/products',
    handler: require('./handlers/products/find')
});

server.route({
    method: 'GET',
    path: '/api/products/{id}',
    handler: require('./handlers/products/find_by_id')
});

server.route({
    method: 'GET',
    path: '/api/sales',
    handler: require('./handlers/sales/find')
});

server.route({
    method: 'GET',
    path: '/api/sales/{id}',
    handler: require('./handlers/sales/find_by_id')
});

server.route({
    method: 'POST',
    path: '/api/sales',
    handler: require('./handlers/sales/add')
});

server.route({
    method: 'PUT',
    path: '/api/sales/{id}',
    handler: require('./handlers/sales/update')
});

server.route({
    method: 'DELETE',
    path: '/api/sales/{id}',
    handler: require('./handlers/sales/remove')
});