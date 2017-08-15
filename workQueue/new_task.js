/**
 * Created by mayank on 15/8/17.
 */
var amqp = require('amqplib/callback_api');

//our tcp connection to rabbitmq
amqp.connect('amqp://localhost', function(err, conn) {

    //creating channel
    conn.createChannel(function(err, ch) {

        var queueName = "task_queue",
            msg = process.argv.slice(2).join(' ') || "Hello World!";

        ch.assertQueue(queueName, {durable: false});
        ch.sendToQueue(queueName, new Buffer(msg), {persistent: true});

        console.log(" [x] Sent '%s'", msg);
        setTimeout(function() { conn.close(); process.exit(0) }, 500);
    });
});