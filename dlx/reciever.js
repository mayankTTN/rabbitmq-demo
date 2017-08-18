/**
 * Created by mayank on 15/8/17.
 */

var amqp = require('amqplib/callback_api');

var args = process.argv.slice(2);

console.log(args)

//condition if no match case is passed
//note : - if no key is binded then it will behave like direct
if (args.length == 0) {
    console.log("Usage: receive_logs_topic.js <facility>.<severity>");
    process.exit(1);
}

amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
        var ex = 'topic_logs'
            , deadExchange = 'our-ttl-deadExchange';


        ch.assertExchange(ex, 'topic', {durable: false});

        //create dead exchange
        ch.assertExchange(deadExchange, 'topic', {durable: false});

        //create queue to bind with deadExchange
        ch.assertQueue('deadExchangeHandleQueue', {exclusive: true}, function (err, q) {

            //bind all keys to  deadexchange's queue
            args.forEach(function(key) {
                ch.bindQueue(q.queue, deadExchange, key);
            });


            //When the connection that declared it closes, the queue will be deleted by setting exclusive true
            ch.assertQueue('', {exclusive: true,arguments  : {
                "x-message-ttl" : 10000 // set ttl after which we will send our message to deadExchange
                , "x-dead-letter-exchange": "our-ttl-deadExchange" // set our xdead letter exchange
            }}, function(err, q) {
                console.log(' [*] Waiting for logs. To exit press CTRL+C');

                //to bind the matching key passed in argument with queue
                args.forEach(function(key) {
                    ch.bindQueue(q.queue, ex, key);
                });
            });

        })


    });
});