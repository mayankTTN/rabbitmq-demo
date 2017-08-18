const amqp = require('amqplib/callback_api');

//our tcp connection to rabbitmq
amqp.connect('amqp://localhost', (err, connection) => {

    //creating channel
    connection.createChannel((err, channel) => {

        let exchangeName = "direct-exchange",
            queueName = "direct-queue";

        channel.assertExchange(exchangeName, 'direct', {durable: false});

        channel.assertQueue(queueName, {durable: true});

        channel.bindQueue(queueName, exchangeName);

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queueName);

        channel.consume(queueName, msg => {

            console.log(" [x] %s", msg.content.toString());

        }, {noAck: true});
    });
});