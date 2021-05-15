module.exports = async (Discord, client, role) => {
    let log_channel = role.guild.channels.cache.find(c => c.name === 'logs');
    if(!log_channel) return;
    
    const embed = new Discord.MessageEmbed()
    .setColor('008000')
    .setTitle("Role Created")
    .setDescription(`${role.name}`)
    .setTimestamp()

    log_channel.send(embed)
}