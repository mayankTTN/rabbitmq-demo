const amqp = require('amqplib/callback_api');

//our tcp connection to rabbitmq
amqp.connect('amqp://localhost', (err, connection) => {

    //creating channel
    connection.createChannel((err, channel) => {

        let exchangeName = "direct-exchange-dlx",
            queueName = "direct-queue-dlx",
            deadExchange = 'our-ttl-deadExchange',
            deadQueue = 'dead-queue';


        //create dead exchange and queue.
        channel.assertExchange(deadExchange, 'direct', {durable: false});
        channel.assertQueue(deadQueue, {exclusive: true});
        channel.bindQueue(deadQueue, deadExchange);
        // dead queue configured.

        channel.assertExchange(exchangeName, 'direct', {durable: false});
        channel.assertQueue(queueName, {
            durable: true, arguments: {
                "x-message-ttl": 10000 // set ttl after which we will send our message to deadExchange
                , "x-dead-letter-exchange": "our-ttl-deadExchange" // set our xdead letter exchange
            }
        });

        channel.bindQueue(queueName, exchangeName);

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queueName);

        /* channel.consume(queueName, msg => {
         console.log(" [x] %s", msg.content.toString());
         }, {noAck: true});*/

    });
});