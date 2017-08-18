
const amqp = require('amqplib/callback_api');

//our tcp connection to rabbitmq
amqp.connect('amqp://localhost', (err, conn) => {

    //creating channel
    conn.createChannel((err, ch) => {

        let queueName = "direct-queue";

        //assert your queue either to persist in memory or not
        ch.assertQueue(queueName, {durable: false});


        console.log(" I am Waiting for you message...");

        //to comsume message sent to the queue 'foo'
        ch.consume(queueName, msg => {
            console.log(" Received a message: ", msg.content.toString());
        }, {noAck: true});

    });
});