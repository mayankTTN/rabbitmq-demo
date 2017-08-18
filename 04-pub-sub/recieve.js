const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, connection) => {
    
    connection.createChannel((err, channel) => {
        
        let exchangeName = 'pub-sub';

        channel.assertExchange(exchangeName, 'fanout', {durable: false});

        channel.assertQueue('', {durable: true}, (err, q) => {

            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
            
            channel.bindQueue(q.queue, exchangeName);

            channel.consume(q.queue, msg => {

                console.log(" [x] %s", msg.content.toString());

            }, {noAck: true});
        });
    });
});