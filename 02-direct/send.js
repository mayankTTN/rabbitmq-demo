const amqp = require('amqplib/callback_api');

//our tcp connection to rabbitmq
amqp.connect('amqp://localhost', (err, connection) => {

    //creating channel
    connection.createChannel((err, channel) => {

        let exchangeName = "direct-exchange"
            , message = +new Date() + ' I started with nothing, and I still have most of it.';


        channel.assertExchange(exchangeName, 'direct', {durable: false});


        //send the message to direct exchange
        channel.publish(exchangeName, '', new Buffer(message));


        console.log("Your message has been send successfully.");


        //Task completed close the connection and exit the process
        setTimeout(() => {
            connection.close();
            process.exit(0);
        }, 500);
    });
});