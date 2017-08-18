const amqp = require('amqplib/callback_api');

//our tcp connection to rabbitmq
amqp.connect('amqp://localhost', (err, connection) => {

    //creating channel
    connection.createChannel((err, channel) => {

        let queueName = "worker-task-queue",
            message = "Ask worker to perform task ID : " + +new Date();


        channel.assertQueue(queueName, {durable: false});

        channel.sendToQueue(queueName, new Buffer(message), {persistent: true});

        console.log("Sent '%s'", message);

        // Message send, now time to close the connection.
        setTimeout(() => {
            connection.close();
            process.exit(0);
        }, 500);
    });
});