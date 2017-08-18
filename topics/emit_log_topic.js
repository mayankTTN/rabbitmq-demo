const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, connection) => {

    connection.createChannel((err, channel) => {

        let exchangeName = 'topic_logs_ex',
            args = process.argv.slice(2),
            routingKey = (args.length > 0) ? args[0] : 'log.info',
            msg = args.slice(1).join(' ') || 'undefined';

        //assert exchange to persist or not
        channel.assertExchange(exchangeName, 'topic', {durable: false});

        //publish or emit the message with key name
        channel.publish(exchangeName, routingKey, new Buffer(msg));

        console.log("Sent %s:'%s'", routingKey, msg);
    });

    setTimeout(() => {
        connection.close();
        process.exit(0);
    }, 500);
});