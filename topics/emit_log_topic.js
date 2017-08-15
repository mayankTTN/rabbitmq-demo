/**
 * Created by mayank on 15/8/17.
 */


var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {


        var ex = 'topic_logs';
        var args = process.argv.slice(2);
        var key = (args.length > 0) ? args[0] : 'log.info';
        var msg = args.slice(1).join(' ') || 'Hey Siri!';

        //assert exchanger to persit or not
        ch.assertExchange(ex, 'topic', {durable: false});

        //publish or emit the message with key name
        ch.publish(ex, key, new Buffer(msg));
        console.log(" [x] Sent %s:'%s'", key, msg);
    });

    setTimeout(function() { conn.close(); process.exit(0) }, 500);
});