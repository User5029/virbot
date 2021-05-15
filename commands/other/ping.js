module.exports = {
    name: 'ping',
    description: "Ping command",
    execute(client, message, args){       
        message.channel.send(`Your current ping is ${client.ws.ping} ping`).then(msg => msg.delete({timeout: 600000}));         
    }
}