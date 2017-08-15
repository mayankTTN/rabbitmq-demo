/**
 * Created by mayank on 15/8/17.
 */

var amqp = require('amqplib/callback_api');

//our tcp connection to rabbitmq
amqp.connect('amqp://localhost', function(err, conn) {

    //creating channel
    conn.createChannel(function(err, ch) {

        var queueName = "task_queue";

        //assert your queue either to persist in memory or not
        ch.assertQueue(queueName, {durable: false});


        console.log(" Waiting for message...");

        //to consume message sent to the queue 'foo'
        ch.consume(queueName, function(msg) {
            //to fake that the consumer is busy
            var secs = msg.content.toString().split('.').length - 1;

            console.log(" [x] Received %s", msg.content.toString());
            setTimeout(function() {
                console.log(" [x] Done");
                ch.ack(msg);
            }, secs * 1000);
        }, {noAck: true});

    });
});