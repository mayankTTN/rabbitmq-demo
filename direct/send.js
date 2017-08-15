/**
 * Created by mayank on 15/8/17.
 */
var amqp = require('amqplib/callback_api');

//our tcp connection to rabbitmq
amqp.connect('amqp://localhost', function(err, conn) {

    //creating channel
    conn.createChannel(function(err, ch) {

        var queueName = "foo"
            , message = 'Hello World!'
        ;

        //assert your queue either to persist in memory or not
        ch.assertQueue(queueName, {durable: false});

        //send the message to queue
        ch.sendToQueue(queueName, new Buffer(message));

        console.log(" [x] Sent", message);

        //Task completed close the connection and exit the process
        setTimeout(function() { conn.close(); process.exit(0) }, 500);
    });
});