const amqp = require('amqplib/callback_api');

let args = process.argv.slice(2);

//condition if no match case is passed
//note : - if no key is binded then it will behave like direct
if (args.length == 0) {
    console.log("Usage: receive_logs_topic.js <facility>.<severity>");
    process.exit(1);
}

amqp.connect('amqp://localhost', (err, connection) => {

    connection.createChannel((err, channel) => {
        let exchangeName = 'topic_logs_ex';

        channel.assertExchange(exchangeName, 'topic', {durable: false});

        channel.assertQueue('', {exclusive: true}, (err, q) => {
            console.log('Waiting for logs. To exit press CTRL+C');

            //to bind the matching key passed in argument with queue
            args.forEach(_key => {
                channel.bindQueue(q.queue, exchangeName, _key);
            });


            channel.consume(q.queue, msg => {
                console.log(" [x] %s:'%s'", msg.fields.routingKey, msg.content.toString());
            }, {noAck: true});
        });
    });
});