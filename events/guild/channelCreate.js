module.exports = async (Discord, client, channel) => {
    if(channel.type === 'dm') return
    let log_channel = channel.guild.channels.cache.find(c => c.name === 'logs');
    if(!log_channel) return;


    const embed = new Discord.MessageEmbed()
    .setColor('008000')
    .setTitle("Channel Created")
    .setDescription(`The ${channel.type} channel [**${channel.name}**] has been created.`)
    .setTimestamp()

    log_channel.send(embed)
}