module.exports = async (Discord, client, guild, user) => {
    let log_channel = guild.channels.cache.find(c => c.name === 'logs');
    if(!log_channel) return;

    const embed = new Discord.MessageEmbed()
    .setColor('FF0000')
    .setTitle("Member Banned")
    .setDescription(`The user [**<@${user.id}>**] has been banned`)
    .setTimestamp()

    log_channel.send(embed)
}