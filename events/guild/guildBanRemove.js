module.exports = async (Discord, client, guild, user) => {
    let log_channel = guild.channels.cache.find(c => c.name === 'logs');
    if(!log_channel) return;

    const embed = new Discord.MessageEmbed()
    .setColor('228B22 ')
    .setTitle("Member Unbanned")
    .setDescription(`The user [**<@${user.id}>**] has been unbanned`)
    .setTimestamp()

    log_channel.send(embed)
}