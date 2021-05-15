module.exports = async (Discord, client, messages) => {
    const length = messages.array().length;
    const channel = messages.first().channel.name;
  
    const embed = new Discord.MessageEmbed()
      .setTitle(`${length} Messages purged in #${channel}`)
      .setDescription(messages.map(message => `[${message.author.tag}]: ${message.content}`))
      .setFooter(`${length} latest shown`)
      .setColor('#dd5f53')
      .setTimestamp();
    (await client.channels.fetch('843047791836397598')).send(embed);
}
