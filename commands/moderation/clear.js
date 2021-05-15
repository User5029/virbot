module.exports = {
    name: 'clear',
    aliases: ['clean', 'purge'], 
    async execute(client, message, args, Discord) {
      message.delete()

        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("You do not have permission to use this command");
        if (!isNaN(message.content.split(' ')[1])) {
            let amount = 0;
            if (message.content.split(' ')[1] === '1' || message.content.split(' ')[1] === '0') {
              amount = 1;
            } else {
              amount = message.content.split(' ')[1];
              if (amount > 100) {
                amount = 100;
              }
            }
            await message.channel.bulkDelete(amount, true).then((_message) => {
              message.channel.send(`Bot cleared \`${_message.size}\` messages :broom:`).then((sent) => {
                setTimeout(function () {
                  sent.delete();
                }, 2500);
              });
            });
          } else {
            message.channel.send('Please enter the amount of messages to be deleted').then((sent) => {
              setTimeout(function () {
                sent.delete();
              }, 2500);
            });
          }
    }
}