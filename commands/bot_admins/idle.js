module.exports = {
    name: 'idle',
    execute(client, message, args, Discord) {
        message.delete()
        if(message.author.id === '665562488158289943' || message.author.id === '721416593166303352') {
            client.user.setStatus('idle');
        }
    }
}