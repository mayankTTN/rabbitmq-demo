
const amqp = require('amqplib/callback_api');

//our tcp connection to rabbitmq
amqp.connect('amqp://localhost', (err, conn) => {

    //creating channel
    conn.createChannel((err, ch) => {

        let queueName = "direct-queue"
            , message = +new Date() + ' I started with nothing, and I still have most of it.';


        //assert your queue either to persist in memory or not
        ch.assertQueue(queueName, {durable: false});



        //send the message to queue
        ch.sendToQueue(queueName, new Buffer(message));


        console.log("Your message has been send successfully.");


        //Task completed close the connection and exit the process
        setTimeout(function() { conn.close(); process.exit(0) }, 500);
    });
});