const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, connection) => {

    connection.createChannel((err, channel) => {

        let exchangeName = 'pub-sub',
            message = "My secret messgae @ " + +new Date();

        channel.assertExchange(exchangeName, 'fanout', {durable: false});

        channel.publish(exchangeName, '', new Buffer(message));

        console.log("Sent %s", message);
    });

    setTimeout(() => {
        connection.close();
        process.exit(0);
    }, 500);
});
