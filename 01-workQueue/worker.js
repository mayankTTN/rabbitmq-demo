const amqp = require('amqplib/callback_api');

//our tcp connection to rabbitmq
amqp.connect('amqp://localhost', (err, connection) => {

    //creating channel
    connection.createChannel((err, channel) => {

        let queueName = "worker-task-queue";

        //assert your queue either to persist in memory or not
        channel.assertQueue(queueName, {durable: false});


        console.log(" Waiting for message...");

        //to consume message sent to the queue 'worker-task-queue'
        channel.consume(queueName, message => {

            console.log("Received %s", message.content.toString());
            console.log("Processing data please wait...");

            //to fake that the consumer is busy while processing the data.
            setTimeout(() => {
                console.log("Data processed successfully.");
                channel.ack(message);
            }, Math.floor((Math.random() * 10) + 1) * 1000);


        }, {noAck: false});

    });
});