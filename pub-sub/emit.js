/**
 * Created by ttnd on 16/8/17.
 */
var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
        var ex = 'logs';
        var msg = process.argv.slice(2).join(' ') || 'Hello World!';

        ch.assertExchange(ex, 'fanout', {durable: false});
        ch.publish(ex, '', new Buffer('{"mayank":"mayanksdvvsdvsd"}'));
        console.log(" [x] Sent %s", msg);
    });

    setTimeout(function() { conn.close(); process.exit(0) }, 500);
});
