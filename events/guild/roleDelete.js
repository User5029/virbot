module.exports = async (Discord, client, role) => {
    let log_channel = role.guild.channels.cache.find(c => c.name === 'logs');
    if(!log_channel) return;
    
    const embed = new Discord.MessageEmbed()
    .setColor('8b0000')
    .setTitle("Role Deleted")
    .setDescription(`${role.name}`)
    .setTimestamp()

    log_channel.send(embed)
}