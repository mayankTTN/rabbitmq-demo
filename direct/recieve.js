/**
 * Created by mayank on 15/8/17.
 */

var amqp = require('amqplib/callback_api');

//our tcp connection to rabbitmq
amqp.connect('amqp://localhost', function(err, conn) {

    //creating channel
    conn.createChannel(function(err, ch) {

        var queueName = "foo";

        //assert your queue either to persist in memory or not
        ch.assertQueue(queueName, {durable: false});


        console.log(" [x] I am Waiting for you message...");

        //to comsume message sent to the queue 'foo'
        ch.consume(queueName, function(msg) {
            console.log(" Received a message: ", msg.content.toString());
        }, {noAck: true});

    });
});