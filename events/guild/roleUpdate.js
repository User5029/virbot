module.exports = async (Discord, client, oldRole, newRole) => {
    let log_channel = oldRole.guild.channels.cache.find(c => c.name === 'logs');
    if(!log_channel) return;

    if(oldRole.name === newRole.name) return;
    
    const embed = new Discord.MessageEmbed()
    .setColor('FF8C00')
    .setTitle("Role Updated")
    .setDescription(`[**${oldRole.name}**] to [**${newRole.name}**]`)
    .setTimestamp()

    log_channel.send(embed)
}